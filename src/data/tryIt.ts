export interface EnrichedRow {
  id: string;
  company: string;
  website: string;
  industry: string;
  headcount: string;
  decisionMaker: {
    name: string;
    title: string;
    avatar: string;
  };
  workEmail: string;
  emailStatus: "verified" | "catchall" | "pending";
  emailConfidence: string;
  techStack: string[];
  funding: string;
  waterfallLog: string;
}

export function generateSampleEnrichment(rawName: string): EnrichedRow[] {
  const company = rawName.trim() || "Acme Corp";
  const slug = company.toLowerCase().replace(/[^a-z0-9]/g, "") || "sample";
  const domain = `${slug}.example.com`;

  return [
    {
      id: "row-1",
      company,
      website: domain,
      industry: "B2B SaaS / FinTech",
      headcount: "150-250 employees",
      decisionMaker: {
        name: "Alex Mercer",
        title: "VP of Sales",
        avatar: "AM",
      },
      workEmail: `a.mercer@${domain}`,
      emailStatus: "verified",
      emailConfidence: "99% Deliverable",
      techStack: ["HubSpot", "Apollo.io", "Salesforce"],
      funding: "Series B ($28M)",
      waterfallLog: "Provider 1: not found, Provider 2: found (Clay Waterfall)",
    },
    {
      id: "row-2",
      company,
      website: domain,
      industry: "B2B SaaS / FinTech",
      headcount: "150-250 employees",
      decisionMaker: {
        name: "Taylor Vance",
        title: "Head of Growth",
        avatar: "TV",
      },
      workEmail: `t.vance@${domain}`,
      emailStatus: "verified",
      emailConfidence: "98% Deliverable",
      techStack: ["Clay", "Instantly", "Smartlead"],
      funding: "Series B ($28M)",
      waterfallLog: "Provider 1: found (Apollo Waterfall)",
    },
    {
      id: "row-3",
      company,
      website: domain,
      industry: "B2B SaaS / FinTech",
      headcount: "150-250 employees",
      decisionMaker: {
        name: "Sam Rivera",
        title: "Founder & CEO",
        avatar: "SR",
      },
      workEmail: `sam@${domain}`,
      emailStatus: "verified",
      emailConfidence: "Direct Mobile + Email",
      techStack: ["Slack", "Google Workspace", "Stripe"],
      funding: "Series B ($28M)",
      waterfallLog: "Provider 1: not found, Provider 2: found (Dropcontact)",
    },
  ];
}

export const tryItContent = {
  header: {
    eyebrow: "Try it",
    lead: "DON'T READ ABOUT IT.",
    accent: "WATCH IT WORK.",
    description: "Type a company and watch a waterfall enrichment run.",
  },
  examples: ["Acme Corp", "Horizon Labs", "Nexus AI"],
  disclaimer: "Demo with sample data. Real builds use live providers.",
  completion: {
    title: "Want this on your own list?",
    description: "I build custom waterfall tables, AI scrapers, and outbound engines tailored to your exact TAM.",
    buttonLabel: "Book a discovery call",
    buttonUrl: "https://calendly.com/upbynature/discovery-call",
  },
};
