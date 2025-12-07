"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLegalContent = getLegalContent;
const legalPrompts = [
    {
        capabilityId: 'strategy-leadership',
        industry: 'legal',
        prompt: 'When firm leadership speaks about AI, how clearly do they link it to winning and retaining clients?',
        helperText: '1 = aspirational presentations; 5 = financed portfolio of AI initiatives mapped to practice growth, profitability, and risk mitigation.',
    },
    {
        capabilityId: 'people-culture',
        industry: 'legal',
        prompt: 'How ready are partners, associates, and staff to incorporate AI into matter strategy and client service?',
        helperText: '1 = optional trainings with low uptake; 5 = formal capability plans, incentives, and ethical guardrails embedded in performance reviews.',
    },
    {
        capabilityId: 'architecture-governance',
        industry: 'legal',
        prompt: 'Can you evidence how confidential matter data flows through AI systems with privilege intact?',
        helperText: '1 = scattered repositories and manual controls; 5 = governed pipelines with audit trails, access policies, and model risk reviews tailored to legal confidentiality.',
    },
    {
        capabilityId: 'product-management',
        industry: 'legal',
        prompt: 'How consistently do you design AI-enabled services alongside new offerings or alternative fee arrangements?',
        helperText: '1 = AI considered post-launch; 5 = product leaders co-develop client journeys, pricing, and AI features with stakeholder sign-off.',
    },
    {
        capabilityId: 'user-experience-ethics',
        industry: 'legal',
        prompt: 'How confident are clients that your AI-assisted advice is transparent, unbiased, and defensible?',
        helperText: '1 = minimal disclosure of AI involvement; 5 = codified communication standards, bias testing, and escalation paths for ethical concerns.',
    },
    {
        capabilityId: 'data-sourcing',
        industry: 'legal',
        prompt: 'How comprehensive is the data foundation feeding AI—from matter histories to external research and regulatory updates?',
        helperText: '1 = fragmented knowledge bases; 5 = curated, tagged, and permissioned datasets refreshed through automated pipelines.',
    },
    {
        capabilityId: 'data-operations',
        industry: 'legal',
        prompt: 'How resilient are the systems delivering accurate data to case teams, pricing, and knowledge management?',
        helperText: '1 = manual exports and frequent delays; 5 = automated monitoring, quality alerts, and version-controlled repositories.',
    },
    {
        capabilityId: 'analytics',
        industry: 'legal',
        prompt: 'How often do practice leaders rely on analytics for staffing, pricing, and client strategy decisions?',
        helperText: '1 = sporadic backward-looking reports; 5 = predictive dashboards embedded in matter intake, pricing committees, and client reviews.',
    },
    {
        capabilityId: 'using-ai-products',
        industry: 'legal',
        prompt: 'How pervasively do teams employ vetted third-party AI tools for research, drafting, or discovery?',
        helperText: '1 = isolated pilots; 5 = firm-wide rollouts with governance, training, and measurable efficiency gains.',
    },
    {
        capabilityId: 'building-ai-products',
        industry: 'legal',
        prompt: 'How capable are you at crafting proprietary AI workflows or copilots tailored to firm expertise?',
        helperText: '1 = concept decks; 5 = secure development lifecycle with attorney validation, risk assessments, and controlled releases.',
    },
    {
        capabilityId: 'customers-ai-products',
        industry: 'legal',
        prompt: 'How effectively do client-facing AI experiences—portals, advisors, self-service tools—enhance trust and outcomes?',
        helperText: '1 = experimental tools without adoption metrics; 5 = co-designed experiences with clients, usage analytics, and continuous improvement roadmaps.',
    },
];
const legalNarratives = [
    // Organization Foundations
    {
        industry: 'legal',
        category: 'Organization Foundations',
        tier: 'emerging',
        headline: 'Laying the Groundwork for AI',
        body: 'Your firm is beginning its AI journey. Focus on developing a clear AI strategy that aligns with client service goals and begin building AI awareness among partners and associates.',
    },
    {
        industry: 'legal',
        category: 'Organization Foundations',
        tier: 'developing',
        headline: 'Maturing AI Governance',
        body: 'You have foundational AI capabilities in place. Now formalize governance around confidentiality, privilege, and ethical use while expanding training and change management efforts.',
    },
    {
        industry: 'legal',
        category: 'Organization Foundations',
        tier: 'leading',
        headline: 'Setting the Standard for Legal AI',
        body: 'Your firm demonstrates AI leadership. Continue to refine governance frameworks, mentor other practice groups, and explore innovative AI applications that differentiate client service.',
    },
    // Product Lifecycle
    {
        industry: 'legal',
        category: 'Product Lifecycle',
        tier: 'emerging',
        headline: 'Exploring AI-Enhanced Services',
        body: 'AI is not yet integrated into your service design. Begin by identifying practice areas where AI can improve efficiency, accuracy, or client experience.',
    },
    {
        industry: 'legal',
        category: 'Product Lifecycle',
        tier: 'developing',
        headline: 'Building AI into Client Delivery',
        body: 'You\'re making progress with AI-enhanced services. Focus on establishing clear disclosure practices and measuring the impact of AI on matter outcomes and client satisfaction.',
    },
    {
        industry: 'legal',
        category: 'Product Lifecycle',
        tier: 'leading',
        headline: 'Leading with AI-Powered Legal Services',
        body: 'Your AI-enabled services are mature. Continue to monitor for bias and accuracy, maintain transparency with clients, and explore new service models enabled by AI.',
    },
    // Data Infrastructure
    {
        industry: 'legal',
        category: 'Data Infrastructure',
        tier: 'emerging',
        headline: 'Building Your Data Foundation',
        body: 'Your data infrastructure needs strengthening. Prioritize organizing matter data, knowledge management, and establishing data governance that respects privilege and confidentiality.',
    },
    {
        industry: 'legal',
        category: 'Data Infrastructure',
        tier: 'developing',
        headline: 'Scaling Legal Data Operations',
        body: 'Your data capabilities are growing. Focus on automating data flows, improving knowledge capture, and expanding analytics for pricing, staffing, and business development.',
    },
    {
        industry: 'legal',
        category: 'Data Infrastructure',
        tier: 'leading',
        headline: 'Data-Driven Legal Excellence',
        body: 'Your data infrastructure is mature. Continue to optimize for real-time insights, predictive analytics, and seamless integration with AI-powered tools.',
    },
    // AI & Machine Learning
    {
        industry: 'legal',
        category: 'AI & Machine Learning',
        tier: 'emerging',
        headline: 'Beginning Your AI Adoption',
        body: 'AI adoption is in early stages. Start with proven AI tools for research, review, and drafting, and build internal expertise to evaluate and govern AI use.',
    },
    {
        industry: 'legal',
        category: 'AI & Machine Learning',
        tier: 'developing',
        headline: 'Expanding AI Across the Firm',
        body: 'You\'re building AI capabilities. Consider developing proprietary AI tools that leverage your firm\'s unique expertise while continuing to expand use of proven vendor solutions.',
    },
    {
        industry: 'legal',
        category: 'AI & Machine Learning',
        tier: 'leading',
        headline: 'Pioneering Legal AI Innovation',
        body: 'Your AI capabilities are advanced. Focus on scaling successful applications, developing client-facing AI experiences, and exploring emerging AI technologies.',
    },
];
const legalResources = [
    {
        id: 'lg-strategy-guide',
        title: 'Legal AI Strategy Playbook',
        type: 'playbook',
        url: 'https://synaptiq.ai/resources/legal-ai-strategy',
        industry: 'legal',
        capabilities: ['strategy-leadership', 'architecture-governance'],
        maturityTiers: ['emerging', 'developing'],
    },
    {
        id: 'lg-privilege-ai',
        title: 'Maintaining Privilege with AI: A Guide',
        type: 'whitepaper',
        url: 'https://synaptiq.ai/resources/privilege-ai-guide',
        industry: 'legal',
        capabilities: ['architecture-governance', 'user-experience-ethics'],
        maturityTiers: ['emerging', 'developing', 'leading'],
    },
    {
        id: 'lg-knowledge-mgmt',
        title: 'AI-Powered Knowledge Management for Law Firms',
        type: 'playbook',
        url: 'https://synaptiq.ai/resources/legal-knowledge-management',
        industry: 'legal',
        capabilities: ['data-sourcing', 'data-operations'],
        maturityTiers: ['emerging', 'developing'],
    },
    {
        id: 'lg-case-study-1',
        title: 'Case Study: AI Contract Review at Scale',
        type: 'case_study',
        url: 'https://synaptiq.ai/case-studies/contract-review-ai',
        industry: 'legal',
        capabilities: ['using-ai-products', 'building-ai-products'],
        maturityTiers: ['developing', 'leading'],
    },
    {
        id: 'lg-webinar-adoption',
        title: 'Driving AI Adoption in Your Legal Practice',
        type: 'webinar',
        url: 'https://synaptiq.ai/webinars/legal-ai-adoption',
        industry: 'legal',
        capabilities: ['people-culture', 'strategy-leadership'],
        maturityTiers: ['emerging', 'developing'],
    },
    {
        id: 'lg-client-ai',
        title: 'Building Client-Facing AI Experiences',
        type: 'article',
        url: 'https://synaptiq.ai/articles/legal-client-ai',
        industry: 'legal',
        capabilities: ['customers-ai-products', 'product-management'],
        maturityTiers: ['developing', 'leading'],
    },
];
function getLegalContent() {
    return {
        industry: 'legal',
        displayName: 'Legal',
        prompts: legalPrompts,
        narratives: legalNarratives,
        resources: legalResources,
    };
}
//# sourceMappingURL=legal.js.map