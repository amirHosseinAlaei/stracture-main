
function UserTableTbody({ items, columns }) {
  if (!items || items.length === 0)
    return (
      <tbody  className="">
        <tr className="bg-green-800 ">
          <td colSpan={columns.length + 1}>داده‌ای یافت نشد</td>
        </tr>
      </tbody>
    );

  return (
    <tbody>
      {items.map((item, idx) => (
        <tr key={item.id}>
          <td>{idx + 1}</td>
          {columns.map((col) => (
            <td key={col.key}>{item[col.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default UserTableTbody;
