'use client';

import { useState } from 'react';

interface ContactFormData {
  email: string;
  name: string;
  title: string;
  company: string;
  priorityNotes: string;
  consentGiven: boolean;
}

interface ContactFormProps {
  data: ContactFormData;
  onChange: (data: ContactFormData) => void;
  errors?: Partial<Record<keyof ContactFormData, string>>;
}

export function ContactForm({ data, onChange, errors }: ContactFormProps) {
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  const handleChange = (field: keyof ContactFormData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched({ ...touched, [field]: true });
  };

  const showError = (field: keyof ContactFormData) => {
    return touched[field] && errors?.[field];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get Your Results
        </h2>
        <p className="text-gray-600">
          Enter your details to receive your personalized AI maturity report and tailored recommendations.
        </p>
      </div>

      {/* Required field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Work Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="you@company.com"
          className={`
            w-full px-4 py-3 rounded-lg border bg-white text-gray-900
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${showError('email') ? 'border-red-500' : 'border-gray-300'}
          `}
          required
        />
        {showError('email') && (
          <p className="mt-1 text-sm text-red-600">{errors?.email}</p>
        )}
      </div>

      {/* Optional fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Smith"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="VP of Data & Analytics"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <input
          type="text"
          id="company"
          value={data.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="Acme Healthcare"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="priorityNotes" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Context <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="priorityNotes"
          value={data.priorityNotes}
          onChange={(e) => handleChange('priorityNotes', e.target.value)}
          placeholder="Tell us more about your AI goals or challenges..."
          rows={3}
          maxLength={1000}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
        <p className="mt-1 text-xs text-gray-500 text-right">
          {data.priorityNotes.length}/1000 characters
        </p>
      </div>

      {/* Consent checkbox */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.consentGiven}
            onChange={(e) => handleChange('consentGiven', e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            <span className="font-medium">I agree to receive my assessment results and related communications from Synaptiq.</span>
            {' '}I understand that my information will be processed in accordance with the{' '}
            <a
              href="https://www.synaptiq.ai/legal-stuff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a1b8ca] hover:underline"
            >
              Privacy Policy
            </a>
            . I can unsubscribe at any time.
            <span className="text-red-500"> *</span>
          </span>
        </label>
        {showError('consentGiven') && (
          <p className="mt-2 text-sm text-red-600">{errors?.consentGiven}</p>
        )}
      </div>
    </div>
  );
}
