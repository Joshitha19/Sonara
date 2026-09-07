import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { WaveformVisualizer } from './WaveformVisualizer';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob, fileName: string) => void;
  isAnalyzing?: boolean;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  isAnalyzing = false,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);
    setRecordedBlob(null);
    setRecordingDuration(0);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error('Microphone error:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Could not access microphone. Please grant permission.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleUseRecording = () => {
    if (recordedBlob) {
      const fileName = `live_mic_capture_${new Date().toISOString().slice(11, 19).replace(/:/g, '-')}.wav`;
      onRecordingComplete(recordedBlob, fileName);
    }
  };

  const handleReset = () => {
    setRecordedBlob(null);
    setRecordingDuration(0);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-5 flex flex-col items-center gap-4 text-center">
      {errorMessage && (
        <div className="w-full flex items-center gap-2 p-3 bg-[#B5384F]/10 border border-[#B5384F]/40 rounded-lg text-xs text-rose-300 text-left">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#B5384F]" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Recording State or Ready State */}
      {!recordedBlob ? (
        <>
          <div className="relative">
            {isRecording && (
              <span className="absolute -inset-2 rounded-full bg-[#B5384F]/25 animate-ping" />
            )}
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isAnalyzing}
              className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-[#B5384F] hover:bg-[#8E2538] text-white shadow-lg shadow-[#B5384F]/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start microphone recording'}
            >
              {isRecording ? (
                <Square className="w-6 h-6 fill-white" />
              ) : (
                <Mic className="w-6 h-6 text-slate-200" />
              )}
            </button>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-200">
              {isRecording ? 'Listening... Speak naturally' : 'Record Live Voice via Microphone'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {isRecording
                ? `Recording duration: ${formatSeconds(recordingDuration)}`
                : 'Click mic to capture a live caller snippet (3-15 seconds recommended)'}
            </p>
          </div>

          {isRecording && (
            <div className="w-full max-w-xs">
              <WaveformVisualizer
                isPlaying={true}
                color="#B5384F"
                barsCount={24}
                height={32}
              />
            </div>
          )}
        </>
      ) : (
        /* Review Recorded Audio */
        <div className="w-full flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Audio captured ({formatSeconds(recordingDuration)})
          </div>

          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Discard & Re-record
            </button>

            <button
              type="button"
              onClick={handleUseRecording}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#2E9E5B] hover:bg-[#1F7542] rounded-lg shadow transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Analyze This Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
