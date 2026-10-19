import React, { useState } from 'react';
import { GalleryItem } from '../types/gallery';
import { KineticTypography } from './KineticTypography';
import { AnimatedStroke } from './AnimatedStroke';

interface GalleryCardProps {
  item: GalleryItem;
  isActive: boolean;
  isNeighbor: boolean;
  onSelect: (item: GalleryItem) => void;
  scrollVelocity?: number;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  isActive,
  isNeighbor,
  onSelect,
  scrollVelocity = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Dynamic 3D transform computation
  const hoverScale = isHovered ? 1.04 : 1;
  const hoverRotateY = isHovered ? item.tilt.rotateY * 0.4 : item.tilt.rotateY;
  const hoverRotateX = isHovered ? item.tilt.rotateX * 0.4 : item.tilt.rotateX;
  const activeElevation = isActive ? 'translateZ(30px)' : 'translateZ(0px)';

  return (
    <div
      className="relative shrink-0 select-none cursor-pointer focus:outline-hidden"
      style={{
        width: `${item.width}px`,
        height: `${item.height}px`,
        marginTop: `${item.verticalOffset}px`,
        transformStyle: 'preserve-3d',
      }}
      onClick={() => onSelect(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      aria-label={`View ${item.title}`}
    >
      {/* 3D Perspective Card Wrapper */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `
            ${activeElevation}
            rotateZ(${item.rotation}deg)
            rotateX(${hoverRotateX}deg)
            rotateY(${hoverRotateY}deg)
            skewX(${item.tilt.skewX}deg)
            scale(${hoverScale})
          `,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated Curved Vector Line connecting card and text */}
        <AnimatedStroke
          path={item.curvePath}
          isActive={isActive || isHovered}
          angle={item.kinetic.angle}
        />

        {/* Kinetic Typography Layer */}
        <KineticTypography
          item={item}
          isActive={isActive}
          isFeatured={false}
          scrollVelocity={scrollVelocity}
        />

        {/* Photographed Artwork Frame */}
        <div
          className={`relative w-full h-full overflow-hidden bg-neutral-950 rounded-sm transition-all duration-700 ${
            isActive
              ? 'shadow-2xl shadow-black/95 ring-1 ring-white/25'
              : 'shadow-xl shadow-black/70 ring-1 ring-white/10 opacity-75 hover:opacity-100'
          }`}
          style={{
            transform: 'translateZ(10px)',
          }}
        >
          {imgError ? (
            /* Resilient Fallback Container */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-800 to-neutral-950 text-white text-center">
              <span className="font-editorial-serif text-2xl mb-1">{item.title}</span>
              <span className="font-editorial-display text-xs tracking-widest text-neutral-400 uppercase">
                {item.series}
              </span>
            </div>
          ) : (
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1.01)',
              }}
              loading="lazy"
            />
          )}

          {/* Cinematic lighting gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Ambient card label overlay (subtle bottom strip) */}
          <div className="absolute bottom-0 inset-x-0 p-3.5 flex items-end justify-between pointer-events-none text-white/90">
            <div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-white/60">
                {item.year} · {item.location.split(',')[0]}
              </div>
              <div className="font-editorial-display text-xs sm:text-sm font-medium tracking-tight">
                {item.title}
              </div>
            </div>
            <div className="text-[9px] font-mono tracking-widest text-white/50 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/10">
              EXPAND
            </div>
          </div>

          {/* Specular sheen effect on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-500 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
