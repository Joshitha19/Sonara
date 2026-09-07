import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { WaveformVisualizer } from './WaveformVisualizer';

interface AudioPlayerProps {
  src?: string;
  blob?: Blob;
  fileName?: string;
  themeColor?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  blob,
  fileName,
  themeColor = '#38BDF8',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');

  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (src) {
      setAudioUrl(src);
    }
  }, [src, blob]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Playback failed (browser autoplay restriction):', err);
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (timeInSec: number) => {
    if (!timeInSec || isNaN(timeInSec)) return '0:00';
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-[#111827] border border-[#1F293D] rounded-xl p-3.5 sm:p-4 flex flex-col gap-3">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      {fileName && (
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 truncate max-w-[280px]">
            <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-mono truncate">{fileName}</span>
          </div>
          <span className="font-mono text-slate-400">
            {formatTime(currentTime)} / {formatTime(duration || 10)}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md"
          style={{ backgroundColor: themeColor }}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-slate-900 fill-slate-900" />
          ) : (
            <Play className="w-4 h-4 text-slate-900 fill-slate-900 ml-0.5" />
          )}
        </button>

        <div className="flex-1 overflow-hidden">
          <WaveformVisualizer
            isPlaying={isPlaying}
            color={themeColor}
            barsCount={32}
            height={36}
          />
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
          title="Restart audio"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
