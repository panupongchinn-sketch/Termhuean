import type { HomeModelType } from "~/composables/useHomeModels"

export type DisplayCard = {
  id: string
  type: HomeModelType
  name: string
  description: string
  area: string
  bedroom: number
  bathroom: number
  parking: number
  images: string[]
}

export const defaultHouseCards: DisplayCard[] = [
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

export const defaultGarageCards: DisplayCard[] = [
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

export const defaultAllCards = [...defaultHouseCards, ...defaultGarageCards]

export const findDefaultCard = (type: string, id: string) =>
  defaultAllCards.find((item) => item.type === type && item.id === id) || null
