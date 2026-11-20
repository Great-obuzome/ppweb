export interface ToolItem {
  id: string;
  name: string;
  category: string;
  logoPath: string;
  source: 'official' | 'Simple Icons' | 'Iconify' | 'fallback';
  sourceUrl: string;
  brandHex?: string;
  url: string;
}

export interface PlatformItem {
  name: string;
  logo: string;
  url: string;
  caption: string;
  accessibleLabel: string;
}

export interface ClientItem {
  id: string;
  name: string;
  type: 'wordmark' | 'image';
  logoText?: string;
  logoUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  tools: string[];
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}

export interface CaseStudyItem {
  id: string;
  metric: string;
  headline: string;
  industry: string;
  description: string;
  tools: string[];
  linkText: string;
  linkUrl: string;
  isPlaceholderTodo?: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  isPlaceholderTodo?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  isPlaceholderTodo?: boolean;
}

export interface PortfolioContent {
  brand: {
    name: string;
    tagline: string;
    creator: string;
    role: string;
    location: string;
    availability: string;
    calendlyUrl: string;
    email: string;
    socials: {
      linkedin: string;
      twitter: string;
      fiverr: string;
      github?: string;
    };
  };
  navigation: {
    links: { label: string; href: string }[];
    ctaSecondary: { label: string; href: string };
    ctaPrimary: { label: string; href: string };
  };
  hero: {
    headline: string;
    subline: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    builtWithLabel: string;
    worksWithLabel: string;
    worksWithSuffix: string;
    featuredTools: string[];
    worksWithTools: string[];
  };
  section2: {
    // Mode setting: 'platforms' (current) or 'clients'.
    // When real client logos are ready, switch mode to 'clients', add files in /public/clients, and the label will automatically change to "Working with".
    mode: 'platforms' | 'clients';
    platformsLabel: string;
    clientsLabel: string;
    // NOTE: Remove any platform I don't have a live profile on.
    platforms: PlatformItem[];
    clients: ClientItem[];
  };
  tools: ToolItem[];
  services: {
    eyebrow: string;
    heading: string;
    items: ServiceItem[];
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: StepItem[];
  };
  caseStudies: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: CaseStudyItem[];
  };
  about: {
    eyebrow: string;
    heading: string;
    bio: string;
    photoUrl: string;
    photoFallback: string;
    badgeText: string;
    discoveryCallText: string;
    discoveryCallUrl: string;
    stats: StatItem[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: TestimonialItem[];
  };
  finalCta: {
    heading: string;
    subheading: string;
    ctaPrimary: { label: string; href: string };
    emailLabel: string;
  };
}

