import { Row, Col, Form, Input, Radio, TimePicker, Button } from "antd";
import AllowedIPInput from "./IpButton";

const SystemInfoSection = ({
  form,
  data,
  id,
  isAccessLimited,
  setIsAccessLimited,
}) => (
  <>
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item
          label="نوع کاربر"
          name="type"
          rules={[{ required: true, message: "لطفا نوع کاربر را انتخاب کنید" }]}
        >
          <Radio.Group>
            <Radio value={0}>شهروند</Radio>
            <Radio value={1}>سازمانی</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item
          label="وضعیت"
          name="status"
          rules={[{ required: true, message: "لطفا وضعیت را انتخاب کنید" }]}
        >
          <Radio.Group>
            <Radio value={1}>فعال</Radio>
            <Radio value={0}>غیرفعال</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item
          label="ورود دو مرحله‌ای"
          name="twoFactorEnabled"
          rules={[
            { required: true, message: "لطفا وضعیت ورود دو مرحله‌ای را انتخاب کنید" },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>فعال</Radio>
            <Radio value={false}>غیرفعال</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item
          label="دسترسی به وب‌سرویس"
          name="smsWebServiceAccess"
          rules={[
            { required: true, message: "لطفا وضعیت دسترسی به وب‌سرویس را انتخاب کنید" },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>دارد</Radio>
            <Radio value={false}>ندارد</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item
          label="نام کاربری"
          name="userName"
          rules={[
            { required: true, message: "نام کاربری الزامی است" },
            { min: 3, message: "نام کاربری باید حداقل ۳ کاراکتر باشد" },
          ]}
        >
          <Input allowClear />
        </Form.Item>
      </Col>
      {!data && !id && (
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item
            label="رمز عبور"
            name="password"
            rules={[
              { required: true, message: "رمز عبور الزامی است" },
              { min: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!]).{6,}$/,
                message: "رمز عبور باید شامل حروف بزرگ، کوچک و یک کاراکتر خاص باشد",
              },
            ]}
          >
            <Input.Password allowClear />
          </Form.Item>
        </Col>
      )}
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item label="استعلام ثبت حوال" name="sabtHaval">
          <Input disabled placeholder="مقدار استعلام ثبت حوال" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item label="استعلام شاهکار" name="shahkar">
          <Input disabled placeholder="مقدار استعلام شاهکار" />
        </Form.Item>
      </Col>
    </Row>
    <div className="flex items-center gap-x-4 w-full flex-row flex-wrap">
      <div className="flex justify-center text-center mt-6 items-center">
        <Button
          type={isAccessLimited ? "primary" : "default"}
          onClick={() => setIsAccessLimited((prev) => !prev)}
          className={`mb-4 flex items-center !rounded-2xl !shadow-lg w-auto ${
            isAccessLimited ? "flex-row " : "flex-row-reverse"
          }`}
        >
          <span
            className={`inline-block w-7 h-7 rounded-full bg-white border border-gray-300 ${
              isAccessLimited ? "  -mr-4" : "-ml-4"
            }`}
          />
          <span className="p-2 px-4">
            {isAccessLimited
              ? "مجاز ورود در ساعات معین"
              : "محدودیت زمان غیرفعال است"}
          </span>
        </Button>
      </div>
      <div className="w-full md:w-1/2">
        <Row gutter={16}>
          {isAccessLimited && (
            <>
              <Col xs={24} md={12}>
                <Form.Item
                  label="ساعت مجاز آغاز ورود"
                  name="allowedLoginStartTime"
                  rules={[
                    {
                      required: true,
                      message: "لطفا ساعت مجاز آغاز ورود را انتخاب کنید",
                    },
                  ]}
                >
                  <TimePicker
                    format="HH:mm"
                    placeholder="مثلاً 08:00"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="ساعت مجاز پایان ورود"
                  name="allowedLoginEndTime"
                  rules={[
                    {
                      required: true,
                      message: "لطفا ساعت مجاز پایان ورود را انتخاب کنید",
                    },
                  ]}
                >
                  <TimePicker
                    format="HH:mm"
                    placeholder="مثلاً 17:00"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </div>
    </div>
    <div className="items-end bg-blue-900 flex justify-end mt-2">
      <AllowedIPInput />
    </div>
  </>
);

export default SystemInfoSection;
