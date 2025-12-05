import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";
import { Task } from "./structures/Task";
import { TaskManager } from "./structures/TaskManager";

const manager = new TaskManager();

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  const refresh = () => setTasks(manager.getAll());

  const addOrUpdate = (data) => {
    const t = new Task(data.id, data.description, data.priority, data.dueDate);
    const exists = manager.getById(t.id);

    if (exists) {
      manager.update(t);
      setMessage(`Tarea ${t.id} actualizada`);
    } else {
      manager.add(t);
      setMessage(`Tarea ${t.id} agregada`);
    }
    refresh();
  };

  const complete = () => {
    const t = manager.completeHighest();
    if (!t) return setMessage("No hay tareas");
    setMessage(`Completada tarea ID ${t.id}`);
    refresh();
  };

  const search = () => {
    const id = Number(searchId);
    const t = manager.getById(id);
    if (!t) setMessage(`No existe tarea con ID ${id}`);
    else setMessage(`Encontrada tarea ${id}: ${t.description}`);
  };

  const remove = () => {
    const id = Number(deleteId);
    const ok = manager.delete(id);
    setMessage(ok ? `Tarea ${id} eliminada` : `No existe tarea ${id}`);
    refresh();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestión de Tareas con Heap y AVL</h1>

      <div style={{ display: "flex", gap:"20px" }}>
        <TaskForm onSubmit={addOrUpdate} />

        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          <h3>Operaciones</h3>

          <input placeholder="Buscar ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
          <button onClick={search}>Buscar</button>

          <input placeholder="Eliminar ID" value={deleteId} onChange={e => setDeleteId(e.target.value)} />
          <button onClick={remove}>Eliminar</button>

          <button onClick={complete}>Completar más prioritaria</button>
        </div>
      </div>

      {message && <p><strong>{message}</strong></p>}

      <h2>Tareas (Heap)</h2>
      <TaskTable tasks={tasks} />
    </div>
  );
}

export default App;





//PRUEBAS COMENTADAS (PARA COMPROBAR ANTES DE DESAROLLAR LA GUI)

/*
import { useEffect, useState } from "react";
import { Task } from "./structures/Task";
import { TaskManager } from "./structures/TaskManager";

function App() {
  const [report, setReport] = useState("Ejecutando pruebas...");

  useEffect(() => {
    const manager = new TaskManager();
    const log = [];

    try {
      //  Creamos algunas tareas pa probar
      const t1 = new Task(101, "Estudiar para el examen", 3, "2025-01-10"); // Alta
      const t2 = new Task(102, "Comprar útiles escolares", 2, "2025-01-15"); // Media
      const t3 = new Task(103, "Revisar correos", 1, "2025-01-20"); // Baja

      manager.add(t1);
      manager.add(t2);
      manager.add(t3);
      log.push("Si");

      // Probaemos que la tarea más prioritaria es la 101
      const top1 = manager.getHighest();
      if (top1 && top1.id === 101) {
        log.push("Si");
      } else {
        log.push(
          `No, se obtuvo ${
            top1 ? top1.id : "null"
          }.`
        );
      }

      // Se prueba búsqueda en AVL
      const search102 = manager.getById(102);
      if (search102 && search102.description === "Comprar útiles escolares") {
        log.push("Si");
      } else {
        log.push("No");
      }

      // Probamos la  actualización (cambiar prioridad de 102 a Alta)
      const updated = manager.update(
        new Task(102, "Comprar útiles escolares (URGENTE)", 3, "2025-01-09")
      );
      if (updated) {
        log.push("Si");
      } else {
        log.push("No");
      }

      const top2 = manager.getHighest();
      if (top2 && top2.id === 102) {
        log.push(
          "Si"
        );
      } else {
        log.push(
          `No, se obtuvo ${
            top2 ? top2.id : "null"
          }.`
        );
      }

      // Probamos completeHighest (pop del heap + remove en AVL)
      const completed = manager.completeHighest();
      if (completed && completed.id === 102) {
        log.push("Si");
      } else {
        log.push("No");
      }

      // Aqui para confirmar que ya no existe en AVL
      const searchAfterDelete = manager.getById(102);
      if (!searchAfterDelete) {
        log.push("Si");
      } else {
        log.push("No");
      }

      //  delete(id) directo
      const deleted = manager.delete(103);
      if (deleted) {
        log.push("Si");
      } else {
        log.push("No");
      }

      const search103 = manager.getById(103);
      if (!search103) {
        log.push("Si");
      } else {
        log.push("No");
      }

      // Si solo queda la 101
      const remaining = manager.getAll();
      if (remaining.length === 1 && remaining[0].id === 101) {
        log.push("Si");
      } else {
        log.push(
          `No, se obtuvo ${
            remaining.length
          }: [${remaining.map(t => t.id).join(", ")}].`
        );
      }
    } catch (e) {
      log.push("Excepcion");
      log.push(String(e));
      console.error(e);
    }

    const text = log.join("\n");
    console.log(text);       // también en consola del navegador
    setReport(text);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Pruebas</h1>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#111",
          color: "#eee",
          padding: 16,
          borderRadius: 8,
          fontSize: "0.9rem"
        }}
      >
        {report}
      </pre>
    </div>
  );
}

export default App;
*/