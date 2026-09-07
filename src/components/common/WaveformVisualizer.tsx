import React from 'react';

interface WaveformVisualizerProps {
  isAnalyzing?: boolean;
  isPlaying?: boolean;
  color?: string;
  barsCount?: number;
  height?: number;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isAnalyzing = false,
  isPlaying = false,
  color = '#38BDF8',
  barsCount = 28,
  height = 48,
}) => {
  // Pre-calculated aesthetic pseudo-random bar heights
  const baseHeights = [
    25, 40, 65, 30, 80, 45, 95, 70, 50, 85, 60, 40, 75, 90, 100, 70, 85, 55,
    65, 90, 45, 30, 60, 80, 50, 35, 20, 15,
  ];

  return (
    <div
      className="flex items-center justify-center gap-[3px] w-full px-2"
      style={{ height: `${height}px` }}
    >
      {Array.from({ length: barsCount }).map((_, i) => {
        const heightPct = baseHeights[i % baseHeights.length];
        const animationDelay = `${(i * 0.05).toFixed(2)}s`;
        const animationDuration = isAnalyzing ? '0.7s' : '1.1s';

        return (
          <div
            key={i}
            className="w-[3px] sm:w-[4px] rounded-full transition-all duration-300"
            style={{
              height: isPlaying || isAnalyzing ? `${heightPct}%` : '15%',
              backgroundColor: color,
              opacity: isPlaying || isAnalyzing ? 0.9 : 0.35,
              animation:
                isPlaying || isAnalyzing
                  ? `waveBar ${animationDuration} ease-in-out infinite alternate`
                  : 'none',
              animationDelay,
            }}
          />
        );
      })}
    </div>
  );
};
