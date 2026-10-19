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
  color = 'rgba(255, 255, 255, 0.35)',
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
            opacity: isActive ? 0.9 : 0.3,
          }}
        />
        {/* Secondary subtle hairline stroke for editorial depth */}
        <path
          d={path}
          stroke="rgba(244, 63, 94, 0.6)"
          strokeWidth="0.75"
          strokeLinecap="round"
          style={{
            transform: 'translate(4px, 4px)',
            opacity: isActive ? 0.85 : 0.2,
            transition: 'opacity 0.8s ease',
          }}
        />
      </svg>
    </div>
  );
};
