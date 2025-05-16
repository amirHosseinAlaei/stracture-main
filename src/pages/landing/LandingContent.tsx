import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function LandingContent() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 gap-4">
      <Button
        onClick={() => navigate("/panel")}
        type="text"
        className="
          p-4 min-w-36 min-h-36 flex flex-col space-y-3 items-center justify-center
          bg-transparent border-none shadow-none hover:!shadow-lg hover:!bg-white transition-colors duration-300
          text-black
        "
      >
        <img
          src="https://gw.tehrantc.com/ssotest/files/78bd9d3b-99ee-4ee0-a9fc-08dd81875ca7.jpg"
          alt=""
          className="mb-2 min-h-20 min-w-28 hover:shadow-lg rounded-lg object-contain"
        />
        لیست کاربران
      </Button>
    </div>
  );
}

export default LandingContent;
