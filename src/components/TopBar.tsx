import React from 'react';

interface TopBarProps {
  onOpenAbout: () => void;
  onOpenExhibition: () => void;
  onOpenIndex: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenAbout,
  onOpenExhibition,
  onOpenIndex,
}) => {
  return (
    <header className="w-full flex items-center justify-between gap-8 px-6 md:px-12 py-5 border-b border-black/5 bg-[#fafafa]/90 backdrop-blur-xs select-none">
      {/* Zone 1: Brand wordmark (single line, no pills) */}
      <a
        href="/"
        className="font-editorial-serif text-xl sm:text-2xl tracking-wide text-neutral-900 whitespace-nowrap shrink-0 hover:opacity-75 transition-opacity"
      >
        KINETIC <span className="text-neutral-400 font-light text-base sm:text-lg">· Gallery</span>
      </a>

      {/* Zone 2: 4-5 single-line nav links with subtle hover underlines */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-editorial-display tracking-[0.2em] uppercase text-neutral-600">
        <button
          onClick={onOpenIndex}
          className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Index
        </button>
        <button
          onClick={onOpenExhibition}
          className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Curator Notes
        </button>
        <button
          onClick={onOpenAbout}
          className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          About Exhibition
        </button>
      </nav>

      {/* Zone 3: 1 Primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenAbout}
          className="px-4 py-2 text-xs font-editorial-display tracking-widest uppercase text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        >
          Inquire / Catalog
        </button>
      </div>
    </header>
  );
};
