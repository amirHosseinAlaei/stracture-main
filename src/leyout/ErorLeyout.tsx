import { Result, Button } from 'antd';
function ErrorLayout() {
  // *ErrorLayout 
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="صفحه مورد نظر پیدا نشد."
        extra={
          // ?btn-click
          <Button 
          className='!p-5'
          type="primary" >
            بازگشت به صفحه اصلی
          </Button>
        }
      />
    </div>
  );
}
export default ErrorLayout;
