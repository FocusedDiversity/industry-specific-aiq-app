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
        flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer min-h-[60px]
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
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl flex-shrink-0 shadow-sm"
        style={{
          backgroundColor: getMaturityColor(score),
          color: score >= 3 ? 'white' : '#1e3a5f',
        }}
      >
        {score}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
          <h4 className={`font-semibold text-sm sm:text-base ${isHovered ? 'text-blue-900' : 'text-gray-900'}`}>
            {capability.name}
          </h4>
          <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border whitespace-nowrap ${getTierBadgeClasses(tier)}`}>
            {TIER_LABELS[tier]}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          {SCORE_LABELS[score]} readiness
        </p>
      </div>

    </div>
  );
}
