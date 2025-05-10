import { Layout, Button, Space } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;

interface LandingLayoutProps {}

/**
 * کامپوننت اصلی لندینگ پیج با پشتیبانی از RTL و طراحی واکنش‌گرا
 */
const LandingLayout: React.FC<LandingLayoutProps> = () => {
  return (
    <Layout 
      className="flex flex-col min-h-screen" 
      style={{ direction: "rtl" }}
    >
      {/* هدر سایت */}
      <Header 
        className="!bg-slate-800 flex items-center justify-between px-8"
      >
        <div className="text-white font-bold text-[22px]">
          لوگوی سایت
        </div>
        <Space>
          <Button 
            type="default" 
            size="large"
          >
            ورود
          </Button>
          <Button 
            type="primary" 
            size="large"
          >
            ثبت نام
          </Button>
        </Space>
      </Header>

      {/* محتوای اصلی */}
      <Content 
        className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <Outlet />
        </h1>
        <p className="text-lg text-gray-600">
          پاراگراف متن
        </p>
      </Content>

      {/* فوتر */}
      <Footer 
        className="!bg-slate-300 text-center text-base text-gray-800 font-medium tracking-wide"
      >
        قسمت فوتر
      </Footer>
    </Layout>
  );
};

export default LandingLayout;