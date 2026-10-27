import React, { useEffect, useState } from 'react';
import { birthdayConfig } from './config/birthdayConfig';
import FloatingParticles from './components/animations/FloatingParticles';
import AudioControl from './components/navigation/AudioControl';
import Navbar from './components/navigation/Navbar';
import HeroSection from './components/layout/HeroSection';
import BirthdaySection from './components/birthday/BirthdaySection';
import LoveLetter from './components/birthday/LoveLetter';
import GamesSection from './components/games/GamesSection';
import CadburyFuseSection from './components/gifts/CadburyFuseSection';
import GallerySection from './components/birthday/GallerySection';
import ComplimentsSection from './components/birthday/ComplimentsSection';
import OpenWhenLetters from './components/birthday/OpenWhenLetters';
import FinalRevealSection from './components/birthday/FinalRevealSection';
import { apiService } from './services/api';

export const App: React.FC = () => {
  const [config, setConfig] = useState(birthdayConfig);

  useEffect(() => {
    // Attempt to load birthday status or any server-overridden messages
    const initApp = async () => {
      try {
        await apiService.getBirthdayInfo();
        await apiService.getProgress();
      } catch {
        // App will operate smoothly on local config
      }
    };
    initApp();
  }, []);

  const handleExplore = () => {
    const el = document.getElementById('birthday');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReplay = () => {
    const el = document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReadLetter = () => {
    const el = document.getElementById('letter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5FA] text-[#54243B] overflow-x-hidden">
      {/* Background Floating Hearts & Particles */}
      <FloatingParticles count={24} />

      {/* Music / Audio Controller */}
      <AudioControl
        customAudioUrl={config.music.customAudioUrl}
        youtubeUrl={config.music.youtubeUrl}
      />

      {/* Floating Pill Navigation Dock */}
      <Navbar />

      {/* 1. Hero Section: Magical Entrance & 3D Teddy Bear */}
      <HeroSection
        girlfriendName={config.girlfriendName}
        subheading={config.subheading}
        onExplore={handleExplore}
      />

      {/* 2. Birthday Celebration Section: 3D Cake & Candle Wish */}
      <BirthdaySection
        girlfriendName={config.girlfriendName}
        birthdayWish={config.birthdayWish}
        birthdaySecondaryWish={config.birthdaySecondaryWish}
      />

      {/* 3. Love Letter Experience: Wax-Sealed Envelope */}
      <LoveLetter loveLetter={config.loveLetter} />

      {/* 4. Arcade Section: 4 Interactive Mini-Games */}
      <GamesSection birthdayConfig={config} />

      {/* 5. Cadbury Fuse Chocolate Surprise: 3D Chocolate Bar */}
      <CadburyFuseSection chocolateSurprise={config.chocolateSurprise} />

      {/* 6. Romantic Scrapbook Gallery */}
      <GallerySection photos={config.galleryPhotos} />

      {/* 7. Reasons You Are Special: 3D Flippable Cards */}
      <ComplimentsSection compliments={config.compliments} />

      {/* 8. Open-When Letters: Comfort Envelopes */}
      <OpenWhenLetters letters={config.openWhenLetters} />

      {/* 9. Final Birthday Reveal & Replay */}
      <FinalRevealSection
        finalReveal={config.finalReveal}
        myName={config.myName}
        onReplay={handleReplay}
        onReadLetter={handleReadLetter}
      />
    </div>
  );
};

export default App;
