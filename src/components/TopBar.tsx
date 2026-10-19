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
    <header className="w-full flex items-center justify-between gap-8 px-6 md:px-12 py-5 border-b border-white/10 bg-[#070709]/90 backdrop-blur-md select-none">
      {/* Zone 1: Brand wordmark (single line, no pills) */}
      <a
        href="/"
        className="font-editorial-serif text-xl sm:text-2xl tracking-wide text-white whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
      >
        KINETIC <span className="text-neutral-500 font-light text-base sm:text-lg">· Gallery</span>
      </a>

      {/* Zone 2: 4-5 single-line nav links with subtle hover underlines */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-editorial-display tracking-[0.2em] uppercase text-neutral-400">
        <button
          onClick={onOpenIndex}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Index
        </button>
        <button
          onClick={onOpenExhibition}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Curator Notes
        </button>
        <button
          onClick={onOpenAbout}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          About Exhibition
        </button>
      </nav>

      {/* Zone 3: 1 Primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenAbout}
          className="px-4 py-2 text-xs font-editorial-display tracking-widest uppercase text-neutral-950 bg-white hover:bg-neutral-200 rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs font-medium"
        >
          Inquire / Catalog
        </button>
      </div>
    </header>
  );
};
