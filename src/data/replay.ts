export interface ReplayNode {
  id: string;
  stepNumber: number;
  label: string;
  shortDesc: string;
  toolName: string;
  toolLogo: string;
}

export interface ReplayLeadState {
  stageTitle: string;
  badge: string;
  company: {
    name: string;
    domain: string;
    industry: string;
    size: string;
    funding: string;
  };
  contact: {
    name: string;
    title: string;
    avatar: string;
    email?: string;
    emailStatus?: "unverified" | "verified";
    phone?: string;
    phoneStatus?: "unverified" | "verified";
  };
  score?: {
    value: number;
    tier: string;
    intentSpike: string;
    matchReason: string;
  };
  opener?: {
    subject: string;
    body: string;
    angle: string;
  };
  dispatch?: {
    statusText: string;
    inboxNumber: string;
    domainHealth: string;
    auth: string;
  };
  booking?: {
    time: string;
    format: string;
    crmDeal: string;
    dealValue: string;
    status: string;
  };
}

export interface ReplayData {
  header: {
    eyebrow: string;
    lead: string;
    accent: string;
    description: string;
  };
  nodes: ReplayNode[];
  leadStates: ReplayLeadState[];
}

export const replayData: ReplayData = {
  header: {
    eyebrow: "How it runs",
    lead: "WATCH A LEAD",
    accent: "BECOME A MEETING.",
    description: "One lead, from trigger to booked meeting, in about a minute.",
  },
  nodes: [
    {
      id: "trigger",
      stepNumber: 1,
      label: "Trigger",
      shortDesc: "Inbound signal or executive movement detected.",
      toolName: "n8n",
      toolLogo: "/logos/n8n.svg",
    },
    {
      id: "enrich",
      stepNumber: 2,
      label: "Enrich",
      shortDesc: "Multi-source waterfall verifies work email and direct dial.",
      toolName: "Clay",
      toolLogo: "/logos/clay.png",
    },
    {
      id: "score",
      stepNumber: 3,
      label: "Score",
      shortDesc: "ICP fit score calculated and buying intent ranked.",
      toolName: "n8n",
      toolLogo: "/logos/n8n.svg",
    },
    {
      id: "personalize",
      stepNumber: 4,
      label: "Personalize",
      shortDesc: "Claude agent writes a contextual opener and pitch angle.",
      toolName: "Claude",
      toolLogo: "/logos/claude.svg",
    },
    {
      id: "send",
      stepNumber: 5,
      label: "Send",
      shortDesc: "Dispatched via rotated, warmed secondary mailboxes.",
      toolName: "Instantly",
      toolLogo: "/logos/instantly.png",
    },
    {
      id: "meeting-booked",
      stepNumber: 6,
      label: "Meeting booked",
      shortDesc: "Calendar invite confirmed and deal synced to CRM.",
      toolName: "HubSpot",
      toolLogo: "/logos/hubspot.svg",
    },
  ],
  leadStates: [
    {
      stageTitle: "Signal Detected",
      badge: "Inbound Webhook",
      company: {
        name: "Apex Dynamics",
        domain: "apexdynamics.io",
        industry: "B2B SaaS / FinTech",
        size: "180 employees",
        funding: "Series B ($28M)",
      },
      contact: {
        name: "Alex Mercer",
        title: "VP of Sales",
        avatar: "AM",
        email: "Pending verification...",
        emailStatus: "unverified",
      },
      score: {
        value: 72,
        tier: "Evaluating...",
        intentSpike: "Hiring 6 SDRs",
        matchReason: "Executive leadership change detected within 14 days",
      },
    },
    {
      stageTitle: "Waterfall Enrichment Complete",
      badge: "Clay Multi-Provider",
      company: {
        name: "Apex Dynamics",
        domain: "apexdynamics.io",
        industry: "B2B SaaS / FinTech",
        size: "180 employees",
        funding: "Series B ($28M)",
      },
      contact: {
        name: "Alex Mercer",
        title: "VP of Sales",
        avatar: "AM",
        email: "a.mercer@apexdynamics.io",
        emailStatus: "verified",
        phone: "+1 (415) 890-4412",
        phoneStatus: "verified",
      },
      score: {
        value: 88,
        tier: "Tier A Prospect",
        intentSpike: "Tech Stack: HubSpot & Apollo",
        matchReason: "Work email 99% deliverability · Direct mobile verified",
      },
    },
    {
      stageTitle: "Fit & Intent Scored",
      badge: "Intent Scoring Algorithm",
      company: {
        name: "Apex Dynamics",
        domain: "apexdynamics.io",
        industry: "B2B SaaS / FinTech",
        size: "180 employees",
        funding: "Series B ($28M)",
      },
      contact: {
        name: "Alex Mercer",
        title: "VP of Sales",
        avatar: "AM",
        email: "a.mercer@apexdynamics.io",
        emailStatus: "verified",
        phone: "+1 (415) 890-4412",
        phoneStatus: "verified",
      },
      score: {
        value: 96,
        tier: "Tier A+ Priority",
        intentSpike: "+42% outbound tech searches",
        matchReason: "Meets 5 of 5 ICP criteria · Immediate outreach window",
      },
    },
    {
      stageTitle: "AI Opener Drafted",
      badge: "Claude 3.7 Sonnet Agent",
      company: {
        name: "Apex Dynamics",
        domain: "apexdynamics.io",
        industry: "B2B SaaS / FinTech",
        size: "180 employees",
        funding: "Series B ($28M)",
      },
      contact: {
        name: "Alex Mercer",
        title: "VP of Sales",
        avatar: "AM",
        email: "a.mercer@apexdynamics.io",
        emailStatus: "verified",
        phone: "+1 (415) 890-4412",
        phoneStatus: "verified",
      },
      score: {
        value: 96,
        tier: "Tier A+ Priority",
        intentSpike: "Outreach ready",
        matchReason: "Personalization tailored to recent team expansion",
      },
      opener: {
        subject: "scaling outbound for Apex's new SDR cohort",
        body: "Congrats on stepping in as VP Sales at Apex, Alex. Scaling outbound across 6 new SDRs usually means either manual Clay scraping bottlenecks or burned secondary domains. We engineer automated waterfall systems that book 15-20 qualified enterprise meetings monthly without SDR manual data entry.",
        angle: "Pain Point: SDR Onboarding & Domain Safety",
      },
    },
    {
      stageTitle: "Dispatched via Mailbox Rotation",
      badge: "Deliverability Engine",
      company: {
        name: "Apex Dynamics",
        domain: "apexdynamics.io",
        industry: "B2B SaaS / FinTech",
        size: "180 employees",
        funding: "Series B ($28M)",
      },
      contact: {
        name: "Alex Mercer",
        title: "VP of Sales",
        avatar: "AM",
        email: "a.mercer@apexdynamics.io",
        emailStatus: "verified",
        phone: "+1 (415) 890-4412",
        phoneStatus: "verified",
      },
      dispatch: {
        statusText: "Queued, inbox 3 of 25",
        inboxNumber: "alex-outbound-3@apex-pipe.com",
        domainHealth: "99.8% Warmup Score",
        auth: "SPF, DKIM & DMARC 100% Passed · 0% Spam Score",
      },
    },
    {
      stageTitle: "Qualified Meeting Confirmed",
      badge: "HubSpot CRM Synced",
      company: {
        name: "Apex Dynamics",
        domain: "apexdynamics.io",
        industry: "B2B SaaS / FinTech",
        size: "180 employees",
        funding: "Series B ($28M)",
      },
      contact: {
        name: "Alex Mercer",
        title: "VP of Sales",
        avatar: "AM",
        email: "a.mercer@apexdynamics.io",
        emailStatus: "verified",
        phone: "+1 (415) 890-4412",
        phoneStatus: "verified",
      },
      booking: {
        time: "Thursday, Nov 27 · 2:30 PM EST",
        format: "30-Min Strategy Call (Google Meet)",
        crmDeal: "Apex Dynamics - Outbound Infrastructure",
        dealValue: "$48,000 ARR Pipeline",
        status: "Accepted & Logged · Slack notification delivered",
      },
    },
  ],
};
