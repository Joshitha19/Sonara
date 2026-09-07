import React, { useState } from 'react';
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Users,
  Search,
  ArrowUpRight,
  Database,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { ScanResult, GuardianContact } from '../../types';
import { AnalyticsChart } from './AnalyticsChart';
import { isSupabaseConfigured } from '../../lib/supabase';

interface DashboardScreenProps {
  scans: ScanResult[];
  contacts: GuardianContact[];
  onSelectScan: (scan: ScanResult) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  scans,
  contacts,
  onSelectScan,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState<'all' | 'Cloned' | 'Real'>('all');

  const totalScans = scans.length;
  const clonesCaught = scans.filter((s) => s.result === 'Cloned').length;
  const realVoices = scans.filter((s) => s.result === 'Real').length;
  const activeContacts = contacts.filter((c) => c.isProtected).length;

  const filteredScans = scans.filter((s) => {
    const matchesSearch = s.audioName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterResult === 'all' || s.result === filterResult;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Security Intelligence & Scans
            </h1>
            <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              <Database className="w-3 h-3 text-[#38BDF8]" />
              {isSupabaseConfigured ? 'Supabase Synced' : 'Local Demo Store'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time audit log and threat analytics captured across all inbound voice streams.
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Scans */}
        <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">
              Total Scans
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <Activity className="w-4 h-4 text-[#38BDF8]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {totalScans}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Acoustic sessions analyzed
            </span>
          </div>
        </div>

        {/* Clones Caught */}
        <div className="bg-[#111827] border border-[#B5384F]/40 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-[#B5384F]/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-rose-300">
              Clones Caught
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#B5384F]/20 flex items-center justify-center text-[#B5384F]">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B5384F] font-mono">
              {clonesCaught}
            </div>
            <span className="text-[11px] text-rose-400/80 mt-0.5 block">
              {totalScans > 0 ? ((clonesCaught / totalScans) * 100).toFixed(0) : 0}% scam detection rate
            </span>
          </div>
        </div>

        {/* Real Voices Confirmed */}
        <div className="bg-[#111827] border border-[#2E9E5B]/40 rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-[#2E9E5B]/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-emerald-300">
              Real Voices Confirmed
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#2E9E5B]/20 flex items-center justify-center text-[#2E9E5B]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2E9E5B] font-mono">
              {realVoices}
            </div>
            <span className="text-[11px] text-emerald-400/80 mt-0.5 block">
              Biometric veracity validated
            </span>
          </div>
        </div>

        {/* Active Protected Contacts */}
        <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">
              Protected Contacts
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <Users className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {activeContacts}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Enrolled family members
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <AnalyticsChart scans={scans} />

      {/* History Table Section */}
      <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Scan History (Supabase `scans` table)
            </h3>
            <p className="text-xs text-slate-400">
              Click any scan record to view its forensic breakdown & explainability chips.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audio file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-[#1F293D] rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#38BDF8] w-48 sm:w-56"
              />
            </div>

            <div className="inline-flex p-1 bg-slate-900 border border-[#1F293D] rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setFilterResult('all')}
                className={`px-2.5 py-1 rounded-lg ${
                  filterResult === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterResult('Cloned')}
                className={`px-2.5 py-1 rounded-lg ${
                  filterResult === 'Cloned' ? 'bg-[#B5384F] text-white' : 'text-slate-400'
                }`}
              >
                Cloned
              </button>
              <button
                type="button"
                onClick={() => setFilterResult('Real')}
                className={`px-2.5 py-1 rounded-lg ${
                  filterResult === 'Real' ? 'bg-[#2E9E5B] text-white' : 'text-slate-400'
                }`}
              >
                Real
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto border border-[#1F293D] rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-[#1F293D] text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Audio File Name</th>
                <th className="py-3 px-4">Forensic Verdict</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D]">
              {filteredScans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No scans matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredScans.map((scan) => {
                  const isCloned = scan.result === 'Cloned';
                  return (
                    <tr
                      key={scan.id}
                      onClick={() => onSelectScan(scan)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                        {new Date(scan.timestamp).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-white font-medium truncate max-w-[240px]">
                        {scan.audioName}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isCloned
                              ? 'bg-[#B5384F]/15 text-rose-300 border border-[#B5384F]/30'
                              : 'bg-[#2E9E5B]/15 text-emerald-300 border border-[#2E9E5B]/30'
                          }`}
                        >
                          {isCloned ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B5384F]" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2E9E5B]" />
                          )}
                          {scan.label}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono whitespace-nowrap font-bold">
                        <span
                          className={isCloned ? 'text-rose-400' : 'text-emerald-400'}
                        >
                          {(scan.confidence * 100).toFixed(1)}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <span className="text-[11px] text-slate-400 group-hover:text-white flex items-center justify-end gap-1">
                          <span>Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
