// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const pgNativeShim = fileURLToPath(
  new URL("./server/shims/pg-native.cjs", import.meta.url)
)

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  nitro: {
    alias: {
      "pg-native": pgNativeShim,
    },
    cloudflare: {
      nodeCompat: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
