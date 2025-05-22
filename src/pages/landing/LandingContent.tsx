// Note :محتوای لندینگ /  روی ارایه مپ زده شد که در صورت  افزایش  کارد نیاز به نوشتن مجدد نباشه  فقط یک ابجکت به ارایه کارد دریتا اضافه ب

import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const cardData  = [

  {
    title: "لیست کاربران",
    image: "https://gw.tehrantc.com/ssotest/files/78bd9d3b-99ee-4ee0-a9fc-08dd81875ca7.jpg",
    path: "/panel",
  },
  
];

function LandingContent() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cardData.map(( card , index) => (
        <Button
          key={index}
          onClick={() => navigate(card.path)}
          type="text"
          className="!p-2 !w-auto min-h-36 flex flex-col space-y-3 items-center justify-center border-none text-black rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={card.image}
            alt={card.title}
            className="mb-2 min-h-20 min-w-28 rounded-lg object-contain"
          />
          <span className="text-lg">{card.title}</span>
        </Button>
      ))}
    </div>
  );
}

export default LandingContent;





