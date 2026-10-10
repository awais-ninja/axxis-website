const motifs = {
  "website-design-development": "M18 40 H46 M22 28 H42 M26 22 H38",
  "custom-software-development": "M20 20 H44 V44 H20 Z M28 28 H36",
  "website-maintenance-support": "M32 18 V46 M18 32 H46",
  "it-support-solutions": "M32 16 L46 44 H18 Z",
  "seo-search-marketing": "M24 40 A12 12 0 1 1 40 40",
  "digital-marketing-advertising": "M18 36 L32 18 L46 36",
  "business-automation-integrations":
    "M18 24 H46 M18 40 H46 M24 18 V46 M40 18 V46",
};

export function ServiceMark({ slug }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="size-14 shrink-0 text-electric"
    >
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M26 26 L38 38 M38 26 L26 38"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d={motifs[slug]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
