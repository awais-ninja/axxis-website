import Link from "next/link";
import { enquiryHref } from "@/lib/navigation";

export function EnquiryLink({ children }) {
  return (
    <Link
      href={enquiryHref}
      className="inline-flex min-h-11 items-center rounded-full bg-electric px-5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
    >
      {children}
    </Link>
  );
}
