import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Drawer, Layout, Menu, theme, Button, Dropdown } from "antd";

const { Content, Sider } = Layout;

// *menu-items
const item: MenuProps["items"] = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "زیرمنو ۱",
    children: [
      { key: "1", label: "گزینه ۱" },
      { key: "2", label: "گزینه ۲" },
      { key: "3", label: "گزینه ۳" },
      { key: "4", label: "گزینه ۴" },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "زیرمنو ۲",
    children: [
      { key: "5", label: "گزینه ۵" },
      { key: "6", label: "گزینه ۶" },
      { key: "7", label: "گزینه ۷" },
      { key: "8", label: "گزینه ۸" },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "زیرمنو ۳",
    children: [
      { key: "9", label: "گزینه ۹" },
      { key: "10", label: "گزینه ۱۰" },
      { key: "11", label: "گزینه ۱۱" },
      { key: "12", label: "گزینه ۱۲" },
    ],
  },
];

const PanelLayout: React.FC = () => {
  // open-drop-menu
  const [openKeys, setOpenKeys] = useState<string[]>(
    window.innerWidth >= 992 ? ["sub1"] : []
  );
  // select key
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);
  // isDrawerOpen (mobile)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onOpen = () => {
    setIsDrawerOpen(true);
  };

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //  btns-click 
  const handleProfile = () => {
    alert("صفحه حساب کاربری");
  };
  const handleLogout = () => {
    alert("خروج از حساب");
  };

  // Dropdown menu for md => lg
  const profileMenu = (
    // user-menu-papap
    <Menu
      items={[
        {
          key: "profile",
          icon: <UserOutlined />,
          label: "حساب کاربری",
          onClick: handleProfile,
        },
        {
          key: "logout",
          icon: <LogoutOutlined style={{ color: "red" }} />,
          label: <span style={{ color: "red" }}>خروج</span>,
          onClick: handleLogout,
        },
      ]}
    />
  );

// user-log-reusebale
  const AccountButtons = (
    <div className="flex flex-col items-center pt-6 pb-3 border-b border-b-[#eee] bg-white">
      <Button className=""
        type="text"
        icon={<UserOutlined />}
        style={{ width: "90%", justifyContent: "start" }}
        onClick={handleProfile}
      >
        حساب کاربر
      </Button>
      <Button
        type="text"
        icon={<LogoutOutlined />}
        style={{
          width: "90%",
          justifyContent: "start",
          color: "red",
        }}
        onClick={handleLogout}
      >
        خروج
      </Button>
    </div>
  );

  return (
    <Layout
      className="h-screen"
      style={{
        direction: "rtl",
        fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
      }}
    >
      <Layout>
        {/* sidebar */}
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          breakpoint="lg"
          className="transition-all hidden md:block duration-300"
        >
          <div className="hidden lg:flex">{AccountButtons} </div>
          <div className="hidden md:flex lg:hidden justify-center pt-6 pb-3 border-b border-b-[#eee] bg-white">
            <Dropdown overlay={profileMenu} trigger={['click']}>
              <Button
                type="text"
                icon={<UserOutlined />}
                style={{ fontSize: 22 }}
              />
            </Dropdown>
          </div>
          {/* menue */}
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            onClick={({ key }) => setSelectedKeys([key])}
            style={{ height: "100%", borderRight: 0 }}
            items={item}
          />
        </Sider>

        {/*   sidebar-mobile (Drawer) */}
        <Drawer
          title="منو"
          placement="right"
          onClose={onClose}
          open={isDrawerOpen}
          bodyStyle={{ padding: 0 }}
        >
          {/*  Drawer mobile menu*/}
          {AccountButtons}
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            onClick={({ key }) => {
              setSelectedKeys([key]);
              onClose();
            }}
            style={{ height: "100%", borderRight: 0 }}
            items={item}
          />
        </Drawer>
        <Layout style={{ padding: "0 24px 24px" }}>
          <div className="flex jc gap-4 items-center">
            {/* btn open drawer mobile */}
            <button
              onClick={onOpen}
              className="!rounded-md hover:text-blue-00 duration-300 cursor-pointer  bg-white !p-2.5 md:!hidden"
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


{/* Content layout */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
            محتوا
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PanelLayout;
