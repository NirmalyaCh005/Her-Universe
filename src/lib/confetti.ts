import confetti from 'canvas-confetti';

export const triggerPinkConfetti = () => {
  try {
    // Left burst
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.8 },
      colors: ['#FFC0D9', '#FF6FAE', '#FF3F8E', '#FFFFFF', '#FFD700'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Right burst
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.8 },
      colors: ['#FFC0D9', '#FF6FAE', '#FF3F8E', '#FFFFFF', '#FFD700'],
      shapes: ['circle'],
      scalar: 1.2,
    });
  } catch {
    // In headless or unsupported environments
  }
};

export const triggerCelebrationExplosion = () => {
  try {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#FFC0D9', '#FF6FAE', '#FF3F8E', '#FFD700', '#51247A', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // In headless environments
  }
};
