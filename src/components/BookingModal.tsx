import React, { useState, useEffect } from 'react';
import { X, User, Phone, Smartphone, Wrench, AlertCircle, Send } from 'lucide-react';
import { RepairBooking } from '../types';
import { SHOP_INFO } from '../data/repairData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProblem?: string;
  onBookingSuccess: (booking: RepairBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedProblem,
  onBookingSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [model, setModel] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('Select problem');
  const [notes, setNotes] = useState('');
  const [autoOpenWhatsApp, setAutoOpenWhatsApp] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedProblem) {
      setSelectedProblem(preselectedProblem);
    }
  }, [preselectedProblem]);

  if (!isOpen) return null;

  const problemOptions = [
    'Select problem',
    'Broken Screen',
    'Battery',
    'Charging',
    'Camera',
    'Speaker',
    'Network',
    'Water Damage',
    'Software',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !model.trim() || selectedProblem === 'Select problem') {
      setError('Please complete all information.');
      return;
    }

    setError(null);

    // Generate readable Ticket ID (e.g. MF-7482)
    const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: RepairBooking = {
      id: `booking-${Date.now()}`,
      ticketNumber: `MF-${randomTicketNum}`,
      customerName: name.trim(),
      phoneNumber: phone.trim(),
      deviceModel: model.trim(),
      problem: selectedProblem,
      additionalNotes: notes.trim(),
      preferredContact: autoOpenWhatsApp ? 'whatsapp' : 'call',
      createdAt: new Date().toISOString(),
      status: 'Received',
    };

    // Save to local storage for tracking history
    try {
      const existing = localStorage.getItem('makran_fix_bookings');
      const list: RepairBooking[] = existing ? JSON.parse(existing) : [];
      list.unshift(newBooking);
      localStorage.setItem('makran_fix_bookings', JSON.stringify(list));
    } catch {
      // ignore storage error
    }

    if (autoOpenWhatsApp) {
      const waMsg = encodeURIComponent(
        `*New Repair Booking - Makran Lab*\n` +
        `Ticket ID: *#${newBooking.ticketNumber}*\n` +
        `Name: ${newBooking.customerName}\n` +
        `Phone: ${newBooking.phoneNumber}\n` +
        `Model: ${newBooking.deviceModel}\n` +
        `Problem: ${newBooking.problem}` +
        (newBooking.additionalNotes ? `\nDetails: ${newBooking.additionalNotes}` : '') +
        `\n\n_Sent via Makran Fix App (Amma Tower Saddar B-80)_`
      );
      window.open(`${SHOP_INFO.whatsappBaseUrl}?text=${waMsg}`, '_blank');
    }

    onBookingSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden border border-purple-100 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* App Bar / Modal Header */}
        <div className="bg-[#6a11cb] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-lg tracking-wide">Book Repair</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-slate-800">
          <div>
            <h4 className="text-xl font-bold text-slate-900 leading-snug">
              Tell us about your phone
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Provide your phone details to reserve an express technician slot at Amma Tower.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200 animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Your Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-700">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Muhammad Ali"
                className="w-full pl-11 pr-4 py-3 bg-slate-100 hover:bg-slate-100/80 focus:bg-white rounded-[15px] border border-transparent focus:border-purple-600 text-sm font-medium focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-700">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0332XXXXXXX"
                className="w-full pl-11 pr-4 py-3 bg-slate-100 hover:bg-slate-100/80 focus:bg-white rounded-[15px] border border-transparent focus:border-purple-600 text-sm font-medium focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Model Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Mobile Model
              </label>
              <span className="text-[11px] text-purple-700 font-medium">e.g. iPhone 13</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-700">
                <Smartphone className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Mobile model e.g. iPhone 13"
                className="w-full pl-11 pr-4 py-3 bg-slate-100 hover:bg-slate-100/80 focus:bg-white rounded-[15px] border border-transparent focus:border-purple-600 text-sm font-medium focus:outline-none transition-colors"
              />
            </div>

            {/* Quick model pills for fast tap */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 self-center">Popular:</span>
              {['iPhone 13', 'Samsung A54', 'Redmi Note 12', 'Vivo V29'].map((quickModel) => (
                <button
                  type="button"
                  key={quickModel}
                  onClick={() => setModel(quickModel)}
                  className="px-2 py-0.5 rounded-md bg-slate-200/70 hover:bg-purple-100 text-[11px] text-slate-700 hover:text-purple-800 transition-colors"
                >
                  {quickModel}
                </button>
              ))}
            </div>
          </div>

          {/* Repair Problem Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Repair Problem
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-700">
                <Wrench className="w-5 h-5" />
              </div>
              <select
                value={selectedProblem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-100 hover:bg-slate-100/80 focus:bg-white rounded-[15px] border border-transparent focus:border-purple-600 text-sm font-medium focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {problemOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Symptoms / Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g. Screen has green line, touch is unresponsive on top right"
              className="w-full px-3.5 py-2.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white rounded-[15px] border border-transparent focus:border-purple-600 text-xs font-medium focus:outline-none transition-colors"
            />
          </div>

          {/* WhatsApp Toggle option */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100">
            <input
              type="checkbox"
              id="whatsapp-sync"
              checked={autoOpenWhatsApp}
              onChange={(e) => setAutoOpenWhatsApp(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="whatsapp-sync" className="text-xs text-slate-700 cursor-pointer">
              <span className="font-semibold text-purple-900 block">
                Instant WhatsApp Confirmation
              </span>
              Also open WhatsApp to connect directly with the technician on 03323819288.
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-[55px] rounded-[15px] bg-[#6a11cb] hover:bg-[#581c87] text-white font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>SUBMIT REPAIR REQUEST</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
