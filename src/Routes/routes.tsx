import { createBrowserRouter } from "react-router-dom";
import LoginRoutes from "./auth.routes";
import PanelRoutes from "./panle.routes";
import landingRoutes from "./Landing.routes";
const routes= createBrowserRouter ([
landingRoutes , LoginRoutes , PanelRoutes
])


export default routes