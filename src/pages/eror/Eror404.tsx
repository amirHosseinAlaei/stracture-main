import { Result, Button } from 'antd';

function Error404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="متاسفیم، صفحه مورد نظر یافت نشد."
      extra={
        <Button type="primary" href="/">
          بازگشت به خانه
        </Button>
      }
    />
  );
}

export default Error404;
