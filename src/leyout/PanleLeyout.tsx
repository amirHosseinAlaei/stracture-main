import React, { useState } from "react";
import { Layout, Breadcrumb, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SidebarContent from "../pages/panel/Sidebar";
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

interface PanelLayoutProps {}

interface SidebarContentProps {
  openKeys: string[];
  setOpenKeys: (keys: string[]) => void;
  selectedKeys: string[];
  setSelectedKeys: (keys: string[]) => void;
  handleProfile: () => void;
  handleLogout: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const PanelLayout: React.FC<PanelLayoutProps> = () => {
  // تعریف state ها با تایپ‌های مشخص
  const [openKeys, setOpenKeys] = useState<string[]>(
    window.innerWidth >= 992 ? ["sub1"] : []
  );

  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // تعریف توابع با تایپ‌های مشخص
  const onOpen = (): void => {
    setIsDrawerOpen(true);
  };

  const onClose = (): void => {
    setIsDrawerOpen(false);
  };

  const handleProfile = (): void => {
    alert("صفحه حساب کاربری");
  };

  const handleLogout = (): void => {
    alert("خروج از حساب");
  };

  return (
    <Layout
      className="h-screen"
      style={{
        direction: "rtl",
        fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
      }}
    >
      <Layout>
        {/* سایدبار */}
        <Sider
          width={200}
          style={{ background: "#fff" }}
          breakpoint="lg"
          className="transition-all hidden md:block duration-300"
        >
          <SidebarContent
            openKeys={openKeys}
            setOpenKeys={setOpenKeys}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            handleProfile={handleProfile}
            handleLogout={handleLogout}
          />
        </Sider>

        {/* منوی موبایل (Drawer) */}
        <Drawer
          title="منو"
          placement="right"
          onClose={onClose}
          open={isDrawerOpen}
          bodyStyle={{ padding: 0 }}
        >
          <SidebarContent
            openKeys={openKeys}
            setOpenKeys={setOpenKeys}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            handleProfile={handleProfile}
            handleLogout={handleLogout}
            isMobile={true}
            onClose={onClose}
          />
        </Drawer>

        <Layout style={{ padding: "0 24px 24px" }}>
          <div className="flex jc gap-4 items-center">
            {/* دکمه باز کردن منوی موبایل */}
            <button
              onClick={onOpen}
              className="!rounded-md hover:text-blue-00   duration-300 cursor-pointer  bg-white !p-2.5 md:!hidden"
            >
              <MenuOutlined className="text-lg" />
            </button>

            <div>
              <Breadcrumb
                items={[
                  { title: "خانه" },
                  { title: "لیست" },
                  { title: "اپلیکیشن" },
                ]}
                style={{ margin: "16px 0" }}
              />
            </div>
          </div>

          {/* محتوای اصلی */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
              borderRadius: "8px",
            }}
          >

            
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PanelLayout;
