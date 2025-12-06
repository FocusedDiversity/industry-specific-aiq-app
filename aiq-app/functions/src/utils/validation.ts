import { AssessmentSubmission, Industry, MaturityScore } from '../types';

const VALID_INDUSTRIES: Industry[] = ['healthcare', 'legal'];
const VALID_SCORES: MaturityScore[] = [1, 2, 3, 4, 5];
const REQUIRED_CAPABILITIES = 11;
const MAX_PRIORITIES = 3;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSubmission(submission: AssessmentSubmission): string | null {
  // Check required fields
  if (!submission) {
    return 'Submission data is required';
  }

  // Validate industry
  if (!submission.industry || !VALID_INDUSTRIES.includes(submission.industry)) {
    return `Industry must be one of: ${VALID_INDUSTRIES.join(', ')}`;
  }

  // Validate email
  if (!submission.email || !EMAIL_REGEX.test(submission.email)) {
    return 'Valid email address is required';
  }

  // Validate consent
  if (!submission.consentGiven) {
    return 'Consent must be given to submit assessment';
  }

  if (!submission.consentTimestamp) {
    return 'Consent timestamp is required';
  }

  // Validate responses
  if (!Array.isArray(submission.responses)) {
    return 'Responses must be an array';
  }

  if (submission.responses.length !== REQUIRED_CAPABILITIES) {
    return `Exactly ${REQUIRED_CAPABILITIES} capability responses are required`;
  }

  // Validate each response
  for (const response of submission.responses) {
    if (!response.capabilityId || typeof response.capabilityId !== 'string') {
      return 'Each response must have a valid capabilityId';
    }

    if (!VALID_SCORES.includes(response.score)) {
      return `Score must be one of: ${VALID_SCORES.join(', ')}`;
    }
  }

  // Validate top priorities
  if (!Array.isArray(submission.topPriorities)) {
    return 'Top priorities must be an array';
  }

  if (submission.topPriorities.length > MAX_PRIORITIES) {
    return `Maximum ${MAX_PRIORITIES} priorities allowed`;
  }

  // Check that priorities are valid capability IDs
  const responseIds = new Set(submission.responses.map(r => r.capabilityId));
  for (const priority of submission.topPriorities) {
    if (!responseIds.has(priority)) {
      return `Priority '${priority}' is not a valid capability ID`;
    }
  }

  // Validate optional string fields
  if (submission.name && typeof submission.name !== 'string') {
    return 'Name must be a string';
  }

  if (submission.title && typeof submission.title !== 'string') {
    return 'Title must be a string';
  }

  if (submission.company && typeof submission.company !== 'string') {
    return 'Company must be a string';
  }

  if (submission.priorityNotes && typeof submission.priorityNotes !== 'string') {
    return 'Priority notes must be a string';
  }

  // Length limits
  if (submission.name && submission.name.length > 200) {
    return 'Name must be 200 characters or less';
  }

  if (submission.title && submission.title.length > 200) {
    return 'Title must be 200 characters or less';
  }

  if (submission.company && submission.company.length > 200) {
    return 'Company must be 200 characters or less';
  }

  if (submission.priorityNotes && submission.priorityNotes.length > 1000) {
    return 'Priority notes must be 1000 characters or less';
  }

  return null; // Valid
}
