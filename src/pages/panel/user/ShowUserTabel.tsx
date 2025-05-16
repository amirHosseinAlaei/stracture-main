import { useQuery } from "@tanstack/react-query";
import TabelContainer from "../../../components/commoen/TableContainer";
import getUsers from "../../../service/userFilter";

// این تابع برای درخواست داده‌ها از API است
const fetchUsers = async () => {
  const response = await getUsers();
  if (!response?.data?.items) {
    throw new Error("داده‌ای پیدا نشد.");
  }
  return response.data.items;
};

function ShowUserTabel() {
  // استفاده از useQuery برای بارگذاری داده‌ها از API
  const { 
    data,
    isLoading,
    isError,
    error 
  } = useQuery({
    queryKey: ["users"],  // تغییر در استفاده از queryKey
    queryFn: fetchUsers   // تغییر در استفاده از queryFn
  });

  // تعریف initialColumns برای ستون‌های جدول
  const initialColumns = [
  { key: "userName", label: "نام کاربری" },
  { key: "firstName", label: "نام" },
  { key: "lastName", label: "نام خانوادگی" },
  { key: "mobile", label: "موبایل" },
  { key: "type", label: "سامانه" },
  { key: "status", label: "وضعیت کاربران" },
  { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
];


  return (
    <div>
      {/* نمایش لودینگ در صورتی که داده‌ها در حال بارگذاری باشند */}
      {isLoading && (
        <div className="loading-spinner">در حال بارگذاری...</div>
      )}

      {/* نمایش خطا در صورتی که خطایی در درخواست رخ داده باشد */}
      {isError && (
        <div className="error-message">
          <p>خطا: {error.message}</p>
        </div>
      )}

      {/* نمایش جدول اگر داده‌ها با موفقیت بارگذاری شدند */}
      {!isLoading && !isError && data && (
        <TabelContainer initialColumns={initialColumns} data={data} />
      )}
    </div>
  );
}

export default ShowUserTabel;
