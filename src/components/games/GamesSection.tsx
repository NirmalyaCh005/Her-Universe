import React, { useState } from 'react';
import { Gamepad2, Heart, Search, HelpCircle, Gift } from 'lucide-react';
import CatchMyHeartsGame from './CatchMyHeartsGame';
import HiddenHeartsGame from './HiddenHeartsGame';
import MemoryQuizGame from './MemoryQuizGame';
import UnlockGiftGame from './UnlockGiftGame';
import { BirthdayConfig } from '../../types';
import sound from '../../services/audio';

interface GamesSectionProps {
  birthdayConfig: BirthdayConfig;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ birthdayConfig }) => {
  const [activeTab, setActiveTab] = useState<'catch' | 'hidden' | 'quiz' | 'unlock'>('catch');

  const tabs = [
    { id: 'catch', label: 'Catch My Hearts', icon: <Heart className="w-4 h-4" /> },
    { id: 'hidden', label: 'Hidden Hearts', icon: <Search className="w-4 h-4" /> },
    { id: 'quiz', label: 'Dream Quiz', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'unlock', label: 'Unlock Gift', icon: <Gift className="w-4 h-4" /> },
  ] as const;

  const handleTabClick = (tabId: typeof activeTab) => {
    sound.playPop();
    setActiveTab(tabId);
  };

  return (
    <section id="games" className="relative pt-16 sm:pt-20 pb-28 sm:pb-20 px-4 max-w-4xl mx-auto overflow-hidden">
      {/* Soft Ambient Arcade Glow & Floating Decals */}
      <div className="absolute top-10 left-8 text-3xl animate-float-slow select-none opacity-50 pointer-events-none">
        🕹️
      </div>
      <div className="absolute top-20 right-8 text-3xl animate-float-medium select-none opacity-50 pointer-events-none">
        👾
      </div>
      <div className="absolute bottom-12 left-10 text-2xl animate-float-medium select-none opacity-40 pointer-events-none">
        🌸
      </div>
      <div className="absolute bottom-16 right-12 text-3xl animate-float-slow select-none opacity-40 pointer-events-none">
        💖
      </div>

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-8 z-10 relative">
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200/90 shadow-2xs">
          <Gamepad2 className="w-4 h-4 text-pink-600" />
          <span>Interactive Mini-Games</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-universe-text font-serif">
          Our Little Arcade 🕹️💗
        </h2>
        <p className="text-sm sm:text-base text-universe-text/80">
          Four fun, playful games built to bring laughter, sweet notes, and birthday surprises!
        </p>
      </div>

      {/* Cute Arcade Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 z-10 relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'btn-pink-glow shadow-glow-pink scale-105 border border-pink-300'
                  : 'bg-white/85 text-universe-text border border-pink-200/90 hover:bg-pink-100/70 hover:scale-102 shadow-2xs'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="transition-all duration-300 z-10 relative">
        {activeTab === 'catch' && <CatchMyHeartsGame />}
        {activeTab === 'hidden' && (
          <HiddenHeartsGame hiddenHearts={birthdayConfig.hiddenHearts} />
        )}
        {activeTab === 'quiz' && (
          <MemoryQuizGame
            questions={birthdayConfig.quizQuestions}
            girlfriendName={birthdayConfig.girlfriendName}
          />
        )}
        {activeTab === 'unlock' && (
          <UnlockGiftGame girlfriendName={birthdayConfig.girlfriendName} />
        )}
      </div>
    </section>
  );
};

export default GamesSection;
