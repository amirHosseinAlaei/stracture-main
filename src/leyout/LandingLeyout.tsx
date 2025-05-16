import { Layout, Button } from "antd";
import { data, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

// وارد کردن توابع از فایل dateUtils
import { formatPersianDate } from "../utils/toPersia"; // مسیر فایل را درست وارد کنید

const { Header, Content, Footer } = Layout;

interface LandingLayoutProps {}

const LandingLayout: React.FC<LandingLayoutProps> = () => {
  const x = useCurrentUser();

  // گرفتن تاریخ امروز
  const today = new Date();

  // فرمت کردن تاریخ به شکل "شنبه ۲۷ اردیبهشت ۱۴۰۴"
  const persianFormattedDate = formatPersianDate(today);

  return (
    <div className="flex flex-col min-h-screen" style={{ direction: "rtl" }}>
      <Layout className="flex-1 flex flex-col">
        {/* landing-header */}
        <Header className="!bg-white shadow-lg flex items-center justify-between px-8">
          <div className="text-black font-bold text-[22px]">لوگوی سایت</div>
          <Button className="items-center to-current">
            {x?.data?.data?.firstName + " " + x?.data?.data?.lastName}
          </Button>
        </Header>

        {/* content => outlet */}
        <Content className="flex-1 flex flex-col px-4 p-4">
          <Outlet />
        </Content>
      </Layout>

      {/* footer */}
      <Footer className="!shadow-lg !bg-[#0101011a] text-center text-base text-gray-800 font-medium tracking-wide">
        {/* اضافه کردن تاریخ و روز فارسی */}
        <div>{`تاریخ امروز: ${persianFormattedDate}`}</div>
      </Footer>
    </div>
  );
};

export default LandingLayout;
