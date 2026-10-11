import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) {
    return pageMetadata({
      title: "Page not found",
      description: "That address is not part of the AXXIS Works Ltd website.",
      path: "/404",
      indexable: false,
    });
  }

  return pageMetadata({
    title: service.name,
    description: service.scope,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
