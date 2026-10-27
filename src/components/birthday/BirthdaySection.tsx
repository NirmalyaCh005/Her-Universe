import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Flame, Wind } from 'lucide-react';
import SceneCanvas from '../3d/SceneCanvas';
import BirthdayCake3D from '../3d/BirthdayCake3D';
import { triggerPinkConfetti, triggerCelebrationExplosion } from '../../lib/confetti';
import sound from '../../services/audio';

interface BirthdaySectionProps {
  girlfriendName: string;
  birthdayWish: string;
  birthdaySecondaryWish: string;
}

export const BirthdaySection: React.FC<BirthdaySectionProps> = ({
  girlfriendName,
  birthdayWish,
  birthdaySecondaryWish,
}) => {
  const [candlesBlownOut, setCandlesBlownOut] = useState<boolean>(false);
  const [showWishModal, setShowWishModal] = useState<boolean>(false);
  const [showSecondaryNote, setShowSecondaryNote] = useState<boolean>(false);

  const handleMakeWish = () => {
    sound.playBlowingCandle();
    setCandlesBlownOut(true);
    triggerPinkConfetti();

    setTimeout(() => {
      sound.playCelebration();
      triggerCelebrationExplosion();
      setShowWishModal(true);
    }, 600);
  };

  const handleRelight = () => {
    sound.playPop();
    setCandlesBlownOut(false);
    setShowWishModal(false);
    setShowSecondaryNote(false);
  };

  return (
    <section
      id="birthday"
      className="relative min-h-screen pt-16 sm:pt-20 pb-28 sm:pb-20 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Decorative pastel balloons in background */}
      <div className="absolute top-10 left-4 text-4xl sm:text-6xl animate-float-slow opacity-70 select-none pointer-events-none">
        🎈
      </div>
      <div className="absolute top-20 right-6 text-5xl sm:text-7xl animate-float-medium opacity-65 select-none pointer-events-none">
        🎈
      </div>
      <div className="absolute bottom-16 left-8 text-3xl sm:text-5xl animate-float-slow opacity-50 select-none pointer-events-none">
        🧁
      </div>
      <div className="absolute bottom-20 right-10 text-4xl sm:text-6xl animate-float-medium opacity-60 select-none pointer-events-none">
        ✨
      </div>

      {/* Main Title Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-xl mx-auto space-y-2 mb-6"
      >
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>October 28 • The Most Special Day</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-universe-text font-serif tracking-tight pt-2">
          Happy Birthday, <br />
          <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
            Beautiful! 🎂
          </span>
        </h2>

        <p className="text-sm sm:text-base text-universe-text/80 font-medium">
          Close your eyes, make the sweetest wish from the bottom of your heart, and blow out the candles!
        </p>
      </motion.div>

      {/* 3D Realistic Holographic Birthday Cake Interactive Scene */}
      <div className="relative w-full max-w-lg h-80 sm:h-96 my-4 flex items-center justify-center">
        {/* Holographic Platform Glow */}
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-pink-400/20 rounded-full blur-3xl pointer-events-none -z-5 animate-pulse-soft" />

        <SceneCanvas
          camera={{ position: [0, 0.5, 4.3], fov: 44 }}
          className="w-full h-full"
          fallback={
            <div className="text-center p-8 bg-pink-100/60 rounded-3xl border border-pink-200">
              <div className="text-7xl mb-3">🎂🕯️</div>
              <p className="text-universe-text font-semibold text-sm">
                A warm birthday cake baked just for you!
              </p>
            </div>
          }
        >
          <BirthdayCake3D isBlownOut={candlesBlownOut} scale={1.12} />
        </SceneCanvas>

        {/* Floating status tag */}
        <div className="absolute bottom-0 px-3.5 py-1 bg-white/80 backdrop-blur-md rounded-full border border-pink-200 text-xs font-semibold text-universe-text shadow-sm flex items-center space-x-1.5">
          {candlesBlownOut ? (
            <>
              <Wind className="w-3.5 h-3.5 text-blue-400" />
              <span>Wish made! Candles blown out 🌬️✨</span>
            </>
          ) : (
            <>
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Candles are glowing warmly ✨</span>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 z-10">
        {!candlesBlownOut ? (
          <button
            onClick={handleMakeWish}
            aria-label="Make a wish and blow out candles"
            className="btn-pink-glow px-8 py-3.5 rounded-full font-bold text-base sm:text-lg flex items-center space-x-2.5 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-yellow-200 animate-bounce" />
            <span>Make a Wish ✨</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => setShowWishModal(true)}
              className="btn-pink-glow px-7 py-3 rounded-full font-bold text-sm sm:text-base flex items-center space-x-2"
            >
              <Gift className="w-4 h-4" />
              <span>Read Your Birthday Wish 💌</span>
            </button>
            <button
              onClick={handleRelight}
              className="px-6 py-3 rounded-full font-semibold text-sm bg-white/90 border border-pink-200 text-pink-700 hover:bg-pink-50 transition-all shadow-sm flex items-center space-x-2"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Relight Candles 🕯️</span>
            </button>
          </>
        )}
      </div>

      {/* Modal / Reveal for Birthday Wish */}
      <AnimatePresence>
        {showWishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border-2 border-pink-300 shadow-2xl text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl shadow-inner-pink">
                🎂
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold tracking-wide">
                YOUR WISH IS SENT TO THE STARS ✨
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-universe-text font-serif">
                Happy Birthday, {girlfriendName}! 💖
              </h3>

              <div className="letter-paper rounded-2xl p-5 border border-pink-100 space-y-3">
                <p className="text-universe-text text-base sm:text-lg leading-relaxed font-medium">
                  "{birthdayWish}"
                </p>

                {showSecondaryNote && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3 border-t border-pink-200/80 text-pink-800 text-sm sm:text-base font-handwriting text-lg leading-relaxed italic"
                  >
                    "{birthdaySecondaryWish}"
                  </motion.div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {!showSecondaryNote ? (
                  <button
                    onClick={() => {
                      sound.playPop();
                      setShowSecondaryNote(true);
                      triggerPinkConfetti();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-pink-100 text-pink-700 font-bold text-sm hover:bg-pink-200 transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                    <span>Reveal One More Secret Note 💌</span>
                  </button>
                ) : null}

                <button
                  onClick={() => {
                    sound.playPop();
                    setShowWishModal(false);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full btn-pink-glow font-bold text-sm"
                >
                  Keep Exploring 🌸
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BirthdaySection;
