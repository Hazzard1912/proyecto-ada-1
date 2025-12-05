import { useState } from "react";
import { Calendar, FileText, Hash, Save, AlertCircle } from 'lucide-react';

export default function TaskForm({ onSubmit }) {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("3");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: Number(id),
      description,
      priority: Number(priority),
      dueDate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="mb-2">
        <h3 className="font-bold text-lg text-base-content">Nueva Tarea</h3>
        <p className="text-sm text-base-content/60">Ingresa los detalles a continuación</p>
      </div>
      
      <div className="form-control w-full">
        <label className="label pt-0 pb-1">
          <span className="label-text font-medium text-base-content/80">ID de Tarea</span>
        </label>
        <input 
          type="number" 
          value={id} 
          onChange={e => setId(e.target.value)} 
          placeholder="Ej: 101" 
          className="input input-bordered w-full focus:outline-none focus:border-primary bg-base-200/50" 
          required
        />
      </div>

      <div className="form-control w-full">
        <label className="label pt-0 pb-1">
          <span className="label-text font-medium text-base-content/80">Descripción</span>
        </label>
        <textarea 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="¿Qué hay que hacer?" 
          className="textarea textarea-bordered w-full focus:outline-none focus:border-primary h-24 bg-base-200/50 resize-none" 
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label pt-0 pb-1">
            <span className="label-text font-medium text-base-content/80">Vencimiento</span>
          </label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={e => setDueDate(e.target.value)} 
            className="input input-bordered w-full focus:outline-none focus:border-primary bg-base-200/50" 
            required
          />
        </div>

        <div className="form-control w-full">
          <label className="label pt-0 pb-1">
            <span className="label-text font-medium text-base-content/80">Prioridad</span>
          </label>
          <select 
            value={priority} 
            onChange={e => setPriority(e.target.value)} 
            className="select select-bordered w-full focus:outline-none focus:border-primary bg-base-200/50"
          >
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-2 w-full rounded-xl font-bold normal-case">
        Guardar Tarea
      </button>
    </form>
  );
}
