import { AssessmentForm } from '@/components/assessment/AssessmentForm';

export const metadata = {
  title: 'AI Maturity Assessment | Synaptiq',
  description: 'Assess your organization\'s AI maturity and receive tailored recommendations for improvement.',
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-[#494f5b] py-8 sm:py-10 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Raise Your AIQ
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Discover where your organization stands on the AI maturity curve and get actionable insights to accelerate your AI journey.
          </p>
        </div>

        {/* Assessment Form */}
        <AssessmentForm />

        {/* Footer */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center text-sm text-[#f7cfa5] border-t border-[#f7cfa5] pt-6 sm:pt-8">
          <p>
            Powered by{' '}
            <a
              href="https://synaptiq.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a1b8ca] hover:underline"
            >
              Synaptiq
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
