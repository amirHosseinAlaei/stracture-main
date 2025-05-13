  import React, { useState } from "react";

  function UserTableTbody({ items, columns }) {
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleExpand = (id) => {
      setExpandedRow((prev) => (prev === id ? null : id));
    };

    if (!items || items.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length + 1} className="text-center py-4">
              داده‌ای یافت نشد
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {items.map((item, idx) => (
          <React.Fragment key={item.id}>
            <tr
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleExpand(item.id)}
            >
              <td className="border p-2">{idx + 1}</td>
              {columns.map((col) => (
                <td className="border p-2" key={col.key}>
                  {item[col.key]}
                </td>
              ))}
            </tr>

            {/* expanded content row */}
            {expandedRow === item.id && (
              <tr>
                <td colSpan={columns.length + 1} className="bg-gray-50 p-4 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>نام:</strong> {item.firstName}</div>
                    <div><strong>نام خانوادگی:</strong> {item.lastName}</div>
                    <div><strong>نام کاربری:</strong> {item.userName}</div>
                    <div><strong>شماره موبایل:</strong> {item.mobile}</div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    );
  }

  export default UserTableTbody;
