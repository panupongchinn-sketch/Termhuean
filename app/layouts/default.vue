<template>
  <div class="min-h-screen overflow-y-auto bg-white text-slate-900">
    <div :class="isHome ? 'min-h-screen flex flex-col overflow-visible' : 'min-h-screen flex flex-col overflow-visible'">
      <header
        v-if="!isHome"
        class="sticky top-0 z-[60] bg-white/95 border-b border-emerald-100 backdrop-blur"
      >
        <div class="max-w-none mx-auto px-4 sm:px-6 lg:px-10">
          <div class="h-16 flex items-center gap-3 sm:gap-4">
            <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
              <img
                src="/N-Picsart-AiImageEnhancer.jpg"
                alt="TERM HUEAN"
                class="h-10 sm:h-12 w-auto object-contain"
              />
            </NuxtLink>

            <div class="flex-1"></div>
          </div>

          <div class="h-12 flex items-center border-t border-slate-100">
            <nav class="flex items-center gap-5 text-sm overflow-x-auto whitespace-nowrap no-scrollbar">
              <NuxtLink
                v-for="item in nav"
                :key="item.to"
                :to="item.to"
                class="font-semibold text-slate-800 hover:text-emerald-700 shrink-0"
                :class="route.path === item.to ? 'text-emerald-700' : ''"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </header>

      <main
        class="flex-1 w-full max-w-none mx-auto overflow-visible bg-white"
        :class="isHome ? 'px-0 py-0' : 'px-4 sm:px-6 lg:px-10 py-8'"
      >
        <slot />
      </main>

      <footer class="bg-emerald-800 text-white mt-auto">
        <div class="max-w-none mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div class="mb-4 text-sm font-semibold leading-relaxed text-white sm:text-lg">
            เติมเฮือน รับต่อเติมบ้าน - มหาสารคาม กาฬสินธุ์ ร้อยเอ็ด ขอนแก่น สกลนคร
          </div>
          <div class="flex items-center justify-between gap-4 text-xs text-white/70">
            <span class="text-sm font-semibold text-white sm:text-base">โทร 080-992-5304</span>
            <span>© {{ new Date().getFullYear() }} M&B</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const isHome = computed(() => route.path === "/")
const isShowcase = computed(() => route.path.startsWith("/showcase/"))
const isAdmin = computed(() => route.path.startsWith("/admin"))

const nav = computed(() => {
  if (isShowcase.value) {
    return [{ label: "หน้าแรก", to: "/" }]
  }

  if (isAdmin.value) {
    return [{ label: "หน้าแรก", to: "/" }]
  }

  const base = [
    { label: "หน้าแรก", to: "/" },
    { label: "เกี่ยวกับเรา", to: "/about" },
    { label: "สินค้า", to: "/product" },
    { label: "บริการ", to: "/service" },
    { label: "ติดต่อ", to: "/contact" },
  ]

  return base
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap");

* {
  font-family: "Kanit", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
