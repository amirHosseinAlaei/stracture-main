import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import TabelContainer from "../../../components/commoen/TableContainer";
import getUsers from "../../../service/userFilter";

const ShowUserTabel = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // خواندن مقادیر اولیه از URL و تنظیم مقدار پیش‌فرض
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPageSize = parseInt(searchParams.get("pageSize") || "5", 10);

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // هر بار که search, pageIndex یا pageSize تغییر کند، URL را به‌روزرسانی کن
  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (pageIndex && pageIndex > 1) params.page = pageIndex.toString();
    if (pageSize && pageSize !== 5) params.pageSize = pageSize.toString();

    setSearchParams(params);
  }, [search, pageIndex, pageSize, setSearchParams]);

  // وقتی جستجو یا صفحه یا سایز صفحه تغییر کرد، کوئری اجرا می‌شود
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", pageIndex, pageSize, search],
    queryFn: () =>
      getUsers({ PageIndex: pageIndex, PageSize: pageSize, Search: search }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    keepPreviousData: true,
  });

  const columns = [
    { key: "userName", label: "نام کاربری" },
    { key: "firstName", label: "نام" },
    { key: "lastName", label: "نام خانوادگی" },
    { key: "mobile", label: "موبایل" },
    { key: "type", label: "سامانه" },
    { key: "status", label: "وضعیت کاربران" },
    { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
  ];

  if (isLoading)
    return <div className="loading-spinner">در حال بارگذاری...</div>;
  if (isError) return <div className="error-message">خطا: {error.message}</div>;

  return (
    <TabelContainer
      initialColumns={columns}
      data={data?.data?.items || []}
      totalCount={data?.data?.totalCount || 0}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      setSearch={setSearch}
      page={pageIndex}
      setPage={setPageIndex}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  );
};

export default ShowUserTabel;
