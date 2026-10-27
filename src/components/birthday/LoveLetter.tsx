import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowLeft, Mail, Calendar, Crown, Star } from 'lucide-react';
import { BirthdayConfig } from '../../types';
import sound from '../../services/audio';

interface LoveLetterProps {
  loveLetter: BirthdayConfig['loveLetter'];
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ loveLetter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    sound.playChime();
    setIsOpen(true);
  };

  const handleCloseEnvelope = () => {
    sound.playPop();
    setIsOpen(false);
  };

  return (
    <section
      id="letter"
      className="relative min-h-screen pt-16 sm:pt-20 pb-28 sm:pb-20 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Soft Ambient Pastel Glow Behind Letter */}
      <div className="absolute w-[32rem] h-[32rem] bg-pink-300/25 rounded-full blur-3xl pointer-events-none -z-5" />

      {/* Floating Decorative Romantic Emojis */}
      <div className="absolute top-16 left-6 sm:left-12 text-3xl sm:text-4xl animate-float-slow select-none opacity-60 pointer-events-none">
        💌
      </div>
      <div className="absolute bottom-20 right-6 sm:right-12 text-3xl sm:text-4xl animate-float-medium select-none opacity-60 pointer-events-none">
        🌸
      </div>
      <div className="absolute top-28 right-10 text-2xl animate-float-slow select-none opacity-50 pointer-events-none">
        ✨
      </div>
      <div className="absolute bottom-28 left-10 text-2xl animate-float-medium select-none opacity-50 pointer-events-none">
        💖
      </div>

      {/* Section Header Badge */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-10 z-10">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-pink-100/95 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200/90 shadow-sm">
          <Mail className="w-3.5 h-3.5 text-pink-500" />
          <span>Handwritten From The Heart</span>
          <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-universe-text font-serif">
          A Sealed Love Letter 💌
        </h2>
        <p className="text-sm sm:text-base text-universe-text/80">
          A special envelope sealed with love & memories. Tap the glowing wax seal to unfold!
        </p>
      </div>

      <div className="relative w-full max-w-xl flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ========================================================= */
            /* 1. SUPER CUTE CLOSED WAX-SEALED AIRMAIL ENVELOPE          */
            /* ========================================================= */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88, y: -25 }}
              transition={{ duration: 0.5, type: 'spring', damping: 20 }}
              onClick={handleOpenEnvelope}
              className="relative w-full max-w-lg min-h-[420px] sm:min-h-[460px] bg-gradient-to-br from-[#FFF2F7] via-[#FFE4EE] to-[#FFD5E5] rounded-[2.25rem] border-3 border-pink-300/80 shadow-2xl cursor-pointer flex flex-col justify-between p-6 sm:p-8 overflow-hidden group hover:scale-[1.02] hover:shadow-glow-pink transition-all duration-300"
            >
              {/* Cute Candy-Stripe Airmail Perimeter Edge */}
              <div 
                className="absolute inset-0 rounded-[2.25rem] pointer-events-none opacity-30"
                style={{
                  backgroundImage: `repeating-linear-gradient(135deg, #FF6FAE 0, #FF6FAE 10px, transparent 10px, transparent 20px, #FFFFFF 20px, #FFFFFF 30px, transparent 30px, transparent 40px)`
                }}
              />

              {/* Envelope Flap Polygon with Dimensional Gradients */}
              <div
                className="absolute top-0 left-0 right-0 h-44 sm:h-52 bg-gradient-to-b from-[#FFD0E2] via-[#FFDCE8] to-[#FFEBF3] shadow-md border-b-2 border-pink-300/50 pointer-events-none"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              {/* Faint Envelope Inner Stationery Liner Lines */}
              <div 
                className="absolute inset-x-0 bottom-0 h-48 pointer-events-none opacity-25"
                style={{
                  backgroundImage: `linear-gradient(45deg, #FF80B5 25%, transparent 25%), linear-gradient(-45deg, #FF80B5 25%, transparent 25%)`,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* ======================================================= */}
              {/* TOP ROW: Cute Airmail Recipient Badge + Flawless Date Stamp */}
              {/* ======================================================= */}
              <div className="w-full flex items-start justify-between z-10 gap-2">
                {/* Left: Cute "Special Airmail / For Jiya" Stamp Label */}
                <div className="flex flex-col space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-2xl border border-pink-200/90 shadow-sm flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <div>
                      <span className="text-[9px] font-extrabold text-pink-500 uppercase tracking-widest block leading-none">
                        SPECIAL AIRMAIL
                      </span>
                      <span className="text-xs font-serif font-black text-pink-900 tracking-wide leading-tight">
                        For My Princess (JIYA) 👑
                      </span>
                    </div>
                  </div>

                  {/* Rubber Postmark Stamp Pill */}
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-rose-100/80 border border-dashed border-rose-300/80 rounded-xl text-[9px] font-bold text-rose-700 transform -rotate-2 self-start shadow-2xs">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                    <span>PRIORITY DELIVERY • 100% LOVE</span>
                  </div>
                </div>

                {/* Right: CUTE POSTAGE STAMP - Perfectly Aligned, No Cutoffs */}
                <div className="relative group/stamp shrink-0">
                  {/* Airmail Cancellation Wave Lines overlay */}
                  <div className="absolute -left-6 -top-1 pointer-events-none select-none opacity-30">
                    <svg width="60" height="35" viewBox="0 0 60 35" fill="none" className="text-rose-600">
                      <path d="M0 8 Q 15 0, 30 8 T 60 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M0 16 Q 15 8, 30 16 T 60 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M0 24 Q 15 16, 30 24 T 60 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Stamp Container with Perforated Dotted Frame */}
                  <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FFF9FB] to-[#FFF0F5] border-2 border-dashed border-rose-300 rounded-2xl p-2.5 shadow-md flex flex-col items-center justify-center text-center min-w-[70px] transform rotate-3 group-hover/stamp:rotate-0 transition-transform duration-300">
                    {/* Flower Icon - Fully inside with gentle spacing */}
                    <div className="w-5 h-5 flex items-center justify-center mb-1">
                      <span className="text-sm select-none">🌸</span>
                    </div>

                    {/* Month Badge */}
                    <div className="bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-full mb-1">
                      <span className="text-[10px] font-black tracking-widest text-rose-600 uppercase font-sans leading-none block">
                        OCT
                      </span>
                    </div>

                    {/* Date Number - Large, Clear, Beautifully Centered */}
                    <div className="flex items-center justify-center px-1">
                      <span className="text-2xl font-black text-rose-600 leading-none font-serif tracking-tight drop-shadow-2xs">
                        28
                      </span>
                    </div>

                    {/* Bottom Micro Stamp Detail */}
                    <div className="mt-1 flex items-center justify-center space-x-1">
                      <Heart className="w-2 h-2 text-rose-400 fill-rose-400" />
                      <span className="text-[8px] font-extrabold text-rose-500 uppercase tracking-tighter">
                        SPECIAL
                      </span>
                      <Heart className="w-2 h-2 text-rose-400 fill-rose-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================= */}
              {/* CENTER: Embossed Crimson Wax Seal with Satin Ribbons     */}
              {/* ======================================================= */}
              <div className="relative z-20 flex flex-col items-center my-3 sm:my-4">
                {/* 3D Wax Seal with Realistic Highlights */}
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] flex items-center justify-center shadow-[0_10px_28px_rgba(190,18,60,0.45)] border-4 border-rose-200 ring-4 ring-pink-300/50 cursor-pointer"
                >
                  {/* Glossy Curvature Reflection Highlight */}
                  <div className="absolute top-2 left-2.5 w-7 h-4 bg-white/30 rounded-full transform -rotate-45 blur-[1px] pointer-events-none" />

                  {/* Deeply Stamped Sunken Ring */}
                  <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-br from-[#9F1239] to-[#881337] border-2 border-dashed border-rose-200/70 flex items-center justify-center shadow-inner">
                    <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-rose-100 fill-rose-100 animate-pulse drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  </div>
                </motion.div>

                {/* Silk Ribbon Tails hanging below seal */}
                <div className="flex space-x-2 -mt-1.5">
                  <div 
                    className="w-3.5 h-6 bg-gradient-to-b from-[#BE123C] to-[#881337] transform -rotate-12 shadow-sm"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                  />
                  <div 
                    className="w-3.5 h-6 bg-gradient-to-b from-[#BE123C] to-[#881337] transform rotate-12 shadow-sm"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                  />
                </div>
              </div>

              {/* ======================================================= */}
              {/* BOTTOM: Cute Glowing Call-To-Action Pill Badge         */}
              {/* ======================================================= */}
              <div className="relative z-10 text-center pt-2 pb-1">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-extrabold text-rose-700 tracking-wider uppercase bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full border-2 border-pink-300 shadow-md group-hover:bg-white group-hover:border-rose-400 group-hover:shadow-glow-pink transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>Tap Wax Seal To Open Letter</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                </motion.div>
                <p className="text-[11px] sm:text-xs text-universe-text/80 font-medium italic mt-2">
                  Handwritten with endless love just for you ✨
                </p>
              </div>
            </motion.div>
          ) : (
            /* ========================================================= */
            /* 2. CUTE UNFOLDED VINTAGE STATIONERY LOVE LETTER           */
            /* ========================================================= */
            <motion.div
              key="letter-open"
              initial={{ opacity: 0, y: 40, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.9 }}
              transition={{ duration: 0.6, type: 'spring', damping: 22 }}
              className="relative w-full letter-paper rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-pink-200 space-y-6"
            >
              {/* Decorative Corner Washi Tapes */}
              <div className="absolute -top-3 left-8 w-20 h-5 bg-pink-200/90 rounded-sm transform -rotate-2 border-t border-b border-pink-300/60 shadow-xs pointer-events-none" />
              <div className="absolute -top-3 right-8 w-20 h-5 bg-pink-200/90 rounded-sm transform rotate-2 border-t border-b border-pink-300/60 shadow-xs pointer-events-none" />

              {/* Floating micro emojis */}
              <div className="absolute -top-3 -right-2 text-2xl animate-float-slow select-none pointer-events-none">
                💖
              </div>
              <div className="absolute -bottom-3 -left-2 text-2xl animate-float-medium select-none pointer-events-none">
                🌸
              </div>

              {/* LETTER HEADER: Perfectly Aligned Header & Date Badge */}
              <div className="border-b-2 border-dashed border-pink-200/80 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">💌</span>
                  <span className="text-xs font-bold text-pink-700 tracking-wider uppercase font-sans">
                    Birthday Love Letter
                  </span>
                </div>

                {/* Clean Aligned Date Badge */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-pink-50 border border-pink-200 rounded-full text-xs font-semibold text-pink-800 shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-pink-500" />
                  <span>October 28 • Born to be Loved</span>
                </div>
              </div>

              {/* Salutation */}
              <h3 className="text-xl sm:text-2xl font-serif italic text-pink-900 font-bold leading-tight">
                {loveLetter.greeting}
              </h3>

              {/* Letter Paragraphs with Sweet Dividers */}
              <div className="space-y-4 text-universe-text/90 text-sm sm:text-base leading-relaxed font-sans">
                {loveLetter.paragraphs.map((para, idx) => (
                  <React.Fragment key={idx}>
                    <p className="indent-4 text-justify sm:text-left leading-relaxed">
                      {para}
                    </p>
                    {idx < loveLetter.paragraphs.length - 1 && (
                      <div className="flex items-center justify-center space-x-2 text-pink-300 py-1">
                        <span className="text-xs">🌸</span>
                        <span className="w-8 h-px bg-pink-200" />
                        <Heart className="w-3 h-3 text-pink-400 fill-pink-300" />
                        <span className="w-8 h-px bg-pink-200" />
                        <span className="text-xs">🌸</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Handwritten Signoff */}
              <div className="pt-4 border-t border-pink-200/70 flex flex-col items-end space-y-0.5">
                <p className="font-handwriting text-2xl sm:text-3xl text-pink-700">
                  {loveLetter.signoff}
                </p>
                <p className="font-serif font-bold text-universe-text text-base sm:text-lg flex items-center gap-1.5">
                  <span>{loveLetter.senderName}</span>
                  <Crown className="w-4 h-4 text-amber-500 fill-amber-400 inline" />
                </p>
              </div>

              {/* Return to Envelope Button */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleCloseEnvelope}
                  className="px-6 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 border border-pink-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Fold & Put Back into Envelope 💌</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveLetter;

