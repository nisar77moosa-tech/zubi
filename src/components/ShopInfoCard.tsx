import React from 'react';
import { SHOP_INFO } from '../data/repairData';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ShieldCheck, Wrench } from 'lucide-react';
import shopImage from '../assets/images/shop_storefront_card_1791100420159.jpg';

interface ShopInfoCardProps {
  onQuickBook: () => void;
}

export const ShopInfoCard: React.FC<ShopInfoCardProps> = ({ onQuickBook }) => {
  return (
    <section id="shop-info" className="pt-2">
      <div className="bg-white rounded-[20px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Shop Visual */}
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 group">
            <img
              src={shopImage}
              alt="Makran Lab Storefront & Repair Counter"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-xs uppercase font-bold tracking-wider text-purple-300">
                Karachi Saddar
              </span>
              <h4 className="text-lg font-bold leading-tight">
                Shop B-80, Amma Tower
              </h4>
              <p className="text-xs text-white/80">
                Premier Mobile Market Center
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-1.5">
                  <span>📍</span>
                  <span>Makran Lab</span>
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Open Today
                </span>
              </div>

              <p className="text-slate-600 text-sm mb-4">
                Specialized laboratory for chip-level repair, original screen replacement, water damage treatment, and battery restoration.
              </p>

              <div className="space-y-2.5 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      {SHOP_INFO.address}
                    </span>
                    <span className="text-xs text-slate-500">
                      Amma Tower Electronics & Mobile Market, Saddar, Karachi
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-purple-700 shrink-0" />
                  <a
                    href={`tel:${SHOP_INFO.phone}`}
                    className="font-semibold text-purple-700 hover:text-purple-900 hover:underline tracking-wide"
                  >
                    📞 {SHOP_INFO.phone}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600">
                    {SHOP_INFO.timings}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600">
                    {SHOP_INFO.warrantyGuarantee}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions inside Card */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 text-purple-800 text-xs sm:text-sm font-semibold hover:bg-purple-100 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
              </a>

              <button
                onClick={onQuickBook}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-700 text-white text-xs sm:text-sm font-semibold hover:bg-purple-800 transition-colors shadow-sm cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Book Diagnostic</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
