"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAssessment = submitAssessment;
const admin = __importStar(require("firebase-admin"));
const hubspot_1 = require("../services/hubspot");
const validation_1 = require("../utils/validation");
const rateLimit_1 = require("../utils/rateLimit");
const scoring_1 = require("../utils/scoring");
function getDb() {
    return admin.firestore();
}
async function submitAssessment(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    try {
        // Rate limiting
        const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
        const ipString = Array.isArray(clientIp) ? clientIp[0] : clientIp;
        const rateLimitOk = await (0, rateLimit_1.checkRateLimit)(ipString);
        if (!rateLimitOk) {
            res.status(429).json({ error: 'Too many requests. Please try again later.' });
            return;
        }
        // Parse and validate submission
        const submission = req.body;
        const validationError = (0, validation_1.validateSubmission)(submission);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }
        // Generate assessment ID
        const db = getDb();
        const assessmentId = db.collection('assessments').doc().id;
        const submissionWithId = {
            ...submission,
            id: assessmentId,
            submittedAt: new Date().toISOString(),
        };
        // Calculate results
        const results = (0, scoring_1.calculateResults)(submissionWithId);
        // Store in Firestore
        await db.collection('assessments').doc(assessmentId).set({
            ...submissionWithId,
            results: {
                totalScore: results.totalScore,
                maxScore: results.maxScore,
                percentageScore: results.percentageScore,
                categoryScores: results.categoryScores,
            },
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        // Sync to HubSpot (async, don't block response)
        (0, hubspot_1.syncToHubSpot)(submissionWithId, results).catch((error) => {
            console.error('HubSpot sync error:', error);
        });
        // Return results
        res.status(200).json({
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
    }
    catch (error) {
        console.error('Submit assessment error:', error);
        res.status(500).json({ error: 'Failed to submit assessment' });
    }
}
//# sourceMappingURL=submitAssessment.js.map