import React, { useState } from "react";
import {
  getTypeLabel,
  getStatusLabel,
  getTwoFactorLabel,
} from "../../utils/TabelNum";
import ActionButtons from "./TabelActions";

function UserTableTbody({ items, columns, page, pageSize, actionButtons }) {
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
    <tbody className="text-center">
      {items.map((item, idx) => (
        <React.Fragment key={item.id}>
          <tr className="even:bg-[#f9f9f9] hover:bg-[#f4f4f4] ">
            <td className="p-4 w-16">
              <div className="flex flex-row-reverse items-center justify-end gap-6 w-4 ">
                <span>{(page - 1) * pageSize + (idx + 1)}</span>
                <i
                  className={`fa-solid ${
                    expandedRow === item.id ? "fa-chevron-up" : "fa-chevron-left"
                  } cursor-pointer`}
                  style={{
                    fontFamily: "Font Awesome 6 Pro",
                    fontWeight: 400,
                    fontSize: "14px",
                    transition: "transform 0.2s",
                    opacity: 0.5,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(item.id);
                  }}
                />
              </div>
            </td>
            {columns.map((col) => (
              <td className="p-4" key={col.key}>
                {col.key === "type"
                  ? getTypeLabel(item.type)
                  : col.key === "status"
                  ? getStatusLabel(item.status)
                  : col.key === "twoFactorEnabled"
                  ? getTwoFactorLabel(item.twoFactorEnabled)
                  : item[col.key]}
              </td>
            ))}
            <td className="p-4">
              <ActionButtons buttons={actionButtons.map(btn => ({
                ...btn,
                onClick: () => btn.onClick(item)
              }))} />
            </td>
          </tr>
          {expandedRow === item.id && (
            <tr>
              <td colSpan={columns.length + 1} className="bg-gray-50 p-4 text-sm">
                <div className="grid grid-cols-2 text-start gap-2">
                  <div>
                    <strong>نام:</strong> {item.firstName}
                  </div>
                  <div>
                    <strong>نام خانوادگی:</strong> {item.lastName}
                  </div>
                  <div>
                    <strong>نام کاربری:</strong> {item.userName}
                  </div>
                  <div>
                    <strong>شماره موبایل:</strong> {item.mobile}
                  </div>
                  <div>
                    <strong>نوع کاربر:</strong> {getTypeLabel(item.type)}
                  </div>
                  <div>
                    <strong>وضعیت:</strong> {getStatusLabel(item.status)}
                  </div>
                  <div>
                    <strong>ورود دو مرحله‌ای:</strong> {getTwoFactorLabel(item.twoFactorEnabled)}
                  </div>
                  <div>
                    <strong>نام پدر:</strong> {item.fatherName}
                  </div>
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