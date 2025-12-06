import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { syncToHubSpot } from '../services/hubspot';
import { validateSubmission } from '../utils/validation';
import { checkRateLimit } from '../utils/rateLimit';
import { calculateResults } from '../utils/scoring';
import { AssessmentSubmission } from '../types';

function getDb() {
  return admin.firestore();
}

export async function submitAssessment(
  req: functions.https.Request,
  res: functions.Response
): Promise<void> {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Rate limiting
    const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const ipString = Array.isArray(clientIp) ? clientIp[0] : clientIp;
    const rateLimitOk = await checkRateLimit(ipString);
    if (!rateLimitOk) {
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
      return;
    }

    // Parse and validate submission
    const submission: AssessmentSubmission = req.body;
    const validationError = validateSubmission(submission);
    if (validationError) {
      res.status(400).json({ error: validationError });
      return;
    }

    // Generate assessment ID
    const db = getDb();
    const assessmentId = db.collection('assessments').doc().id;
    const submissionWithId: AssessmentSubmission = {
      ...submission,
      id: assessmentId,
      submittedAt: new Date().toISOString(),
    };

    // Calculate results
    const results = calculateResults(submissionWithId);

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
    syncToHubSpot(submissionWithId, results).catch((error) => {
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
  } catch (error) {
    console.error('Submit assessment error:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
}
