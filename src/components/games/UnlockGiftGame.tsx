import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Unlock, Lock, Gift, Sparkles, FastForward, CheckCircle } from 'lucide-react';
import sound from '../../services/audio';
import { triggerPinkConfetti, triggerCelebrationExplosion } from '../../lib/confetti';
import { apiService } from '../../services/api';

interface UnlockGiftGameProps {
  girlfriendName: string;
}

export const UnlockGiftGame: React.FC<UnlockGiftGameProps> = ({ girlfriendName }) => {
  // Puzzle state: 3 magical lock symbols that need to be aligned to Hearts
  // Symbols rotate between: 🌟, 🌸, 💖
  const [symbols, setSymbols] = useState<string[]>(['🌟', '🌸', '🌟']);
  const [keysFound, setKeysFound] = useState<boolean[]>([false, false, false]);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Click symbol to cycle
  const cycleSymbol = (idx: number) => {
    sound.playPop();
    const cycle = ['🌟', '🌸', '💖'];
    setSymbols((prev) => {
      const copy = [...prev];
      const curIndex = cycle.indexOf(copy[idx]);
      const nextIndex = (curIndex + 1) % cycle.length;
      copy[idx] = cycle[nextIndex];

      // If all three symbols match '💖', grant key 1!
      if (copy[0] === '💖' && copy[1] === '💖' && copy[2] === '💖') {
        grantKey(0);
      }
      return copy;
    });
  };

  const grantKey = (idx: number) => {
    if (keysFound[idx]) return;
    sound.playChime();
    triggerPinkConfetti();
    setKeysFound((prev) => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });
  };

  const allKeysCollected = keysFound.every(Boolean);

  const handleUnlockBox = () => {
    sound.playCelebration();
    triggerCelebrationExplosion();
    setIsUnlocked(true);
    apiService.updateProgress('unlock-gift', true);
  };

  const handleSkip = () => {
    sound.playPop();
    setKeysFound([true, true, true]);
    handleUnlockBox();
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-5 sm:p-7 shadow-xl border border-pink-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-pink-200/80 pb-3 mb-4 gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-universe-text font-serif flex items-center space-x-2">
            <span>Unlock the Secret Gift 🎁🗝️</span>
          </h3>
          <p className="text-xs text-universe-text/70">
            Collect 3 keys by aligning the celestial gems, making a birthday wish, and claiming your gift!
          </p>
        </div>

        {/* Skip option */}
        {!isUnlocked && (
          <button
            onClick={handleSkip}
            className="h-9 px-3.5 rounded-full text-xs font-bold bg-pink-100 hover:bg-pink-200 text-pink-700 transition-colors border border-pink-200 flex items-center space-x-1.5 shadow-2xs cursor-pointer"
            title="Skip directly to the gift"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip Challenge</span>
          </button>
        )}
      </div>

      {/* 3 Keys Tracker */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {[0, 1, 2].map((idx) => {
          const isFound = keysFound[idx];
          return (
            <div
              key={idx}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all ${
                isFound
                  ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-sm'
                  : 'bg-pink-50 border-pink-200 text-pink-300'
              }`}
            >
              <Key className={`w-4 h-4 ${isFound ? 'text-amber-600 fill-amber-500 animate-bounce' : 'text-pink-300'}`} />
              <span className="text-xs font-bold">Key #{idx + 1}</span>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <div className="space-y-6">
            {/* Step 1: Align 3 Heart Gems */}
            <div className="p-4 rounded-2xl bg-white/70 border border-pink-200 text-center space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-universe-text/80">
                <span>Task 1: Tap the celestial gems until all 3 match (💖 💖 💖)</span>
                {keysFound[0] && <CheckCircle className="w-4 h-4 text-emerald-500" />}
              </div>

              <div className="flex justify-center space-x-4">
                {symbols.map((sym, idx) => (
                  <button
                    key={idx}
                    onClick={() => cycleSymbol(idx)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-100/80 hover:bg-pink-200/90 border border-pink-300 text-2xl sm:text-3xl flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                    title="Tap to rotate symbol"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Secret Kiss/Hug key */}
            <div className="p-4 rounded-2xl bg-white/70 border border-pink-200 text-center space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-universe-text/80">
                <span>Task 2: Claim the Golden Wish Key</span>
                {keysFound[1] && <CheckCircle className="w-4 h-4 text-emerald-500" />}
              </div>

              {!keysFound[1] ? (
                <button
                  onClick={() => grantKey(1)}
                  className="px-5 py-2 rounded-full bg-pink-100 text-pink-700 font-bold text-xs sm:text-sm hover:bg-pink-200 transition-colors border border-pink-200 flex items-center space-x-2 mx-auto"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Send a Birthday Hug 🫂✨</span>
                </button>
              ) : (
                <p className="text-xs text-pink-700 font-medium">✨ Golden Wish Key unlocked!</p>
              )}
            </div>

            {/* Step 3: Final Key */}
            <div className="p-4 rounded-2xl bg-white/70 border border-pink-200 text-center space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-universe-text/80">
                <span>Task 3: Touch the glowing mystery lock</span>
                {keysFound[2] && <CheckCircle className="w-4 h-4 text-emerald-500" />}
              </div>

              {!keysFound[2] ? (
                <button
                  onClick={() => grantKey(2)}
                  className="px-5 py-2 rounded-full bg-pink-100 text-pink-700 font-bold text-xs sm:text-sm hover:bg-pink-200 transition-colors border border-pink-200 flex items-center space-x-2 mx-auto"
                >
                  <Lock className="w-4 h-4 text-pink-500" />
                  <span>Tap to activate Key #3 🔑</span>
                </button>
              ) : (
                <p className="text-xs text-pink-700 font-medium">✨ Mystery Key unlocked!</p>
              )}
            </div>

            {/* Final Unlock Button */}
            <div className="pt-2 text-center">
              <button
                onClick={handleUnlockBox}
                disabled={!allKeysCollected}
                className={`w-full sm:w-auto px-8 py-3 rounded-full font-bold text-base flex items-center justify-center space-x-2 mx-auto transition-all ${
                  allKeysCollected
                    ? 'btn-pink-glow shadow-glow-hotpink animate-pulse'
                    : 'bg-pink-100/60 text-pink-400 border border-pink-200 cursor-not-allowed'
                }`}
              >
                {allKeysCollected ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                <span>{allKeysCollected ? 'Unlock Birthday Surprise 🎁' : 'Collect All 3 Keys First'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Gift Unlocked Celebration */
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 space-y-4"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-4xl shadow-glow-hotpink animate-bounce">
              🎁
            </div>

            <h4 className="text-2xl sm:text-3xl font-extrabold text-universe-text font-serif">
              Surprise Unlocked for {girlfriendName}! 💝
            </h4>

            <div className="letter-paper rounded-2xl p-5 border border-pink-200 space-y-2 max-w-md mx-auto">
              <p className="text-pink-900 font-serif text-lg font-bold">
                "A Gift of Infinite Love & Smiles"
              </p>
              <p className="text-universe-text text-sm sm:text-base leading-relaxed">
                You solved every puzzle, but the greatest gift is simply getting to celebrate you today. May your year be as bright and sweet as your smile!
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-4 py-1.5 rounded-full border border-pink-200">
                ✨ Achievement: Master Keyholder of the Little Universe ✨
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnlockGiftGame;
