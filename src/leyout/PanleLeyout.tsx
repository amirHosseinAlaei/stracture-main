import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Drawer, Layout, Menu, theme } from "antd";

const { Content, Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "subnav 1",
    children: [
      { key: "1", label: "option1" },
      { key: "2", label: "option2" },
      { key: "3", label: "option3" },
      { key: "4", label: "option4" },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "subnav 2",
    children: [
      { key: "5", label: "option5" },
      { key: "6", label: "option6" },
      { key: "7", label: "option7" },
      { key: "8", label: "option8" },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "subnav 3",
    children: [
      { key: "9", label: "option9" },
      { key: "10", label: "option10" },
      { key: "11", label: "option11" },
      { key: "12", label: "option12" },
    ],
  },
];

const PanelLayout: React.FC = () => {
  const [openKeys, setOpenKeys] = useState<string[]>(
    window.innerWidth >= 992 ? ["sub1"] : []
  );
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);
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

  return (
    <Layout className="h-screen" style={{ direction: "rtl" }}>
      <Layout>
        {/* Desktop sidebar */}
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          breakpoint="lg"
          className="transition-all hidden md:block duration-300"
        >
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            onClick={({ key }) => setSelectedKeys([key])}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>

        {/* Mobile drawer */}
        <Drawer
title="asd"      
          placement="right" // تغییر به سمت راست
          onClose={onClose}
          open={isDrawerOpen}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            onClick={({ key }) => {
              setSelectedKeys([key]);
              onClose(); // بستن Drawer بعد از انتخاب گزینه
            }}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Drawer>

        <Layout style={{ padding: "0 24px 24px" }}>
          <div className="flex jc gap-4 items-center">
            {/* Mobile sidebar button */}
            <button
              onClick={onOpen}
              className="!rounded-md hover:text-blue-00 duration-300 cursor-pointer  bg-white !p-2.5 md:!hidden"
            >
              <UserOutlined className="text-lg" />
            </button>
            <div>
              <Breadcrumb
                items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
                style={{ margin: "16px 0" }}
              />
            </div>
          </div>

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PanelLayout;
