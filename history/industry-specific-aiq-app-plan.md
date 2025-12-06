# Industry-Specific AIQ App – Product Planning Document

## 1. Vision & Purpose
- **Goal**: Provide directors+ in target industries with a rapid, insightful AI maturity snapshot that spotlights priority gaps, shares curated guidance, and funnels qualified prospects into sales conversations.
- **Lead Magnet Role**: Offer tangible value (assessment + tailored recommendations) in exchange for contact details and opt-in, positioning Synaptiq as a trusted advisor.
- **HubSpot Integration**: Store assessments, generate contact/company records, trigger nurture workflows, and enable sales to act on prioritized leads.

## 2. Success Criteria
- **Acquisition**: % of visitors who start and complete the assessment; net-new MQLs added to HubSpot lists.
- **Engagement**: Average scores per capability, % of users who click recommended resources, time spent in interactive report.
- **Conversion**: Meeting requests or follow-up calls booked from CTA; pipeline influenced within 90 days.
- **Operational**: Data sync accuracy with HubSpot, assessment uptime/latency, ability for marketing to add/update industry content without engineering.

## 3. Target Users & Industries
- **Primary personas**: Directors, VPs, Heads of Data/Analytics/Innovation, Product leaders in targeted verticals (initial shortlist needed).
- **Secondary**: Champions tasked with transformation planning who seek benchmarks.
- **Industries (MVP focus)**: Healthcare and Legal; expand to additional verticals after launch once content ops are proven.
- **Content leverage**: Reuse existing Synaptiq healthcare/legal assets to auto-seed question language, scoring guidance, and resource recommendations via a content pipeline.

## 4. End-to-End User Journey
1. **Awareness**: Paid/organic campaigns, partner referrals, conference QR codes drive to landing page.
2. **Assessment Intake**: User selects industry (if not inferred) and rates 11 capabilities (1–5 scale) via progressive form. Required opt-in for email before final step.
3. **Prioritization Step**: User picks top 3 capabilities to improve; optional qualitative note for context.
4. **Report Delivery**: Browser renders interactive dashboard (pie chart, radar, narrative insights) + tailored resource links and CTA to schedule consultation.
5. **Follow-up**: HubSpot workflows send recap email, add to nurture sequence, alert assigned rep with summary and recommended playbook.

## 5. Assessment Content Framework
- Each capability needs an industry-specific framing of the maturity question plus scoring guidance (descriptions for 1–5 to improve consistency).
- Draft baseline prompts (to be specialized per industry):
  | Capability | Draft Prompt (to customize per industry) | Notes |
  | --- | --- | --- |
  | Strategy & Leadership | “How well does your leadership articulate and fund an AI roadmap aligned to your industry’s strategic imperatives?” | Provide examples of strategic artifacts per sector. |
  | People & Culture | “Rate your organization’s ability to develop and retain AI-savvy talent while fostering ethical adoption.” | Might include union/regulation nuances. |
  | Architecture & Governance | “How robust are your data/AI governance policies and architecture for compliant deployment?” | Include relevant regulatory frameworks. |
  | Product Management | “How effectively are AI/ML capabilities embedded into your product lifecycle?” | Tailor product examples per industry. |
  | User Experience & Ethics | “To what extent do you design AI experiences that are transparent, inclusive, and compliant with user expectations?” | Industry-specific compliance requirements. |
  | Data Sourcing | “How mature is your ability to ingest and prepare critical data sources unique to your operations?” | Identify canonical data sets per industry. |
  | Data Operations | “How automated and resilient are your data pipelines supporting analytics/AI workloads?” | Call out SLAs, data quality cadences. |
  | Analytics | “How consistently do teams use analytics and BI to drive decisions across the organization?” | Industry-specific KPIs. |
  | Using AI Products | “How widespread and impactful is the use of third-party AI tools in daily operations?” | Mention typical vendor categories. |
  | Building AI Products | “How advanced are your capabilities to design, build, and deploy proprietary AI solutions?” | Include model risk management expectations. |
  | Customers AI Products | “How effectively do your customer-facing AI solutions deliver value and trust?” | Tie to customer satisfaction metrics per industry. |
