import React from "react";

function UserTableThead({ columns }) {
  return (
    <thead className="">
      <tr>
        <th>ردیف</th>
        {columns.map((col) => (
          <th key={col.key}>{col.label}</th>
        ))}
      </tr>
    </thead>
  );
}

export default UserTableThead;
