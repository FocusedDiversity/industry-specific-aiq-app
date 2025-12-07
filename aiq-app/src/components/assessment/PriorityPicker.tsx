'use client';

import { Capability, MaturityScore, CapabilityResponse } from '@/types';
import { getMaturityColor } from '@/lib/utils/design';
import { CATEGORY_CONFIG } from '@/lib/utils/design';

interface PriorityPickerProps {
  capabilities: Capability[];
  responses: CapabilityResponse[];
  selectedPriorities: string[];
  onPrioritiesChange: (priorities: string[]) => void;
  maxPriorities?: number;
}

export function PriorityPicker({
  capabilities,
  responses,
  selectedPriorities,
  onPrioritiesChange,
  maxPriorities = 3,
}: PriorityPickerProps) {
  const getResponseScore = (capabilityId: string): MaturityScore | null => {
    const response = responses.find((r) => r.capabilityId === capabilityId);
    return response?.score ?? null;
  };

  const handleToggle = (capabilityId: string) => {
    if (selectedPriorities.includes(capabilityId)) {
      // Remove from priorities
      onPrioritiesChange(selectedPriorities.filter((id) => id !== capabilityId));
    } else if (selectedPriorities.length < maxPriorities) {
      // Add to priorities
      onPrioritiesChange([...selectedPriorities, capabilityId]);
    }
  };

  const getPriorityNumber = (capabilityId: string): number | null => {
    const index = selectedPriorities.indexOf(capabilityId);
    return index >= 0 ? index + 1 : null;
  };

  // Group capabilities by category
  const groupedCapabilities = capabilities.reduce((acc, cap) => {
    if (!acc[cap.category]) {
      acc[cap.category] = [];
    }
    acc[cap.category].push(cap);
    return acc;
  }, {} as Record<string, Capability[]>);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Your Top {maxPriorities} Priorities
        </h2>
        <p className="text-gray-600">
          Choose the capabilities you most want to improve. We&apos;ll provide tailored resources and recommendations.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full text-sm text-[#cc5e58]">
          <span className="font-medium">{selectedPriorities.length}</span>
          <span>of {maxPriorities} selected</span>
        </div>
      </div>

      {Object.entries(groupedCapabilities).map(([category, caps], index) => {
        const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];

        return (
          <div key={category}>
            {index > 0 && (
              <hr className="border-gray-200 my-4" />
            )}
            <div className="space-y-3 py-2">
              <h3 className="flex items-center gap-2">
                <span className="text-xl">{config?.icon}</span>
                <span className="text-[15px] font-medium text-gray-400 uppercase tracking-wide">{category}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caps.map((cap) => {
                const score = getResponseScore(cap.id);
                const isSelected = selectedPriorities.includes(cap.id);
                const priorityNumber = getPriorityNumber(cap.id);
                const canSelect = selectedPriorities.length < maxPriorities || isSelected;

                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => handleToggle(cap.id)}
                    disabled={!canSelect}
                    className={`
                      relative flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all duration-200
                      ${isSelected
                        ? 'border-[#cc5e58] bg-red-50'
                        : canSelect
                          ? 'border-gray-200 bg-white hover:border-[#cc5e58]'
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                      }
                    `}
                  >
                    {/* Priority number badge */}
                    {priorityNumber && (
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#cc5e58] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {priorityNumber}
                      </div>
                    )}

                    {/* Score indicator */}
                    {score && (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0"
                        style={{
                          backgroundColor: getMaturityColor(score),
                          color: score >= 3 ? 'white' : '#1e3a5f',
                        }}
                      >
                        {score}
                      </div>
                    )}

                    {/* Capability name */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${isSelected ? 'text-[#994745]' : 'text-gray-900'}`}>
                        {cap.name}
                      </p>
                      {score && score <= 2 && (
                        <p className="text-xs text-amber-600 mt-0.5">
                          Low maturity - recommended focus area
                        </p>
                      )}
                    </div>

                    {/* Checkbox - with 44px touch target */}
                    <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                      <div className={`
                        w-6 h-6 rounded border-2 flex items-center justify-center
                        ${isSelected
                          ? 'border-[#cc5e58] bg-[#cc5e58]'
                          : 'border-gray-300'
                        }
                      `}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
