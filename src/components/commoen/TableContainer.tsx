import React, { useState } from "react";
import UserTableTbody from "./Tbody";
import UserTableThead from "./Tead";
import { Button, Modal } from "antd";
import FilterModal from "./filter";

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
  actionButtons?: React.ReactNode;
  onFilterChange?: (filters: any) => void; // اضافه شده برای ارسال فیلتر به والد
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
  actionButtons,
  onFilterChange,
}: TabelContainerProps) {
  const [columns, setColumns] = useState(initialColumns);

  const totalPages = Math.ceil(totalCount / pageSize);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({});

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

  const handleFilterApply = (values: any) => {
    setFilterValues(values);
    setIsFilterModalVisible(false);
    if (onFilterChange) onFilterChange(values);
  };

  const handleFilterCancel = () => {
    setIsFilterModalVisible(false);
  };

  return (
    <div className="px-5 py-4">
      {/* بخش جستجو */}
      <div className="flex justify-between mb-6">
        <div className="flex gap-2 items-center">
          <label htmlFor="search" className="font-medium text-gray-700">
            جستجو:
          </label>
          <div className="relative border rounded-md shadow border-slate-200 p-2 w-80 flex items-center gap-2">
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
              className="w-full py-2 pl-10 pr-4 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="جستجو در تمام فیلدها"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
            />
            <button
              onClick={handleSearchClick}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              جستجو
            </button>
          </div>
          <Button className="!h-12" onClick={() => setIsFilterModalVisible(true)}>
            <i className="fa fa-filter"></i>
          </Button>
        </div>
        <div className="text-gray-500">تعداد کل : {totalCount}</div>
      </div>

      {/* جدول */}
      <div className="overflow-x-auto rounded-xl shadow-sm mb-4">
        <table className="table-auto w-full rounded border-none">
          <UserTableThead columns={columns} onColumnsReorder={handleColumnsReorder} />
          <UserTableTbody
            items={data}
            columns={columns}
            page={page}
            pageSize={pageSize}
            actionButtons={actionButtons}
          />
        </table>
      </div>

      {/* صفحه بندی */}
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
          <label htmlFor="pageSizeSelect" className="font-medium mr-2">
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

      {/* مدال فیلتر */}
      <Modal
        title="فیلترها"
        visible={isFilterModalVisible}
        footer={null}
        onCancel={handleFilterCancel}
        destroyOnClose={true}
      >
        <FilterModal
          initialValues={filterValues}
          handleFilterApply={handleFilterApply}
          handleFilterCancel={handleFilterCancel}
        />
      </Modal>
    </div>
  );
}

export default TabelContainer;
