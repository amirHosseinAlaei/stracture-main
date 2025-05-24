import React, { useState, useEffect } from "react";
import { Form, Button, Typography, Breadcrumb } from "antd";
import { UndoOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import getUserById, { apiPostUser, apiUpdateUser } from "../../../../service/userService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PortalBreadcrumb from "../../../../components/commoen/ProtalBreadcrumb";
import Driverguide from "../../../../utils/Driverguide";
import {
  onlyNumbers,
  validateNationalCode,
  validateImageFiles,
} from "../../../../utils/formHellper";


import ImageUploadSection from "./ImageUploadSection";
import SystemInfoSection from "./SystemInfoSection";
import GeneralInfoSection from "./GeneralInfoSection";
import PortalButton from "../../../../components/commoen/portallButton";



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
  const nav = useNavigate();

  // Avatar states
  const [avatarFileList, setAvatarFileList] = useState([]);
  const [avatarPreviewUrls, setAvatarPreviewUrls] = useState([]);

  const [isAccessLimited, setIsAccessLimited] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      // مقداردهی اولیه عکس و امضا اگر لازم بود
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
        <p className="mt-1 mb-4 text-[15px]">اطلاعات عمومی</p>
        <Form
          id="my-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="nationalCode"
          className="flex-grow"
        >
          <GeneralInfoSection
            form={form}
            id={id}
            birthDate={birthDate}
            birthDateError={birthDateError}
            onBirthDateChange={onBirthDateChange}
            setBirthDateError={setBirthDateError}
            onlyNumbers={onlyNumbers}
            validateNationalCode={validateNationalCode}
          />
          <div className="flex items-center my-5 gap-4">
            <Typography.Title level={4} className="m-0 pr-2">
              اطلاعات سامانه
            </Typography.Title>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <SystemInfoSection
            form={form}
            data={data}
            id={id}
            isAccessLimited={isAccessLimited}
            setIsAccessLimited={setIsAccessLimited}
          />
          <Driverguide />
          <div className="flex items-center my-5 gap-4">
            <Typography.Title level={4} className="m-0 pr-2">
              بارگذاری تصویر
            </Typography.Title>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <ImageUploadSection
            form={form}
            avatarFileList={avatarFileList}
            avatarPreviewUrls={avatarPreviewUrls}
            handleAvatarChange={handleAvatarChange}
            handleRemoveAvatar={handleRemoveAvatar}
            validateImageFiles={validateImageFiles}
          />
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
            loading={createUser.isLoading || updateUser.isLoading}
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
      <PortalBreadcrumb>
        <Breadcrumb>
          <Breadcrumb.Item
            onClick={() => nav(-2)}
            className="cursor-pointer hover:bg-slate-200 p-1 rounded-lg duration-300 "
          >
            خانه
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => nav(-1)}
            className="cursor-pointer"
          >
            کاربران
          </Breadcrumb.Item>
          <Breadcrumb.Item>اطلاعات کاربران</Breadcrumb.Item>
        </Breadcrumb>
      </PortalBreadcrumb>


<PortalButton>
  <Button onClick={() => nav(-1)}>
    برگشت
    <i className="fa-duotone fa-arrow-left me-2"></i>
  </Button>
</PortalButton>


      
    </div>
  );
};

export default GeneralInfoFormWithDrawer;
