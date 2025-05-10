import { Spin } from 'antd';

function Loading() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Spin tip="در حال بارگذاری..." />
    </div>
  );
}

export default Loading;