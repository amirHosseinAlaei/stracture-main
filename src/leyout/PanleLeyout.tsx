import React, { useState } from "react";
import { Layout, Breadcrumb, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SidebarContent from "../components/SideBar";
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

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

// btns-click
const handleProfile = () => {
alert("صفحه حساب کاربری");
};
const handleLogout = () => {
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
{/* sidebar */}
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

{/* sidebar-mobile (Drawer) */}
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