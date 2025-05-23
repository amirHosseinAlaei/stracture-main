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
  validateImageFiles,
} from "../../../../utils/formHellper";
import toast from "react-hot-toast";

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

const SignatureUpload = ({ form }) => {
  const [fileList, setFileList] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (info) => {
    let files = info.fileList.slice(-1);
    const previews = [];
    const validFiles = files.filter((file) => {
      if (file.size / 1024 / 1024 > 2) return false;
      if (!file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj || file);
      }
      previews.push({ uid: file.uid, url: file.url || file.preview });
      return true;
    });
    setPreviewUrls(previews);
    setFileList(validFiles);
    form.setFieldsValue({ SignatureFile: validFiles });
  };

  const handleRemoveImage = (uid) => {
    const newFileList = fileList.filter((file) => file.uid !== uid);
    setFileList(newFileList);
    setPreviewUrls(previewUrls.filter((img) => img.uid !== uid));
    form.setFieldsValue({ SignatureFile: newFileList });
  };

  return (
    <>
      <Dragger
        name="signature"
        multiple={false}
        beforeUpload={() => false}
        accept="image/*"
        showUploadList={false}
        fileList={fileList}
        onChange={handleChange}
        disabled={fileList.length >= 1}
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
          برای بارگذاری امضا کلیک کنید یا فایل را بکشید و رها کنید
        </p>
        <p className="ant-upload-hint mt-3 text-gray-600">
          فقط یک فایل تصویری، حداکثر ۲ مگابایت
        </p>
      </Dragger>
      {previewUrls.length > 0 && (
        <div className="flex gap-3 mt-4 flex-wrap">
          {previewUrls.map((img) => (
            <div
              key={img.uid}
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
                src={img.url}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <CloseCircleOutlined
                onClick={() => handleRemoveImage(img.uid)}
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
          ))}
        </div>
      )}
    </>
  );
};

