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

  // رنگ متن سبز و پس زمینه کم‌رنگ برای وضعیت فعال
  // رنگ متن قرمز و پس زمینه کم‌رنگ برای وضعیت غیرفعال
  const getStatusClass = (status: any) => {
    if (status === 1 || status === "1")
      return "w-16 !p-1.5 text-green-900"; // متن سبز تیره‌تر
    if (status === 0 || status === "0")
      return "w-16 !p-1.5 text-red-900"; // متن قرمز تیره‌تر
    return "";
  };

  // رنگ متن سبز و پس زمینه کم‌رنگ برای ورود دو مرحله‌ای فعال
  // رنگ متن قرمز و پس زمینه کم‌رنگ برای ورود دو مرحله‌ای غیرفعال
  const getTwoFactorClass = (twofactor: any) => {
    if (twofactor === true || twofactor === 1 || twofactor === "1")
      return "w-16 !p-1.5 text-green-900"; // متن سبز تیره‌تر
    if (twofactor === false || twofactor === 0 || twofactor === "0")
      return "w-16 !p-1.5 text-red-900"; // متن قرمز تیره‌تر
    return "";
  };

  // رنگ متن آبی تیره‌تر برای نوع کاربر
  const getTypeClass = (type: any) => {
    if (type === 0)
      return "w-16 !p-1.5 text-blue-900"; // سازمانی با متن آبی تیره‌تر
    if (type === 1)
      return "w-16 !p-1.5 text-blue-900"; // شهروند با متن آبی تیره‌تر
    return "";
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
              {/* مقادیر ستون‌ها با رنگ‌بندی متن و پس‌زمینه کم‌رنگ */}
              {columns.map((col) => {
                let className = "";
                let backgroundColor = "";

                if (col.key === "type") {
                  className = getTypeClass(item.type);
                  backgroundColor =
                    item.type === 0
                      ? "rgba(59, 130, 246, 0.2)" // آبی کم‌رنگ‌تر برای سازمانی
                      : "rgba(59, 130, 246, 0.2"; // آبی کم‌رنگ‌تر برای شهروند
                } else if (col.key === "status") {
                  className = getStatusClass(item.status);
                  backgroundColor =
                    item.status === 1 || item.status === "1"
                      ? "rgba(22, 163, 74, 0.2)" // سبز کم‌رنگ‌تر
                      : "rgba(220, 38, 38, 0.2)"; // قرمز کم‌رنگ‌تر
                } else if (col.key === "twoFactorEnabled") {
                  className = getTwoFactorClass(item.twoFactorEnabled);
                  backgroundColor =
                    item.twoFactorEnabled === true ||
                    item.twoFactorEnabled === 1 ||
                    item.twoFactorEnabled === "1"
                      ? "rgba(22, 163, 74, 0.2)" // سبز کم‌رنگ‌تر
                      : "rgba(220, 38, 38, 0.2)"; // قرمز کم‌رنگ‌تر
                }

                return (
                  <td className="p-4 break-words" key={col.key}>
                    <span
                      className={`${className}`}
                      style={{
                        display: "inline-block",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: backgroundColor || undefined,
                      }}
                    >
                      {col.key === "type"
                        ? getTypeLabel(item.type)
                        : col.key === "status"
                        ? getStatusLabel(item.status)
                        : col.key === "twoFactorEnabled"
                        ? getTwoFactorLabel(item.twoFactorEnabled)
                        : item[col.key]}
                    </span>
                  </td>
                );
              })}
              {/* ستون عملیات */}
              <td
                className={`p-4 break-words ${
                  stickyActionEnabled ? "sticky left-0" : ""
                }`}
                style={{
                  minWidth: "100px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  background: bgColor,
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
