"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAPABILITIES = void 0;
exports.getCapabilityById = getCapabilityById;
exports.getMaxScore = getMaxScore;
const types_1 = require("../types");
// The 11 capabilities organized by category
exports.CAPABILITIES = [
    // Organization Foundations (weight: 4)
    {
        id: 'strategy-leadership',
        name: 'Strategy & Leadership',
        category: 'Organization Foundations',
        weight: types_1.CATEGORY_WEIGHTS['Organization Foundations'],
    },
    {
        id: 'people-culture',
        name: 'People & Culture',
        category: 'Organization Foundations',
        weight: types_1.CATEGORY_WEIGHTS['Organization Foundations'],
    },
    {
        id: 'architecture-governance',
        name: 'Architecture & Governance',
        category: 'Organization Foundations',
        weight: types_1.CATEGORY_WEIGHTS['Organization Foundations'],
    },
    // Product Lifecycle (weight: 3)
    {
        id: 'product-management',
        name: 'Product Management',
        category: 'Product Lifecycle',
        weight: types_1.CATEGORY_WEIGHTS['Product Lifecycle'],
    },
    {
        id: 'user-experience-ethics',
        name: 'User Experience & Ethics',
        category: 'Product Lifecycle',
        weight: types_1.CATEGORY_WEIGHTS['Product Lifecycle'],
    },
    // Data Infrastructure (weight: 2)
    {
        id: 'data-sourcing',
        name: 'Data Sourcing',
        category: 'Data Infrastructure',
        weight: types_1.CATEGORY_WEIGHTS['Data Infrastructure'],
    },
    {
        id: 'data-operations',
        name: 'Data Operations',
        category: 'Data Infrastructure',
        weight: types_1.CATEGORY_WEIGHTS['Data Infrastructure'],
    },
    {
        id: 'analytics',
        name: 'Analytics',
        category: 'Data Infrastructure',
        weight: types_1.CATEGORY_WEIGHTS['Data Infrastructure'],
    },
    // AI & Machine Learning (weight: 1)
    {
        id: 'using-ai-products',
        name: 'Using AI Products',
        category: 'AI & Machine Learning',
        weight: types_1.CATEGORY_WEIGHTS['AI & Machine Learning'],
    },
    {
        id: 'building-ai-products',
        name: 'Building AI Products',
        category: 'AI & Machine Learning',
        weight: types_1.CATEGORY_WEIGHTS['AI & Machine Learning'],
    },
    {
        id: 'customers-ai-products',
        name: 'Customers AI Products',
        category: 'AI & Machine Learning',
        weight: types_1.CATEGORY_WEIGHTS['AI & Machine Learning'],
    },
];
// Get a capability by ID
function getCapabilityById(id) {
    return exports.CAPABILITIES.find((cap) => cap.id === id);
}
// Calculate the maximum possible score
function getMaxScore() {
    return exports.CAPABILITIES.reduce((total, cap) => total + 5 * cap.weight, 0);
}
//# sourceMappingURL=capabilities.js.map