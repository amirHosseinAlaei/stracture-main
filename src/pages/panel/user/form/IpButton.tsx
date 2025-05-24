import React, { useState } from "react";
import { Input, Button, Space, Tag, Tooltip } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const AllowedIPInput = () => {
  const [ipList, setIpList] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [ipInput, setIpInput] = useState("");

  const addIp = () => {
    const ip = ipInput.trim();
    if (ip && !ipList.includes(ip)) {
      setIpList([...ipList, ip]);
    }
    setIpInput("");
    setInputVisible(false);
  };

  const removeIp = (ipToRemove) => {
    setIpList(ipList.filter(ip => ip !== ipToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-lg    w-full border-gray-200">
      <label className="block text-gray-800 font-semibold mb-3">
        IP های مجاز ورود <span className="text-gray-400 text-sm">(مثال: 192.168.1.166)</span>
      </label>

      <div className="flex flex-wrap gap-2 mb-3">
        {ipList.map(ip => (
          <Tag
            key={ip}
            closable
            onClose={() => removeIp(ip)}
            closeIcon={<CloseOutlined />}
            className="bg-blue-100 text-blue-800 border border-blue-300 hover:opacity-80 transition"
          >
            {ip}
          </Tag>
        ))}

        {inputVisible ? (
          <Input
            size="small"
            className="!w-32"
            name="allowedLoginIPs"
            value={ipInput}
            onChange={e => setIpInput(e.target.value)}
            onBlur={() => setInputVisible(false)}
            onPressEnter={addIp}
            autoFocus
            placeholder="IP جدید"
          />
        ) : (
          <Tooltip title="افزودن IP جدید">
            <Button
              type="dashed"
              size="small"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => setInputVisible(true)}
              className="border-blue-400 text-blue-500 hover:text-white hover:bg-blue-500 transition"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default AllowedIPInput;
