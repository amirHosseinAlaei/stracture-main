
import ReactDOM from "react-dom";

const PortalButton = ({ children }) => {
  const target = document.getElementById("panel-action-button");
  if (!target) return null;
  return ReactDOM.createPortal(children, target);
};

export default PortalButton;
