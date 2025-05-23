import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { formatPersianDate } from "../utils/toPersia";
import { useEffect } from "react";
import { toast } from "react-hot-toast"; // اضافه کردن ایمپورت

const { Header, Content, Footer } = Layout;

const LandingLayout: React.FC = () => {
  const currentUserQuery = useCurrentUser();
// Date today  
  const today = new Date();
  const persianFormattedDate = formatPersianDate(today);

// Show user
  const fullName = currentUserQuery.isLoading
    ? "در حال بارگذاری..."
    : currentUserQuery.isError
    ? "خطا در دریافت"
    : currentUserQuery.data?.data
    ? `${currentUserQuery.data.data.firstName} ${currentUserQuery.data.data.lastName}`
    : "کاربر ناشناس";

  useEffect(() => {
    const hasWelcomed = sessionStorage.getItem("hasWelcomed");
    if (currentUserQuery.data?.data && !hasWelcomed) {
      toast.success(`خوش آمدید، ${fullName}`);
      sessionStorage.setItem("hasWelcomed", "true"); 
    }
  }, [fullName, currentUserQuery.data?.data]); 

  return (
    <div className="flex flex-col min-h-screen" style={{ direction: "rtl" }}>
      <Layout className="flex-1 flex flex-col">
        {/* Header */}
        <Header className="!bg-white shadow-lg flex items-center justify-between px-8">
          <div className="text-black font-bold text-[22px]">لوگوی سایت</div>
          <Button className="items-center to-current">{fullName}</Button>
        </Header>

        {/* Content */}
        <Content className="flex-1 flex flex-col px-4 p-4">
          <Outlet />
        </Content>
      </Layout>

      {/* Footer */}
      <Footer className="!shadow-lg !bg-[#0101011a] text-center text-base !text-blue-600 font-bold tracking-wide">
        <div className="flex items-center justify-center space-x-2">
          <i className="fas fa-calendar-day text-xl"></i> {/* آیکون تقویم */}
          <span>{`تاریخ امروز: ${persianFormattedDate}`}</span>
        </div>
      </Footer>
    </div>
  );
};

export default LandingLayout;
