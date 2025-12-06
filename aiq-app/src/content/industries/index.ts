import { Industry, IndustryContent, CapabilityPrompt, NarrativeInsight, Resource, CapabilityCategory, MaturityTier } from '@/types';
import { healthcareContent } from './healthcare';
import { legalContent } from './legal';
import { CAPABILITIES, getCapabilityById } from '../capabilities';

// All industry content configurations
const INDUSTRY_CONTENT: Record<Industry, IndustryContent> = {
  healthcare: healthcareContent,
  legal: legalContent,
};

// Get content for a specific industry
export function getIndustryContent(industry: Industry): IndustryContent {
  const content = INDUSTRY_CONTENT[industry];
  if (!content) {
    throw new Error(`Industry '${industry}' not found`);
  }
  return content;
}

// Get prompt for a specific capability and industry
export function getCapabilityPrompt(
  industry: Industry,
  capabilityId: string
): CapabilityPrompt | undefined {
  const content = INDUSTRY_CONTENT[industry];
  return content?.prompts.find((p) => p.capabilityId === capabilityId);
}

// Get prompts for all capabilities in an industry, ordered by capability definition
export function getOrderedPrompts(industry: Industry): CapabilityPrompt[] {
  const content = INDUSTRY_CONTENT[industry];
  if (!content) return [];

  return CAPABILITIES.map((cap) => {
    const prompt = content.prompts.find((p) => p.capabilityId === cap.id);
    if (!prompt) {
      throw new Error(`Missing prompt for capability '${cap.id}' in industry '${industry}'`);
    }
    return prompt;
  });
}

// Get narrative for a specific category and tier
export function getNarrative(
  industry: Industry,
  category: CapabilityCategory,
  tier: MaturityTier
): NarrativeInsight | undefined {
  const content = INDUSTRY_CONTENT[industry];
  return content?.narratives.find(
    (n) => n.category === category && n.tier === tier
  );
}

// Get all narratives for an industry
export function getNarratives(industry: Industry): NarrativeInsight[] {
  return INDUSTRY_CONTENT[industry]?.narratives || [];
}

// Get resources matching criteria
export function getResources(
  industry: Industry,
  options?: {
    capabilityIds?: string[];
    maturityTier?: MaturityTier;
    limit?: number;
  }
): Resource[] {
  const content = INDUSTRY_CONTENT[industry];
  if (!content) return [];

  let resources = content.resources;

  // Filter by capability
  if (options?.capabilityIds?.length) {
    resources = resources.filter((r) =>
      r.capabilities.some((c) => options.capabilityIds!.includes(c))
    );
  }

  // Filter by maturity tier
  if (options?.maturityTier) {
    resources = resources.filter((r) =>
      r.maturityTiers.includes(options.maturityTier!)
    );
  }

  // Apply limit
  if (options?.limit) {
    resources = resources.slice(0, options.limit);
  }

  return resources;
}

// Get available industries
export function getAvailableIndustries(): { id: Industry; displayName: string }[] {
  return Object.entries(INDUSTRY_CONTENT).map(([id, content]) => ({
    id: id as Industry,
    displayName: content.displayName,
  }));
}

// Validate that all capabilities have prompts for all industries
export function validateContent(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const industry of Object.keys(INDUSTRY_CONTENT) as Industry[]) {
    const content = INDUSTRY_CONTENT[industry];

    // Check all capabilities have prompts
    for (const cap of CAPABILITIES) {
      const prompt = content.prompts.find((p) => p.capabilityId === cap.id);
      if (!prompt) {
        errors.push(`Missing prompt for capability '${cap.id}' in industry '${industry}'`);
      }
    }

    // Check all category/tier combinations have narratives
    const categories: CapabilityCategory[] = [
      'Organization Foundations',
      'Product Lifecycle',
      'Data Infrastructure',
      'AI & Machine Learning',
    ];
    const tiers: MaturityTier[] = ['emerging', 'developing', 'leading'];

    for (const category of categories) {
      for (const tier of tiers) {
        const narrative = content.narratives.find(
          (n) => n.category === category && n.tier === tier
        );
        if (!narrative) {
          errors.push(`Missing narrative for category '${category}', tier '${tier}' in industry '${industry}'`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export { CAPABILITIES, getCapabilityById };
