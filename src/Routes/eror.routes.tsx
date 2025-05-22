import { lazy, Suspense } from "react";
import Loading from "../components/commoen/Loading";
import ErrorLayout from "../layout/ErorLayout";

const Error404 = lazy(() => import("../pages/eror/Eror404"));
const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const landingRoutes = {
  path: "/eror",
  element: <ErrorLayout />,

  children: [
    {
      path: "/404",
      element: (
        <Suspenswrapper>
          <Error404 />
        </Suspenswrapper>
      ),
    },
  ],
};
export default landingRoutes;
