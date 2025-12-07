'use client';

import { CapabilityCategory, MaturityScore, MaturityTier, Capability } from '@/types';
import { CATEGORY_CONFIG } from '@/lib/utils/design';
import { CapabilityCard } from './CapabilityCard';
import { CATEGORY_ORDER } from '@/content/capabilities';

interface CapabilityResult {
  capability: Capability;
  score: MaturityScore;
  weightedScore: number;
  tier: MaturityTier;
}

interface CapabilityListProps {
  results: CapabilityResult[];
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  onCapabilityClick?: (capabilityId: string) => void;
}

export function CapabilityList({
  results,
  hoveredIndex,
  onHover,
  onCapabilityClick,
}: CapabilityListProps) {
  // Group results by category
  const groupedResults = results.reduce((acc, result, index) => {
    const category = result.capability.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ ...result, index });
    return acc;
  }, {} as Record<CapabilityCategory, (CapabilityResult & { index: number })[]>);

  return (
    <div className="space-y-4 sm:space-y-6">
      {CATEGORY_ORDER.map((category) => {
        const items = groupedResults[category];
        if (!items || items.length === 0) return null;

        const config = CATEGORY_CONFIG[category];

        return (
          <div key={category}>
            {/* Category header */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-lg sm:text-xl">{config?.icon}</span>
              <h3 className="font-semibold text-gray-700 text-sm sm:text-base">{category}</h3>
            </div>

            {/* Capability cards */}
            <div className="space-y-2">
              {items.map((item) => (
                <CapabilityCard
                  key={item.capability.id}
                  capability={item.capability}
                  score={item.score}
                  weightedScore={item.weightedScore}
                  tier={item.tier}
                  isHovered={hoveredIndex === item.index}
                  onHover={(hovered) => onHover(hovered ? item.index : null)}
                  onClick={() => onCapabilityClick?.(item.capability.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
