import React from 'react';
import { Sparkles, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';
import { ScanResult } from '../../types';

interface ExplainabilityTagsProps {
  scan: ScanResult;
}

export const ExplainabilityTags: React.FC<ExplainabilityTagsProps> = ({ scan }) => {
  const isCloned = scan.result === 'Cloned';

  return (
    <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-5 sm:p-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#38BDF8]" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Forensic Explainability Analysis
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
          {scan.reasons.length} Indicators Detected
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Plain-language acoustic markers extracted from spectral phoneme transitions:
      </p>

      {/* Forensic Chips / Tags */}
      <div className="flex flex-wrap gap-2.5">
        {scan.reasons.map((reason, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
              isCloned
                ? 'bg-[#B5384F]/10 border-[#B5384F]/30 text-rose-200'
                : 'bg-[#2E9E5B]/10 border-[#2E9E5B]/30 text-emerald-200'
            }`}
          >
            {isCloned ? (
              <AlertTriangle className="w-3.5 h-3.5 text-[#B5384F] mt-0.5 shrink-0" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5 text-[#2E9E5B] mt-0.5 shrink-0" />
            )}
            <span className="leading-snug">{reason}</span>
          </div>
        ))}
      </div>

      {/* Acoustic Metrics Breakdown */}
      {scan.features && (
        <div className="mt-5 pt-4 border-t border-[#1F293D] grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/90 border border-[#1F293D] p-3 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Pitch Invariance
            </span>
            <span className="text-sm font-bold font-mono text-white">
              {scan.features.pitchConsistency}%
            </span>
          </div>
          <div className="bg-slate-900/90 border border-[#1F293D] p-3 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Breathing Cadence
            </span>
            <span className="text-sm font-bold font-mono text-white">
              {scan.features.breathingPatternScore}%
            </span>
          </div>
          <div className="bg-slate-900/90 border border-[#1F293D] p-3 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Spectral Artifacts
            </span>
            <span className="text-sm font-bold font-mono text-white">
              {scan.features.spectralArtifacts}%
            </span>
          </div>
          <div className="bg-slate-900/90 border border-[#1F293D] p-3 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">
              Jitter / Shimmer
            </span>
            <span className="text-sm font-bold font-mono text-white">
              {scan.features.jitterShimmerRatio}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