- **Content automation**: Design ingestion scripts to pull healthcare/legal copy and resources from existing decks, blogs, and case studies so marketers can refresh industry variants with minimal manual effort.
- **Voice & persona alignment**: Author every question prompt, guidance tooltip, and results narrative using the “Raise Your AIQ” Magician/Sage/Creator style (`history/prompts/ai_writing_style_prompt_sklarew.md`) while addressing the Enterprise Innovation Leader persona’s motivations and constraints (`history/prompts/enterprise_innovation_leader_non-tech_industries_persona.md`).
- **Top-3 Selection**: Provide drag-and-drop or checkbox UI; capture rationale text field for richer insights, drive the tailored resource set in the report, and surface the priorities directly to sales.
- **Scoring & Benchmarking**: Allow optional weighting by industry (e.g., certain capabilities more critical), ensure max score derives dynamically from slice definitions (fixing the 135 vs 140 mismatch seen in the current demo component), and incorporate external/owned benchmark data where available to contextualize user scores.

## 5.1 Industry-Specific Prompt Library
These prompts follow the condensed Magician/Sage/Creator cadence: the **Prompt** delivers a concise story-starter; the **Helper Text** offers practical insight/application detail for busy innovation leaders. Ratings use the 1 (nascent) to 5 (leading) maturity scale.

---

## Healthcare

### Strategy & Leadership
- **Prompt:** When your executive team describes AI’s role in patient care, how vivid and actionable is that story?
- **Helper Text:** 1 = exploratory slides without funding; 5 = a financed, cross-functional roadmap that links AI initiatives to measurable clinical, financial, and equity outcomes.

### People & Culture
- **Prompt:** How ready are clinicians and staff to co-create outcomes with AI rather than work around it?
- **Helper Text:** Consider recruitment, ongoing training, and ethics forums. 1 = isolated champions; 5 = organization-wide fluency with incentives tied to responsible adoption.

### Architecture & Governance
- **Prompt:** Can you trace sensitive health data from source to sanctioned AI deployment without gaps?
- **Helper Text:** 1 = ad hoc integrations and manual reviews; 5 = policy-driven pipelines audited for HIPAA, security, and model risk on a recurring cadence.

### Product Management
- **Prompt:** How tightly do you weave AI enhancements into new care pathways or service-line launches?
- **Helper Text:** 1 = AI ideas explored after rollout; 5 = dedicated product owners who co-plan AI and clinical delivery, with stage gates tied to patient impact.

### User Experience & Ethics
- **Prompt:** How confident are patients and providers that AI-enabled experiences respect consent, clarity, and compassion?
- **Helper Text:** 1 = limited transparency into AI touchpoints; 5 = co-designed journeys with bias monitoring, escalation paths, and clear patient communications.

### Data Sourcing
- **Prompt:** How complete and timely is the data that feeds your AI—from EHR to social determinants?
- **Helper Text:** 1 = siloed datasets refreshed manually; 5 = governed ingestion across clinical, operational, and partner feeds with traceable provenance.

### Data Operations
- **Prompt:** How resilient are the pipelines that deliver trusted data to analytics and AI teams?
- **Helper Text:** 1 = frequent downtime and manual restarts; 5 = automated quality checks, SLA monitoring, and proactive issue resolution across environments.

### Analytics
- **Prompt:** How routinely do leaders make decisions with near-real-time insight into population, financial, and operational metrics?
- **Helper Text:** 1 = retrospective reporting; 5 = predictive dashboards embedded in governance forums and frontline workflows.

### Using AI Products
- **Prompt:** How broadly do teams rely on proven third-party AI solutions for clinical and operational tasks?
- **Helper Text:** 1 = limited pilots; 5 = enterprise-wide adoption with measured ROI, change management, and integration into standard procedures.

### Building AI Products
- **Prompt:** How mature is your in-house ability to design, validate, and deploy clinical-grade AI?
- **Helper Text:** 1 = ad hoc prototypes; 5 = regulated pipelines with clinical validation, monitoring, and post-market surveillance.

### Customers’ AI Products
- **Prompt:** How effectively do patient- or partner-facing AI experiences build trust and measurable value?
- **Helper Text:** 1 = experimental self-service tools; 5 = personalized experiences with clear opt-ins, outcome tracking, and continuous improvement.

