"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndustryContent = getIndustryContent;
const healthcare_1 = require("../content/healthcare");
const legal_1 = require("../content/legal");
async function getIndustryContent(req, res, industry) {
    // Only allow GET
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    try {
        let content;
        switch (industry.toLowerCase()) {
            case 'healthcare':
                content = (0, healthcare_1.getHealthcareContent)();
                break;
            case 'legal':
                content = (0, legal_1.getLegalContent)();
                break;
            default:
                res.status(404).json({ error: `Industry '${industry}' not found` });
                return;
        }
        // Cache for 1 hour
        res.set('Cache-Control', 'public, max-age=3600');
        res.status(200).json(content);
    }
    catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({ error: 'Failed to get content' });
    }
}
//# sourceMappingURL=getContent.js.map