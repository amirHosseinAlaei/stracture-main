import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Button, Dropdown, Avatar } from "antd"; // Avatar اضافه شده
import type { MenuProps } from "antd";
import { Link } from "react-router-dom"; // اضافه شده
import { useCurrentUser } from "../../../hooks/useCurrentUser";

const items: MenuProps["items"] = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: <Link to="/auth">sad</Link>, // اصلاح شده
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "زیرمنو ۲",
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "زیرمنو ۳",
    children: [{ key: "12", label: "گزینه ۱۲" }],
  },
];

const SidebarContent = ({
  openKeys,
  setOpenKeys,
  selectedKeys,
  setSelectedKeys,
  handleProfile,
  handleLogout,
  isMobile = false,
  onClose = () => {},
}: {
  openKeys: string[];
  setOpenKeys: (keys: string[]) => void;
  selectedKeys: string[];
  setSelectedKeys: (keys: string[]) => void;
  handleProfile: () => void;
  handleLogout: () => void;
  isMobile?: boolean;
  onClose?: () => void;
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
    <div className="hidden lg:flex flex-col items-center pt-6 pb-3 border-b w-full border-b-[#eee] bg-white">
      
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

  console.log(x?.data?.data.userName, "test");

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
        style={{ height: "100%", borderRight: 0 }}
        items={items}
      />
    </>
  );
};

export default SidebarContent;
