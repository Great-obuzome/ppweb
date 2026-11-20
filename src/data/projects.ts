export interface ProjectResult {
  value: string;
  label: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  category: "Clay" | "n8n" | "Outbound" | "AI Agents" | "Dashboards";
  tools: string[]; // tool IDs corresponding to /public/logos/
  thumbnail?: string; // e.g. "/work/my-project.webp"
  metric?: string; // optional metric displayed as a green badge on bottom-left of thumbnail
  featured: boolean; // true = shown on home page Section 5 (6 featured)
  problem: string;
  solution: string[]; // 3-5 bullets with check icons
  steps: string[]; // 4-5 workflow nodes for horizontal diagram
  results?: ProjectResult[]; // optional metrics (empty on sample projects so Result block stays hidden)
}

// NOTE: Replace sample content with real project details before publishing.
// Do NOT invent client names, metrics or testimonials. Leave results empty on samples so the Result block stays hidden.
export const projects: ProjectItem[] = [
  {
    slug: "clay-waterfall-enrichment-engine",
    title: "Sample: Automated Multi-Source Waterfall Lead Enrichment",
    description: "Cascading Clay enrichment setup routing through multiple verified data providers to find verified mobile numbers and work emails.",
    category: "Clay",
    tools: ["clay", "apollo", "google-sheets"],
    thumbnail: "",
    metric: "",
    featured: true,
    problem: "Sales teams were relying on single-provider contact lookups, resulting in sub-40% match rates, high bounce rates, and missed pipeline opportunities from missing mobile numbers.",
    solution: [
      "Built a cascading waterfall structure prioritizing low-cost APIs before querying premium data partners",
      "Integrated real-time SMTP handshake and disposable domain verification filtering",
      "Automated deduplication against active pipeline accounts in CRM",
      "Synced enriched records directly into weekly outbound cadence tables",
    ],
    steps: ["TAM Input", "Clay Waterfall", "Email Verify", "CRM Sync"],
    results: [], // empty for sample projects
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
    problem: "Inbound leads sat unattended for hours without enrichment context, causing low lead-to-opportunity conversion on high-value inbound requests.",
    solution: [
      "Engineered an event-driven webhook listener capturing form submissions instantly",
      "Enriched company headcount, tech stack, and funding signals via background API calls",
      "Calculated dynamic ICP readiness score based on custom qualification rules",
      "Posted formatted Slack battlecards with one-click owner claim buttons",
    ],
    steps: ["Webhook Trigger", "Tech Lookup", "Score ICP", "Slack Alert", "Auto Assign"],
    results: [],
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
    problem: "Outreach from primary domains resulted in spam placement, domain reputation damage, and severe risk to core business communication.",
    solution: [
      "Purchased and configured 20 isolated secondary domains across multiple providers",
      "Configured strict SPF, DKIM, DMARC, and custom tracking CNAME records",
      "Implemented a 3-week automated warmup schedule with staggered sending ramps",
      "Configured multi-inbox sender rotation with automated deliverability health checks",
    ],
    steps: ["Domain Setup", "DNS Alignment", "Warmup Pool", "Inbox Rotate", "Live Outbound"],
    results: [],
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
    problem: "Handling high-volume replies manually took over 15 hours each week and delayed meeting scheduling with interested prospects.",
    solution: [
      "Connected outbound mailboxes to a webhook listener analyzing incoming prospect responses",
      "Prompted Claude 3.5 Sonnet to categorize intent into Interested, Objection, or Referral",
      "Generated personalized context-aware reply drafts referencing company case studies",
      "Notified account executives in Slack with pre-written replies ready for 1-click send",
    ],
    steps: ["Email Inbound", "LLM Analysis", "Tag Sentiment", "Draft Reply", "AE Notification"],
    results: [],
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
    problem: "Growth leadership lacked consolidated visibility into sending health, mailbox burn rates, and cohort response analytics.",
    solution: [
      "Streamed sending events and sentiment tags into a centralized analytical database",
      "Calculated deliverability health scores and automatically flagged failing inboxes",
      "Built cohort analysis views tracking reply rates across ICP industry segments",
      "Automated weekly executive reporting summaries sent via scheduled email and Slack",
    ],
    steps: ["Event Stream", "ETL Normalizer", "Metrics DB", "Metabase Views", "Weekly Digest"],
    results: [],
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
    problem: "SDRs spent hours searching job boards and LinkedIn manually to identify companies actively scaling relevant departments.",
    solution: [
      "Configured automated scrapers monitoring target job board postings and career pages",
      "Parsed job descriptions to extract tooling requirements and budget signals",
      "Identified executive hiring managers and verified their direct work contact info",
      "Auto-populated outbound lists with tailored opening lines referencing open roles",
    ],
    steps: ["Job Scrape", "Tool Match", "Hiring Lead", "Waterfal Verify", "Export List"],
    results: [],
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
    problem: "Discrepancies between marketing automation and enterprise CRM caused mismatched lead ownership, duplicate deals, and distorted attribution.",
    solution: [
      "Engineered real-time bi-directional webhook listeners in n8n",
      "Standardized field formatting for domain, phone, company size, and lifecycle stage",
      "Resolved duplicate contacts using custom matching logic before database write",
      "Logged sync audit history to Google Sheets for automated error alerts",
    ],
    steps: ["Change Trigger", "Dedupe Logic", "Map Schema", "Write CRM", "Audit Log"],
    results: [],
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
    problem: "Account executives spent 30+ minutes researching tier-1 accounts prior to meetings, limiting daily outbound capacity.",
    solution: [
      "Built automated research agents scraping SEC filings, recent press, and founder interviews",
      "Extracted strategic company goals and executive focus areas with structured LLM prompts",
      "Drafted 3 high-impact talking points and pain-point hypotheses",
      "Saved formatted briefing documents directly to Notion and attached to CRM deals",
    ],
    steps: ["Company Scan", "Extract 10-K", "Generate Points", "Sync Notion", "Ready for AE"],
    results: [],
  },
];
