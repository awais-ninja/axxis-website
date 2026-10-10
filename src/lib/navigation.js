const navigationCandidates = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const legalCandidates = [
  { href: "/privacy", label: "Privacy" },
  { href: "/accessibility", label: "Accessibility" },
];

const implementedPaths = new Set([
  "/",
  "/about",
  "/services",
  "/contact",
  "/privacy",
  "/accessibility",
]);

export const enquiryHref = "/contact";

export function navigationForImplementedRoutes(
  items = navigationCandidates,
  paths = implementedPaths,
) {
  return items.filter((item) => paths.has(item.href));
}

export const primaryNavigation = navigationForImplementedRoutes();

export const legalNavigation = navigationForImplementedRoutes(legalCandidates);
