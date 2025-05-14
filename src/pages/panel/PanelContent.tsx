
import React, { useState, useMemo } from "react";
import UserTableTbody from "./Tbody";
import UserTableThead from "./Tead";
import { UserTable } from "../../hooks/userTable";

const initialColumns = [
  { key: "userName", label: "نام کاربری" },
  { key: "firstName", label: "نام" },
  { key: "lastName", label: "نام خانوادگی" },
  { key: "mobile", label: "موبایل" },
  { key: "type", label: "سامانه" },
  { key: "status", label: "وضعیت کاربران" },
  { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
];

const PAGE_SIZES = [5, 10, 20, 30, 40, 50];

function PanelContent() {
  const { data } = UserTable();
  const items = data?.data?.items || [];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // به جای ثابت PAGE_SIZE
  const [columns, setColumns] = useState(initialColumns);

  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedItems = useMemo(() => {
    const sorted = [...items];
    if (sortKey) {
      sorted.sort((a, b) => {
        const valA = a[sortKey] ?? "";
        const valB = b[sortKey] ?? "";
        if (typeof valA === "string") {
          return sortOrder === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          return sortOrder === "asc" ? valA - valB : valB - valA;
        }
      });
    }
    return sorted;
  }, [items, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedItems.length / pageSize);
  const paginatedItems = sortedItems.slice((page - 1) * pageSize, page * pageSize);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1); // وقتی سایز صفحه تغییر می‌کند، صفحه را به 1 برگردانیم
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-xl shadow-sm mb-4">
        <table className="table-auto w-full rounded bordrnone">
          <UserTableThead
            columns={columns}
            setColumns={setColumns}
            onSort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />
          <UserTableTbody
            items={paginatedItems}
            columns={columns}
            page={page}
            pageSize={pageSize}
          />
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-3">

        {/* انتخاب تعداد سطرها */}
        

        {/* دکمه قبلی */}
        <button
          className={`px-4 py-2 border rounded-md font-medium transition-colors duration-200 ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300"
          }`}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="صفحه قبلی"
        >
          قبلی
        </button>

        {/* دکمه‌های عددی صفحات */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`px-3 py-1 border rounded-md font-medium transition-colors duration-200 ${
              pageNumber === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300"
            }`}
            aria-current={pageNumber === page ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}

        {/* دکمه بعدی */}
        <button
          className={`px-4 py-2 border rounded-md font-medium transition-colors duration-200 ${
            page === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300"
          }`}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          aria-label="صفحه بعدی"
        >
          بعدی
        </button>

        <div className="  p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center">
          <label htmlFor="pageSizeSelect" className="font-medium">
            سطرها
          </label>
          <select
            id="pageSizeSelect"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="rounded px-2 py-1"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default PanelContent;