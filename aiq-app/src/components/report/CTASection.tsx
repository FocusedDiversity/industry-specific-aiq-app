'use client';

interface CTASectionProps {
  meetingUrl?: string;
}

export function CTASection({ meetingUrl = 'https://synaptiq.ai/schedule' }: CTASectionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
      <h2 className="text-2xl font-bold mb-3">
        Ready to Accelerate Your AI Journey?
      </h2>
      <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
        Our AI strategy experts can help you turn these insights into action. Schedule a free consultation to discuss your priorities and create a roadmap for success.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={meetingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule a Consultation
        </a>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Report
        </button>
      </div>

      <p className="mt-6 text-sm text-blue-200">
        Questions? Contact us at{' '}
        <a href="mailto:hello@synaptiq.ai" className="underline hover:text-white">
          hello@synaptiq.ai
        </a>
      </p>
    </div>
  );
}
