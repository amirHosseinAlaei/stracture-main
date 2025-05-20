import React, { useEffect } from "react";
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
} from "@ant-design/icons";

interface ShowUserTabelProps {
  setButtonText?: (text: string) => void;
}

const ShowUserTabel: React.FC<ShowUserTabelProps> = ({ setButtonText }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (setButtonText) {
      setButtonText("سلام"); // اینجا متن دکمه را از این کامپوننت تعیین می‌کنیم
    }
  }, [setButtonText]);

  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPageSize = parseInt(searchParams.get("pageSize") || "5", 10);

  const [searchInput, setSearchInput] = React.useState(initialSearch);
  const [search, setSearch] = React.useState(initialSearch);
  const [pageIndex, setPageIndex] = React.useState(initialPage);
  const [pageSize, setPageSize] = React.useState(initialPageSize);

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

  const actionButtons = [
    {
      icon: <SafetyCertificateOutlined />,
      title: "امنیت",
      description: "تنظیمات امنیتی",
      onClick: (item: any) => alert(`Security clicked for ${item.id}`),
    },
    {
      icon: <LockOutlined />,
      title: "تغییر وضعیت",
      description: "قفل یا بازکردن وضعیت",
      onClick: (item: any) => alert(`Change status clicked for ${item.id}`),
    },
    {
      icon: <EyeOutlined />,
      title: "مشاهده",
      description: "مشاهده جزئیات",
      onClick: (item: any) => alert(`View clicked for ${item.id}`),
    },
    
    {
      icon: <EditOutlined />,
      title: "ویرایش",
      description: "ویرایش اطلاعات",
      onClick: (item: any) => alert(`Edit clicked for ${item.id}`),
    },
    {
      icon: <DeleteOutlined />,
      title: "حذف",
      description: "حذف آیتم",
      red: true,
      onClick: (item: any) => alert(`Delete clicked for ${item.id}`),
    },
  ];

  if (isLoading) return <div className="loading-spinner">در حال بارگذاری...</div>;
  if (isError) return <div className="error-message">خطا: {error?.message}</div>;

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
      actionButtons={actionButtons}
    />
  );
};

export default ShowUserTabel;
