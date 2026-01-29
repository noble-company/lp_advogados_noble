import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Media, MediaRenderer } from "./MediaRenderer";

interface MediaCarouselProps {
  media: Media[];
}

export const MediaCarousel = ({ media }: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || media.length === 0) {
    return null;
  }

  const currentMedia = media[currentIndex];
  const hasMultipleMedia = media.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative mb-4 -mx-6 md:-mx-8 -mt-6 md:-mt-8 rounded-t-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <MediaRenderer media={currentMedia} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {hasMultipleMedia && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Mídia anterior"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-black" />
          </button>

          <button
            onClick={goToNext}
            className="absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Próxima mídia"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-black" />
          </button>
        </>
      )}

      {/* Indicators - Hidden on mobile */}
      {hasMultipleMedia && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 hidden md:flex gap-2">
          {media.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 w-2 hover:bg-white/70"
              }`}
              aria-label={`Ir para mídia ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}

      {/* Media Type Badge */}
      {hasMultipleMedia && (
        <div className="absolute top-3 right-3 z-10 rounded-lg bg-black/70 px-3 py-1 text-xs font-semibold text-white">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  );
};
