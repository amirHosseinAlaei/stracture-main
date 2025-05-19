import React from "react";
import { Button } from "antd";

interface HeaderActionButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const HeaderActionButton: React.FC<HeaderActionButtonProps> = ({
  text,
  onClick,
  className = "",
}) => (
  <Button type="primary" className={`!px-12 text-white !p-5 ${className}`} onClick={onClick}>
    {text}
  </Button>
);

export default HeaderActionButton;
