import { useState } from "react";

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
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
      <h3>Agregar / Actualizar tarea</h3>

      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID único" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <input value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Fecha (YYYY-MM-DD)" />

      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="1">Baja</option>
        <option value="2">Media</option>
        <option value="3">Alta</option>
      </select>

      <button type="submit">Guardar</button>
    </form>
  );
}
