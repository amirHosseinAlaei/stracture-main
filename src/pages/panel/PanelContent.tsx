import React from "react";
import { UserTable } from "../../hooks/userTable";
import UserTableThead from "./Tead";
import UserTableTbody from "./Tbody";

// فقط ۴ ستون دلخواه را اینجا تعریف کن
const columns = [
  { key: "userName", label: "نام کاربری" },
  { key: "firstName", label: "نام" },
  { key: "lastName", label: "نام خانوادگی" },
  { key: "mobile", label: "موبایل" },
];

function PanelContent() {
  const x = UserTable();
  const items = x?.data?.data?.items || [];

  return (
    <table>
      <UserTableThead columns={columns} />
      <UserTableTbody items={items} columns={columns} />
    </table>
  );
}

export default PanelContent;
