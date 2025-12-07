'use client';

import { useState } from 'react';
import { AssessmentResult, Industry } from '@/types';
import { DonutChart, SliceData } from './DonutChart';
import { CapabilityList } from './CapabilityList';
import { NarrativeInsights } from './NarrativeInsights';
import { ResourceRecommendations } from './ResourceRecommendations';
import { CTASection } from './CTASection';
import { ColorLegend } from './ColorLegend';

interface ReportDashboardProps {
  results: AssessmentResult;
}

export function ReportDashboard({ results }: ReportDashboardProps) {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  // Prepare slice data for donut chart
  const sliceData: SliceData[] = results.capabilityResults.map((result) => ({
    capability: result.capability,
    score: result.score,
    weightedScore: result.weightedScore,
  }));

  // Get industry display name
  const industryName = results.submission.industry === 'healthcare' ? 'Healthcare' : 'Legal';

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Your AIQ Assessment Results
        </h1>
        <p className="text-xl text-gray-600">
          {industryName} Industry | {results.percentageScore}% AI Maturity
        </p>
      </div>

      {/* Main visualization section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Donut chart */}
          <div className="lg:w-1/2 flex flex-col items-center justify-center">
            <DonutChart
              slices={sliceData}
              totalScore={results.totalScore}
              maxScore={results.maxScore}
              hoveredSlice={hoveredSlice}
              onSliceHover={setHoveredSlice}
            />
            <div className="mt-4">
              <ColorLegend />
            </div>
          </div>

          {/* Capability list */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Capability Scores
            </h2>
            <CapabilityList
              results={results.capabilityResults}
              hoveredIndex={hoveredSlice}
              onHover={setHoveredSlice}
            />
          </div>
        </div>
      </div>

      {/* Narrative insights */}
      <NarrativeInsights
        industry={results.submission.industry}
        categoryScores={results.categoryScores}
      />

      {/* Your priorities section */}
      {results.submission.topPriorities.length > 0 && (
        <div className="bg-red-50 rounded-2xl p-8 border border-[#cc5e58]/30">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Priority Areas
          </h2>
          <div className="flex flex-wrap gap-3">
            {results.submission.topPriorities.map((priorityId, index) => {
              const result = results.capabilityResults.find(
                (r) => r.capability.id === priorityId
              );
              if (!result) return null;

              return (
                <div
                  key={priorityId}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-[#cc5e58]/30"
                >
                  <span className="w-6 h-6 bg-[#cc5e58] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">
                    {result.capability.name}
                  </span>
                </div>
              );
            })}
          </div>
          {results.submission.priorityNotes && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-[#cc5e58]/30">
              <p className="text-sm text-gray-600 italic">
                &ldquo;{results.submission.priorityNotes}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}

      {/* Resource recommendations */}
      <ResourceRecommendations
        resources={results.recommendations}
        priorityCapabilities={results.submission.topPriorities}
      />

      {/* CTA section */}
      <CTASection />

      {/* Footer */}
      <div className="text-center text-sm text-[#f7cfa5] pt-8 border-t border-[#f7cfa5]">
        <p>
          Assessment completed on{' '}
          {new Date(results.submission.submittedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="mt-2">
          Powered by{' '}
          <a
            href="https://synaptiq.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a1b8ca] hover:underline"
          >
            Synaptiq
          </a>
        </p>
      </div>
    </div>
  );
}
