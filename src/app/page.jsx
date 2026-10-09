import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <h1 className="text-navy">{site.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-grey">{site.description}</p>
    </>
  );
}
