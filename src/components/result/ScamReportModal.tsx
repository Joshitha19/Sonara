import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Send, PhoneCall } from 'lucide-react';
import { ScanResult, GuardianContact } from '../../types';

interface ScamReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  scan: ScanResult;
  contacts: GuardianContact[];
  onTriggerAlerts: (selectedContactIds: string[], customNote: string) => void;
}

export const ScamReportModal: React.FC<ScamReportModalProps> = ({
  isOpen,
  onClose,
  scan,
  contacts,
  onTriggerAlerts,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    contacts.filter((c) => c.isProtected).map((c) => c.id)
  );
  const [customNote, setCustomNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTriggerAlerts(selectedIds, customNote);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#111827] border border-[#B5384F]/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-[#1F293D] flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#B5384F]/20 flex items-center justify-center text-[#B5384F]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Dispatch Guardian Mode Scam Alert
              </h3>
              <p className="text-xs text-slate-400">
                Immediately notify enrolled family contacts about this threat.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#2E9E5B]/20 text-[#2E9E5B] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white">Alerts Dispatched!</h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Emergency notifications sent to {selectedIds.length} protected contact(s) via automated SMS & telecom carrier notification.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            {/* Audio detail badge */}
            <div className="p-3 bg-slate-900 border border-[#1F293D] rounded-xl text-xs flex items-center justify-between">
              <span className="text-slate-400 truncate max-w-[240px]">
                {scan.audioName}
              </span>
              <span className="font-mono font-bold text-rose-400">
                {(scan.confidence * 100).toFixed(1)}% Cloned
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Select Contacts to Notify ({selectedIds.length} selected):
              </label>
              {contacts.length === 0 ? (
                <div className="p-4 bg-slate-900/50 border border-dashed border-[#1F293D] rounded-xl text-xs text-slate-400 text-center">
                  No enrolled contacts yet. Go to Guardian Mode tab to add trusted contacts.
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {contacts.map((contact) => {
                    const isChecked = selectedIds.includes(contact.id);
                    return (
                      <div
                        key={contact.id}
                        onClick={() => toggleSelect(contact.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#B5384F]/10 border-[#B5384F]/40 text-white'
                            : 'bg-slate-900/60 border-[#1F293D] text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded border-slate-700 text-[#B5384F] focus:ring-0"
                          />
                          <div>
                            <span className="text-xs font-semibold text-white block">
                              {contact.name} ({contact.relationship})
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              {contact.phone}
                            </span>
                          </div>
                        </div>
                        {contact.isProtected && (
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                            Auto-Protect
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Custom Notes */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Optional Incident Context / Caller ID:
              </label>
              <input
                type="text"
                placeholder="e.g. Scammer claimed to be from State Police regarding bail"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full bg-slate-900 border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#B5384F]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#1F293D]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={selectedIds.length === 0}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#B5384F] hover:bg-[#8E2538] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#B5384F]/25 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch Alert Now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
