import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), ViteMinifyPlugin({})],
	base: "",
});
