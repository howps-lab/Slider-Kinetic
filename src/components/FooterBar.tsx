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
    <footer className="w-full px-6 md:px-12 py-4 border-t border-black/5 bg-[#fafafa] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono tracking-wider text-neutral-500 select-none">
      {/* Left: Collection metadata */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-900 font-medium">{collectionName}</span>
        <span aria-hidden="true" className="text-neutral-300">·</span>
        <span>2026 ARCHIVAL COLLECTION</span>
      </div>

      {/* Center: Subtle interaction guide */}
      <div className="hidden md:flex items-center gap-2 text-neutral-400">
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
        <span className="tabular-nums font-medium text-neutral-900">{String(totalItems).padStart(2, '0')}</span>
        <span>PLATES ON EXHIBIT</span>
      </div>
    </footer>
  );
};
