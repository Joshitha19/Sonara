import React, { useState } from 'react';
import {
  Shield,
  UserPlus,
  Phone,
  Trash2,
  CheckCircle2,
  Bell,
  Smartphone,
  Send,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';
import { GuardianContact, GuardianAlertRecord } from '../../types';

interface GuardianScreenProps {
  contacts: GuardianContact[];
  alerts: GuardianAlertRecord[];
  onAddContact: (contact: Omit<GuardianContact, 'id' | 'createdAt'>) => void;
  onDeleteContact: (id: string) => void;
  onToggleProtection: (id: string) => void;
  onSimulateTestAlert: (targetName: string) => void;
}

export const GuardianScreen: React.FC<GuardianScreenProps> = ({
  contacts,
  alerts,
  onAddContact,
  onDeleteContact,
  onToggleProtection,
  onSimulateTestAlert,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Mom');
  const [phone, setPhone] = useState('');
  const [isProtected, setIsProtected] = useState(true);

  const [simulatedRecipientName, setSimulatedRecipientName] = useState(
    contacts[0]?.name || 'Grandma Rose'
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onAddContact({
      name: name.trim(),
      relationship: relationship.trim(),
      phone: phone.trim(),
      isProtected,
    });

    setName('');
    setPhone('');
    setShowAddModal(false);
  };

  const protectedContacts = contacts.filter((c) => c.isProtected);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="bg-[#111827] border border-[#1F293D] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B5384F]/15 border border-[#B5384F]/40 text-[#B5384F] text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Family & Vulnerable Contact Defense</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Guardian Mode Protection
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Protect your loved ones from catastrophic AI voice-clone imposter scams. When Sonara detects an impersonation call, emergency broadcast alerts are immediately pushed to your enrolled family circle.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#B5384F] hover:bg-[#8E2538] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#B5384F]/30 transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Enroll New Contact</span>
          </button>

          <button
            type="button"
            onClick={() => onSimulateTestAlert(simulatedRecipientName)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Send Test Guardian Alert</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Contacts & Mock Alert Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Enrolled Contacts List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Enrolled Contacts ({contacts.length})
              </h2>
              <p className="text-xs text-slate-400">
                {protectedContacts.length} numbers currently auto-guarded
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="text-xs font-semibold text-[#38BDF8] hover:underline flex items-center gap-1"
            >
              + Add
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {contacts.length === 0 ? (
              <div className="p-8 bg-[#111827] border border-dashed border-[#1F293D] rounded-2xl text-center text-xs text-slate-400">
                No contacts enrolled. Click &quot;Enroll New Contact&quot; to add family members.
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-[#111827] border border-[#1F293D] hover:border-slate-700 rounded-2xl p-4 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm font-mono ${
                        contact.isProtected
                          ? 'bg-[#2E9E5B]/20 text-[#2E9E5B] border border-[#2E9E5B]/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {contact.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {contact.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {contact.relationship}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                        <Phone className="w-3 h-3" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Protection Toggle Switch */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        {contact.isProtected ? 'Protected' : 'Off'}
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleProtection(contact.id)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                          contact.isProtected ? 'bg-[#2E9E5B]' : 'bg-slate-700'
                        }`}
                        aria-label={`Toggle protection for ${contact.name}`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            contact.isProtected ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteContact(contact.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Mock Notification Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#38BDF8]" />
              <span>Live Alert Preview Simulator</span>
            </h2>
            <p className="text-xs text-slate-400">
              Visualizes the instant SMS / push broadcast delivered to family
            </p>
          </div>

          {/* Interactive Recipient Picker */}
          <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Target Call Recipient:</span>
              <select
                value={simulatedRecipientName}
                onChange={(e) => setSimulatedRecipientName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.relationship})
                  </option>
                ))}
                <option value="Grandma Rose">Grandma Rose (Elderly Relative)</option>
              </select>
            </div>

            {/* Simulated Mobile Lock Screen Push Card */}
            <div className="bg-[#0B0F17] border border-[#B5384F]/60 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 font-semibold text-rose-300">
                  <span className="w-2 h-2 rounded-full bg-[#B5384F] animate-ping" />
                  <span>SONARA EMERGENCY ALERT</span>
                </div>
                <span className="font-mono">NOW</span>
              </div>

              <div className="text-xs font-semibold text-white leading-snug">
                ⚠️ Sonara detected a possible cloned-voice call to{' '}
                <span className="text-rose-400 underline">{simulatedRecipientName}</span>.
              </div>

              <div className="mt-2.5 p-2 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex flex-col gap-1">
                <span className="text-slate-400">Contacts alerted:</span>
                <span className="font-mono text-emerald-400 font-medium">
                  {protectedContacts.length > 0
                    ? protectedContacts.map((c) => `${c.name} (${c.phone})`).join(', ')
                    : 'No active protected contacts'}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                <span>Threat: High Confidence AI Clone</span>
                <span className="text-[#38BDF8] font-mono">Carrier: VoLTE SS7</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSimulateTestAlert(simulatedRecipientName)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Simulate Broadcast Dispatch</span>
            </button>
          </div>

          {/* Recent Alert Logs */}
          <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Recent Dispatched Alerts Log
            </h3>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {alerts.length === 0 ? (
                <div className="text-xs text-slate-500 py-3 text-center">
                  No alerts dispatched yet.
                </div>
              ) : (
                alerts.map((al) => (
                  <div
                    key={al.id}
                    className="p-2.5 rounded-xl bg-slate-900 border border-[#1F293D] text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {al.contact_name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {al.contact_phone}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5 truncate max-w-[200px]">
                        {al.message}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                      {al.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111827] border border-[#1F293D] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">
              Enroll Trusted Contact
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Add someone who will receive automated emergency notices when cloned calls are detected.
            </p>

            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Relationship:
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-slate-900 border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value="Mom">Mom</option>
                  <option value="Dad">Dad</option>
                  <option value="Grandparent">Grandparent</option>
                  <option value="Spouse">Spouse / Partner</option>
                  <option value="Child">Son / Daughter</option>
                  <option value="Sibling">Brother / Sister</option>
                  <option value="Manager / Colleague">Manager / Colleague</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Phone Number (with country code):
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000 or +91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="protectCheckbox"
                  checked={isProtected}
                  onChange={(e) => setIsProtected(e.target.checked)}
                  className="rounded border-slate-700 text-[#2E9E5B] focus:ring-0"
                />
                <label htmlFor="protectCheckbox" className="text-xs text-slate-300 cursor-pointer">
                  Protect this number immediately (active alert recipient)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1F293D] mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B5384F] hover:bg-[#8E2538] text-white rounded-xl text-xs font-semibold shadow transition-colors"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
