import React, { useState } from 'react';
import { Wrench, MessageSquare, Phone, Copy, Check, Download, Smartphone } from 'lucide-react';
import { SHOP_INFO } from '../data/repairData';

interface PrimaryActionsProps {
  onOpenBooking: () => void;
  onOpenApkModal?: () => void;
}

export const PrimaryActions: React.FC<PrimaryActionsProps> = ({ onOpenBooking, onOpenApkModal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(SHOP_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3.5 pt-2">
      {/* 1. BOOK A REPAIR */}
      <button
        onClick={onOpenBooking}
        className="w-full h-[55px] rounded-[15px] bg-[#581c87] hover:bg-[#4a1572] text-white font-bold text-base tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-all cursor-pointer"
      >
        <Wrench className="w-5 h-5 text-purple-200" />
        <span>BOOK A REPAIR</span>
      </button>

      {/* 2. CHAT ON WHATSAPP */}
      <a
        href={`${SHOP_INFO.whatsappBaseUrl}?text=Hello%20Makran%20Lab,%20I%20need%20mobile%20repair.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-[55px] rounded-[15px] bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-base tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-green-700/20 active:scale-[0.98] transition-all"
      >
        <MessageSquare className="w-5 h-5 text-green-100" />
        <span>CHAT ON WHATSAPP</span>
      </a>

      {/* 3. CALL MAKRAN LAB */}
      <div className="relative group">
        <a
          href={`tel:${SHOP_INFO.phone}`}
          className="w-full h-[55px] rounded-[15px] border-2 border-[#581c87] bg-white hover:bg-purple-50 text-[#581c87] font-bold text-base tracking-wide flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all shadow-sm"
        >
          <Phone className="w-5 h-5 text-[#581c87]" />
          <span>CALL MAKRAN LAB</span>
        </a>

        {/* Quick copy helper badge for desktop users who can't click tel links */}
        <button
          onClick={handleCopyNumber}
          title="Copy phone number to clipboard"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-purple-700 hover:bg-purple-100/70 transition-colors flex items-center gap-1 text-xs"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
            </span>
          ) : (
            <span className="flex items-center gap-1 text-purple-700 hover:text-purple-900 bg-purple-50/80 px-2 py-1 rounded border border-purple-200/50">
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono">{SHOP_INFO.phone}</span>
            </span>
          )}
        </button>
      </div>

      {/* 4. INSTALL APK BUTTON */}
      {onOpenApkModal && (
        <button
          onClick={onOpenApkModal}
          className="w-full h-[50px] rounded-[15px] bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-900 hover:to-indigo-900 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer border border-purple-400/20"
        >
          <Smartphone className="w-4 h-4 text-amber-300" />
          <span>INSTALL ANDROID APK / APP</span>
          <Download className="w-4 h-4 ml-1 opacity-80" />
        </button>
      )}
    </div>
  );
};
