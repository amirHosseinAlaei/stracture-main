import { lazy, Suspense } from "react";
import PanelLayout from "../leyout/PanleLeyout"; // اصلاح نام
import Loading from "../components/commoen/Loading"; // اصلاح نام

const Forms = lazy(() => import("../components/commoen/Forms")); // اصلاح نام

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const PanelRoutes = {
    path: "/panel", // اصلاح نام
    element: <PanelLayout />,
    children: [
        {
            path: "",
            element: (
                <SuspenseWrapper>
                    <Forms />
                </SuspenseWrapper>
            ),
        },
    ],
};

export default PanelRoutes;
