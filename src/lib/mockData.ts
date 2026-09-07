import { ScanResult, GuardianContact, GuardianAlertRecord } from '../types';

export const INITIAL_CONTACTS: GuardianContact[] = [
  {
    id: 'c1',
    name: 'Eleanor Vance',
    relationship: 'Mother',
    phone: '+1 (555) 234-8901',
    isProtected: true,
    createdAt: '2026-02-14T09:30:00Z',
  },
  {
    id: 'c2',
    name: 'Robert Vance',
    relationship: 'Father',
    phone: '+1 (555) 987-6543',
    isProtected: true,
    createdAt: '2026-02-15T11:15:00Z',
  },
  {
    id: 'c3',
    name: 'Maya Vance',
    relationship: 'Sister',
    phone: '+1 (555) 456-7890',
    isProtected: false,
    createdAt: '2026-02-28T14:20:00Z',
  },
];

export const INITIAL_SCANS: ScanResult[] = [
  {
    id: 'scn-9842',
    audioName: 'urgent_bank_verification_voicemail.wav',
    fileSize: 1420500,
    durationSeconds: 12.4,
    timestamp: new Date(Date.now() - 1000 * 60 * 24).toISOString(), // 24m ago
    result: 'Cloned',
    confidence: 0.984,
    label: 'CLONED VOICE ⚠️',
    reasons: [
      'Unnatural pitch consistency detected across phoneme transitions',
      'Missing natural human breathing pattern & respiratory pauses',
      'Spectral synthesis artifacts typical of neural vocoder (HiFi-GAN)',
      'Subtle robotic phase jitter in high frequencies (>6kHz)',
    ],
    features: {
      pitchConsistency: 96,
      breathingPatternScore: 12,
      spectralArtifacts: 91,
      jitterShimmerRatio: 88,
    },
    source: 'api',
  },
  {
    id: 'scn-9841',
    audioName: 'granddaughter_emergency_bail_scam.mp3',
    fileSize: 890400,
    durationSeconds: 8.2,
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(), // ~1.5h ago
    result: 'Cloned',
    confidence: 0.962,
    label: 'CLONED VOICE ⚠️',
    reasons: [
      'Anomalous formant frequency transitions inconsistent with human vocal tract',
      'Synthesized emotional prosody with flat baseline pitch',
      'Spectral smearing during unvoiced fricative sounds',
    ],
    features: {
      pitchConsistency: 93,
      breathingPatternScore: 18,
      spectralArtifacts: 87,
      jitterShimmerRatio: 84,
    },
    source: 'api',
  },
  {
    id: 'scn-9840',
    audioName: 'dad_real_checkin_call.wav',
    fileSize: 2150000,
    durationSeconds: 18.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4h ago
    result: 'Real',
    confidence: 0.991,
    label: 'REAL VOICE ✅',
    reasons: [
      'Organic vocal cord jitter and micro-tremors verified',
      'Natural lung inhalation pauses present before long utterances',
      'Smooth, continuous human vocal tract resonance curves',
      'Zero synthetic vocoder phase discontinuities detected',
    ],
    features: {
      pitchConsistency: 22,
      breathingPatternScore: 95,
      spectralArtifacts: 4,
      jitterShimmerRatio: 15,
    },
    source: 'api',
  },
  {
    id: 'scn-9839',
    audioName: 'ceo_wire_transfer_request.wav',
    fileSize: 1840000,
    durationSeconds: 14.1,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18h ago
    result: 'Cloned',
    confidence: 0.978,
    label: 'CLONED VOICE ⚠️',
    reasons: [
      'ElevenLabs / XTTS latent voice cloning signatures recognized',
      'Repetitive micro-pitch contour loops detected',
      'Abrupt energy drop-offs at word terminations',
    ],
    features: {
      pitchConsistency: 95,
      breathingPatternScore: 14,
      spectralArtifacts: 94,
      jitterShimmerRatio: 90,
    },
    source: 'api',
  },
  {
    id: 'scn-9838',
    audioName: 'interview_audio_sample_clean.mp3',
    fileSize: 3100000,
    durationSeconds: 26.8,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString(), // yesterday
    result: 'Real',
    confidence: 0.985,
    label: 'REAL VOICE ✅',
    reasons: [
      'Authentic acoustic room reverberation and organic breath intake',
      'Natural fundamental frequency (F0) drift over extended speech',
      'Harmonic-to-noise ratio within biological speech thresholds',
    ],
    features: {
      pitchConsistency: 18,
      breathingPatternScore: 92,
      spectralArtifacts: 6,
      jitterShimmerRatio: 18,
    },
    source: 'api',
  },
];

