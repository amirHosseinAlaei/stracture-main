import React, { useState } from "react";
import {
  getTypeLabel,
  getStatusLabel,
  getTwoFactorLabel,
} from "../../utils/TabelNum";
import ActionButtons from "./TabelActions";

interface Column {
  key: string;
  label: string;
}

interface UserTableTbodyProps {
  items: any[];
  columns: Column[];
  page: number;
  pageSize: number;
  actionButtons: any[];
  stickyActionEnabled?: boolean;
}

function UserTableTbody({
  items,
  columns,
  page,
  pageSize,
  actionButtons,
  stickyActionEnabled = true,
}: UserTableTbodyProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  if (!items || items.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + 2}
            className="text-center py-4 break-words"
          >
            داده‌ای یافت نشد
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="text-center">
      {items.map((item, idx) => {
        // تعیین رنگ پس‌زمینه ردیف
        const isEven = idx % 2 === 1;
        const isHovered = hoveredRow === item.id;

        let bgColor = "#fff";
        if (isHovered) bgColor = "#f4f4f4";
        else if (isEven) bgColor = "#f9f9f9";

        return (
          <React.Fragment key={item.id}>
            <tr
              style={{ background: bgColor }}
              className="hover:bg-[#f4f4f4]"
              onMouseEnter={() => setHoveredRow(item.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* شماره ردیف و آیکون باز/بستن جزئیات */}
              <td className="p-4 w-16 break-words">
                <div className="flex flex-row-reverse items-center justify-end gap-6 w-4 ">
                  <span>{(page - 1) * pageSize + (idx + 1)}</span>
                  <i
                    className={`fa-solid ${
                      expandedRow === item.id
                        ? "fa-chevron-up"
                        : "fa-chevron-left"
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
              {/* مقادیر ستون‌ها */}
              {columns.map((col) => (
                <td className="p-4 break-words" key={col.key}>
                  {col.key === "type"
                    ? getTypeLabel(item.type)
                    : col.key === "status"
                    ? getStatusLabel(item.status)
                    : col.key === "twoFactorEnabled"
                    ? getTwoFactorLabel(item.twoFactorEnabled)
                    : item[col.key]}
                </td>
              ))}
              {/* ستون عملیات (قابل فریز شدن) */}
              <td
                className={`p-4 break-words ${
                  stickyActionEnabled ? "sticky left-0" : ""
                }`}
                style={{
                  minWidth: "100px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  background: bgColor, // پس‌زمینه دقیقاً مثل ردیف
                  zIndex: stickyActionEnabled ? 50 : "auto",
                }}
              >
                <ActionButtons
                  buttons={actionButtons.map((btn) => ({
                    ...btn,
                    onClick: () => btn.onClick(item),
                  }))}
                />
              </td>
            </tr>
            {/* نمایش جزئیات ردیف در حالت باز */}
            {expandedRow === item.id && (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="bg-gray-50 p-4 text-sm break-words text-start"
                >
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
                      <strong>ورود دو مرحله‌ای:</strong>{" "}
                      {getTwoFactorLabel(item.twoFactorEnabled)}
                    </div>
                    <div>
                      <strong>نام پدر:</strong> {item.fatherName}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
}

export default UserTableTbody;
