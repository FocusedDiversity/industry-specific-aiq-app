'use client';

import { MaturityScore } from '@/types';
import { getMaturityColor, SCORE_LABELS } from '@/lib/utils/design';

export function ColorLegend() {
  const scores: MaturityScore[] = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
      <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-center text-sm sm:text-base">Readiness Scale</h3>
      <div className="flex justify-between">
        {scores.map((score) => (
          <div key={score} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm"
              style={{
                backgroundColor: getMaturityColor(score),
                color: score >= 3 ? 'white' : '#1e3a5f',
              }}
            >
              {score}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-600 text-center">{SCORE_LABELS[score]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
