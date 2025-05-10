import { createBrowserRouter } from "react-router-dom";
import landingRoutes from "./Landing.routes";
import LoginRoutes from "./login.routes";
import PanelRoutes from "./panle.routes";
const routes= createBrowserRouter ([
 landingRoutes , LoginRoutes , PanelRoutes
])


export default routes