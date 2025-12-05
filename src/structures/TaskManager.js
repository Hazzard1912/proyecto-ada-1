import { PriorityHeap } from "./PriorityHeap";
import { AvlTree } from "./AvlTree";

// Esto convierte fechas "YYYY-MM-DD" o "DD-MM-YYYY" a Date. (YYYY=Year=Año, MM=Month=Mes, DD=Day=Dia)
// Si no lo puede interpretar devuelve una fecha lejana
function parseDueDate(str) {
  if (!str) return new Date(8640000000000000);

  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/;
  const dmy = /^(\d{2})-(\d{2})-(\d{4})$/;
  let m;

  if ((m = str.match(ymd))) {
    const [, y, mo, d] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d));
  }
  if ((m = str.match(dmy))) {
    const [, d, mo, y] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d));
  }

  return new Date(8640000000000000);
}

export class TaskManager {
  constructor() {
    this.heap = new PriorityHeap();
    this.index = new AvlTree();
  }

  add(task) {
    this.heap.push(task);
    this.index.insert(task);
  }

  getById(id) {
    return this.index.search(id);
  }

  getHighest() {
    return this.heap.peek();
  }

  update(task) {
    const exists = this.index.search(task.id);
    if (!exists) return false;

    this.heap.removeById(task.id);
    this.index.insert(task);
    this.heap.push(task);

    return true;
  }

  delete(id) {
    const exists = this.index.search(id);
    if (!exists) return false;

    this.index.remove(id);
    this.heap.removeById(id);

    return true;
  }

  completeHighest() {
    const t = this.heap.pop();
    if (t) this.index.remove(t.id);
    return t;
  }

  // Este getAll es el heap que utiliza la GUI, no modifica la del hepa original
  getAll() {
    // Copiamos el contenido actual del heap
    const tasks = this.heap.getAll();

    // Ordenamos SOLAMENTE la copia (esta)
    return tasks.sort((a, b) => {
      // Prioridad: Alta(3) > Media(2) > Baja(1)
      if (a.priority !== b.priority) return b.priority - a.priority;

      //Fecha de vencimiento MáS PRONTA a vencer, es la que sale primero
      const da = parseDueDate(a.dueDate);
      const db = parseDueDate(b.dueDate);
      if (da.getTime() !== db.getTime()) return da - db;

      //ID más grande primero (por si tienen la prioridad y fecha igual pero tienen ID didferente)
      return b.id - a.id;
    });
  }
}
