import { NextResponse } from "next/server";
import { serviceBySlug } from "@/lib/services";

export function proxy(request) {
  const slug = request.nextUrl.pathname.slice("/services/".length);

  if (serviceBySlug(slug)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/__axxis-unknown-service";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/services/:slug",
};
