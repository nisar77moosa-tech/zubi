import React, { useState, useEffect } from 'react';
import { X, Search, Clock, MessageSquare, Phone } from 'lucide-react';
import { RepairBooking } from '../types';
import { SHOP_INFO } from '../data/repairData';

interface TicketTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTicket?: string;
}

export const TicketTrackerModal: React.FC<TicketTrackerModalProps> = ({
  isOpen,
  onClose,
  defaultTicket,
}) => {
  const [searchTerm, setSearchTerm] = useState(defaultTicket || '');
  const [bookings, setBookings] = useState<RepairBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<RepairBooking | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('makran_fix_bookings');
      if (stored) {
        const parsed: RepairBooking[] = JSON.parse(stored);
        setBookings(parsed);
        if (defaultTicket) {
          const match = parsed.find(
            (b) => b.ticketNumber.toLowerCase() === defaultTicket.toLowerCase()
          );
          if (match) setSelectedBooking(match);
        } else if (parsed.length > 0 && !selectedBooking) {
          setSelectedBooking(parsed[0]);
        }
      }
    } catch {
      // ignore
    }
  }, [isOpen, defaultTicket]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    if (!query) return;

    const found = bookings.find(
      (b) =>
        b.ticketNumber.toLowerCase().includes(query) ||
        b.phoneNumber.includes(query) ||
        b.customerName.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedBooking(found);
    } else {
      // Mock lookup for demonstration if user types random MF-xxxx
      const mockResult: RepairBooking = {
        id: `mock-${Date.now()}`,
        ticketNumber: query.toUpperCase().startsWith('MF-') ? query.toUpperCase() : `MF-${query}`,
        customerName: 'Customer',
        phoneNumber: '03323819288',
        deviceModel: 'Smartphone',
        problem: 'Diagnostic Inspection',
        preferredContact: 'whatsapp',
        createdAt: new Date().toISOString(),
        status: 'In Repair',
      };
      setSelectedBooking(mockResult);
    }
  };

  const steps = [
    { title: 'Received', desc: 'Device accepted at Amma Tower lab' },
    { title: 'Diagnosing', desc: 'Hardware & component scan' },
    { title: 'In Repair', desc: 'Precision repair in progress' },
    { title: 'Testing', desc: 'QC & display/battery bench test' },
    { title: 'Ready for Pickup', desc: 'Ready with 90-day warranty slip' },
  ];

  const getStepIndex = (status: RepairBooking['status']) => {
    switch (status) {
      case 'Received':
        return 0;
      case 'Diagnosing':
        return 1;
      case 'In Repair':
        return 2;
      case 'Testing':
        return 3;
      case 'Ready for Pickup':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = selectedBooking ? getStepIndex(selectedBooking.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-[24px] shadow-2xl overflow-hidden border border-purple-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#6a11cb] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-lg tracking-wide">Track Repair Status</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-purple-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter Ticket ID (e.g. MF-1024) or Phone"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-xs sm:text-sm font-medium border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {selectedBooking ? (
            <div className="space-y-5">
              {/* Ticket Summary Card */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-800">
                    Repair Ticket
                  </span>
                  <span className="font-mono font-bold text-sm bg-purple-700 text-white px-2.5 py-0.5 rounded-lg">
                    {selectedBooking.ticketNumber}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-slate-500 block">Customer:</span>
                    <span className="font-semibold text-slate-900">{selectedBooking.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <span className="font-semibold text-slate-900">{selectedBooking.phoneNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Model:</span>
                    <span className="font-semibold text-slate-900">{selectedBooking.deviceModel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Issue:</span>
                    <span className="font-semibold text-purple-700">{selectedBooking.problem}</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Stage Timeline
                </h4>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {steps.map((step, idx) => {
                    const isDone = idx < currentStep;
                    const isCurrent = idx === currentStep;
                    return (
                      <div key={step.title} className="relative flex items-start gap-3">
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isDone
                              ? 'bg-emerald-500 text-white'
                              : isCurrent
                              ? 'bg-purple-700 text-white ring-4 ring-purple-100'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold ${
                                isCurrent
                                  ? 'text-purple-700'
                                  : isDone
                                  ? 'text-slate-900'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step.title}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-semibold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                In Progress
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technician WhatsApp Update */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`${SHOP_INFO.whatsappBaseUrl}?text=Hello%20Makran%20Lab,%20checking%20status%20for%20ticket%20${selectedBooking.ticketNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Technician on WhatsApp</span>
                </a>

                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="px-4 py-2.5 rounded-xl border border-purple-200 hover:bg-purple-50 text-purple-900 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-purple-700" />
                  <span>Call Lab</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium">No repair booking found.</p>
              <p className="text-xs text-slate-400 mt-1">
                Enter your Ticket ID or submit a new repair request.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
