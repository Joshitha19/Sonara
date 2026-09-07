import React from 'react';
import { Radio, ShieldAlert, BarChart3, HelpCircle, Activity, Sparkles } from 'lucide-react';

export type ActiveTab = 'scan' | 'guardian' | 'dashboard' | 'about';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  apiOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isDemoMode,
  onToggleDemoMode,
  apiOnline,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#1F293D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => onTabChange('scan')}
          >
            {/* Sonar Radar Icon */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-[#1F293D] group-hover:border-[#B5384F]/50 transition-colors">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-[#B5384F]" />
              <span className="absolute w-6 h-6 rounded-full border border-[#B5384F]/40 animate-ping" />
              <span className="absolute w-8 h-8 rounded-full border border-slate-700/50" />
              <Radio className="w-5 h-5 text-slate-300 relative z-10" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  Sonara
                </span>
                <span className="text-[10px] font-semibold font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wide text-slate-400">
                Hear What&apos;s Real
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#111827]/80 p-1 rounded-xl border border-[#1F293D]">
            <button
              type="button"
              onClick={() => onTabChange('scan')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'scan'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
              Voice Scan
            </button>

            <button
              type="button"
              onClick={() => onTabChange('guardian')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'guardian'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#B5384F]" />
              Guardian Mode
            </button>

            <button
              type="button"
              onClick={() => onTabChange('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#2E9E5B]" />
              Security Intel
            </button>

            <button
              type="button"
              onClick={() => onTabChange('about')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'about'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              How It Works
            </button>
          </nav>

          {/* Right Controls: Demo Toggle & Backend Status */}
          <div className="flex items-center gap-2.5">
            {/* Live Clone Demo Mode Pill */}
            <button
              type="button"
              onClick={onToggleDemoMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isDemoMode
                  ? 'bg-[#B5384F]/15 border-[#B5384F]/60 text-rose-300 shadow-[0_0_12px_rgba(181,56,79,0.3)]'
                  : 'bg-slate-900 border-[#1F293D] text-slate-400 hover:text-slate-200'
              }`}
              title="Stage Demo Mode: Enables side-by-side cloned vs original speech comparison"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B5384F]" />
              <span className="hidden sm:inline">Stage Demo</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isDemoMode ? 'bg-[#B5384F]' : 'bg-slate-600'}`} />
            </button>

            {/* FastAPI Status Indicator */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 border border-[#1F293D] rounded-lg text-[11px] font-mono"
              title={apiOnline ? 'FastAPI /predict is reachable' : 'FastAPI is in offline / simulated fallback mode'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  apiOnline ? 'bg-[#2E9E5B] shadow-[0_0_8px_#2E9E5B]' : 'bg-amber-400 shadow-[0_0_8px_#F59E0B]'
                }`}
              />
              <span className="hidden lg:inline text-slate-300">
                {apiOnline ? 'API Online' : 'Simulated'}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-[#1F293D]/60">
          <button
            type="button"
            onClick={() => onTabChange('scan')}
            className={`text-xs py-1 px-2.5 rounded-md font-medium ${
              activeTab === 'scan' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Scan
          </button>
          <button
            type="button"
            onClick={() => onTabChange('guardian')}
            className={`text-xs py-1 px-2.5 rounded-md font-medium ${
              activeTab === 'guardian' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Guardian
          </button>
          <button
            type="button"
            onClick={() => onTabChange('dashboard')}
            className={`text-xs py-1 px-2.5 rounded-md font-medium ${
              activeTab === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Intel
          </button>
          <button
            type="button"
            onClick={() => onTabChange('about')}
            className={`text-xs py-1 px-2.5 rounded-md font-medium ${
              activeTab === 'about' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            How It Works
          </button>
        </div>
      </div>
    </header>
  );
};
