import * as matchers from "@testing-library/jest-dom/matchers";

process.env.NEXT_PUBLIC_COPYRIGHT_YEAR ??= String(new Date().getFullYear());

expect.extend(matchers);
