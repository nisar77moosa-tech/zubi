import React from 'react';
import { REPAIR_CATEGORIES } from '../data/repairData';
import { RepairCategory } from '../types';
import { ArrowRight, Clock } from 'lucide-react';

interface RepairGridProps {
  onSelectProblem: (problemTitle: string) => void;
  onOpenDetails?: (category: RepairCategory) => void;
}

export const RepairGrid: React.FC<RepairGridProps> = ({ onSelectProblem }) => {
  return (
    <section id="repairs" className="py-2">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            What is wrong with your phone?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select an issue to get diagnostic help & instant booking
          </p>
        </div>
      </div>

      {/* Grid matching Flutter's 2-column layout on mobile, expanding gracefully on tablets/desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5">
        {REPAIR_CATEGORIES.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectProblem(item.title)}
            className="group relative text-left p-4 sm:p-4.5 rounded-[18px] bg-white border border-slate-100 hover:border-purple-200 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(106,17,203,0.12)] transition-all duration-200 active:scale-[0.98] flex flex-col justify-between cursor-pointer min-h-[125px]"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-3xl select-none" role="img" aria-label={item.title}>
                  {item.emoji}
                </span>
                <span className="opacity-0 group-hover:opacity-100 text-purple-600 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <h3 className="mt-2.5 font-bold text-slate-900 text-sm sm:text-base group-hover:text-purple-700 transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-500 text-xs mt-0.5 leading-tight">
                {item.subtitle}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-purple-400" />
                {item.estimatedTime}
              </span>
              <span className="text-purple-600 font-medium">Book</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
