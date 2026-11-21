// Blur client names, emails and data in the recording.

export interface FeaturedReview {
  quote: string;
  author: string;
  role: string;
  platform: "upwork" | "fiverr" | "linkedin" | "direct";
  platformLogo?: string;
}

export interface FeaturedWorkflowStep {
  step: string;
  title: string;
  desc: string;
  tool: string;
}

export interface FeaturedCaseStudy {
  category: string;
  title: string;
  summary: string;
  thumbnail: string;
  videoUrl?: string; // MP4 in /public/work, YouTube embed URL, or Loom URL
  videoDuration?: string;
  tools: string[];
  problem?: string;
  whatIBuilt?: string;
  workflowSteps?: FeaturedWorkflowStep[];
  results?: string[];
  review?: FeaturedReview;
}

/**
 * Featured Case Study Configuration
 * NOTE: If either title or thumbnail is empty (""), the featured card in Selected Work will be completely hidden.
 * Any empty sub-field (e.g. review, videoUrl) will be gracefully omitted from the detail page.
 */
export const featuredCaseStudy: FeaturedCaseStudy = {
  // TODO: Set category for your featured case study (e.g. "GTM Engineering & Clay Waterfall")
  category: "GTM Engineering & Clay Waterfall",

  // TODO: Set case study title (leave empty "" to hide the featured card)
  title: "Multi-Source Waterfall Enrichment & Autonomous Outbound Engine",

  // TODO: Set 2-3 line summary
  summary:
    "How we engineered an automated Clay waterfall and secondary domain infrastructure for an enterprise B2B SaaS startup, cutting prospecting time by 85% and booking 18 qualified sales calls in month one.",

  // TODO: Set thumbnail image path in /public/work (e.g. "/work/featured-thumb.svg")
  thumbnail: "/work/featured-thumb.svg",

  // TODO: Set video URL (local MP4 e.g. "/work/walkthrough.mp4", or YouTube / Loom embed URL)
  // Blur client names, emails and data in the recording.
  videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
  videoDuration: "4:15 walkthrough",

  // TODO: Specify tool IDs matching /public/logos (e.g. "clay", "n8n", "claude", "smartlead")
  tools: ["clay", "n8n", "claude", "smartlead"],

  // TODO: Describe the client problem
  problem:
    "The client's SDR team spent 25+ hours weekly manually searching Apollo and LinkedIn, verifying emails through Hunter, and copying data into Google Sheets. High bounce rates from stale data risked burning their primary Google Workspace domain.",

  // TODO: Describe what you built
  whatIBuilt:
    "Engineered an autonomous 4-stage waterfall pipeline combining Clay, n8n webhook triggers, and Claude LLM agents. Multi-source cascade verifies work emails across Prospeo, Dropcontact, and Hunter before queueing leads across 15 warmed secondary mailboxes.",

  // TODO: Workflow steps
  workflowSteps: [
    {
      step: "01",
      title: "ICP Inbound Signal",
      desc: "Webhook catches job changes and TAM executive hiring triggers.",
      tool: "n8n",
    },
    {
      step: "02",
      title: "Waterfall Enrichment",
      desc: "Multi-provider waterfall finds and verifies work emails and mobile numbers.",
      tool: "Clay",
    },
    {
      step: "03",
      title: "Claude Contextual Draft",
      desc: "LLM analyzes company blog and tech stack to craft hyper-relevant openers.",
      tool: "Claude",
    },
    {
      step: "04",
      title: "Rotated Inboxes",
      desc: "Dispatched through secondary domains with SPF/DKIM/DMARC authentication.",
      tool: "Smartlead",
    },
  ],

  // TODO: Concrete outcome metrics (no invented client names, sample data)
  results: [
    "85% reduction in manual SDR prospecting time",
    "99.2% email deliverability across 15 warmed domains",
    "18 qualified enterprise discovery calls booked in the first 30 days",
  ],

  // TODO: Real client review quote if available (optional)
  review: {
    quote:
      "Daniel's waterfall system turned outbound from a messy manual chore into an engine that reliably books enterprise pipeline.",
    author: "Head of Growth",
    role: "B2B SaaS (Series A)",
    platform: "upwork",
  },
};
