// Persian months
const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

// Persian weekdays (week starts on Saturday)
const persianWeekdays = [
  "شنبه", // 0
  "یک‌شنبه", // 1
  "دوشنبه", // 2
  "سه‌شنبه", // 3
  "چهارشنبه", // 4
  "پنج‌شنبه", // 5
  "جمعه", // 6
];

// Convert Gregorian date to Jalali (Persian) date
export function toJalali(gy, gm, gd) {
  const g_d_m = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let gy2 = gy - 1600;
  let gm2 = gm - 1;
  let gd2 = gd - 1;

  let g_day_no =
    365 * gy2 +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400);
  for (let i = 0; i < gm2; ++i) g_day_no += g_d_m[i + 1];
  g_day_no += gd2;

  let j_day_no = g_day_no - 79;

  let j_np = Math.floor(j_day_no / 12053);
  j_day_no %= 12053;

  let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  let jm, jd;
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  for (jm = 0; jm < 12 && j_day_no >= j_days_in_month[jm]; ++jm) {
    j_day_no -= j_days_in_month[jm];
  }
  jd = j_day_no + 1;

  return { jy, jm: jm + 1, jd };
}

// Get Persian weekday name based on JS getDay() index (week starts on Saturday)
export function getDayOfWeek(dayIndex) {
  // جاوااسکریپت: 0=یکشنبه ... 6=شنبه
  // تقویم ایرانی: 0=شنبه ... 6=جمعه
  // نگاشت صحیح:
  return persianWeekdays[(dayIndex + 1) % 7]; // تغییر این خط
}

// Format full Persian date like "شنبه ۲۷ اردیبهشت ۱۴۰۴"
export function formatPersianDate(date) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();
  const dayOfWeek = getDayOfWeek(date.getDay());

  const { jy, jm, jd } = toJalali(gYear, gMonth, gDay);

  return `${dayOfWeek} ${jd} ${persianMonths[jm - 1]} ${jy}`;
}
