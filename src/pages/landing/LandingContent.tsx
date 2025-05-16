// landing BTNS move to your =>  dashboard

import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function LandingContent() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 gap-4">
      <Button
        onClick={() => navigate("/panel")}
        type="text"
        className="!p-2 !w-auto min-h-36 flex flex-col space-y-3 items-center justify-center border-none text-black rounded-lg hover:shadow-lg transition-shadow duration-300"
      >
        <img
          src="https://gw.tehrantc.com/ssotest/files/78bd9d3b-99ee-4ee0-a9fc-08dd81875ca7.jpg"
          alt="لیست کاربران"
          className="mb-2 min-h-20 min-w-28 rounded-lg object-contain"
        />
        <span className="text-lg">لیست کاربران</span>
      </Button>
    </div>
  );
}

export default LandingContent;
