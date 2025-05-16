// show a center  round and chields eveyo one of them have text and rout 

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// Center Round
const center = 275;
const centerCircleSize = 80;
// line start
const angles = [0, 72, 144, 216, 288];

//  size round chield
const childCircleSizes = [45, 55, 40, 60, 50];

//  gap round => to center round
const childRadii = [135, 145, 160, 170, 165];

//  icons
const iconClasses = [
  "far fa-users",
  "far fa-comments",
  "far fa-check-circle",
  "far fa-user",
  "far fa-cogs",
];
// rout addres
const routes = [
  "/panel/users",
  "/panel/sessions",
  "/panel/active",
  "/panel/members",
  "/panel/settings",
];
const hoverTexts = [
  "کاربران و گروه‌ها",
  "پیام‌ها و گفتگوها",
  "وضعیت تایید",
  "اعضا و کاربران",
  "تنظیمات سیستم",
];

const toRadians = (deg) => (deg * Math.PI) / 180;

function PanelEmpty() {
  const navigate = useNavigate();
  const rotationRef = useRef(0);
  const requestRef = useRef();
  const [rotation, setRotation] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  const rotationSpeed = 0.01; // ! speed round
  const hoverText = hoverIndex !== null ? hoverTexts[hoverIndex] : "";

  const animate = () => {
    rotationRef.current = (rotationRef.current + rotationSpeed) % 360;
    setRotation(rotationRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  const handleMouseEnter = useCallback((index) => setHoverIndex(index), []);
  const handleMouseLeave = useCallback(() => setHoverIndex(null), []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[500px] h-full">
      <svg width="550" height="550" viewBox="0 0 550 550">
        {/* center dound */}
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
          <div className="w-full h-full flex items-center justify-center">
            <i className="far fa-shield-alt text-[42px] text-black" />
          </div>
        </foreignObject>
        <text
          x={center}
          y={center + 42}
          textAnchor="middle"
          className="select-none text-[17px]"
        >
          {hoverText}
        </text>

        {/* round => all  */}
        <g
          transform={`rotate(${rotation}, ${center}, ${center})`}
          style={{ cursor: "pointer" }}
        >
          {angles.map((angle, i) => {
            const rad = toRadians(angle);
            const size = childCircleSizes[i];
            const radius = childRadii[i];

            const startX = center + centerCircleSize * Math.cos(rad);
            const startY = center + centerCircleSize * Math.sin(rad);

            const endX = center + radius * Math.cos(rad);
            const endY = center + radius * Math.sin(rad);

            const isHovered = hoverIndex === i;
            const handleClick = () => navigate(routes[i]);

            const iconSize = size * 0.6;
            const foX = endX - iconSize / 2;
            const foY = endY - iconSize / 2;

            return (
              <g
                key={i}
                onClick={handleClick}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              >
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="black"
                  strokeWidth="2"
                />
                <circle
                  cx={endX}
                  cy={endY}
                  r={size}
                  fill={isHovered ? "black" : "white"}
                  stroke="black"
                  strokeWidth="2"
                />
                <foreignObject
                  x={foX}
                  y={foY}
                  width={iconSize}
                  height={iconSize}
                  style={{
                    pointerEvents: "none",
                    overflow: "visible",
                    willChange: "transform",
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      transform: `rotate(${-rotation}deg)`,
                      transformOrigin: "center center",
                      fontSize: `${iconSize}px`,
                      willChange: "transform",
                    }}
                  >
                    <i
                      className={`${iconClasses[i]} ${
                        isHovered ? "text-white" : "text-black"
                      }`}
                      style={{ fontSize: `${iconSize}px` }}
                    />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default PanelEmpty;
