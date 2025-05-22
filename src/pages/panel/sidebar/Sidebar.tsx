import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Button, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

// آیتم‌های پنل از روی کد قبلی
const panelItems = [
  {
    key: "panel-users",
    icon: <TeamOutlined />,
    label: <Link to="/panel/users">کاربران و گروه‌ها</Link>,
  },
  {
    key: "panel-sessions",
    icon: <MessageOutlined />,
    label: <Link to="/panel/sessions">پیام‌ها و گفتگوها</Link>,
  },
  {
    key: "panel-active",
    icon: <CheckCircleOutlined />,
    label: <Link to="/panel/active">وضعیت تایید</Link>,
  },
  {
    key: "panel-members",
    icon: <UsergroupAddOutlined />,
    label: <Link to="/panel/members">اعضا و کاربران</Link>,
  },
  {
    key: "panel-settings",
    icon: <SettingOutlined />,
    label: <Link to="/panel/settings">تنظیمات سیستم</Link>,
  },
];

// آیتم‌های اصلی سایدبار
const items: MenuProps["items"] = [...panelItems];

const SidebarContent = ({
  openKeys,
  setOpenKeys,
  selectedKeys,
  setSelectedKeys,
  handleProfile,
  handleLogout,
  isMobile = false,
  onClose = () => {},
}) => {
  const profileMenu = (
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

  const AccountButtons = (
    <div className="hidden lg:flex flex-col items-center pt-6 pb-3 border-b w-full border-b-[#eee] e">
      <Button
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
        style={{ width: "90%", justifyContent: "start", color: "red" }}
        onClick={handleLogout}
      >
        خروج
      </Button>
    </div>
  );

  const x = useCurrentUser();

  return (
    <>
      <div className="text-center mt-7  space-y-3.5">
        <div>
          <Button
            type="text"
            style={{ fontSize: "20px" }}
            className="!bg-gray-200 !rounded-[50%]"
            icon={
              x?.data?.data.avatarBase64 ? (
                <Avatar
                  src={`data:image/png;base64,${x.data.data.avatarBase64}`}
                  size={40}
                />
              ) : (
                <UserOutlined />
              )
            }
          />
        </div>
        <div>
          {x?.data?.data.firstName && x?.data?.data.lastName
            ? `${x.data.data.firstName} ${x.data.data.lastName}`
            : "نام کاربر"}
        </div>

        <div className="w-full md:hidden h-px mt-2 bg-gray-300"></div>
      </div>
      {AccountButtons}

      {!isMobile && (
        <div className="hidden md:flex lg:hidden justify-center pt-6 pb-3 border-b border-b-[#eee] bg-white">
          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <Button
              type="text"
              icon={<UserOutlined />}
              style={{ fontSize: 22 }}
            />
          </Dropdown>
        </div>
      )}

      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys as string[])}
        onClick={({ key }) => {
          setSelectedKeys([key]);
          if (isMobile) onClose();
        }}
        style={{ borderRight: 0 }}
        items={items}
      />
    </>
  );
};

export default SidebarContent;
