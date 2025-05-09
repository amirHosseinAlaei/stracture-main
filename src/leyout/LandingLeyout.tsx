import { Layout, Button, Space } from "antd";

const { Header, Content, Footer } = Layout;

function LandingLayout() {
  return (
    <Layout className=" flex flex-col" style={{ direction: "rtl" }}>
      {/* Header */}
      <Header className="!bg-slate-800 flex items-center justify-between px-8">
        <div className="text-white font-bold text-[22px]">
          لوگوی سایت
        </div>
        <Space>
          <Button type="default" size="large">
            ورود
          </Button>
          <Button type="primary" size="large">
            ثبت نام
          </Button>
        </Space>
      </Header>

      {/* Main Content */}
      <Content className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          هدر متن 
        </h1>
        <p className="text-lg text-gray-600">
          پاراگراف متن
        </p>
      </Content>

      {/* Footer */}
      <Footer className="!bg-slate-300 text-center text-base text-gray-800 font-medium tracking-wide">
        قسمت فوتر
      </Footer>
    </Layout>
  );
}

export default LandingLayout;
