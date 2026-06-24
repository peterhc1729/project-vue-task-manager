//gives us auto completion in the editor
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()], // activate Vue plugin

  base: "/peterhc1729/",
});
