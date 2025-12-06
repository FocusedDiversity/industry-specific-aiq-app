'use client';

import { MaturityScore } from '@/types';
import { getMaturityColor, SCORE_LABELS } from '@/lib/utils/design';

export function ColorLegend() {
  const scores: MaturityScore[] = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h3 className="font-semibold text-gray-700 mb-3">Maturity Scale</h3>
      <div className="space-y-2">
        {scores.map((score) => (
          <div key={score} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: getMaturityColor(score),
                color: score >= 3 ? 'white' : '#1e3a5f',
              }}
            >
              {score}
            </div>
            <span className="text-sm text-gray-600">{SCORE_LABELS[score]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
