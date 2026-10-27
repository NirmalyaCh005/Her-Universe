import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  char: string;
  opacity: number;
}

export const FloatingParticles: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const particles: Particle[] = useMemo(() => {
    const chars = ['💗', '✨', '🌸', '💖', '⭐', '🎀'];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.random() * 14 + 10, // 10px to 24px
      duration: Math.random() * 12 + 10, // 10s to 22s
      delay: Math.random() * 10,
      char: chars[Math.floor(Math.random() * chars.length)],
      opacity: Math.random() * 0.4 + 0.25, // 0.25 to 0.65
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${p.left}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.char}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
