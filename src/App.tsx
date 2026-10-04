import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { RepairGrid } from './components/RepairGrid';
import { PrimaryActions } from './components/PrimaryActions';
import { ShopInfoCard } from './components/ShopInfoCard';
import { BookingModal } from './components/BookingModal';
import { SuccessDialog } from './components/SuccessDialog';
import { TicketTrackerModal } from './components/TicketTrackerModal';
import { PriceEstimatorModal } from './components/PriceEstimatorModal';
import { InstallApkModal } from './components/InstallApkModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { RepairBooking } from './types';
import { Wifi, BatteryMedium, Signal, Smartphone } from 'lucide-react';
import { SHOP_INFO } from './data/repairData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<string>('Select problem');
  const [prefilledModel, setPrefilledModel] = useState<string>('');
  const [lastBooking, setLastBooking] = useState<RepairBooking | null>(null);
  const [isDeviceFrame, setIsDeviceFrame] = useState(false);

  const handleSelectProblem = (problemTitle: string) => {
    setSelectedProblem(problemTitle);
    setIsBookingOpen(true);
  };

  const handleOpenBooking = () => {
    setSelectedProblem('Select problem');
    setIsBookingOpen(true);
  };

  const handleEstimatorSelectAndBook = (problem: string, model: string) => {
    setSelectedProblem(problem);
    setPrefilledModel(model);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (booking: RepairBooking) => {
    setIsBookingOpen(false);
    setLastBooking(booking);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Main screen content (rendered identically inside phone frame or full web)
  const renderScreenContent = (isFramed: boolean) => (
    <div className={`space-y-6 ${isFramed ? 'p-4' : 'p-4 sm:p-6 md:p-8 max-w-5xl mx-auto'}`}>
      {/* HERO SECTION matching Flutter Container gradient */}
      <HeroBanner
        onQuickBook={handleOpenBooking}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* REPAIR OPTIONS GRID */}
      <RepairGrid
        onSelectProblem={handleSelectProblem}
      />

      {/* 3 PRIMARY BUTTONS from Flutter + INSTALL APK BUTTON */}
      <PrimaryActions
        onOpenBooking={handleOpenBooking}
        onOpenApkModal={() => setIsApkModalOpen(true)}
      />

      {/* Quick Status & Estimate Promo bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => setIsEstimatorOpen(true)}
          className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 shadow-sm flex items-center justify-between text-left transition-all hover:bg-purple-50/40 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">💰</span>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Price & Time Benchmark
              </span>
              <span className="text-[11px] text-slate-500">
                Check rates for iPhone, Samsung, Xiaomi & more
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-purple-700">Check →</span>
        </button>

        <button
          onClick={() => setIsTrackerOpen(true)}
          className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 shadow-sm flex items-center justify-between text-left transition-all hover:bg-purple-50/40 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🔍</span>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Track Existing Ticket
              </span>
              <span className="text-[11px] text-slate-500">
                View status & technician progress live
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-purple-700">Track →</span>
        </button>
      </div>

      {/* SHOP INFORMATION CARD matching Flutter */}
      <ShopInfoCard
        onQuickBook={handleOpenBooking}
      />

      {/* Footer info */}
      <footer className="pt-6 pb-8 border-t border-slate-200 text-center text-xs text-slate-500 space-y-2">
        <p className="font-semibold text-slate-700">
          Makran Lab · Amma Tower Saddar B-80, Karachi
        </p>
        <p className="text-[11px] text-slate-400">
          Fast & Reliable Mobile Phone Repairs · Genuine Spares · Express Turnaround
        </p>
        <div className="flex justify-center gap-4 text-purple-700 pt-1">
          <a href={`tel:${SHOP_INFO.phone}`} className="hover:underline">
            Call: {SHOP_INFO.phone}
          </a>
          <span>·</span>
          <a
            href={SHOP_INFO.whatsappBaseUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            WhatsApp
          </a>
          <span>·</span>
          <button
            onClick={() => setIsApkModalOpen(true)}
            className="hover:underline text-purple-800 font-semibold cursor-pointer"
          >
            Android APK
          </button>
          <span>·</span>
          <a
            href={SHOP_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Directions
          </a>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900 flex flex-col font-sans selection:bg-purple-200">
      {/* PWA Install Banner */}
      <PWAInstallBanner onOpenApkModal={() => setIsApkModalOpen(true)} />

      {/* Global Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        onScrollToSection={scrollToSection}
        isDeviceFrame={isDeviceFrame}
        onToggleFrame={() => setIsDeviceFrame(!isDeviceFrame)}
      />

      {/* Content Area */}
      <main className="flex-1 w-full">
        {isDeviceFrame ? (
          /* Phone Device Frame Preview Mode */
          <div className="py-8 px-4 flex flex-col items-center justify-center">
            <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200">
              <Smartphone className="w-3.5 h-3.5 text-purple-700" />
              <span>Simulating Flutter Smartphone Viewport</span>
              <button
                onClick={() => setIsDeviceFrame(false)}
                className="text-purple-700 font-semibold hover:underline ml-2"
              >
                Expand to Web
              </button>
            </div>

            {/* Smartphone Shell */}
            <div className="w-[390px] h-[844px] bg-black rounded-[52px] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.35)] ring-1 ring-slate-800 flex flex-col relative overflow-hidden">
              {/* Dynamic Island / Speaker notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3 ring-1 ring-neutral-800"></div>
                <div className="w-2 h-2 rounded-full bg-[#1a1a2e]"></div>
              </div>

              {/* Status Bar */}
              <div className="h-10 px-7 pt-2 flex items-center justify-between text-white text-[11px] font-semibold tracking-tight shrink-0 select-none z-30">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <BatteryMedium className="w-4 h-4" />
                </div>
              </div>

              {/* Internal Screen Viewport */}
              <div className="flex-1 bg-[#f5f5f7] rounded-[40px] overflow-y-auto overflow-x-hidden relative scrollbar-none">
                {/* Flutter App Bar */}
                <div className="sticky top-0 z-20 bg-[#6a11cb] text-white px-4 py-3 flex items-center justify-center shadow-md">
                  <span className="font-bold text-base tracking-wider">
                    MAKRAN FIX 🔧
                  </span>
                </div>

                {/* Body Content */}
                {renderScreenContent(true)}

                {/* Home Indicator bar */}
                <div className="sticky bottom-1 left-0 right-0 flex justify-center py-1 pointer-events-none">
                  <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Responsive Standard Web Mode */
          <div className="w-full">
            {renderScreenContent(false)}
          </div>
        )}
      </main>

      {/* Offline Indicator Toast */}
      <OfflineIndicator />

      {/* Modals & Dialogs */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedProblem={selectedProblem}
        onBookingSuccess={handleBookingSuccess}
      />

      <SuccessDialog
        booking={lastBooking}
        onClose={() => setLastBooking(null)}
        onViewTracker={() => setIsTrackerOpen(true)}
      />

      <TicketTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        defaultTicket={lastBooking?.ticketNumber}
      />

      <PriceEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onSelectAndBook={handleEstimatorSelectAndBook}
      />

      <InstallApkModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />
    </div>
  );
}
