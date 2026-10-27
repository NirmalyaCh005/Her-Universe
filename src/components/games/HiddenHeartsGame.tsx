import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, HelpCircle, RotateCcw, CheckCircle2 } from 'lucide-react';
import { HiddenHeartItem } from '../../types';
import sound from '../../services/audio';
import { triggerPinkConfetti, triggerCelebrationExplosion } from '../../lib/confetti';
import { apiService } from '../../services/api';

interface HiddenHeartsGameProps {
  hiddenHearts: HiddenHeartItem[];
}

export const HiddenHeartsGame: React.FC<HiddenHeartsGameProps> = ({ hiddenHearts }) => {
  const [foundIds, setFoundIds] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleTapItem = (item: HiddenHeartItem) => {
    sound.playChime();
    setActiveMessage(`"${item.message}"`);

    if (!foundIds.includes(item.id)) {
      const updated = [...foundIds, item.id];
      setFoundIds(updated);
      triggerPinkConfetti();

      if (updated.length === hiddenHearts.length) {
        sound.playCelebration();
        triggerCelebrationExplosion();
        apiService.updateProgress('hidden-hearts', true);
        apiService.recordScore('hidden-hearts', 5);
      }
    }
  };

  const handleReset = () => {
    sound.playPop();
    setFoundIds([]);
    setActiveMessage(null);
    setShowHint(false);
  };

  const isCompleted = foundIds.length === hiddenHearts.length;

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-4 sm:p-6 shadow-xl border border-pink-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-pink-200/80 pb-3 mb-4 gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-universe-text font-serif flex items-center space-x-2">
            <span>Find the Hidden Hearts 🔍💖</span>
          </h3>
          <p className="text-xs text-universe-text/70">
            Explore the cozy pink room and discover 5 hidden hearts tucked away!
          </p>
        </div>

        {/* Counter Badge & Hint */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <div className="h-9 px-3.5 rounded-full bg-pink-100/90 text-pink-700 font-bold text-xs sm:text-sm border border-pink-200/90 flex items-center space-x-1.5 shadow-2xs">
            <Heart className={`w-4 h-4 ${isCompleted ? 'fill-pink-500 text-pink-500 animate-bounce' : 'text-pink-600'}`} />
            <span>Found: <span className="text-pink-900 font-extrabold">{foundIds.length} / {hiddenHearts.length}</span></span>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setShowHint(!showHint);
            }}
            title="Need a hint?"
            className="h-9 px-3 rounded-full bg-white/90 text-pink-600 border border-pink-200 hover:bg-pink-100 text-xs font-bold shadow-2xs flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Hint</span>
          </button>
        </div>
      </div>

      {/* Cozy Pink Room Interactive Area */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-2 border-pink-300 overflow-hidden shadow-inner-pink">
        {/* Room Illustration Decor: Floor & Wallpaper */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FF6FAE 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />

        {/* Room Furniture & Architecture Graphics */}
        {/* Window with moon */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 bg-indigo-900/10 border-4 border-white/80 rounded-t-full rounded-b-lg flex flex-col items-center justify-center pointer-events-none shadow-sm">
          <span className="text-2xl">🌙</span>
          <span className="text-xs text-pink-400">✨ ✨</span>
        </div>

        {/* Bed with pastel blankets */}
        <div className="absolute bottom-4 left-4 w-44 sm:w-56 h-28 bg-white/90 border-2 border-pink-200 rounded-3xl p-3 shadow-md pointer-events-none">
          <div className="w-full h-10 bg-pink-200/70 rounded-2xl mb-2" />
          <div className="w-16 h-8 bg-pink-300/60 rounded-xl" />
        </div>

        {/* Armchair & Rug */}
        <div className="absolute bottom-4 right-4 w-36 sm:w-44 h-32 bg-rose-100/90 border-2 border-pink-300 rounded-full shadow-md pointer-events-none flex items-center justify-center text-4xl opacity-80">
          🛋️
        </div>

        {/* Interactive Hidden Items */}
        {hiddenHearts.map((item) => {
          const isFound = foundIds.includes(item.id);

          return (
            <motion.button
              key={item.id}
              onClick={() => handleTapItem(item)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
              }}
              title={item.title}
              aria-label={`Inspect ${item.title}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-300 shadow-md ${
                isFound
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-glow-hotpink ring-2 ring-white scale-110'
                  : 'bg-white/90 text-universe-text border border-pink-200 hover:bg-pink-100'
              }`}
            >
              <span className="text-2xl">{isFound ? '💖' : item.icon}</span>
              {/* Pulsing indicator if hint is enabled */}
              {showHint && !isFound && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
              )}
            </motion.button>
          );
        })}

        {/* Completion Overlay */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3 z-20"
          >
            <CheckCircle2 className="w-12 h-12 text-pink-500 animate-bounce" />
            <h4 className="text-2xl sm:text-3xl font-extrabold text-universe-text font-serif">
              All 5 Hearts Found! 🎀
            </h4>
            <p className="text-xs sm:text-sm text-universe-text/80 max-w-sm">
              You uncovered every hidden secret in the room! Every single corner of this world is filled with love for you.
            </p>
            <button
              onClick={handleReset}
              className="btn-pink-glow px-6 py-2.5 rounded-full font-bold text-sm flex items-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Search Again</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Message revealed box */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 rounded-2xl letter-paper border border-pink-200 text-center"
          >
            <span className="text-[11px] font-bold text-pink-600 tracking-wider uppercase flex items-center justify-center space-x-1 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Secret Note Discovered</span>
            </span>
            <p className="text-universe-text font-medium text-sm sm:text-base italic">
              {activeMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint helper text */}
      {showHint && !isCompleted && (
        <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-center">
          💡 <strong>Hint:</strong> Look around the cozy window, the plush armchair, bedside table, and bookshelf!
        </div>
      )}
    </div>
  );
};

export default HiddenHeartsGame;
