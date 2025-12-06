import * as admin from 'firebase-admin';
import * as crypto from 'crypto';

function getDb() {
  return admin.firestore();
}

// Rate limit configuration
const MAX_REQUESTS = 10; // Maximum requests per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window

// Hash IP for privacy
function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  const db = getDb();
  const ipHash = hashIp(ip);
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const rateLimitRef = db.collection('rateLimits').doc(ipHash);

  try {
    const result = await db.runTransaction(async (transaction: FirebaseFirestore.Transaction) => {
      const doc = await transaction.get(rateLimitRef);

      if (!doc.exists) {
        // First request from this IP
        transaction.set(rateLimitRef, {
          requests: [now],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return true;
      }

      const data = doc.data()!;
      const requests: number[] = data.requests || [];

      // Filter to only requests within the window
      const recentRequests = requests.filter((timestamp: number) => timestamp > windowStart);

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
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Allow request on error to avoid blocking legitimate users
    return true;
  }
}

// Cleanup old rate limit records (call via scheduled function)
export async function cleanupRateLimits(): Promise<void> {
  const db = getDb();
  const cutoff = Date.now() - WINDOW_MS * 2; // Keep for 2x the window

  const snapshot = await db
    .collection('rateLimits')
    .where('updatedAt', '<', new Date(cutoff))
    .limit(500)
    .get();

  const batch = db.batch();
  snapshot.docs.forEach((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Cleaned up ${snapshot.size} rate limit records`);
}
