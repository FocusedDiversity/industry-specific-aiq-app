import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';
import { submitAssessment } from './handlers/submitAssessment';
import { getIndustryContent } from './handlers/getContent';

// Initialize Firebase Admin
admin.initializeApp();

// CORS configuration
const corsHandler = cors({
  origin: true, // Allow all origins in development, restrict in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Wrap handler with CORS
function withCors(
  handler: (req: functions.https.Request, res: functions.Response) => Promise<void>
) {
  return (req: functions.https.Request, res: functions.Response) => {
    corsHandler(req, res, async () => {
      try {
        await handler(req, res);
      } catch (error) {
        console.error('Handler error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  };
}

// API endpoint: Submit assessment
export const api = functions.https.onRequest(withCors(async (req, res) => {
  const path = req.path.replace(/^\/api/, '');

  // Route handling
  switch (true) {
    case req.method === 'POST' && path === '/submit':
      await submitAssessment(req, res);
      break;

    case req.method === 'GET' && path.startsWith('/content/'):
      const industry = path.split('/content/')[1];
      await getIndustryContent(req, res, industry);
      break;

    default:
      res.status(404).json({ error: 'Not found' });
  }
}));

// Export Firestore instance for handlers
export const db = admin.firestore();
