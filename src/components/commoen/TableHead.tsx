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
}

function UserTableThead({
  columns,
  onColumnsReorder,
  sortKey,
  sortOrder,
  onSortChange,
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

  // ستون‌هایی که نمی‌خوای درگ بشن:
  const nonDraggableKeys = ["rowNumber", "actions"];

  return (
    <thead className="bg-[#e3e5e9] sticky top-0 z-10">
      <tr>
        <th className="p-4 text-right select-none" key="rowNumber">
          ردیف
        </th>
        {columns.map((col, index) => {
          const isDragging = index === draggedIndex;
          const isDragOver = index === dragOverIndex;

          // فقط ستون lastName قابلیت مرتب سازی دارد:
          const isSortable = col.key === "lastName";

          const draggable = !nonDraggableKeys.includes(col.key);

          return (
            <th
              key={col.key}
              draggable={draggable}
              onDragStart={() => draggable && handleDragStart(index)}
              onDragEnter={() => draggable && handleDragEnter(index)}
              onDragOver={(e) => draggable && handleDragOver(e)}
              onDrop={() => draggable && handleDrop()}
              onDragEnd={() => draggable && handleDragEnd()}
              onClick={() => {
                if (isSortable) onSortChange(col.key);
              }}
              className={`
                p-4 select-none transition-all duration-300 ease-in-out
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
              {/* آیکون مرتب سازی */}
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
        <th className="p-4 select-none" key="actions">
          عملیات
        </th>
      </tr>
    </thead>
  );
}

export default UserTableThead;
