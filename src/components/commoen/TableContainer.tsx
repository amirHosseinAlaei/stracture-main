import React, { useState } from "react";
import UserTableThead from "./TableHead";
import UserTableTbody from "./TableBody";
import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TableSettingsModal from "./TabelSeting";

const PAGE_SIZES = [5, 10, 20, 30, 40, 50];

interface Column {
  key: string;
  label: string;
}

interface TabelContainerProps {
  initialColumns: Column[];
  data: any[];
  totalCount: number;
  searchInput: string;
  setSearchInput: (val: string) => void;
  setSearch: (val: string) => void;
  page: number;
  setPage: (val: number) => void;
  pageSize: number;
  setPageSize: (val: number) => void;
  actionButtons?: React.ReactNode[];
}

function TabelContainer({
  initialColumns,
  data,
  totalCount,
  searchInput,
  setSearchInput,
  setSearch,
  page,
  setPage,
  pageSize,
  setPageSize,
  actionButtons = [],
}: TabelContainerProps) {
  // تنظیمات جدول
  const [dragEnabled, setDragEnabled] = useState(false);
  const [stickyActionEnabled, setStickyActionEnabled] = useState(false);
  const [sortLastNameEnabled, setSortLastNameEnabled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [columns, setColumns] = useState(initialColumns);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const totalPages = Math.ceil(totalCount / pageSize);

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortOrder) return data;
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortKey]?.toString().toLowerCase() || "";
      const bVal = b[sortKey]?.toString().toLowerCase() || "";
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortKey, sortOrder]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setPage(1);
  };

  const handleSearchClick = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const handleColumnsReorder = (newColumns: Column[]) => {
    setColumns(newColumns);
  };

  const handleSortChange = (key: string) => {
    if (sortKey === key) {
      setSortKey(null);
      setSortOrder(null);
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setPage(1);
  };

  return (
    <div className="px-5 py-4">
     

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 sticky top-0 bg-white z-50 px-2 py-3 gap-3">
        
        <div className="flex gap-2 items-center w-full md:w-auto">
          
          <label htmlFor="search" className="font-medium text-gray-700">
            جستجو:
          </label>
          <div className="relative border rounded-md shadow border-slate-200 p-2 w-full md:w-80 flex items-center gap-2">
            <input
              id="search"
              type="text"
              value={searchInput}
              onChange={(e) => {
                const val = e.target.value;
                setSearchInput(val);
                if (val === "") {
                  setPage(1);
                  setSearch("");
                }
              }}
              className="w-full py-2 pl-10 pr-4 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="جستجو در تمام فیلدها"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
            />
            <button
              onClick={handleSearchClick}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm md:text-base"
            >
              جستجو
            </button>
          </div>
          
           <div className="flex items-center gap-2 ">
        <Button 
          icon={<SettingOutlined />}
          onClick={() => setSettingsOpen(true)}
          className="flex w-22 !h-full !p-2  hover:bg-blue-700 transition-all duration-200 "
type="primary"
        >
          تنظیمات 
        </Button>
        <TableSettingsModal
          open={settingsOpen}
          setOpen={setSettingsOpen}
          dragEnabled={dragEnabled}
          setDragEnabled={setDragEnabled}
          stickyActionEnabled={stickyActionEnabled}
          setStickyActionEnabled={setStickyActionEnabled}
          sortLastNameEnabled={sortLastNameEnabled}
          setSortLastNameEnabled={setSortLastNameEnabled}
        />
      </div>
        </div>
        <div className="text-gray-500 text-sm md:text-base">
          تعداد کل : {totalCount}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm mb-4">
        <table className="min-w-[600px] w-full table-auto border-collapse">
          <UserTableThead
            columns={columns}
            onColumnsReorder={handleColumnsReorder}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            dragEnabled={dragEnabled}
            sortLastNameEnabled={sortLastNameEnabled}
          />
          <UserTableTbody
            items={sortedData}
            columns={columns}
            page={page}
            pageSize={pageSize}
            actionButtons={actionButtons}
            stickyActionEnabled={stickyActionEnabled}
          />
        </table>
      </div>

      <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
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

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
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
          )
        )}

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

        <div className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center mt-2 md:mt-0">
          <label
            htmlFor="pageSizeSelect"
            className="font-medium mr-2 text-sm md:text-base"
          >
            سطرها
          </label>
          <select
            id="pageSizeSelect"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="rounded px-2 py-1 outline-none focus:outline-none text-sm md:text-base"
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
