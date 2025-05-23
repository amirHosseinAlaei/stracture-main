// src/utils/helpers.js

// فقط اعداد را نگه می‌دارد
export const onlyNumbers = (value = "") => value.replace(/\D/g, "");

// اعتبارسنجی کد ملی
export const validateNationalCode = (value) => {
  if (!value) return true;
  if (!/^\d{10}$/.test(value)) return false;
  const check = +value[9];
  const sum = value
    .split("")
    .slice(0, 9)
    .reduce((acc, num, i) => acc + +num * (10 - i), 0);
  const remainder = sum % 11;
  return (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  );
};

// اعتبارسنجی موبایل
export const validateMobile = (value) => /^09\d{9}$/.test(value || "");

// اعتبارسنجی ایمیل (اختیاری چون آنت‌دیزاین خودش دارد)
export const validateEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");

// اعتبارسنجی فایل‌های آپلودی
export const validateImageFiles = (fileList, maxImages = 5) => {
  if (!fileList || fileList.length === 0)
    return "لطفا حداقل یک فایل تصویر بارگذاری کنید";
  if (fileList.length > maxImages)
    return `حداکثر تعداد فایل مجاز ${maxImages} عدد است`;
  for (const file of fileList) {
    if (!file.type.startsWith("image/")) return "فقط فایل‌های تصویری مجاز هستند";
    if (file.size / 1024 / 1024 > 2)
      return "حجم فایل باید کمتر از ۲ مگابایت باشد";
  }
  return null;
};
