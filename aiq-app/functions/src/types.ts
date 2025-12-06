// Industry types
export type Industry = 'healthcare' | 'legal';

// Capability categories with weights
export type CapabilityCategory =
  | 'Organization Foundations'
  | 'Product Lifecycle'
  | 'Data Infrastructure'
  | 'AI & Machine Learning';

export const CATEGORY_WEIGHTS: Record<CapabilityCategory, number> = {
  'Organization Foundations': 4,
  'Product Lifecycle': 3,
  'Data Infrastructure': 2,
  'AI & Machine Learning': 1,
};

// Maturity scale 1-5
export type MaturityScore = 1 | 2 | 3 | 4 | 5;

// Maturity tier based on score
export type MaturityTier = 'emerging' | 'developing' | 'leading';

export function getMaturityTier(score: MaturityScore): MaturityTier {
  if (score <= 2) return 'emerging';
  if (score === 3) return 'developing';
  return 'leading';
}

// Capability definition
export interface Capability {
  id: string;
  name: string;
  category: CapabilityCategory;
  weight: number;
}

// Industry-specific capability prompt
export interface CapabilityPrompt {
  capabilityId: string;
  industry: Industry;
  prompt: string;
  helperText: string;
}

// Resource recommendation
export interface Resource {
  id: string;
  title: string;
  type: 'case_study' | 'playbook' | 'webinar' | 'article' | 'whitepaper';
  url: string;
  industry: Industry | 'all';
  capabilities: string[];
  maturityTiers: MaturityTier[];
}

// User's assessment response for a single capability
export interface CapabilityResponse {
  capabilityId: string;
  score: MaturityScore;
}

// Complete assessment submission
export interface AssessmentSubmission {
  id?: string;
  industry: Industry;
  email: string;
  name?: string;
  title?: string;
  company?: string;
  responses: CapabilityResponse[];
  topPriorities: string[];
  priorityNotes?: string;
  consentGiven: boolean;
  consentTimestamp: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  submittedAt: string;
}

// Calculated assessment result
export interface AssessmentResult {
  submission: AssessmentSubmission;
  totalScore: number;
  maxScore: number;
  percentageScore: number;
  categoryScores: Record<CapabilityCategory, {
    score: number;
    maxScore: number;
    tier: MaturityTier;
  }>;
  capabilityResults: Array<{
    capability: Capability;
    score: MaturityScore;
    weightedScore: number;
    tier: MaturityTier;
  }>;
  recommendations: Resource[];
}

// Narrative insight for a capability tier
export interface NarrativeInsight {
  industry: Industry;
  category: CapabilityCategory;
  tier: MaturityTier;
  headline: string;
  body: string;
}

// Complete industry content configuration
export interface IndustryContent {
  industry: Industry;
  displayName: string;
  prompts: CapabilityPrompt[];
  narratives: NarrativeInsight[];
  resources: Resource[];
}
