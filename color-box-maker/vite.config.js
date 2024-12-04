import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true, // Enables global test functions like "describe", "it", "expect"
		environment: "jsdom", // Simulates a browser environment (important for React)
		setupFiles: "./src/setupTests.js", // Path to setup file (to configure things like jest-dom)
		coverage: {
			provider: "c8", // Use 'c8' for code coverage
			reporter: ["text", "json", "html"], // Coverage output formats
		},
	},
});
