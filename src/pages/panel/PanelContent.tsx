import { useState } from "react";
import { UserTable } from "../../hooks/userTable";
import UserTableThead from "./Tead";
import UserTableTbody from "./Tbody";

const columns = [
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
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const paginatedItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-4 bg-violet-600 rolg">
      <table className="  table-auto w-full  bg-amber-50    rounded-lg">
        <UserTableThead columns={columns} />
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
