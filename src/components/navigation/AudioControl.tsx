import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Heart, Music, ExternalLink, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import sound, { MashupTrack } from '../../services/audio';

interface AudioControlProps {
  customAudioUrl?: string;
  youtubeUrl?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({
  customAudioUrl = '/audio/saiyaara-mashup.webm',
  youtubeUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<MashupTrack>(sound.getCurrentTrack());
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentTrack(sound.getCurrentTrack());
  }, []);

  // Close dropdown when tapping outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  const toggleAudio = () => {
    sound.playPop();
    if (isPlaying) {
      sound.stopMusic();
      setIsPlaying(false);
    } else {
      sound.startMusic(customAudioUrl);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playPop();
    const next = sound.nextTrack(customAudioUrl);
    setCurrentTrack(next);
  };

  const handlePrevTrack = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playPop();
    const prev = sound.prevTrack(customAudioUrl);
    setCurrentTrack(prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playPop();
    const newMuted = sound.toggleMute();
    setIsPlaying(!newMuted);
  };

  return (
    <div
      ref={dropdownRef}
      className="fixed top-2.5 right-2.5 sm:top-4 sm:right-4 z-50 flex flex-col items-end"
    >
      {/* Main Music Player Pill */}
      <div
        className={`relative flex items-center pl-2 sm:pl-3 pr-2.5 sm:pr-3.5 py-1.5 sm:py-2 rounded-full border-2 transition-all duration-300 backdrop-blur-md shadow-md max-w-[calc(100vw-20px)] sm:max-w-none ${
          isPlaying
            ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white border-pink-300 shadow-[0_4px_18px_rgba(244,114,182,0.45)] ring-2 ring-pink-300/30'
            : 'bg-white/95 text-universe-text border-pink-200/90 hover:border-pink-300 shadow-[0_4px_16px_rgba(255,182,193,0.35)] hover:shadow-[0_6px_22px_rgba(255,182,193,0.45)]'
        }`}
      >
        {/* Spinning Cute Vinyl Record */}
        <button
          onClick={toggleAudio}
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#2A0818] via-[#541432] to-[#2A0818] flex items-center justify-center flex-shrink-0 shadow-md group cursor-pointer border border-pink-300/40"
          title={isPlaying ? 'Pause music' : 'Play music 💖'}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Vinyl Grooves ring */}
          <div
            className={`w-full h-full rounded-full border border-pink-300/30 flex items-center justify-center ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3.6s' }}
          >
            {/* Center Heart Label */}
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center border border-white/90 shadow-xs">
              <Heart className="w-2 h-2 text-white fill-white" />
            </div>
          </div>

          {/* Floating play/pause overlay */}
          <div className="absolute inset-0 bg-black/25 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white fill-white" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            )}
          </div>
        </button>

        {/* Track Title & Mashup Info */}
        <div
          onClick={toggleAudio}
          className="mx-2 sm:mx-2.5 text-left cursor-pointer select-none max-w-[135px] xs:max-w-[160px] sm:max-w-[200px] overflow-hidden flex flex-col justify-center"
        >
          <span
            className={`text-[11px] sm:text-xs font-bold tracking-tight truncate block leading-tight ${
              isPlaying ? 'text-white drop-shadow-xs' : 'text-pink-950 font-sans'
            }`}
          >
            {currentTrack.title}
          </span>

          {/* Equalizer Soundbars / Subtitle */}
          <div className="flex items-center space-x-1 mt-0.5 leading-none">
            {isPlaying ? (
              <div className="flex items-end space-x-0.5 h-2.5">
                <span className="w-0.5 bg-white/95 rounded-full animate-bounce h-2" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
                <span className="w-0.5 bg-white/95 rounded-full animate-bounce h-3" style={{ animationDelay: '0.3s', animationDuration: '0.7s' }} />
                <span className="w-0.5 bg-white/95 rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.2s', animationDuration: '0.5s' }} />
              </div>
            ) : (
              <Sparkles className="w-2.5 h-2.5 text-pink-400 flex-shrink-0 animate-pulse" />
            )}
            <span
              className={`text-[9.5px] sm:text-[10px] font-semibold truncate block ${
                isPlaying ? 'text-pink-100 font-medium' : 'text-pink-500'
              }`}
            >
              {isPlaying ? currentTrack.movie : 'Tap to Play 🎵'}
            </span>
          </div>
        </div>

        {/* Desktop Controls: Inline Prev / Next / Volume / YouTube */}
        <div className="hidden sm:flex items-center space-x-1 border-l pl-2 border-current/20">
          <button
            onClick={handlePrevTrack}
            className={`p-1 rounded-full transition-transform active:scale-90 cursor-pointer ${
              isPlaying ? 'hover:bg-white/20 text-white' : 'hover:bg-pink-100 text-pink-700'
            }`}
            title="Previous track"
            aria-label="Previous track"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleNextTrack}
            className={`p-1 rounded-full transition-transform active:scale-90 cursor-pointer ${
              isPlaying ? 'hover:bg-white/20 text-white' : 'hover:bg-pink-100 text-pink-700'
            }`}
            title="Next track"
            aria-label="Next track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setShowSettings(!showSettings);
            }}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              showSettings
                ? 'bg-white text-pink-600 shadow-sm'
                : isPlaying
                ? 'hover:bg-white/20 text-white'
                : 'hover:bg-pink-100 text-pink-600'
            }`}
            title="Volume & Sound Settings"
            aria-label="Volume settings"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`p-1.5 rounded-full transition-all ${
                isPlaying ? 'hover:bg-white/20 text-white' : 'hover:bg-pink-100 text-pink-600'
              }`}
              title="Watch on YouTube 💖"
              aria-label="Open YouTube song"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Delicate Soft Divider for Mobile */}
        <div className="flex sm:hidden h-4 w-px bg-pink-200/90 dark:bg-white/30 mx-1 flex-shrink-0" />

        {/* Mobile Settings Button */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => {
              sound.playPop();
              setShowSettings(!showSettings);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
              showSettings
                ? 'bg-white text-pink-600 shadow-xs'
                : isPlaying
                ? 'hover:bg-white/20 text-white'
                : 'hover:bg-pink-100/90 text-pink-600'
            }`}
            aria-label="Music settings"
            title="Music settings"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Settings Drawer (Opens cleanly below pill, always inside mobile viewport) */}
      {showSettings && (
        <div className="mt-2 w-[250px] sm:w-[270px] bg-white/95 backdrop-blur-xl rounded-3xl p-3.5 shadow-2xl border-2 border-pink-200/90 text-universe-text animate-fadeIn text-left z-50">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-pink-100">
            <span className="text-[11px] font-bold text-pink-600 tracking-wider uppercase flex items-center space-x-1.5">
              <Music className="w-3.5 h-3.5 text-pink-500" />
              <span>Music Player 💖</span>
            </span>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1 rounded-full hover:bg-pink-100 text-pink-400 hover:text-pink-600 transition-colors cursor-pointer"
              aria-label="Close settings"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Track Switcher */}
          <div className="py-2.5 flex items-center justify-between">
            <button
              onClick={() => handlePrevTrack()}
              className="p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 active:scale-90 transition-all cursor-pointer"
              aria-label="Previous track"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <div className="text-center px-2 flex-1">
              <p className="text-xs font-bold text-universe-text truncate">
                {currentTrack.title}
              </p>
              <p className="text-[10px] text-pink-600/80 truncate">
                {currentTrack.subtitle || currentTrack.movie}
              </p>
            </div>
            <button
              onClick={() => handleNextTrack()}
              className="p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 active:scale-90 transition-all cursor-pointer"
              aria-label="Next track"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="pt-2 border-t border-pink-100 flex items-center space-x-2">
            <button
              onClick={() => toggleMute()}
              className="text-pink-600 hover:text-pink-700 p-1 rounded-full hover:bg-pink-50 transition-colors cursor-pointer"
              title={volume === 0 ? 'Unmute' : 'Mute'}
            >
              {volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-pink-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-pink-600" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Music volume"
              className="flex-1 accent-pink-500 cursor-pointer h-1.5 bg-pink-100 rounded-full"
            />
            <span className="text-[10px] text-pink-700 font-bold w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* YouTube Song Link */}
          {youtubeUrl && (
            <div className="pt-2 mt-2 border-t border-pink-100">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3 text-pink-500" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioControl;
