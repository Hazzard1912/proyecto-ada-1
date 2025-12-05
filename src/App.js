
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";
import { Task } from "./structures/Task";
import { TaskManager } from "./structures/TaskManager";

const manager = new TaskManager();

function priorityToText(p) {
  if (p === 3) return "Alta";
  if (p === 2) return "Media";
  return "Baja";
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  const refresh = () => {
    // SIEMPRE usa el getAll() del TaskManager (ya ordenado)
    setTasks(manager.getAll());
  };

  const addOrUpdate = (data) => {
    const t = new Task(data.id, data.description, data.priority, data.dueDate);
    const exists = manager.getById(t.id);

    if (exists) {
      manager.update(t);
      setMessage(
        `Tarea ${t.id} actualizada: "${t.description}", prioridad ${priorityToText(
          t.priority
        )}, vence el ${t.dueDate}.`
      );
    } else {
      manager.add(t);
      setMessage(
        `Tarea ${t.id} agregada: "${t.description}", prioridad ${priorityToText(
          t.priority
        )}, vence el ${t.dueDate}.`
      );
    }
    refresh();
  };

  const completeHighest = () => {
    const t = manager.completeHighest();
    if (!t) {
      setMessage("No hay tareas en la cola de prioridad.");
      return;
    }
    setMessage(
      `Tarea ID ${t.id} marcada como completada (era la más prioritaria, prioridad ${priorityToText(
        t.priority
      )}, vencía el ${t.dueDate}).`
    );
    refresh();
  };

  const completeById = (id) => {
    const t = manager.getById(id);
    if (!t) {
      setMessage(`No existe tarea con ID ${id}.`);
      return;
    }
    manager.delete(id);
    setMessage(
      `Tarea ID ${id} marcada como completada: "${t.description}", prioridad ${priorityToText(
        t.priority
      )}, vencía el ${t.dueDate}.`
    );
    refresh();
  };

  const search = () => {
    const id = Number(searchId);
    if (!id) {
      setMessage("Ingresa un ID válido para buscar.");
      return;
    }

    const t = manager.getById(id); // AVL
    if (!t) {
      setMessage(`No existe tarea con ID ${id}.`);
      return;
    }

    setMessage(
      `AVL: encontrada tarea ID ${t.id}: "${t.description}", prioridad ${priorityToText(
        t.priority
      )}, fecha de vencimiento ${t.dueDate}.`
    );
  };

  const remove = () => {
    const id = Number(deleteId);
    if (!id) {
      setMessage("Ingresa un ID válido para eliminar.");
      return;
    }

    const ok = manager.delete(id);
    if (!ok) {
      setMessage(`No existe tarea con ID ${id}.`);
    } else {
      setMessage(`Tarea ID ${id} eliminada del sistema (Heap + AVL).`);
      refresh();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestión de Tareas con Heap y AVL</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <TaskForm onSubmit={addOrUpdate} />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}
        >
          <h3>Operaciones</h3>

          <div>
            <input
              type="number"
              placeholder="ID a buscar (AVL)"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              style={{ width: "100%", marginBottom: "4px" }}
            />
            <button style={{ width: "100%" }} onClick={search}>
              Buscar
            </button>
          </div>

          <div>
            <input
              type="number"
              placeholder="ID a eliminar"
              value={deleteId}
              onChange={e => setDeleteId(e.target.value)}
              style={{ width: "100%", marginBottom: "4px" }}
            />
            <button style={{ width: "100%" }} onClick={remove}>
              Eliminar
            </button>
          </div>

          <button style={{ width: "100%" }} onClick={completeHighest}>
            Completar más prioritaria
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            marginTop: "16px",
            padding: "8px",
            backgroundColor: "#e8f4ff",
            borderRadius: "6px",
            border: "1px solid #bcdfff",
            fontSize: "0.9rem"
          }}
        >
          {message}
        </div>
      )}

      <h2 style={{ marginTop: "24px" }}>Tareas (Heap)</h2>
      <TaskTable tasks={tasks} onComplete={completeById} />
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