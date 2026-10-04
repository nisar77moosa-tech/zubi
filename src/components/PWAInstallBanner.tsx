import React, { useState } from 'react';
import { Download, Smartphone, X, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallBannerProps {
  onOpenApkModal: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ onOpenApkModal }) => {
  const { isInstalled } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  // If already installed as standalone PWA/WebAPK or dismissed, don't show the banner
  if (isInstalled || isDismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#6a11cb] via-[#581c87] to-[#2575fc] text-white px-4 py-2.5 shadow-md relative z-20 border-b border-purple-400/20">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4 text-amber-300" />
          </div>
          <p className="font-medium truncate">
            <strong className="font-bold text-amber-300">Makran Fix Android APK:</strong>{' '}
            <span className="opacity-95">Install on your phone for instant repair bookings & offline tickets</span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenApkModal}
            className="px-3 py-1 rounded-lg bg-white text-purple-900 font-bold text-xs hover:bg-purple-50 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-purple-700" />
            <span>Install APK</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-md hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