export const INITIAL_ALERTS: GuardianAlertRecord[] = [
  {
    id: 'alt-1',
    scan_id: 'scn-9842',
    contact_name: 'Eleanor Vance',
    contact_phone: '+1 (555) 234-8901',
    status: 'delivered',
    timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    threatLevel: 'CRITICAL',
    message: '⚠️ Sonara Alert: High-confidence (98.4%) AI voice clone detected impersonating a family contact in an incoming call.',
  },
  {
    id: 'alt-2',
    scan_id: 'scn-9841',
    contact_name: 'Robert Vance',
    contact_phone: '+1 (555) 987-6543',
    status: 'delivered',
    timestamp: new Date(Date.now() - 1000 * 60 * 94).toISOString(),
    threatLevel: 'HIGH',
    message: '⚠️ Sonara Alert: Cloned voice impersonation detected on incoming call. Please verify offline via secondary channel.',
  },
];

// Presets for Live Clone Demo Mode
export interface DemoPreset {
  id: string;
  title: string;
  description: string;
  originalLabel: string;
  originalFile: string;
  originalVerdict: 'Real';
  clonedLabel: string;
  clonedFile: string;
  clonedVerdict: 'Cloned';
  scenario: string;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'preset-family-scam',
    title: 'Emergency Grandchild Bail Scam',
    description: 'A 10-second voice clone created with 3 seconds of reference audio taken from social media.',
    originalLabel: 'Real Grandchild (Authentic Voice)',
    originalFile: 'alex_authentic_phone_call.wav',
    originalVerdict: 'Real',
    clonedLabel: 'AI Cloned Scam Call (Voice Clone)',
    clonedFile: 'alex_deepfake_bail_urgency.wav',
    clonedVerdict: 'Cloned',
    scenario: 'Scammer calls grandparent claiming grandchild is in police custody and needs instant wire transfer.',
  },
  {
    id: 'preset-bank-verification',
    title: 'Executive Wire Authorization Fraud',
    description: 'Targeted spear-phishing attack cloning a corporate CEO authorizing an urgent vendor payment.',
    originalLabel: 'Authentic CEO Podcast Speech',
    originalFile: 'ceo_earnings_call_real.wav',
    originalVerdict: 'Real',
    clonedLabel: 'Synthesized CEO Phone Order',
    clonedFile: 'ceo_urgent_fund_transfer_clone.wav',
    clonedVerdict: 'Cloned',
    scenario: 'Accounts payable employee receives call from "CEO" commanding immediate bypass of usual controls.',
  },
];

export const CLONED_REASONS_POOL = [
  'Unnatural pitch consistency detected across phoneme transitions',
  'Missing natural human breathing pattern & respiratory pauses',
  'Spectral synthesis artifacts typical of neural vocoders (e.g. HiFi-GAN, WaveNet)',
  'Robotic phase jitter and harmonic irregularities in upper frequencies (>6kHz)',
  'Anomalous formant frequency transitions inconsistent with human vocal tract mechanics',
  'Synthesized emotional prosody with flattened baseline frequency variance',
];

export const REAL_REASONS_POOL = [
  'Organic vocal cord micro-tremors and biological jitter confirmed',
  'Natural respiratory pauses and audible micro-inhalations verified',
  'Continuous harmonic decay and biological resonance across formant spectrum',
  'Dynamic fundamental frequency (F0) drift matching authentic human emotive speech',
  'Harmonic-to-noise ratio (HNR) adheres strictly to biological vocal limits',
];
