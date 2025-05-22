import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Spin tip="در حال بارگذاری." size="large"  />
    </div>
  );
};

export default Loading;
