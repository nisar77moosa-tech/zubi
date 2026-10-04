import React from 'react';
import { RepairBooking } from '../types';
import { CheckCircle2, MessageSquare, Copy, Check } from 'lucide-react';
import { SHOP_INFO } from '../data/repairData';

interface SuccessDialogProps {
  booking: RepairBooking | null;
  onClose: () => void;
  onViewTracker: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  booking,
  onClose,
  onViewTracker,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!booking) return null;

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(booking.ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsAppTicket = () => {
    const waMsg = encodeURIComponent(
      `Hello Makran Lab! My ticket ID is *${booking.ticketNumber}* (${booking.customerName} - ${booking.deviceModel} for ${booking.problem}). Please update me on repair readiness.`
    );
    window.open(`${SHOP_INFO.whatsappBaseUrl}?text=${waMsg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-[24px] shadow-2xl overflow-hidden border border-emerald-100 p-6 sm:p-7 text-center animate-in zoom-in-95 duration-150"
        role="alertdialog"
        aria-modal="true"
      >
        {/* Animated Green Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Title from Flutter code */}
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Repair Booked ✅
        </h3>

        {/* Content text from Flutter code */}
        <div className="text-slate-600 text-sm space-y-2 mb-5 leading-relaxed">
          <p className="font-medium text-slate-800">
            Your repair request has been received.
          </p>
          <p>
            Makran Lab will contact you shortly on{' '}
            <strong className="text-purple-700">{booking.phoneNumber}</strong>.
          </p>
        </div>

        {/* Ticket Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5 text-left text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Ticket Reference</span>
            <button
              onClick={handleCopyTicket}
              className="flex items-center gap-1 font-mono font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-2 py-0.5 rounded cursor-pointer"
            >
              <span>{booking.ticketNumber}</span>
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-purple-600" />}
            </button>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Device Model:</span>
            <span className="font-semibold text-slate-900">{booking.deviceModel}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Issue Reported:</span>
            <span className="font-semibold text-slate-900">{booking.problem}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Lab Location:</span>
            <span className="font-semibold text-slate-900">Amma Tower Saddar B-80</span>
          </div>
        </div>

        {/* Fast Action Buttons */}
        <div className="space-y-2.5 mb-5">
          <button
            onClick={openWhatsAppTicket}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Technician on WhatsApp</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onViewTracker();
            }}
            className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Track Repair Progress Live</span>
          </button>
        </div>

        {/* DONE Button matching Flutter */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};
