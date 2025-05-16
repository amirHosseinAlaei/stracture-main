import React, { useState } from "react";
import { Layout, Breadcrumb, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SidebarContent from "../pages/panel/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

const PanelLayout: React.FC = () => {
  const [openKeys, setOpenKeys] = useState<string[]>(
    window.innerWidth >= 992 ? ["sub1"] : []
  );
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const onOpen = () => setIsDrawerOpen(true);
  const onClose = () => setIsDrawerOpen(false);

  const handleProfile = () => alert("صفحه حساب کاربری");
  const handleLogout = () => alert("خروج از حساب");

  return (
    <Layout
      style={{
        direction: "rtl",
        fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
        height: "100vh", // تمام ارتفاع صفحه
      }}
    >
      <Layout>
        {/* سایدبار دسکتاپ */}
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

        {/* سایدبار موبایل */}
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

        {/* محتوای صفحه */}
        <Layout style={{ padding: "0 24px 24px" }}>
          {/* منو و نوار بالا */}
          <div className="flex jc gap-4 items-center" style={{ paddingTop: 16 }}>
            <button
              onClick={onOpen}
              className="!rounded-md hover:text-blue-600 duration-300 cursor-pointer bg-white !p-2.5 md:!hidden"
            >
              <MenuOutlined className="text-lg" />
            </button>

            <Breadcrumb
              items={[
                { title: "خانه" },
                { title: "لیست" },
                { title: "اپلیکیشن" },
              ]}
              style={{ margin: "16px 0" }}
            />
          </div>

          {/* محتوای اصلی */}
          <Content
            style={{
              padding: 24,
              background: "#fff",
              borderRadius: "8px",
              minHeight: 'calc(100vh - 100px)', // فضای کافی
              overflow: "hidden", // جلوگیری از بیرون‌زدگی
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
