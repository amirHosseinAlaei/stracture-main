import React, { useState } from "react";
import { UserTable } from "../../hooks/userTable";
import UserTableTbody from "./Tbody";
import { UserTableThead } from "./Tead";

const initialColumns = [
  { key: "userName", label: "نام کاربری" },
  { key: "firstName", label: "نام" },
  { key: "lastName", label: "نام خانوادگی" },
  { key: "mobile", label: "موبایل" },
];

const PAGE_SIZE = 5;

function PanelContent() {
  const { data } = UserTable();
  const items = data?.data?.items || [];

  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState(initialColumns);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const paginatedItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-4">
      <table className="table-auto w-full border border-gray-300 rounded">
        <UserTableThead columns={columns} setColumns={setColumns} />
        <UserTableTbody items={paginatedItems} columns={columns} />
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          قبلی
        </button>
        <span className="mx-2">
          صفحه {page} از {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}

export default PanelContent;
