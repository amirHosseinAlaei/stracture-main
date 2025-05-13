function UserTableThead({ columns, setColumns, onSort, sortKey, sortOrder }) {
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

  const handleDragOver = (e) => e.preventDefault();

  const getSortSymbol = (key) => {
    if (key !== sortKey) return "";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="border p-2">ردیف</th>
        {columns.map((col, index) => (
          <th
            key={col.key}
            className="border p-2 cursor-pointer select-none"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => onSort(col.key)}
          >
            {col.label} {getSortSymbol(col.key)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default UserTableThead;
