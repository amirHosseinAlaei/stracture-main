import React, { useState, useMemo } from "react";
import UserTableTbody from "./Tbody";
import UserTableThead from "./Tead";

const PAGE_SIZES = [5, 10, 20, 30, 40, 50];

function TabelContainer({ initialColumns, data }) {
  const items = data || [];

  const [searchQuery, setSearchQuery] = useState(""); // اضافه کردن state برای جستجو
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [columns, setColumns] = useState(initialColumns);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (key === "firstName" || key === "lastName") {
      if (sortKey === key) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortOrder("asc");
      }
    }
  };

  // فیلتر کردن داده‌ها بر اساس query جستجو
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items; // اگر چیزی جستجو نشده، همه داده‌ها رو نمایش می‌دهیم
    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [items, searchQuery]);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
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
  }, [filteredItems, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedItems.length / pageSize);
  const paginatedItems = sortedItems.slice((page - 1) * pageSize, page * pageSize);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="px-5 py-4">
      {/* بخش جستجو */}
      <div className="flex justify-between mb-6">
        <div className="flex gap-2 items-center">
          <label htmlFor="search" className="font-medium text-gray-700">جستجو:</label>
          <div className="relative w-80">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="جستجو در تمام فیلدها"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
        <div className="text-gray-500">تعداد کل : {filteredItems.length}</div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm mb-4">
        <table className="table-auto w-full rounded border-none">
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

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-4 py-2 border rounded-md font-medium transition-colors duration-200 ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300"
          }`}
        >
          قبلی
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`px-3 py-1 border rounded-md font-medium transition-colors duration-200 ${
              pageNumber === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-4 py-2 border rounded-md font-medium transition-colors duration-200 ${
            page === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300"
          }`}
        >
          بعدی
        </button>

        <div className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center">
          <label htmlFor="pageSizeSelect" className="font-medium">
            سطرها
          </label>
          <select
            id="pageSizeSelect"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="rounded px-2 py-1 outline-none focus:outline-none"
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

export default TabelContainer;
