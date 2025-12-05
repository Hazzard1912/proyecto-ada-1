function priorityToText(p) {
  if (p === 3) return "Alta";
  if (p === 2) return "Media";
  return "Baja";
}

export default function TaskTable({ tasks, onComplete }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "white"
      }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "4px" }}>ID</th>
          <th style={{ border: "1px solid #ccc", padding: "4px" }}>Descripción</th>
          <th style={{ border: "1px solid #ccc", padding: "4px" }}>Prioridad</th>
          <th style={{ border: "1px solid #ccc", padding: "4px" }}>
            Fecha de vencimiento
          </th>
          <th style={{ border: "1px solid #ccc", padding: "4px" }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(t => (
          <tr key={t.id}>
            <td style={{ border: "1px solid #ccc", padding: "4px" }}>{t.id}</td>
            <td style={{ border: "1px solid #ccc", padding: "4px" }}>{t.description}</td>
            <td style={{ border: "1px solid #ccc", padding: "4px" }}>
              {priorityToText(t.priority)}
            </td>
            <td style={{ border: "1px solid #ccc", padding: "4px" }}>{t.dueDate}</td>
            <td style={{ border: "1px solid #ccc", padding: "4px" }}>
              <button onClick={() => onComplete(t.id)}>
                Marcar completada
              </button>
            </td>
          </tr>
        ))}
        {tasks.length === 0 && (
          <tr>
            <td
              colSpan="5"
              style={{ textAlign: "center", padding: "8px" }}
            >
              No hay tareas
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
