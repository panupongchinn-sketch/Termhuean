<template>
  <div class="mx-auto max-w-6xl space-y-6 px-4 py-8 pb-24 sm:px-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:pr-2">
    <div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">จัดการแบบบ้าน / แบบโรงรถ</h1>
      <p class="mt-1 text-sm text-slate-600">เพิ่ม แก้ไข และลบรายการที่จะแสดงบนหน้าแรกในหมวดแบบบ้านของเรา และแบบโรงรถ หลังคา</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-12">
      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-5 lg:max-h-[calc(100vh-18rem)] lg:overflow-y-auto">
        <div class="border-b border-slate-100 p-5">
          <h2 class="text-base font-extrabold text-slate-900">{{ editingId ? "แก้ไขรายการ" : "เพิ่มรายการใหม่" }}</h2>
        </div>

        <form class="space-y-4 p-5" @submit.prevent="saveModel">
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-800">ประเภท *</label>
            <select
              v-model="form.type"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
            >
              <option value="house">แบบบ้านของเรา</option>
              <option value="garage">แบบโรงรถ หลังคา</option>
            </select>
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-800">ชื่อแบบ *</label>
            <input
              v-model.trim="form.name"
              type="text"
              required
              class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              placeholder="เช่น NEO หรือ โรงจอดรถโมเดิร์น"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-800">รายละเอียด</label>
            <textarea
              v-model.trim="form.description"
              rows="3"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              placeholder="คำอธิบายสั้น ๆ ของแบบ"
            ></textarea>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">พื้นที่</label>
              <input
                v-model.trim="form.area"
                type="text"
                class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
                placeholder="674.00"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">ราคา</label>
              <input
                v-model.trim="form.price"
                type="text"
                class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
                placeholder="2500000"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">ลำดับแสดงผล</label>
              <input
                v-model.number="form.sortOrder"
                type="number"
                min="0"
                class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">ห้องนอน</label>
              <input
                v-model.number="form.bedroom"
                type="number"
                min="0"
                class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">ห้องน้ำ</label>
              <input
                v-model.number="form.bathroom"
                type="number"
                min="0"
                class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">ที่จอดรถ</label>
              <input
                v-model.number="form.parking"
                type="number"
                min="0"
                class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">รูปภาพ</label>
            <input
              type="file"
              accept="image/*"
              multiple
              class="block w-full text-sm text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-800 hover:file:bg-slate-200"
              @change="onPickImages"
            />
            <p class="mt-2 text-xs text-slate-500">เลือกได้หลายรูป และไม่มีการบังคับขนาดไฟล์จากหน้าแอดมิน</p>

            <div v-if="form.imageDataUrls.length" class="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              <div
                v-for="(image, index) in form.imageDataUrls"
                :key="`${image}-${index}`"
                class="rounded-xl border border-slate-200 bg-slate-50 p-2"
              >
                <div class="flex h-20 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <img :src="image" :alt="`preview ${index + 1}`" class="h-full w-full object-cover" />
                </div>
                <div class="mt-2 flex items-center justify-between gap-2">
                  <span class="text-[11px] font-semibold text-slate-500">{{ index === 0 ? "รูปหลัก" : `รูปที่ ${index + 1}` }}</span>
                  <button
                    type="button"
                    class="rounded-lg border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                    @click="removeImage(index)"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="errorMsg" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ errorMsg }}
          </div>

          <div v-if="successMsg" class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {{ successMsg }}
          </div>

          <div class="flex items-center gap-2">
            <button
              type="submit"
              class="h-11 flex-1 rounded-xl bg-[#0B4AA2] px-5 text-sm font-semibold text-white hover:bg-[#083A7E]"
            >
              {{ editingId ? "บันทึกการแก้ไข" : "เพิ่มรายการ" }}
            </button>
            <button
              type="button"
              class="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold hover:bg-slate-50"
              @click="resetForm"
            >
              ล้างฟอร์ม
            </button>
          </div>
        </form>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-7 lg:max-h-[calc(100vh-18rem)] lg:overflow-y-auto">
        <div class="flex items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div>
            <h2 class="text-base font-extrabold text-slate-900">รายการทั้งหมด</h2>
            <p class="mt-1 text-sm text-slate-600">ทั้งหมด {{ models.length }} รายการ</p>
          </div>
          <button
            type="button"
            class="h-10 rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            @click="loadModels"
          >
            Refresh
          </button>
        </div>

        <div class="space-y-5 p-5">
          <div v-if="loading" class="text-sm text-slate-500">กำลังโหลด...</div>
          <div v-else-if="!models.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ยังไม่มีรายการ
          </div>

          <template v-else>
            <div v-for="section in sections" :key="section.type" class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-extrabold text-slate-900">{{ section.label }}</h3>
                <span class="text-xs text-slate-500">{{ groupedModels[section.type].length }} รายการ</span>
              </div>

              <div v-if="!groupedModels[section.type].length" class="rounded-xl border border-dashed border-slate-200 px-4 py-3 text-sm text-slate-500">
                ยังไม่มีข้อมูลในหมวดนี้
              </div>

              <div v-for="item in groupedModels[section.type]" :key="item.id" class="rounded-xl border border-slate-200 p-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex min-w-0 gap-4">
                    <div class="min-w-0">
                      <div v-if="item.images.length" class="mb-3 flex flex-wrap gap-2">
                        <div
                          v-for="(image, imageIndex) in item.images"
                          :key="image.id"
                          class="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                        >
                          <img
                            :src="image.image_url"
                            :alt="`${item.name} ${imageIndex + 1}`"
                            class="h-full w-full object-cover"
                          />
                        </div>
                      </div>

                      <div v-else class="mb-3 flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                        <span class="px-2 text-center text-xs text-slate-400">ไม่มีรูป</span>
                      </div>

                      <div class="font-semibold text-slate-900">{{ item.name }}</div>
                      <p class="mt-1 text-sm text-slate-600">{{ item.description || "-" }}</p>
                      <div class="mt-2 text-xs text-slate-500">
                        พื้นที่ {{ item.area || "-" }} ตร.ม. | ห้องนอน {{ item.bedroom }} | ห้องน้ำ {{ item.bathroom }} | ที่จอดรถ {{ item.parking }}
                      </div>
                      <div class="mt-1 text-xs text-slate-500">ราคา {{ item.price || "-" }}</div>
                      <div class="mt-1 text-xs text-slate-500">รูปทั้งหมด {{ item.images.length }} รูป</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      class="h-9 rounded-lg border border-sky-300 bg-sky-50 px-3 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                      @click="editModel(item)"
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      class="h-9 rounded-lg border border-red-300 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100"
                      @click="deleteModel(item.id)"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HomeModelType, HomeModelWithImages } from "~/composables/useHomeModels"

