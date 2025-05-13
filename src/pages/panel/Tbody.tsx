import React from "react";

function UserTableTbody({ items, columns }) {
  if (!items || items.length === 0)
    return (
      <tbody>
        <tr>
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
