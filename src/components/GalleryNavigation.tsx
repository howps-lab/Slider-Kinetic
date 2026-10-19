import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Compass } from 'lucide-react';

interface GalleryNavigationProps {
  currentIndex: number;
  totalItems: number;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  onFeaturedOpen: () => void;
}

export const GalleryNavigation: React.FC<GalleryNavigationProps> = ({
  currentIndex,
  totalItems,
  isAutoPlay,
  onToggleAutoPlay,
  onPrev,
  onNext,
  onSelectIndex,
  onFeaturedOpen,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-6xl mx-auto px-6 py-3 select-none">
      {/* Left: Numerical Index Counter with Tabular Figures */}
      <div className="flex items-center gap-3">
        <span className="font-editorial-display font-medium text-lg tracking-tight text-white tabular-nums">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-neutral-600 font-light">/</span>
        <span className="font-editorial-display font-light text-sm text-neutral-400 tabular-nums">
          {String(totalItems).padStart(2, '0')}
        </span>
        <span className="text-neutral-700 mx-1">·</span>
        <button
          onClick={onFeaturedOpen}
          className="text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          View Fullscreen [Space]
        </button>
      </div>

      {/* Center: Subtle Step Dots / Indices */}
      <div className="hidden sm:flex items-center gap-2">
        {Array.from({ length: totalItems }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectIndex(idx)}
            className={`transition-all duration-300 cursor-pointer h-1 rounded-full ${
              idx === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-neutral-700 hover:bg-neutral-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Right: Discrete Control Affordances */}
      <div className="flex items-center gap-2">
        {/* Autoplay Drift Toggle */}
        <button
          onClick={onToggleAutoPlay}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 rounded-sm border border-white/10 transition-colors cursor-pointer"
          title={isAutoPlay ? 'Pause continuous drift' : 'Resume continuous drift'}
        >
          {isAutoPlay ? (
            <>
              <Pause className="w-3 h-3 text-rose-400" />
              <span>DRIFTING</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-neutral-400" />
              <span>PAUSED</span>
            </>
          )}
        </button>

        {/* Prev / Next Buttons */}
        <div className="flex items-center border border-white/10 rounded-sm overflow-hidden bg-neutral-900/90 shadow-2xs">
          <button
            onClick={onPrev}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors border-r border-white/10 cursor-pointer"
            aria-label="Previous image"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Next image"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
