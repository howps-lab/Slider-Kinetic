import React from 'react';

interface FooterBarProps {
  totalItems: number;
  collectionName?: string;
}

export const FooterBar: React.FC<FooterBarProps> = ({
  totalItems,
  collectionName = 'SERIES IV: NOCTURNE TRANSIT',
}) => {
  return (
    <footer className="w-full px-6 md:px-12 py-4 border-t border-white/10 bg-[#070709] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono tracking-wider text-neutral-400 select-none">
      {/* Left: Collection metadata */}
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">{collectionName}</span>
        <span aria-hidden="true" className="text-neutral-700">·</span>
        <span className="text-neutral-400">2026 ARCHIVAL COLLECTION</span>
      </div>

      {/* Center: Subtle interaction guide */}
      <div className="hidden md:flex items-center gap-2 text-neutral-500">
        <span>DRAG TRACK</span>
        <span aria-hidden="true">·</span>
        <span>SCROLL WHEEL</span>
        <span aria-hidden="true">·</span>
        <span>[← / →] KEYS</span>
        <span aria-hidden="true">·</span>
        <span>CLICK CARD TO EXPAND</span>
      </div>

      {/* Right: Plate Count */}
      <div className="flex items-center gap-2">
        <span className="tabular-nums font-medium text-white">{String(totalItems).padStart(2, '0')}</span>
        <span className="text-neutral-400">PLATES ON EXHIBIT</span>
      </div>
    </footer>
  );
};