---

## Legal

### Strategy & Leadership
- **Prompt:** When firm leadership speaks about AI, how clearly do they link it to winning and retaining clients?
- **Helper Text:** 1 = aspirational presentations; 5 = financed portfolio of AI initiatives mapped to practice growth, profitability, and risk mitigation.

### People & Culture
- **Prompt:** How ready are partners, associates, and staff to incorporate AI into matter strategy and client service?
- **Helper Text:** 1 = optional trainings with low uptake; 5 = formal capability plans, incentives, and ethical guardrails embedded in performance reviews.

### Architecture & Governance
- **Prompt:** Can you evidence how confidential matter data flows through AI systems with privilege intact?
- **Helper Text:** 1 = scattered repositories and manual controls; 5 = governed pipelines with audit trails, access policies, and model risk reviews tailored to legal confidentiality.

### Product Management
- **Prompt:** How consistently do you design AI-enabled services alongside new offerings or alternative fee arrangements?
- **Helper Text:** 1 = AI considered post-launch; 5 = product leaders co-develop client journeys, pricing, and AI features with stakeholder sign-off.

### User Experience & Ethics
- **Prompt:** How confident are clients that your AI-assisted advice is transparent, unbiased, and defensible?
- **Helper Text:** 1 = minimal disclosure of AI involvement; 5 = codified communication standards, bias testing, and escalation paths for ethical concerns.

### Data Sourcing
- **Prompt:** How comprehensive is the data foundation feeding AI—from matter histories to external research and regulatory updates?
- **Helper Text:** 1 = fragmented knowledge bases; 5 = curated, tagged, and permissioned datasets refreshed through automated pipelines.

### Data Operations
- **Prompt:** How resilient are the systems delivering accurate data to case teams, pricing, and knowledge management?
- **Helper Text:** 1 = manual exports and frequent delays; 5 = automated monitoring, quality alerts, and version-controlled repositories.

### Analytics
- **Prompt:** How often do practice leaders rely on analytics for staffing, pricing, and client strategy decisions?
- **Helper Text:** 1 = sporadic backward-looking reports; 5 = predictive dashboards embedded in matter intake, pricing committees, and client reviews.

### Using AI Products
- **Prompt:** How pervasively do teams employ vetted third-party AI tools for research, drafting, or discovery?
- **Helper Text:** 1 = isolated pilots; 5 = firm-wide rollouts with governance, training, and measurable efficiency gains.

### Building AI Products
- **Prompt:** How capable are you at crafting proprietary AI workflows or copilots tailored to firm expertise?
- **Helper Text:** 1 = concept decks; 5 = secure development lifecycle with attorney validation, risk assessments, and controlled releases.

### Customers’ AI Products
- **Prompt:** How effectively do client-facing AI experiences—portals, advisors, self-service tools—enhance trust and outcomes?
- **Helper Text:** 1 = experimental tools without adoption metrics; 5 = co-designed experiences with clients, usage analytics, and continuous improvement roadmaps.


## 6. Report Experience
- **Visuals**: Interactive donut/pie chart (existing .tsx), potential radar/spider chart for quick comparison to industry benchmark.
- **Narrative Blocks**: Auto-generated insights for each capability tier (1–2 = emerging, 3 = developing, 4–5 = leading) written in the Magician/Sage/Creator tone and framed for the Enterprise Innovation Leader persona. Pull copy from CMS/JSON per industry.
- **Resource Recommendations**: Curated links (case studies, playbooks, webinars) tagged by industry, capability rating, and user-selected priorities.
- **Calls to Action**: Persistent “Schedule a Consultation” (links to HubSpot meetings), secondary CTA for downloadable PDF summary.
- **Personalization**: Reference user’s top 3 priorities prominently, reorder recommendation modules accordingly, and juxtapose user scores vs benchmarks.
- **Report Access**: Deliver insights immediately on-screen and via secure emailed link for later review/download.
- **Interactive behaviors**: Replicate and extend the demo interactions—animated slice “pop” sequence from lowest to highest score, hover-driven highlighting across chart and list, clickable slices/cards opening tailored resources in new tabs, and a color legend keyed to the 1–5 maturity scale.

