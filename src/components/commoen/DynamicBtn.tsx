import React from "react";

interface DynamicBtnProps {
  label: string;
  onClick?: () => void;
}

const DynamicBtn: React.FC<DynamicBtnProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default DynamicBtn;
