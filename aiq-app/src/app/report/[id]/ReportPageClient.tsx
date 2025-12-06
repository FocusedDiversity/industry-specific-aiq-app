'use client';

import { useEffect, useState } from 'react';
import { ReportDashboard } from '@/components/report/ReportDashboard';
import { AssessmentResult } from '@/types';

// Demo data for development - in production this would be fetched from Firestore
function getDemoResults(): AssessmentResult {
  return {
    submission: {
      id: 'demo-123',
      industry: 'healthcare',
      email: 'demo@example.com',
      name: 'Demo User',
      title: 'VP of Data & Analytics',
      company: 'Demo Healthcare',
      responses: [
        { capabilityId: 'strategy-leadership', score: 4 },
        { capabilityId: 'people-culture', score: 3 },
        { capabilityId: 'architecture-governance', score: 3 },
        { capabilityId: 'product-management', score: 2 },
        { capabilityId: 'user-experience-ethics', score: 4 },
        { capabilityId: 'data-sourcing', score: 3 },
        { capabilityId: 'data-operations', score: 4 },
        { capabilityId: 'analytics', score: 2 },
        { capabilityId: 'using-ai-products', score: 3 },
        { capabilityId: 'building-ai-products', score: 2 },
        { capabilityId: 'customers-ai-products', score: 1 },
      ],
      topPriorities: ['building-ai-products', 'analytics', 'customers-ai-products'],
      priorityNotes: 'We want to focus on building internal AI capabilities and improving our customer-facing AI experiences.',
      consentGiven: true,
      consentTimestamp: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    },
    totalScore: 76,
    maxScore: 135,
    percentageScore: 56,
    categoryScores: {
      'Organization Foundations': { score: 40, maxScore: 60, tier: 'developing' },
      'Product Lifecycle': { score: 18, maxScore: 30, tier: 'developing' },
      'Data Infrastructure': { score: 18, maxScore: 30, tier: 'developing' },
      'AI & Machine Learning': { score: 6, maxScore: 15, tier: 'emerging' },
    },
    capabilityResults: [
      { capability: { id: 'strategy-leadership', name: 'Strategy & Leadership', category: 'Organization Foundations', weight: 4 }, score: 4, weightedScore: 16, tier: 'leading' },
      { capability: { id: 'people-culture', name: 'People & Culture', category: 'Organization Foundations', weight: 4 }, score: 3, weightedScore: 12, tier: 'developing' },
      { capability: { id: 'architecture-governance', name: 'Architecture & Governance', category: 'Organization Foundations', weight: 4 }, score: 3, weightedScore: 12, tier: 'developing' },
      { capability: { id: 'product-management', name: 'Product Management', category: 'Product Lifecycle', weight: 3 }, score: 2, weightedScore: 6, tier: 'emerging' },
      { capability: { id: 'user-experience-ethics', name: 'User Experience & Ethics', category: 'Product Lifecycle', weight: 3 }, score: 4, weightedScore: 12, tier: 'leading' },
      { capability: { id: 'data-sourcing', name: 'Data Sourcing', category: 'Data Infrastructure', weight: 2 }, score: 3, weightedScore: 6, tier: 'developing' },
      { capability: { id: 'data-operations', name: 'Data Operations', category: 'Data Infrastructure', weight: 2 }, score: 4, weightedScore: 8, tier: 'leading' },
      { capability: { id: 'analytics', name: 'Analytics', category: 'Data Infrastructure', weight: 2 }, score: 2, weightedScore: 4, tier: 'emerging' },
      { capability: { id: 'using-ai-products', name: 'Using AI Products', category: 'AI & Machine Learning', weight: 1 }, score: 3, weightedScore: 3, tier: 'developing' },
      { capability: { id: 'building-ai-products', name: 'Building AI Products', category: 'AI & Machine Learning', weight: 1 }, score: 2, weightedScore: 2, tier: 'emerging' },
      { capability: { id: 'customers-ai-products', name: 'Customers AI Products', category: 'AI & Machine Learning', weight: 1 }, score: 1, weightedScore: 1, tier: 'emerging' },
    ],
    recommendations: [
      { id: 'hc-strategy-guide', title: 'Healthcare AI Strategy Playbook', type: 'playbook', url: 'https://synaptiq.ai/resources/healthcare-ai-strategy', industry: 'healthcare', capabilities: ['strategy-leadership', 'architecture-governance'], maturityTiers: ['emerging', 'developing'] },
      { id: 'hc-clinical-ai', title: 'Clinical AI Implementation Guide', type: 'whitepaper', url: 'https://synaptiq.ai/resources/clinical-ai-guide', industry: 'healthcare', capabilities: ['building-ai-products', 'user-experience-ethics'], maturityTiers: ['developing', 'leading'] },
      { id: 'hc-data-governance', title: 'Healthcare Data Governance Framework', type: 'playbook', url: 'https://synaptiq.ai/resources/healthcare-data-governance', industry: 'healthcare', capabilities: ['data-sourcing', 'data-operations', 'architecture-governance'], maturityTiers: ['emerging', 'developing'] },
      { id: 'hc-case-study-1', title: 'Case Study: AI-Powered Patient Engagement', type: 'case_study', url: 'https://synaptiq.ai/case-studies/patient-engagement-ai', industry: 'healthcare', capabilities: ['customers-ai-products', 'user-experience-ethics'], maturityTiers: ['developing', 'leading'] },
      { id: 'hc-analytics-maturity', title: 'Healthcare Analytics Maturity Assessment', type: 'article', url: 'https://synaptiq.ai/articles/healthcare-analytics-maturity', industry: 'healthcare', capabilities: ['analytics', 'data-operations'], maturityTiers: ['emerging', 'developing', 'leading'] },
    ],
  };
}

interface ReportPageClientProps {
  id: string;
}

export function ReportPageClient({ id }: ReportPageClientProps) {
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        // In development/demo, use demo data
        // In production, fetch from API/Firestore
        if (id === 'demo') {
          setResults(getDemoResults());
        } else {
          // Try to fetch from session storage (set by assessment submission)
          const storedResults = sessionStorage.getItem(`assessment-${id}`);
          if (storedResults) {
            setResults(JSON.parse(storedResults));
          } else {
            // For now, show demo data
            // In production, would fetch from Firestore via API
            setResults(getDemoResults());
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
          <p className="mt-8 text-gray-600">Loading your results...</p>
        </div>
      </main>
    );
  }

  if (error || !results) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Results
          </h1>
          <p className="text-gray-600 mb-8">
            {error || 'Assessment results not found.'}
          </p>
          <a
            href="/assessment"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take the Assessment
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <ReportDashboard results={results} />
      </div>
    </main>
  );
}
