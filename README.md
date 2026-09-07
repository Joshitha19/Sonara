# Sonara — AI Voice-Clone Detection Platform
> *"Hear What's Real."*  
> **Smart India Hackathon (SIH 2026)** • Cyber Defense & Anti-Fraud Track

---

## 🎯 Overview

**Sonara** is an AI voice-clone detection platform designed to detect fraudulent, deepfake, and cloned voices in scam calls, extortion attempts, and executive impersonation attacks.

Using deep acoustic fingerprinting, Sonara extracts speech biomarkers (such as vocal cord jitter, pitch invariance, respiratory pauses, and high-frequency vocoder phase artifacts) to differentiate organic human voices from synthetic neural speech (ElevenLabs, Bark, XTTS, HiFi-GAN) in real time.

---

## 🚀 Key Features & Screens

### 1. Home / Scan Screen
- **Audio Drag-and-Drop**: Ingest `.wav`, `.mp3`, and `.flac` files up to 25MB.
- **Live Microphone Capture**: Browser Web Audio API fallback for recording live caller snippets on the fly.
- **Live Clone Stage Demo Mode**: Side-by-side comparison deck (Authentic vs. Cloned sample) for dramatic stage presentations to judges.
- **Waveform Pulse**: Real-time radar sonar animation with forensic phase progress indicators during ML inference.

### 2. Result & Forensic Explainability
- **High-Contrast Verdict Card**: Unmistakable `REAL VOICE ✅` (Safe Green `#2E9E5B`) or `CLONED VOICE ⚠️` (Deep Red `#B5384F`).
- **Circular Progress Ring**: High-precision SVG confidence ring displaying model certainty percentage.
- **Explainability Chips**: Plain-English forensic reasons (e.g., *"Unnatural pitch consistency detected"*, *"Missing natural breathing pattern"*, *"Spectral synthesis artifacts"*).
- **Acoustic Biomarker Breakdown**: Metrics for Pitch Invariance, Breathing Cadence, Spectral Artifacts, and Jitter/Shimmer ratio.
- **Scam Report Action**: One-click transition into emergency alert dispatch.

### 3. Guardian Mode
- **Vulnerable Contact Enrollment**: Save family contacts (Name, Relationship, Phone Number).
- **Auto-Protect Toggles**: Activate automated notification broadcasts per number.
- **Live Lockscreen Simulator**: Preview how emergency SMS / Push warnings appear to family members when a scam call is intercepted.
- **Audit Logs**: Track dispatched warnings with delivery timestamps and threat levels.

### 4. Security Intel Dashboard
- **Executive Metrics**: Total Scans, Clones Caught, Real Voices Confirmed, Active Protected Contacts.
- **Threat Activity Chart**: 7-day timeline comparing legitimate callers vs. AI clone attacks.
- **Audit History Table**: Direct sync with Supabase `scans` table with instant keyword filter and verdict search.

### 5. About / How It Works & Roadmap
- **4-Stage Pipeline**: Audio Input $\rightarrow$ Acoustic Fingerprinting $\rightarrow$ Deep Neural Classifier $\rightarrow$ Verdict & Defense.
- **SIH 2026 Strategic Roadmap**:
  - Carrier Telecom Call Integration (SS7 / SIP / VoLTE live interceptor)
  - Multilingual Cloned Voice Analysis (Hindi, Telugu, Tamil, Bengali)
  - Known-Voice Biometric Vault (family acoustic whitelisting)
  - Community Scam Threat Map

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons
- **Design Language**: Fintech / Cybersecurity aesthetic with Deep Red (`#B5384F`), Safe Green (`#2E9E5B`), and Dark Slate Neutral palette
- **Backend API**: FastAPI service contract (`POST /predict`)
- **Database**: Supabase (`scans`, `users`, `alerts` tables) + Resilient local fallback

---

## ⚡ Quick Start (Local Setup)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your API URL and optional Supabase keys:
```env
# Point to your local FastAPI backend or deployed Render/Fly URL:
VITE_API_BASE_URL=http://127.0.0.1:8000

# Supabase (Optional — platform falls back to offline cache automatically if omitted):
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 FastAPI Backend Contract (`POST /predict`)

The frontend interacts with your FastAPI service via multipart audio upload:

### Request
- **Endpoint**: `POST /predict`
- **Content-Type**: `multipart/form-data`
- **Body**: `file` (Binary audio stream `.wav`, `.mp3`, or `.flac`)

### Response Format (JSON)
```json
{
  "result": "Cloned",
  "confidence": 0.984,
  "label": "CLONED VOICE ⚠️"
}
```
*Or for an authentic caller:*
```json
{
  "result": "Real",
  "confidence": 0.991,
  "label": "REAL VOICE ✅"
}
```

> **Note on Stage Resilience**: If your FastAPI backend is offline during a judge presentation, Sonara gracefully transitions to its built-in acoustic simulator with realistic confidence metrics and forensic explainability chips.

---

## 🗄️ Supabase Database Schema

To set up your Supabase database, run the following SQL queries in the **Supabase SQL Editor**:

```sql
-- 1. Scans Table
CREATE TABLE public.scans (
    id TEXT PRIMARY KEY,
    audio_name TEXT NOT NULL,
    result TEXT NOT NULL,
    confidence NUMERIC NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users Table
CREATE TABLE public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- 3. Alerts Table
CREATE TABLE public.alerts (
    id TEXT PRIMARY KEY,
    scan_id TEXT REFERENCES public.scans(id) ON DELETE CASCADE,
    status TEXT NOT NULL
);

-- Enable Row Level Security (RLS) & Allow public read/insert for hackathon demo
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on scans" ON public.scans FOR SELECT USING (true);
CREATE POLICY "Allow public insert on scans" ON public.scans FOR INSERT WITH CHECK (true);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on alerts" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "Allow public insert on alerts" ON public.alerts FOR INSERT WITH CHECK (true);
```

---

## 👥 Hackathon Context

Built for **Smart India Hackathon 2026** to combat the rising wave of AI-driven voice scams impersonating relatives and government authorities.
