import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    include: ["tests/unit/**/*.test.ts"],
    exclude: ["tests/browser/**"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/components/visualization/**"],
      thresholds: { statements: 90 },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
