import React, { useState } from 'react';
import { GALLERY_ITEMS } from './data/galleryItems';
import { GalleryItem } from './types/gallery';
import { TopBar } from './components/TopBar';
import { ImageGallery } from './components/ImageGallery';
import { FooterBar } from './components/FooterBar';
import { AboutModal } from './components/AboutModal';
import { IndexOverviewModal } from './components/IndexOverviewModal';

export default function App() {
  const [items] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  const handleSelectFromIndex = (item: GalleryItem, index: number) => {
    setTargetIndex(index);
    setIsIndexOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Top Bar Navigation */}
      <TopBar
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenExhibition={() => setIsAboutOpen(true)}
        onOpenIndex={() => setIsIndexOpen(true)}
      />

      {/* Main Exhibition Stage */}
      <main className="flex-1 flex flex-col justify-center relative w-full overflow-hidden py-4 sm:py-6">
        {/* Subtle Understated Editorial Header Header Text */}
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 mb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2 select-none">
          <div>
            <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400">
              Nocturne Transit · Automotive Study
            </div>
            <h1 className="font-editorial-serif text-2xl sm:text-3xl text-neutral-900 font-normal tracking-tight mt-0.5">
              Kinetic Spatial Gallery
            </h1>
          </div>
          <div className="text-right sm:text-right">
            <span className="font-editorial-display text-xs text-neutral-400 font-light tracking-wide">
              Perspective Distortion & Diagonal Typography
            </span>
          </div>
        </div>

        {/* 3D Image Slider with Kinetic Typography */}
        <ImageGallery
          items={items}
          externalTargetIndex={targetIndex}
          onClearExternalTarget={() => setTargetIndex(null)}
        />
      </main>

      {/* Minimal Footer */}
      <FooterBar totalItems={items.length} />

      {/* About & Curatorial Statement Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        items={items}
      />

      {/* Catalog Index Modal */}
      <IndexOverviewModal
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        items={items}
        onSelectItem={handleSelectFromIndex}
      />
    </div>
  );
}
