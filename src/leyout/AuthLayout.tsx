import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="h-screen flex justify-center items-center md:bg-[#f0f2f5]">
      <div className="md:bg-white p-6 rounded-lg md:shadow-lg w-full max-w-md mx-4 md:mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
