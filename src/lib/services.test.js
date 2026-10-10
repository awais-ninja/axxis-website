import {
  capabilityGroups,
  serviceBySlug,
  serviceHref,
  services,
} from "./services";

describe("approved services", () => {
  test("lists the seven confirmed categories and no detail routes", () => {
    expect(services).toHaveLength(7);
    expect(services.map((service) => service.slug)).toEqual([
      "website-design-development",
      "custom-software-development",
      "website-maintenance-support",
      "it-support-solutions",
      "seo-search-marketing",
      "digital-marketing-advertising",
      "business-automation-integrations",
    ]);
    expect(
      services.every((service) => serviceHref(service.slug).startsWith("#")),
    ).toBe(true);
    expect(
      services.some((service) =>
        serviceHref(service.slug).includes("/services/"),
      ),
    ).toBe(false);
  });

  test("tells the capability story in the approved order", () => {
    expect(capabilityGroups.map((group) => group.title)).toEqual([
      "Websites",
      "Software",
      "Care and IT",
      "Search and marketing",
      "Automation",
    ]);
    const covered = capabilityGroups.flatMap((group) => group.slugs);
    expect(covered).toEqual(services.map((service) => service.slug));
    expect(serviceBySlug("missing")).toBeUndefined();
    expect(serviceBySlug("it-support-solutions").name).toBe(
      "IT Support & Solutions",
    );
  });
});
