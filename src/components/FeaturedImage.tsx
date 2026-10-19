import React, { useEffect, useState } from 'react';
import { GalleryItem } from '../types/gallery';
import { KineticTypography } from './KineticTypography';
import { X, ChevronLeft, ChevronRight, Info, Maximize2, Minimize2 } from 'lucide-react';

interface FeaturedImageProps {
  item: GalleryItem;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  totalItems: number;
  currentIndex: number;
}

export const FeaturedImage: React.FC<FeaturedImageProps> = ({
  item,
  isOpen,
  onClose,
  onNext,
  onPrev,
  totalItems,
  currentIndex,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animState, setAnimState] = useState<'entering' | 'active' | 'exiting'>('entering');

  useEffect(() => {
    if (isOpen) {
      setAnimState('entering');
      const timer = setTimeout(() => {
        setAnimState('active');
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimState('exiting');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  const isTransitioning = animState === 'entering';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 transition-colors duration-700 ${
        isTransitioning ? 'bg-black/0 backdrop-blur-none' : 'bg-black/90 backdrop-blur-md'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Featured view of ${item.title}`}
    >
      {/* Background click overlay to dismiss */}
      <div
        className="absolute inset-0 cursor-zoom-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Zoomed Featured Container: smooth FLIP expansion */}
      <div
        className={`relative z-10 w-full max-w-6xl h-[82vh] md:h-[88vh] bg-neutral-950 rounded-sm overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between ${
          isTransitioning
            ? 'scale-90 opacity-0 translate-y-6 rotate-1'
            : 'scale-100 opacity-100 translate-y-0 rotate-0'
        }`}
        style={{
          boxShadow: '0 30px 100px -20px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full fidelity image background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
          />
          {/* Subtle multi-layer cinematic vignette & gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
        </div>

        {/* Coordinated Kinetic Typography in Featured State */}
        <KineticTypography
          item={item}
          isActive={true}
          isFeatured={true}
        />

        {/* Top Floating Controls Bar */}
        <div className="relative z-40 flex items-center justify-between p-4 sm:p-6 pointer-events-auto">
          {/* Index Counter */}
          <div className="flex items-center gap-2 text-white/80 font-mono text-xs tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xs border border-white/10">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/40">/</span>
            <span>{String(totalItems).padStart(2, '0')}</span>
            <span className="hidden sm:inline text-white/40 ml-2">·</span>
            <span className="hidden sm:inline text-white/60 uppercase">{item.series}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-mono tracking-wider flex items-center gap-1.5 rounded-xs bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/60 transition-colors"
              title="Toggle Exhibition Details"
              aria-label="Toggle Exhibition Details"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">EXIF & ESSAY</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xs bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/60 transition-colors"
              title="Fullscreen"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xs bg-white text-neutral-900 hover:bg-neutral-200 transition-colors ml-2 shadow-lg"
              title="Close (Esc)"
              aria-label="Close featured view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side Navigation Arrows for Immediate Slide Surfing */}
        <div className="relative z-40 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
          <button
            onClick={onPrev}
            className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/80 hover:scale-110 transition-all pointer-events-auto"
            aria-label="Previous artwork"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/80 hover:scale-110 transition-all pointer-events-auto"
            aria-label="Next artwork"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Empty bottom spacer to anchor typography */}
        <div className="h-16" />

        {/* Expandable Exhibition Details Drawer / Overlay */}
        {showDetails && (
          <div className="absolute bottom-0 inset-x-0 z-50 p-6 md:p-8 bg-neutral-950/95 backdrop-blur-xl border-t border-white/15 text-white animate-in slide-in-from-bottom duration-300">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-rose-400">
                  Curator Essay
                </span>
                <p className="font-editorial-display text-sm leading-relaxed text-white/80">
                  {item.curatorNotes}
                </p>
                <div className="pt-2 text-xs text-white/60">
                  Location: <span className="text-white/90 font-medium">{item.location}</span>
                </div>
              </div>
              <div className="space-y-3 border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-6 text-xs font-mono">
                <span className="text-[10px] tracking-widest uppercase text-white/50 block">
                  Technical Specifications
                </span>
                <div className="text-white/80 space-y-1">
                  <div>Capture: {item.exif.split('·')[0]}</div>
                  <div>Optics: {item.exif.split('·')[1]}</div>
                  <div>Shutter / ISO: {item.exif.split('·')[2]} · {item.exif.split('·')[3]}</div>
                </div>
                <div className="pt-2 text-white/40 text-[10px]">
                  Archival Fine Art Inkjet on 310gsm Cotton Rag · Edition of 12
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
