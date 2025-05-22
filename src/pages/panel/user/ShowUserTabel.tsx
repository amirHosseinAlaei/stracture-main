import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import TabelContainer from "../../../components/commoen/TableContainer";
import getUsers from "../../../service/userFilter";
import {
  SafetyCertificateOutlined,
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PortalButton from "../../../utils/portallButton";
import { Button } from "antd";

interface ShowUserTabelProps {
  setButtonText?: (text: string) => void;
}

const ShowUserTabel: React.FC<ShowUserTabelProps> = ({ setButtonText }) => {
  const [searchParams, setSearchParams] = useSearchParams();
const nav = useNavigate()
  // گرفتن مقدار اولیه از URL
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPageSize = parseInt(searchParams.get("pageSize") || "5", 10);

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // sync شدن state ها با URL (وقتی URL دستی تغییر کند)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    const urlPageSize = parseInt(searchParams.get("pageSize") || "5", 10);

    setSearchInput(urlSearch);
    setSearch(urlSearch);
    setPageIndex(urlPage);
    setPageSize(urlPageSize);
  }, [searchParams]);

  // فقط وقتی search عوض شد (یعنی کاربر اینتر زد)، URL را sync کن
  useEffect(() => {
    setSearchParams({
      page: pageIndex.toString(),
      pageSize: pageSize.toString(),
      search: search,
    });
  }, [pageIndex, pageSize, search, setSearchParams]);

  useEffect(() => {
    setButtonText?.("سلام");
  }, [setButtonText]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", pageIndex, pageSize, search],
    queryFn: () =>
      getUsers({ PageIndex: pageIndex, PageSize: pageSize, Search: search }),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    keepPreviousData: true,
  });

  // هندل کردن اینتر در input سرچ
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(searchInput);
      setPageIndex(1); // معمولاً وقتی سرچ جدید انجام می‌دیم، صفحه رو به اول برمی‌گردونیم
    }
  };

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
      onClick: (item: any) =>nav(`/panel/users/edit/${item.id}`),
    },
    {
      icon: <DeleteOutlined />,
      title: "حذف",
      description: "حذف آیتم",
      red: true,
      onClick: (item: any) => alert(`Delete clicked for ${item.id}`),
    },
  ];

  if (isError) return <div className="error-message">خطا: {error?.message}</div>;

return (
  <>
    <PortalButton>
      <Button type="primary" onClick={() => navigate("/panel/new")}>
        افزودن مورد جدید
      </Button>
    </PortalButton>
    <TabelContainer
      initialColumns={columns}
      data={data?.data?.items || []}
      totalCount={data?.data?.totalCount || 0}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      onSearchKeyDown={handleSearchKeyDown}
      setSearch={setSearch}
      page={pageIndex}
      setPage={setPageIndex}
      pageSize={pageSize}
      setPageSize={setPageSize}
      actionButtons={actionButtons}
    />
  </>
);

};

export default ShowUserTabel;
