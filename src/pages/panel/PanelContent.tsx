import { Table, Button } from 'antd';
import { UserTable } from '../../hooks/userTable';
import { useState, useEffect } from 'react';

const columnTitleMap = {
  firstName: 'نام',
  lastName: 'نام خانوادگی',
  personelCode: 'کد پرسنلی',
  userName: 'نام کاربری',
  email: "ایمیل",
  status: "وضعیت کاربر",
  type: "نوع کاربر"
};

const statusText = (value) => {
  if (value === 1) return "فعال";
  if (value === 2) return "غیرفعال";
  return "-";
};

const genderText = (value) => {
  if (value === 'male' || value === 1 || value === 'مرد') return "مرد";
  if (value === 'female' || value === 2 || value === 'زن') return "زن";
  if (value === 'other' || value === 3 || value === 'سایر') return "سایر";
  return value || "-";
};


const statusButtonProps = (value) => {
  if (value === 1) {
    return {
      type: "primary",
      className: "bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 font-bold",
    };
  }
  if (value === 2) {
    return {
      danger: true,
      className: "bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 font-bold",
    };
  }
  return { type: "default" };
};

// تبدیل مقدار type به متن
const typeText = (value) => {
  if (value === 1) return "سازمانی";
  if (value === 'o') return "شهروند";
  return value ?? "-";
};

const expandedRowRender = (record) => {
  const fieldsToShowInExpanded = [
    { key: 'firstName', label: 'نام (جزئیات)' },
    { key: 'lastName', label: 'نام خانوادگی (جزئیات)' },
    { key: 'fatherName', label: 'نام پدر' },
    {
      key: 'birthDate',
      label: 'تاریخ تولد',
      transform: (value) => value ? new Date(value).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'ثبت نشده'
    },
    { key: 'nationalCode', label: 'کد ملی' },
    {
      key: 'gender',
      label: 'جنسیت',
      transform: (value) => genderText(value)
    },
    { key: 'personelCode', label: 'کد پرسنلی (جزئیات)' },
    { key: 'email', label: 'آدرس ایمیل کاربر' },
    {
      key: 'lastLogin',
      label: 'آخرین ورود',
      transform: (value) => value ? new Date(value).toLocaleString('fa-IR') : 'ثبت نشده'
    },
    {
      key: 'notes',
      label: 'یادداشت ویژه',
      value: record.status === 1 && record.firstName === 'علی' ? `کاربر ${record.firstName} یک کاربر ویژه است.` : 'یادداشت خاصی وجود ندارد.'
    }
  ];

  const itemsToDisplay = fieldsToShowInExpanded.map(field => {
    let displayValue;
    if (field.value !== undefined) {
      displayValue = field.value;
    } else if (record.hasOwnProperty(field.key)) {
      displayValue = record[field.key];
      if (field.transform && typeof field.transform === 'function') {
        displayValue = field.transform(displayValue);
      } else if (field.key === 'status') {
         displayValue = statusText(record[field.key]);
      } else if (field.key === 'gender') {
         displayValue = genderText(record[field.key]);
      } else if (field.key === 'type') {
         displayValue = typeText(record[field.key]);
      }
    } else {
      displayValue = '-';
    }

    return {
      key: field.key,
      label: field.label,
      children: displayValue !== null && displayValue !== undefined ? String(displayValue) : '-',
    };
  }).filter(item => {
    const fieldDefinition = fieldsToShowInExpanded.find(f => f.key === item.key);
    return fieldDefinition && (fieldDefinition.value !== undefined || (record.hasOwnProperty(item.key) && item.children !== '-'));
  });

  if (itemsToDisplay.length === 0) {
    return <p>اطلاعات بیشتری برای نمایش در بخش بازشونده تعریف نشده است.</p>;
  }

  return (
    <div style={{ backgroundColor: '#fafafa', padding: '10px 16px', borderRadius: '4px' }}>
      {itemsToDisplay.map(item => (
        <div key={item.key} style={{ marginBottom: 8 }}>
          <strong>{item.label}: </strong>
          <span>{item.children}</span>
        </div>
      ))}
    </div>
  );
};

function PanelContent() {
  const x = UserTable();
  const [userData, setUserData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (x?.data?.data?.items && x.data.data.items.length > 0) {
      const items = x.data.data.items;

      // ستون شماره ردیف
      const rowNumberColumn = {
        title: 'ردیف',
        key: 'rowNumber',
        render: (text, record, index) => index + 1,
        width: 60,
        align: 'center',
        fixed: 'left',
      };

      // ستون ورود دو مرحله ای
      const twoFactorColumn = {
        title: 'ورود دو مرحله‌ای',
        key: 'twoFactorEnabled',
        dataIndex: 'twoFactorEnabled',
        align: 'center',
        render: (value) => (
          <Button
            type={value ? 'primary' : 'default'}
            className={value ? "bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 font-bold" : ""}
            size="small"
          >
            {value ? 'فعال' : 'غیرفعال'}
          </Button>
        ),
      };

      const dynamicColumns = Object.keys(columnTitleMap).map((key) => ({
        title: columnTitleMap[key],
        dataIndex: key,
        key: key,
        render: (text) => {
          if (key === 'status') {
            return (
              <Button {...statusButtonProps(text)} size="small">
                {statusText(text)}
              </Button>
            );
          } else if (key === 'type') {
            return typeText(text);
          } else {
            return text ?? '-';
          }
        },
      }));

      setColumns([rowNumberColumn, ...dynamicColumns, twoFactorColumn]);

      const tableData = items.map((item) => ({
        ...item,
        key: item.id || item.userName || item.nationalCode || Math.random().toString(),
      }));

      setUserData(tableData);
    }
  }, [x?.data?.data?.items]);

  return (
    <div>
      <Table
        dataSource={userData}
        columns={columns}
        expandable={{
          expandedRowRender,
          rowExpandable: record => true,
        }}
        pagination={{
          defaultPageSize: 6,
          pageSizeOptions: ['6', '10', '20', '50', '100'],
          showSizeChanger: true,
          showQuickJumper: true,
          position: ['bottomCenter'],
        }}
      />
    </div>
  );
}
export default PanelContent;
