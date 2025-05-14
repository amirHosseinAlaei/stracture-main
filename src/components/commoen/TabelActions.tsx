import React from 'react';
import { Tooltip } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

const iconStyle = {
  fontSize: '18px',
  color: '#374151', // خاکستری تیره
  cursor: 'pointer',
  transition: 'color 0.3s',
};

const iconHoverStyle = {
  color: '#3b82f6', // آبی
};

class ActionButtons extends React.Component {
  state = {
    hoverIndex: null,
  };

  handleMouseEnter = (index) => {
    this.setState({ hoverIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoverIndex: null });
  };

  render() {
    const { hoverIndex } = this.state;

    const buttons = [
      { icon: <SafetyCertificateOutlined />, title: 'امنیت', description: 'تنظیمات امنیتی' },
      { icon: <LockOutlined />, title: 'تغییر وضعیت', description: 'قفل یا بازکردن وضعیت' },
      { icon: <EyeOutlined />, title: 'مشاهده', description: 'مشاهده جزئیات' },
      { icon: <EditOutlined />, title: 'ویرایش', description: 'ویرایش اطلاعات' },
      { icon: <DeleteOutlined />, title: 'حذف', description: 'حذف آیتم', red: true },
    ];

    return (
      <div className="flex justify-center items-center gap-4">
        {buttons.map((btn, index) => (
          <Tooltip key={index} title={btn.description} placement="top">
            <button
              aria-label={btn.title}
              onMouseEnter={() => this.handleMouseEnter(index)}
              onMouseLeave={this.handleMouseLeave}
              className="p-2 rounded-md transition-colors"
              style={{
                fontSize: '18px',
                color: btn.red ? (hoverIndex === index ? '#3b82f6' : '#dc2626') : (hoverIndex === index ? '#3b82f6' : '#374151'),
                cursor: 'pointer',
              }}
            >
              {btn.icon}
            </button>
          </Tooltip>
        ))}
      </div>
    );
  }
}

export default ActionButtons;
