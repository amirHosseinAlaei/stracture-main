import { useEffect, useState } from "react";
import TabelContainer from "../../../components/commoen/TableContainer";
import getUsers from "../../../service/userFilter";

const initialColumns = [
  { key: "userName", label: "نام کاربری" },
  { key: "firstName", label: "نام" },
  { key: "lastName", label: "نام خانوادگی" },
  { key: "mobile", label: "موبایل" },
  { key: "type", label: "سامانه" },
  { key: "status", label: "وضعیت کاربران" },
  { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
];

function ShowUserTabel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUsers();
      setData(res?.data?.items || []);
    };
    fetchData();
  }, []);

  return (
    <div>
      <TabelContainer initialColumns={initialColumns} data={data} />
    </div>
  );
}

export default ShowUserTabel;
