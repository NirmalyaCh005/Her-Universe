import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Check, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '../../types';
import sound from '../../services/audio';
import { triggerPinkConfetti, triggerCelebrationExplosion } from '../../lib/confetti';
import { apiService } from '../../services/api';

interface MemoryQuizGameProps {
  questions: QuizQuestion[];
  girlfriendName: string;
}

export const MemoryQuizGame: React.FC<MemoryQuizGameProps> = ({
  questions,
  girlfriendName,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [sweetFeedback, setSweetFeedback] = useState<string | null>(null);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (option: string) => {
    sound.playPop();
    setSelectedOption(option);
    setSweetFeedback(currentQ.sweetReaction);
    triggerPinkConfetti();
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setSweetFeedback(null);
    } else {
      setIsCompleted(true);
      sound.playCelebration();
      triggerCelebrationExplosion();
      apiService.updateProgress('memory-quiz', true);
      apiService.recordScore('memory-quiz', questions.length);
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIndex(0);
    setSelectedOption(null);
    setSweetFeedback(null);
    setIsCompleted(false);
  };

  const progressPercentage = Math.round(((currentIndex + (selectedOption ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-5 sm:p-7 shadow-xl border border-pink-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-200/80 pb-3 mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-universe-text font-serif flex items-center space-x-2">
            <span>Our Little Dream Quiz 💭✨</span>
          </h3>
          <p className="text-xs text-universe-text/70">
            A playful quiz to celebrate our shared moments and favorite things!
          </p>
        </div>

        <div className="h-9 px-3.5 rounded-full bg-pink-100/90 text-pink-700 font-bold text-xs sm:text-sm border border-pink-200/90 flex items-center space-x-1.5 shadow-2xs">
          <span>Question: <span className="text-pink-900 font-extrabold">{currentIndex + 1} / {questions.length}</span></span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-pink-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          /* Question View */
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            <h4 className="text-lg sm:text-xl font-bold text-universe-text">
              {currentQ.question}
            </h4>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className={`p-3.5 sm:p-4 rounded-2xl text-left text-sm sm:text-base font-medium transition-all duration-200 border flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400 shadow-md scale-[1.01]'
                        : 'bg-white/80 text-universe-text border-pink-200 hover:bg-pink-50/80'
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected && <Check className="w-5 h-5 text-white flex-shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Sweet reaction card */}
            {sweetFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-pink-100/80 border border-pink-300 text-pink-900 text-sm font-semibold flex items-center space-x-2"
              >
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500 flex-shrink-0" />
                <span>{sweetFeedback}</span>
              </motion.div>
            )}

            {/* Next button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center space-x-2 transition-all ${
                  selectedOption
                    ? 'btn-pink-glow'
                    : 'bg-pink-100/50 text-pink-400 cursor-not-allowed border border-pink-200'
                }`}
              >
                <span>{currentIndex + 1 === questions.length ? 'See Result 💝' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Result Certificate */
          <motion.div
            key="quiz-result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl shadow-inner-pink">
              🏆
            </div>

            <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
              Perfect Match Certificate 📜
            </span>

            <h4 className="text-2xl sm:text-3xl font-extrabold text-universe-text font-serif">
              You & Me: 100% Soulmate Score! 💖
            </h4>

            <p className="text-sm sm:text-base text-universe-text/80 max-w-md mx-auto leading-relaxed">
              Every single answer you picked proves why you are my absolute favorite person in the world. No matter the choices, every path leads to us making wonderful memories together.
            </p>

            <div className="p-4 rounded-2xl letter-paper border border-pink-200 inline-block text-left text-xs sm:text-sm text-pink-900 space-y-1">
              <p className="font-bold">✨ Birthday Girl: {girlfriendName}</p>
              <p className="italic">Status: Cherished beyond words today & every day.</p>
            </div>

            <div>
              <button
                onClick={handleRestart}
                className="btn-pink-glow px-6 py-2.5 rounded-full font-bold text-sm inline-flex items-center space-x-2 mt-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Quiz Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryQuizGame;
