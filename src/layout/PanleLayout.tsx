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

  const onOpen = (): void => setIsDrawerOpen(true);
  const onClose = (): void => setIsDrawerOpen(false);

  const handleProfile = (): void => alert("صفحه حساب کاربری");
  const handleLogout = (): void => alert("خروج از حساب");

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Layout>
        {/* سایدبار دسکتاپ */}
        <Sider
          width={200}
          breakpoint="lg"
          className="transition-all hidden md:block duration-300 !bg-white"
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

        {/* منوی موبایل */}
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

        <Layout style={{ padding: "0 24px 24px", background: "transparent" }}>
          {/* هدر/بردکرامب و دکمه منو */}
          <div className="flex justify-center gap-4 items-center mt-4">
            <button
              onClick={onOpen}
              className="!rounded-md hover:text-blue-00 duration-300 cursor-pointer bg-white !p-2.5 md:!hidden"
            >
              <MenuOutlined className="text-lg" />
            </button>

            <div className="p-2 w-full justify-between items-center flex">
              <div>
                <div  id="panel-action-breadcrumb" />
              </div>

              <div dir="ltr" id="panel-action-button" />
              
            </div>


          </div>

<div className="w-full h-px mt-2 bg-gray-300"></div>

          {/* محتوای اصلی */}

          <Content
            style={{
              background: "#fff",
              borderRadius: "8px",
              marginTop: "16px",
              minHeight: "calc(100vh - 110px)", // ارتفاع داینامیک براساس هدر و پدینگ
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
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
