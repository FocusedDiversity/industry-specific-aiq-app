import { NextRequest, NextResponse } from 'next/server';
import { AssessmentSubmission, AssessmentResult, MaturityScore, getMaturityTier, CapabilityCategory, CATEGORY_WEIGHTS } from '@/types';
import { CAPABILITIES } from '@/content/capabilities';
import { getIndustryContent } from '@/content/industries';

// Calculate assessment results (client-side preview before Cloud Function)
function calculateResults(submission: AssessmentSubmission): AssessmentResult {
  const capabilityMap = new Map(CAPABILITIES.map(cap => [cap.id, cap]));

  const categoryScoreMap: Record<CapabilityCategory, MaturityScore[]> = {
    'Organization Foundations': [],
    'Product Lifecycle': [],
    'Data Infrastructure': [],
    'AI & Machine Learning': [],
  };

  const capabilityResults: AssessmentResult['capabilityResults'] = [];
  let totalScore = 0;

  for (const response of submission.responses) {
    const capability = capabilityMap.get(response.capabilityId);
    if (!capability) continue;

    const weightedScore = response.score * capability.weight;
    totalScore += weightedScore;
    const tier = getMaturityTier(response.score);

    capabilityResults.push({
      capability,
      score: response.score,
      weightedScore,
      tier,
    });

    categoryScoreMap[capability.category].push(response.score);
  }

  const categoryScores: AssessmentResult['categoryScores'] = {} as AssessmentResult['categoryScores'];

  for (const [category, weight] of Object.entries(CATEGORY_WEIGHTS) as [CapabilityCategory, number][]) {
    const scores = categoryScoreMap[category];
    const categoryScore = scores.reduce((a, b) => a + b, 0) * weight;
    const maxCategoryScore = scores.length * 5 * weight;
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    categoryScores[category] = {
      score: categoryScore,
      maxScore: maxCategoryScore,
      tier: avgScore <= 2 ? 'emerging' : avgScore <= 3.5 ? 'developing' : 'leading',
    };
  }

  const maxScore = CAPABILITIES.reduce((total, cap) => total + 5 * cap.weight, 0);

  // Get recommendations
  const content = getIndustryContent(submission.industry);
  const recommendations = content.resources.slice(0, 5);

  return {
    submission,
    totalScore,
    maxScore,
    percentageScore: Math.round((totalScore / maxScore) * 100),
    categoryScores,
    capabilityResults,
    recommendations,
  };
}

// Basic validation
function validateSubmission(submission: AssessmentSubmission): string | null {
  if (!submission.industry || !['healthcare', 'legal'].includes(submission.industry)) {
    return 'Invalid industry';
  }

  if (!submission.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return 'Valid email is required';
  }

  if (!submission.consentGiven) {
    return 'Consent is required';
  }

  if (!Array.isArray(submission.responses) || submission.responses.length !== 11) {
    return 'All 11 capability responses are required';
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const submission: AssessmentSubmission = await request.json();

    // Validate
    const validationError = validateSubmission(submission);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Generate ID
    const assessmentId = crypto.randomUUID();
    const submissionWithId: AssessmentSubmission = {
      ...submission,
      id: assessmentId,
      submittedAt: new Date().toISOString(),
    };

    // Calculate results
    const results = calculateResults(submissionWithId);

    // In production, this would call the Cloud Function
    // For now, store in memory/session for demo purposes
    // The Cloud Function would handle Firestore storage and HubSpot sync

    // Store results temporarily (in production, use Firestore via Cloud Function)
    // For demo, we'll pass results via URL params or session

    return NextResponse.json({
      success: true,
      assessmentId,
      results: {
        totalScore: results.totalScore,
        maxScore: results.maxScore,
        percentageScore: results.percentageScore,
        categoryScores: results.categoryScores,
        capabilityResults: results.capabilityResults,
      },
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
