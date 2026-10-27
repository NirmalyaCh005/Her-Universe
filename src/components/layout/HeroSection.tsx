import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import SceneCanvas from '../3d/SceneCanvas';
import TeddyBear from '../3d/TeddyBear';
import FloatingDecorations3D from '../3d/FloatingDecorations3D';
import { triggerPinkConfetti } from '../../lib/confetti';
import sound from '../../services/audio';

interface HeroSectionProps {
  girlfriendName: string;
  subheading: string;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  girlfriendName,
  subheading,
  onExplore,
}) => {
  const [isOpeningGift, setIsOpeningGift] = useState<boolean>(false);
  const [showTeddyMessage, setShowTeddyMessage] = useState<boolean>(false);
  const messageTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTeddyInteract = () => {
    setShowTeddyMessage(true);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setShowTeddyMessage(false);
    }, 4500);
  };

  const handleOpenSurprise = () => {
    sound.playChime();
    setIsOpeningGift(true);
    triggerPinkConfetti();

    setTimeout(() => {
      onExplore();
      const birthdayEl = document.getElementById('birthday');
      if (birthdayEl) {
        birthdayEl.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpeningGift(false);
    }, 700);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-20 sm:pt-24 pb-28 sm:pb-16 px-4 overflow-hidden"
    >
      {/* Soft Dreamy Pastel Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5FA] via-[#FFE4EE] to-[#FFF5FA] -z-10" />

      {/* Decorative Floating Clouds */}
      <div className="absolute top-12 left-6 w-32 h-14 bg-white/70 rounded-full blur-sm -z-5 animate-float-slow pointer-events-none" />
      <div className="absolute top-24 right-8 w-40 h-16 bg-white/60 rounded-full blur-sm -z-5 animate-float-medium pointer-events-none" />



      {/* Main Heading & Subheading */}
      <div className="text-center max-w-2xl z-10 space-y-2 sm:space-y-3">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-universe-text font-serif leading-tight"
        >
          Welcome to Your <br />
          <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
            Little Universe 💗
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-universe-text/80 text-sm sm:text-lg font-medium max-w-lg mx-auto px-2"
        >
          {subheading || 'A tiny, dreamy world made just for you.'}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[10.5px] xs:text-[11px] sm:text-xs md:text-sm text-pink-600 font-bold tracking-wide uppercase flex flex-wrap items-center justify-center gap-x-1 px-2 text-center"
        >
          <span className="whitespace-nowrap">✨ Created with love for</span>
          <span className="whitespace-nowrap text-pink-700 font-black">{girlfriendName} ✨</span>
        </motion.p>
      </div>

      {/* Central 3D Scene: Teddy Bear holding glowing heart + floating stars */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full max-w-md sm:max-w-lg h-[310px] sm:h-[420px] my-1 sm:my-2 flex items-center justify-center cursor-pointer"
        title="Tap the teddy bear!"
      >
        {/* Floating Pink Love Bubble on Teddy Interaction */}
        {showTeddyMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', damping: 16, stiffness: 220 }}
            className="absolute top-1 sm:top-2 z-30 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-pink-300 shadow-xl pointer-events-none max-w-[90%]"
          >
            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-pink-700 tracking-wide text-center">
              <span>Jiya, this little universe was made just for you. 💗</span>
            </div>
            {/* Speech bubble pointer */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-pink-300 transform rotate-45" />
          </motion.div>
        )}

        <SceneCanvas
          camera={{ position: [0, 0.02, 4.5], fov: 38 }}
          className="w-full h-full"
          fallback={
            <div className="text-center p-6 bg-pink-100/60 rounded-3xl border border-pink-200">
              <div className="text-6xl mb-2 animate-bounce">🧸💖</div>
              <p className="text-universe-text font-semibold text-sm">
                Sending warm hugs your way!
              </p>
            </div>
          }
        >
          <TeddyBear
            position={[0, -0.05, 0]}
            scale={1.15}
            onInteract={handleTeddyInteract}
          />
          <FloatingDecorations3D />
        </SceneCanvas>

        {/* Playful prompt badge */}
        <div className="absolute bottom-1 px-3.5 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-pink-200 text-[11px] text-pink-600 font-semibold shadow-2xs">
          💡 Tap Teddy or hearts to play!
        </div>
      </motion.div>

      {/* Primary Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col items-center space-y-2 sm:space-y-3 z-10"
      >
        <button
          onClick={handleOpenSurprise}
          disabled={isOpeningGift}
          aria-label="Open your little surprise"
          className={`btn-pink-glow px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-lg flex items-center space-x-2.5 sm:space-x-3 transition-transform ${
            isOpeningGift ? 'scale-95 opacity-80' : 'hover:scale-105 active:scale-95'
          }`}
        >
          <span className="text-lg sm:text-xl">🎁</span>
          <span>Open Your Little Surprise 💌</span>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
        </button>

        <p className="text-xs sm:text-sm text-universe-text/70 italic flex items-center space-x-1">
          <span>Something magical is waiting inside...</span>
        </p>

        {/* Down indicator */}
        <button
          onClick={onExplore}
          className="mt-2 text-pink-400 hover:text-pink-600 transition-colors animate-bounce"
          aria-label="Scroll down to explore"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
