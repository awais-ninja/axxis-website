import {
  marketingCapabilities,
  relatedSlugs,
  serviceDetails,
} from "./service-content";
import { services } from "./services";

describe("service page content", () => {
  test("covers every approved service and no extra marketing routes", () => {
    expect(Object.keys(serviceDetails).sort()).toEqual(
      services.map((service) => service.slug).sort(),
    );
    expect(relatedSlugs("not-a-service")).toEqual([]);
    expect(relatedSlugs("custom-software-development")).toEqual([
      "business-automation-integrations",
    ]);
    expect(marketingCapabilities.map((item) => item.name)).toEqual([
      "Digital marketing strategy",
      "Social media marketing and management",
      "Google Ads and PPC",
      "Meta, Facebook, and Instagram advertising",
      "Email marketing and automation",
      "Content marketing and copywriting",
      "Branding and graphic design",
      "Lead generation",
      "Campaign planning and management",
      "Creative advertising",
    ]);
  });
});
