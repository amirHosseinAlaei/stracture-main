// // utils/numberUtils.js

// /**
//  * تبدیل ارقام انگلیسی در یک رشته یا عدد به ارقام فارسی.
//  * @param {string | number} input - ورودی می‌تواند رشته یا عدد باشد.
//  * @returns {string} - رشته با ارقام فارسی.
//  */
// export const toPersianDigits = (input) => {
//   if (input === null || input === undefined) {
//     return ''; // یا می‌توانید '-' یا هر مقدار پیش‌فرض دیگری برگردانید
//   }
//   const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
//   return String(input).replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit)]);
// };

// /**
//  * (اختیاری) تابعی برای تبدیل تاریخ به فرمت فارسی با اعداد فارسی.
//  * این تابع از toLocaleDateString استفاده می‌کند که معمولاً اعداد را فارسی می‌کند،
//  * اما برای اطمینان بیشتر می‌توان toPersianDigits را هم روی خروجی آن اعمال کرد.
//  */
// export const formatDateToPersian = (dateString, options) => {
//   if (!dateString) return 'ثبت نشده'; // یا مقدار پیش‌فرض از فایل ترجمه
//   const date = new Date(dateString);
//   const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//   const mergedOptions = { ...defaultOptions, ...options };
//   // toLocaleDateString با 'fa-IR' باید اعداد فارسی تولید کند.
//   const formattedDate = date.toLocaleDateString('fa-IR', mergedOptions);
//   return toPersianDigits(formattedDate); // برای اطمینان بیشتر یا اگر محیطی اعداد را فارسی نمی‌کند
// };

// export const formatDateTimeToPersian = (dateString, options) => {
//   if (!dateString) return 'ثبت نشده'; // یا مقدار پیش‌فرض از فایل ترجمه
//   const date = new Date(dateString);
//   const defaultOptions = { dateStyle: 'short', timeStyle: 'short' };
//   const mergedOptions = { ...defaultOptions, ...options };
//   const formattedDateTime = date.toLocaleString('fa-IR', mergedOptions);
//   return toPersianDigits(formattedDateTime); // برای اطمینان بیشتر
// };
