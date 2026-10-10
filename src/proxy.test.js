import { NextRequest } from "next/server";
import { proxy } from "./proxy";

function requestFor(path) {
  return new NextRequest(`http://localhost:3000${path}`);
}

test("a confirmed service slug continues to its page", () => {
  const response = proxy(requestFor("/services/seo-search-marketing"));

  expect(response.headers.get("x-middleware-next")).toBe("1");
});

test("an unknown service slug is rewritten before the page streams", () => {
  const response = proxy(requestFor("/services/websites"));

  expect(response.headers.get("x-middleware-rewrite")).toContain(
    "/__axxis-unknown-service",
  );
});
