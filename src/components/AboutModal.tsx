import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { GalleryItem } from '../types/gallery';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, items }) => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedPlate: items[0]?.title || '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      // Auto reset after a moment
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-dialog-title"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0d10] rounded-sm shadow-2xl p-6 sm:p-10 text-neutral-100 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-8 border-b border-white/10 pb-6">
          <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
            Curatorial Statement · 2026
          </span>
          <h2 id="about-dialog-title" className="font-editorial-serif text-3xl sm:text-4xl text-white">
            Nocturne Transit & Kinetic Form
          </h2>
          <p className="font-editorial-display text-sm text-neutral-400 font-light">
            An experimental spatial installation interrogating high-speed automotive sculpture in three-dimensional virtual perspective.
          </p>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-xs sm:text-sm font-light leading-relaxed text-neutral-300">
          <div className="space-y-4">
            <h3 className="font-editorial-display font-medium text-white text-sm tracking-wide uppercase">
              The Spatial Canvas
            </h3>
            <p>
              Automotive photography is conventionally rendered as static commercial cataloging. <em>Nocturne Transit</em> subverts this convention by liberating medium-format photographic plates into a continuously shifting, perspective-distorted virtual continuum.
            </p>
            <p>
              Each plate occupies its own spatial vector—tilted on axes of rotation and pitch—embodying the centrifugal forces and aerodynamics of the vehicles depicted.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-editorial-display font-medium text-white text-sm tracking-wide uppercase">
              Kinetic Typography
            </h3>
            <p>
              Typography here acts not as subordinate labeling, but as an active kinetic participant. Words such as <em>Blink</em>, <em>Raise</em>, and <em>Repeat</em> mirror the rhythmic pulses of streetlights, tunnel neon ribs, and apex downshifts.
            </p>
            <p>
              Curved vector strokes physically stitch the photographic boundaries to the digital canvas, evoking telemetry traces and slipstream vortices.
            </p>
          </div>
        </div>

        {/* Acquisition & Catalog Inquiry Form */}
        <div className="bg-neutral-950/80 p-6 rounded-sm border border-white/10">
          <div className="mb-4">
            <h4 className="font-editorial-serif text-xl text-white">
              Print Catalog & Acquisition Inquiry
            </h4>
            <p className="font-editorial-display text-xs text-neutral-400 mt-1">
              Each photographic plate is released in an archival edition of 12 on 310gsm cotton rag with museum-grade pigment ink.
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-sm text-emerald-200 text-xs">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-medium text-white">Inquiry Received</p>
                <p className="text-emerald-300 mt-0.5">
                  Thank you for your interest. The gallery director will reach out with the complete provenance dossier.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g., Elena Vance"
                    className="w-full px-3 py-2 bg-[#121216] border border-white/15 rounded-sm focus:outline-hidden focus:border-white text-white placeholder:text-neutral-600"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@studio.com"
                    className="w-full px-3 py-2 bg-[#121216] border border-white/15 rounded-sm focus:outline-hidden focus:border-white text-white placeholder:text-neutral-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 mb-1">
                  Plate of Interest
                </label>
                <select
                  value={formData.selectedPlate}
                  onChange={(e) => setFormData({ ...formData, selectedPlate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#121216] border border-white/15 rounded-sm focus:outline-hidden focus:border-white text-white"
                >
                  {items.map((item) => (
                    <option key={item.id} value={item.title} className="bg-neutral-900 text-white">
                      {item.title} — {item.series}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-neutral-400 mb-1">
                  Message / Framing Preference
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquire regarding framed dimensions, custom shipping, or private exhibition viewing..."
                  className="w-full px-3 py-2 bg-[#121216] border border-white/15 rounded-sm focus:outline-hidden focus:border-white text-white placeholder:text-neutral-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-neutral-400 hover:text-white text-xs font-mono tracking-wider uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-white text-neutral-950 font-medium rounded-sm text-xs font-editorial-display tracking-widest uppercase hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
