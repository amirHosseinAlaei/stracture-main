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
      <div className="mt-5 justify-center flex flex-col">
        <div className="">
          <span>سامانه</span>
          <Select
            placeholder="جستجو سامانه"
            className="w-full mt-3 "
            value={values.systems === undefined ? null : values.systems}
            onChange={(value) => handleSetValue({ ...values, systems: value })}
            options={[
              { value: null, label: "همه" },
              { value: 1, label: "فعال" },
              { value: 0, label: "غیرفعال" },
            ]}
          />
        </div>
        <div className="mt-4">
          <span>نوع کاربر</span>
          <Select
            placeholder="لطفا انتخاب کنید"
            className="w-full mt-3 "
            value={values.type === undefined ? null : values.type}
            onChange={(value) => handleSetValue({ ...values, type: value })}
            options={[
              { value: null, label: "همه" },
              { value: 0, label: "سازمانی" },
              { value: 1, label: "شهروند" },
            ]}
          />
        </div>
        <br />
      </div>
      <div className=" flex-row-reverse flex ">
        <Button
          className=" font-bold px-10 p-4 bg-blue-800"
          key="apply"
          type="primary"
          onClick={() => handleFilterApply(values)}
        >
          اعمال فیلتر
        </Button>

        <Button
          className="bg-gray-100 mr-3"
          key="cancel"
          onClick={handleFilterCancel}
        >
          انصراف
        </Button>
      </div>
    </>
  );
};

export default FilterModal;