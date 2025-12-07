'use client';

import React, { useState, useEffect } from 'react';
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
  animate = false,
}: DonutChartProps) {
  const [animatedValues] = useState<Set<MaturityScore>>(new Set([1, 2, 3, 4, 5]));
  const [showScore] = useState(true);
  const [showLabel] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [chartOpacity, setChartOpacity] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  const [logoPhase, setLogoPhase] = useState<'fadeIn' | 'loop' | 'fadeOut'>('fadeIn');

  // Logo and chart animation sequence
  useEffect(() => {
    // Phase 1: Logo fades in and starts butterfly flight (0-500ms)
    const fadeInTimer = setTimeout(() => {
      setLogoPhase('loop');
    }, 500);

    // Phase 2: Logo butterfly flight completes, start fade out (500ms + 3000ms = 3500ms)
    const fadeOutTimer = setTimeout(() => {
      setLogoPhase('fadeOut');
    }, 3500);

    // Phase 3: Logo fades out, chart fades in and starts spinning (4000ms)
    const hideLogoTimer = setTimeout(() => {
      setShowLogo(false);
      setChartOpacity(1);
      setIsSpinning(true);
    }, 4000);

    // Phase 4: Stop spinning after 2 seconds of spinning (6000ms)
    const stopSpinTimer = setTimeout(() => {
      setIsSpinning(false);
    }, 6000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideLogoTimer);
      clearTimeout(stopSpinTimer);
    };
  }, []);

  // Chart dimensions
  const outerRadius = 180;
  const innerRadius = 110;
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


  // Calculate percentage
  const percentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-square mx-auto">
      {/* Logo animation */}
      {showLogo && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: logoPhase === 'fadeOut' ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <img
            src="/synaptiq-logo.png"
            alt="Synaptiq"
            className="logo-animation"
            style={{
              width: logoPhase === 'fadeIn' ? '40px' : '80px',
              height: logoPhase === 'fadeIn' ? '40px' : '80px',
              opacity: logoPhase === 'fadeIn' ? 0 : 1,
              transition: logoPhase === 'fadeOut' ? 'opacity 0.5s ease-out' : 'all 0.5s ease-out',
              animation: logoPhase === 'loop' ? 'logo-loop 3s ease-in-out forwards' : 'none',
              // Keep final position during fadeOut (matches end of logo-loop animation)
              transform: logoPhase === 'fadeOut' ? 'translate(80px, 80px) scale(1) rotate(0deg)' : undefined,
            }}
          />
        </div>
      )}

      {/* Donut chart */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        className="drop-shadow-lg"
        role="img"
        aria-label={`AIQ Score: ${totalScore} out of ${maxScore}`}
        style={{
          opacity: chartOpacity,
          transition: 'opacity 0.5s ease-in',
        }}
      >
      <g
        style={{
          transformOrigin: `${centerX}px ${centerY}px`,
          animation: isSpinning ? 'spin-decelerate 2s ease-out forwards' : 'none',
        }}
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
      </g>

      {/* Center text - show capability name on hover, otherwise show score */}
      {hoveredSlice !== null ? (
        <>
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            className="fill-gray-800 font-bold pointer-events-none"
            style={{ fontSize: '14px' }}
          >
            {slices[hoveredSlice].capability.name}
          </text>
          <text
            x={centerX}
            y={centerY + 25}
            textAnchor="middle"
            className="fill-gray-600 pointer-events-none"
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          >
            {slices[hoveredSlice].score}/5
          </text>
        </>
      ) : (
        <>
          {/* Center text - Label */}
          <text
            x={centerX}
            y={centerY - 15}
            textAnchor="middle"
            className="fill-gray-600 font-bold pointer-events-none"
            style={{ fontSize: '16px' }}
          >
            AIQ Score
          </text>

          {/* Center text - Score */}
          <text
            x={centerX}
            y={centerY + 20}
            textAnchor="middle"
            className="fill-gray-800 font-bold pointer-events-none"
            style={{ fontSize: '36px' }}
          >
            {totalScore}
          </text>

          {/* Center text - Percentage */}
          <text
            x={centerX}
            y={centerY + 45}
            textAnchor="middle"
            className="fill-gray-500 pointer-events-none"
            style={{ fontSize: '14px' }}
          >
            {percentage}%
          </text>
        </>
      )}
      </svg>
    </div>
  );
}
