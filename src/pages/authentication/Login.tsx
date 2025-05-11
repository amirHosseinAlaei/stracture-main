import React from "react";
import { Form, Input, Button } from "antd";

function Login() {
  const onFinish = () => {
    console.log("موفق:");
  };

  const onFinishFailed = () => {
    console.log("ناموفق:");
  };

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "Vazirmatn, IRANSans, Tahoma, sans-serif",
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        ورود به حساب کاربری
      </h2>
      <Form 
      className=""
        name="login"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="نام کاربری"
          name="username"
          rules={[
            { required: true, message: "لطفاً نام کاربری را وارد کنید!" },
          ]}
        >
          <Input placeholder="نام کاربری" />
        </Form.Item>

        <Form.Item
          label="رمز عبور"
          name="password"
          rules={[{ required: true, message: "لطفاً رمز عبور را وارد کنید!" }]}
        >
          <Input.Password placeholder="رمز عبور" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            ورود
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
