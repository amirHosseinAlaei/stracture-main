import React, { createContext, useContext, useState } from "react";

// 1. ایجاد Context برای مدیریت متن
const ButtonTextContext = createContext<{ buttonText: string; toggleText: () => void }>({
  buttonText: "ثبت کاربر جدید",
  toggleText: () => {},
});

// 2. ایجاد Provider برای مدیریت تغییر متن
const ButtonTextProvider: React.FC = ({ children }) => {
  const [buttonText, setButtonText] = useState<string>("ثبت کاربر جدید");

  const toggleText = () => {
    setButtonText((prevText) => (prevText === "ثبت کاربر جدید" ? "خداحافظ" : "ثبت کاربر جدید"));
  };

  return (
    <ButtonTextContext.Provider value={{ buttonText, toggleText }}>
      {children}
    </ButtonTextContext.Provider>
  );
};

// 3. ایجاد یک Hook برای استفاده از Context
export const useButtonText = () => useContext(ButtonTextContext);

export { ButtonTextProvider };
