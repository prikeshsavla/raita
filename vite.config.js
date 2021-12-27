import vue from "@vitejs/plugin-vue";

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  base: "/raita/",
  build: { outDir: "docs", assetsDir: "assets" },
};
