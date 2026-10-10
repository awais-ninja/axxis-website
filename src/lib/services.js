export const services = [
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    scope:
      "Business websites, e-commerce, landing pages, redesigns, and responsive development.",
    span: "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    scope:
      "Custom web applications, business software, SaaS platforms, and tailored systems.",
    span: "lg:col-span-5",
  },
  {
    slug: "website-maintenance-support",
    name: "Website Maintenance & Support",
    scope:
      "Updates, maintenance, troubleshooting, ongoing technical support, and website management.",
    span: "lg:col-span-5",
  },
  {
    slug: "it-support-solutions",
    name: "IT Support & Solutions",
    scope:
      "Technical troubleshooting, business IT assistance, system configuration, and consultancy.",
    span: "lg:col-span-4",
  },
  {
    slug: "seo-search-marketing",
    name: "SEO & Search Marketing",
    scope:
      "Technical SEO, on-page SEO, local SEO, Google Business Profile, search visibility, and optimisation.",
    span: "lg:col-span-4",
  },
  {
    slug: "digital-marketing-advertising",
    name: "Digital Marketing & Advertising",
    scope:
      "Strategy, social, Google Ads, Meta ads, email, content, branding, lead generation, and campaign planning.",
    span: "lg:col-span-4",
  },
  {
    slug: "business-automation-integrations",
    name: "Business Automation & Integrations",
    scope:
      "Business workflows, CRM integrations, APIs, process automation, and software integrations.",
    span: "sm:col-span-2 lg:col-span-12",
  },
];

export const capabilityGroups = [
  {
    id: "websites",
    title: "Websites",
    slugs: ["website-design-development"],
  },
  {
    id: "software",
    title: "Software",
    slugs: ["custom-software-development"],
  },
  {
    id: "care-and-it",
    title: "Care and IT",
    slugs: ["website-maintenance-support", "it-support-solutions"],
  },
  {
    id: "search-and-marketing",
    title: "Search and marketing",
    slugs: ["seo-search-marketing", "digital-marketing-advertising"],
  },
  {
    id: "automation",
    title: "Automation",
    slugs: ["business-automation-integrations"],
  },
];

export function serviceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

export function serviceHref(slug) {
  return `/services/${slug}`;
}
