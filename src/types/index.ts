export type VoiceVerdict = 'Real' | 'Cloned';

export interface FastAPIPredictionResponse {
  result: VoiceVerdict;
  confidence: number;
  label: 'REAL VOICE ✅' | 'CLONED VOICE ⚠️';
}

export interface AcousticFeatureAnalysis {
  pitchConsistency: number; // 0-100
  breathingPatternScore: number; // 0-100
  spectralArtifacts: number; // 0-100
  jitterShimmerRatio: number; // 0-100
}

export interface ScanResult {
  id: string;
  audioName: string;
  fileSize?: number;
  durationSeconds?: number;
  timestamp: string;
  result: VoiceVerdict;
  confidence: number;
  label: 'REAL VOICE ✅' | 'CLONED VOICE ⚠️';
  reasons: string[];
  features?: AcousticFeatureAnalysis;
  audioBlobUrl?: string;
  source: 'api' | 'demo_simulated';
}

export interface GuardianContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isProtected: boolean;
  createdAt: string;
}

export interface GuardianAlertRecord {
  id: string;
  scan_id: string;
  contact_id?: string;
  contact_name: string;
  contact_phone: string;
  status: 'sent' | 'delivered' | 'pending';
  timestamp: string;
  threatLevel: 'HIGH' | 'CRITICAL';
  message: string;
}

// Supabase Database Table Definitions
export interface SupabaseScanRow {
  id: string;
  audio_name: string;
  result: string;
  confidence: number;
  timestamp: string;
}

export interface SupabaseUserRow {
  id: string;
  name: string;
  email: string;
}

export interface SupabaseAlertRow {
  id: string;
  scan_id: string;
  status: string;
}
