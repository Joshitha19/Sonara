import { createClient } from '@supabase/supabase-js';
import { SupabaseScanRow, SupabaseUserRow, SupabaseAlertRow, ScanResult, GuardianContact, GuardianAlertRecord } from '../types';
import { INITIAL_SCANS, INITIAL_CONTACTS, INITIAL_ALERTS } from './mockData';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')
);

// Database schema definition for Supabase
export interface Database {
  public: {
    Tables: {
      scans: {
        Row: SupabaseScanRow;
        Insert: Omit<SupabaseScanRow, 'id'> & { id?: string };
        Update: Partial<SupabaseScanRow>;
      };
      users: {
        Row: SupabaseUserRow;
        Insert: Omit<SupabaseUserRow, 'id'> & { id?: string };
        Update: Partial<SupabaseUserRow>;
      };
      alerts: {
        Row: SupabaseAlertRow;
        Insert: Omit<SupabaseAlertRow, 'id'> & { id?: string };
        Update: Partial<SupabaseAlertRow>;
      };
    };
  };
}

// Initialize Supabase Client (if keys provided, otherwise safe dummy)
export const supabase: any = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage backup keys for seamless hackathon demo resilience
const STORAGE_KEYS = {
  SCANS: 'sonara_scans_v1',
  CONTACTS: 'sonara_contacts_v1',
  ALERTS: 'sonara_alerts_v1',
};

// --- DATA ACCESS LAYER: SCANS ---

export async function fetchAllScans(): Promise<ScanResult[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('scans')
        .select('*')
        .order('timestamp', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row: SupabaseScanRow) => ({
          id: row.id,
          audioName: row.audio_name,
          result: row.result === 'Cloned' ? 'Cloned' : 'Real',
          confidence: Number(row.confidence),
          label: row.result === 'Cloned' ? 'CLONED VOICE ⚠️' : 'REAL VOICE ✅',
          timestamp: row.timestamp,
          reasons: row.result === 'Cloned'
            ? ['Unnatural pitch consistency detected', 'Spectral synthesis artifacts typical of neural vocoder', 'Missing natural breathing pattern']
            : ['Natural vocal jitter and micro-tremors verified', 'Organic breathing rhythm observed'],
          source: 'api',
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch scans error, falling back to local store:', err);
    }
  }

  // Local fallback
  const stored = localStorage.getItem(STORAGE_KEYS.SCANS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse cached scans', e);
    }
  }

  // Initialize with rich mock data
  localStorage.setItem(STORAGE_KEYS.SCANS, JSON.stringify(INITIAL_SCANS));
  return INITIAL_SCANS;
}

export async function saveScan(scan: ScanResult): Promise<void> {
  // 1. Try Supabase
  if (supabase) {
    try {
      await supabase.from('scans').insert([
        {
          id: scan.id,
          audio_name: scan.audioName,
          result: scan.result,
          confidence: scan.confidence,
          timestamp: scan.timestamp,
        },
      ]);
    } catch (err) {
      console.warn('Could not insert scan to Supabase:', err);
    }
  }

  // 2. Always maintain local cache for instant UI updates & demo stability
  try {
    const existing = await fetchAllScans();
    const updated = [scan, ...existing.filter((s) => s.id !== scan.id)];
    localStorage.setItem(STORAGE_KEYS.SCANS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save scan to local storage', err);
  }
}

// --- DATA ACCESS LAYER: ALERTS & GUARDIAN ---

export async function logAlert(alert: GuardianAlertRecord): Promise<void> {
  if (supabase) {
    try {
      await supabase.from('alerts').insert([
        {
          id: alert.id,
          scan_id: alert.scan_id,
          status: alert.status,
        },
      ]);
    } catch (err) {
      console.warn('Could not insert alert to Supabase:', err);
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ALERTS);
    const alerts: GuardianAlertRecord[] = stored ? JSON.parse(stored) : INITIAL_ALERTS;
    const updated = [alert, ...alerts];
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to store alert locally', err);
  }
}

export async function fetchAlerts(): Promise<GuardianAlertRecord[]> {
  const stored = localStorage.getItem(STORAGE_KEYS.ALERTS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_ALERTS));
  return INITIAL_ALERTS;
}

// --- GUARDIAN CONTACTS ---

export function getStoredContacts(): GuardianContact[] {
  const stored = localStorage.getItem(STORAGE_KEYS.CONTACTS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
  return INITIAL_CONTACTS;
}

export function saveContacts(contacts: GuardianContact[]): void {
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
}
