import Link from 'next/link';

export const metadata = {
  title: 'Raise Your AIQ | Synaptiq',
  description: 'Discover your organization\'s AI maturity with our free assessment. Get tailored insights and recommendations for Healthcare and Legal industries.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Raise Your <span className="text-blue-600">AIQ</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover where your organization stands on the AI maturity curve. Get actionable insights tailored to your industry.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Free Assessment
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              11 Key Capabilities
            </h3>
            <p className="text-gray-600">
              Assess your organization across strategy, data, AI adoption, and more with industry-specific questions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tailored Insights
            </h3>
            <p className="text-gray-600">
              Receive personalized recommendations based on your results and priority areas.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Quick & Free
            </h3>
            <p className="text-gray-600">
              Complete in 10 minutes. Instant results with actionable next steps.
            </p>
          </div>
        </div>

        {/* Industries */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Industry-Specific Assessments
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🏥</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Healthcare</h3>
                <p className="text-gray-600 text-sm">
                  For hospitals, health systems, digital health companies, and healthcare technology organizations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚖️</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Legal</h3>
                <p className="text-gray-600 text-sm">
                  For law firms, corporate legal departments, and legal technology providers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo link */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Want to see what results look like?
          </p>
          <Link
            href="/report/demo"
            className="text-blue-600 font-medium hover:underline"
          >
            View Demo Report →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            Powered by{' '}
            <a
              href="https://synaptiq.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Synaptiq
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
