import * as functions from 'firebase-functions';
import { getHealthcareContent } from '../content/healthcare';
import { getLegalContent } from '../content/legal';

export async function getIndustryContent(
  req: functions.https.Request,
  res: functions.Response,
  industry: string
): Promise<void> {
  // Only allow GET
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    let content;

    switch (industry.toLowerCase()) {
      case 'healthcare':
        content = getHealthcareContent();
        break;
      case 'legal':
        content = getLegalContent();
        break;
      default:
        res.status(404).json({ error: `Industry '${industry}' not found` });
        return;
    }

    // Cache for 1 hour
    res.set('Cache-Control', 'public, max-age=3600');
    res.status(200).json(content);
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ error: 'Failed to get content' });
  }
}
