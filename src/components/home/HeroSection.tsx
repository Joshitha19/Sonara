import React, { useState } from 'react';
import { Play, Pause, Heart, Volume2 } from 'lucide-react';
import { WaveformVisualizer } from '../common/WaveformVisualizer';
import { VoiceVerdict } from '../../types';

interface HeroSectionProps {
  onScrollToScanner: () => void;
  onQuickTestSample: (type: VoiceVerdict) => void;
  onOpenHowItWorks: () => void;
  isAnalyzing: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToScanner,
  onQuickTestSample,
  onOpenHowItWorks,
  isAnalyzing,
}) => {
  const [isPlayingSample, setIsPlayingSample] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [activeSampleType, setActiveSampleType] = useState<'real' | 'cloned'>('cloned');

  const handleButtonPress = (type: VoiceVerdict) => {
    setActiveSampleType(type === 'Real' ? 'real' : 'cloned');
    onQuickTestSample(type);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#070B10] text-slate-100 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Spotlight effect behind the central robot and buttons matching reference */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-slate-400/10 via-emerald-950/20 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-[#2E9E5B]/10 blur-[100px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Main Headline styled exactly like reference */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Detect Any Voice Clone{' '}
              <span className="text-slate-400 font-medium">with</span>
              <br />
              <span className="text-[#3E9B60]">
                Human Level Realism Instantly
              </span>
            </h1>

            {/* Sub-headline description */}
            <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
              Ideal for families, finance teams, and institutions looking to expose fake AI emergency calls, executive wire scams, and voice deepfakes before falling victim.
            </p>

            {/* CTA Buttons matching reference: Solid green button + (▶) How it's Work */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onScrollToScanner}
                className="px-7 py-3.5 bg-[#1E5936] hover:bg-[#267044] text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#1E5936]/40 border border-[#2E9E5B]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </button>

              <button
                type="button"
                onClick={onOpenHowItWorks}
                className="flex items-center gap-2.5 px-4 py-3.5 text-sm font-medium text-slate-200 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-slate-400/80 group-hover:border-white flex items-center justify-center transition-colors">
                  <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                </div>
                <span>How it&apos;s Work</span>
              </button>
            </div>

            {/* Floating Audio Widgets positioned on lower-left matching reference layout */}
            <div className="mt-12 flex flex-wrap sm:flex-nowrap items-center gap-4 w-full max-w-md">
              {/* Card 1: Audio Player Card (Shopova marlin equivalent) */}
              <div className="flex-1 bg-[#0D131C] border border-[#1B2738] rounded-2xl p-4 shadow-2xl relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white truncate max-w-[150px]">
                    {activeSampleType === 'cloned' ? 'Emergency Bail Scam' : 'Authentic Caller'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    className="text-slate-400 hover:text-rose-400 transition-colors"
                    aria-label="Save sample"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Badges row: duration + bpm */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1E5936] text-emerald-300">
                    3.04
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    140bpm
                  </span>
                </div>

                {/* Waveform Player */}
                <div className="flex items-center gap-2.5 my-1">
                  <button
                    type="button"
                    onClick={() => setIsPlayingSample(!isPlayingSample)}
                    className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 shrink-0"
                    aria-label={isPlayingSample ? 'Pause' : 'Play'}
                  >
                    {isPlayingSample ? (
                      <Pause className="w-3 h-3 fill-slate-200" />
                    ) : (
                      <Play className="w-3 h-3 fill-slate-200 ml-0.5" />
                    )}
                  </button>

                  <div className="flex-1 overflow-hidden">
                    <WaveformVisualizer
                      isPlaying={isPlayingSample}
                      color="#FFFFFF"
                      barsCount={20}
                      height={24}
                    />
                  </div>
                </div>

                {/* Sub-label footer */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-800/60 font-mono">
                  <span>AI Voice</span>
                  <span className={activeSampleType === 'cloned' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {activeSampleType === 'cloned' ? 'Cloned Voice' : 'Real Voice'}
                  </span>
                </div>
              </div>

              {/* Card 2: Volume & Meter Indicator Card */}
              <div className="w-24 bg-[#0D131C] border border-[#1B2738] rounded-2xl p-3.5 flex flex-col justify-between shadow-2xl h-[120px]">
                {/* Level meters matching reference graphic */}
                <div className="flex items-end justify-between h-14 px-1 pt-1">
                  {/* Left slider indicator */}
                  <div className="relative h-full flex items-center justify-center w-3">
                    <div className="w-0.5 h-full bg-slate-700 rounded-full relative">
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-[#2E9E5B] rounded-sm" />
                    </div>
                  </div>

                  {/* Dual LED Meter */}
                  <div className="flex items-end gap-1 h-full">
                    {/* Meter bar 1 */}
                    <div className="w-1.5 h-full flex flex-col-reverse gap-0.5">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-full h-1 rounded-[1px] ${
                            i < 6 ? 'bg-[#2E9E5B]' : i < 8 ? 'bg-amber-400' : 'bg-rose-500'
                          }`}
                        />
                      ))}
                    </div>
                    {/* Meter bar 2 */}
                    <div className="w-1.5 h-full flex flex-col-reverse gap-0.5">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-full h-1 rounded-[1px] ${
                            i < 7 ? 'bg-white' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom label */}
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                  <Volume2 className="w-3 h-3 text-slate-400" />
                  <span>Volume</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Reference Scene — The Two Push-Buttons & Robot Character (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] lg:min-h-[480px]">
            {/* The Cinematic Stage with the Green & Red Hazard-Striped Buttons & Robot */}
            <div className="relative w-full max-w-lg flex items-center justify-center">
              {/* Dual Industrial Push-Buttons */}
              <div className="flex items-center gap-4 z-10 mr-12 sm:mr-16">
                {/* GREEN PUSH BUTTON with Hazard Diagonal Stripes */}
                <button
                  type="button"
                  onClick={() => handleButtonPress('Real')}
                  disabled={isAnalyzing}
                  className="group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  title="Test Real Human Voice"
                >
                  {/* Industrial Mount Plate with Hazard Stripes */}
                  <div
                    className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl p-1.5 shadow-2xl flex items-center justify-center border border-emerald-500/40 relative overflow-hidden"
                    style={{
                      background: 'repeating-linear-gradient(45deg, #0d1a12, #0d1a12 8px, #1e3825 8px, #1e3825 16px)',
                    }}
                  >
                    {/* Metal center faceplate */}
                    <div className="w-full h-full bg-[#121E17] rounded-lg border border-[#2E9E5B]/40 flex items-center justify-center shadow-inner relative">
                      {/* Push button actuator */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#35b568] to-[#1a5a32] p-1 shadow-lg shadow-[#2E9E5B]/50 flex items-center justify-center group-hover:shadow-[#2E9E5B]/80 transition-shadow">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2E9E5B] border-2 border-emerald-300/60 shadow-inner flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-white/40" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 mt-2">
                    Real Voice
                  </span>
                </button>

                {/* RED PUSH BUTTON with Hazard Diagonal Stripes */}
                <button
                  type="button"
                  onClick={() => handleButtonPress('Cloned')}
                  disabled={isAnalyzing}
                  className="group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  title="Test AI Cloned Voice"
                >
                  {/* Industrial Mount Plate with Red Hazard Stripes */}
                  <div
                    className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl p-1.5 shadow-2xl flex items-center justify-center border border-rose-500/40 relative overflow-hidden"
                    style={{
                      background: 'repeating-linear-gradient(45deg, #1c0d10, #1c0d10 8px, #3a161d 8px, #3a161d 16px)',
                    }}
                  >
                    {/* Metal center faceplate */}
                    <div className="w-full h-full bg-[#221215] rounded-lg border border-[#B5384F]/40 flex items-center justify-center shadow-inner relative">
                      {/* Push button actuator */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#d94863] to-[#731c2c] p-1 shadow-lg shadow-[#B5384F]/50 flex items-center justify-center group-hover:shadow-[#B5384F]/80 transition-shadow">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#B5384F] border-2 border-rose-300/60 shadow-inner flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-white/40" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase text-rose-400 mt-2">
                    Cloned Voice
                  </span>
                </button>
              </div>

              {/* The Robot Character pointing at the buttons (matching reference) */}
              <div className="relative -ml-6 sm:-ml-10 z-20 pointer-events-none select-none">
                <svg
                  className="w-48 h-56 sm:w-60 sm:h-72 drop-shadow-2xl"
                  viewBox="0 0 300 360"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Robot Head Body (White sphere) */}
                  <circle
                    cx="180"
                    cy="140"
                    r="85"
                    fill="url(#robotWhiteGrad)"
                    stroke="#D1D5DB"
                    strokeWidth="3"
                  />

                  {/* Dual Antennas */}
                  <path
                    d="M140 60 L110 10 M210 60 L240 10"
                    stroke="#E5E7EB"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <rect x="105" y="5" width="10" height="12" rx="2" fill="#9CA3AF" />
                  <rect x="235" y="5" width="10" height="12" rx="2" fill="#9CA3AF" />

                  {/* Ear speaker cup */}
                  <ellipse cx="260" cy="140" rx="14" ry="24" fill="#374151" stroke="#9CA3AF" strokeWidth="2" />
                  <ellipse cx="260" cy="140" rx="8" ry="16" fill="#111827" />

                  {/* Main Eye / Optical Lens Cone facing left towards buttons */}
                  <ellipse cx="110" cy="145" rx="30" ry="38" fill="#1F2937" stroke="#4B5563" strokeWidth="3" />
                  <circle cx="105" cy="145" r="22" fill="#0B0F17" stroke="#9CA3AF" strokeWidth="2" />
                  <circle cx="102" cy="145" r="14" fill="#030712" />
                  <circle cx="100" cy="142" r="5" fill="#38BDF8" className="animate-pulse" />
                  <circle cx="98" cy="140" r="2" fill="#FFFFFF" />

                  {/* Neck and mechanical joints */}
                  <path d="M165 220 L160 250 L195 250 L190 220" fill="#4B5563" />
                  <circle cx="178" cy="255" r="16" fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" />

                  {/* Robot Body Torso */}
                  <path
                    d="M140 265 C140 265 120 300 130 350 L230 350 C240 300 220 265 220 265 Z"
                    fill="url(#robotWhiteGrad)"
                    stroke="#D1D5DB"
                    strokeWidth="3"
                  />

                  {/* Arm & Hand pointing extended finger left at the push buttons */}
                  <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                    {/* Shoulder */}
                    <circle cx="130" cy="275" r="14" fill="#374151" />
                    {/* Upper arm */}
                    <path d="M125 280 L75 235" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round" />
                    {/* Elbow joint */}
                    <circle cx="75" cy="235" r="9" fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" />
                    {/* Forearm pointing to button */}
                    <path d="M75 235 L35 220" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
                    {/* Wrist joint */}
                    <circle cx="35" cy="220" r="7" fill="#374151" />
                    {/* Pointing Finger */}
                    <path d="M35 220 L8 215" stroke="#9CA3AF" strokeWidth="5" strokeLinecap="round" />
                    {/* Glowing fingertip touch sensor */}
                    <circle cx="8" cy="215" r="4" fill="#38BDF8" className="animate-ping" />
                    <circle cx="8" cy="215" r="3" fill="#FFFFFF" />
                  </g>

                  {/* Gradients */}
                  <defs>
                    <radialGradient id="robotWhiteGrad" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="65%" stopColor="#E5E7EB" />
                      <stop offset="100%" stopColor="#9CA3AF" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Strip — Matching reference 4-column divided container */}
        <div className="mt-14 lg:mt-20">
          <div className="bg-[#0A0F17]/90 border border-[#162032] rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[#162032]">
              {/* Item 1 */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:px-4 pt-2 lg:pt-0">
                <span className="text-sm font-bold text-white tracking-wide">
                  Real-Time
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Voice Scan (&lt;1.2s Latency)
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:px-6 pt-4 lg:pt-0">
                <span className="text-sm font-bold text-white tracking-wide">
                  Supports All Formats
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  .WAV, .MP3, .FLAC Audio
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:px-6 pt-4 lg:pt-0">
                <span className="text-sm font-bold text-white tracking-wide">
                  Voice Customization
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Pitch, Shimmer, Micro-Breaths
                </span>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:px-6 pt-4 lg:pt-0">
                <span className="text-sm font-bold text-white tracking-wide">
                  100% Secure
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  &amp; Private In-Memory Analysis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
