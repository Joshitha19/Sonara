import React from 'react';

interface CircularProgressProps {
  percentage: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  verdict: 'Real' | 'Cloned';
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 140,
  strokeWidth = 10,
  verdict,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isCloned = verdict === 'Cloned';
  const strokeColor = isCloned ? '#B5384F' : '#2E9E5B';
  const glowColor = isCloned ? 'rgba(181, 56, 79, 0.35)' : 'rgba(46, 158, 91, 0.35)';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ filter: `drop-shadow(0 0 12px ${glowColor})` }}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          {percentage.toFixed(1)}%
        </span>
        <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mt-0.5">
          Confidence
        </span>
      </div>
    </div>
  );
};
