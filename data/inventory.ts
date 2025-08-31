import type { Vendor } from "./vendors"

export const CATEGORIES = [
  "Cinema Cameras",
  "Cameras",
  "Lenses",
  "Lighting",
  "Gimbals",
  "Audio",
  "Accessories",
  "Drones",
  "Stands",
] as const
export type Category = (typeof CATEGORIES)[number]

export type InventoryItem = {
  id: string
  name: string
  brand?: string
  category: Category
  image?: string
  pricePerDay: number
  vendorId: Vendor["id"]
}

export const INVENTORY: InventoryItem[] = [
  {
    id: "red-komodo-ny",
    name: "RED Komodo 6K",
    brand: "RED",
    category: "Cinema Cameras",
    pricePerDay: 450,
    image: "/placeholder-6nu8k.png",
    vendorId: "gotham",
  },
  {
    id: "sony-fx3-ny",
    name: "Sony FX3",
    brand: "Sony",
    category: "Cinema Cameras",
    pricePerDay: 285,
    image: "/sony-fx3.png",
    vendorId: "panavision-ny",
  },
  {
    id: "sigma-18-35",
    name: "Sigma 18-35mm f/1.8",
    brand: "Sigma",
    category: "Lenses",
    pricePerDay: 45,
    image: "/sigma-18-35.png",
    vendorId: "gotham",
  },
  {
    id: "aputure-120d",
    name: "Aputure 120d II",
    brand: "Aputure",
    category: "Lighting",
    pricePerDay: 35,
    image: "/aputure-120d.png",
    vendorId: "panavision-ny",
  },
  {
    id: "dji-rs3-pro",
    name: "DJI RS3 Pro",
    brand: "DJI",
    category: "Gimbals",
    pricePerDay: 65,
    image: "/dji-rs3-pro.png",
    vendorId: "brooklyn-gear",
  },
  {
    id: "zoom-h6",
    name: "Zoom H6 Recorder",
    brand: "Zoom",
    category: "Audio",
    pricePerDay: 25,
    image: "/zoom-h6.png",
    vendorId: "gotham",
  },
  {
    id: "dji-air-2s",
    name: "DJI Air 2S",
    brand: "DJI",
    category: "Drones",
    pricePerDay: 85,
    image: "/dji-air-2s.png",
    vendorId: "brooklyn-gear",
  },
  {
    id: "la-komodo",
    name: "RED Komodo 6K (LA)",
    brand: "RED",
    category: "Cinema Cameras",
    pricePerDay: 430,
    image: "/placeholder-f4x3h.png",
    vendorId: "la-fox",
  },
]
