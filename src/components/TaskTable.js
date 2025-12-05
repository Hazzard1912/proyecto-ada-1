import { Check, Calendar, AlertCircle } from 'lucide-react';

function getPriorityBadge(p) {
  if (p === 3) return <span className="badge badge-error badge-outline gap-1 font-medium text-xs">Alta</span>;
  if (p === 2) return <span className="badge badge-warning badge-outline gap-1 font-medium text-xs">Media</span>;
  return <span className="badge badge-success badge-outline gap-1 font-medium text-xs">Baja</span>;
}

export default function TaskTable({ tasks, onComplete }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-base-100 border-b border-base-200">
          <tr>
            <th className="font-semibold text-base-content/70">ID</th>
            <th className="font-semibold text-base-content/70">Descripción</th>
            <th className="font-semibold text-base-content/70">Prioridad</th>
            <th className="font-semibold text-base-content/70">Vencimiento</th>
            <th className="font-semibold text-base-content/70 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id} className="hover:bg-base-200/30 transition-colors border-b border-base-100">
              <th className="font-mono text-sm font-normal opacity-70">{t.id}</th>
              <td className="font-medium">{t.description}</td>
              <td>
                {getPriorityBadge(t.priority)}
              </td>
              <td className="text-sm opacity-80">{t.dueDate}</td>
              <td className="text-center">
                <button 
                  className="btn btn-sm btn-ghost text-success hover:bg-success/10 gap-2 font-normal"
                  onClick={() => onComplete(t.id)}
                  title="Marcar como completada"
                >
                  <Check className="w-4 h-4" />
                  <span className="hidden md:inline">Completar</span>
                </button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center py-12 text-base-content/40"
              >
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="w-8 h-8 opacity-20" />
                  <p className="text-sm">No hay tareas pendientes</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
