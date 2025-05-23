import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  Upload,
  Typography,
  message,
  TimePicker,
} from "antd";
import {
  InboxOutlined,
  UndoOutlined,
  ArrowLeftOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Driverguide from "../../../../utils/Driverguide";
import { useMutation, useQuery } from "@tanstack/react-query";
import getUserById, {
  apiPostUser,
  apiUpdateUser,
} from "../../../../service/userService";
import { useParams } from "react-router-dom";
import {
  onlyNumbers,
  validateNationalCode,
} from "../../../../utils/formHellper";

const { Dragger } = Upload;
const { Title } = Typography;

const SectionTitle = ({ title }) => (
  <div className="flex items-center my-5 gap-4">
    <Title level={4} className="m-0 pr-2">
      {title}
    </Title>
    <div className="flex-grow h-px bg-gray-300" />
  </div>
);

const MAX_IMAGE_SIZE_MB = 2;

const GeneralInfoFormWithDrawer = () => {
  // React Query
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    select: (data) => data?.data,
    enabled: !!id,
  });

  // Form and states
  const [form] = Form.useForm();
  const [birthDate, setBirthDate] = useState(null);
  const [birthDateError, setBirthDateError] = useState(null);
  const [isAccessLimited, setIsAccessLimited] = useState(false);

  // --- Image Upload States ---
  const [avatarFile, setAvatarFile] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [signatureFile, setSignatureFile] = useState([]);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const [otherFile, setOtherFile] = useState([]);
  const [otherPreview, setOtherPreview] = useState(null);

  // --- Load data if edit mode ---
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      if (data.birthDate) {
        setBirthDate(
          new DateObject(data.birthDate).convert(persian, persian_fa)
        );
      }
      // اگر فایل‌ها از سرور برگردند، اینجا می‌توانید پیش‌نمایش‌شان را ست کنید
      // setAvatarPreview(data.avatarUrl)
      // setSignaturePreview(data.signatureUrl)
      // setOtherPreview(data.otherDocUrl)
    }
  }, [data, form]);

  // --- API mutations ---
  const createUser = useMutation({
    mutationFn: apiPostUser,
    onSuccess: () => {
      message.success("اطلاعات با موفقیت ارسال شد");
      onReset();
    },
    onError: () => {
      message.error("ارسال اطلاعات با خطا مواجه شد");
    },
  });

  const updateUser = useMutation({
    mutationFn: apiUpdateUser,
    onSuccess: () => {
      message.success("اطلاعات با موفقیت ارسال شد");
      onReset();
    },
    onError: () => {
      message.error("ارسال اطلاعات با خطا مواجه شد");
    },
  });

  // --- Image Upload Handlers ---
  const handleImageChange = (info, setFile, setPreview) => {
    let file = info.fileList.slice(-1)[0]; // فقط آخرین فایل
    if (file) {
      // حجم و نوع
      if (!file.type.startsWith("image/")) {
        message.error("فقط فایل تصویری مجاز است");
        return;
      }
      if ((file.size || 0) / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
        message.error("حجم فایل باید کمتر از ۲ مگابایت باشد");
        return;
      }
      // پیش‌نمایش
      if (!file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj || file);
      }
      setFile([file]);
      setPreview(file.url || file.preview);
      form.setFieldsValue({ [file.name]: [file] });
    } else {
      setFile([]);
      setPreview(null);
      form.setFieldsValue({ [file.name]: [] });
    }
  };

  const handleRemoveImage = (setFile, setPreview, name) => {
    setFile([]);
    setPreview(null);
    form.setFieldsValue({ [name]: [] });
  };

  // --- Form Submit ---
  const onFinish = (values) => {
    if (!birthDate) {
      setBirthDateError("لطفا تاریخ تولد را انتخاب کنید");
      return;
    }
    setBirthDateError(null);

    // اعتبارسنجی تصاویر
    if (avatarFile.length === 0)
      return message.error("لطفا عکس کاربر را بارگذاری کنید");
    if (signatureFile.length === 0)
      return message.error("لطفا امضای کاربر را بارگذاری کنید");
    if (otherFile.length === 0)
      return message.error("لطفا تصویر مدرک دیگر را بارگذاری کنید");

    // تبدیل تاریخ
    const gregorian = birthDate.convert("gregorian");
    values.birthDate = gregorian.toDate().toISOString();
    if (data && id) values.id = id;

    // آماده‌سازی فرم دیتا
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    // اضافه کردن فایل‌ها
    if (avatarFile[0])
      formData.append(
        "AvatarFile",
        avatarFile[0].originFileObj || avatarFile[0]
      );
    if (signatureFile[0])
      formData.append(
        "SignatureFile",
        signatureFile[0].originFileObj || signatureFile[0]
      );
    if (otherFile[0])
      formData.append("OtherFile", otherFile[0].originFileObj || otherFile[0]);

    if (data && id) {
      updateUser.mutate(formData);
    } else {
      createUser.mutate(formData);
    }
  };

  // --- Reset ---
  const onReset = () => {
    setBirthDate(null);
    setBirthDateError(null);
    form.resetFields();
    setAvatarFile([]);
    setAvatarPreview(null);
    setSignatureFile([]);
    setSignaturePreview(null);
    setOtherFile([]);
    setOtherPreview(null);
  };

  return (
    <div>
      <div className="min-h-screen p-4 flex flex-col relative">
        <h4 className="mt-4 mb-4 text-md font-bold">اطلاعات عمومی</h4>
        <Form
          id="my-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="nationalCode"
          className="flex-grow"
        >
          {/* اطلاعات فردی */}
          <Row gutter={16}>
            <Col span={6}>
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
                  onChange={(e) => {
                    const onlyNum = onlyNumbers(e.target.value);
                    if (onlyNum !== e.target.value) {
                      form.setFieldsValue({ nationalCode: onlyNum });
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="نام"
                name="firstName"
                rules={[{ required: true, message: "لطفا نام را وارد کنید" }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="نام خانوادگی"
                name="lastName"
                rules={[
                  { required: true, message: "لطفا نام خانوادگی را وارد کنید" },
                ]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="نام پدر"
                name="fatherName"
                rules={[
                  { required: true, message: "لطفا نام پدر را وارد کنید" },
                ]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={6}>
              <Form.Item
                name="birthDate"
                label="تاریخ تولد"
                required
                validateStatus={birthDateError ? "error" : ""}
                help={birthDateError || ""}
              >
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={birthDate}
                  onChange={setBirthDate}
                  inputClass="border border-gray-300 rounded-md px-3 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  calendarPosition="bottom-right"
                  placeholder="انتخاب تاریخ تولد"
                  editable={false}
                  maxDate={new DateObject().subtract(1, "day")}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="جنسیت"
                name="gender"
                rules={[
                  { required: true, message: "لطفا جنسیت را انتخاب کنید" },
                ]}
              >
                <Radio.Group>
                  <Radio value={1}>مرد</Radio>
                  <Radio value={0}>زن</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <SectionTitle title="اطلاعات سامانه" />
          {/* اطلاعات سامانه */}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="نوع کاربر"
                name="type"
                rules={[
                  { required: true, message: "لطفا نوع کاربر را انتخاب کنید" },
                ]}
              >
                <Radio.Group>
                  <Radio value={0}>شهروند</Radio>
                  <Radio value={1}>سازمانی</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="وضعیت"
                name="status"
                rules={[
                  { required: true, message: "لطفا وضعیت را انتخاب کنید" },
                ]}
              >
                <Radio.Group>
                  <Radio value={1}>فعال</Radio>
                  <Radio value={0}>غیرفعال</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="ورود دو مرحله‌ای"
                name="twoFactorEnabled"
                rules={[
                  {
                    required: true,
                    message: "لطفا وضعیت ورود دو مرحله‌ای را انتخاب کنید",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={true}>فعال</Radio>
                  <Radio value={false}>غیرفعال</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="دسترسی به وب‌سرویس"
                name="smsWebServiceAccess"
                rules={[
                  {
                    required: true,
                    message: "لطفا وضعیت دسترسی به وب‌سرویس را انتخاب کنید",
                  },
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
            <Col span={6}>
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
              <Col span={6}>
                <Form.Item
                  label="رمز عبور"
                  name="password"
                  rules={[
                    { required: true, message: "رمز عبور الزامی است" },
                    { min: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!]).{6,}$/,
                      message:
                        "رمز عبور باید شامل حروف بزرگ، کوچک و یک کاراکتر خاص باشد",
                    },
                  ]}
                >
                  <Input.Password allowClear />
                </Form.Item>
              </Col>
            )}
            <Col span={6}>
              <Form.Item label="استعلام ثبت حوال" name="sabtHaval">
                <Input disabled placeholder="مقدار استعلام ثبت حوال" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="استعلام شاهکار" name="shahkar">
                <Input disabled placeholder="مقدار استعلام شاهکار" />
              </Form.Item>
            </Col>
          </Row>
          {/* محدودیت زمانی */}
          <div className="flex items-center gap-x-4 w-full flex-row">
            <div className="flex justify-center text-center mt-6 items-center">
              <Button
                type={isAccessLimited ? "primary" : "default"}
                onClick={() => setIsAccessLimited((prev) => !prev)}
                className={`mb-4 flex items-center rounded-2xl w-auto ${
                  isAccessLimited ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <span
                  className={`inline-block w-7 h-7 rounded-full bg-white border border-gray-300 ${
                    isAccessLimited ? "mr-0 ml-2" : "ml-0 mr-2"
                  }`}
                />
                <span className="p-2 px-4">
                  {isAccessLimited
                    ? "مجاز ورود در ساعات معین"
                    : "محدودیت زمانی غیرفعال است"}
                </span>
              </Button>
            </div>

            <div className="w-1/2">
              <Row gutter={16}>
                {isAccessLimited && (
                  <>
                    <Col span={12}>
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
                    <Col span={12}>
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
          <Driverguide />
          <SectionTitle title="بارگذاری تصویر" />
          <div className=" flex flex-col gap-5 md:flex-row    ">
            <div className="w-full">
              {/* --- Avatar Upload --- */}
              <Form.Item
                className=" w-full"
                label="عکس کاربر"
                name="AvatarFile"
                valuePropName="fileList"
                rules={[
                  {
                    validator: () =>
                      avatarFile.length === 0
                        ? Promise.reject("لطفا عکس کاربر را بارگذاری کنید")
                        : Promise.resolve(),
                  },
                ]}
              >
                <>
                  <Dragger
                    name="AvatarFile"
                    multiple={false}
                    beforeUpload={() => false}
                    accept="image/*"
                    showUploadList={false}
                    fileList={avatarFile}
                    onChange={(info) =>
                      handleImageChange(info, setAvatarFile, setAvatarPreview)
                    }
                    disabled={avatarFile.length >= 1}
                    style={{
                      padding: 24,
                      borderRadius: 12,
                      borderColor: "#1890ff",
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined style={{ color: "#1890ff" }} />
                    </p>
                    <p className="ant-upload-text text-lg font-semibold">
                      فقط یک عکس کاربر بارگزاری کنید
                    </p>
                    <p className="ant-upload-hint mt-3 text-gray-600">
                      فقط فایل تصویری، حداکثر حجم ۲ مگابایت
                    </p>
                  </Dragger>

                  {avatarPreview && (
                    <div className="flex gap-3 mt-4 flex-wrap">
                      <div
                        style={{
                          position: "relative",
                          width: 90,
                          height: 90,
                          borderRadius: 8,
                          border: "1px solid #eee",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={avatarPreview}
                          alt="avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <CloseCircleOutlined
                          onClick={() =>
                            handleRemoveImage(
                              setAvatarFile,
                              setAvatarPreview,
                              "AvatarFile"
                            )
                          }
                          style={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                            backgroundColor: "white",
                            borderRadius: "50%",
                          }}
                          title="حذف تصویر"
                        />
                      </div>
                    </div>
                  )}
                </>
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item
                className=" "
                label="امضای کاربر"
                name="SignatureFile"
                valuePropName="fileList"
                rules={[
                  {
                    validator: () =>
                      signatureFile.length === 0
                        ? Promise.reject("لطفا امضای کاربر را بارگذاری کنید")
                        : Promise.resolve(),
                  },
                ]}
              >
                <>
                  <Dragger
                    name="SignatureFile"
                    multiple={false}
                    beforeUpload={() => false}
                    accept="image/*"
                    showUploadList={false}
                    fileList={signatureFile}
                    onChange={(info) =>
                      handleImageChange(
                        info,
                        setSignatureFile,
                        setSignaturePreview
                      )
                    }
                    disabled={signatureFile.length >= 1}
                    style={{
                      padding: 24,
                      borderRadius: 12,
                      borderColor: "#1890ff",
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined style={{ color: "#1890ff" }} />
                    </p>
                    <p className="ant-upload-text text-lg font-semibold">
                      فقط یک تصویر امضای کاربر بارگزاری کنید
                    </p>
                    <p className="ant-upload-hint mt-3 text-gray-600">
                      فقط فایل تصویری، حداکثر حجم ۲ مگابایت
                    </p>
                  </Dragger>

                  {signaturePreview && (
                    <div className="flex gap-3 mt-4 flex-wrap">
                      <div
                        style={{
                          position: "relative",
                          width: 90,
                          height: 90,
                          borderRadius: 8,
                          border: "1px solid #eee",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={signaturePreview}
                          alt="signature"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <CloseCircleOutlined
                          onClick={() =>
                            handleRemoveImage(
                              setSignatureFile,
                              setSignaturePreview,
                              "SignatureFile"
                            )
                          }
                          style={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                            backgroundColor: "white",
                            borderRadius: "50%",
                          }}
                          title="حذف تصویر"
                        />
                      </div>
                    </div>
                  )}
                </>
              </Form.Item>
            </div>
          </div>
          {/* --- Signature Upload --- */}
        </Form>
      </div>

      {/* دکمه‌های پایین صفحه */}
      <div
        dir="ltr"
        className="fixed bottom-0 w-full md:w-[88.3%] left-0 bg-white shadow-2xl p-4 flex justify-between items-center z-50"
      >
        <div className="flex gap-4">
          <Button
            className="px-8 py-4 bg-blue-800 hover:bg-blue-900 min-w-[220px]"
            type="primary"
            htmlType="submit"
            form="my-form"
            loading={createUser.isLoading}
          >
            ارسال
          </Button>

          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
            type="text"
            className="px-8 hidden md:flex py-4 bg-gray-200 hover:bg-gray-300 min-w-[90px]"
          >
            بازگشت
          </Button>
        </div>

        <Button
          className="px-8 border border-slate-300 py-4 bg-slate-100 hover:bg-slate-300 min-w-[90px]"
          onClick={onReset}
          icon={<UndoOutlined />}
          type="text"
        >
          ریست فرم
        </Button>
      </div>
    </div>
  );
};

export default GeneralInfoFormWithDrawer;
