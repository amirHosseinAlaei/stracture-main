import { lazy, Suspense } from "react";
import LandingLayout from "../layout/LandingLayout";
import Loading from "../components/commoen/Loading";

const LandingContent = lazy(() => import("../pages/landing/LandingContent"));
const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const landingRoutes = {
  path: "/",
  element: <LandingLayout />,

  children: [
    {
      path: "/",
      element: (
        <Suspenswrapper>
          <LandingContent />
        </Suspenswrapper>
      ),
    },
  ],
};
export default landingRoutes;
