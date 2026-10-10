export const marketingCapabilities = [
  {
    name: "Digital marketing strategy",
    detail:
      "Planning how the confirmed marketing channels fit the work a business wants to be found for.",
  },
  {
    name: "Social media marketing and management",
    detail:
      "Social channels used to publish and look after a business’s own posts.",
  },
  {
    name: "Google Ads and PPC",
    detail: "Paid search advertising, including Google Ads and other PPC.",
  },
  {
    name: "Meta, Facebook, and Instagram advertising",
    detail: "Paid advertising on Meta, Facebook, and Instagram.",
  },
  {
    name: "Email marketing and automation",
    detail: "Email marketing and the automation that sends those messages.",
  },
  {
    name: "Content marketing and copywriting",
    detail: "Content and copy written for the business’s own channels.",
  },
  {
    name: "Branding and graphic design",
    detail: "Branding and graphic design for the materials the business uses.",
  },
  {
    name: "Lead generation",
    detail: "Work aimed at bringing enquiries to the business.",
  },
  {
    name: "Campaign planning and management",
    detail: "Planning a campaign and looking after it while it runs.",
  },
  {
    name: "Creative advertising",
    detail: "Creative work made for the advertising the business runs.",
  },
];

const relatedBySlug = {
  "website-design-development": [
    "website-maintenance-support",
    "seo-search-marketing",
  ],
  "custom-software-development": ["business-automation-integrations"],
  "website-maintenance-support": [
    "website-design-development",
    "it-support-solutions",
  ],
  "it-support-solutions": [
    "website-maintenance-support",
    "business-automation-integrations",
  ],
  "seo-search-marketing": [
    "digital-marketing-advertising",
    "website-design-development",
  ],
  "digital-marketing-advertising": [
    "seo-search-marketing",
    "website-design-development",
  ],
  "business-automation-integrations": [
    "custom-software-development",
    "it-support-solutions",
  ],
};

export const serviceDetails = {
  "website-design-development": {
    forWhom:
      "Businesses that need a business website, an online shop, a landing page, a redesign, or pages that work on small and large screens.",
    notes:
      "This is the work of building or replacing the site people visit. E-commerce covers selling through that site. A landing page is a single page with one next step. A redesign replaces an existing site. Responsive development keeps those pages usable across screen sizes.",
  },
  "custom-software-development": {
    forWhom:
      "Businesses that need a web application, business software, a SaaS platform, or another system shaped around their own process.",
    notes:
      "This is software written for a particular operation rather than a brochure site. It can be a custom web application, software the business runs internally, a SaaS platform, or another tailored system.",
  },
  "website-maintenance-support": {
    forWhom:
      "Businesses that already have a website and need it updated, maintained, troubleshot, or managed.",
    notes:
      "The work starts from a site that exists. It covers updates, maintenance, troubleshooting, ongoing technical support, and website management. It does not replace the decision to build a new site.",
  },
  "it-support-solutions": {
    forWhom:
      "Businesses that need technical troubleshooting, help with business IT, system configuration, or IT consultancy.",
    notes:
      "This is support for the business’s IT, not only its public website. It covers troubleshooting, configuration, and consultancy about those systems.",
  },
  "seo-search-marketing": {
    forWhom:
      "Businesses that want their pages, local listing, and Google Business Profile considered in search.",
    notes:
      "The work covers technical SEO, on-page SEO, local SEO, Google Business Profile, and search visibility. It describes the work offered. It is not a promise of a ranking or a traffic figure.",
  },
  "digital-marketing-advertising": {
    forWhom:
      "Businesses that want strategy, social publishing, paid advertising, email, content, branding, or campaign planning handled as one service.",
    notes:
      "Digital Marketing & Advertising is one service. The capabilities below are parts of that service. They are not separate pages, and they are not evidence of past campaigns.",
  },
  "business-automation-integrations": {
    forWhom:
      "Businesses that need workflows, CRM connections, APIs, or other software joined so a process can run with less manual passing of information.",
    notes:
      "The work connects systems the business uses. It covers workflows, CRM integrations, APIs, process automation, and software integrations.",
  },
};

export function relatedSlugs(slug) {
  return relatedBySlug[slug] ?? [];
}
