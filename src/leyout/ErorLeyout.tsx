import { Result, Button } from 'antd';

interface ErrorLayoutProps {}

const ErrorLayout: React.FC<ErrorLayoutProps> = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="صفحه مورد نظر پیدا نشد."
        extra={
          <Button 
            className='!p-5'
            type="primary" 
          >
            بازگشت به صفحه اصلی
          </Button>
        }
      />
    </div>
  );
};

export default ErrorLayout;