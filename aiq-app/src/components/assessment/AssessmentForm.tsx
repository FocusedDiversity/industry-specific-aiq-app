'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Industry, MaturityScore, CapabilityResponse, AssessmentSubmission } from '@/types';
import { CAPABILITIES, CATEGORY_ORDER, getCapabilitiesByCategory } from '@/content/capabilities';
import { getOrderedPrompts, getCapabilityPrompt } from '@/content/industries';
import { IndustrySelector } from './IndustrySelector';
import { MaturityRating } from './MaturityRating';
import { PriorityPicker } from './PriorityPicker';
import { ContactForm } from './ContactForm';
import { CATEGORY_CONFIG } from '@/lib/utils/design';

type Step = 'industry' | 'assessment' | 'priorities' | 'contact';

interface ContactFormData {
  email: string;
  name: string;
  title: string;
  company: string;
  priorityNotes: string;
  consentGiven: boolean;
}

export function AssessmentForm() {
  const router = useRouter();

  // Form state
  const [currentStep, setCurrentStep] = useState<Step>('industry');
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [responses, setResponses] = useState<CapabilityResponse[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [contactData, setContactData] = useState<ContactFormData>({
    email: '',
    name: '',
    title: '',
    company: '',
    priorityNotes: '',
    consentGiven: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Current category index for progressive assessment
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Get capabilities for current category
  const capabilitiesByCategory = getCapabilitiesByCategory();
  const currentCategory = CATEGORY_ORDER[currentCategoryIndex];
  const currentCapabilities = capabilitiesByCategory[currentCategory] || [];

  // Get response for a capability
  const getResponse = (capabilityId: string): MaturityScore | null => {
    const response = responses.find((r) => r.capabilityId === capabilityId);
    return response?.score ?? null;
  };

  // Update response
  const updateResponse = (capabilityId: string, score: MaturityScore) => {
    setResponses((prev) => {
      const existing = prev.findIndex((r) => r.capabilityId === capabilityId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { capabilityId, score };
        return updated;
      }
      return [...prev, { capabilityId, score }];
    });
  };

  // Check if current category is complete
  const isCategoryComplete = () => {
    return currentCapabilities.every((cap) => getResponse(cap.id) !== null);
  };

  // Check if all assessments are complete
  const isAssessmentComplete = () => {
    return responses.length === CAPABILITIES.length;
  };

  // Calculate progress
  const progress = {
    assessment: (responses.length / CAPABILITIES.length) * 100,
    category: currentCategoryIndex / CATEGORY_ORDER.length,
  };

  // Navigation
  const goToNext = useCallback(() => {
    switch (currentStep) {
      case 'industry':
        if (industry) {
          setCurrentStep('assessment');
        }
        break;
      case 'assessment':
        if (currentCategoryIndex < CATEGORY_ORDER.length - 1) {
          setCurrentCategoryIndex((prev) => prev + 1);
        } else if (isAssessmentComplete()) {
          setCurrentStep('priorities');
        }
        break;
      case 'priorities':
        setCurrentStep('contact');
        break;
    }
  }, [currentStep, industry, currentCategoryIndex, isAssessmentComplete]);

  const goToPrevious = useCallback(() => {
    switch (currentStep) {
      case 'assessment':
        if (currentCategoryIndex > 0) {
          setCurrentCategoryIndex((prev) => prev - 1);
        } else {
          setCurrentStep('industry');
        }
        break;
      case 'priorities':
        setCurrentCategoryIndex(CATEGORY_ORDER.length - 1);
        setCurrentStep('assessment');
        break;
      case 'contact':
        setCurrentStep('priorities');
        break;
    }
  }, [currentStep, currentCategoryIndex]);

  // Validation
  const validateContact = (): Partial<Record<keyof ContactFormData, string>> => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!contactData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!contactData.consentGiven) {
      errors.consentGiven = 'You must agree to receive your results';
    }

    return errors;
  };

  // Submit
  const handleSubmit = async () => {
    if (!industry) return;

    const validationErrors = validateContact();
    if (Object.keys(validationErrors).length > 0) {
      setError('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const submission: AssessmentSubmission = {
        industry,
        email: contactData.email,
        name: contactData.name || undefined,
        title: contactData.title || undefined,
        company: contactData.company || undefined,
        responses,
        topPriorities: priorities,
        priorityNotes: contactData.priorityNotes || undefined,
        consentGiven: contactData.consentGiven,
        consentTimestamp: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        // UTM params would be captured from URL
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      const result = await response.json();

      // Redirect to results page
      router.push(`/report/${result.assessmentId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'industry':
        return (
          <IndustrySelector
            selectedIndustry={industry}
            onSelect={setIndustry}
          />
        );

      case 'assessment':
        if (!industry) return null;
        const categoryConfig = CATEGORY_CONFIG[currentCategory];

        return (
          <div className="space-y-6">
            {/* Category header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 mb-4">
                <span className="text-xl">{categoryConfig?.icon}</span>
                <span className="font-medium">{currentCategory}</span>
              </div>
              <p className="text-gray-600">{categoryConfig?.description}</p>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Category {currentCategoryIndex + 1} of {CATEGORY_ORDER.length}</span>
                <span>{Math.round(progress.assessment)}% complete</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress.assessment}%` }}
                />
              </div>
            </div>

            {/* Capability ratings */}
            <div className="space-y-4">
              {currentCapabilities.map((cap) => {
                const prompt = getCapabilityPrompt(industry, cap.id);
                if (!prompt) return null;

                return (
                  <MaturityRating
                    key={cap.id}
                    value={getResponse(cap.id)}
                    onChange={(score) => updateResponse(cap.id, score)}
                    prompt={prompt.prompt}
                    helperText={prompt.helperText}
                    capabilityName={cap.name}
                  />
                );
              })}
            </div>
          </div>
        );

      case 'priorities':
        return (
          <PriorityPicker
            capabilities={CAPABILITIES}
            responses={responses}
            selectedPriorities={priorities}
            onPrioritiesChange={setPriorities}
          />
        );

      case 'contact':
        return (
          <ContactForm
            data={contactData}
            onChange={setContactData}
            errors={validateContact()}
          />
        );
    }
  };

  // Get button state
  const getNextButtonState = () => {
    switch (currentStep) {
      case 'industry':
        return { disabled: !industry, label: 'Start Assessment' };
      case 'assessment':
        if (currentCategoryIndex < CATEGORY_ORDER.length - 1) {
          return { disabled: !isCategoryComplete(), label: 'Next Category' };
        }
        return { disabled: !isAssessmentComplete(), label: 'Select Priorities' };
      case 'priorities':
        return { disabled: priorities.length === 0, label: 'Continue' };
      case 'contact':
        return {
          disabled: isSubmitting || !contactData.email || !contactData.consentGiven,
          label: isSubmitting ? 'Submitting...' : 'Get My Results',
        };
    }
  };

  const buttonState = getNextButtonState();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        {currentStep !== 'industry' ? (
          <button
            type="button"
            onClick={goToPrevious}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={currentStep === 'contact' ? handleSubmit : goToNext}
          disabled={buttonState.disabled}
          className={`
            px-8 py-3 rounded-lg font-semibold transition-all duration-200
            ${buttonState.disabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }
          `}
        >
          {buttonState.label}
        </button>
      </div>
    </div>
  );
}