## 7. HubSpot Integration Requirements
- **Data Model**:
  - Create/Update Contact with email as required plus optional name/title/company fields (prefilled when available) and industry selection.
  - Ingest referral metadata (e.g., LinkedIn Lead Gen form fields, UTM parameters) to auto-populate company/title details without increasing form friction.
  - Store responses in custom properties or attach to a custom object (Assessment Result) linked to Contact.
  - Capture top-3 priorities and optional notes.
  - Persist per-capability metadata (category, weight, resource bundle id) so the frontend chart/list rendering and HubSpot follow-ups stay in sync as the capability catalog evolves.
  - Track score aggregates (overall, per category) for segmentation.
- **Workflows**:
  - Trigger transactional email with report link/summary.
  - Notify assigned sales owner with compiled insights.
  - Create follow-up task with 24-hour (weekday) SLA to ensure timely outreach.
  - Send tailored resource email highlighting top priorities and recommended assets.
  - Enroll contact into nurture sequence based on low maturity areas.
- **Lists & Reporting**:
  - Smart lists by industry, score band, priority capability.
  - Dashboard showing lead volume, conversion, industry trends.
- **Security & Compliance**:
  - Ensure proper consent capture (GDPR/CCPA). Store source and timestamp.
  - Define data retention and deletion policies for self-service removal.
  - No additional legal/security review required at this stage; revisit if data scope expands beyond assessment responses.

## 8. Technical Architecture (Proposed)
- **Frontend**: Next.js/React app with Tailwind (aligns to provided .tsx). Supports dynamic routing per industry.
- **Design System**: Encode Synaptiq styleguide colors/typography (per Google Slides reference) as reusable tokens/components so marketing stays on-brand without ad-hoc overrides.
- **Frontend Interactions**: Modularize the donut component so geometry (slice angles, radii) and animations derive from the dataset length/weights—avoiding the current hard-coded 11-slice assumption—and ensure shared hover state between chart and capability list.
- **Backend/API**: Firebase Cloud Functions (Node/TypeScript) handling form submission, validation, HubSpot API calls, scoring logic, and secure storage of assessment payloads before syncing downstream.
- **Hosting & Infrastructure**: Firebase Hosting for the web app, Firebase Authentication for optional future login, Firestore or Realtime Database for caching/analytics, with monitoring via Google Cloud Logging. Ensure SSL is handled via Firebase; add uptime alerts.
- **Content Management**: JSON/YAML configs or lightweight CMS (e.g., Sanity/Contentful/HubDB) for industry-specific questions, copy, resources; include centralized storage for style/persona prompts so UX writers and LLM tooling can reference the canonical voice.
- **Authentication**: None for end users at launch; secure callable Cloud Functions with secret keys/env vars and implement rate limiting/bot protection (reCAPTCHA Enterprise or Firebase App Check).

## 9. Operations & Maintenance
- **Content Updates**: Marketing should adjust questions/resources without redeploy; define workflow & ownership.
- **Voice QA**: Establish editorial checklist ensuring all new content follows the Magician/Sage/Creator style and speaks directly to the Enterprise Innovation Leader persona before publishing.
- **Publishing Governance**: Final content/style approval sits with the app publisher; document promotion steps so updates to prompts/persona are reviewed prior to deployment.
- **Localization**: Consider future multi-language support; isolate text strings now.
- **Analytics**: Instrument with GA4 + HubSpot tracking; capture drop-off per step.
- **Testing**: Include usability testing with target personas; A/B test question framing and CTA placement.

## 10. Risks & Mitigation
- **Content Complexity**: Too many industries at launch may dilute quality. Start with 1–2 verticals and scale.
- **Data Quality**: Self-reported maturity may be inconsistent. Provide rating guidance and optional benchmark slider for context.
- **HubSpot Limitations**: Custom objects and API quotas need validation; confirm required subscription tier.
- **Privacy Concerns**: Ensure privacy policy references assessment data usage. Offer opt-out from marketing emails.
- **Resource Load**: Interactive visuals must perform on mobile; validate chart responsiveness.
- **Benchmark Availability**: Need trustworthy industry data sources; if none exist, set expectations in UI and content.
- **Interaction Consistency**: Animation timing, hover states, and cross-linking between chart and list must stay synchronized as new capabilities/industries are added; regression tests needed.
- **Firebase Limits**: Monitor Google Cloud/Firebase quotas (Invocations, Firestore reads) and ensure cost/scale guardrails before launch.

