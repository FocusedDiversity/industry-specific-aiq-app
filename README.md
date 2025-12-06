# Industry-Specific AIQ Assessment

A lead magnet web application that assesses AI maturity for Healthcare and Legal organizations, delivering personalized insights and recommendations.

## Features

- **11-Capability Assessment** - Evaluate AI maturity across Strategy, People, Data, and AI dimensions
- **Industry-Specific Prompts** - Tailored questions for Healthcare and Legal sectors
- **Interactive Report Dashboard** - Animated donut chart, capability cards, and narrative insights
- **Priority Selection** - Users choose top 3 focus areas for personalized recommendations
- **HubSpot Integration** - Automatic contact creation and workflow triggers
- **Resource Recommendations** - Curated content based on assessment results

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Firebase Cloud Functions
- **Database**: Firestore
- **CRM**: HubSpot API
- **Hosting**: Firebase Hosting

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

```bash
# Clone the repository
git clone https://github.com/FocusedDiversity/industry-specific-aiq-app.git
cd industry-specific-aiq-app

# Install frontend dependencies
cd aiq-app
npm install

# Install Cloud Functions dependencies
cd functions
npm install
```

### Environment Setup

Copy the environment template and fill in your values:

```bash
cp aiq-app/.env.local.example aiq-app/.env.local
```

Required environment variables:
- `NEXT_PUBLIC_FIREBASE_*` - Firebase configuration
- `HUBSPOT_ACCESS_TOKEN` - HubSpot Private App token
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA site key (optional)

### Development

```bash
cd aiq-app
npm run dev
```

Visit http://localhost:3000

### Build

```bash
npm run build
```

### Deploy

```bash
firebase deploy
```

## Project Structure

```
├── aiq-app/                    # Next.js application
│   ├── src/
│   │   ├── app/               # App router pages
│   │   ├── components/        # React components
│   │   │   ├── assessment/    # Assessment form components
│   │   │   └── report/        # Report dashboard components
│   │   ├── content/           # Industry content configs
│   │   ├── lib/               # Utilities and services
│   │   └── types/             # TypeScript definitions
│   └── functions/             # Firebase Cloud Functions
├── history/                    # Planning documents
├── .beads/                    # Issue tracking (beads)
└── AGENTS.md                  # AI agent instructions
```

## Assessment Flow

1. **Industry Selection** - Choose Healthcare or Legal
2. **Capability Rating** - Rate 11 capabilities (1-5 scale) grouped by category
3. **Priority Selection** - Pick top 3 improvement areas
4. **Contact Capture** - Email (required) + optional details
5. **Report Delivery** - Interactive dashboard with insights

## Scoring

Capabilities are weighted by category:
- **Organization Foundations** (4x): Strategy, People, Governance
- **Product Lifecycle** (3x): Product Management, UX & Ethics
- **Data Infrastructure** (2x): Data Sourcing, Operations, Analytics
- **AI & Machine Learning** (1x): Using AI, Building AI, Customer AI

Max score: 135 points

## Issue Tracking

This project uses [beads](https://github.com/steveyegge/beads) for issue tracking. Run `bd ready` to see available work.

## License

Proprietary - Synaptiq

## Contact

hello@synaptiq.ai
