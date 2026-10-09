import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";
import globals from "globals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    files: ["src/**/*.test.{js,jsx}", "vitest.setup.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
      },
    },
  },
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "blob-report/**",
    "public/**",
  ]),
]);

export default eslintConfig;
