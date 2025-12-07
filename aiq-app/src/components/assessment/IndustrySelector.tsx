'use client';

import { Industry } from '@/types';
import { getAvailableIndustries } from '@/content/industries';

interface IndustrySelectorProps {
  selectedIndustry: Industry | null;
  onSelect: (industry: Industry) => void;
}

const INDUSTRY_ICONS: Record<Industry, string> = {
  healthcare: '🏥',
  legal: '⚖️',
};

const INDUSTRY_DESCRIPTIONS: Record<Industry, string> = {
  healthcare: 'Hospitals, health systems, digital health, life sciences, and healthcare technology organizations',
  legal: 'Law firms, corporate legal departments, legal technology providers, and professional services',
};

export function IndustrySelector({ selectedIndustry, onSelect }: IndustrySelectorProps) {
  const industries = getAvailableIndustries();

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Your Industry
        </h2>
        <p className="text-gray-600">
          Choose the industry that best describes your organization to receive tailored assessment questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {industries.map(({ id, displayName }) => {
          const isSelected = selectedIndustry === id;

          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`
                relative p-6 rounded-xl border-2 text-left transition-all duration-200
                ${isSelected
                  ? 'border-[#cc5e58] bg-red-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-[#cc5e58] hover:shadow-sm'
                }
              `}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-[#cc5e58] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Icon and title */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{INDUSTRY_ICONS[id]}</span>
                <h3 className={`text-xl font-semibold ${isSelected ? 'text-[#994745]' : 'text-gray-900'}`}>
                  {displayName}
                </h3>
              </div>

              {/* Description */}
              <p className={`text-sm ${isSelected ? 'text-[#cc5e58]' : 'text-gray-600'}`}>
                {INDUSTRY_DESCRIPTIONS[id]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
