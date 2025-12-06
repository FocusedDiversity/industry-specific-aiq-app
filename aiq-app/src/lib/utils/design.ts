import { MaturityScore, MaturityTier } from '@/types';

// Maturity score to color mapping
export const MATURITY_COLORS: Record<MaturityScore, string> = {
  1: '#dbeafe', // Very light blue
  2: '#93c5fd', // Light blue
  3: '#3b82f6', // Medium blue
  4: '#1d4ed8', // Dark blue
  5: '#1e3a8a', // Very dark blue
};

// Get color for a maturity score
export function getMaturityColor(score: MaturityScore): string {
  return MATURITY_COLORS[score];
}

// Get Tailwind class for maturity score background
export function getMaturityBgClass(score: MaturityScore): string {
  const classes: Record<MaturityScore, string> = {
    1: 'bg-blue-100',
    2: 'bg-blue-300',
    3: 'bg-blue-500',
    4: 'bg-blue-700',
    5: 'bg-blue-900',
  };
  return classes[score];
}

// Get Tailwind class for maturity score text
export function getMaturityTextClass(score: MaturityScore): string {
  const classes: Record<MaturityScore, string> = {
    1: 'text-blue-900',
    2: 'text-blue-900',
    3: 'text-white',
    4: 'text-white',
    5: 'text-white',
  };
  return classes[score];
}

// Maturity tier labels
export const TIER_LABELS: Record<MaturityTier, string> = {
  emerging: 'Emerging',
  developing: 'Developing',
  leading: 'Leading',
};

// Maturity tier descriptions
export const TIER_DESCRIPTIONS: Record<MaturityTier, string> = {
  emerging: 'Early stage with significant opportunity for growth',
  developing: 'Building capabilities with room to mature',
  leading: 'Advanced maturity with strong foundations',
};

// Get tier badge color classes
export function getTierBadgeClasses(tier: MaturityTier): string {
  const classes: Record<MaturityTier, string> = {
    emerging: 'bg-amber-100 text-amber-800 border-amber-200',
    developing: 'bg-blue-100 text-blue-800 border-blue-200',
    leading: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };
  return classes[tier];
}

// Category display configuration
export const CATEGORY_CONFIG = {
  'Organization Foundations': {
    icon: '🏛️',
    shortName: 'Org',
    description: 'Leadership, culture, and governance foundations',
  },
  'Product Lifecycle': {
    icon: '🔄',
    shortName: 'Product',
    description: 'Product management and user experience',
  },
  'Data Infrastructure': {
    icon: '📊',
    shortName: 'Data',
    description: 'Data sourcing, operations, and analytics',
  },
  'AI & Machine Learning': {
    icon: '🤖',
    shortName: 'AI/ML',
    description: 'AI adoption, development, and customer solutions',
  },
} as const;

// Score labels for display
export const SCORE_LABELS: Record<MaturityScore, string> = {
  1: 'Nascent',
  2: 'Emerging',
  3: 'Developing',
  4: 'Advanced',
  5: 'Leading',
};
