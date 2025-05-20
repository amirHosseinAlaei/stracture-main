import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  Upload,
  Typography,
} from "antd";
import {
  InboxOutlined,
  UndoOutlined,
  ArrowLeftOutlined,
  CloseOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const { Dragger } = Upload;
const { Title } = Typography;

const onlyNumbers = (value) => value.replace(/\D/g, "");

const validateNationalCode = (_, value) => {
  if (!value) return Promise.reject(new Error("لطفا کد ملی را وارد کنید"));
  if (!/^\d{10}$/.test(value))
    return Promise.reject(new Error("کد ملی باید ۱۰ رقم عدد باشد"));
  const check = +value[9];
  const sum = value
    .split("")
    .slice(0, 9)
    .reduce((acc, num, i) => acc + +num * (10 - i), 0);
  const remainder = sum % 11;
  if (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  ) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("کد ملی وارد شده معتبر نیست"));
};

const validateMobile = (_, value) => {
  if (!value)
    return Promise.reject(new Error("لطفا شماره موبایل را وارد کنید"));
  if (!/^09\d{9}$/.test(value))
    return Promise.reject(
      new Error("شماره موبایل باید ۱۱ رقم و با 09 شروع شود")
    );
  return Promise.resolve();
};

const MAX_IMAGES = 5;

const validateFile = (_, fileList) => {
  if (!fileList || fileList.length === 0) {
    return Promise.reject(new Error("لطفا حداقل یک فایل تصویر بارگذاری کنید"));
  }
  if (fileList.length > MAX_IMAGES) {
    return Promise.reject(
      new Error(`حداکثر تعداد فایل مجاز ${MAX_IMAGES} عدد است`)
    );
  }
  for (const file of fileList) {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      return Promise.reject(new Error("فقط فایل‌های تصویری مجاز هستند"));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return Promise.reject(new Error("حجم فایل باید کمتر از ۲ مگابایت باشد"));
    }
  }
  return Promise.resolve();
};

const SectionTitle = ({ title }) => (
  <div className="flex items-center my-5 gap-4">
    <Title level={4} className="m-0 pr-2">
      {title}
    </Title>
    <div className="flex-grow h-px bg-gray-300" />
  </div>
);

const SESSION_STORAGE_KEY = "generalInfoFormData";
const SESSION_STORAGE_BIRTHDATE_KEY = "generalInfoFormBirthDate";
const SESSION_STORAGE_FILELIST_KEY = "generalInfoFormFileList";

