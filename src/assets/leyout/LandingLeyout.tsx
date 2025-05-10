import { Layout, Button, Space } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function LandingLeyout() {
  return (
    <Layout  style={{ minHeight: "100vh", direction: "rtl" }}>
      {/* Header */}
      <Header  className="!bg-slate-00"  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>
          لوگوی سایت
        </div>
 
        <Space direction="horizontal">
  <Button type="default">ورود</Button>
  <Button type="primary">ثبت نام</Button>
</Space>

      </Header>

      {/* Main Content */}
      <Content style={{ padding: "50px", textAlign: "center" }}>
        <h1>به سایت ما خوش آمدید!</h1>
        <p>
        </p>
      </Content>

      {/* Footer */}
      <Footer  className="!bg-slate-300" style={{ textAlign: "center" }}>
        قسمت فوتر
      </Footer>
    </Layout>
  );
}

export default LandingLeyout;
