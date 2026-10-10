import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { serviceBySlug, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) {
    return { title: "Page not found · AXXIS Works Ltd" };
  }

  return {
    title: `${service.name} · AXXIS Works Ltd`,
    description: service.scope,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
