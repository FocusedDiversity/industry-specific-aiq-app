'use client';

import { Capability, MaturityScore, MaturityTier } from '@/types';
import { getMaturityColor, getTierBadgeClasses, TIER_LABELS, SCORE_LABELS } from '@/lib/utils/design';

interface CapabilityCardProps {
  capability: Capability;
  score: MaturityScore;
  weightedScore: number;
  tier: MaturityTier;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick?: () => void;
}

export function CapabilityCard({
  capability,
  score,
  weightedScore,
  tier,
  isHovered,
  onHover,
  onClick,
}: CapabilityCardProps) {
  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
        ${isHovered
          ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]'
          : 'border-gray-200 bg-white hover:border-blue-300'
        }
      `}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {/* Score badge */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-sm"
        style={{
          backgroundColor: getMaturityColor(score),
          color: score >= 3 ? 'white' : '#1e3a5f',
        }}
      >
        {score}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className={`font-semibold truncate ${isHovered ? 'text-blue-900' : 'text-gray-900'}`}>
            {capability.name}
          </h4>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${getTierBadgeClasses(tier)}`}>
            {TIER_LABELS[tier]}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {SCORE_LABELS[score]} maturity
        </p>
      </div>

      {/* Weighted points */}
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-gray-900">{weightedScore}</p>
        <p className="text-xs text-gray-500">pts</p>
      </div>

      {/* Arrow indicator */}
      <svg
        className={`w-5 h-5 flex-shrink-0 transition-transform ${isHovered ? 'translate-x-1 text-blue-600' : 'text-gray-400'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
