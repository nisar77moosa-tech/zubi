import React from 'react';
import { ShieldCheck, Clock, MapPin, Zap } from 'lucide-react';
import heroLabImage from '../assets/images/hero_repair_lab_1791100399319.jpg';

interface HeroBannerProps {
  onQuickBook: () => void;
  onOpenEstimator: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onQuickBook, onOpenEstimator }) => {
  return (
    <div className="relative overflow-hidden rounded-[25px] p-6 sm:p-8 text-white shadow-xl bg-gradient-to-r from-[#6a11cb] to-[#2575fc]">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay pointer-events-none">
        <img
          src={heroLabImage}
          alt="Makran Lab Technician Workbench"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between max-w-xl">
        {/* Editorial Subtitle / Trust markers */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-200 mb-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            Amma Tower, Saddar Karachi
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            Express 30-Min Service
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-1">
          Your Phone.
        </h1>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
          Our Fix. 🔧
        </h2>

        <p className="text-white/90 text-sm sm:text-base font-normal max-w-md mb-5 leading-relaxed">
          Fast & reliable mobile phone repair. From cracked screens and dying batteries to water damage recovery and motherboard micro-soldering.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 border-t border-white/15 text-xs text-white/85">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Fast Turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>90-Day Warranty</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Technicians On-Duty</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <button
            onClick={onQuickBook}
            className="px-4 py-2.5 rounded-xl bg-white text-purple-900 font-bold text-xs sm:text-sm hover:bg-purple-50 transition-all active:scale-[0.98] shadow-md cursor-pointer"
          >
            Start Repair Request
          </button>
          <button
            onClick={onOpenEstimator}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium text-xs sm:text-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            Check Price & Time
          </button>
        </div>
      </div>
    </div>
  );
};
