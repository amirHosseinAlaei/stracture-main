import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Tooltip } from "antd";
import PortalBreadcrumb from "../../../components/commoen/ProtalBreadcrumb";

const center = 275,
  centerCircleSize = 80;
const items = [
  {
    angle: 0,
    size: 55,
    radius: 145,
    icon: "far fa-users",
    route: "/panel/users",
    text: "کاربران و گروه‌ها",
  },
  {
    angle: 72,
    size: 55,
    radius: 145,
    icon: "far fa-comments",
    route: "/panel/sessions",
    text: "پیام‌ها و گفتگوها",
  },
  {
    angle: 144,
    size: 40,
    radius: 160,
    icon: "far fa-check-circle",
    route: "/panel/active",
    text: "وضعیت تایید",
  },
  {
    angle: 216,
    size: 60,
    radius: 170,
    icon: "far fa-user",
    route: "/panel/members",
    text: "اعضا و کاربران",
  },
  {
    angle: 288,
    size: 50,
    radius: 165,
    icon: "far fa-cogs",
    route: "/panel/settings",
    text: "تنظیمات سیستم",
  },
];

const toRad = (deg) => (deg * Math.PI) / 180;

export default function PanelDashboard() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0),
    [hover, setHover] = useState(null);
  const reqRef = useRef();

  useEffect(() => {
    const animate = () => {
      setRotation((r) => (r + 0.03) % 360);
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  return (
    <div className="flex  flex-col items-center justify-center min-h-[500px] h-full gap-6 p-4">
      <svg width="100%" viewBox="0 0 550 550" className="max-w-[500px] ">
        <circle
          cx={center}
          cy={center}
          r={centerCircleSize}
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        <foreignObject
          x={center - 30}
          y={center - 30}
          width={60}
          height={60}
          style={{ pointerEvents: "none" }}
        >
          <div className="w-full  h-full flex items-center justify-center">
            <i className="far fa-shield-alt text-[42px] text-black" />
          </div>
        </foreignObject>
        <text
          x={center}
          y={center + 42}
          textAnchor="middle"
          className="select-none text-[17px] font-medium"
          style={{ fontFamily: "Vazirmatn, sans-serif" }}
        >
          {hover !== null ? items[hover].text : ""}
        </text>
        {/* Group for rotating items */}
        <g
          transform={`rotate(${rotation},${center},${center})`}
          style={{ cursor: "pointer" }}
        >
          {items.map((item, i) => {
            const rad = toRad(item.angle),
              size = item.size,
              radius = item.radius;
            const sx = center + centerCircleSize * Math.cos(rad),
              sy = center + centerCircleSize * Math.sin(rad);
            const ex = center + radius * Math.cos(rad),
              ey = center + radius * Math.sin(rad);
            const iconSize = size * 0.5; // نسبت کوچکتر برای اطمینان از قرارگیری کامل
            const foSize = iconSize * 1.5; // foreignObject بزرگتر
            const foX = ex - foSize / 2,
              foY = ey - foSize / 2;
            const isH = hover === i;

            return (
              <g
                key={i}
                onClick={() => navigate(item.route)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <line
                  x1={sx}
                  y1={sy}
                  x2={ex}
                  y2={ey}
                  stroke="black"
                  strokeWidth="2"
                />
                <circle
                  cx={ex}
                  cy={ey}
                  r={size}
                  fill={isH ? "black" : "white"}
                  stroke="black"
                  strokeWidth="2"
                />
                <foreignObject
                  x={foX}
                  y={foY}
                  width={foSize}
                  height={foSize}
                  style={{
                    pointerEvents: "none",
                    willChange: "transform",
                  }}
                >
                  <Tooltip title={item.text} placement="top">
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        transform: `rotate(${-rotation}deg)`,
                        fontSize: `${iconSize}px`,
                      }}
                    >
                      <i
                        className={`${item.icon} ${
                          isH ? "text-white" : "text-black"
                        }`}
                        style={{ fontSize: `${iconSize}px` }}
                      />
                    </div>
                  </Tooltip>
                </foreignObject>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="items-center text-cyan-900  text-lg -mt-16 text-center space-y-2 flex flex-col">
        <p>پنل مدیریت کاربران </p>
        <p>سامان</p>
        <Button  className="!bg-slate-200" type="text">نسخه 2.1.1:040118</Button>

        <PortalBreadcrumb>
          <Breadcrumb className="" items={[{ title: "خانه" }]} />
        </PortalBreadcrumb>
      </div>
    </div>
  );
}
