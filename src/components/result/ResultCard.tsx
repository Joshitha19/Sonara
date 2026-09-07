import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert, ArrowLeft, RefreshCw, Volume2, Info } from 'lucide-react';
import { ScanResult, GuardianContact } from '../../types';
import { CircularProgress } from '../common/CircularProgress';
import { ExplainabilityTags } from './ExplainabilityTags';
import { ScamReportModal } from './ScamReportModal';
import { AudioPlayer } from '../common/AudioPlayer';

interface ResultCardProps {
  scan: ScanResult;
  contacts: GuardianContact[];
  onTriggerGuardianAlerts: (selectedContactIds: string[], customNote: string) => void;
  onScanAnother: () => void;
  isFallbackDemo?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  scan,
  contacts,
  onTriggerGuardianAlerts,
  onScanAnother,
  isFallbackDemo,
}) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const isCloned = scan.result === 'Cloned';
  const confidencePct = scan.confidence * 100;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-5 animate-fadeIn">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onScanAnother}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </button>

        <div className="flex items-center gap-2">
          {scan.source === 'demo_simulated' && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Demo Simulation Mode
            </span>
          )}
          <span className="text-xs font-mono text-slate-400">
            Scan ID: {scan.id}
          </span>
        </div>
      </div>

      {/* Main Verdict Card */}
      <div
        className={`border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all ${
          isCloned
            ? 'bg-gradient-to-b from-[#B5384F]/15 via-[#111827] to-[#111827] border-[#B5384F]/50 shadow-[#B5384F]/10'
            : 'bg-gradient-to-b from-[#2E9E5B]/15 via-[#111827] to-[#111827] border-[#2E9E5B]/50 shadow-[#2E9E5B]/10'
        }`}
      >
        {/* Subtle Ambient Glow */}
        <div
          className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 ${
            isCloned ? 'bg-[#B5384F]' : 'bg-[#2E9E5B]'
          }`}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left: Verdict Text & Icon */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-3">
              {isCloned ? (
                <div className="w-12 h-12 rounded-2xl bg-[#B5384F]/20 border border-[#B5384F]/50 flex items-center justify-center text-[#B5384F] shadow-lg shadow-[#B5384F]/30">
                  <AlertTriangle className="w-7 h-7 animate-bounce" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-[#2E9E5B]/20 border border-[#2E9E5B]/50 flex items-center justify-center text-[#2E9E5B] shadow-lg shadow-[#2E9E5B]/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              )}

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Forensic Audio Analysis
                </span>
                <h2
                  className={`text-2xl sm:text-3xl font-black tracking-tight ${
                    isCloned ? 'text-[#B5384F]' : 'text-[#2E9E5B]'
                  }`}
                >
                  {scan.label}
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed mt-1">
              {isCloned
                ? 'High mathematical probability of synthetic neural voice generation. This sample exhibits hallmark characteristics of deepfake clone fraud.'
                : 'Acoustic biomarkers and biological vocal resonance patterns verify this audio is from an organic human speaker.'}
            </p>

            {/* Audio Metadata Pill */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 truncate max-w-[280px]">
                {scan.audioName}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800">
                {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Right: Circular Progress Ring */}
          <div className="shrink-0 flex flex-col items-center">
            <CircularProgress
              percentage={confidencePct}
              size={150}
              strokeWidth={11}
              verdict={scan.result}
            />
          </div>
        </div>

        {/* Audio Player Preview */}
        <div className="mt-6 pt-5 border-t border-[#1F293D]">
          <AudioPlayer
            src={scan.audioBlobUrl}
            fileName={scan.audioName}
            themeColor={isCloned ? '#B5384F' : '#2E9E5B'}
          />
        </div>
      </div>

      {/* Explainability Panel */}
      <ExplainabilityTags scan={scan} />

      {/* Actions Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onScanAnother}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Analyze Another Audio Sample</span>
        </button>

        {isCloned ? (
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#B5384F] hover:bg-[#8E2538] text-white text-xs font-bold shadow-lg shadow-[#B5384F]/30 transition-transform active:scale-[0.99]"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Report as Scam & Trigger Guardian Mode</span>
          </button>
        ) : (
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#2E9E5B]" />
            <span>Verified safe caller — no scam notification needed.</span>
          </div>
        )}
      </div>

      {/* Scam Report Dispatch Modal */}
      <ScamReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        scan={scan}
        contacts={contacts}
        onTriggerAlerts={onTriggerGuardianAlerts}
      />
    </div>
  );
};
