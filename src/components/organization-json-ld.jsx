import { organizationStructuredData, serializeJsonLd } from "@/lib/seo";

export function OrganizationJsonLd({ data = organizationStructuredData() }) {
  if (!data) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