const GeneralInfoFormWithDrawer = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    select: (data) => data?.data,
    enabled: !!id,
  });

  const [form] = Form.useForm();
  const [birthDate, setBirthDate] = useState(null);
  const [birthDateError, setBirthDateError] = useState(null);

  // Avatar states
  const [avatarFileList, setAvatarFileList] = useState([]);
  const [avatarPreviewUrls, setAvatarPreviewUrls] = useState([]);

  const [isAccessLimited, setIsAccessLimited] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      // برای نمایش عکس قبلی اگر نیاز بود اینجا ست کن
    }
  }, [data, form]);

  const onBirthDateChange = (date) => {
    setBirthDate(date);
    if (birthDateError) setBirthDateError(null);
  };

  const createUser = useMutation({
    mutationFn: apiPostUser,
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ارسال شد");
      onReset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "ارسال اطلاعات با خطا مواجه شد");
    },
  });

  const updateUser = useMutation({
    mutationFn: apiUpdateUser,
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ارسال شد");
      onReset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "ارسال اطلاعات با خطا مواجه شد");
    },
  });

  const onFinish = (values) => {
    if (!birthDate) {
      setBirthDateError("لطفا تاریخ تولد را انتخاب کنید");
      return;
    }
    setBirthDateError(null);

    const gregorian = birthDate.convert("gregorian");
    values.birthDate = gregorian.toDate().toISOString();
    if (data && id) values.id = id;

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "AvatarFile" && Array.isArray(avatarFileList)) {
        avatarFileList.forEach((file) => {
          formData.append("AvatarFile", file.originFileObj || file);
        });
      } else if (key === "SignatureFile" && Array.isArray(values.SignatureFile)) {
        values.SignatureFile.forEach((file) => {
          formData.append("SignatureFile", file.originFileObj || file);
        });
      } else {
        formData.append(key, values[key]);
      }
    });

    if (data && id) {
      updateUser.mutate(formData);
    } else {
      createUser.mutate(formData);
    }
  };

  const onReset = () => {
    setBirthDate(null);
    setBirthDateError(null);
    form.resetFields();
    setAvatarFileList([]);
    setAvatarPreviewUrls([]);
  };

  // Avatar handlers
  const handleAvatarChange = (info) => {
    let files = info.fileList.slice(-1);
    const previews = [];
    const validFiles = files.filter((file) => {
      if (file.size / 1024 / 1024 > 2) return false;
      if (!file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj || file);
      }
      previews.push({ uid: file.uid, url: file.url || file.preview });
      return true;
    });
    setAvatarPreviewUrls(previews);
    setAvatarFileList(validFiles);
    form.setFieldsValue({ AvatarFile: validFiles });
  };

  const handleRemoveAvatar = (uid) => {
    const newFileList = avatarFileList.filter((file) => file.uid !== uid);
    setAvatarFileList(newFileList);
    setAvatarPreviewUrls(avatarPreviewUrls.filter((img) => img.uid !== uid));
    form.setFieldsValue({ AvatarFile: newFileList });
  };

  return (
    <div>
      <div className="min-h-screen p-4 flex flex-col relative">
        <Form
          id="my-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="nationalCode"
          className="flex-grow"
        >
          <Row gutter={16}>
            {/* nationalCode */}
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
                  onChange={(e) => {
                    const onlyNum = onlyNumbers(e.target.value);
                    if (onlyNum !== e.target.value) {
                      form.setFieldsValue({ nationalCode: onlyNum });
                    }
                  }}
                />
              </Form.Item>
            </Col>

            {/* firstName */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="نام"
                name="firstName"
                rules={[{ required: true, message: "لطفا نام را وارد کنید" }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>

            {/* lastName */}
            <Col xs={24} sm={12} md={8} lg={6}>
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

            <Col xs={24} sm={12} md={8} lg={6}>
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

          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
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
            <Col xs={24} sm={12} md={8} lg={6}>
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
            <Col xs={24} sm={12} md={8} lg={6}>
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
            <Col xs={24} sm={12} md={8} lg={6}>
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
                      message:
                        "رمز عبور باید شامل حروف بزرگ، کوچک و یک کاراکتر خاص باشد",
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

          <Driverguide />

          <SectionTitle title="بارگذاری تصویر" />

          <Row className=" mb-8 md:mb-auto" gutter={16}>
            {/* آپلود عکس کاربر */}
            <Col xs={24} md={12}>
              <Form.Item
                label="عکس کاربر"
                name="avatarBase64"
                valuePropName="avatarBase64`"
                getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
                rules={[
                  {
                    validator: (_, fileList) => {
                      if (!fileList || fileList.length === 0) return Promise.resolve();
                      const error = validateImageFiles(fileList, 1);
                      return error ? Promise.reject(new Error(error)) : Promise.resolve();
                    },
                  },
                ]}
              >
                <>
                  <Dragger
                    name="avatar"
                    multiple={false}
                    beforeUpload={() => false}
                    accept="image/*"
                    showUploadList={false}
                    fileList={avatarFileList}
                    onChange={handleAvatarChange}
                    disabled={avatarFileList.length >= 1}
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
                      برای بارگزاری عکس کلیک کنید یا فایل را بکشید و رها کنید
                    </p>
                    <p className="ant-upload-hint mt-3 text-gray-600">
                      فقط یک عکس، فرمت تصویری و حداکثر ۲ مگابایت
                    </p>
                  </Dragger>
                  {avatarPreviewUrls.length > 0 && (
                    <div className="flex gap-3 mt-4 flex-wrap">
                      {avatarPreviewUrls.map((img) => (
                        <div
                          key={img.uid}
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
                            src={img.url}
                            alt="preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <CloseCircleOutlined
                            onClick={() => handleRemoveAvatar(img.uid)}
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
                      ))}
                    </div>
                  )}
                </>
              </Form.Item>
            </Col>

            {/* آپلود امضا */}
            <Col xs={24} md={12}>
              <Form.Item
                label="امضا"
                name="SignatureFile"
                valuePropName="fileList"
                getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
                rules={[
                  {
                    validator: (_, fileList) => {
                      if (!fileList || fileList.length === 0) return Promise.resolve();
                      const error = validateImageFiles(fileList, 1);
                      return error ? Promise.reject(new Error(error)) : Promise.resolve();
                    },
                  },
                ]}
              >
                <SignatureUpload form={form} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

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
