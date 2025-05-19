import React from 'react';
import { Form, Input, DatePicker, Button, Row, Col, Radio, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import 'dayjs/locale/fa';

const { Dragger } = Upload;

dayjs.extend(jalaliday);
dayjs.locale('fa');

const onlyNumbers = (value: string) => value.replace(/\D/g, '');

const validateNationalCode = (_: any, value?: string) => {
  if (!value) return Promise.reject(new Error('لطفا کد ملی را وارد کنید'));
  if (!/^\d{10}$/.test(value)) return Promise.reject(new Error('کد ملی باید ۱۰ رقم عدد باشد'));
  const check = +value[9];
  const sum = value
    .split('')
    .slice(0, 9)
    .reduce((acc, num, i) => acc + +num * (10 - i), 0);
  const remainder = sum % 11;
  if ((remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('کد ملی وارد شده معتبر نیست'));
};

const validateMobile = (_: any, value?: string) => {
  if (!value) return Promise.reject(new Error('لطفا شماره موبایل را وارد کنید'));
  if (!/^09\d{9}$/.test(value)) return Promise.reject(new Error('شماره موبایل باید ۱۱ رقم و با 09 شروع شود'));
  return Promise.resolve();
};

const draggerProps = {
  name: 'files',
  multiple: true,
  beforeUpload: (file: File) => false,
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center my-5 gap-4">
    <h1 className="text-lg m-0 pr-2">{title}</h1>
    <div className="flex-grow h-px bg-gray-300" />
  </div>
);

const GeneralInfoForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (values.birthDate) {
      values.birthDate = values.birthDate.calendar('gregory').format('YYYY-MM-DD');
    }
    console.log('Form Values:', values);
  };

  return (
<div>
      <div className="min-h-screen p-4 flex flex-col relative">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ birthDate: dayjs().calendar('jalali') }}
        className="flex-grow"
      >
        <SectionTitle title="اطلاعات سامانه" />

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="کد ملی"
              name="nationalCode"
              rules={[
                { required: true, message: 'لطفا کد ملی را وارد کنید' },
                { validator: validateNationalCode },
              ]}
            >
              <Input
                maxLength={10}
                onChange={e => {
                  const onlyNum = onlyNumbers(e.target.value);
                  if (onlyNum !== e.target.value) {
                    form.setFieldsValue({ nationalCode: onlyNum });
                  }
                }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="نام" name="firstName" rules={[{ required: true, message: 'لطفا نام را وارد کنید' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="نام خانوادگی"
              name="lastName"
              rules={[{ required: true, message: 'لطفا نام خانوادگی را وارد کنید' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="نام پدر" name="fatherName" rules={[{ required: true, message: 'لطفا نام پدر را وارد کنید' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="موبایل"
              name="mobile"
              rules={[
                { required: true, message: 'لطفا شماره موبایل را وارد کنید' },
                { validator: validateMobile },
              ]}
            >
              <Input
                maxLength={11}
                onChange={e => {
                  const onlyNum = onlyNumbers(e.target.value);
                  if (onlyNum !== e.target.value) {
                    form.setFieldsValue({ mobile: onlyNum });
                  }
                }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="ایمیل"
              name="email"
              rules={[
                { required: true, message: 'لطفا ایمیل را وارد کنید' },
                { type: 'email', message: 'ایمیل وارد شده معتبر نیست' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="تاریخ تولد"
              name="birthDate"
              rules={[{ required: true, message: 'لطفا تاریخ تولد را انتخاب کنید' }]}
            >
              <DatePicker
                className="bg-slate-50 w-full"
                locale={{ lang: { locale: 'fa' } }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="جنسیت"
              name="gender"
              rules={[{ required: true, message: 'لطفا جنسیت را انتخاب کنید' }]}
            >
              <Radio.Group>
                <Radio value="0">مرد</Radio>
                <Radio value="1">زن</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          className="mt-2"
          label="نوع کاربر"
          name="type"
          rules={[{ required: true, message: 'لطفا نوع کاربر را انتخاب کنید' }]}
        >
          <Radio.Group>
            <Radio value="0">شهروند</Radio>
            <Radio value="1">سازمانی</Radio>
          </Radio.Group>
        </Form.Item>

        <SectionTitle title="بارگذاری تصویر" />

        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
          noStyle
        >
          <Dragger {...draggerProps} style={{ padding: 20 }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">برای بارگزاری عکس کلیک کنید ...</p>
            <p className="ant-upload-hint">با کشیدن عکس و انداختن در اینجا نیز می‌توانید</p>
          </Dragger>
        </Form.Item>
      </Form>

     
    </div>
     <div dir='ltr' className="sticky !gap-4 bottom-0 left-0 right-0 bg-white shadow-2xl p-4 flex  z-50 ">
        <Button className="!p-5 w-full max-w-xs !bg-blue-800 hover:!bg-blue-900" type="primary" htmlType="submit" form={form.getFieldInstance ? undefined : undefined}>
          ارسال
        </Button>

<Button className="!p-5 w-full max-w-24  !bg-slate-100   hover:!bg-slate-200 duration-300  " type="text" htmlType="submit" form={form.getFieldInstance ? undefined : undefined}>
          ارسال
        </Button>
      </div>
</div>
  );
};

export default GeneralInfoForm;
