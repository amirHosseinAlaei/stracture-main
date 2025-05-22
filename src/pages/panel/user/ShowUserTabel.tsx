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
import PortalButton from "../../../components/commoen/portallButton";
import { Breadcrumb, Button } from "antd";
import PortalBreadcrumb from "../../../components/commoen/ProtalBreadcrumb";

interface ShowUserTabelProps {
  setButtonText?: (text: string) => void;
}

const ShowUserTabel: React.FC<ShowUserTabelProps> = ({ setButtonText }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

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

  // فقط وقتی search یا صفحه‌بندی تغییر کرد، URL را با replace آپدیت کن
  useEffect(() => {
    setSearchParams(
      {
        page: pageIndex.toString(),
        pageSize: pageSize.toString(),
        search: search,
      },
      { replace: true } // ✅ استفاده از replace برای جلوگیری از ثبت در history
    );
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

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(searchInput);
      setPageIndex(1);
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
      onClick: (item: any) => nav(`/panel/users/edit/${item.id}`),
    },
    {
      icon: <DeleteOutlined />,
      title: "حذف",
      description: "حذف آیتم",
      red: true,
      onClick: (item: any) => alert(`Delete clicked for ${item.id}`),
    },
  ];

  if (isError)
    return <div className="error-message">خطا: {error?.message}</div>;

  return (
    <>
      <PortalButton>
        <Button
          className="!p-2 !bg-blue-700 !h-10 flex items-center !gap-3"
          type="primary"
          onClick={() => nav("/panel/new")}
        >
          افزودن کاربر جدید
          <i className="fas fa-user-plus text-white"></i>{" "}
          {/* آیکون "user-plus" از نسخه پرو */}
        </Button>
      </PortalButton>

      <PortalBreadcrumb>
        <Breadcrumb>
          <Breadcrumb.Item
            onClick={() => nav(-1)}
            className="cursor-pointer hover:bg-slate-200 p-1 rounded-lg duration-300 "
          >
            خانه
          </Breadcrumb.Item>
          <Breadcrumb.Item>کاربران</Breadcrumb.Item>
        </Breadcrumb>
      </PortalBreadcrumb>

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