const GeneralInfoFormWithDrawer = () => {
  const [form] = Form.useForm();
  const [birthDate, setBirthDate] = useState(null);
  const [birthDateError, setBirthDateError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    // Load form values
    const savedForm = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        form.setFieldsValue(parsed);
      } catch {}
    }

    // Load birthDate
    const savedBirthDate = sessionStorage.getItem(
      SESSION_STORAGE_BIRTHDATE_KEY
    );
    if (savedBirthDate) {
      try {
        const dateObj = new DateObject({
          calendar: persian,
          locale: persian_fa,
          date: JSON.parse(savedBirthDate),
        });
        setBirthDate(dateObj);
      } catch {}
    }

    // Load fileList
    const savedFiles = sessionStorage.getItem(SESSION_STORAGE_FILELIST_KEY);
    if (savedFiles) {
      try {
        const files = JSON.parse(savedFiles);
        // Recreate preview URLs
        const previews = files.map((file) => {
          // File object in sessionStorage won't have originFileObj, so preview url must be stored
          return { uid: file.uid, url: file.url };
        });
        setFileList(files);
        setPreviewUrls(previews);
        form.setFieldsValue({ upload: files });
      } catch {}
    }
  }, [form]);

  const onValuesChange = (_, allValues) => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(allValues));
  };

  const onBirthDateChange = (date) => {
    setBirthDate(date);
    if (birthDateError) setBirthDateError(null);
    if (date) {
      sessionStorage.setItem(
        SESSION_STORAGE_BIRTHDATE_KEY,
        JSON.stringify(date.toJSON())
      );
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_BIRTHDATE_KEY);
    }
  };

  const onFinish = (values) => {
    if (!birthDate) {
      setBirthDateError("لطفا تاریخ تولد را انتخاب کنید");
      return;
    } else {
      setBirthDateError(null);
    }

    const gregorian = birthDate.convert("gregorian");
    values.birthDate = gregorian.toDate().toISOString();

    console.log("Form Values:", values);

    // Clear session storage on submit
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_BIRTHDATE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_FILELIST_KEY);
  };

  const onReset = () => {
    setBirthDate(null);
    setBirthDateError(null);
    form.resetFields();
    setFileList([]);
    setErrorFiles([]);
    setPreviewUrls([]);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_BIRTHDATE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_FILELIST_KEY);
  };

  const handleChange = (info) => {
    let files = info.fileList.slice(-MAX_IMAGES);

    const overSized = [];
    const previews = [];

    files.forEach((file) => {
      if (file.size / 1024 / 1024 > 2) {
        overSized.push(file.name);
      } else {
        if (!file.url && !file.preview) {
          file.preview = URL.createObjectURL(file.originFileObj || file);
        }
        previews.push({ uid: file.uid, url: file.url || file.preview });
      }
    });

    setErrorFiles(overSized);
    setPreviewUrls(previews);

    const validFiles = files.filter((file) => file.size / 1024 / 1024 <= 2);
    setFileList(validFiles);
    form.setFieldsValue({ upload: validFiles });

    // Save files to sessionStorage (store minimal info)
    const filesToSave = validFiles.map((file) => ({
      uid: file.uid,
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url || file.preview,
    }));
    sessionStorage.setItem(
      SESSION_STORAGE_FILELIST_KEY,
      JSON.stringify(filesToSave)
    );
  };

  const handleRemoveImage = (uid) => {
    // حذف تصویر از fileList
    const newFileList = fileList.filter((file) => file.uid !== uid);
    setFileList(newFileList);

    // حذف تصویر از previewUrls
    const newPreviewUrls = previewUrls.filter((img) => img.uid !== uid);
    setPreviewUrls(newPreviewUrls);

    // به‌روزرسانی فرم
    form.setFieldsValue({ upload: newFileList });

    // به‌روزرسانی sessionStorage
    const filesToSave = newFileList.map((file) => ({
      uid: file.uid,
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url || file.preview,
    }));
    sessionStorage.setItem(
      SESSION_STORAGE_FILELIST_KEY,
      JSON.stringify(filesToSave)
    );
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <div className="min-h-screen p-4 flex flex-col relative">
        <Form
          id="my-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="my-form"
          className="flex-grow"
          onValuesChange={onValuesChange}
        >
          <SectionTitle title="اطلاعات سامانه" />

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="کد ملی"
                name="nationalCode"
                rules={[{ validator: validateNationalCode }]}
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
                rules={[{ validator: validateMobile }]}
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

            <Col span={6}>
              <Form.Item
                label="جنسیت"
                name="gender"
                rules={[
                  { required: true, message: "لطفا جنسیت را انتخاب کنید" },
                ]}
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
            rules={[
              { required: true, message: "لطفا نوع کاربر را انتخاب کنید" },
            ]}
          >
            <Radio.Group>
              <Radio value="0">شهروند</Radio>
              <Radio value="1">سازمانی</Radio>
            </Radio.Group>
          </Form.Item>

          <div className="gap-4 flex">
            سمت کاربر
            <button
              type="button"
              className="bg-emerald-600 px-2 hover:bg-emerald-700 cursor-pointer duration-300 text-white rounded-lg"
              onClick={openDrawer}
            >
              راهنما
            </button>
          </div>

          <SectionTitle title="بارگذاری تصویر" />

          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ validator: validateFile }]}
          >
            <>
              <Dragger
                name="files"
                multiple
                beforeUpload={() => false}
                accept="image/*"
                showUploadList={false}
                fileList={fileList}
                onChange={handleChange}
                disabled={fileList.length >= MAX_IMAGES}
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
                  برای بارگزاری عکس کلیک کنید یا فایل‌ها را بکشید و رها کنید
                </p>
                <p className="ant-upload-hint !mt-3 text-gray-600">
                  فقط فایل‌های تصویری مجاز هستند، حداکثر حجم هر فایل ۲ مگابایت
                  <div className="!mt-4 text-center font-bold text-blue-700">
                    {fileList.length}/{MAX_IMAGES} عکس انتخاب شده
                  </div>
                </p>
              </Dragger>

              {errorFiles.length > 0 && (
                <div className="mt-2 text-red-600 font-bold">
                  این فایل‌ بیش از ۲ مگابایت هست و بارگذاری نشدند:
                </div>
              )}

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

              <style>{`
                @keyframes fadeInScale {
                  from { opacity: 0; transform: scale(0.95);}
                  to { opacity: 1; transform: scale(1);}
                }
              `}</style>
            </>
          </Form.Item>
        </Form>
      </div>

      <div
        dir="ltr"
        className="sticky bottom-0 w-full left-0 right-0 bg-white shadow-2xl p-4 flex justify-between items-center z-50"
      >
        <div className="flex gap-4">
          <Button
            className="!px-8 !py-4 !bg-blue-800 hover:!bg-blue-900 min-w-[220px]"
            type="primary"
            htmlType="submit"
            form="my-form"
          >
            ارسال
          </Button>

          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
            type="text"
            className="!px-8 !py-4 !bg-gray-200 hover:!bg-gray-300 min-w-[90px]"
          >
            بازگشت
          </Button>
        </div>

        <Button
          className="!px-8 !border !border-slate-300 !py-4 !bg-slate-100 hover:!bg-slate-300 min-w-[90px]"
          onClick={onReset}
          icon={<UndoOutlined />}
          type="text"
        >
          ریست فرم
        </Button>
      </div>

      {/* دراور */}
      <Drawer
        title={
          <div className="flex mt-4 mb-2 flex-row-reverse justify-between items-center w-full">
            <button
              type="button"
              className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-full bg-red-200 text-red-800 hover:bg-red-300 duration-300"
              onClick={closeDrawer}
            >
              <CloseOutlined />
            </button>
            <span>راهنما</span>
          </div>
        }
        width={700} // این خط عرض دراور را بزرگ‌تر می‌کند
        placement="left"
        onClose={closeDrawer}
        open={isDrawerOpen}
        closable={false}
        className=""
        headerStyle={{
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <span
          className="fa-stack"
          style={{ fontSize: "4em", color: "#159c9c", width: "100%" }}
        >
          <div>
            <i className="mt-2 fa-duotone fa-layer-group fa-stack-2x"></i>
          </div>
        </span>

        <div className="text-[#159c9c] text-center mt-5 font-bold text-lg">
          سمت کاربر
        </div>
        <br />

        <div className="space-y-4 text-[18px] font-light ">
          <p>
            - منظور از سمت، موقعیت کاربر در چارت سازمانی مورد نظر است مانند
            مدیرکل، مدیر عامل، کارشناس، معاون مالی و ....
          </p>
          <p>- سمت‌ها در بخش مدیریت درختواره قابل تعریف و ویرایش هستند</p>
          <p>
            - با تعیین سمت کاربر می‌توانید موقعیت کاربر در گراف و درخت سازمانی
            را مشاهده کنید
          </p>
          <p>
            - با تعیین سمت کاربر می‌توانید موقعیت کاربر در گراف و درخت سازمانی
            را مشاهده کنید
          </p>
          <p>
            - با ثبت سمت می‌توانید از ویژگی دسترسی به سامانه با استفاده از سمت
            را استفاده کنید
          </p>
          <p>
            - در قسمت مدیریت سمت‌ها نیز می‌توانید کاربر مورد نظر را به سمت
            دلخواه خود متصل کنید
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default GeneralInfoFormWithDrawer;
