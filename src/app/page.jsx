import { CapabilityStory } from "@/components/capability-story";
import { EnquiryPrompt } from "@/components/enquiry-prompt";
import { HomeHero } from "@/components/home-hero";
import { ServiceBento } from "@/components/service-bento";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: { absolute: `${site.name} · ${site.headline}` },
  description: site.supporting,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServiceBento />
      <CapabilityStory />
      <EnquiryPrompt />
    </>
  );
}
