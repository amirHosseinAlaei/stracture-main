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
import { apiPostUser, apiUpdateUser } from "../../../../service/postUser";
import { useParams } from "react-router-dom";
import getUserById from "../../../../service/getUSerid";

const { Dragger } = Upload;

const { Title } = Typography;

const onlyNumbers = (value) => value.replace(/\D/g, "");

const MAX_IMAGES = 5;

const SectionTitle = ({ title }) => (
  <div className="flex items-center my-5 gap-4">
    <Title level={4} className="m-0 pr-2">
      {title}
    </Title>
    <div className="flex-grow h-px bg-gray-300" />
  </div>
);

// const SESSION_STORAGE_KEY = "generalInfoFormData";
// const SESSION_STORAGE_BIRTHDATE_KEY = "generalInfoFormBirthDate";
// const SESSION_STORAGE_FILELIST_KEY = "generalInfoFormFileList";

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
  const [fileList, setFileList] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [isAccessLimited, setIsAccessLimited] = useState(false);

  // useEffect(() => {
  //   const savedForm = sessionStorage.getItem(SESSION_STORAGE_KEY);
  //   if (savedForm) {
  //     try {
  //       const parsed = JSON.parse(savedForm);
  //       form.setFieldsValue(parsed);
  //     } catch {}
  //   }
  //   const savedBirthDate = sessionStorage.getItem(
  //     SESSION_STORAGE_BIRTHDATE_KEY
  //   );
  //   if (savedBirthDate) {
  //     try {
  //       const dateObj = new DateObject({
  //         calendar: persian,
  //         locale: persian_fa,
  //         date: JSON.parse(savedBirthDate),
  //       });
  //       setBirthDate(dateObj);
  //     } catch {}
  //   }
  //   const savedFiles = sessionStorage.getItem(SESSION_STORAGE_FILELIST_KEY);
  //   if (savedFiles) {
  //     try {
  //       const files = JSON.parse(savedFiles);
  //       const previews = files.map((file) => {
  //         return { uid: file.uid, url: file.url };
  //       });
  //       setFileList(files);
  //       setPreviewUrls(previews);
  //       form.setFieldsValue({ AvatarFile: files });
  //     } catch {}
  //   }
  // }, [form]);

  // const onValuesChange = (_, allValues) => {
  //   sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(allValues));
  // };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [id, data]);

  const onBirthDateChange = (date) => {
    setBirthDate(date);
    if (birthDateError) setBirthDateError(null);
    // if (date) {
    //   sessionStorage.setItem(
    //     SESSION_STORAGE_BIRTHDATE_KEY,
    //     JSON.stringify(date.toJSON())
    //   );
    // } else {
    //   sessionStorage.removeItem(SESSION_STORAGE_BIRTHDATE_KEY);
    // }
  };

  // useMutation برای ارسال فرم
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

  const onFinish = async (values) => {
    if (!birthDate) {
      setBirthDateError("لطفا تاریخ تولد را انتخاب کنید");
      return;
    } else {
      setBirthDateError(null);
    }

    const gregorian = birthDate.convert("gregorian");
    values.birthDate = gregorian.toDate().toISOString();
    if (data && id) {
      values.id = id;
    }
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "AvatarFile" && Array.isArray(fileList)) {
        fileList.forEach((file) => {
          formData.append("AvatarFile", file.originFileObj || file);
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
    // try {
    //   await mutateAsync(formData);
    //   sessionStorage.removeItem(SESSION_STORAGE_KEY);
    //   sessionStorage.removeItem(SESSION_STORAGE_BIRTHDATE_KEY);
    //   sessionStorage.removeItem(SESSION_STORAGE_FILELIST_KEY);
    // } catch {}
  };

  const onReset = () => {
    setBirthDate(null);
    setBirthDateError(null);
    form.resetFields();
    setFileList([]);
    setErrorFiles([]);
    setPreviewUrls([]);
    // sessionStorage.removeItem(SESSION_STORAGE_KEY);
    // sessionStorage.removeItem(SESSION_STORAGE_BIRTHDATE_KEY);
    // sessionStorage.removeItem(SESSION_STORAGE_FILELIST_KEY);
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
    form.setFieldsValue({ AvatarFile: validFiles });

    const filesToSave = validFiles.map((file) => ({
      uid: file.uid,
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url || file.preview,
    }));
    // sessionStorage.setItem(
    //   SESSION_STORAGE_FILELIST_KEY,
    //   JSON.stringify(filesToSave)
    // );
  };

  const handleRemoveImage = (uid) => {
    const newFileList = fileList.filter((file) => file.uid !== uid);
    setFileList(newFileList);

    const newPreviewUrls = previewUrls.filter((img) => img.uid !== uid);
    setPreviewUrls(newPreviewUrls);

    form.setFieldsValue({ AvatarFile: newFileList });

    const filesToSave = newFileList.map((file) => ({
      uid: file.uid,
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.url || file.preview,
    }));
    // sessionStorage.setItem(
    //   SESSION_STORAGE_FILELIST_KEY,
    //   JSON.stringify(filesToSave)
    // );
  };

  if (data && id) {
    form.setFieldsValue(data);
  }

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
          // onValuesChange={onValuesChange}
        >
          <Row gutter={16}>
            {/* nationalCode */}
            <Col span={6}>
              <Form.Item
                label="کد ملی"
                name="nationalCode"
                rules={[
                  {
                    required: true,
                    message: "لطفا کد ملی را وارد کنید",
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: "کد ملی باید ۱۰ رقم عدد باشد",
                  },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
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
                      return Promise.reject("کد ملی وارد شده معتبر نیست");
                    },
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
            <Col span={6}>
              <Form.Item
                label="نام"
                name="firstName"
                rules={[{ required: true, message: "لطفا نام را وارد کنید" }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            
            {/* lastName */}
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
                  {
                    required: true,
                    message: "لطفا شماره موبایل را وارد کنید",
                  },
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
                  <Radio value="1">مرد</Radio>
                  <Radio value="0">زن</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <SectionTitle title="اطلاعات سامانه" />

          {/* ردیف Radioها */}
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
                  <Radio value="0">شهروند</Radio>
                  <Radio value="1">سازمانی</Radio>
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
                  <Radio value="1">فعال</Radio>
                  <Radio value="0">غیرفعال</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="ورود دو مرحله‌ای"
                name="twoStepAuth"
                rules={[
                  {
                    required: true,
                    message: "لطفا وضعیت ورود دو مرحله‌ای را انتخاب کنید",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1">فعال</Radio>
                  <Radio value="0">غیرفعال</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="دسترسی به وب‌سرویس"
                name="webServiceAccess"
                rules={[
                  {
                    required: true,
                    message: "لطفا وضعیت دسترسی به وب‌سرویس را انتخاب کنید",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1">دارد</Radio>
                  <Radio value="2">ندارد</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* ردیف Inputها */}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="نام کاربری"
                name="username"
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

          <div className="flex !items-center  flex-row gap-x-4 w-full">
            {/* دکمه */}
            <div className=" !flex  !justify-center text-center mt-6 !items-center">
              <Button
                type={isAccessLimited ? "primary" : "default"}
                onClick={() => setIsAccessLimited((prev) => !prev)}
                className={`mb-4 flex items-center !p-0  !rounded-2xl w-auto ${
                  isAccessLimited ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <span
                  className={`inline-block w-7 h-7 rounded-full bg-white border border-gray-300
      ${isAccessLimited ? "mr-0 ml-2" : "ml-0 mr-2"}`}
                />
                <span className="p-2 px-4">
                  {isAccessLimited
                    ? "مجاز ورود در ساعات معین"
                    : "تعیین نوع محدودیت ورود"}
                </span>
              </Button>
            </div>

            {/* فرم */}
            <div className="w-1/2">
              <Row gutter={16}>
                {isAccessLimited ? (
                  <>
                    <Col span={12}>
                      <Form.Item
                        label="ساعت مجاز آغاز ورود"
                        name="allowedStartTime"
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
                        name="allowedEndTime"
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
                ) : (
                  <>
                    <Col span={12}>
                      <Form.Item
                        label="ساعت غیرمجاز آغاز ورود"
                        name="forbiddenStartTime"
                        rules={[
                          {
                            required: true,
                            message:
                              "لطفا ساعت غیرمجاز آغاز ورود را انتخاب کنید",
                          },
                        ]}
                      >
                        <TimePicker
                          format="HH:mm"
                          placeholder="مثلاً 23:00"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="ساعت غیرمجاز پایان ورود"
                        name="forbiddenEndTime"
                        rules={[
                          {
                            required: true,
                            message:
                              "لطفا ساعت غیرمجاز پایان ورود را انتخاب کنید",
                          },
                        ]}
                      >
                        <TimePicker
                          format="HH:mm"
                          placeholder="مثلاً 06:00"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
            </div>
          </div>

          <div className="mt-2 mb-6">
            <p>IP های مجاز ورود (مثال:192.168.1.166)</p>

            <Input
              className="!w-24 !mt-3"
              placeholder="مثال: 192.168.1.166"
              onKeyPress={(e) => {
                if (!/[0-9.]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <Driverguide />

          <SectionTitle title="بارگذاری تصویر" />

          <Form.Item
            className="!mb-12"
            name="AvatarFile"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[
              {
                required: true,
                message: "لطفا حداقل یک فایل تصویر بارگذاری کنید",
              },
              {
                validator: (_, fileList) => {
                  if (!fileList || fileList.length === 0) {
                    return Promise.reject(
                      new Error("لطفا حداقل یک فایل تصویر بارگذاری کنید")
                    );
                  }
                  if (fileList.length > MAX_IMAGES) {
                    return Promise.reject(
                      new Error(`حداکثر تعداد فایل مجاز ${MAX_IMAGES} عدد است`)
                    );
                  }
                  for (const file of fileList) {
                    const isImage = file.type.startsWith("image/");
                    if (!isImage) {
                      return Promise.reject(
                        new Error("فقط فایل‌های تصویری مجاز هستند")
                      );
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                      return Promise.reject(
                        new Error("حجم فایل باید کمتر از ۲ مگابایت باشد")
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
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
        className="fixed bottom-0 w-[100%] md:w-[88.3%] left-0 bg-white shadow-2xl p-4 flex justify-between items-center z-50"
      >
        <div className="flex gap-4">
          <Button
            className="!px-8 !py-4 !bg-blue-800 hover:!bg-blue-900 min-w-[220px]"
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
            className="!px-8  !hidden  md:!flex !py-4 !bg-gray-200 hover:!bg-gray-300 min-w-[90px]"
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
    </div>
  );
};

export default GeneralInfoFormWithDrawer;
