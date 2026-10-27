import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Trophy, Sparkles, Heart, Timer } from 'lucide-react';
import sound from '../../services/audio';
import { triggerPinkConfetti, triggerCelebrationExplosion } from '../../lib/confetti';
import { apiService } from '../../services/api';

interface FallingHeart {
  id: number;
  x: number; // percentage (8 to 88)
  y: number; // percentage (-8 to 105)
  speed: number;
  char: string;
  points: number;
  size: number;
}

interface FloatingScorePopup {
  id: number;
  x: number;
  y: number;
  text: string;
}

export const CatchMyHeartsGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [popups, setPopups] = useState<FloatingScorePopup[]>([]);
  const [milestone10, setMilestone10] = useState<boolean>(false);
  const [milestone20, setMilestone20] = useState<boolean>(false);

  const requestRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const nextHeartId = useRef<number>(1);
  const nextPopupId = useRef<number>(1);
  const lastTimeRef = useRef<number>(performance.now());
  const lastSpawnRef = useRef<number>(performance.now());

  // Spawn new cute falling hearts & treats
  const spawnHeart = useCallback(() => {
    const chars = ['💖', '💗', '🍓', '🧁', '🎀', '🧸', '✨'];
    const selectedChar = chars[Math.floor(Math.random() * chars.length)];
    const isSpecial = selectedChar === '🍓' || selectedChar === '🧁' || selectedChar === '🧸';

    const newHeart: FallingHeart = {
      id: nextHeartId.current++,
      x: Math.random() * 80 + 10,
      y: -6,
      speed: Math.random() * 22 + 28, // speed in % per second
      char: selectedChar,
      points: isSpecial ? 2 : 1,
      size: isSpecial ? 36 : Math.random() * 8 + 30,
    };

    setHearts((prev) => [...prev.slice(-18), newHeart]);
  }, []);

  // Frame-rate independent delta-time game loop (glitch-free 60fps on all devices)
  useEffect(() => {
    if (!isPlaying || isPaused || isGameOver) return;

    lastTimeRef.current = performance.now();
    lastSpawnRef.current = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.08);
      lastTimeRef.current = currentTime;

      // Spawn every 650ms smoothly
      if (currentTime - lastSpawnRef.current > 650) {
        spawnHeart();
        lastSpawnRef.current = currentTime;
      }

      // Smooth physics position update
      setHearts((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((h) => ({ ...h, y: h.y + h.speed * dt }))
          .filter((h) => h.y < 105);
      });

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, isPaused, isGameOver, spawnHeart]);

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || isPaused || isGameOver) return;

    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, isPaused, isGameOver]);

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    sound.playCelebration();
    triggerCelebrationExplosion();

    apiService.recordScore('catch-hearts', score);
    apiService.updateProgress('catch-hearts', true);
  };

  const startGame = () => {
    sound.playPop();
    setScore(0);
    setTimeLeft(30);
    setHearts([]);
    setPopups([]);
    setIsGameOver(false);
    setIsPaused(false);
    setMilestone10(false);
    setMilestone20(false);
    setIsPlaying(true);
  };

  const togglePause = () => {
    sound.playPop();
    setIsPaused((prev) => !prev);
  };

  // Glitch-free pointer collection (zero 300ms mobile touch delay)
  const collectHeart = (id: number, points: number, x: number, y: number) => {
    sound.playPop();

    // Remove heart immediately
    setHearts((prev) => prev.filter((h) => h.id !== id));

    // Spawn floating score popup
    const popupId = nextPopupId.current++;
    setPopups((prev) => [
      ...prev,
      { id: popupId, x, y, text: points > 1 ? `+${points} Super! 🍓` : `+${points} 💖` },
    ]);

    // Auto-remove popup after animation
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 700);

    // Update score
    setScore((prevScore) => {
      const newScore = prevScore + points;

      if (newScore >= 10 && !milestone10) {
        setMilestone10(true);
        triggerPinkConfetti();
        sound.playChime();
      }
      if (newScore >= 20 && !milestone20) {
        setMilestone20(true);
        triggerCelebrationExplosion();
        sound.playCelebration();
      }

      return newScore;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-2xl sm:rounded-[2rem] p-4 sm:p-7 shadow-2xl border-2 border-pink-200/90 relative overflow-hidden">
      {/* Decorative Corner Decals */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-300/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-300/20 rounded-full blur-xl pointer-events-none" />

      {/* ========================================================= */}
      {/* 1. CLEAN ALIGNED HEADER & BALANCED BADGES                 */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dashed border-pink-200/80 pb-3 sm:pb-4 mb-3 sm:mb-4 gap-2.5 sm:gap-3">
        <div>
          <h3 className="text-lg sm:text-2xl font-bold text-universe-text font-serif flex items-center space-x-2">
            <span>Catch My Hearts 💗</span>
            <span className="text-xs sm:text-sm bg-pink-100 text-pink-700 px-2 sm:px-2.5 py-0.5 rounded-full font-sans font-bold">
              Minigame
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-universe-text/75 mt-0.5">
            Tap the falling treats to catch all my love before time runs out!
          </p>
        </div>

        {/* Flawlessly Aligned Twin Badges (Identical Height & Styling) */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {/* Score Badge */}
          <div className="h-8 sm:h-9 px-3 sm:px-3.5 rounded-full bg-pink-100/90 text-pink-700 font-bold text-xs sm:text-sm border border-pink-200/90 flex items-center space-x-1.5 shadow-2xs">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-pink-500 text-pink-500 animate-pulse" />
            <span>Score: <span className="text-pink-900 font-extrabold">{score}</span></span>
          </div>

          {/* Timer Badge */}
          <div className="h-8 sm:h-9 px-3 sm:px-3.5 rounded-full bg-rose-100/90 text-rose-700 font-bold text-xs sm:text-sm border border-rose-200/90 flex items-center space-x-1.5 shadow-2xs">
            <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />
            <span>Time: <span className="text-rose-900 font-extrabold">{timeLeft}s</span></span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CUTE DREAMY ARCADE PLAY ARENA                          */}
      {/* ========================================================= */}
      <div className="relative w-full h-[340px] sm:h-96 rounded-2xl bg-gradient-to-b from-[#FFF5FA] via-[#FFF9FC] to-[#FFE9F3] border-2 border-dashed border-pink-300 shadow-inner overflow-hidden select-none touch-none">
        {/* Soft Dreamy Pastel Clouds at Bottom */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-pink-200/50 to-transparent pointer-events-none flex items-end justify-center pb-1">
          <span className="text-[11px] font-bold text-pink-600/70 tracking-wider uppercase font-sans">
            🌸 Catch them before they drift away 🌸
          </span>
        </div>

        {/* Falling Hearts & Treats */}
        {hearts.map((h) => (
          <button
            key={h.id}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              collectHeart(h.id, h.points, h.x, h.y);
            }}
            aria-label="Collect sweet treat"
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform active:scale-135 hover:scale-115 select-none outline-none filter drop-shadow-sm"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              fontSize: `${h.size}px`,
              lineHeight: 1,
            }}
          >
            {h.char}
          </button>
        ))}

        {/* Floating +1 / +2 Popups */}
        {popups.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: 0, scale: 0.9 }}
            animate={{ opacity: 0, y: -35, scale: 1.25 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="absolute -translate-x-1/2 pointer-events-none z-30 font-black text-rose-600 text-sm sm:text-base drop-shadow-md select-none font-sans"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.text}
          </motion.div>
        ))}

        {/* START / INTRO OVERLAY */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6 text-center space-y-3 sm:space-y-4 z-20">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="text-5xl sm:text-6xl drop-shadow-md select-none"
            >
              💖
            </motion.div>
            <h4 className="text-xl sm:text-3xl font-extrabold text-universe-text font-serif">
              Ready to Catch Some Love?
            </h4>
            <p className="text-xs sm:text-sm text-universe-text/80 max-w-sm leading-relaxed px-2">
              Sweet treats will fall from above. Tap as many as you can in 30 seconds! Reach 10 & 20 points for surprises!
            </p>
            <button
              onClick={startGame}
              className="btn-pink-glow px-7 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base flex items-center space-x-2.5 shadow-glow-pink cursor-pointer active:scale-95 transition-transform"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
              <span>Start Game ✨</span>
            </button>
          </div>
        )}

        {/* PAUSE OVERLAY */}
        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3 z-20">
            <h4 className="text-2xl font-bold text-universe-text font-serif">Game Paused ⏸️</h4>
            <p className="text-xs text-universe-text/75">Take a breather, Cutu!</p>
            <button
              onClick={togglePause}
              className="btn-pink-glow px-6 py-2.5 rounded-full font-bold text-sm shadow-md cursor-pointer"
            >
              Resume Catching
            </button>
          </div>
        )}

        {/* GAME OVER CELEBRATION SCREEN */}
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-white/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3 z-30"
          >
            <Trophy className="w-14 h-14 text-amber-500 animate-bounce drop-shadow" />
            <h4 className="text-2xl sm:text-3xl font-black text-universe-text font-serif">
              Amazing Catch, Princess! 🎉
            </h4>
            <p className="text-base sm:text-lg text-pink-700 font-extrabold">
              You collected <span className="text-2xl text-rose-600">{score}</span> sweet treats!
            </p>
            <p className="text-xs sm:text-sm text-universe-text/80 max-w-sm leading-relaxed">
              {score >= 20
                ? '🌟 Incredible! You caught every ounce of love in this galaxy! A master heart collector!'
                : score >= 10
                ? "💖 Wonderful job! You've captured so much warmth and happiness today!"
                : '✨ Sweet effort! Every single heart you caught was filled with love for you!'}
            </p>
            <button
              onClick={startGame}
              className="btn-pink-glow px-8 py-3 rounded-full font-bold text-sm sm:text-base flex items-center space-x-2 mt-2 shadow-glow-pink cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again 🎀</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. MILESTONE SURPRISE ALERT BANNER                        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {milestone10 && !isGameOver && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100 border border-pink-300 text-pink-900 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>
              {milestone20
                ? "🌟 20+ Hearts! You are the absolute queen of my heart! 👑"
                : "💖 Milestone: 10 Hearts Reached! You've captured my whole heart!"}
            </span>
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 4. GAME PLAY CONTROLS (Pause / Restart)                   */}
      {/* ========================================================= */}
      {isPlaying && !isGameOver && (
        <div className="flex items-center justify-center space-x-3 mt-4">
          <button
            onClick={togglePause}
            className="px-5 py-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 border border-pink-300 shadow-2xs cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
          <button
            onClick={startGame}
            className="px-5 py-2 rounded-full bg-white text-universe-text hover:bg-pink-50 text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 border border-pink-300 shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CatchMyHeartsGame;
