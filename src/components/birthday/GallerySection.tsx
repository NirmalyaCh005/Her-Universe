import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X, Sparkles, Heart } from 'lucide-react';
import { GalleryPhoto } from '../../types';
import sound from '../../services/audio';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [subImageIndex, setSubImageIndex] = useState<number>(0);

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const handleOpenPhoto = (index: number) => {
    sound.playPop();
    setSelectedPhotoIndex(index);
    setSubImageIndex(0);
  };

  const handleClose = useCallback(() => {
    sound.playPop();
    setSelectedPhotoIndex(null);
    setSubImageIndex(0);
  }, []);

  const handlePrev = useCallback(() => {
    sound.playPop();
    setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
    setSubImageIndex(0);
  }, [photos.length]);

  const handleNext = useCallback(() => {
    sound.playPop();
    setSelectedPhotoIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
    setSubImageIndex(0);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handleClose, handlePrev, handleNext]);

  return (
    <section id="gallery" className="pt-16 sm:pt-20 pb-28 sm:pb-20 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-bold border border-pink-200">
          <Camera className="w-4 h-4 text-pink-600" />
          <span>Our Scrapbook Memories</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-universe-text font-serif">
          Our Little Gallery 📷🌸
        </h2>
        <p className="text-sm sm:text-base text-universe-text/80">
          Sweet snapshots, cozy dates, and unforgettable smiles. Tap any photo to enlarge!
        </p>
      </div>

      {/* Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            style={{ rotate: `${photo.rotation}deg` }}
            onClick={() => handleOpenPhoto(index)}
            className="group relative bg-white p-3.5 pb-6 rounded-2xl shadow-soft-card border border-pink-200/90 cursor-pointer transition-all duration-300 hover:shadow-glow-pink hover:z-20"
          >
            {/* Stacked Polaroid Layer if multiple photos in memory */}
            {photo.images && photo.images.length > 1 && (
              <div className="absolute inset-0 bg-pink-100/70 rounded-2xl rotate-2 -z-10 border border-pink-200/80 shadow-xs pointer-events-none transition-transform group-hover:rotate-3" />
            )}

            {/* Washi Tape Strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-200/80 rounded-sm transform -rotate-1 border-t border-b border-pink-300/50 shadow-xs pointer-events-none" />

            {/* Photo Image Frame - Authentic Polaroid Format */}
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-pink-50 border border-pink-100 flex items-center justify-center">
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/photos/sweet-memory-1.svg';
                }}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${photo.objectPosition || 'object-center'}`}
              />

              {/* Multi-photo badge */}
              {photo.images && photo.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs text-pink-700 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-pink-200/80 flex items-center space-x-1 pointer-events-none z-10">
                  <span>📸</span>
                  <span>{photo.images.length} photos</span>
                </div>
              )}

              <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-pink-700 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  View 🔍
                </span>
              </div>
            </div>

            {/* Photo Metadata & Handwritten Caption */}
            <div className="mt-3 text-center space-y-1">
              <span className="text-[10px] font-bold text-pink-600 tracking-wider uppercase">
                {photo.dateText}
              </span>
              <h4 className="text-base font-serif font-bold text-universe-text">
                {photo.title}
              </h4>
              <p className="text-xs text-universe-text/70 italic font-handwriting text-sm line-clamp-2">
                "{photo.caption}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-pink-300"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display - Adapts to Portrait & Landscape without Cropping */}
              <div className="relative max-h-[68vh] w-full rounded-2xl overflow-hidden bg-pink-50/70 border border-pink-200 flex flex-col items-center justify-center p-2">
                <img
                  src={
                    selectedPhoto.images && selectedPhoto.images[subImageIndex]
                      ? selectedPhoto.images[subImageIndex]
                      : selectedPhoto.url
                  }
                  alt={selectedPhoto.title}
                  className="max-h-[58vh] w-auto max-w-full object-contain rounded-xl shadow-sm transition-all duration-300"
                />

                {/* Floating left/right sub-image arrows inside the frame */}
                {selectedPhoto.images && selectedPhoto.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playPop();
                        setSubImageIndex((prev) =>
                          prev > 0 ? prev - 1 : (selectedPhoto.images?.length ?? 1) - 1
                        );
                      }}
                      aria-label="Previous sub photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 hover:bg-white text-pink-700 shadow-md transition-all cursor-pointer hover:scale-110 z-10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playPop();
                        setSubImageIndex((prev) =>
                          prev < (selectedPhoto.images?.length ?? 1) - 1 ? prev + 1 : 0
                        );
                      }}
                      aria-label="Next sub photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 hover:bg-white text-pink-700 shadow-md transition-all cursor-pointer hover:scale-110 z-10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Sub-image toggle selector if memory has multiple photos */}
                {selectedPhoto.images && selectedPhoto.images.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2.5 z-10 flex-wrap">
                    {selectedPhoto.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playPop();
                          setSubImageIndex(idx);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          subImageIndex === idx
                            ? 'bg-pink-600 text-white shadow-md scale-105 ring-2 ring-pink-300'
                            : 'bg-white/90 hover:bg-pink-100 text-pink-800 border border-pink-200 shadow-xs'
                        }`}
                      >
                        <span>{selectedPhoto.imageLabels?.[idx] || `📸 Photo ${idx + 1}`}</span>
                        <span className="text-[10px] opacity-80">({idx + 1}/{selectedPhoto.images?.length})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Caption & Controls */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <div className="flex items-center space-x-2 justify-center sm:justify-start">
                    <span className="text-xs font-bold text-pink-600 tracking-wider uppercase">
                      {selectedPhoto.dateText}
                    </span>
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-universe-text">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm text-universe-text/80 italic mt-0.5">
                    "{selectedPhoto.caption}"
                  </p>
                </div>

                {/* Prev / Next Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="p-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="p-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
