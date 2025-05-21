function UserTableThead({ columns, onSort }) {
  const getSortSymbol = (key) => {
    return "";
  };

  return (
    <thead className="bg-[#e3e5e9] sticky top-0 z-10">
      <tr>
        <th className="p-4 text-right">ردیف</th>
        {columns.map((col) => (
          <th
            key={col.key}
            className="p-4 cursor-pointer select-none"
            onClick={() => onSort && onSort(col.key)}
          >
            {col.label} {getSortSymbol(col.key)}
          </th>
        ))}
        <th className="p-4">عملیات</th>
      </tr>
    </thead>
  );
}

export default UserTableThead;
