import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { OpenWhenLetter } from '../../types';
import sound from '../../services/audio';

interface OpenWhenLettersProps {
  letters: OpenWhenLetter[];
}

export const OpenWhenLetters: React.FC<OpenWhenLettersProps> = ({ letters }) => {
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);

  const handleOpen = (letter: OpenWhenLetter) => {
    sound.playChime();
    setSelectedLetter(letter);
  };

  const handleClose = () => {
    sound.playPop();
    setSelectedLetter(null);
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200">
          <Mail className="w-4 h-4 text-pink-600" />
          <span>Little Pockets of Comfort</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-universe-text font-serif">
          Open When Letters 💌
        </h2>
        <p className="text-sm sm:text-base text-universe-text/80">
          Three special envelopes waiting for whenever you need comfort, a smile, or a warm reminder.
        </p>
      </div>

      {/* 3 Interactive Envelopes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {letters.map((letter, idx) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => handleOpen(letter)}
            className={`cursor-pointer rounded-3xl p-6 border shadow-soft-card flex flex-col justify-between h-72 transition-all relative overflow-hidden group ${letter.envelopeColor}`}
          >


            {/* Icon & Title */}
            <div>
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">
                {letter.icon}
              </span>
              <h3 className="text-xl font-bold font-serif leading-snug">
                {letter.triggerTitle}
              </h3>
              <p className="text-xs opacity-80 mt-1">
                {letter.subtitle}
              </p>
            </div>

            {/* Bottom Status */}
            <div className="pt-4 border-t border-current/20 flex items-center justify-between text-xs font-semibold">
              <span>{letter.dateTag}</span>
              <span className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span>Open letter</span>
                <span>→</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Letter Reading Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg letter-paper rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-300 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-pink-200 pb-3">
                <span className="text-xs font-bold text-pink-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  <span>{selectedLetter.triggerTitle}</span>
                </span>
                <span className="text-xs text-universe-text/60">Forever Available</span>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-3 text-universe-text/90 text-sm sm:text-base leading-relaxed py-2">
                {selectedLetter.letterContent.map((para, i) => (
                  <p key={i} className="indent-2">
                    {para}
                  </p>
                ))}
              </div>

              {/* Back button */}
              <div className="pt-4 border-t border-pink-200 flex justify-center">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 border border-pink-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Close Envelope</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OpenWhenLetters;
