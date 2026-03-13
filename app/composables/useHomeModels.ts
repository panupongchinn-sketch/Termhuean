export type HomeModelType = "house" | "garage"

export type HomeModelImageRow = {
  id: string
  home_model_id: string
  image_url: string
  sort_order: number
  is_cover: boolean
  created_at?: string
}

export type HomeModelRow = {
  id: string
  type: HomeModelType
  name: string
  description: string | null
  area: string | number | null
  price: string | number | null
  bedroom: number
  bathroom: number
  parking: number
  sort_order: number
  created_at?: string
  updated_at?: string
}

export type HomeModelWithImages = HomeModelRow & {
  images: HomeModelImageRow[]
}

type CreateHomeModelInput = {
  type: HomeModelType
  name: string
  description: string
  area: string
  price: string
  bedroom: number
  bathroom: number
  parking: number
  sortOrder: number
  imageUrls: string[]
}

type UpdateHomeModelInput = {
  id: string
  type: HomeModelType
  name: string
  description: string
  area: string
  price: string
  bedroom: number
  bathroom: number
  parking: number
  sortOrder: number
  imageUrls?: string[]
}

export const useHomeModels = () => {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.supabaseUrl}/rest/v1`
  const apiKey = config.public.supabaseKey

  const request = async <T>(path: string, options: Parameters<typeof $fetch<T>>[1] = {}) => {
    return await $fetch<T>(`${baseUrl}${path}`, {
      ...options,
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    })
  }

  const withOptionalPrice = async <T>(withPrice: () => Promise<T>, withoutPrice: () => Promise<T>) => {
    try {
      return await withPrice()
    } catch (error: any) {
      const message = String(error?.data?.message || error?.message || "")
      if (!message.toLowerCase().includes("price")) {
        throw error
      }

      return await withoutPrice()
    }
  }

  const sortModels = (rows: HomeModelRow[]) =>
    rows.sort((a, b) => {
      if (a.type !== b.type) return a.type.localeCompare(b.type)
      if ((a.sort_order || 0) !== (b.sort_order || 0)) return (a.sort_order || 0) - (b.sort_order || 0)
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    })

  const sortImages = (rows: HomeModelImageRow[]) =>
    rows.sort((a, b) => {
      if (Number(b.is_cover) !== Number(a.is_cover)) return Number(b.is_cover) - Number(a.is_cover)
      if ((a.sort_order || 0) !== (b.sort_order || 0)) return (a.sort_order || 0) - (b.sort_order || 0)
      return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
    })

  const list = async (): Promise<HomeModelWithImages[]> => {
    const models = await withOptionalPrice(
      () =>
        request<HomeModelRow[]>(
          "/home_models?select=id,type,name,description,area,price,bedroom,bathroom,parking,sort_order,created_at,updated_at",
        ),
      async () => {
        const rows = await request<Array<Omit<HomeModelRow, "price">>>(
          "/home_models?select=id,type,name,description,area,bedroom,bathroom,parking,sort_order,created_at,updated_at",
        )

        return rows.map((row) => ({
          ...row,
          price: null,
        }))
      },
    )

    const images = await request<HomeModelImageRow[]>(
      "/home_model_images?select=id,home_model_id,image_url,sort_order,is_cover,created_at",
    )

    const sortedModels = sortModels(Array.isArray(models) ? models : [])
    const sortedImages = sortImages(Array.isArray(images) ? images : [])

    return sortedModels.map((model) => ({
      ...model,
      images: sortedImages.filter((image) => image.home_model_id === model.id),
    }))
  }

  const insertImages = async (homeModelId: string, imageUrls: string[]) => {
    const imageRows = imageUrls
      .filter(Boolean)
      .map((imageUrl, index) => ({
        home_model_id: homeModelId,
        image_url: imageUrl,
        sort_order: index,
        is_cover: index === 0,
      }))

    if (!imageRows.length) {
      return
    }

    await request("/home_model_images", {
      method: "POST",
      body: imageRows,
    })
  }

  const create = async (input: CreateHomeModelInput) => {
    const created = await withOptionalPrice(
      () =>
        request<HomeModelRow[]>("/home_models", {
          method: "POST",
          headers: {
            Prefer: "return=representation",
          },
          body: [
            {
              type: input.type,
              name: input.name,
              description: input.description || null,
              area: input.area || null,
              price: input.price || null,
              bedroom: input.bedroom,
              bathroom: input.bathroom,
              parking: input.parking,
              sort_order: input.sortOrder,
            },
          ],
        }),
      () =>
        request<HomeModelRow[]>("/home_models", {
          method: "POST",
          headers: {
            Prefer: "return=representation",
          },
          body: [
            {
              type: input.type,
              name: input.name,
              description: input.description || null,
              area: input.area || null,
              bedroom: input.bedroom,
              bathroom: input.bathroom,
              parking: input.parking,
              sort_order: input.sortOrder,
            },
          ],
        }),
    )

    const model = Array.isArray(created) ? created[0] : null
    if (!model?.id) {
      throw new Error("Create home model failed")
    }

    await insertImages(model.id, input.imageUrls)
    return model.id
  }

  const update = async (input: UpdateHomeModelInput) => {
    await withOptionalPrice(
      () =>
        request(`/home_models?id=eq.${input.id}`, {
          method: "PATCH",
          body: {
            type: input.type,
            name: input.name,
            description: input.description || null,
            area: input.area || null,
            price: input.price || null,
            bedroom: input.bedroom,
            bathroom: input.bathroom,
            parking: input.parking,
            sort_order: input.sortOrder,
          },
        }),
      () =>
        request(`/home_models?id=eq.${input.id}`, {
          method: "PATCH",
          body: {
            type: input.type,
            name: input.name,
            description: input.description || null,
            area: input.area || null,
            bedroom: input.bedroom,
            bathroom: input.bathroom,
            parking: input.parking,
            sort_order: input.sortOrder,
          },
        }),
    )

    if (!Array.isArray(input.imageUrls)) {
      return
    }

    await request(`/home_model_images?home_model_id=eq.${input.id}`, {
      method: "DELETE",
    })

    await insertImages(input.id, input.imageUrls)
  }

  const remove = async (id: string) => {
    await request(`/home_models?id=eq.${id}`, {
      method: "DELETE",
    })
  }

  return { list, create, update, remove }
}
