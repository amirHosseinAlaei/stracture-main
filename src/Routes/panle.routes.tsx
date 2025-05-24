import { lazy, Suspense } from "react";
import Loading from "../components/commoen/Loading"; // اصلاح نام
import PanelLayout from "../layout/PanlLayout";
import GeneralInfoFormWithDrawer from "../pages/panel/user/form/FormContainer";

const PanelDashboard = lazy(
  () => import("../pages/panel/dashboard/PanelDashboard")
); 
const ShowUserTabel = lazy(() => import("../pages/panel/user/Tables/ShowUserTabel")); // اصلاح نام

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const PanelRoutes = {
  path: "/panel",
  element: <PanelLayout />,
  children: [
    {
      path: "",
      element: (
        <SuspenseWrapper>
          <PanelDashboard />
        </SuspenseWrapper>
      ),
    },
    {
      path: "users",
      element: (
        <SuspenseWrapper>
          <ShowUserTabel />
        </SuspenseWrapper>
      ),
    },
    {
      path: "sessions",
      element: (
        <SuspenseWrapper>
          <ShowUserTabel />
        </SuspenseWrapper>
      ),
    },
    {
      path: "active",
      element: (
        <SuspenseWrapper>
          <ShowUserTabel />
        </SuspenseWrapper>
      ),
    },
    {
      path: "members",
      element: (
        <SuspenseWrapper>
          <ShowUserTabel />
        </SuspenseWrapper>
      ),
    },
    {
      path: "settings",
      element: (
        <SuspenseWrapper>
          <ShowUserTabel />
        </SuspenseWrapper>
      ),
    },
    {
      path: "settings",
      element: (
        <SuspenseWrapper>
          <ShowUserTabel />
        </SuspenseWrapper>
      ),
    },

    {
      path: "users/add",
      element: (
        <SuspenseWrapper>
          <GeneralInfoFormWithDrawer />
        </SuspenseWrapper>
      ),
    },
    {
      path: "users/edit/:id",
      element: (
        <SuspenseWrapper>
          <GeneralInfoFormWithDrawer />
        </SuspenseWrapper>
      ),
    },
  ],
};

export default PanelRoutes;
