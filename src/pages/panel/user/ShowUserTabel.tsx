import { useQuery } from "@tanstack/react-query";
import TabelContainer from "../../../components/commoen/TableContainer";
import getUsers from "../../../service/userFilter";

const ShowUserTabel = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUsers();
      if (!res?.data?.items) throw new Error("داده‌ای پیدا نشد.");
      return res.data.items;
    },
  });

  const columns = [
    { key: "userName", label: "نام کاربری" },
    { key: "firstName", label: "نام" },
    { key: "lastName", label: "نام خانوادگی" },
    { key: "mobile", label: "موبایل" },
    { key: "type", label: "سامانه" },
    { key: "status", label: "وضعیت کاربران" },
    { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
  ];

  if (isLoading)
    return <div className="loading-spinner">در حال بارگذاری...</div>;
  if (isError) return <div className="error-message">خطا: {error.message}</div>;

  return <TabelContainer initialColumns={columns} data={data} />;
};

export default ShowUserTabel;
