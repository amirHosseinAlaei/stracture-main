export function UserTableThead({ columns, setColumns }) {
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("colIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = parseInt(e.dataTransfer.getData("colIndex"));
    if (dragIndex === dropIndex) return;

    const updated = [...columns];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, moved);
    setColumns(updated);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="border p-2">ردیف</th>
        {columns.map((col, index) => (
          <th
            key={col.key}
            className="border p-2 cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
