import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { DEVICE_BRANDS, REPAIR_CATEGORIES } from '../data/repairData';

interface PriceEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAndBook: (problem: string, model: string) => void;
}

export const PriceEstimatorModal: React.FC<PriceEstimatorModalProps> = ({
  isOpen,
  onClose,
  onSelectAndBook,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(DEVICE_BRANDS[0].id);
  const [selectedModel, setSelectedModel] = useState(DEVICE_BRANDS[0].popularModels[0]);
  const [selectedIssueId, setSelectedIssueId] = useState(REPAIR_CATEGORIES[0].id);

  if (!isOpen) return null;

  const currentBrandObj = DEVICE_BRANDS.find((b) => b.id === selectedBrand) || DEVICE_BRANDS[0];
  const currentIssueObj = REPAIR_CATEGORIES.find((r) => r.id === selectedIssueId) || REPAIR_CATEGORIES[0];

  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
    const brand = DEVICE_BRANDS.find((b) => b.id === brandId);
    if (brand && brand.popularModels.length > 0) {
      setSelectedModel(brand.popularModels[0]);
    }
  };

  const handleBookNow = () => {
    onSelectAndBook(currentIssueObj.title, `${currentBrandObj.name} ${selectedModel}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden border border-purple-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#6a11cb] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-lg tracking-wide">Repair Price & Time Estimator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-800">
          <p className="text-xs text-slate-500">
            Select your phone manufacturer and model to view benchmark rates at Makran Lab Amma Tower.
          </p>

          {/* Brand Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              1. Select Brand
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {DEVICE_BRANDS.map((brand) => {
                const isActive = brand.id === selectedBrand;
                return (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => handleBrandChange(brand.id)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer truncate ${
                      isActive
                        ? 'bg-purple-700 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-purple-50 text-slate-700'
                    }`}
                  >
                    {brand.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              2. Select Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 rounded-xl text-xs sm:text-sm font-medium border border-transparent focus:border-purple-600 focus:bg-white focus:outline-none"
            >
              {currentBrandObj.popularModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Issue Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              3. Repair Issue
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {REPAIR_CATEGORIES.map((cat) => {
                const isSelected = cat.id === selectedIssueId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedIssueId(cat.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/80 text-purple-900 font-semibold'
                        : 'border-slate-200 hover:border-purple-200 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">{cat.emoji}</span>
                    <span className="text-xs truncate">{cat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 text-slate-800 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-purple-200/60">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Benchmark Cost & Time
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                Saddar Wholesale Rates
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-600">Estimated Cost:</span>
              <span className="text-base sm:text-lg font-bold text-purple-900 tabular-nums">
                {currentIssueObj.averageCostPKR}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                Turnaround Time:
              </span>
              <span className="font-semibold text-slate-900">{currentIssueObj.estimatedTime}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                Service Guarantee:
              </span>
              <span className="font-semibold text-slate-900">Up to 90 Days Warranty</span>
            </div>

            <p className="text-[11px] text-slate-500 pt-1 border-t border-purple-200/40">
              {currentIssueObj.description}
            </p>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <span>Proceed to Book This Fix</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
