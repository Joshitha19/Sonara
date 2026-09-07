import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { WaveformVisualizer } from '../common/WaveformVisualizer';

interface WaveformPulseProps {
  fileName?: string;
}

const ANALYSIS_STEPS = [
  'Extracting mel-spectrogram & MFCC acoustic features...',
  'Evaluating pitch contour variation and biological tremors...',
  'Scanning for synthetic vocoder phase discontinuities...',
  'Checking natural respiratory pauses & micro-breaths...',
  'Calculating neural classifier confidence verdict...',
];

export const WaveformPulse: React.FC<WaveformPulseProps> = ({ fileName }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
      {/* Background sonar rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-48 h-48 rounded-full border border-[#38BDF8] animate-ping" />
        <div className="w-72 h-72 rounded-full border border-[#38BDF8]/40" />
      </div>

      {/* Central Radar Pulse */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-[#38BDF8]/50 flex items-center justify-center shadow-lg shadow-[#38BDF8]/20">
          <Radio className="w-10 h-10 text-[#38BDF8] animate-pulse" />
        </div>
        <span className="absolute -inset-2 rounded-full border border-[#38BDF8]/40 animate-sonar-pulse" />
      </div>

      <h3 className="text-lg font-bold text-white mb-1">
        Scanning Voice Signatures...
      </h3>
      {fileName && (
        <p className="text-xs font-mono text-slate-400 mb-4 max-w-sm truncate">
          {fileName}
        </p>
      )}

      {/* Dynamic Waveform Visualizer */}
      <div className="w-full max-w-md my-4">
        <WaveformVisualizer
          isAnalyzing={true}
          color="#38BDF8"
          barsCount={36}
          height={44}
        />
      </div>

      {/* Rotating Forensic Step Indicator */}
      <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-slate-900 border border-[#1F293D] text-xs font-mono text-slate-300">
        <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
        <span>{ANALYSIS_STEPS[currentStepIndex]}</span>
      </div>
    </div>
  );
};
