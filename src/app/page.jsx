import { CapabilityStory } from "@/components/capability-story";
import { EnquiryPrompt } from "@/components/enquiry-prompt";
import { HomeHero } from "@/components/home-hero";
import { ServiceBento } from "@/components/service-bento";

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
