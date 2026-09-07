import React, { useState, useRef } from 'react';
import { UploadCloud, FileAudio, CheckCircle2, Mic, X } from 'lucide-react';
import { AudioRecorder } from '../common/AudioRecorder';

interface DropZoneProps {
  selectedFile: File | Blob | null;
  fileName: string;
  onFileSelected: (file: File | Blob, name: string) => void;
  onClearFile: () => void;
  isAnalyzing: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  selectedFile,
  fileName,
  onFileSelected,
  onClearFile,
  isAnalyzing,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [inputMode, setInputMode] = useState<'upload' | 'record'>('upload');
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const ACCEPTED_EXTENSIONS = ['.wav', '.mp3', '.flac'];
  const ACCEPTED_MIME = ['audio/wav', 'audio/x-wav', 'audio/mpeg', 'audio/mp3', 'audio/flac', 'audio/x-flac'];

  const validateAndSelectFile = (file: File) => {
    setValidationError(null);
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const isValidExtension = ACCEPTED_EXTENSIONS.includes(extension);
    const isValidMime = ACCEPTED_MIME.some((mime) => file.type.includes(mime.split('/')[1]));

    if (!isValidExtension && !isValidMime) {
      setValidationError(`Unsupported audio format (${extension}). Please upload a .wav, .mp3, or .flac file.`);
      return;
    }

    // Limit to 25MB
    if (file.size > 25 * 1024 * 1024) {
      setValidationError('Audio file is too large. Maximum file size is 25 MB.');
      return;
    }

    onFileSelected(file, file.name);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAnalyzing) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isAnalyzing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Mode Selector (File Upload vs Live Mic) */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 bg-[#111827] border border-[#1F293D] rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
              inputMode === 'upload'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-[#38BDF8]" />
            Upload Audio File (.wav, .mp3, .flac)
          </button>
          <button
            type="button"
            onClick={() => setInputMode('record')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
              inputMode === 'record'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-4 h-4 text-[#B5384F]" />
            Record Live Voice
          </button>
        </div>
      </div>

      {validationError && (
        <div className="p-3 bg-[#B5384F]/10 border border-[#B5384F]/40 rounded-xl text-xs text-rose-300 flex items-center justify-between">
          <span>{validationError}</span>
          <button
            type="button"
            onClick={() => setValidationError(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload View or Recorder View */}
      {inputMode === 'record' ? (
        <AudioRecorder
          isAnalyzing={isAnalyzing}
          onRecordingComplete={(blob, name) => {
            onFileSelected(blob, name);
          }}
        />
      ) : (
        <div>
          {/* Hidden native input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".wav,.mp3,.flac,audio/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isAnalyzing}
          />

          {!selectedFile ? (
            /* Empty Drop Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group ${
                isDragging
                  ? 'border-[#38BDF8] bg-[#38BDF8]/5 shadow-lg shadow-[#38BDF8]/10'
                  : 'border-[#1F293D] hover:border-slate-600 bg-[#111827]/60 hover:bg-[#111827]'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#1F293D] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-8 h-8 text-[#38BDF8]" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                Drop suspicious audio file here or{' '}
                <span className="text-[#38BDF8] underline underline-offset-4">browse</span>
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Supports .wav, .mp3, .flac up to 25MB. High sampling rate recommended for spectral forensic precision.
              </p>
            </div>
          ) : (
            /* Selected File State */
            <div className="bg-[#111827] border border-[#1F293D] rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#1F293D] flex items-center justify-center shrink-0">
                  <FileAudio className="w-6 h-6 text-[#38BDF8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white font-mono truncate max-w-[260px] sm:max-w-md">
                      {fileName}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#2E9E5B] shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>Ready for acoustic analysis</span>
                    {selectedFile instanceof File && (
                      <>
                        <span>•</span>
                        <span className="font-mono">{formatFileSize(selectedFile.size)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  disabled={isAnalyzing}
                  className="text-xs px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearFile();
                  }}
                  disabled={isAnalyzing}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                  aria-label="Remove selected audio"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
