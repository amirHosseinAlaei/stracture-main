import { Button, Select } from "antd";
import { useState, useEffect } from "react";

const FilterModal = ({ handleFilterApply, handleFilterCancel, initialValues }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleSetValue = (newVal) => {
    setValues(newVal);
  };

  return (
    <>
      <hr className="mt-4" />
      <div className="mt-5 justify-center flex flex-col gap-4">
        <div>
          <span>وضعیت کاربران</span>
          <Select
            placeholder="لطفا انتخاب کنید"
            className="w-full mt-3"
            value={values.status === undefined ? null : values.status}
            onChange={(value) => handleSetValue({ ...values, status: value })}
            options={[
              { value: null, label: "همه" },
              { value: 1, label: "فعال" },
              { value: 0, label: "غیرفعال" },
            ]}
          />
        </div>
        <div>
          <span>نوع کاربر</span>
          <Select
            placeholder="لطفا انتخاب کنید"
            className="w-full mt-3"
            value={values.type === undefined ? null : values.type}
            onChange={(value) => handleSetValue({ ...values, type: value })}
            options={[
              { value: null, label: "همه" },
              { value: 0, label: "سازمانی" },
              { value: 1, label: "شهروند" },
            ]}
          />
        </div>
        <div>
          <span>ورود دو مرحله ای</span>
          <Select
            placeholder="لطفا انتخاب کنید"
            className="w-full mt-3"
            value={values.twoFactorEnabled === undefined ? null : values.twoFactorEnabled}
            onChange={(value) => handleSetValue({ ...values, twoFactorEnabled: value })}
            options={[
              { value: null, label: "همه" },
              { value: true, label: "فعال" },
              { value: false, label: "غیرفعال" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse mt-6 gap-3">
        <Button
          className="font-bold px-10 p-4 bg-blue-800"
          type="primary"
          onClick={() => handleFilterApply(values)}
        >
          اعمال فیلتر
        </Button>
        <Button className="bg-gray-100" onClick={handleFilterCancel}>
          انصراف
        </Button>
      </div>
    </>
  );
};

export default FilterModal;
