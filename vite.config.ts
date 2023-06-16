import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			"/oscar": {
				target: "https://oscar.gatech.edu",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/oscar/, "")
			}
		}
	}
});
