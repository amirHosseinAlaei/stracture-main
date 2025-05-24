import { Row, Col, Form, Input, Radio } from "antd";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const GeneralInfoSection = ({
  form,
  id,
  birthDate,
  birthDateError,
  onBirthDateChange,
  setBirthDateError,
  onlyNumbers,
  validateNationalCode,
}) => (
  <Row gutter={16}>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        label="کد ملی"
        name="nationalCode"
        rules={[
          { required: true, message: "لطفا کد ملی را وارد کنید" },
          {
            pattern: /^\d{10}$/,
            message: "کد ملی باید ۱۰ رقم عدد باشد",
          },
          {
            validator: (_, value) =>
              !value || validateNationalCode(value)
                ? Promise.resolve()
                : Promise.reject("کد ملی وارد شده معتبر نیست"),
          },
        ]}
      >
        <Input
          maxLength={10}
          allowClear
          disabled={!!id}
          onChange={(e) => {
            const onlyNum = onlyNumbers(e.target.value);
            if (onlyNum !== e.target.value) {
              form.setFieldsValue({ nationalCode: onlyNum });
            }
          }}
        />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        label="نام"
        name="firstName"
        rules={[{ required: true, message: "لطفا نام را وارد کنید" }]}
      >
        <Input allowClear />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        label="نام خانوادگی"
        name="lastName"
        rules={[{ required: true, message: "لطفا نام خانوادگی را وارد کنید" }]}
      >
        <Input allowClear />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        label="نام پدر"
        name="fatherName"
        rules={[{ required: true, message: "لطفا نام پدر را وارد کنید" }]}
      >
        <Input allowClear />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        label="موبایل"
        name="mobile"
        rules={[
          { required: true, message: "لطفا شماره موبایل را وارد کنید" },
          {
            pattern: /^09\d{9}$/,
            message: "شماره موبایل باید ۱۱ رقم و با 09 شروع شود",
          },
        ]}
      >
        <Input
          maxLength={11}
          allowClear
          onChange={(e) => {
            const onlyNum = onlyNumbers(e.target.value);
            if (onlyNum !== e.target.value) {
              form.setFieldsValue({ mobile: onlyNum });
            }
          }}
        />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        label="ایمیل"
        name="email"
        rules={[
          { required: true, message: "لطفا ایمیل را وارد کنید" },
          { type: "email", message: "ایمیل وارد شده معتبر نیست" },
        ]}
      >
        <Input allowClear />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        name="birthDateT"
        label="تاریخ تولد"
        required
        validateStatus={birthDateError ? "error" : ""}
        help={birthDateError || ""}
      >
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={birthDate}
          onChange={onBirthDateChange}
          inputClass="border border-gray-300 rounded-md px-3 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          calendarPosition="bottom-right"
          placeholder="انتخاب تاریخ تولد"
          editable={false}
          maxDate={new DateObject().subtract(1, "day")}
        />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6}>
      <Form.Item
        label="جنسیت"
        name="gender"
        rules={[{ required: true, message: "لطفا جنسیت را انتخاب کنید" }]}
      >
        <Radio.Group>
          <Radio value={1}>مرد</Radio>
          <Radio value={0}>زن</Radio>
        </Radio.Group>
      </Form.Item>
    </Col>
  </Row>
);

export default GeneralInfoSection;
