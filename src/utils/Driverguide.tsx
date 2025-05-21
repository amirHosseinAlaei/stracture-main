import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

function Driverguide() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
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
        width={700}
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
}

export default Driverguide;
