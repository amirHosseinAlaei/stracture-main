import { Modal, Checkbox, Divider } from "antd";
import {
  SettingOutlined,
  DragOutlined,
  PushpinOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (b: boolean) => void;
  dragEnabled: boolean;
  setDragEnabled: (b: boolean) => void;
  stickyActionEnabled: boolean;
  setStickyActionEnabled: (b: boolean) => void;
  sortLastNameEnabled: boolean;
  setSortLastNameEnabled: (b: boolean) => void;
}

const TableSettingsModal = ({
  open,
  setOpen,
  dragEnabled,
  setDragEnabled,
  stickyActionEnabled,
  setStickyActionEnabled,
  sortLastNameEnabled,
  setSortLastNameEnabled,
}: Props) => {
  const handleOk = () => {
    setOpen(false);
    toast.success( "تنظیمات جدول با موفقیت ذخیره شد. ✅");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // هندلرها برای هر گزینه
  const handleDragClick = () => setDragEnabled(!dragEnabled);
  const handleStickyClick = () => setStickyActionEnabled(!stickyActionEnabled);
  const handleSortClick = () => setSortLastNameEnabled(!sortLastNameEnabled);

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-bold">
          <SettingOutlined className="text-blue-500 text-xl" />
          تنظیمات جدول
        </div>
      }
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="تایید"
      cancelText="انصراف"
      bodyStyle={{
        borderRadius: "1rem",
        background: "#f9fafb",
        boxShadow: "0 4px 24px #00000010",
      }}
    >
      <div className="flex flex-col gap-6">
        {/* گزینه ۱ */}
        <div
          className={`flex items-start gap-2 cursor-pointer rounded-lg px-2 py-1 transition hover:bg-blue-50`}
          onClick={handleDragClick}
        >
          <DragOutlined className="mt-1 text-blue-400" />
          <div>
            <Checkbox
              checked={dragEnabled}
              onChange={(e) => setDragEnabled(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
            >
              فعال‌سازی جابجایی ستون‌ها (درگ اند دراپ)
            </Checkbox>
            <div className="text-xs text-gray-500 mt-1">
              امکان چینش دلخواه ستون‌ها با کشیدن و رها کردن
            </div>
          </div>
        </div>
        <Divider className="my-0" />
        {/* گزینه ۲ */}
        <div
          className={`flex items-start gap-2 cursor-pointer rounded-lg px-2 py-1 transition hover:bg-green-50`}
          onClick={handleStickyClick}
        >
          <PushpinOutlined className="mt-1 text-green-400" />
          <div>
            <Checkbox
              checked={stickyActionEnabled}
              onChange={(e) => setStickyActionEnabled(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
            >
              فریز بودن ستون عملیات (sticky)
            </Checkbox>
            <div className="text-xs text-gray-500 mt-1">
              ستون عملیات همیشه قابل مشاهده باشد
            </div>
          </div>
        </div>
        <Divider className="my-0" />
        {/* گزینه ۳ */}
        <div
          className={`flex items-start gap-2 cursor-pointer rounded-lg px-2 py-1 transition hover:bg-purple-50`}
          onClick={handleSortClick}
        >
          <SortAscendingOutlined className="mt-1 text-purple-400" />
          <div>
            <Checkbox
              checked={sortLastNameEnabled}
              onChange={(e) => setSortLastNameEnabled(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
            >
              فعال‌سازی مرتب‌سازی نام خانوادگی
            </Checkbox>
            <div className="text-xs text-gray-500 mt-1">
              امکان مرتب‌سازی سطرها براساس نام خانوادگی
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TableSettingsModal;
