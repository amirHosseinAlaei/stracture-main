import { lazy, Suspense } from "react";
import PanelLayout from "../leyout/PanleLeyout"; // اصلاح نام
import Loading from "../components/commoen/Loading"; // اصلاح نام
import GeneralInfoForm from "../pages/panel/user/form/FormAddEditUser";

const PanelEmpty = lazy(() =>
  import("../pages/panel/cleanroom/PanelEmpty")
); // اصلاح نام
const ShowUserTabel = lazy(() =>
  import("../pages/panel/user/ShowUserTabel")
); // اصلاح نام

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const PanelRoutes = {

  path: "/panel", // اصلاح نام
  element: <PanelLayout />,
  children: [
    // مسیر پیش‌فرض برای نمایش PanelEmpty
    {
      path: "",
      element: (
        <SuspenseWrapper>
          <PanelEmpty />
        </SuspenseWrapper>
      ),
    },
    // سایر مسیرها برای نمایش ShowUserTabel
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
          <GeneralInfoForm />
        </SuspenseWrapper>
        
      ),
    },
     {
      path: "users/edit/:id",
      element: (
        <SuspenseWrapper>
          <GeneralInfoForm />
        </SuspenseWrapper>
        
      ),
    },
  ],
};

export default PanelRoutes;