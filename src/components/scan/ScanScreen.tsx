import React, { useState } from 'react';
import { DropZone } from './DropZone';
import { WaveformPulse } from './WaveformPulse';
import { LiveCloneDemo } from './LiveCloneDemo';
import { AudioPlayer } from '../common/AudioPlayer';
import { Radio, AlertCircle, Sparkles, Shield, ArrowRight, Play } from 'lucide-react';
import { ScanResult, VoiceVerdict } from '../../types';

interface ScanScreenProps {
  onScanComplete: (result: ScanResult, isFallback: boolean) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  isAnalyzing: boolean;
  onStartAnalysis: (file: File | Blob, fileName: string, options?: { forceSimulate?: boolean; presetVerdict?: VoiceVerdict }) => Promise<void>;
  errorMessage: string | null;
  onClearError: () => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({
  onScanComplete,
  isDemoMode,
  onToggleDemoMode,
  isAnalyzing,
  onStartAnalysis,
  errorMessage,
  onClearError,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | Blob | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileSelected = (file: File | Blob, name: string) => {
    setSelectedFile(file);
    setFileName(name);
    onClearError();
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFileName('');
    onClearError();
  };

  const handleTriggerScan = () => {
    if (!selectedFile) return;
    onStartAnalysis(selectedFile, fileName);
  };

  // Called from Live Clone Demo side-by-side slots
  const handleSelectDemoSample = (demoFileName: string, verdict: VoiceVerdict) => {
    // Generate empty synthetic blob with name
    const dummyBlob = new Blob(['sonara_stage_demo_audio'], { type: 'audio/wav' });
    onStartAnalysis(dummyBlob, demoFileName, {
      forceSimulate: true,
      presetVerdict: verdict,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-[#1F293D] text-xs font-mono text-slate-300 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#B5384F] animate-ping" />
          <span>Real-Time Voice Clone & Scam Detection</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Hear What&apos;s Real.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl leading-relaxed">
          Verify suspect audio calls, voicemails, and audio messages before making emergency decisions. Detect neural speech synthesis in seconds.
        </p>
      </div>

      {/* Friendly Error Notice */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold block">Notice from Acoustic Engine</span>
              <span>{errorMessage}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClearError}
            className="text-xs px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Analyzing Pulse State or Normal Scan Input */}
      {isAnalyzing ? (
        <WaveformPulse fileName={fileName} />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Main Upload / Live Mic Box */}
          <DropZone
            selectedFile={selectedFile}
            fileName={fileName}
            onFileSelected={handleFileSelected}
            onClearFile={handleClearFile}
            isAnalyzing={isAnalyzing}
          />

          {/* Audio Player Preview (if audio selected) */}
          {selectedFile && (
            <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold mb-2 block uppercase tracking-wider">
                Audio Preview Before Scanning:
              </span>
              <AudioPlayer
                blob={selectedFile}
                fileName={fileName}
                themeColor="#38BDF8"
              />
            </div>
          )}

          {/* Prominent Scan Voice Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleTriggerScan}
              disabled={!selectedFile || isAnalyzing}
              className={`w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all shadow-xl ${
                selectedFile
                  ? 'bg-gradient-to-r from-[#B5384F] to-[#8E2538] hover:from-[#c23f57] hover:to-[#9e2b40] text-white shadow-[#B5384F]/30 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <Radio className="w-5 h-5 text-white" />
              <span>SCAN VOICE SIGNATURE</span>
            </button>
          </div>

          {/* Live Clone Demo Mode Toggle & Container */}
          <div className="mt-4 pt-6 border-t border-[#1F293D]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B5384F]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Clone Demo Mode
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Stage Presentation
                </span>
              </div>

              {/* Small Toggle Switch */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">
                  {isDemoMode ? 'Active' : 'Show Demo Slots'}
                </span>
                <button
                  type="button"
                  onClick={onToggleDemoMode}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isDemoMode ? 'bg-[#B5384F]' : 'bg-slate-800 border border-slate-700'
                  }`}
                  aria-label="Toggle Live Clone Demo Mode"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                      isDemoMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Render Side-by-side deck if toggled */}
            {isDemoMode && (
              <LiveCloneDemo
                onSelectSampleForScan={handleSelectDemoSample}
                isAnalyzing={isAnalyzing}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
