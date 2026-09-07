import React from 'react';
import { Mic, Radio, Sparkles } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-[#070B10]/95 backdrop-blur-md border-b border-[#162032]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo matching reference: Green circular badge with mic + brand name */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => onTabChange('scan')}
          >
            <div className="w-10 h-10 rounded-full bg-[#1E5936] flex items-center justify-center shadow-lg shadow-[#1E5936]/40 border border-[#2E9E5B]/40 group-hover:scale-105 transition-transform">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Sonara
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-400 bg-[#1E5936]/30 border border-[#2E9E5B]/30 px-2 py-0.5 rounded-full">
                Hear What&apos;s Real
              </span>
            </div>
          </div>

          {/* Centered Navigation Links matching reference */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              type="button"
              onClick={() => onTabChange('scan')}
              className={`transition-colors ${
                activeTab === 'scan' ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onTabChange('scan')}
              className={`transition-colors ${
                activeTab === 'scan' ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Voice Scan
            </button>
            <button
              type="button"
              onClick={() => onTabChange('guardian')}
              className={`transition-colors ${
                activeTab === 'guardian' ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Guardian Mode
            </button>
            <button
              type="button"
              onClick={() => onTabChange('dashboard')}
              className={`transition-colors ${
                activeTab === 'dashboard' ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Intel Logs
            </button>
            <button
              type="button"
              onClick={() => onTabChange('about')}
              className={`transition-colors ${
                activeTab === 'about' ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              How It Works
            </button>
          </nav>

          {/* Right actions matching reference: Log in + Green Sign Up / Scan button */}
          <div className="flex items-center gap-3">
            {/* Stage Demo Toggle Pill */}
            <button
              type="button"
              onClick={onToggleDemoMode}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isDemoMode
                  ? 'bg-[#B5384F]/20 border-[#B5384F]/50 text-rose-300'
                  : 'bg-slate-900 border-[#1F293D] text-slate-400 hover:text-slate-200'
              }`}
              title="Stage Demo Mode"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B5384F]" />
              <span>Demo Deck</span>
            </button>

            {/* Log in Button */}
            <button
              type="button"
              onClick={() => onTabChange('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
            >
              Log in
            </button>

            {/* Green Primary Action Button (styled exactly like Sign Up in reference) */}
            <button
              type="button"
              onClick={() => onTabChange('scan')}
              className="px-5 py-2 text-xs font-bold text-white bg-[#1E5936] hover:bg-[#267044] border border-[#2E9E5B]/40 rounded-lg shadow-md shadow-[#1E5936]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Scan Voice
            </button>
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="md:hidden flex items-center justify-around py-2.5 border-t border-[#162032]">
          <button
            type="button"
            onClick={() => onTabChange('scan')}
            className={`text-xs py-1 px-3 rounded-md font-medium ${
              activeTab === 'scan' ? 'bg-[#1E5936] text-white' : 'text-slate-400'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onTabChange('guardian')}
            className={`text-xs py-1 px-3 rounded-md font-medium ${
              activeTab === 'guardian' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Guardian
          </button>
          <button
            type="button"
            onClick={() => onTabChange('dashboard')}
            className={`text-xs py-1 px-3 rounded-md font-medium ${
              activeTab === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Intel
          </button>
          <button
            type="button"
            onClick={() => onTabChange('about')}
            className={`text-xs py-1 px-3 rounded-md font-medium ${
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
