import { Capability, CapabilityCategory, CATEGORY_WEIGHTS } from '@/types';

// The 11 capabilities organized by category
export const CAPABILITIES: Capability[] = [
  // Organization Foundations (weight: 4)
  {
    id: 'strategy-leadership',
    name: 'Strategy & Leadership',
    category: 'Organization Foundations',
    weight: CATEGORY_WEIGHTS['Organization Foundations'],
  },
  {
    id: 'people-culture',
    name: 'People & Culture',
    category: 'Organization Foundations',
    weight: CATEGORY_WEIGHTS['Organization Foundations'],
  },
  {
    id: 'architecture-governance',
    name: 'Architecture & Governance',
    category: 'Organization Foundations',
    weight: CATEGORY_WEIGHTS['Organization Foundations'],
  },

  // Product Lifecycle (weight: 3)
  {
    id: 'product-management',
    name: 'Product Management',
    category: 'Product Lifecycle',
    weight: CATEGORY_WEIGHTS['Product Lifecycle'],
  },
  {
    id: 'user-experience-ethics',
    name: 'User Experience & Ethics',
    category: 'Product Lifecycle',
    weight: CATEGORY_WEIGHTS['Product Lifecycle'],
  },

  // Data Infrastructure (weight: 2)
  {
    id: 'data-sourcing',
    name: 'Data Sourcing',
    category: 'Data Infrastructure',
    weight: CATEGORY_WEIGHTS['Data Infrastructure'],
  },
  {
    id: 'data-operations',
    name: 'Data Operations',
    category: 'Data Infrastructure',
    weight: CATEGORY_WEIGHTS['Data Infrastructure'],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    category: 'Data Infrastructure',
    weight: CATEGORY_WEIGHTS['Data Infrastructure'],
  },

  // AI & Machine Learning (weight: 1)
  {
    id: 'using-ai-products',
    name: 'Using AI Products',
    category: 'AI & Machine Learning',
    weight: CATEGORY_WEIGHTS['AI & Machine Learning'],
  },
  {
    id: 'building-ai-products',
    name: 'Building AI Products',
    category: 'AI & Machine Learning',
    weight: CATEGORY_WEIGHTS['AI & Machine Learning'],
  },
  {
    id: 'customers-ai-products',
    name: 'Customers AI Products',
    category: 'AI & Machine Learning',
    weight: CATEGORY_WEIGHTS['AI & Machine Learning'],
  },
];

// Category display order
export const CATEGORY_ORDER: CapabilityCategory[] = [
  'Organization Foundations',
  'Product Lifecycle',
  'Data Infrastructure',
  'AI & Machine Learning',
];

// Get capabilities grouped by category
export function getCapabilitiesByCategory(): Record<CapabilityCategory, Capability[]> {
  return CAPABILITIES.reduce((acc, cap) => {
    if (!acc[cap.category]) {
      acc[cap.category] = [];
    }
    acc[cap.category].push(cap);
    return acc;
  }, {} as Record<CapabilityCategory, Capability[]>);
}

// Calculate the maximum possible score
export function getMaxScore(): number {
  return CAPABILITIES.reduce((total, cap) => total + 5 * cap.weight, 0);
}

// Get a capability by ID
export function getCapabilityById(id: string): Capability | undefined {
  return CAPABILITIES.find((cap) => cap.id === id);
}
