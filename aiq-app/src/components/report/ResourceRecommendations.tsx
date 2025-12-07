'use client';

import { Resource } from '@/types';

const RESOURCE_TYPE_ICONS: Record<Resource['type'], { icon: string; label: string }> = {
  case_study: { icon: '📋', label: 'Case Study' },
  playbook: { icon: '📘', label: 'Playbook' },
  webinar: { icon: '🎥', label: 'Webinar' },
  article: { icon: '📄', label: 'Article' },
  whitepaper: { icon: '📑', label: 'Whitepaper' },
};

interface ResourceRecommendationsProps {
  resources: Resource[];
  priorityCapabilities?: string[];
}

export function ResourceRecommendations({
  resources,
  priorityCapabilities = [],
}: ResourceRecommendationsProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Recommended Resources
        </h2>
        <p className="text-gray-600">
          Curated content to help you improve in your priority areas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => {
          const typeInfo = RESOURCE_TYPE_ICONS[resource.type];
          const isPriorityMatch = priorityCapabilities.some((cap) =>
            resource.capabilities.includes(cap)
          );

          return (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group block p-5 rounded-xl border-2 transition-all duration-200
                ${isPriorityMatch
                  ? 'border-blue-200 bg-blue-50 hover:border-blue-400'
                  : 'border-gray-200 bg-white hover:border-blue-300'
                }
                hover:shadow-md
              `}
            >
              {/* Priority badge */}
              {isPriorityMatch && (
                <div className="mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    Matches your priorities
                  </span>
                </div>
              )}

              {/* Resource type */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{typeInfo.icon}</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {typeInfo.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {resource.title}
              </h3>

              {/* Maturity tiers */}
              <div className="flex flex-wrap gap-1 mb-3">
                {resource.maturityTiers.map((tier) => (
                  <span
                    key={tier}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      tier === 'leading'
                        ? 'bg-emerald-100 text-emerald-700'
                        : tier === 'developing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {tier}
                  </span>
                ))}
              </div>

              {/* Link indicator */}
              <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                <span>Read more</span>
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
