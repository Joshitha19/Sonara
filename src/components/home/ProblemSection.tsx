import React from 'react';
import {
  AlertTriangle,
  Users,
  Briefcase,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ProblemSectionProps {
  onStartScanning: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onStartScanning }) => {
  return (
    <section className="w-full py-12 sm:py-16 border-b border-[#1F293D]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Section 1: The Escalating 2026 Problem */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#B5384F]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
              The 2026 Crisis
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How 10 Seconds of Audio Became the Ultimate Weapon
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            AI voice-cloning tools have advanced so rapidly that anyone can take a 10–30 second clip of your voice—harvested from a public YouTube video, Instagram reel, or even an innocuous cold call—and generate a hyper-realistic replica saying anything they type.
          </p>

          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Because it sounds like an actual human voice rather than a robotic robo-call, <strong className="text-white">people fall for it instantly</strong>. This is no longer theoretical—it is an escalating epidemic causing billions in emotional extortion and financial fraud in 2026.
          </p>

          {/* 3 Real-World Threat Scenarios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Scenario 1: Family Kidnapping / Accident Scam */}
            <div className="bg-[#111827] border border-[#B5384F]/30 hover:border-[#B5384F]/70 rounded-2xl p-6 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#B5384F]/20 flex items-center justify-center text-[#B5384F] mb-4 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-900/50">
                    Family Emergency Scam
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  &ldquo;Mom, I&apos;ve been in an accident, send money now&rdquo;
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Scammers synthesize an emotionally distressed daughter or son crying over the phone. Panicked parents immediately wire bail or hospital money without verifying.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1F293D] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Target: Elderly Parents</span>
                <span className="text-rose-400">High Risk</span>
              </div>
            </div>

            {/* Scenario 2: Corporate Executive Wire Scam */}
            <div className="bg-[#111827] border border-[#1F293D] hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-900/50">
                    CEO Wire Transfer Fraud
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  Executive Voice Impersonation
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Attackers clone a company CEO from podcast appearances or earnings calls to command an urgent, confidential overseas acquisition transfer bypass.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1F293D] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Target: Finance & HR Teams</span>
                <span className="text-purple-400">Targeted Spear-Phish</span>
              </div>
            </div>

            {/* Scenario 3: Bank Official OTP Scam */}
            <div className="bg-[#111827] border border-[#1F293D] hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                  <Landmark className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-900/50">
                    Bank Officer Spoof
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  OTP & Credentials Extortion
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Callers impersonating relationship managers speak with polished, natural cadence, warning of suspicious activity to extract multi-factor authentication codes.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#1F293D] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Target: Banking Consumers</span>
                <span className="text-amber-400">Credential Theft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: What We're Building (The Voice Lie Detector) */}
        <div className="bg-gradient-to-r from-[#111827] via-[#161F30] to-[#111827] border border-[#2E9E5B]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2E9E5B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E9E5B]/15 border border-[#2E9E5B]/40 text-[#2E9E5B] text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>What We&apos;re Building</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The AI Voice Lie Detector: Real-Time Audio Veracity
            </h3>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Think of Sonara like a lie detector—but instead of detecting emotional stress or spoken untruths, it answers one critical question in real time:
            </p>

            <blockquote className="my-4 pl-4 border-l-2 border-[#2E9E5B] text-base sm:text-lg font-semibold text-emerald-300 italic">
              &ldquo;Was this voice generated by artificial intelligence, or spoken by an actual living human?&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              By listening to any audio stream—a call recording, a live phone call, or an uploaded voice clip—Sonara decodes harmonic frequencies and synthetic vocoder phase smearing to deliver an immediate, unmistakable verdict.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartScanning}
                className="flex items-center gap-2 px-5 py-3 bg-[#2E9E5B] hover:bg-[#1F7542] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-[#2E9E5B]/25 transition-all"
              >
                <span>Try the Voice Lie Detector Below</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
