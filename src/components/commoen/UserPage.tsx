// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import getUsers from '../../service/userFilter';
// import TabelContainer from './TableContainer';

// const UsersPage = () => {
//   // فیلترهای جدید
//   const [type, setType] = useState(""); // فیلتر نوع
//   const [roleId, setRoleId] = useState(""); // فیلتر نقش
//   const [organizationId, setOrganizationId] = useState(""); // فیلتر سازمان
//   const [search, setSearch] = useState(""); // جستجو
//   const [pageIndex, setPageIndex] = useState(1); // صفحه فعلی
//   const [pageSize, setPageSize] = useState(5); // اندازه صفحه

//   // فراخوانی API با فیلترها
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["users", pageIndex, pageSize, search, type, roleId, organizationId],
//     queryFn: () =>
//       getUsers({
//         PageIndex: pageIndex,
//         PageSize: pageSize,
//         Search: search,
//         Type: type,
//         RoleId: roleId,
//         OrganizationId: organizationId,
//       }),
//     staleTime: 1000 * 60 * 5, // ذخیره داده‌ها برای 5 دقیقه
//     retry: 1, // تعداد تلاش‌های مجدد در صورت خطا
//     keepPreviousData: true, // حفظ داده‌های قبلی در زمان تغییر فیلتر
//   });

//   // برای آپدیت URL با فیلترها
//   useEffect(() => {
//     const params = {};
//     if (search) params.search = search;
//     if (pageIndex && pageIndex > 1) params.page = pageIndex.toString();
//     if (pageSize && pageSize !== 5) params.pageSize = pageSize.toString();
//     if (type) params.Type = type;
//     if (roleId) params.RoleId = roleId;
//     if (organizationId) params.OrganizationId = organizationId;

//     setSearchParams(params);
//   }, [search, pageIndex, pageSize, type, roleId, organizationId, setSearchParams]);

//   // برچسب‌های فیلتر
//   const getTypeLabel = (type) => {
//     switch (type) {
//       case "0":
//         return "سازمانی";
//       case "1":
//         return "شهروند";
//       default:
//         return "-";
//     }
//   };

//   const getStatusLabel = (status) => {
//     if (status === 1 || status === "1") return "فعال";
//     if (status === 0 || status === "0") return "غیرفعال";
//     return "-";
//   };

//   const getTwoFactorLabel = (twofactor) => {
//     if (twofactor === true || twofactor === 1 || twofactor === "1") return "فعال";
//     if (twofactor === false || twofactor === 0 || twofactor === "0") return "غیرفعال";
//     return "-";
//   };

//   return (
//     <div>
//       {/* فیلتر Type */}
//       <div>
//         <label>نوع کاربر</label>
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="">همه</option>
//           <option value="0">سازمانی</option>
//           <option value="1">شهروند</option>
//         </select>
//       </div>

//       {/* فیلتر RoleId */}
//       <div>
//         <label>انتخاب نقش</label>
//         <input
//           type="text"
//           value={roleId}
//           onChange={(e) => setRoleId(e.target.value)}
//           placeholder="آیدی نقش را وارد کنید"
//         />
//       </div>

//       {/* فیلتر OrganizationId */}
//       <div>
//         <label>انتخاب سازمان</label>
//         <input
//           type="text"
//           value={organizationId}
//           onChange={(e) => setOrganizationId(e.target.value)}
//           placeholder="آیدی سازمان را وارد کنید"
//         />
//       </div>

//       {/* فیلتر جستجو */}
//       <div>
//         <label>جستجو</label>
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="جستجو"
//         />
//       </div>

//       {/* جدول نمایش داده‌ها */}
//       <TabelContainer   
//         initialColumns={columns}
//         data={data?.data?.items || []}
//         totalCount={data?.data?.totalCount || 0}
//         searchInput={search}
//         setSearchInput={setSearch}
//         setSearch={setSearch}
//         page={pageIndex}
//         setPage={setPageIndex}
//         pageSize={pageSize}
//         setPageSize={setPageSize}
//         actionButtons={actionButtons}
//       />
//     </div>
//   );
// };

// export default UsersPage;
