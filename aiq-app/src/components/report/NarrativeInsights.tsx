'use client';

import { Industry, CapabilityCategory, MaturityTier } from '@/types';
import { getNarrative } from '@/content/industries';
import { getTierBadgeClasses, TIER_LABELS, CATEGORY_CONFIG } from '@/lib/utils/design';
import { CATEGORY_ORDER } from '@/content/capabilities';

interface CategoryScore {
  score: number;
  maxScore: number;
  tier: MaturityTier;
}

interface NarrativeInsightsProps {
  industry: Industry;
  categoryScores: Record<CapabilityCategory, CategoryScore>;
}

export function NarrativeInsights({ industry, categoryScores }: NarrativeInsightsProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
        Your AI Readiness Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {CATEGORY_ORDER.map((category) => {
          const scores = categoryScores[category];
          const narrative = getNarrative(industry, category, scores.tier);
          const config = CATEGORY_CONFIG[category];

          if (!narrative) return null;

          const percentage = Math.round((scores.score / scores.maxScore) * 100);

          return (
            <div
              key={category}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{config?.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{config?.shortName}</h3>
                    <p className="text-xs text-gray-500">{category}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getTierBadgeClasses(scores.tier)}`}>
                  {TIER_LABELS[scores.tier]}
                </span>
              </div>

              {/* Score bar */}
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      scores.tier === 'leading'
                        ? 'bg-emerald-500'
                        : scores.tier === 'developing'
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Narrative content */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {narrative.headline}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {narrative.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