export const siteContent: PortfolioContent = {
  brand: {
    name: "UPBYNATURE",
    tagline: "GTM Engineering & Outbound Automation",
    creator: "Daniel",
    role: "GTM Engineer",
    location: "Global Remote",
    availability: "Available for new projects & retainers",
    calendlyUrl: "https://calendly.com/upbynature/discovery-call", // TODO: Replace with your actual Calendly / Cal.com link
    email: "daniel@upbynature.com", // TODO: Replace with your actual contact email
    socials: {
      linkedin: "https://linkedin.com/in/daniel-gtm", // TODO: Replace with your LinkedIn URL
      twitter: "https://x.com/upbynature", // TODO: Replace with your X/Twitter URL
      fiverr: "https://fiverr.com/upbynature", // TODO: Replace with your Fiverr profile URL
    },
  },

  navigation: {
    links: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    ctaSecondary: { label: "Book a call", href: "https://calendly.com/upbynature/discovery-call" },
    ctaPrimary: { label: "Work with me", href: "#contact" },
  },

  hero: {
    headline: "I build the systems that fill your pipeline.",
    subline: "GTM engineer. Clay, n8n, AI agents and outbound automation for startups and agencies.",
    ctaPrimary: { label: "Book a free discovery call", href: "https://calendly.com/upbynature/discovery-call" },
    ctaSecondary: { label: "See my work", href: "#work" },
    builtWithLabel: "Built with",
    worksWithLabel: "Works with",
    worksWithSuffix: "+100 more integrations",
    featuredTools: ["clay", "n8n", "claude", "hubspot", "instantly"],
    worksWithTools: ["salesforce", "apollo", "smartlead", "make"],
  },

  // SECTION 2 CONFIGURATION: "platforms" (current) or "clients"
  section2: {
    mode: "platforms",
    platformsLabel: "Find me on",
    clientsLabel: "Working with",

    // Remove any platform I don't have a live profile on.
    platforms: [
      {
        name: "Fiverr",
        logo: "/platforms/fiverr.svg",
        url: "https://fiverr.com/upbynature", // TODO: Replace with real Fiverr profile URL
        caption: "Top services",
        accessibleLabel: "Daniel on Fiverr",
      },
      {
        name: "Upwork",
        logo: "/platforms/upwork.svg",
        url: "https://www.upwork.com/freelancers/~upbynature", // TODO: Replace with real Upwork profile URL
        caption: "Hire me",
        accessibleLabel: "Daniel on Upwork",
      },
      {
        name: "Discord",
        logo: "/platforms/discord.svg",
        url: "https://discord.gg/upbynature", // TODO: Replace with real Discord invite / community link
        caption: "Join the community",
        accessibleLabel: "Daniel on Discord",
      },
      {
        name: "LinkedIn",
        logo: "/platforms/linkedin.svg",
        url: "https://linkedin.com/in/daniel-gtm", // TODO: Replace with real LinkedIn profile URL
        caption: "Let's connect",
        accessibleLabel: "Daniel on LinkedIn",
      },
    ],

    // Client mode placeholder list for future use
    clients: [
      { id: "client-1", name: "Client One", type: "wordmark", logoText: "VELOCITY.AI" },
      { id: "client-2", name: "Client Two", type: "wordmark", logoText: "SCALEFORGE" },
      { id: "client-3", name: "Client Three", type: "wordmark", logoText: "CYBERPULSE" },
      { id: "client-4", name: "Client Four", type: "wordmark", logoText: "NEXUS REVENUE" },
      { id: "client-5", name: "Client Five", type: "wordmark", logoText: "GROWTHVENTURES" },
    ],
  },

  // Exactly 16 verified official tools with verified local assets
  tools: [
    {
      id: "clay",
      name: "Clay",
      category: "Enrichment & Waterfall",
      logoPath: "/logos/clay.png",
      source: "official",
      sourceUrl: "https://www.clay.com (Official Webflow Brand Asset)",
      brandHex: "#4F46E5",
      url: "https://www.clay.com",
    },
    {
      id: "n8n",
      name: "n8n",
      category: "Workflow Automation",
      logoPath: "/logos/n8n.svg",
      source: "Simple Icons",
      sourceUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/n8n.svg",
      brandHex: "#EA4B71",
      url: "https://n8n.io",
    },
    {
      id: "hubspot",
      name: "HubSpot",
      category: "CRM & Marketing",
      logoPath: "/logos/hubspot.svg",
      source: "Simple Icons",
      sourceUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/hubspot.svg",
      brandHex: "#FF7A59",
      url: "https://www.hubspot.com",
    },
    {
      id: "apollo",
      name: "Apollo.io",
      category: "Lead Database",
      logoPath: "/logos/apollo.svg",
      source: "official",
      sourceUrl: "https://apollo.io/icon.svg (Official Header Vector Asset)",
      brandHex: "#FFE600",
      url: "https://www.apollo.io",
    },
    {
      id: "claude",
      name: "Claude",
      category: "LLM & Reasoning Agents",
      logoPath: "/logos/claude.svg",
      source: "Simple Icons",
      sourceUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/claude.svg",
      brandHex: "#D97757",
      url: "https://claude.ai",
    },
    {
      id: "openai",
      name: "OpenAI",
      category: "AI & Synthesis",
      logoPath: "/logos/openai.svg",
      source: "Iconify",
      sourceUrl: "https://api.iconify.design/ri/openai-fill.svg (Official Emblem)",
      brandHex: "#000000",
      url: "https://openai.com",
    },
    {
      id: "instantly",
      name: "Instantly",
      category: "Cold Outbound",
      logoPath: "/logos/instantly.png",
      source: "official",
      sourceUrl: "https://instantly.ai (Official Brand Favicon & Touch Icon)",
      brandHex: "#3B82F6",
      url: "https://instantly.ai",
    },
    {
      id: "smartlead",
      name: "Smartlead",
      category: "Email Warmup & Sending",
      logoPath: "/logos/smartlead.png",
      source: "official",
      sourceUrl: "https://www.smartlead.ai (Official 512px High-Res Brand Asset)",
      brandHex: "#6366F1",
      url: "https://www.smartlead.ai",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      category: "Enterprise CRM",
      logoPath: "/logos/salesforce.svg",
      source: "Iconify",
      sourceUrl: "https://api.iconify.design/devicon/salesforce.svg (Official Cloud Vector)",
      brandHex: "#00A1E0",
      url: "https://www.salesforce.com",
    },
    {
      id: "zapier",
      name: "Zapier",
      category: "Integrations",
      logoPath: "/logos/zapier.svg",
      source: "Simple Icons",
      sourceUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/zapier.svg",
      brandHex: "#FF4F00",
      url: "https://zapier.com",
    },
    {
      id: "make",
      name: "Make",
      category: "Visual Workflows",
      logoPath: "/logos/make.svg",
      source: "Simple Icons",
      sourceUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/make.svg",
      brandHex: "#6D00CC",
      url: "https://www.make.com",
    },
    {
      id: "slack",
      name: "Slack",
      category: "Alerts & Pipeline Ops",
      logoPath: "/logos/slack.svg",
      source: "Iconify",
      sourceUrl: "https://api.iconify.design/devicon/slack.svg (Official 4-Color Mark)",
      brandHex: "#4A154B",
      url: "https://slack.com",
    },
    {
      id: "notion",
      name: "Notion",
      category: "Internal SOPs & Knowledge",
      logoPath: "/logos/notion.svg",
      source: "Simple Icons",
      sourceUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/notion.svg",
      brandHex: "#000000",
      url: "https://www.notion.so",
    },
    {
      id: "google-sheets",
      name: "Google Sheets",
      category: "Staging & Sync",
      logoPath: "/logos/googlesheets.svg",
      source: "Simple Icons",
      sourceUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/googlesheets.svg",
      brandHex: "#34A853",
      url: "https://www.google.com/sheets/about/",
    },
    {
      id: "linkedin-sales-nav",
      name: "LinkedIn Sales Navigator",
      category: "Targeting & Signals",
      logoPath: "/logos/linkedin.svg",
      source: "Iconify",
      sourceUrl: "https://api.iconify.design/devicon/linkedin.svg (Official Brand Mark)",
      brandHex: "#0A66C2",
      url: "https://business.linkedin.com/sales-solutions/sales-navigator",
    },
    {
      id: "metabase",
      name: "Metabase",
      category: "Pipeline Analytics",
      logoPath: "/logos/metabase.svg",
      source: "Simple Icons",
      sourceUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/metabase.svg",
      brandHex: "#509EE3",
      url: "https://www.metabase.com",
    },
  ],

  // Section 3: Services
  services: {
    eyebrow: "SERVICES",
    heading: "From cold list to booked meeting.",
    items: [
      {
        id: "enrichment",
        title: "Lead enrichment and GTM research with Clay",
        description:
          "Multi-provider waterfall enrichment that hunts for hard-to-find mobile numbers, verified work emails, hiring triggers, tech stack installations, and funding rounds.",
        outcomes: [
          "85%+ email verification accuracy using waterfall providers",
          "Automated deep company research and AI summary points",
          "Clean, deduplicated CRM sync directly into HubSpot or Salesforce",
        ],
        tools: ["Clay", "Claude", "OpenAI", "Apollo.io"],
      },
      {
        id: "list-building",
        title: "B2B lead list building",
        description:
          "Precision TAM definition and hyper-targeted lead scraping combining job boards, social signals, intent feeds, and executive movements so you reach buyers at their moment of need.",
        outcomes: [
          "Zero-bloat Ideal Customer Profile (ICP) segmenting",
          "Account scoring matrix based on intent & technology adoption",
          "Always-fresh weekly programmatic lead replenishment",
        ],
        tools: ["LinkedIn Sales Navigator", "Apollo.io", "Google Sheets", "Metabase"],
      },
      {
        id: "cold-outbound",
        title: "Cold outbound launch (domains, sequences, deliverability)",
        description:
          "Full infrastructure buildout with secondary domains, Google Workspace/Outlook inboxes, SPF/DKIM/DMARC configurations, automated warmups, and conversion-engineered copy sequences.",
        outcomes: [
          "100% primary domain reputation protection with dedicated secondary setups",
          "99% inbox placement with smart rotation and gradual warmup",
          "Multi-channel sequences with tailored AI email personalization",
        ],
        tools: ["Instantly.ai", "Smartlead", "HubSpot", "Zapier"],
      },
      {
        id: "workflow-ai",
        title: "Workflow and AI agent automation with n8n and Claude",
        description:
          "Custom orchestration connecting your marketing, sales, and analytics tools. We build autonomous AI agents that qualify inbound replies, categorize objections, and book meetings directly into your calendar.",
        outcomes: [
          "Automated sentiment classification & instant Slack notifications",
          "Self-driving reply handling agents powered by Claude 3.5 Sonnet",
          "Custom multi-step webhooks syncing pipeline metrics to dashboards",
        ],
        tools: ["n8n", "Claude", "Make.com", "Slack"],
      },
    ],
  },

  // Section 4: How I Work (Horizontal timeline)
  process: {
    eyebrow: "PROCESS",
    heading: "How I Work",
    steps: [
      {
        step: "01",
        title: "Discover",
        description: "Audit your current pipeline, pinpoint high-converting ICP criteria, and map out the data waterfall.",
      },
      {
        step: "02",
        title: "Build",
        description: "Set up secondary sending domains, Clay enrichment tables, n8n webhook pipelines, and AI scoring models.",
      },
      {
        step: "03",
        title: "Launch",
        description: "Initiate warmups, roll out personalized email sequences, and establish real-time Slack pipeline notifications.",
      },
      {
        step: "04",
        title: "Optimize",
        description: "Analyze response sentiment, prune underperforming angles, and scale volume while maintaining strict deliverability.",
      },
    ],
  },

  // Section 5: Selected Work
  caseStudies: {
    eyebrow: "SELECTED WORK",
    heading: "Proven systems. Measurable revenue.",
    subheading: "Real client architectures engineered for high-intent B2B conversion.",
    items: [
      {
        id: "cs-1",
        metric: "+312 qualified leads in 30 days",
        headline: "Autonomous Clay waterfall + AI hyper-personalization for a Series A B2B SaaS",
        industry: "Enterprise DevOps SaaS",
        description:
          "Built a waterfall scraping pipeline tracking recently funded GitHub repositories and matched decision makers. Automated personalization generated an 11.4% positive reply rate.",
        tools: ["Clay", "Instantly.ai", "Claude", "HubSpot"],
        linkText: "Read case study",
        linkUrl: "#contact",
        isPlaceholderTodo: true,
      },
      {
        id: "cs-2",
        metric: "4.8x pipeline value generated",
        headline: "Cold outbound deliverability overhaul and multi-inbox rotation setup",
        industry: "B2B Recruitment Agency",
        description:
          "Migrated client from a burned primary domain to 25 isolated secondary domains with automated warmup. Resulted in 42 meetings booked in the first 6 weeks without domain blacklisting.",
        tools: ["Smartlead", "n8n", "Google Sheets", "Apollo.io"],
        linkText: "Read case study",
        linkUrl: "#contact",
        isPlaceholderTodo: true,
      },
      {
        id: "cs-3",
        metric: "18 hrs/week saved in manual research",
        headline: "AI inbound lead qualification agent & instant CRM synchronization",
        industry: "Fintech Advisory Firm",
        description:
          "Designed an n8n + Claude system that monitors incoming forms, executes 20+ enrichment checks via Clay, scores readiness, and pings AE Slack channels with pre-drafted talking points.",
        tools: ["n8n", "Claude", "Clay", "Slack"],
        linkText: "Read case study",
        linkUrl: "#contact",
        isPlaceholderTodo: true,
      },
    ],
  },

  // Section 6: About
  about: {
    eyebrow: "ABOUT",
    heading: "Hi, I'm Daniel.",
    bio: "I'm a GTM engineer with a background in data analytics. I build AI-powered lead generation, enrichment and outbound systems with tools like Clay and n8n, so startups, agencies and small businesses can fill their pipeline without the manual work.",
    photoUrl: "/images/daniel.webp",
    photoFallback: "/images/daniel.jpg",
    badgeText: "Available for new projects",
    discoveryCallText: "Book a free discovery call",
    discoveryCallUrl: "https://calendly.com/upbynature/discovery-call", // TODO: Replace with real link
    stats: [
      { value: "40+", label: "Systems Deployed", isPlaceholderTodo: true },
      { value: "15+", label: "GTM Tools Mastered", isPlaceholderTodo: true },
      { value: "4+ yrs", label: "Pipeline Experience", isPlaceholderTodo: true },
    ],
  },

  // Section 7: Testimonials
  testimonials: {
    eyebrow: "TESTIMONIALS",
    heading: "Trusted by founders and growth leaders.",
    items: [
      {
        id: "test-1",
        quote:
          "Daniel completely re-engineered our outbound flow. We went from burning domains with zero replies to booking 15-20 enterprise calls every month like clockwork.",
        author: "Alex Morgan",
        role: "Founder & CEO",
        company: "CloudScale Inc.",
        isPlaceholderTodo: true,
      },
      {
        id: "test-2",
        quote:
          "The Clay enrichment waterfalls Daniel built saved our SDR team over 25 hours every single week. Our data accuracy jumped to over 90% immediately.",
        author: "Sarah Chen",
        role: "Head of Growth",
        company: "RevPilot",
        isPlaceholderTodo: true,
      },
      {
        id: "test-3",
        quote:
          "Working with UPBYNATURE felt like having an elite GTM engineering team in-house. Fast execution, clean documentation, and zero fluff.",
        author: "Marcus Vance",
        role: "Managing Director",
        company: "Apex Strategy Group",
        isPlaceholderTodo: true,
      },
    ],
  },

  // Section 8: Final CTA + Footer
  finalCta: {
    heading: "Ready to turn your outbound into a system?",
    subheading:
      "Stop wasting hours on manual prospecting and burned domains. Let's engineer an automated, scalable pipeline that books qualified meetings while you sleep.",
    ctaPrimary: { label: "Book a free discovery call", href: "https://calendly.com/upbynature/discovery-call" },
    emailLabel: "daniel@upbynature.com",
  },
};
