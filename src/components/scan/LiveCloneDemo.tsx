import React, { useState } from 'react';
import { DEMO_PRESETS, DemoPreset } from '../../lib/mockData';
import { AudioPlayer } from '../common/AudioPlayer';
import { ShieldCheck, ShieldAlert, Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

interface LiveCloneDemoProps {
  onSelectSampleForScan: (fileName: string, verdict: 'Real' | 'Cloned') => void;
  isAnalyzing: boolean;
}

export const LiveCloneDemo: React.FC<LiveCloneDemoProps> = ({
  onSelectSampleForScan,
  isAnalyzing,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const activePreset: DemoPreset = DEMO_PRESETS[selectedPresetIndex];

  return (
    <div className="bg-[#111827]/90 border border-[#B5384F]/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Stage Demo Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1F293D]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#B5384F]/20 flex items-center justify-center text-[#B5384F]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Clone Stage Demo Mode
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#B5384F]/20 text-rose-300 border border-[#B5384F]/40">
                Judges Live Demo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Side-by-side acoustic comparison of authentic human speech vs. AI-synthesized deepfake clone.
            </p>
          </div>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Scenario:</span>
          <select
            value={selectedPresetIndex}
            onChange={(e) => setSelectedPresetIndex(Number(e.target.value))}
            className="bg-slate-900 border border-[#1F293D] rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#38BDF8]"
          >
            {DEMO_PRESETS.map((preset, idx) => (
              <option key={preset.id} value={idx}>
                {preset.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scenario Brief */}
      <div className="p-3 bg-slate-900/80 border border-[#1F293D] rounded-xl mb-5 text-xs text-slate-300 flex items-start gap-2.5">
        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 uppercase shrink-0">
          Target Threat
        </span>
        <span>{activePreset.scenario}</span>
      </div>

      {/* Side-by-side comparison grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* SLOT A: ORIGINAL / REAL VOICE */}
        <div className="bg-[#0B0F17] border border-[#2E9E5B]/40 rounded-xl p-4.5 flex flex-col justify-between relative group hover:border-[#2E9E5B] transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E9E5B] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E9E5B]">
                Sample A: Authentic Voice
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
              Ground Truth: REAL
            </span>
          </div>

          <h4 className="text-sm font-semibold text-white mb-2">
            {activePreset.originalLabel}
          </h4>

          <div className="my-2">
            <AudioPlayer
              fileName={activePreset.originalFile}
              themeColor="#2E9E5B"
            />
          </div>

          <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
            Contains natural vocal cord micro-tremors, continuous harmonic decay, and biological breath intake.
          </p>

          <button
            type="button"
            onClick={() => onSelectSampleForScan(activePreset.originalFile, 'Real')}
            disabled={isAnalyzing}
            className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2E9E5B]/15 hover:bg-[#2E9E5B]/25 text-[#2E9E5B] border border-[#2E9E5B]/40 rounded-xl text-xs font-semibold transition-all hover:border-[#2E9E5B] active:scale-[0.99]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Scan Sample A (Original)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
        </div>

        {/* SLOT B: CLONED / AI VOICE */}
        <div className="bg-[#0B0F17] border border-[#B5384F]/40 rounded-xl p-4.5 flex flex-col justify-between relative group hover:border-[#B5384F] transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B5384F] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Sample B: AI Cloned Impersonator
              </span>
            </div>
            <span className="text-[10px] font-mono text-rose-300 px-2 py-0.5 rounded bg-[#B5384F]/20 border border-[#B5384F]/30">
              Ground Truth: CLONED
            </span>
          </div>

          <h4 className="text-sm font-semibold text-white mb-2">
            {activePreset.clonedLabel}
          </h4>

          <div className="my-2">
            <AudioPlayer
              fileName={activePreset.clonedFile}
              themeColor="#B5384F"
            />
          </div>

          <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
            Generated using 3s reference audio. Exhibits unnatural pitch consistency and neural vocoder spectral artifacts.
          </p>

          <button
            type="button"
            onClick={() => onSelectSampleForScan(activePreset.clonedFile, 'Cloned')}
            disabled={isAnalyzing}
            className="w-full mt-auto flex items-center justify-center gap-2 py-2.5 px-4 bg-[#B5384F] hover:bg-[#8E2538] text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#B5384F]/25 transition-all active:scale-[0.99]"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Scan Sample B (AI Clone)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
