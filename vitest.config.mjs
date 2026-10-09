import path from "node:path";
import { defineConfig } from "vitest/config";

// Tests use Vitest globals. Do not import describe, test, or expect from
// "vitest": Vitest 5 evaluates that import in a separate module instance and
// the suite collector then has no runner.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  plugins: [
    {
      name: "stub-css-for-unit-tests",
      enforce: "pre",
      load(id) {
        if (id.endsWith(".css") || id.includes(".css?")) {
          return "export default {}";
        }

        return null;
      },
    },
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.js"],
    include: ["src/**/*.test.{js,jsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/**/*.test.{js,jsx}"],
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 85,
        lines: 85,
        // An untested source file is 0% on its own and fails the run even
        // when the project average stays above the global minimum.
        perFile: true,
      },
    },
  },
});
