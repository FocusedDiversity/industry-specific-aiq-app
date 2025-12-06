'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MaturityScore, Capability, CapabilityCategory } from '@/types';
import { getMaturityColor, CATEGORY_CONFIG } from '@/lib/utils/design';

export interface SliceData {
  capability: Capability;
  score: MaturityScore;
  weightedScore: number;
}

interface DonutChartProps {
  slices: SliceData[];
  totalScore: number;
  maxScore: number;
  hoveredSlice: number | null;
  onSliceHover: (index: number | null) => void;
  onSliceClick?: (index: number) => void;
  animate?: boolean;
}

export function DonutChart({
  slices,
  totalScore,
  maxScore,
  hoveredSlice,
  onSliceHover,
  onSliceClick,
  animate = true,
}: DonutChartProps) {
  const [animatedValues, setAnimatedValues] = useState<Set<MaturityScore>>(new Set());
  const [showScore, setShowScore] = useState(!animate);
  const [showLabel, setShowLabel] = useState(!animate);

  // Chart dimensions
  const outerRadius = 150;
  const innerRadius = 90;
  const centerX = 200;
  const centerY = 200;

  // Calculate slice angle dynamically based on number of slices
  const sliceAngle = 360 / slices.length;

  // Create SVG path for a slice
  const createSlicePath = (index: number): string => {
    const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);

    const x1Outer = centerX + outerRadius * Math.cos(startAngle);
    const y1Outer = centerY + outerRadius * Math.sin(startAngle);
    const x2Outer = centerX + outerRadius * Math.cos(endAngle);
    const y2Outer = centerY + outerRadius * Math.sin(endAngle);

    const x1Inner = centerX + innerRadius * Math.cos(startAngle);
    const y1Inner = centerY + innerRadius * Math.sin(startAngle);
    const x2Inner = centerX + innerRadius * Math.cos(endAngle);
    const y2Inner = centerY + innerRadius * Math.sin(endAngle);

    // Use large arc flag if slice is > 180 degrees
    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    return `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner} Z`;
  };

  // Animation effect - pop out slices by value (lightest to darkest)
  useEffect(() => {
    if (!animate) {
      setAnimatedValues(new Set([1, 2, 3, 4, 5]));
      setShowScore(true);
      setShowLabel(true);
      return;
    }

    const animateByValue = (value: MaturityScore, delay: number) => {
      setTimeout(() => {
        setAnimatedValues((prev) => new Set([...prev, value]));
      }, delay);
    };

    // Animate from value 1 (lightest) to value 5 (darkest)
    animateByValue(1, 300);
    animateByValue(2, 800);
    animateByValue(3, 1300);
    animateByValue(4, 1800);
    animateByValue(5, 2300);

    // Show score after all slices have popped out
    setTimeout(() => setShowScore(true), 2800);
    // Show AIQ label after score
    setTimeout(() => setShowLabel(true), 3300);
  }, [animate]);

  // Calculate percentage
  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      className="drop-shadow-lg"
      role="img"
      aria-label={`AIQ Score: ${totalScore} out of ${maxScore}`}
    >
      {slices.map((slice, index) => {
        const isAnimated = animatedValues.has(slice.score);
        const isHovered = hoveredSlice === index;
        const color = getMaturityColor(slice.score);

        return (
          <path
            key={`${slice.capability.id}-${index}`}
            d={createSlicePath(index)}
            fill={color}
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer"
            style={{
              opacity: hoveredSlice === null || isHovered ? 1 : 0.3,
              transform: isHovered
                ? 'scale(1.05)'
                : isAnimated
                  ? 'scale(1)'
                  : 'scale(0.8)',
              transformOrigin: `${centerX}px ${centerY}px`,
              transition: isHovered
                ? 'all 0.2s ease-out'
                : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onMouseEnter={() => onSliceHover(index)}
            onMouseLeave={() => onSliceHover(null)}
            onClick={() => onSliceClick?.(index)}
            role="button"
            tabIndex={0}
            aria-label={`${slice.capability.name}: ${slice.score} out of 5`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSliceClick?.(index);
              }
            }}
          />
        );
      })}

      {/* Center text - Label */}
      <text
        x={centerX}
        y={centerY - 15}
        textAnchor="middle"
        className="fill-gray-600 font-bold pointer-events-none"
        style={{
          fontSize: '16px',
          opacity: showLabel ? 1 : 0,
          transition: 'opacity 0.8s ease-in',
        }}
      >
        AIQ Score
      </text>

      {/* Center text - Score */}
      <text
        x={centerX}
        y={centerY + 20}
        textAnchor="middle"
        className="fill-gray-800 font-bold pointer-events-none"
        style={{
          fontSize: '36px',
          opacity: showScore ? 1 : 0,
          transition: 'opacity 0.8s ease-in',
        }}
      >
        {totalScore}
      </text>

      {/* Center text - Percentage */}
      <text
        x={centerX}
        y={centerY + 45}
        textAnchor="middle"
        className="fill-gray-500 pointer-events-none"
        style={{
          fontSize: '14px',
          opacity: showScore ? 1 : 0,
          transition: 'opacity 0.8s ease-in',
        }}
      >
        {percentage}%
      </text>
    </svg>
  );
}
