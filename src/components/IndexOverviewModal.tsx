import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { GalleryItem } from '../types/gallery';

interface IndexOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  onSelectItem: (item: GalleryItem, index: number) => void;
}

export const IndexOverviewModal: React.FC<IndexOverviewModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Exhibition Catalog Index"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-5xl max-h-[88vh] overflow-y-auto bg-[#0d0d10] rounded-sm shadow-2xl p-6 sm:p-10 text-neutral-100 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
              Archival Index
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl text-white mt-1">
              Plates in Exhibition
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close index"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-in-a-row or 2-in-a-row grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectItem(item, index);
                onClose();
              }}
              className="group cursor-pointer border border-white/10 hover:border-white/30 rounded-sm p-3 transition-all duration-300 hover:shadow-2xl bg-neutral-950/70 hover:bg-neutral-900/80"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-900 rounded-xs mb-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-xs border border-white/10">
                  PLATE {String(index + 1).padStart(2, '0')}
                </div>
                <div className="absolute bottom-2 right-2 font-editorial-serif text-rose-400 text-xs tracking-wider opacity-90 drop-shadow">
                  {item.kinetic.primaryWord}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial-serif text-lg text-white group-hover:text-rose-400 transition-colors">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="font-editorial-display text-xs text-neutral-400 truncate">
                  {item.subtitle}
                </p>
                <div className="pt-2 text-[10px] font-mono text-neutral-500 flex items-center justify-between border-t border-white/10">
                  <span>{item.location}</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
