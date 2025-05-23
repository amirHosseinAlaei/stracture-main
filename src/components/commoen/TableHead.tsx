import React, { useState, useRef } from "react";

interface Column {
  key: string;
  label: string;
}

interface UserTableTheadProps {
  columns: Column[];
  onColumnsReorder: (newColumns: Column[]) => void;
  sortKey: string | null;
  sortOrder: "asc" | "desc" | null;
  onSortChange: (key: string) => void;
  dragEnabled?: boolean;
  sortLastNameEnabled?: boolean;
}

function UserTableThead({
  columns,
  onColumnsReorder,
  sortKey,
  sortOrder,
  onSortChange,
  dragEnabled = true,
  sortLastNameEnabled = true,
}: UserTableTheadProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    if (dragItem.current === null || dragItem.current === index) return;
    setDragOverIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (draggedIndex === null || dragOverIndex === null) return;

    const newColumns = [...columns];
    const draggedCol = newColumns.splice(draggedIndex, 1)[0];
    newColumns.splice(dragOverIndex, 0, draggedCol);

    onColumnsReorder(newColumns);

    setDraggedIndex(null);
    setDragOverIndex(null);
    dragItem.current = null;
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    dragItem.current = null;
  };

  // ستون‌هایی که نباید درگ شوند
  const nonDraggableKeys = ["rowNumber", "actions"];

  return (
    <thead className="bg-[#e3e5e9] sticky top-0 z-10">
      <tr>
        {/* ستون ردیف */}
        <th
          className="p-4 text-right select-none break-words bg-[#e3e5e9] sticky right-0 z-50"
          key="rowNumber"
        >
          ردیف
        </th>
        {/* سایر ستون‌ها */}
        {columns.map((col, index) => {
          const isDragging = index === draggedIndex;
          const isDragOver = index === dragOverIndex;
          const isSortable = sortLastNameEnabled && col.key === "lastName";
          const draggable = dragEnabled && !nonDraggableKeys.includes(col.key);

          return (
            <th
              key={col.key}
              draggable={draggable}
              onDragStart={() => draggable && handleDragStart(index)}
              onDragEnter={() => draggable && handleDragEnter(index)}
              onDragOver={draggable ? handleDragOver : undefined}
              onDrop={() => draggable && handleDrop()}
              onDragEnd={() => draggable && handleDragEnd()}
              onClick={() => {
                if (isSortable) onSortChange(col.key);
              }}
              className={`
                p-4 select-none transition-all duration-300 ease-in-out break-words bg-[#e3e5e9]
                ${
                  isSortable
                    ? "cursor-pointer hover:bg-gray-300"
                    : draggable
                    ? "cursor-grab"
                    : "cursor-default"
                }
                ${
                  isDragging
                    ? "opacity-90 scale-110 shadow-2xl cursor-grabbing bg-blue-300 z-30 relative rounded-md"
                    : ""
                }
                ${
                  isDragOver && !isDragging
                    ? "bg-blue-100 border-2 border-blue-500 rounded-md"
                    : ""
                }
              `}
              style={{
                userSelect: "none",
                boxShadow: isDragging
                  ? "0 10px 25px rgba(59, 130, 246, 0.7)"
                  : undefined,
              }}
            >
              {col.label}
              {/* آیکون مرتب‌سازی */}
              {isSortable && (
                <i
                  className={`mr-1 fa-solid ${
                    sortKey === col.key && sortOrder === "asc"
                      ? "fa-arrow-down text-blue-600"
                      : "fa-arrow-up text-gray-400"
                  }`}
                  aria-hidden="true"
                />
              )}
            </th>
          );
        })}
        {/* ستون عملیات */}
        <th
          className="p-4 select-none break-words bg-[#e3e5e9] sticky left-0 z-50"
          key="actions"
          style={{
            minWidth: "100px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          عملیات
        </th>
      </tr>
    </thead>
  );
}

export default UserTableThead;
