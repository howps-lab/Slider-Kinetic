import React from 'react';

interface AnimatedStrokeProps {
  path: string;
  isActive: boolean;
  angle?: number;
  className?: string;
  color?: string;
}

export const AnimatedStroke: React.FC<AnimatedStrokeProps> = ({
  path,
  isActive,
  angle = 0,
  className = '',
  color = 'rgba(26, 26, 26, 0.45)',
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-visible transition-transform duration-700 ease-out ${className}`}
      style={{
        transform: `rotate(${angle * 0.4}deg)`,
      }}
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 500 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="12 6"
          className="transition-all duration-1000 ease-out"
          style={{
            strokeDashoffset: isActive ? '0' : '80',
            opacity: isActive ? 0.85 : 0.35,
          }}
        />
        {/* Secondary subtle hairline stroke for editorial depth */}
        <path
          d={path}
          stroke="rgba(225, 29, 72, 0.35)"
          strokeWidth="0.75"
          strokeLinecap="round"
          style={{
            transform: 'translate(4px, 4px)',
            opacity: isActive ? 0.7 : 0.15,
            transition: 'opacity 0.8s ease',
          }}
        />
      </svg>
    </div>
  );
};
