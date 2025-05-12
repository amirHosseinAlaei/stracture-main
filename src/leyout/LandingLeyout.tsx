import { Layout, Button, Space } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer } = Layout;
// header and footer is fixe and content => outlet

interface LandingLayoutProps {}
const LandingLayout: React.FC<LandingLayoutProps> = () => {
  return (
    <div className="flex flex-col min-h-screen" style={{ direction: "rtl" }}>
      <Layout className="flex-1 flex flex-col">
        {/* landing-header */}
        <Header className="!bg-slate-800 flex items-center justify-between px-8">
          <div className="text-white font-bold text-[22px]">لوگوی سایت</div>
          <Space>
            <Button type="default" size="large">
              ورود
            </Button>
            <Button type="primary" size="large">
              ثبت نام
            </Button>
          </Space>
        </Header>

        {/* content => outlet */}
        <Content className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
          <Outlet />
        </Content>
      </Layout>

      {/* foter */}
      {/* **  if contnet more => foter in layout */}
      <Footer className="!bg-slate-300 text-center text-base text-gray-800 font-medium tracking-wide">
        قسمت فوتر

        <i className="fal b!g-amber-500 fa-dog-leashed">q</i>
      </Footer>
    </div>
  );
};

export default LandingLayout;
