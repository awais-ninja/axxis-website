import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 outline-none sm:py-16"
      >
        <h1 className="text-navy">{site.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-grey">{site.description}</p>
      </main>
      <SiteFooter />
    </>
  );
}
