import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, Mail } from 'lucide-react';
import { BirthdayConfig } from '../../types';
import sound from '../../services/audio';
import { FireworksManager } from '../../lib/fireworks';

interface FinalRevealSectionProps {
  finalReveal: BirthdayConfig['finalReveal'];
  myName: string;
  onReplay: () => void;
  onReadLetter: () => void;
}

export const FinalRevealSection: React.FC<FinalRevealSectionProps> = ({
  finalReveal,
  myName,
  onReplay,
  onReadLetter,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fireworksRef = useRef<FireworksManager | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      fireworksRef.current = new FireworksManager(canvasRef.current);
    }
    return () => {
      fireworksRef.current?.destroy();
    };
  }, []);

  const handleCelebrate = () => {
    fireworksRef.current?.launchBarrage(6);
  };

  const handleSkyClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    fireworksRef.current?.launch(clickX, clickY);
  };

  return (
    <section
      id="reveal"
      onClick={handleSkyClick}
      className="relative isolate min-h-screen pt-20 sm:pt-28 pb-32 sm:pb-36 px-4 flex flex-col items-center justify-center text-center overflow-hidden cursor-crosshair bg-gradient-to-b from-[#22071F] via-[#160416] to-[#0A010A]"
    >
      {/* Real Skyshot Fireworks Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Ambient Celestial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none -z-5" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-5" />

      {/* Floating Starfield in dark night sky */}
      <div className="absolute inset-0 opacity-60 pointer-events-none -z-5">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-sparkle"
            style={{
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              width: `${Math.random() * 2.5 + 1.5}px`,
              height: `${Math.random() * 2.5 + 1.5}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Central Glowing 3D Heart Presentation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          handleCelebrate();
        }}
        className="relative cursor-pointer mb-8 sm:mb-10 group z-20"
        title="Tap for skyshot fireworks!"
      >
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 flex items-center justify-center shadow-[0_0_50px_rgba(244,114,182,0.6)] border-4 border-pink-300/80 transition-transform group-hover:scale-110 active:scale-95 animate-pulse-soft">
          <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-white fill-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-pink-400/80 text-xs font-bold text-pink-100 whitespace-nowrap shadow-lg flex items-center space-x-1.5">
          <span>Tap for fireworks 🎆</span>
        </div>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-5 px-4 mb-8 sm:mb-10 z-20"
      >
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/25 text-pink-200 text-xs sm:text-sm font-bold border border-pink-400/50 backdrop-blur-md shadow-md">
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Under the Birthday Sky</span>
          <Sparkles className="w-4 h-4 text-pink-300" />
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-serif leading-tight drop-shadow-[0_4px_16px_rgba(255,182,193,0.5)]">
          {finalReveal.headline}
        </h2>

        {/* Romantic paragraphs card */}
        <div className="bg-[#2A0C26]/85 text-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-9 border-2 border-pink-400/40 shadow-[0_16px_48px_rgba(0,0,0,0.6)] space-y-4 text-sm sm:text-base leading-relaxed text-left max-w-xl mx-auto mt-6">
          {finalReveal.message.map((msg, i) => (
            <p key={i} className="text-pink-100 font-normal leading-relaxed text-sm sm:text-base">
              {msg}
            </p>
          ))}

          <div className="pt-5 border-t border-pink-300/30 text-right mt-4">
            <p className="font-handwriting text-3xl sm:text-4xl text-pink-300 drop-shadow-sm">
              {finalReveal.signoff}
            </p>
            <p className="font-serif font-black text-white text-base sm:text-lg mt-1 tracking-wider uppercase">
              {myName}
            </p>
          </div>
        </div>

        {/* Buttons: Replay & Reopen Love Letter */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-8 z-20">
          <button
            onClick={() => {
              sound.playPop();
              fireworksRef.current?.launchBarrage(3);
              onReplay();
            }}
            className="w-full sm:w-auto btn-pink-glow px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-glow-hotpink cursor-pointer active:scale-95 transition-transform"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Our Little Universe ✨</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onReadLetter();
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-pink-100 border border-pink-400/50 text-sm font-bold transition-all flex items-center justify-center space-x-2 backdrop-blur-md active:scale-95 shadow-md cursor-pointer"
          >
            <Mail className="w-4 h-4 text-pink-300" />
            <span>Read Birthday Letter Again 💌</span>
          </button>
        </div>
      </motion.div>

      {/* Sweet Footer Note */}
      <footer className="mt-16 text-center text-xs text-pink-300/60 font-light">
        <p>Created especially for you with all my love • October 28 💗</p>
      </footer>
    </section>
  );
};

export default FinalRevealSection;
