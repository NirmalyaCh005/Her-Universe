import React, { useState, useEffect } from 'react';
import { Sparkles, Cake, Heart, Gamepad2, Gift, Camera, Candy } from 'lucide-react';
import sound from '../../services/audio';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'birthday', label: 'Cake', icon: <Cake className="w-4 h-4" /> },
  { id: 'letter', label: 'Letter', icon: <Heart className="w-4 h-4" /> },
  { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
  { id: 'chocolate', label: 'Treat', icon: <Candy className="w-4 h-4" /> },
  { id: 'gallery', label: 'Gallery', icon: <Camera className="w-4 h-4" /> },
  { id: 'reveal', label: 'Gift', icon: <Gift className="w-4 h-4" /> },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check which section is in view
      const sectionElements = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sound.playPop();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-pink-100/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Pill Navigation Dock (Bottom for Mobile, Top/Center for Desktop) */}
      <nav
        aria-label="Universe Navigation"
        className="fixed bottom-2.5 sm:bottom-auto sm:top-4 left-1/2 -translate-x-1/2 z-40 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/90 backdrop-blur-md border border-pink-200/90 rounded-full shadow-lg shadow-pink-100/60 max-w-[96vw] sm:max-w-none transition-all"
      >
        <ul className="flex items-center space-x-0.5 sm:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  aria-label={`Scroll to ${item.label}`}
                  className={`flex items-center space-x-1 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm scale-105'
                      : 'text-universe-text/80 hover:text-pink-600 hover:bg-pink-50/80'
                  }`}
                >
                  <span className={isActive ? 'animate-pulse' : ''}>{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
