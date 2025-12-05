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
    const steps = this.index.insert(task);
    console.log(`[AVL Insert] ID: ${task.id}, Pasos: ${steps}`);
  }

  getById(id) {
    const { result, steps } = this.index.search(id);
    if (result) console.log(`[AVL Search] ID: ${id}, Pasos: ${steps}`);
    return result;
  }

  getHighest() {
    return this.heap.peek();
  }

  update(task) {
    const { result: exists } = this.index.search(task.id);
    if (!exists) return false;

    this.heap.removeById(task.id);
    const steps = this.index.insert(task);
    console.log(`[AVL Update] ID: ${task.id}, Pasos: ${steps}`);
    this.heap.push(task);

    return true;
  }

  delete(id) {
    const { result: exists } = this.index.search(id);
    if (!exists) return false;

    const steps = this.index.remove(id);
    console.log(`[AVL Delete] ID: ${id}, Pasos: ${steps}`);
    this.heap.removeById(id);

    return true;
  }

  completeHighest() {
    const t = this.heap.pop();
    if (t) {
      const steps = this.index.remove(t.id);
      console.log(`[AVL Delete (Complete)] ID: ${t.id}, Pasos: ${steps}`);
    }
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

  debug() {
    console.log("\n\n");
    console.log("=== DEBUG: ESTADO DE LAS ESTRUCTURAS ===");
    this.heap.printHeap();
    this.index.printTree();
    console.log("========================================");
  }
}
