import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScanScreen } from './components/scan/ScanScreen';
import { ResultCard } from './components/result/ResultCard';
import { GuardianScreen } from './components/guardian/GuardianScreen';
import { DashboardScreen } from './components/dashboard/DashboardScreen';
import { AboutScreen } from './components/about/AboutScreen';
import { ScanResult, GuardianContact, GuardianAlertRecord, VoiceVerdict } from './types';
import {
  fetchAllScans,
  saveScan,
  getStoredContacts,
  saveContacts,
  fetchAlerts,
  logAlert,
} from './lib/supabase';
import { scanVoiceAudio, checkApiHealth } from './lib/api';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('scan');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);

  const [scans, setScans] = useState<ScanResult[]>([]);
  const [contacts, setContacts] = useState<GuardianContact[]>([]);
  const [alerts, setAlerts] = useState<GuardianAlertRecord[]>([]);
  const [apiOnline, setApiOnline] = useState<boolean>(false);

  // Initialize data on mount
  useEffect(() => {
    async function loadData() {
      const loadedScans = await fetchAllScans();
      setScans(loadedScans);

      const loadedContacts = getStoredContacts();
      setContacts(loadedContacts);

      const loadedAlerts = await fetchAlerts();
      setAlerts(loadedAlerts);

      const isOnline = await checkApiHealth();
      setApiOnline(isOnline);
    }
    loadData();
  }, []);

  // Handler for analyzing an audio sample
  const handleStartAnalysis = async (
    file: File | Blob,
    fileName: string,
    options?: { forceSimulate?: boolean; presetVerdict?: VoiceVerdict }
  ) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const { result, isFallback, errorMsg } = await scanVoiceAudio(file, fileName, options);

      if (errorMsg) {
        setErrorMessage(errorMsg);
      }

      // Persist scan result to Supabase + local cache
      await saveScan(result);

      // Update state
      setScans((prev) => [result, ...prev.filter((s) => s.id !== result.id)]);
      setCurrentResult(result);
    } catch (err: unknown) {
      console.error('Scan execution error:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to complete voice scan. Please check FastAPI backend connection.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handler for Guardian Mode alerts triggered from Result Screen or Simulator
  const handleTriggerGuardianAlerts = async (
    selectedContactIds: string[],
    customNote: string
  ) => {
    if (!currentResult && selectedContactIds.length === 0) return;

    const targetedContacts = contacts.filter((c) => selectedContactIds.includes(c.id));
    const newAlerts: GuardianAlertRecord[] = [];

    for (const contact of targetedContacts) {
      const alertItem: GuardianAlertRecord = {
        id: `alt-${Date.now().toString(36)}-${contact.id}`,
        scan_id: currentResult?.id || 'manual-trigger',
        contact_id: contact.id,
        contact_name: contact.name,
        contact_phone: contact.phone,
        status: 'delivered',
        timestamp: new Date().toISOString(),
        threatLevel: 'CRITICAL',
        message: customNote
          ? `⚠️ Sonara Alert: High-confidence cloned voice call detected. Context: "${customNote}"`
          : `⚠️ Sonara Alert: High-confidence (${(
              (currentResult?.confidence || 0.98) * 100
            ).toFixed(1)}%) AI voice clone scam call detected.`,
      };

      await logAlert(alertItem);
      newAlerts.push(alertItem);
    }

    setAlerts((prev) => [...newAlerts, ...prev]);
  };

  // Handler for test simulation alert from Guardian Screen
  const handleSimulateTestAlert = async (targetName: string) => {
    const protectedContacts = contacts.filter((c) => c.isProtected);
    const targetContact = protectedContacts[0] || contacts[0];

    const testAlert: GuardianAlertRecord = {
      id: `alt-test-${Date.now().toString(36)}`,
      scan_id: 'test-sim',
      contact_name: targetContact ? targetContact.name : 'Eleanor Vance',
      contact_phone: targetContact ? targetContact.phone : '+1 (555) 234-8901',
      status: 'delivered',
      timestamp: new Date().toISOString(),
      threatLevel: 'HIGH',
      message: `⚠️ Sonara Test Broadcast: Suspected AI voice-clone scam call incoming for ${targetName}.`,
    };

    await logAlert(testAlert);
    setAlerts((prev) => [testAlert, ...prev]);
  };

  // Contact operations
  const handleAddContact = (contactData: Omit<GuardianContact, 'id' | 'createdAt'>) => {
    const newContact: GuardianContact = {
      ...contactData,
      id: `c-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...contacts, newContact];
    setContacts(updated);
    saveContacts(updated);
  };

  const handleDeleteContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    saveContacts(updated);
  };

  const handleToggleProtection = (id: string) => {
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, isProtected: !c.isProtected } : c
    );
    setContacts(updated);
    saveContacts(updated);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          // If navigating away from scan, retain currentResult or clear as needed
        }}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => setIsDemoMode((prev) => !prev)}
        apiOnline={apiOnline}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'scan' && (
          <>
            {currentResult ? (
              <ResultCard
                scan={currentResult}
                contacts={contacts}
                onTriggerGuardianAlerts={handleTriggerGuardianAlerts}
                onScanAnother={() => setCurrentResult(null)}
              />
            ) : (
              <ScanScreen
                onScanComplete={(result) => setCurrentResult(result)}
                isDemoMode={isDemoMode}
                onToggleDemoMode={() => setIsDemoMode((prev) => !prev)}
                isAnalyzing={isAnalyzing}
                onStartAnalysis={handleStartAnalysis}
                errorMessage={errorMessage}
                onClearError={() => setErrorMessage(null)}
                onOpenHowItWorks={() => setActiveTab('about')}
              />
            )}
          </>
        )}

        {activeTab === 'guardian' && (
          <GuardianScreen
            contacts={contacts}
            alerts={alerts}
            onAddContact={handleAddContact}
            onDeleteContact={handleDeleteContact}
            onToggleProtection={handleToggleProtection}
            onSimulateTestAlert={handleSimulateTestAlert}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardScreen
            scans={scans}
            contacts={contacts}
            onSelectScan={(scan) => {
              setCurrentResult(scan);
              setActiveTab('scan');
            }}
          />
        )}

        {activeTab === 'about' && <AboutScreen />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
