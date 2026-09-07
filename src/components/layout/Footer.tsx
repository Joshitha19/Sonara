import React from 'react';
import { Shield, Lock, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1F293D] bg-[#0B0F17]/80 text-slate-400 text-xs py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#2E9E5B]" />
          <span className="font-semibold text-slate-300">Sonara Audio Forensics</span>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-slate-400">Smart India Hackathon 2026</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Zero Data Retention</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span>FastAPI Acoustic Inference</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          Built for telecommunications fraud prevention & scam mitigation.
        </div>
      </div>
    </footer>
  );
};
