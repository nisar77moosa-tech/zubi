import React from 'react';
import { Wrench, Smartphone, Monitor, Download } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  onOpenEstimator: () => void;
  onOpenApkModal: () => void;
  onScrollToSection: (id: string) => void;
  isDeviceFrame: boolean;
  onToggleFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenTracker,
  onOpenEstimator,
  onOpenApkModal,
  onScrollToSection,
  isDeviceFrame,
  onToggleFrame,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#6a11cb] text-white shadow-md border-b border-purple-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-base sm:text-lg font-bold tracking-wider flex items-center gap-1.5 focus-visible:outline-none"
        >
          <span>MAKRAN FIX</span>
          <span className="text-amber-300">🔧</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-purple-100">
          <button
            onClick={() => onScrollToSection('repairs')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Repairs
          </button>
          <button
            onClick={onOpenEstimator}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Price Estimator
          </button>
          <button
            onClick={onOpenTracker}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Track Status
          </button>
          <button
            onClick={onOpenApkModal}
            className="text-amber-300 font-semibold hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install APK</span>
          </button>
          <button
            onClick={() => onScrollToSection('shop-info')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Shop Info
          </button>
          <a
            href="https://wa.me/923323819288?text=Hello%20Makran%20Lab,%20I%20need%20mobile%20repair."
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-300 transition-colors"
          >
            WhatsApp Support
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Direct Install APK Button */}
          <button
            onClick={onOpenApkModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-xs font-bold text-white transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get APK</span>
          </button>

          {/* Frame switcher for testing on desktop */}
          <button
            onClick={onToggleFrame}
            title={isDeviceFrame ? 'Switch to Full Browser View' : 'Switch to Mobile Preview Frame'}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
          >
            {isDeviceFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Full Web</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone View</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 rounded-lg bg-white text-purple-900 font-semibold text-xs sm:text-sm hover:bg-purple-50 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5 text-purple-700" />
            <span>Book Repair</span>
          </button>
        </div>
      </div>
    </header>
  );
};
