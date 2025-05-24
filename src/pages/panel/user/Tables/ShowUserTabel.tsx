import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import TabelContainer from "../../../../components/commoen/TableContainer";
import getUsers from "../../../../service/getUserTabel";
import {
  SafetyCertificateOutlined,
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import PortalButton from "../../../../components/commoen/portallButton";
import { Breadcrumb, Button, Modal } from "antd";
import PortalBreadcrumb from "../../../../components/commoen/ProtalBreadcrumb";
import { apiDeleteUser } from "../../../../service/userService";
import { toast } from "react-hot-toast";

interface ShowUserTabelProps {
  setButtonText?: (text: string) => void;
}

interface User {
  id: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  type?: string;
  status?: string;
  twoFactorEnabled?: boolean;
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

  // استیت‌های مدال حذف
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    const urlPageSize = parseInt(searchParams.get("pageSize") || "5", 10);

    setSearchInput(urlSearch);
    setSearch(urlSearch);
    setPageIndex(urlPage);
    setPageSize(urlPageSize);
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(
      {
        page: pageIndex.toString(),
        pageSize: pageSize.toString(),
        search: search,
      },
      { replace: true }
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

  const queryClient = useQueryClient();

  // حذف کاربر با نتیجه toast داینامیک
  const deleteMutation = useMutation({
    mutationFn: apiDeleteUser,
    onSuccess: () => {
      if (userToDelete) {
        toast.success(`کاربر ${userToDelete.userName} حذف شد.`);
      } else {
        toast.success("حذف موفقیت‌آمیز بود.");
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDeleteModalVisible(false);
      setUserToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حذف با خطا مواجه شد.");
      setDeleteModalVisible(false);
      setUserToDelete(null);
    },
  });

  // باز کردن مدال حذف
  const handleDelete = (item: User) => {
    setUserToDelete(item);
    setDeleteModalVisible(true);
  };

  // تایید حذف
  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  // بستن مدال حذف
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setUserToDelete(null);
  };

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
      onClick: (item: User) => alert(`Security clicked for ${item.id}`),
    },
    {
      icon: <LockOutlined />,
      title: "تغییر وضعیت",
      description: "قفل یا بازکردن وضعیت",
      onClick: (item: User) => alert(`Change status clicked for ${item.id}`),
    },
    {
      icon: <EyeOutlined />,
      title: "مشاهده",
      description: "مشاهده جزئیات",
      onClick: (item: User) => alert(`View clicked for ${item.id}`),
    },
    {
      icon: <EditOutlined />,
      title: "ویرایش",
      description: "ویرایش اطلاعات",
      onClick: (item: User) => nav(`/panel/users/edit/${item.id}`),
    },
    {
      icon: <DeleteOutlined />,
      title: "حذف",
      description: "حذف آیتم",
      red: true,
      onClick: (item: User) => handleDelete(item),
    },
  ];

  if (isError)
    return <div className="error-message">خطا: {error?.message}</div>;

  return (
    <>
      <PortalButton>
        <Button
          className="!p-2 !bg-blue-700 !h-10 flex items-center gap-3"
          type="primary"
          onClick={() => nav("/panel/users/add")}
        >
          افزودن کاربر جدید
          <i className="fas fa-user-plus text-white"></i>
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

      <Modal
        title={
          <span style={{ color: "#cf1322", display: "flex", alignItems: "center", gap: 8 }}>
            <ExclamationCircleFilled style={{ fontSize: 24 }} />
            تایید حذف کاربر
          </span>
        }
        open={deleteModalVisible}
        onOk={handleConfirmDelete}
        confirmLoading={deleteMutation.isLoading}
        onCancel={handleCancelDelete}
        okText="بله، حذف شود"
        cancelText="خیر"
        okButtonProps={{ danger: true, style: { fontWeight: "bold" } }}
        cancelButtonProps={{ style: { fontWeight: "bold" } }}
        centered
      >
        <p style={{ fontSize: 16, fontWeight: "bold", color: "#cf1322", textAlign: "center" }}>
          آیا مطمئن هستید که می‌خواهید کاربر{" "}
          <span style={{ color: "#000", margin: "0 5px" }}>{userToDelete?.userName}</span> را حذف کنید؟
        </p>
      </Modal>
    </>
  );
};

export default ShowUserTabel;
