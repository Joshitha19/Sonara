import React from 'react';
import {
  HelpCircle,
  FileAudio,
  Activity,
  Cpu,
  ShieldCheck,
  Radio,
  Globe2,
  Fingerprint,
  MapPin,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Audio Input Capture',
      subtitle: 'Raw Audio Signal',
      icon: FileAudio,
      color: '#38BDF8',
      desc: 'Suspicious voicemail, recorded scam call, or live stream (.wav, .mp3, .flac) is ingested with zero audio quality degradation.',
    },
    {
      num: '02',
      title: 'Acoustic Fingerprinting',
      subtitle: 'Biomarkers & Tremors',
      icon: Activity,
      color: '#A855F7',
      desc: 'Speech is converted to mel-spectrograms. The system looks for natural human micro-breaths, pitch variation, and vocal cord resonance.',
    },
    {
      num: '03',
      title: 'Neural Classifier',
      subtitle: 'AI Artifact Detection',
      icon: Cpu,
      color: '#B5384F',
      desc: 'Deep learning models spot microscopic flaws typical of AI cloning tools (ElevenLabs, Bark, XTTS) such as vocoder phase smearing and robotic pitch locking.',
    },
    {
      num: '04',
      title: 'Instant Verdict & Shield',
      subtitle: 'Explainable Defense',
      icon: ShieldCheck,
      color: '#2E9E5B',
      desc: 'Provides a clear REAL or CLONED verdict with plain-English reasons. If fraud is detected, Guardian Mode can automatically alert family contacts.',
    },
  ];

  const roadmapItems = [
    {
      title: 'Real-Time Telecom Call Integration',
      badge: 'In Research',
      icon: Radio,
      desc: 'Direct integration with carrier networks (VoLTE, SIP, SS7) to analyze live scam phone calls in the background without user recording intervention.',
    },
    {
      title: 'Multilingual Detection (Hindi & Telugu)',
      badge: 'Architecture Phase',
      icon: Globe2,
      desc: 'Expanded training on Indian tonal languages including Hindi, Telugu, Tamil, and Bengali where accent nuances differ from Western voice models.',
    },
    {
      title: 'Known-Voice Biometric Vault',
      badge: 'Concept Stage',
      icon: Fingerprint,
      desc: 'Family members enroll a 10-second reference voiceprint. Incoming calls purporting to be them are compared biometrically for instant impersonation flagging.',
    },
    {
      title: 'Community Threat & Scam Map',
      badge: 'Planned',
      icon: MapPin,
      desc: 'Crowdsourced anonymized heat-map showing active clone scam campaigns targeting specific geographic regions and banking institutions.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-12 animate-fadeIn">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300 font-mono mb-4">
          <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Smart India Hackathon 2026 • AI Cyber Defense</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          How Sonara Detects AI Voice Clones
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          AI voice cloning allows scammers to impersonate family members or corporate executives using just 3 seconds of recorded audio. Sonara decodes the microscopic acoustic flaws left behind by AI vocoders to protect vulnerable citizens.
        </p>
      </div>

      {/* 4-Step Pipeline Explainer */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#1F293D]">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              The Detection Pipeline
            </h2>
            <p className="text-xs text-slate-400">
              Audio → Acoustic Fingerprint → Neural Model → Explainable Verdict
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            4-Stage Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#111827] border border-[#1F293D] hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                      {step.num}
                    </span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: step.color }} />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-0.5">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 block mb-2">
                    {step.subtitle}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1F293D] flex items-center text-[10px] font-mono text-slate-500">
                  <span>Stage {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Architectural Principles */}
      <div className="bg-[#111827] border border-[#1F293D] rounded-3xl p-6 sm:p-8">
        <h3 className="text-base font-bold text-white mb-2">
          Why Traditional Filters Fail Against AI Voice Clones
        </h3>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          Legacy caller-ID and spam filters rely on phone number blacklists, which scammers effortlessly bypass using VoIP spoofing. Sonara analyzes the <strong className="text-white">physical acoustics of the human voice</strong> itself.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h4 className="text-xs font-bold text-rose-300 mb-1">
              Synthetic Vocoder Flaws
            </h4>
            <p className="text-xs text-slate-400">
              Modern AI vocoders (HiFi-GAN, WaveGrad) struggle with phase alignment at high frequencies, leaving detectable mathematical discontinuities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h4 className="text-xs font-bold text-emerald-300 mb-1">
              Biological Micro-Tremors
            </h4>
            <p className="text-xs text-slate-400">
              Real human vocal cords exhibit natural fluctuations (jitter and shimmer) that neural networks often smooth out into unnatural perfection.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h4 className="text-xs font-bold text-sky-300 mb-1">
              Respiratory Cadence
            </h4>
            <p className="text-xs text-slate-400">
              Human lungs require air intake before complex sentences. Cloned audio generators frequently skip or distort organic breathing intervals.
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap Section (Framed as "Coming Next" for Judges) */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#1F293D]">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              SIH 2026 Strategic Roadmap
            </h2>
            <p className="text-xs text-slate-400">
              Upcoming milestones framed for commercial telecom rollout & public deployment
            </p>
          </div>
          <span className="text-xs font-mono text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/30 px-2.5 py-0.5 rounded-full">
            Coming Next
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roadmapItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#111827] border border-[#1F293D] rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                      <Icon className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#1F293D]/60 flex items-center gap-1 text-[11px] text-[#38BDF8] font-medium">
                  <span>In development pipeline</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
