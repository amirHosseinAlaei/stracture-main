//*Note => لندینگ پیج شامل 3 بخش هدر کانتنت و قوتر هست
//تکمیلی :  1  فوتر تاریخ روز رو نمایش میده   2 - بخش هدر ما شامل 2 قسمت لوگو و نمایش  نام کاربر هست و خوش امد گویی  3 - قسمت کانتن نمایش سامانه های موجود

import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { formatPersianDate } from "../utils/toPersia";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { CalendarOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const LandingLayout: React.FC = () => {
  const currentUserQuery = useCurrentUser();
  // Date-today
  const today = new Date();
  const persianFormattedDate = formatPersianDate(today);
  // Show-user-login
  const user = currentUserQuery.data?.data;
  const userDisplayName = currentUserQuery.isLoading
    ? "در حال بارگذاری..."
    : currentUserQuery.isError
    ? "خطا در دریافت"
    : user
    ? `${user.firstName} ${user.lastName}`
    : "کاربر ناشناس";

  // welcome-user-Alert
  useEffect(() => {
    const hasWelcomed = sessionStorage.getItem("hasWelcomed");
    if (currentUserQuery.data?.data && !hasWelcomed) {
      toast.success(`خوش آمدید، ${userDisplayName}`);
      sessionStorage.setItem("hasWelcomed", "true");
    }
  }, [userDisplayName, currentUserQuery.data?.data]);

  // error-toast
  useEffect(() => {
    if (currentUserQuery.isError) {
      toast.error("خطا در دریافت اطلاعات کاربر");
    }
  }, [currentUserQuery.isError]);

  return (
    <div className="flex flex-col min-h-screen" style={{ direction: "rtl" }}>
      <Layout className="flex-1 flex flex-col">
        {/*------ -Header- -----  */}
        <Header className="!bg-white shadow-lg flex items-center justify-between px-8">
          <div className="text-black font-bold text-[22px]">لوگوی سایت</div>
          <Button className="items-center to-current">{userDisplayName}</Button>
        </Header>
        {/*------ -Content- -----  */}
        <Content className="flex-1 flex flex-col px-4 p-4">
          <Outlet />
        </Content>
      </Layout>
      {/*------ -Layout- -----  */}
      <Footer className="!shadow-lg !bg-[#0101011a] text-center text-base !text-blue-600 font-bold tracking-wide">
        <div className="flex items-center justify-center gap-2">
          <CalendarOutlined className="text-xl" />
          <span>{`تاریخ امروز: ${persianFormattedDate}`}</span>
        </div>
      </Footer>
    </div>
  );
};

export default LandingLayout;