## 11. Implementation Phases (Draft)
1. **Discovery (1–2 weeks)**: Deep-dive healthcare/legal buyer needs, inventory existing content assets, gather SME input, identify potential benchmark datasets, define KPIs, audit HubSpot schema, and confirm Firebase project configuration/quotas.
2. **Content & UX Design (2–3 weeks)**: Craft question copy leveraging automated content pipeline concepts, codify Magician/Sage/Creator microcopy patterns for the Innovation Leader persona, design flows, define styleguide tokens, wireframe report, run usability reviews.
3. **Prototype Build (2 weeks)**: Implement assessment form, scoring engine, top-3 priority capture, and tailored resource logic within the interactive report, ensuring donut animation/hover/link behaviors match the reference component while supporting dynamic data. Stand up Firebase Hosting preview channel and Cloud Functions stubs.
4. **Integration & QA (2–3 weeks)**: Connect to HubSpot sandbox, automate workflows (including 24-hour SLA tasks and tailored emails), harden Firebase Cloud Functions (secrets, retries), perform accessibility testing, mobile QA, and responsive performance checks.
5. **Launch Prep (1 week)**: Final content import, analytics setup, sales enablement materials, go-live checklist.
6. **Post-Launch Optimization (ongoing)**: Monitor metrics, iterate questions, expand industries, add benchmarking.

## 12. Decisions & Clarifications (2025-12-06)
- **Industries**: Focus MVP on Healthcare and Legal; existing Synaptiq content will seed industry-specific copy and recommendations.
- **Benchmarks**: Include benchmark context wherever reliable datasets can be sourced; research options during discovery.
- **Top-3 Priorities**: Surface selections to sales and use them to drive tailored educational resources in-app and via email.
- **Intake Fields**: Keep company/title optional; auto-populate when referral sources (LinkedIn, etc.) provide the data.
- **Sales SLA**: Ensure human follow-up within 24 hours on weekdays via automated tasks/alerts.
- **Report Access**: Provide both immediate on-site reporting and an emailed link for later review/download.
- **Compliance**: No additional legal/security review required for storing assessment data in HubSpot; monitor if scope expands.
- **Branding**: Lock UI to Synaptiq styleguide (colors/fonts from example Google Slides) to avoid off-brand customization.
- **Hosting**: Deploy web experience on Firebase Hosting with Cloud Functions backend to align with existing Synaptiq infrastructure.
- **Governance**: App publisher is the final approver for content/style updates prior to release.
- **Narratives**: No pre-approved healthcare/legal anecdotal stories yet; gather anonymized examples during content development.
- **Microcopy Tone**: Condense the Magician/Sage/Creator storytelling arc for busy leaders—lead with a sharp "Story" prompt and reinforce key Insight/Application points in helper text rather than all five beats verbatim.

## 13. Recommendations & Next Steps
- **Content Workshop**: Schedule healthcare/legal SME sessions to finalize question language, scoring rubrics, and resource mapping – co-led with brand/content leads to embed the AI writing style guidelines.
- **HubSpot Audit**: Inventory existing custom properties/objects to avoid duplication and confirm integration approach.
- **Benchmark Research**: Identify credible industry maturity datasets or partners; define fallback messaging if data is unavailable.
- **Design Prototype**: Create high-fidelity mockups (assessment + report) using Synaptiq styleguide tokens; test with 3–5 target users.
- **Technical Spike**: Validate HubSpot API endpoints, rate limits, OAuth/Private App credentials, LinkedIn/UTM enrichment flows, and Firebase integration (Hosting deploy pipeline, Cloud Functions auth, Firestore schema).
- **Marketing Alignment**: Plan campaign rollout, landing page copy, and post-assessment nurture path informed by top-3 priority logic while ensuring all touchpoints reuse the style/persona prompts.

## 14. Clarifications Requested
- None currently.

---
*Drafted on 2025-12-06 – update as decisions are made. Keeper: Product Management.*
