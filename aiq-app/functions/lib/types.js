"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_WEIGHTS = void 0;
exports.getMaturityTier = getMaturityTier;
exports.CATEGORY_WEIGHTS = {
    'Organization Foundations': 4,
    'Product Lifecycle': 3,
    'Data Infrastructure': 2,
    'AI & Machine Learning': 1,
};
function getMaturityTier(score) {
    if (score <= 2)
        return 'emerging';
    if (score === 3)
        return 'developing';
    return 'leading';
}
//# sourceMappingURL=types.js.map