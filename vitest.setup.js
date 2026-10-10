import * as matchers from "@testing-library/jest-dom/matchers";

process.env.NEXT_PUBLIC_COPYRIGHT_YEAR ??= String(new Date().getFullYear());

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

class IntersectionObserverStub {
  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = IntersectionObserverStub;

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
  });
}

expect.extend(matchers);
