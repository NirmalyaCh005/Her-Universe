import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, RotateCw } from 'lucide-react';
import { ComplimentCard } from '../../types';
import sound from '../../services/audio';

interface ComplimentsSectionProps {
  compliments: ComplimentCard[];
}

export const ComplimentsSection: React.FC<ComplimentsSectionProps> = ({ compliments }) => {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  const handleFlipCard = (id: number) => {
    sound.playPop();
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          <span>Little Reminders</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-universe-text font-serif">
          Reasons You Are Special ✨
        </h2>
        <p className="text-sm sm:text-base text-universe-text/80">
          Tap each card to flip and reveal a heartfelt reason why you mean so much.
        </p>
      </div>

      {/* Grid of 3D Flippable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {compliments.map((card, idx) => {
          const isFlipped = flippedIds.includes(card.id);

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => handleFlipCard(card.id)}
              className="h-64 cursor-pointer perspective-1000 select-none"
              style={{ perspective: 1000 }}
            >
              <div
                className={`relative w-full h-full rounded-3xl transition-transform duration-500 transform-style-3d shadow-soft-card border border-pink-200/90 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front of Card */}
                <div
                  className="absolute inset-0 rounded-3xl p-6 glass-card flex flex-col items-center justify-between text-center backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-full flex justify-between items-center text-xs font-bold text-pink-500">
                    <span>#{card.id}</span>
                    <RotateCw className="w-3.5 h-3.5 opacity-60" />
                  </div>

                  <div className="space-y-3">
                    <span className="text-5xl inline-block animate-pulse-soft">
                      {card.emoji}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-universe-text">
                      {card.title}
                    </h3>
                    {card.highlight && (
                      <span className="inline-block px-3 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold">
                        {card.highlight}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-pink-600 font-semibold flex items-center space-x-1">
                    <span>Tap to reveal note</span>
                    <span>→</span>
                  </span>
                </div>

                {/* Back of Card */}
                <div
                  className="absolute inset-0 rounded-3xl p-6 letter-paper flex flex-col items-center justify-between text-center backface-hidden border-2 border-pink-300 shadow-inner"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="w-full flex justify-between items-center text-xs font-bold text-pink-600">
                    <span>With Love 💗</span>
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  </div>

                  <p className="text-sm sm:text-base text-universe-text leading-relaxed font-medium">
                    "{card.message}"
                  </p>

                  <span className="text-xs text-pink-500 font-semibold">
                    Tap to flip back
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ComplimentsSection;
