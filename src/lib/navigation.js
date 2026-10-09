const navigationCandidates = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const implementedPaths = new Set(["/"]);

export function navigationForImplementedRoutes(
  items = navigationCandidates,
  paths = implementedPaths,
) {
  return items.filter((item) => paths.has(item.href));
}

export const primaryNavigation = navigationForImplementedRoutes();
