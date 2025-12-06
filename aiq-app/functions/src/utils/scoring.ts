import {
  AssessmentSubmission,
  AssessmentResult,
  Capability,
  CapabilityCategory,
  CATEGORY_WEIGHTS,
  MaturityScore,
  MaturityTier,
  getMaturityTier,
  Resource,
} from '../types';
import { CAPABILITIES } from '../content/capabilities';
import { getHealthcareContent } from '../content/healthcare';
import { getLegalContent } from '../content/legal';

// Calculate average maturity tier for a category
function getCategoryTier(scores: MaturityScore[]): MaturityTier {
  if (scores.length === 0) return 'emerging';
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (avg <= 2) return 'emerging';
  if (avg <= 3.5) return 'developing';
  return 'leading';
}

// Get relevant resources based on priorities and scores
function getRecommendations(
  submission: AssessmentSubmission,
  capabilityResults: AssessmentResult['capabilityResults']
): Resource[] {
  // Get industry content
  const content = submission.industry === 'healthcare'
    ? getHealthcareContent()
    : getLegalContent();

  const resources = content.resources;

  // Score each resource based on relevance
  const scoredResources = resources.map((resource) => {
    let score = 0;

    // Boost resources matching top priorities
    for (const priority of submission.topPriorities) {
      if (resource.capabilities.includes(priority)) {
        score += 10;
      }
    }

    // Boost resources matching low-scoring capabilities
    for (const result of capabilityResults) {
      if (resource.capabilities.includes(result.capability.id)) {
        // More relevant for lower scores
        score += (6 - result.score);

        // Match maturity tier
        if (resource.maturityTiers.includes(result.tier)) {
          score += 3;
        }
      }
    }

    return { resource, score };
  });

  // Sort by score and return top 5
  return scoredResources
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((sr) => sr.resource);
}

export function calculateResults(submission: AssessmentSubmission): AssessmentResult {
  // Build capability lookup
  const capabilityMap = new Map<string, Capability>();
  for (const cap of CAPABILITIES) {
    capabilityMap.set(cap.id, cap);
  }

  // Calculate per-capability results
  const capabilityResults: AssessmentResult['capabilityResults'] = [];
  const categoryScoreMap: Record<CapabilityCategory, MaturityScore[]> = {
    'Organization Foundations': [],
    'Product Lifecycle': [],
    'Data Infrastructure': [],
    'AI & Machine Learning': [],
  };

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

  // Calculate category scores
  const categoryScores: AssessmentResult['categoryScores'] = {} as AssessmentResult['categoryScores'];

  for (const [category, weight] of Object.entries(CATEGORY_WEIGHTS) as [CapabilityCategory, number][]) {
    const scores = categoryScoreMap[category];
    const categoryScore = scores.reduce((a, b) => a + b, 0) * weight;
    const maxCategoryScore = scores.length * 5 * weight;

    categoryScores[category] = {
      score: categoryScore,
      maxScore: maxCategoryScore,
      tier: getCategoryTier(scores),
    };
  }

  // Calculate max possible score
  const maxScore = CAPABILITIES.reduce((total, cap) => total + 5 * cap.weight, 0);

  // Get recommendations
  const recommendations = getRecommendations(submission, capabilityResults);

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
