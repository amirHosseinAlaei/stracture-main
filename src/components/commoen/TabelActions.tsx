import React, { useState } from 'react';
import { Tooltip } from 'antd';

const ActionButtons = ({ buttons }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="flex justify-center items-center gap-3">
      {buttons.map((btn, index) => (
        <Tooltip key={index} title={btn.description} placement="top">
          <button
            aria-label={btn.title}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={btn.onClick}
            className={`
              p-2 rounded-md transition-colors duration-200
              ${btn.red ? 'text-red-600 hover:text-red-800' : 'text-gray-700 hover:text-blue-600'}
              focus:outline-none focus:ring-2 focus:ring-blue-400
            `}
            type="button"
          >
            {React.cloneElement(btn.icon, { className: 'text-xl' })}
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

export default ActionButtons;