function priorityToText(p) {
  if (p === 3) return "Alta";
  if (p === 2) return "Media";
  return "Baja";
}

export default function TaskTable({ tasks }) {
  return (
    <table border="1" width="100%" style={{ background:"white" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Descripción</th>
          <th>Prioridad</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(t => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.description}</td>
            <td>{priorityToText(t.priority)}</td>
            <td>{t.dueDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
