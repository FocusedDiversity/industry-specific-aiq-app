import { Client } from '@hubspot/api-client';
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { AssessmentSubmission, AssessmentResult } from '../types';

// Initialize HubSpot client
function getHubSpotClient(): Client {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is not set');
  }
  return new Client({ accessToken });
}

// Create or update HubSpot contact
async function upsertContact(
  client: Client,
  submission: AssessmentSubmission
): Promise<string> {
  const email = submission.email;

  // Prepare contact properties
  const properties: Record<string, string> = {
    email,
    aiq_industry: submission.industry,
    aiq_assessment_date: submission.submittedAt,
    aiq_consent_given: submission.consentGiven ? 'true' : 'false',
    aiq_consent_timestamp: submission.consentTimestamp,
  };

  if (submission.name) {
    // Try to split name into first/last
    const nameParts = submission.name.trim().split(/\s+/);
    properties.firstname = nameParts[0];
    if (nameParts.length > 1) {
      properties.lastname = nameParts.slice(1).join(' ');
    }
  }

  if (submission.title) {
    properties.jobtitle = submission.title;
  }

  if (submission.company) {
    properties.company = submission.company;
  }

  // UTM tracking
  if (submission.utmSource) {
    properties.hs_analytics_source = submission.utmSource;
  }
  if (submission.utmMedium) {
    properties.utm_medium = submission.utmMedium;
  }
  if (submission.utmCampaign) {
    properties.utm_campaign = submission.utmCampaign;
  }

  try {
    // Try to find existing contact
    const searchResponse = await client.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: FilterOperatorEnum.Eq,
              value: email,
            },
          ],
        },
      ],
      properties: ['email'],
      limit: 1,
      after: '0',
      sorts: [],
    });

    if (searchResponse.results.length > 0) {
      // Update existing contact
      const contactId = searchResponse.results[0].id;
      await client.crm.contacts.basicApi.update(contactId, { properties });
      return contactId;
    } else {
      // Create new contact
      const createResponse = await client.crm.contacts.basicApi.create({
        properties,
        associations: [],
      });
      return createResponse.id;
    }
  } catch (error) {
    console.error('HubSpot contact upsert error:', error);
    throw error;
  }
}

// Store assessment results as custom properties
async function storeAssessmentResults(
  client: Client,
  contactId: string,
  submission: AssessmentSubmission,
  results: AssessmentResult
): Promise<void> {
  const properties: Record<string, string> = {
    aiq_total_score: results.totalScore.toString(),
    aiq_max_score: results.maxScore.toString(),
    aiq_percentage_score: results.percentageScore.toString(),
    aiq_top_priorities: submission.topPriorities.join(', '),
  };

  if (submission.priorityNotes) {
    properties.aiq_priority_notes = submission.priorityNotes;
  }

  // Store category scores
  for (const [category, scores] of Object.entries(results.categoryScores)) {
    const key = `aiq_${category.toLowerCase().replace(/[^a-z]/g, '_')}_score`;
    properties[key] = scores.score.toString();
  }

  // Store individual capability scores
  for (const result of results.capabilityResults) {
    const key = `aiq_${result.capability.id.replace(/-/g, '_')}`;
    properties[key] = result.score.toString();
  }

  try {
    await client.crm.contacts.basicApi.update(contactId, { properties });
  } catch (error) {
    console.error('HubSpot store results error:', error);
    throw error;
  }
}

// Trigger HubSpot workflow (via timeline event)
async function triggerWorkflow(
  client: Client,
  contactId: string,
  submission: AssessmentSubmission,
  results: AssessmentResult
): Promise<void> {
  // Create a timeline event to trigger workflows
  // This requires a custom timeline event template in HubSpot
  try {
    // Note: Timeline API requires setup in HubSpot
    // For now, we rely on property-based workflow triggers
    console.log(`Assessment completed for contact ${contactId}`);
    console.log(`Score: ${results.totalScore}/${results.maxScore} (${results.percentageScore}%)`);
    console.log(`Industry: ${submission.industry}`);
    console.log(`Top priorities: ${submission.topPriorities.join(', ')}`);
  } catch (error) {
    console.error('HubSpot trigger workflow error:', error);
    // Don't throw - workflow triggering is non-critical
  }
}

// Main sync function
export async function syncToHubSpot(
  submission: AssessmentSubmission,
  results: AssessmentResult
): Promise<void> {
  try {
    const client = getHubSpotClient();

    // 1. Create or update contact
    const contactId = await upsertContact(client, submission);
    console.log(`HubSpot contact ID: ${contactId}`);

    // 2. Store assessment results
    await storeAssessmentResults(client, contactId, submission, results);
    console.log('Assessment results stored in HubSpot');

    // 3. Trigger workflow
    await triggerWorkflow(client, contactId, submission, results);
    console.log('HubSpot sync completed');
  } catch (error) {
    console.error('HubSpot sync failed:', error);
    throw error;
  }
}
