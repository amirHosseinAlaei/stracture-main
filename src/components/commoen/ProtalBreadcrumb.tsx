
import ReactDOM from "react-dom";

const PortalBreadcrumb = ({ children }) => {
  const target = document.getElementById("panel-action-breadcrumb");
  if (!target) return null;
  return ReactDOM.createPortal(children, target);
};

export default PortalBreadcrumb;
