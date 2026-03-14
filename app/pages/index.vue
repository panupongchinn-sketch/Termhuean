<template>
  <div class="min-h-screen bg-[#e6e6e8] text-slate-900">
    <section class="relative h-[540px] overflow-hidden sm:h-[760px]">
      <img
        v-for="(image, imageIndex) in heroImages"
        :key="`hero-${image}`"
        :src="image"
        :alt="`Hero slide ${imageIndex + 1}`"
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        :class="imageIndex === activeHeroIndex ? 'opacity-100' : 'opacity-0'"
      />

      <div class="absolute inset-x-0 top-0 z-20 px-3 pt-3 sm:px-5 sm:pt-4">
        <div class="bg-transparent px-4 py-3 text-[#c9a44c] sm:px-8 sm:py-4">
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="inline-flex items-center">
              <img src="/N-Picsart-AiImageEnhancer.jpg" alt="TERM HUEAN" class="h-12 w-auto object-contain sm:h-16" />
            </NuxtLink>

            <div></div>
          </div>
        </div>
      </div>

      <div class="relative z-10 mx-auto flex h-full max-w-[1880px] items-start px-2 pt-24 sm:px-4 sm:pt-28">
        <div class="max-w-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          <h1 class="title-font text-3xl font-semibold leading-tight sm:text-5xl">{{ ui.heroTitle }}</h1>
          <p class="mt-4 text-lg leading-relaxed text-white/95 sm:text-[24px]">
            {{ ui.heroBody }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-sm">
        <span
          v-for="(_, imageIndex) in heroImages"
          :key="`hero-dot-${imageIndex}`"
          class="h-2.5 w-2.5 rounded-full transition"
          :class="imageIndex === activeHeroIndex ? 'bg-white' : 'bg-white/40'"
        ></span>
      </div>
    </section>

    <section class="mx-auto max-w-[1580px] px-4 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16">
      <header class="text-center">
        <h1 class="title-font text-4xl font-bold tracking-wide text-black sm:text-6xl">แบบบ้านของเรา</h1>
      </header>

      <div v-if="houseCards.length" class="mt-11 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
        <NuxtLink
          v-for="item in houseCards"
          :key="`house-${item.name}`"
          :to="detailHref(item)"
          class="group block overflow-hidden border border-[#d5d5d5] bg-[#ececec] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
        >
          <div class="relative">
            <img
              :src="item.images[0]"
              :alt="item.name"
              class="h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-[250px]"
            />
          </div>

          <div class="px-8 py-6">
            <h2 class="title-font text-2xl font-bold uppercase text-[#151515] sm:text-3xl">{{ item.name }}</h2>
            <p class="mt-2 min-h-14 text-sm leading-relaxed text-[#5e5e5e] sm:text-base">{{ item.description }}</p>

            <div class="mt-5 grid grid-cols-2 gap-x-5 gap-y-2 border-t border-[#d5d5d5] pt-4 text-sm text-[#303030] sm:text-base">
              <div class="feature-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v2H6v5H4V4zm9 0h7v7h-2V6h-5V4zM4 13h2v5h5v2H4v-7zm14 0h2v7h-7v-2h5v-5zM9 11h6v2H9z"/></svg>
                {{ item.area }} {{ ui.sqm }}
              </div>
              <div class="feature-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18v6h-2v-4H5v4H3v-6zm2-6h14v5H5V6zm1 1v3h12V7H6z"/></svg>
                {{ item.bedroom }} {{ ui.bedroom }}
              </div>
              <div class="feature-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l1 5H6l1-5zm-3 7h16v8a3 3 0 0 1-3 3h-1v-4H8v4H7a3 3 0 0 1-3-3v-8zm5 2v3h6v-3H9z"/></svg>
                {{ item.bathroom }} {{ ui.bathroom }}
              </div>
              <div class="feature-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h14l-1-4H6l-1 4zm-2 1h18v5a3 3 0 0 1-3 3h-1v-2H7v2H6a3 3 0 0 1-3-3v-5zm5 1a1.5 1.5 0 1 0 .001 2.999A1.5 1.5 0 0 0 8 13zm8 0a1.5 1.5 0 1 0 .001 2.999A1.5 1.5 0 0 0 16 13z"/></svg>
                {{ item.parking }} {{ ui.parking }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="mt-11 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center text-slate-500">
        ยังไม่มีรายการแบบบ้าน
      </div>

    </section>

    <section class="mx-auto max-w-[1580px] px-4 pb-16 pt-4 sm:px-8 sm:pb-20 sm:pt-8">
      <header class="text-center">
        <h1 class="title-font text-4xl font-bold tracking-wide text-black sm:text-6xl">แบบโรงรถ หลังคา</h1>
      </header>

      <div v-if="garageCards.length" class="mt-11 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
        <NuxtLink
          v-for="item in garageCards"
          :key="`garage-${item.name}`"
          :to="detailHref(item)"
          class="group block overflow-hidden border border-[#d5d5d5] bg-[#ececec] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
        >
          <div class="relative">
            <img
              :src="item.images[0]"
              :alt="item.name"
              class="h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-[250px]"
            />
          </div>

          <div class="px-8 py-6">
            <h2 class="title-font text-2xl font-bold uppercase text-[#151515] sm:text-3xl">{{ item.name }}</h2>
            <p class="mt-2 min-h-14 text-sm leading-relaxed text-[#5e5e5e] sm:text-base">{{ item.description }}</p>

            <div class="mt-5 grid grid-cols-2 gap-x-5 gap-y-2 border-t border-[#d5d5d5] pt-4 text-sm text-[#303030] sm:text-base">
              <div class="feature-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v2H6v5H4V4zm9 0h7v7h-2V6h-5V4zM4 13h2v5h5v2H4v-7zm14 0h2v7h-7v-2h5v-5zM9 11h6v2H9z"/></svg>
                {{ item.area }} {{ ui.sqm }}
              </div>
              <div class="feature-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h14l-1-4H6l-1 4zm-2 1h18v5a3 3 0 0 1-3 3h-1v-2H7v2H6a3 3 0 0 1-3-3v-5zm5 1a1.5 1.5 0 1 0 .001 2.999A1.5 1.5 0 0 0 8 13zm8 0a1.5 1.5 0 1 0 .001 2.999A1.5 1.5 0 0 0 16 13z"/></svg>
                {{ item.parking }} {{ ui.parking }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="mt-11 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center text-slate-500">
        ยังไม่มีรายการแบบโรงรถ หลังคา
      </div>

    </section>
  </div>
</template>

<script setup lang="ts">
import type { HomeModelWithImages } from "~/composables/useHomeModels"

type DisplayCard = {
  id: string
  type: "house" | "garage"
  name: string
  description: string
  area: string
  bedroom: number
  bathroom: number
  parking: number
  images: string[]
}

const ui = {
  phoneAria: "โทรศัพท์",
  topButton: "แบบบ้านของเรา",
  heroTitle: "เติมเฮือน บริษัท รับสร้างบ้าน",
  heroBody:
    "เติมเฮือน บริษัทรับสร้างบ้านที่ต้องการทำงาน “นอกกรอบ” บริบทเดิมๆ ด้วยบริการออกแบบและปรับแบบตามใจผู้อยู่อาศัย",
  sqm: "ตร.ม.",
  bedroom: "ห้องนอน",
  bathroom: "ห้องน้ำ",
  parking: "คัน",
}

const heroImages = [
  "/PERSPECTIVE-Julie-scaled.webp",
  "/PERSPECTIVE-K-FON-scaled.webp",
  "/PERSPECTIVE-2_0-scaled.webp",
  "/PERSPECTIVE-1_0-scaled.webp",
]

const defaultHouseCards: DisplayCard[] = [
  {
    id: "house-neo",
    type: "house",
    name: "NEO",
    description: "Modern luxury, balanced layout and practical spaces.",
    area: "674.00",
    bedroom: 2,
    bathroom: 6,
    parking: 6,
    images: ["/PERSPECTIVE_5-scaled.webp"],
  },
  {
    id: "house-marshal",
    type: "house",
    name: "MARSHAL",
    description: "Wide facade design with strong character and premium details.",
    area: "738.00",
    bedroom: 4,
    bathroom: 5,
    parking: 4,
    images: ["/PERSPECTIVE-scaled.webp"],
  },
  {
    id: "house-bauhaus",
    type: "house",
    name: "BAUHAUS",
    description: "Contemporary style, clean lines and efficient family zoning.",
    area: "935.00",
    bedroom: 4,
    bathroom: 5,
    parking: 4,
    images: ["/PERSPECTIVE-2-scaled.webp"],
  },
  {
    id: "house-alberta",
    type: "house",
    name: "ALBERTA",
    description: "Premium mansion concept for large families and elegant living.",
    area: "1,347.00",
    bedroom: 5,
    bathroom: 6,
    parking: 4,
    images: ["/PERSPECTIVE-K-FON-scaled.webp"],
  },
]

const defaultGarageCards: DisplayCard[] = [
  {
    id: "garage-neo",
    type: "garage",
    name: "GARAGE NEO",
    description: "Modern garage and roof extension with balanced proportions.",
    area: "45.00",
    bedroom: 0,
    bathroom: 0,
    parking: 2,
    images: ["/PERSPECTIVE_5-scaled.webp"],
  },
  {
    id: "garage-marshal",
    type: "garage",
    name: "GARAGE MARSHAL",
    description: "Tall modern canopy design with a strong vertical character.",
    area: "52.00",
    bedroom: 0,
    bathroom: 0,
    parking: 3,
    images: ["/PERSPECTIVE-scaled.webp"],
  },
  {
    id: "garage-bauhaus",
    type: "garage",
    name: "GARAGE BAUHAUS",
    description: "Clean contemporary roofline for a practical covered parking zone.",
    area: "60.00",
    bedroom: 0,
    bathroom: 0,
    parking: 2,
    images: ["/PERSPECTIVE-2-scaled.webp"],
  },
  {
    id: "garage-alberta",
    type: "garage",
    name: "GARAGE ALBERTA",
    description: "Premium garage roof extension for larger homes and multiple cars.",
    area: "72.00",
    bedroom: 0,
    bathroom: 0,
    parking: 4,
    images: ["/PERSPECTIVE-K-FON-scaled.webp"],
  },
]

const houseCards = ref<DisplayCard[]>(defaultHouseCards)
const garageCards = ref<DisplayCard[]>(defaultGarageCards)
const activeHeroIndex = ref(0)

const { list } = useHomeModels()
const detailHref = (item: DisplayCard) => `/showcase/${item.type}/${item.id}`

const normalizeCards = (rows: HomeModelWithImages[]) =>
  rows.map((item) => ({
    id: item.id,
    type: item.type,
    name: item.name || "-",
    description: item.description || "",
    area: item.area || "-",
    bedroom: Number(item.bedroom) || 0,
    bathroom: Number(item.bathroom) || 0,
    parking: Number(item.parking) || 0,
    images: Array.isArray(item.images) && item.images.length
      ? item.images.map((image) => image.image_url)
      : ["/PERSPECTIVE-Julie-scaled.webp"],
  }))

const loadHomeModels = async () => {
  try {
    const rows = await list()
    if (!Array.isArray(rows) || !rows.length) return

    const houses = normalizeCards(rows.filter((item) => item.type === "house"))
    const garages = normalizeCards(rows.filter((item) => item.type === "garage"))

    houseCards.value = houses
    garageCards.value = garages
  } catch {
    houseCards.value = defaultHouseCards
    garageCards.value = defaultGarageCards
  }
}

let autoSlideTimer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  autoSlideTimer = setInterval(() => {
    activeHeroIndex.value = (activeHeroIndex.value + 1) % heroImages.length
  }, 3200)

  await loadHomeModels()
})

onBeforeUnmount(() => {
  if (autoSlideTimer) clearInterval(autoSlideTimer)
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap");

.title-font {
  font-family: "Oswald", "Kanit", sans-serif;
}

.line-chip {
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid #c9a44c;
  padding: 0.1rem 0.45rem;
  font-size: 0.62rem;
  font-weight: 700;
}

.feature-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.feature-item svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  color: #3a3a3a;
}
</style>
