'use client';

import { useState } from 'react';
import { MaturityScore } from '@/types';
import { getMaturityColor, SCORE_LABELS } from '@/lib/utils/design';

interface MaturityRatingProps {
  value: MaturityScore | null;
  onChange: (value: MaturityScore) => void;
  prompt: string;
  helperText: string;
  capabilityName: string;
  disabled?: boolean;
}

export function MaturityRating({
  value,
  onChange,
  prompt,
  helperText,
  capabilityName,
  disabled = false,
}: MaturityRatingProps) {
  const [showHelper, setShowHelper] = useState(false);
  const [hoveredScore, setHoveredScore] = useState<MaturityScore | null>(null);

  const scores: MaturityScore[] = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      {/* Capability name */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{capabilityName}</h3>
        <button
          type="button"
          onClick={() => setShowHelper(!showHelper)}
          className="text-gray-400 hover:text-blue-600 transition-colors"
          aria-label="Toggle helper text"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Prompt */}
      <p className="text-gray-700 mb-4">{prompt}</p>

      {/* Helper text (collapsible) */}
      {showHelper && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-800">
          <p>{helperText}</p>
        </div>
      )}

      {/* Rating buttons */}
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>Nascent</span>
          <span>Leading</span>
        </div>

        <div className="flex gap-1 sm:gap-2">
          {scores.map((score) => {
            const isSelected = value === score;
            const isHovered = hoveredScore === score;
            const color = getMaturityColor(score);

            return (
              <button
                key={score}
                type="button"
                disabled={disabled}
                onClick={() => onChange(score)}
                onMouseEnter={() => setHoveredScore(score)}
                onMouseLeave={() => setHoveredScore(null)}
                className={`
                  flex-1 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 min-h-[44px]
                  ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  ${isSelected
                    ? 'ring-2 ring-offset-2 ring-blue-600 transform scale-105'
                    : isHovered
                      ? 'transform scale-102'
                      : ''
                  }
                `}
                style={{
                  backgroundColor: color,
                  color: score >= 3 ? 'white' : '#1e3a5f',
                }}
              >
                {score}
              </button>
            );
          })}
        </div>

        {/* Score label */}
        <div className="text-center h-6">
          {(hoveredScore || value) && (
            <span className="text-sm font-medium text-gray-600">
              {SCORE_LABELS[hoveredScore || value!]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
