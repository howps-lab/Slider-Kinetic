import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GalleryItem } from '../types/gallery';
import { GalleryCard } from './GalleryCard';
import { GalleryNavigation } from './GalleryNavigation';
import { FeaturedImage } from './FeaturedImage';

interface ImageGalleryProps {
  items: GalleryItem[];
  externalTargetIndex?: number | null;
  onClearExternalTarget?: () => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  items,
  externalTargetIndex,
  onClearExternalTarget,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  // Spacing between cards (px)
  const CARD_GAP = 90;

  // Compute item widths and cumulative coordinates for 1 base cycle
  const itemPositions = useMemo(() => {
    let currentX = 0;
    const positions: { index: number; x: number; width: number; center: number }[] = [];
    items.forEach((item, idx) => {
      const w = item.width;
      positions.push({
        index: idx,
        x: currentX,
        width: w,
        center: currentX + w / 2,
      });
      currentX += w + CARD_GAP;
    });
    return { positions, totalWidth: currentX };
  }, [items]);

  const { totalWidth } = itemPositions;

  // Track position offset (in pixels)
  // Negative offset means track has moved left
  const offsetRef = useRef<number>(-totalWidth); // Start in middle cycle
  const [displayOffset, setDisplayOffset] = useState<number>(-totalWidth);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);

  // Interaction & autoplay state
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [featuredItem, setFeaturedItem] = useState<GalleryItem | null>(null);

  // Drag physics tracking
  const dragStartRef = useRef<{ x: number; offset: number; time: number }>({
    x: 0,
    offset: 0,
    time: 0,
  });
  const velocityTrackerRef = useRef<{ lastX: number; lastTime: number; velocity: number }>({
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const inertiaAnimRef = useRef<number | null>(null);

  // Keep track of viewport resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update which item is closest to viewport center
  const updateActiveIndex = useCallback(
    (currentOffset: number) => {
      const centerX = viewportWidth / 2;
      // Find which card center in the virtual loop is closest to centerX
      let bestDist = Infinity;
      let bestIndex = 0;

      // Check across the cycles
      for (let cycle = -2; cycle <= 2; cycle++) {
        itemPositions.positions.forEach((pos) => {
          const cardCenterOnScreen = pos.center + cycle * totalWidth + currentOffset;
          const dist = Math.abs(cardCenterOnScreen - centerX);
          if (dist < bestDist) {
            bestDist = dist;
            bestIndex = pos.index;
          }
        });
      }

      setActiveIndex(bestIndex);
    },
    [viewportWidth, itemPositions, totalWidth]
  );

  // Seamless wrap logic to keep offset within a stable range [-2*totalWidth, -totalWidth]
  const normalizeOffset = useCallback(
    (rawOffset: number) => {
      let norm = rawOffset;
      while (norm < -2 * totalWidth) {
        norm += totalWidth;
      }
      while (norm > -totalWidth) {
        norm -= totalWidth;
      }
      return norm;
    },
    [totalWidth]
  );

  // Smooth drift animation frame loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(now - lastTime, 64) / 1000;
      lastTime = now;

      const shouldDrift = isAutoPlay && !isDragging && !isHovered && !featuredItem;

      if (shouldDrift) {
        // Continuous right-to-left drift (~35px per second)
        const driftSpeed = 38;
        const newOffset = normalizeOffset(offsetRef.current - driftSpeed * dt);
        offsetRef.current = newOffset;
        setDisplayOffset(newOffset);
        updateActiveIndex(newOffset);
        setScrollVelocity(-driftSpeed * 0.1);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isAutoPlay, isDragging, isHovered, featuredItem, normalizeOffset, updateActiveIndex]);

  // Center on a specific index
  const scrollToIndex = useCallback(
    (targetIndex: number) => {
      if (inertiaAnimRef.current) cancelAnimationFrame(inertiaAnimRef.current);

      const targetPos = itemPositions.positions[targetIndex];
      if (!targetPos) return;

      const centerX = viewportWidth / 2;
      // Calculate where offset should be so targetPos.center + offset == centerX
      // Choose cycle closest to current offset
      const desiredScreenPos = centerX - targetPos.center;
      let bestOffset = desiredScreenPos;
      let minDiff = Infinity;

      for (let cycle = -3; cycle <= 1; cycle++) {
        const candidate = desiredScreenPos + cycle * totalWidth;
        const diff = Math.abs(candidate - offsetRef.current);
        if (diff < minDiff) {
          minDiff = diff;
          bestOffset = candidate;
        }
      }

      // Smooth interpolation to target
      const startOffset = offsetRef.current;
      const startTime = performance.now();
      const duration = 850;

      const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

      const animateScroll = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / duration);
        const currentEased = easeOutExpo(progress);
        const currentVal = startOffset + (bestOffset - startOffset) * currentEased;

        offsetRef.current = currentVal;
        setDisplayOffset(currentVal);
        updateActiveIndex(currentVal);

        if (progress < 1) {
          inertiaAnimRef.current = requestAnimationFrame(animateScroll);
        } else {
          // Normalize when completed
          const finalNorm = normalizeOffset(currentVal);
          offsetRef.current = finalNorm;
          setDisplayOffset(finalNorm);
        }
      };

      inertiaAnimRef.current = requestAnimationFrame(animateScroll);
    },
    [itemPositions, viewportWidth, totalWidth, normalizeOffset, updateActiveIndex]
  );

  useEffect(() => {
    if (externalTargetIndex !== undefined && externalTargetIndex !== null && items[externalTargetIndex]) {
      scrollToIndex(externalTargetIndex);
      setFeaturedItem(items[externalTargetIndex]);
      onClearExternalTarget?.();
    }
  }, [externalTargetIndex, items, scrollToIndex, onClearExternalTarget]);

  // Pointer / Drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (featuredItem) return;
    if (inertiaAnimRef.current) cancelAnimationFrame(inertiaAnimRef.current);

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      offset: offsetRef.current,
      time: performance.now(),
    };
    velocityTrackerRef.current = {
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const newOffset = dragStartRef.current.offset + deltaX;

    const now = performance.now();
    const dt = now - velocityTrackerRef.current.lastTime;
    if (dt > 10) {
      const dx = e.clientX - velocityTrackerRef.current.lastX;
      velocityTrackerRef.current.velocity = dx / dt;
      velocityTrackerRef.current.lastX = e.clientX;
      velocityTrackerRef.current.lastTime = now;
      setScrollVelocity(dx / dt * 5);
    }

    offsetRef.current = newOffset;
    setDisplayOffset(newOffset);
    updateActiveIndex(newOffset);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    // Apply inertia based on release velocity
    let v = velocityTrackerRef.current.velocity * 300; // px/sec
    if (Math.abs(v) > 50) {
      const startOffset = offsetRef.current;
      const startTime = performance.now();
      const friction = 0.94;

      const stepInertia = () => {
        v *= friction;
        offsetRef.current += v * 0.016;
        const norm = normalizeOffset(offsetRef.current);
        offsetRef.current = norm;
        setDisplayOffset(norm);
        updateActiveIndex(norm);

        if (Math.abs(v) > 5) {
          inertiaAnimRef.current = requestAnimationFrame(stepInertia);
        } else {
          setScrollVelocity(0);
        }
      };
      inertiaAnimRef.current = requestAnimationFrame(stepInertia);
    } else {
      setScrollVelocity(0);
    }
  };

  // Wheel horizontal navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (featuredItem) return;
    e.preventDefault();

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const newOffset = normalizeOffset(offsetRef.current - delta * 0.85);
    offsetRef.current = newOffset;
    setDisplayOffset(newOffset);
    updateActiveIndex(newOffset);
    setScrollVelocity(-delta * 0.1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (featuredItem) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = (activeIndex + 1) % items.length;
        scrollToIndex(nextIdx);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = (activeIndex - 1 + items.length) % items.length;
        scrollToIndex(prevIdx);
      } else if (e.key === ' ') {
        e.preventDefault();
        setFeaturedItem(items[activeIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, items, featuredItem, scrollToIndex]);

  // Handle card click: if already active, open featured; otherwise center it first
  const handleCardClick = (item: GalleryItem, index: number) => {
    if (activeIndex === index) {
      setFeaturedItem(item);
    } else {
      scrollToIndex(index);
    }
  };

  // We render 3 visible cycles: -1, 0, 1 to ensure seamless continuous wrapping across wide screens
  const cycles = [-1, 0, 1];

  return (
    <div
      className="relative w-full h-[620px] md:h-[680px] flex flex-col justify-between overflow-hidden select-none"
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Perspective Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center perspective-1200 cursor-grab active:cursor-grabbing touch-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Continuous Horizontal Track with 3D transform */}
        <div
          className="absolute flex items-center will-change-transform preserve-3d"
          style={{
            transform: `translate3d(${displayOffset}px, 0, 0)`,
          }}
        >
          {cycles.map((cycle) => (
            <div
              key={`cycle-${cycle}`}
              className="flex items-center preserve-3d"
              style={{
                width: `${totalWidth}px`,
                marginRight: `${CARD_GAP}px`,
              }}
            >
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;
                const isNeighbor =
                  idx === (activeIndex + 1) % items.length ||
                  idx === (activeIndex - 1 + items.length) % items.length;

                return (
                  <div
                    key={`${cycle}-${item.id}`}
                    style={{
                      marginRight: `${CARD_GAP}px`,
                    }}
                  >
                    <GalleryCard
                      item={item}
                      isActive={isActive}
                      isNeighbor={isNeighbor}
                      onSelect={() => handleCardClick(item, idx)}
                      scrollVelocity={scrollVelocity}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Ambient Vignette Gradients at Left & Right Viewport Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#070709] via-[#070709]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#070709] via-[#070709]/80 to-transparent z-10" />
      </div>

      {/* Discrete Gallery Navigation Bar */}
      <div className="relative z-20 pb-2">
        <GalleryNavigation
          currentIndex={activeIndex}
          totalItems={items.length}
          isAutoPlay={isAutoPlay}
          onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
          onPrev={() => {
            const prev = (activeIndex - 1 + items.length) % items.length;
            scrollToIndex(prev);
          }}
          onNext={() => {
            const next = (activeIndex + 1) % items.length;
            scrollToIndex(next);
          }}
          onSelectIndex={(idx) => scrollToIndex(idx)}
          onFeaturedOpen={() => setFeaturedItem(items[activeIndex])}
        />
      </div>

      {/* Featured Expanded Modal View (FLIP Zoom Transition) */}
      <FeaturedImage
        item={featuredItem || items[activeIndex]}
        isOpen={!!featuredItem}
        onClose={() => setFeaturedItem(null)}
        onNext={() => {
          const nextIdx = (activeIndex + 1) % items.length;
          setActiveIndex(nextIdx);
          setFeaturedItem(items[nextIdx]);
          scrollToIndex(nextIdx);
        }}
        onPrev={() => {
          const prevIdx = (activeIndex - 1 + items.length) % items.length;
          setActiveIndex(prevIdx);
          setFeaturedItem(items[prevIdx]);
          scrollToIndex(prevIdx);
        }}
        totalItems={items.length}
        currentIndex={activeIndex}
      />
    </div>
  );
};