useHead({ title: "Admin | Home Models" })

const sections: Array<{ type: HomeModelType; label: string }> = [
  { type: "house", label: "แบบบ้านของเรา" },
  { type: "garage", label: "แบบโรงรถ หลังคา" },
]

const { list, create, update, remove } = useHomeModels()

const models = ref<HomeModelWithImages[]>([])
const loading = ref(false)
const errorMsg = ref("")
const successMsg = ref("")
const editingId = ref("")

const form = reactive({
  type: "house" as HomeModelType,
  name: "",
  description: "",
  area: "",
  price: "",
  bedroom: 0,
  bathroom: 0,
  parking: 0,
  sortOrder: 0,
  imageDataUrls: [] as string[],
})

const groupedModels = computed(() => ({
  house: models.value.filter((item) => item.type === "house"),
  garage: models.value.filter((item) => item.type === "garage"),
}))

const coverImage = (item: HomeModelWithImages) => item.images.find((image) => image.is_cover)?.image_url || item.images[0]?.image_url || ""

const resetForm = () => {
  editingId.value = ""
  form.type = "house"
  form.name = ""
  form.description = ""
  form.area = ""
  form.price = ""
  form.bedroom = 0
  form.bathroom = 0
  form.parking = 0
  form.sortOrder = 0
  form.imageDataUrls = []
  errorMsg.value = ""
  successMsg.value = ""
}

const removeImage = (index: number) => {
  form.imageDataUrls = form.imageDataUrls.filter((_, imageIndex) => imageIndex !== index)
}

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ""))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const onPickImages = async (e: Event) => {
  const input = e.target as HTMLInputElement | null
  const files = Array.from(input?.files || [])
  if (!files.length) return

  const imageUrls = await Promise.all(files.map((file) => fileToDataUrl(file)))
  form.imageDataUrls = [...form.imageDataUrls, ...imageUrls]

  if (input) {
    input.value = ""
  }
}

const loadModels = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    models.value = await list()
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.message || "โหลดรายการไม่สำเร็จ"
    models.value = []
  } finally {
    loading.value = false
  }
}

const editModel = (item: HomeModelWithImages) => {
  editingId.value = item.id
  form.type = item.type
  form.name = item.name || ""
  form.description = item.description || ""
  form.area = item.area ? String(item.area) : ""
  form.price = item.price ? String(item.price) : ""
  form.bedroom = Number(item.bedroom) || 0
  form.bathroom = Number(item.bathroom) || 0
  form.parking = Number(item.parking) || 0
  form.sortOrder = Number(item.sort_order) || 0
  form.imageDataUrls = item.images.map((image) => image.image_url)
  errorMsg.value = ""
  successMsg.value = ""
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const saveModel = async () => {
  errorMsg.value = ""
  successMsg.value = ""

  const name = form.name.trim()
  if (!name) {
    errorMsg.value = "กรุณากรอกชื่อแบบ"
    return
  }

  if (!editingId.value && !form.imageDataUrls.length) {
    errorMsg.value = "กรุณาอัปโหลดรูปภาพอย่างน้อย 1 รูป"
    return
  }

  try {
    if (editingId.value) {
      await update({
        id: editingId.value,
        type: form.type,
        name,
        description: form.description.trim(),
        area: form.area.trim(),
        price: form.price.trim(),
        bedroom: Number(form.bedroom) || 0,
        bathroom: Number(form.bathroom) || 0,
        parking: Number(form.parking) || 0,
        sortOrder: Number(form.sortOrder) || 0,
        imageUrls: [...form.imageDataUrls],
      })

      successMsg.value = "แก้ไขรายการสำเร็จ"
    } else {
      await create({
        type: form.type,
        name,
        description: form.description.trim(),
        area: form.area.trim(),
        price: form.price.trim(),
        bedroom: Number(form.bedroom) || 0,
        bathroom: Number(form.bathroom) || 0,
        parking: Number(form.parking) || 0,
        sortOrder: Number(form.sortOrder) || 0,
        imageUrls: [...form.imageDataUrls],
      })

      successMsg.value = "เพิ่มรายการสำเร็จ"
    }

    resetForm()
    await loadModels()
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.message || (editingId.value ? "แก้ไขรายการไม่สำเร็จ" : "เพิ่มรายการไม่สำเร็จ")
  }
}

const deleteModel = async (id: string) => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!window.confirm("ลบรายการนี้ใช่ไหม?")) return

  try {
    await remove(id)
    if (editingId.value === id) {
      resetForm()
    }
    successMsg.value = "ลบรายการแล้ว"
    await loadModels()
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.message || "ลบรายการไม่สำเร็จ"
  }
}

onMounted(loadModels)
</script>
