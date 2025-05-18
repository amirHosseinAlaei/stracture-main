import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import TabelContainer from "../../../components/commoen/TableContainer";
import getUsers from "../../../service/userFilter";
import {
  SafetyCertificateOutlined,
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const ShowUserTabel = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPageSize = parseInt(searchParams.get("pageSize") || "21", 10);

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filters, setFilters] = useState({ type: null, status: null, twoFactorEnabled: null });

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (pageIndex && pageIndex > 1) params.page = pageIndex.toString();
    if (pageSize && pageSize !== 5) params.pageSize = pageSize.toString();

    setSearchParams(params);
  }, [search, pageIndex, pageSize, setSearchParams]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", pageIndex, pageSize, search, filters],
    queryFn: () =>
      getUsers({
        PageIndex: pageIndex,
        PageSize: pageSize,
        Search: search,
        Type: filters.type,
        Status: filters.status,
        TwoFactorEnabled: filters.twoFactorEnabled,
      }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // اگر API فیلترها رو ساپورت نمی‌کند، فیلتر سمت کلاینت:
  const filteredData = data?.data?.items.filter(item => {
    return (
      (filters.type == null || item.type === filters.type) &&
      (filters.status == null || item.status === filters.status) &&
      (filters.twoFactorEnabled == null || item.twoFactorEnabled === filters.twoFactorEnabled)
    );
  }) || [];

  const columns = [
    { key: "lastName", label: "نام خانوادگی" },
    { key: "mobile", label: "موبایل" },
    { key: "type", label: "سامانه" },
    { key: "status", label: "وضعیت کاربران" },
    { key: "twoFactorEnabled", label: "ورود دو مرحله ای" },
  ];

  const actionButtons = [
 
    {
      icon: <EyeOutlined />,
      title: "مشاهده",
      description: "مشاهده جزئیات",
      onClick: (item) => alert(`View clicked for ${item.userName}`),
    },
    {
      icon: <EditOutlined />,
      title: "ویرایش",
      description: "ویرایش اطلاعات",
      onClick: (item) => alert(`Edit clicked for ${item.userName}`),
    },
    {
      icon: <DeleteOutlined />,
      title: "حذف",
      description: "حذف آیتم",
      red: true,
      onClick: (item) => alert(`Delete clicked for ${item.userName}`),
    },
  ];

  if (isLoading)
    return <div className="loading-spinner">در حال بارگذاری...</div>;
  if (isError) return <div className="error-message">خطا: {error.message}</div>;

  return (
    <TabelContainer
      initialColumns={columns}
      data={filteredData}
      totalCount={filteredData.length}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      setSearch={setSearch}
      page={pageIndex}
      setPage={setPageIndex}
      pageSize={pageSize}
      setPageSize={setPageSize}
      actionButtons={actionButtons}
      onFilterChange={setFilters}
    />
  );
};

export default ShowUserTabel;
