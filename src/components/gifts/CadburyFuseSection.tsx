import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Candy, RotateCw } from 'lucide-react';
import SceneCanvas from '../3d/SceneCanvas';
import CadburyFuse3D from '../3d/CadburyFuse3D';
import { BirthdayConfig } from '../../types';
import sound from '../../services/audio';
import { triggerPinkConfetti, triggerCelebrationExplosion } from '../../lib/confetti';
import { apiService } from '../../services/api';

interface CadburyFuseSectionProps {
  chocolateSurprise: BirthdayConfig['chocolateSurprise'];
}

export const CadburyFuseSection: React.FC<CadburyFuseSectionProps> = ({
  chocolateSurprise,
}) => {
  const [isUnwrapped, setIsUnwrapped] = useState<boolean>(false);

  const handleUnwrap = () => {
    sound.playChime();
    setIsUnwrapped(true);
    triggerPinkConfetti();
    setTimeout(() => {
      sound.playCelebration();
      triggerCelebrationExplosion();
      apiService.updateProgress('chocolate-unwrapped', true);
    }, 400);
  };

  return (
    <section
      id="chocolate"
      className="relative min-h-screen pt-16 sm:pt-20 pb-28 sm:pb-20 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background with Purple & Pink Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5FA] via-[#F5E6FF] to-[#FFF5FA] -z-10" />
      <div className="absolute w-[36rem] h-[36rem] bg-purple-400/15 rounded-full blur-3xl -z-5 pointer-events-none" />
      <div className="absolute w-80 h-80 bg-pink-400/20 rounded-full blur-3xl -z-5 pointer-events-none" />

      {/* Floating Chocolate & Sparkle Emojis in background */}
      <div className="absolute top-12 left-8 sm:left-14 text-4xl animate-float-slow select-none opacity-60 pointer-events-none">
        🍫
      </div>
      <div className="absolute bottom-20 left-8 sm:left-14 text-3xl animate-float-medium select-none opacity-50 pointer-events-none">
        ✨
      </div>
      <div className="absolute top-24 right-8 sm:right-14 text-3xl animate-float-medium select-none opacity-60 pointer-events-none">
        🥜
      </div>
      <div className="absolute bottom-16 right-8 sm:right-14 text-4xl animate-float-slow select-none opacity-50 pointer-events-none">
        🍬
      </div>

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-4 z-10">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white text-xs sm:text-sm font-bold shadow-md border border-purple-400/40">
          <Candy className="w-4 h-4 text-amber-300" />
          <span>Cadbury Fuse • 3D Holographic Edition</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-universe-text font-serif">
          {chocolateSurprise.title} 🍫
        </h2>

        <p className="text-sm sm:text-base text-universe-text/80">
          {chocolateSurprise.subtitle}
        </p>

        {/* 360 Rotation Guidance */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/75 backdrop-blur-sm border border-purple-200 text-[11px] font-semibold text-purple-800 shadow-2xs mt-1">
          <RotateCw className="w-3 h-3 text-purple-600 animate-spin-slow" />
          <span>Click & drag to rotate 3D Fuse bar in 360°</span>
        </div>
      </div>

      {/* 3D & Visual Cadbury Chocolate Presentation */}
      <div className="relative w-full max-w-xl h-88 sm:h-[460px] my-1 flex items-center justify-center">
        {/* Hologram Pedestal Ambient Floor Glow */}
        <div className="absolute bottom-6 w-72 sm:w-96 h-20 bg-gradient-to-t from-pink-500/25 via-purple-600/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <SceneCanvas
          camera={{ position: [0, 0, 4.4], fov: 42 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          fallback={
            /* CSS Designed Cadbury Fuse Fallback Wrapper */
            <div className="relative w-72 h-44 rounded-2xl bg-gradient-to-r from-[#2B084D] via-[#4A127A] to-[#2B084D] p-4 text-white shadow-2xl border-2 border-amber-400 flex flex-col justify-between items-center overflow-hidden">
              <div className="w-full flex justify-between items-center">
                <span className="text-xs font-serif text-amber-300 font-bold italic">
                  Cadbury
                </span>
                <span className="text-[10px] bg-blue-900 px-2 py-0.5 rounded text-amber-200">
                  276 kcal
                </span>
              </div>
              <div className="text-5xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                FUSE
              </div>
              <div className="text-[11px] text-pink-200 text-center font-medium">
                Crunchy Peanuts, Caramel & Rich Milk Chocolate
              </div>
            </div>
          }
        >
          <CadburyFuse3D unwrapped={isUnwrapped} scale={1.12} />
        </SceneCanvas>

        {/* Floating unwrap badge */}
        <div className="absolute bottom-1 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-purple-200 text-xs font-bold text-purple-900 shadow-sm flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {isUnwrapped
              ? '✨ Chocolate unwrapped! Crunchy peanuts & caramel ready!'
              : '👉 Tap "Unwrap Chocolate Bar" or click to peel wrapper!'}
          </span>
        </div>
      </div>

      {/* Interactive Action Button */}
      <div className="mt-3 z-10 text-center space-y-3">
        {!isUnwrapped ? (
          <button
            onClick={handleUnwrap}
            className="px-8 py-3.5 rounded-full font-bold text-base sm:text-lg text-white bg-gradient-to-r from-purple-800 via-pink-600 to-rose-500 hover:from-purple-900 hover:to-rose-600 shadow-glow-purple transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2.5 mx-auto cursor-pointer"
          >
            <span>🍫</span>
            <span>Unwrap Chocolate Bar ✨</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="max-w-md mx-auto p-5 rounded-3xl letter-paper border-2 border-pink-200 text-center space-y-2.5 shadow-xl"
            >
              <div className="text-3xl">🍫💖🥜</div>
              <p className="text-universe-text font-serif text-lg font-bold">
                "{chocolateSurprise.sweetNote}"
              </p>
              <p className="text-xs sm:text-sm text-pink-700 font-semibold italic">
                {chocolateSurprise.followUpNote}
              </p>

              <button
                onClick={() => {
                  sound.playPop();
                  setIsUnwrapped(false);
                }}
                className="mt-2 text-xs font-bold text-purple-700 hover:text-purple-900 underline cursor-pointer"
              >
                Wrap it back up in foil 🎀
              </button>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Third-party brand disclaimer */}
        <p className="text-[11px] text-universe-text/60 italic max-w-sm mx-auto pt-2">
          Cadbury and Fuse are trademarks of Mondelēz International. This personal celebratory website is an affectionate fan-inspired gift and is not affiliated with or endorsed by Cadbury.
        </p>
      </div>
    </section>
  );
};

export default CadburyFuseSection;

