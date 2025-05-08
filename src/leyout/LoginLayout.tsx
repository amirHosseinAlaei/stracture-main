import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function LoginLayout() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const formItemStyle = { marginBottom: 8 };

  return (
    <div className="h-screen flex justify-center items-center bg-[#f0f2f5]">
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <Form
          name="login_form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="ایمیل"
            name="email"
            required={false}
            colon={false}
            rules={[
              { required: true, message: "لطفا ایمیل خود را وارد کنید!" },
              { type: "email", message: "لطفا یک ایمیل معتبر وارد کنید!" },
            ]}
            style={formItemStyle}
          >
            <Input prefix={<UserOutlined />} placeholder="ایمیل" />
          </Form.Item>
          <Form.Item
            label="رمز عبور"
            name="password"
            required={false}
            colon={false}
            rules={[
              { required: true, message: "لطفا رمز عبور خود را وارد کنید!" },
            ]}
            style={formItemStyle}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="رمز عبور" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              ورود
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginLayout;
