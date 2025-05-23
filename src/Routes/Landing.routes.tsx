
import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/commoen/Loading";
import LandingLayout from "../layout/LandingLayout";

const LandingContent = lazy(() => import("../pages/landing/LandingContent"));

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const landingRoutes = {
  path: "/",
  element: <LandingLayout />,
  children: [
    {
      path: "/",
      element: <Navigate to="/home" replace />, 
    },
    {
      path: "home",
      element: (
        <SuspenseWrapper>
          <LandingContent />
        </SuspenseWrapper>
      ),
    },
  ],
};

export default landingRoutes;
