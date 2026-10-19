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
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-sm shadow-2xl p-6 sm:p-10 text-neutral-900 border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-8 border-b border-neutral-100 pb-6">
          <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
            Curatorial Statement · 2026
          </span>
          <h2 id="about-dialog-title" className="font-editorial-serif text-3xl sm:text-4xl text-neutral-950">
            Nocturne Transit & Kinetic Form
          </h2>
          <p className="font-editorial-display text-sm text-neutral-600 font-light">
            An experimental spatial installation interrogating high-speed automotive sculpture in three-dimensional virtual perspective.
          </p>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-xs sm:text-sm font-light leading-relaxed text-neutral-700">
          <div className="space-y-4">
            <h3 className="font-editorial-display font-medium text-neutral-900 text-sm tracking-wide uppercase">
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
            <h3 className="font-editorial-display font-medium text-neutral-900 text-sm tracking-wide uppercase">
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
        <div className="bg-neutral-50 p-6 rounded-sm border border-neutral-200/80">
          <div className="mb-4">
            <h4 className="font-editorial-serif text-xl text-neutral-900">
              Print Catalog & Acquisition Inquiry
            </h4>
            <p className="font-editorial-display text-xs text-neutral-500 mt-1">
              Each photographic plate is released in an archival edition of 12 on 310gsm cotton rag with museum-grade pigment ink.
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-900 text-xs">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-medium">Inquiry Received</p>
                <p className="text-emerald-700 mt-0.5">
                  Thank you for your interest. The gallery director will reach out with the complete provenance dossier.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-neutral-500 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g., Elena Vance"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-neutral-500 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@studio.com"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-neutral-500 mb-1">
                  Plate of Interest
                </label>
                <select
                  value={formData.selectedPlate}
                  onChange={(e) => setFormData({ ...formData, selectedPlate: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-900"
                >
                  {items.map((item) => (
                    <option key={item.id} value={item.title}>
                      {item.title} — {item.series}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-neutral-500 mb-1">
                  Message / Framing Preference
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquire regarding framed dimensions, custom shipping, or private exhibition viewing..."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm focus:outline-hidden focus:border-neutral-900 text-neutral-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-950 text-xs font-mono tracking-wider uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-950 text-white rounded-sm text-xs font-editorial-display tracking-widest uppercase hover:bg-neutral-800 transition-colors shadow-xs"
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
