<template>
  <div class="mx-auto max-w-[1480px] px-4 py-10 sm:px-8">
    <div v-if="model" class="space-y-8">
      <section class="space-y-4">
        <div class="overflow-hidden rounded-none bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
          <img :src="model.images[0]" :alt="model.name" class="h-[320px] w-full rounded-none object-cover sm:h-[620px]" />
        </div>

        <div v-if="model.images.length > 1" class="space-y-4">
          <div
            v-for="(image, imageIndex) in model.images.slice(1)"
            :key="image"
            class="overflow-hidden rounded-none bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
          >
            <img
              :src="image"
              :alt="`${model.name} ${imageIndex + 2}`"
              class="h-[260px] w-full rounded-none object-cover sm:h-[520px]"
            />
          </div>
        </div>
      </section>

      <section class="space-y-6 rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:p-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-[#8a2025]">{{ sectionLabel }}</p>
          <h1 class="title-font mt-3 text-4xl font-bold text-[#111827] sm:text-5xl">{{ model.name }}</h1>
          <p class="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{{ model.description || fallbackDescription }}</p>
        </div>

        <div class="grid gap-4 md:grid-cols-4">
          <div class="detail-chip">
            <div class="detail-chip-label">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v2H6v5H4V4zm9 0h7v7h-2V6h-5V4zM4 13h2v5h5v2H4v-7zm14 0h2v7h-7v-2h5v-5zM9 11h6v2H9z"/></svg>
              <span>พื้นที่</span>
            </div>
            <strong>{{ model.area }} ตร.ม.</strong>
          </div>

          <div class="detail-chip">
            <div class="detail-chip-label">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18v6h-2v-4H5v4H3v-6zm2-6h14v5H5V6zm1 1v3h12V7H6z"/></svg>
              <span>ห้องนอน</span>
            </div>
            <strong>{{ model.bedroom }}</strong>
          </div>

          <div class="detail-chip">
            <div class="detail-chip-label">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10l1 5H6l1-5zm-3 7h16v8a3 3 0 0 1-3 3h-1v-4H8v4H7a3 3 0 0 1-3-3v-8zm5 2v3h6v-3H9z"/></svg>
              <span>ห้องน้ำ</span>
            </div>
            <strong>{{ model.bathroom }}</strong>
          </div>

          <div class="detail-chip">
            <div class="detail-chip-label">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h14l-1-4H6l-1 4zm-2 1h18v5a3 3 0 0 1-3 3h-1v-2H7v2H6a3 3 0 0 1-3-3v-5zm5 1a1.5 1.5 0 1 0 .001 2.999A1.5 1.5 0 0 0 8 13zm8 0a1.5 1.5 0 1 0 .001 2.999A1.5 1.5 0 0 0 16 13z"/></svg>
              <span>ที่จอดรถ</span>
            </div>
            <strong>{{ model.parking }}</strong>
          </div>
        </div>

        <div class="rounded-3xl bg-[#f6f6f7] p-5 text-sm leading-7 text-slate-600 sm:text-base">
          แบบนี้สามารถนำไปต่อยอดเป็นข้อมูลลึกเพิ่มเติมได้ เช่น แปลนบ้าน รายละเอียดวัสดุ ฟังก์ชันใช้งาน และรูปหลายมุมจากหน้าแอดมิน
        </div>

        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/"
            class="inline-flex items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            กลับหน้าแรก
          </NuxtLink>
        </div>
      </section>
    </div>

    <div v-else class="rounded-[28px] bg-white p-10 text-center shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <h1 class="title-font text-3xl font-bold text-[#111827]">ไม่พบรายละเอียดแบบนี้</h1>
      <p class="mt-3 text-slate-600">รายการที่คุณเปิดอาจถูกลบหรือยังไม่มีข้อมูล</p>
      <NuxtLink
        to="/"
        class="mt-6 inline-flex items-center rounded-full bg-[#8a2025] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#74171d]"
      >
        กลับหน้าแรก
      </NuxtLink>
    </div>
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

const defaultCards: DisplayCard[] = [
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

const route = useRoute()
const { list } = useHomeModels()

const typeParam = computed(() => String(route.params.type || ""))
const idParam = computed(() => String(route.params.id || ""))

const model = ref<DisplayCard | null>(null)

const sectionLabel = computed(() =>
  typeParam.value === "garage" ? "แบบโรงรถ หลังคา" : "แบบบ้านของเรา",
)

const fallbackDescription = computed(() =>
  typeParam.value === "garage" ? "รายละเอียดแบบโรงรถและหลังคา" : "รายละเอียดแบบบ้าน",
)

const normalizeCard = (item: HomeModelWithImages): DisplayCard => ({
  id: item.id,
  type: item.type,
  name: item.name || "-",
  description: item.description || "",
  area: String(item.area || "-"),
  bedroom: Number(item.bedroom) || 0,
  bathroom: Number(item.bathroom) || 0,
  parking: Number(item.parking) || 0,
  images: Array.isArray(item.images) && item.images.length
    ? item.images.map((image) => image.image_url)
    : ["/PERSPECTIVE-Julie-scaled.webp"],
})

const loadModel = async () => {
  try {
    const rows = await list()
    const found = rows.find((item) => item.type === typeParam.value && item.id === idParam.value)
    if (found) {
      model.value = normalizeCard(found)
      return
    }
  } catch {
  }

  const fallback = defaultCards.find((item) => item.type === typeParam.value && item.id === idParam.value) || null
  model.value = fallback
}

watchEffect(() => {
  if (model.value) {
    useHead({
      title: `${model.value.name} | TERM HUEAN`,
    })
  }
})

await loadModel()
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap");

.title-font {
  font-family: "Oswald", "Kanit", sans-serif;
}

.detail-chip {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border-radius: 1.25rem;
  background: #f6f6f7;
  padding: 1rem 1.1rem;
}

.detail-chip span {
  font-size: 0.8rem;
  font-weight: 700;
  color: #6b7280;
}

.detail-chip-label {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.detail-chip-label svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  color: #6b7280;
}

.detail-chip strong {
  font-family: "Oswald", "Kanit", sans-serif;
  font-size: 1.5rem;
  color: #111827;
}
</style>
