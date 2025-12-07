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
exports.checkRateLimit = checkRateLimit;
exports.cleanupRateLimits = cleanupRateLimits;
const admin = __importStar(require("firebase-admin"));
const crypto = __importStar(require("crypto"));
function getDb() {
    return admin.firestore();
}
// Rate limit configuration
const MAX_REQUESTS = 10; // Maximum requests per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window
// Hash IP for privacy
function hashIp(ip) {
    return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}
async function checkRateLimit(ip) {
    const db = getDb();
    const ipHash = hashIp(ip);
    const now = Date.now();
    const windowStart = now - WINDOW_MS;
    const rateLimitRef = db.collection('rateLimits').doc(ipHash);
    try {
        const result = await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(rateLimitRef);
            if (!doc.exists) {
                // First request from this IP
                transaction.set(rateLimitRef, {
                    requests: [now],
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                });
                return true;
            }
            const data = doc.data();
            const requests = data.requests || [];
            // Filter to only requests within the window
            const recentRequests = requests.filter((timestamp) => timestamp > windowStart);
            if (recentRequests.length >= MAX_REQUESTS) {
                return false; // Rate limited
            }
            // Add current request
            recentRequests.push(now);
            transaction.update(rateLimitRef, {
                requests: recentRequests,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            return true;
        });
        return result;
    }
    catch (error) {
        console.error('Rate limit check error:', error);
        // Allow request on error to avoid blocking legitimate users
        return true;
    }
}
// Cleanup old rate limit records (call via scheduled function)
async function cleanupRateLimits() {
    const db = getDb();
    const cutoff = Date.now() - WINDOW_MS * 2; // Keep for 2x the window
    const snapshot = await db
        .collection('rateLimits')
        .where('updatedAt', '<', new Date(cutoff))
        .limit(500)
        .get();
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    console.log(`Cleaned up ${snapshot.size} rate limit records`);
}
//# sourceMappingURL=rateLimit.js.map