export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  category: "Clay" | "n8n" | "Outbound" | "AI Agents" | "Dashboards";
  tools: string[]; // tool IDs corresponding to /public/logos/
  thumbnail?: string; // e.g. "/work/my-project.webp"
  metric?: string; // optional metric displayed as a green badge on bottom-left of thumbnail
  featured: boolean; // true = shown on home page Section 5 (6 featured)
  problem?: string;
  solution?: string;
  result?: string;
}

// NOTE: Replace sample projects with real work. Do not publish placeholder results or client names.
// Seeded with 8 realistic sample projects (empty metrics and empty thumbnails) so you can test layout, filters, search, and detail modal.
export const projects: ProjectItem[] = [
  {
    slug: "clay-waterfall-enrichment-engine",
    title: "Sample: Automated Multi-Source Waterfall Lead Enrichment",
    description: "Cascading Clay enrichment setup routing through multiple verified data providers to find verified mobile numbers and work emails.",
    category: "Clay",
    tools: ["clay", "apollo", "google-sheets"],
    thumbnail: "",
    metric: "", // Left empty per instructions (no metric badge displayed)
    featured: true,
    problem: "Sales team was relying on single-provider contact lookups resulting in low contact discovery and invalid email bounces.",
    solution: "Architected a multi-step Clay waterfall evaluating Apollo, custom scrapers, and verification APIs before pushing clean records into CRM.",
    result: "",
  },
  {
    slug: "n8n-inbound-slack-routing",
    title: "Sample: Autonomous Inbound Lead Qualification & Slack Routing",
    description: "Self-hosted n8n workflow listening to form submissions, enriching company data, scoring readiness, and pinging SDR channels in real-time.",
    category: "n8n",
    tools: ["n8n", "slack", "hubspot"],
    thumbnail: "",
    metric: "",
    featured: true,
    problem: "Inbound leads sat unattended for hours without enrichment or qualification context.",
    solution: "Engineered an event-driven n8n webhook workflow that enriches domain tech stacks and routes high-intent alerts directly to Slack.",
    result: "",
  },
  {
    slug: "cold-outbound-infrastructure-deliverability",
    title: "Sample: Multi-Domain Cold Outbound Sending Architecture",
    description: "Setup of 20 secondary domains with Google Workspace inboxes, automated warmup schedules, SPF/DKIM/DMARC records, and sequence rotation.",
    category: "Outbound",
    tools: ["instantly", "smartlead", "salesforce"],
    thumbnail: "",
    metric: "",
    featured: true,
    problem: "Sending cold outbound from primary business domains put email reputation and deliverability at severe risk.",
    solution: "Provisioned isolated secondary sending domains with dedicated warmup pools, custom tracking domains, and automated inbox rotation.",
    result: "",
  },
  {
    slug: "claude-ai-reply-categorization-agent",
    title: "Sample: Claude-Powered Objection Handling & Reply Agent",
    description: "AI agent classifying prospect responses into positive, objection, or out-of-office categories and preparing contextual reply drafts.",
    category: "AI Agents",
    tools: ["claude", "n8n", "slack"],
    thumbnail: "",
    metric: "",
    featured: true,
    problem: "Handling high-volume cold responses manually took over 15 hours each week and slowed response times to interested buyers.",
    solution: "Integrated Claude 3.5 via n8n to classify sentiment, extract prospect questions, and auto-draft personalized responses for AE review.",
    result: "",
  },
  {
    slug: "metabase-revenue-pipeline-dashboard",
    title: "Sample: Pipeline Health & Deliverability Telemetry Dashboard",
    description: "Live analytics view aggregating send rates, inbox health, positive response sentiment, and meeting conversions from outbound tools.",
    category: "Dashboards",
    tools: ["metabase", "google-sheets", "make"],
    thumbnail: "",
    metric: "",
    featured: true,
    problem: "Outbound metrics were scattered across disparate sending platforms with no unified pipeline visibility.",
    solution: "Centralized webhook events into a unified database feeding a clean executive Metabase dashboard.",
    result: "",
  },
  {
    slug: "clay-hiring-signals-tam-scraper",
    title: "Sample: Programmatic TAM Scraper Tracking Executive Hiring",
    description: "Scheduled enrichment table monitoring job postings and leadership promotions to identify ready-to-buy enterprise accounts.",
    category: "Clay",
    tools: ["clay", "linkedin-sales-nav", "claude"],
    thumbnail: "",
    metric: "",
    featured: true,
    problem: "SDRs were spending half their time manually scrolling LinkedIn for hiring triggers.",
    solution: "Built a programmatic scraping pipeline extracting open headcount signals and auto-generating personalized email icebreakers.",
    result: "",
  },
  {
    slug: "n8n-hubspot-salesforce-two-way-sync",
    title: "Sample: Automated CRM Field Normalization & Bi-Directional Sync",
    description: "Webhook middleware resolving duplicate accounts, standardizing company naming conventions, and keeping sales and marketing records aligned.",
    category: "n8n",
    tools: ["n8n", "hubspot", "salesforce", "zapier"],
    thumbnail: "",
    metric: "",
    featured: false,
    problem: "Inconsistent data schema between marketing HubSpot and sales Salesforce caused duplicate records and pipeline misalignment.",
    solution: "Built a bi-directional sync flow with deduplication logic and automated lead routing rules.",
    result: "",
  },
  {
    slug: "ai-personalized-loom-prospecting-flow",
    title: "Sample: Automated Research Summary & Icebreaker Generator",
    description: "Automated engine reading prospect 10-K filings, podcast appearances, and LinkedIn posts to generate bulleted battlecards for account executives.",
    category: "AI Agents",
    tools: ["claude", "openai", "clay", "notion"],
    thumbnail: "",
    metric: "",
    featured: false,
    problem: "Account executives spent 30+ minutes researching each high-tier enterprise account before discovery calls.",
    solution: "Deployed an LLM agent that scans recent company news and writes a 3-bullet prep briefing directly to Notion and CRM.",
    result: "",
  },
];
