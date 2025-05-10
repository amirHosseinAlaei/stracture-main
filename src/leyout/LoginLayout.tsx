import React from 'react';
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

// تعریف رابط‌های مورد نیاز
interface RegisterFormData {
  username: string;
  password: string;
}

interface RegisterLayoutProps {}

const RegisterLayout: React.FC<RegisterLayoutProps> = () => {
  // مدیریت فرم با تایپ‌های مشخص شده
  const onFinish = (values: RegisterFormData) => {
    console.log('formFinish', values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex sm:items-center sm:justify-center">
      {/* Responsive layout */}
      <div className="w-full h-screen sm:h-auto flex items-center justify-center sm:bg-transparent bg-white sm:shadow-none shadow sm:p-0 p-4">
        {/* forms */}
        <div className="w-full sm:w-[400px] bg-white sm:rounded-lg sm:shadow-lg p-6 sm:p-8 flex flex-col justify-center">
          <div className="flex items-center justify-between text-x font-bold px-2 mb-10">
            <div>ورود</div>
            <button
              className="p-2 rounded !duration-300 border-none bg-transparent hover:text-slate-600 cursor-pointer focus:outline-none"
            >
              <ArrowLeftOutlined className="text-lg" />
            </button>
          </div>

          {/* فرم با تایپ‌های مشخص شده */}
          <Form<RegisterFormData>
            name="register"
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
            requiredMark={false}
          >
            <Form.Item
              label="نام کاربری"
              name="username"
              rules={[{ 
                required: true, 
                message: "لطفاً نام کاربری را وارد کنید!" 
              }]}
            >
              <Input suffix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="رمز عبور"
              name="password"
              rules={[{ 
                required: true, 
                message: "لطفاً رمز عبور را وارد کنید!" 
              }]}
            >
              <Input.Password suffix={<LockOutlined />} />
            </Form.Item>

            <Form.Item className="!p-2">
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full !p-6"
              >
                ثبت‌نام
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterLayout;