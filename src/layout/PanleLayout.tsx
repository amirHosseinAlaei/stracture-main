import React, { useState } from "react";
import { Layout, Breadcrumb, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SidebarContent from "../pages/panel/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

interface PanelLayoutProps {}

const PanelLayout: React.FC<PanelLayoutProps> = () => {
  const [openKeys, setOpenKeys] = useState<string[]>(
    window.innerWidth >= 992 ? ["sub1"] : []
  );

  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
    <Layout>
      <Layout>
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

        <Layout className="h-screen" style={{ padding: "0 24px 24px", height: '100%' }}>
          <div className="flex justify-center gap-4 items-center">
            <button
              onClick={onOpen}
              className="!rounded-md hover:text-blue-00 duration-300 cursor-pointer bg-white !p-2.5 md:!hidden"
            >
              <MenuOutlined className="text-lg" />
            </button>
            <div className="p-2 w-full justify-between items-center flex">
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

              <div dir="ltr" id="panel-action-button" />

              
            </div>
          </div>

          <Content
            style={{
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
