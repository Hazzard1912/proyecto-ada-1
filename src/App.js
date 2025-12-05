import { useState } from "react";
import { Search, Trash2, CheckCircle, Info, Activity } from 'lucide-react';
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

  const debugStructures = () => {
    manager.debug();
    setMessage("Revisa la consola del navegador (F12) para ver el estado del Heap y AVL.");
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
    <div className="min-h-screen bg-base-200 p-4 md:p-8 font-sans text-base-content">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2 tracking-tight">
              Gestión de Tareas
            </h1>
            <p className="text-base text-base-content/60">
              Sistema basado en Heap y Árboles AVL
            </p>
          </div>
          <button 
            onClick={debugStructures}
            className="btn btn-ghost btn-sm gap-2 text-base-content/70"
            title="Ver estado interno (Consola)"
          >
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Debug Estructuras</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
              <div className="card-body p-6">
                <TaskForm onSubmit={addOrUpdate} />
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
              <div className="card-body p-6">
                <h3 className="card-title text-lg font-semibold mb-4">Operaciones (AVL)</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="form-control">
                    <label className="label pt-0 pb-1">
                      <span className="label-text text-sm font-medium text-base-content/70">Buscar por ID</span>
                    </label>
                    <div className="join w-full">
                      <input
                        type="number"
                        placeholder="Ej: 101"
                        value={searchId}
                        onChange={e => setSearchId(e.target.value)}
                        className="input input-bordered join-item w-full focus:outline-none focus:border-primary bg-base-200/50"
                      />
                      <button className="btn btn-primary join-item" onClick={search}>
                        <Search className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label pt-0 pb-1">
                      <span className="label-text text-sm font-medium text-base-content/70">Eliminar por ID</span>
                    </label>
                    <div className="join w-full">
                      <input
                        type="number"
                        placeholder="Ej: 101"
                        value={deleteId}
                        onChange={e => setDeleteId(e.target.value)}
                        className="input input-bordered join-item w-full focus:outline-none focus:border-error bg-base-200/50"
                      />
                      <button className="btn btn-error join-item text-white" onClick={remove}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="divider my-1"></div>

                  <button className="btn btn-primary w-full rounded-xl font-bold normal-case" onClick={completeHighest}>
                    Completar más prioritaria
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {message && (
              <div role="alert" className="alert shadow-sm mb-6 bg-base-100 border border-base-200 rounded-xl">
                <Info className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{message}</span>
              </div>
            )}

            <div className="card bg-base-100 shadow-sm border border-base-200 h-full rounded-2xl">
              <div className="card-body p-0">
                <div className="p-6 border-b border-base-200 flex justify-between items-center">
                  <h2 className="card-title text-lg font-semibold">Lista de Tareas</h2>
                  <div className="badge badge-ghost">Total: {tasks.length}</div>
                </div>
                <div className="p-0">
                  <TaskTable tasks={tasks} onComplete={completeById} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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