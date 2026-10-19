import React from 'react';
import { GalleryItem } from '../types/gallery';

interface KineticTypographyProps {
  item: GalleryItem;
  isActive: boolean;
  isFeatured: boolean;
  scrollVelocity?: number;
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  item,
  isActive,
  isFeatured,
  scrollVelocity = 0,
}) => {
  const { kinetic } = item;

  // React to dynamic velocity: adds organic momentum displacement
  const dynamicShift = Math.max(-25, Math.min(25, scrollVelocity * 1.5));

  if (isFeatured) {
    // When in featured zoomed mode: typography elevates into a high-impact editorial title lockup
    return (
      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-12 text-white">
        <div className="flex items-center justify-between">
          <span className="font-editorial-display text-xs md:text-sm tracking-[0.3em] uppercase opacity-75">
            {item.series} · {item.year}
          </span>
          <span className="font-mono text-xs tracking-widest opacity-60">
            {item.location}
          </span>
        </div>

        <div className="space-y-2 max-w-2xl">
          <div className="overflow-hidden">
            <h1 className="font-editorial-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700">
              {item.title}
            </h1>
          </div>
          <p className="font-editorial-display text-sm md:text-base text-white/80 font-light tracking-wide max-w-lg drop-shadow">
            {item.subtitle}
          </p>
        </div>

        <div className="flex items-end justify-between border-t border-white/20 pt-4 text-xs md:text-sm text-white/70 font-mono">
          <span>{item.exif}</span>
          <span className="hidden sm:inline tracking-wider uppercase">ARCHIVAL PRINT EDITION</span>
        </div>
      </div>
    );
  }

  // Floating Kinetic Words across the card in regular slider view
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      style={{
        transform: `translate3d(${kinetic.offsetX + dynamicShift}px, ${kinetic.offsetY}px, 40px)`,
      }}
    >
      {/* Primary Kinetic Word: Oversized, diagonal rotation, extending beyond image borders */}
      <div
        className="absolute -top-12 -left-10 select-none whitespace-nowrap transition-transform duration-500 ease-out"
        style={{
          transform: `rotate(${kinetic.angle}deg) scale(${isActive ? kinetic.scale : 0.95})`,
          transformOrigin: 'left center',
        }}
      >
        <span
          className={`font-editorial-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter uppercase transition-all duration-700 block ${
            isActive
              ? 'text-white/95 drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]'
              : 'text-white/20'
          }`}
          style={{
            letterSpacing: '-0.04em',
            WebkitTextStroke: isActive ? '1px rgba(255,255,255,0.3)' : 'none',
          }}
        >
          {kinetic.primaryWord}
        </span>
      </div>

      {/* Secondary Kinetic Word: Opposing diagonal angle, translucent, editorial counterpart */}
      <div
        className="absolute -bottom-8 -right-8 select-none whitespace-nowrap transition-transform duration-700 ease-out"
        style={{
          transform: `rotate(${-kinetic.angle * 0.7}deg) scale(${isActive ? 1.05 : 0.9})`,
          transformOrigin: 'right center',
        }}
      >
        <span
          className={`font-editorial-serif text-3xl sm:text-4xl md:text-5xl italic tracking-wider transition-all duration-700 block ${
            isActive
              ? 'text-rose-500 drop-shadow-[0_5px_20px_rgba(244,63,94,0.4)]'
              : 'text-neutral-500/25'
          }`}
        >
          /{kinetic.secondaryWord.toLowerCase()}
        </span>
      </div>

      {/* Floating editorial phrase ribbon */}
      <div
        className={`absolute bottom-4 left-6 select-none whitespace-nowrap transition-all duration-500 hidden sm:block ${
          isActive ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <span className="font-editorial-display text-[11px] font-medium tracking-[0.25em] uppercase text-neutral-300 bg-neutral-900/90 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-white/10 shadow-lg">
          {kinetic.phrase}
        </span>
      </div>
    </div>
  );
};
