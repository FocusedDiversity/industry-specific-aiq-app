"use client";

import { useState } from "react";
import { AssessmentResult } from "@/types";
import { DonutChart, SliceData } from "./DonutChart";
import { NarrativeInsights } from "./NarrativeInsights";
import { ResourceRecommendations } from "./ResourceRecommendations";
import { CTASection } from "./CTASection";
import { ColorLegend } from "./ColorLegend";

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
  const industryName =
    results.submission.industry === "healthcare" ? "Healthcare" : "Legal";

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
          Your AI Readiness (AIQ) Report
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300">
          {industryName} Industry
        </p>
      </div>

      {/* Row 1: Donut chart and Maturity Scale */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center">
          <DonutChart
            slices={sliceData}
            totalScore={results.totalScore}
            maxScore={results.maxScore}
            hoveredSlice={hoveredSlice}
            onSliceHover={setHoveredSlice}
          />
          <p className="mt-4 text-sm text-gray-500 text-center">
            Hover or tap on a slice to see capability details
          </p>
          <div className="mt-4 w-full max-w-lg">
            <ColorLegend />
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
        <div className="bg-red-50 rounded-2xl p-4 sm:p-6 md:p-8 border border-[#cc5e58]/30">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Your Priority Areas
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {results.submission.topPriorities.map((priorityId, index) => {
              const result = results.capabilityResults.find(
                (r) => r.capability.id === priorityId,
              );
              if (!result) return null;

              return (
                <div
                  key={priorityId}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg shadow-sm border border-[#cc5e58]/30"
                >
                  <span className="w-6 h-6 bg-[#cc5e58] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    {result.capability.name}
                  </span>
                </div>
              );
            })}
          </div>
          {results.submission.priorityNotes && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white rounded-lg border border-[#cc5e58]/30">
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
      <div className="pt-8">
        <div className="w-3/4 mx-auto border-t border-[#f7cfa5] mb-8"></div>
        <div className="text-center text-sm text-[#f7cfa5]">
          <p>
            Assessment completed on{" "}
            {new Date(results.submission.submittedAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </p>
          <p className="mt-2">
            Powered by{" "}
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
    </div>
  );
}
