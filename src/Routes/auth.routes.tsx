import { lazy, Suspense } from "react";
import LoginLayout from "../assets/leyout/LoginLayout";
import Loading from "../components/commoen/Loading";
const Login = lazy(() => import("../pages/authentication/Login"));
const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const LoginRoutes = {
  path: "/auth",
  element: <LoginLayout />,
  children: [
    {
      path: "/auth/login",
      element: (
        <Suspenswrapper>
          <Login />
        </Suspenswrapper>
      ),
    },
  ],
};

export default LoginRoutes;
