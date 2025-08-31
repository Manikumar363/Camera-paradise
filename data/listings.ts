export interface Listing {
  id: number
  title: string
  subtitle: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  location: string
  images: string[]
  description: string
  specifications: Record<string, string>
  included: string[]
  owner: {
    name: string
    avatar: string
    rating: number
    reviews: number
    verified: boolean
    responseTime: string
    joinedDate: string
  }
  availability: { available: boolean; nextAvailable: string }
  policies: {
    deposit: string
    insurance: string
    pickup: string
    cancellation: string
  }
  badge?: string
  category?: string
}

export const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Red Komodo 6K Cinema Camera",
    subtitle: "Professional Cinema Camera with Full Kit",
    price: 450,
    originalPrice: 500,
    rating: 4.8,
    reviews: 24,
    location: "New York, NY",
    images: [
      "/red-komodo.png",
      "/placeholder.svg?height=400&width=600&text=Komodo+Side",
      "/placeholder.svg?height=400&width=600&text=Komodo+Back",
      "/placeholder.svg?height=400&width=600&text=Komodo+Kit",
    ],
    description:
      "Professional RED Komodo 6K cinema camera perfect for high-end productions. Global shutter, compact form factor and superb color science.",
    specifications: {
      Sensor: "6K S35 Global Shutter CMOS",
      Resolution: "6144 x 3240",
      "Frame Rates": "40fps 6K, 60fps 4K",
      "Dynamic Range": "16+ stops",
      Recording: "REDCODE RAW / ProRes",
      Mount: "RF Mount",
      Weight: "2.1 lbs (body)",
    },
    included: [
      "Camera Body",
      "RF 24-70mm Lens",
      "2x 256GB CFexpress",
      "4x V-Mount Batteries",
      "Dual Charger",
      "Top Handle / Cage",
      "7” Monitor",
      "Follow Focus",
      "Tripod",
      "Hard Case",
    ],
    owner: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=60&width=60&text=JS",
      rating: 4.9,
      reviews: 156,
      verified: true,
      responseTime: "Usually responds within 1 hour",
      joinedDate: "Member since 2020",
    },
    availability: { available: true, nextAvailable: "Available now" },
    policies: {
      deposit: "$2000 security deposit required",
      insurance: "Renter's insurance required",
      pickup: "Pickup only - no delivery",
      cancellation: "Free cancellation up to 24h before pickup",
    },
    badge: "Popular",
    category: "Cinema Cameras",
  },
  {
    id: 2,
    title: "DJI Air 2S Drone",
    subtitle: "Drone with 1\" 5.4K Sensor",
    price: 85,
    originalPrice: 110,
    rating: 4.7,
    reviews: 128,
    location: "New York, NY",
    images: [
      "/dji-air-2s.png",
      "/placeholder.svg?height=400&width=600&text=Air+2S+Top",
      "/placeholder.svg?height=400&width=600&text=Air+2S+Case",
      "/placeholder.svg?height=400&width=600&text=Air+2S+Accessories",
    ],
    description:
      "Compact DJI Air 2S with 1-inch sensor delivering 5.4K video and excellent low-light performance. Great for aerial establishing shots.",
    specifications: {
      Sensor: "1\" CMOS",
      Video: "5.4K up to 30fps",
      Photo: "20 MP",
      Range: "12 km (OcuSync 3.0)",
      "Flight Time": "31 minutes",
      Weight: "595 g",
      Formats: "H.264 / H.265",
    },
    included: [
      "Drone & Gimbal Protector",
      "RC-N1 Controller",
      "3x Intelligent Flight Batteries",
      "ND Filter Set",
      "Charging Hub",
      "64GB microSD",
      "Propellers (3 sets)",
      "Car Charger",
      "Carrying Case",
    ],
    owner: {
      name: "Alicia Gomez",
      avatar: "/placeholder.svg?height=60&width=60&text=AG",
      rating: 4.8,
      reviews: 98,
      verified: true,
      responseTime: "Responds within 2 hours",
      joinedDate: "Member since 2021",
    },
    availability: { available: true, nextAvailable: "Available now" },
    policies: {
      deposit: "$600 refundable deposit",
      insurance: "Proof of liability insurance for commercial use",
      pickup: "Pickup or insured courier",
      cancellation: "48h free cancellation",
    },
    badge: "New",
    category: "Drones",
  },
  {
    id: 3,
    title: "DJI RS3 Pro Gimbal",
    subtitle: "3-Axis Professional Stabilizer",
    price: 65,
    originalPrice: 90,
    rating: 4.9,
    reviews: 64,
    location: "New York, NY",
    images: [
      "/dji-rs3-pro.png",
      "/placeholder.svg?height=400&width=600&text=RS3+Folded",
      "/placeholder.svg?height=400&width=600&text=RS3+Arm",
      "/placeholder.svg?height=400&width=600&text=RS3+Kit",
    ],
    description:
      "DJI RS3 Pro provides excellent stabilization for mid‑weight cinema and mirrorless rigs. Includes focus motor and extended grip.",
    specifications: {
      Payload: "Up to 4.5 kg",
      Battery: "Up to 12h",
      "Charging Time": "Approx 2.5h (18W)",
      "Bluetooth Shutter": "Yes",
      "Focus Motor": "Included",
      Weight: "1.5 kg (w/ battery)",
    },
    included: [
      "RS3 Pro Gimbal",
      "BG30 Battery Grip",
      "Quick Release Plates",
      "Focus Motor + Rod",
      "Extended Grip / Tripod",
      "Carrying Case",
      "Cables Kit",
      "Lens Support",
      "Multi-Camera Control Cables",
    ],
    owner: {
      name: "Marcus Lee",
      avatar: "/placeholder.svg?height=60&width=60&text=ML",
      rating: 5.0,
      reviews: 54,
      verified: false,
      responseTime: "Responds within 3 hours",
      joinedDate: "Member since 2022",
    },
    availability: { available: true, nextAvailable: "Available now" },
    policies: {
      deposit: "$300 deposit",
      insurance: "Optional",
      pickup: "Pickup only",
      cancellation: "Free 24h prior",
    },
    badge: "Featured",
    category: "Gimbals",
  },
  {
    id: 4,
    title: "Canon EOS R5 Mirrorless Camera",
    subtitle: "8K Full Frame Mirrorless Body",
    price: 120,
    originalPrice: 150,
    rating: 4.8,
    reviews: 145,
    location: "New York, NY",
    images: [
      "/canon-r5.png",
      "/placeholder.svg?height=400&width=600&text=R5+Back",
      "/placeholder.svg?height=400&width=600&text=R5+Top",
      "/placeholder.svg?height=400&width=600&text=R5+Kit",
    ],
    description:
      "Canon EOS R5 delivers 8K RAW internal, superb autofocus, and high-resolution stills. Ideal hybrid body for video and photography.",
    specifications: {
      Sensor: "45 MP Full Frame CMOS",
      Video: "8K RAW / 4K 120p",
      "Image Stabilization": "In-Body 8 stops",
      Mount: "RF Mount",
      "Card Slots": "CFexpress + SD UHS-II",
      Weight: "738 g (w/ battery)",
    },
    included: [
      "EOS R5 Body",
      "2x CFexpress 256GB",
      "2x SDXC 128GB",
      "4x LP-E6NH Batteries",
      "Dual Charger",
      "Cage",
      "Top Handle",
      "USB-C Cable",
      "Camera Strap",
      "Hard Case",
    ],
    owner: {
      name: "Dana Price",
      avatar: "/placeholder.svg?height=60&width=60&text=DP",
      rating: 4.85,
      reviews: 210,
      verified: true,
      responseTime: "Responds within 30 minutes",
      joinedDate: "Member since 2019",
    },
    availability: { available: true, nextAvailable: "Available now" },
    policies: {
      deposit: "$1000 hold on card",
      insurance: "Required for multi‑day",
      pickup: "Pickup or insured shipping",
      cancellation: "Free 48h prior",
    },
    badge: "Trending",
    category: "Cameras",
  },
  {
    id: 5,
    title: "ARRIFLEX PRO Cinema Camera",
    subtitle: "Professional Camera Package",
    price: 380,
    originalPrice: 420,
    rating: 4.9,
    reviews: 156,
    location: "Los Angeles, CA",
    images: [
      "/arriflex-pro.png",
      "/placeholder.svg?height=400&width=600&text=ARRIFLEX+Side",
      "/placeholder.svg?height=400&width=600&text=ARRIFLEX+Back",
      "/placeholder.svg?height=400&width=600&text=ARRIFLEX+Kit",
    ],
    description:
      "High‑end ARRIFLEX PRO cinema package suited for narrative and commercial productions. Reliable workflow and superb image quality.",
    specifications: {
      Sensor: "Super 35 CMOS",
      Resolution: "4.5K RAW",
      "Frame Rates": "Up to 120fps",
      Mount: "PL Mount",
      "Dynamic Range": "14+ stops",
      Power: "Gold Mount",
    },
    included: [
      "Camera Body",
      "PL 24-70mm Lens",
      "3x 512GB Media",
      "6x Batteries + Charger",
      "EVF & 7” Monitor",
      "Baseplate / Rails",
      "Follow Focus",
      "Matte Box",
      "Hard Case",
    ],
    owner: {
      name: "Cine Rentals LA",
      avatar: "/placeholder.svg?height=60&width=60&text=CR",
      rating: 4.9,
      reviews: 320,
      verified: true,
      responseTime: "Responds within 1 hour",
      joinedDate: "Member since 2018",
    },
    availability: { available: true, nextAvailable: "Available now" },
    policies: {
      deposit: "$2500 security deposit",
      insurance: "Production insurance required",
      pickup: "Pickup only (Los Angeles)",
      cancellation: "Free 48h prior",
    },
    badge: "Featured",
    category: "Cinema Cameras",
  },
  {
    id: 6,
    title: "Sony FX3 Full Frame Cinema Camera",
    subtitle: "Full Frame Compact Cinema Body",
    price: 285,
    originalPrice: 320,
    rating: 4.7,
    reviews: 89,
    location: "Chicago, IL",
    images: [
      "/sony-fx3.png",
      "/placeholder.svg?height=400&width=600&text=FX3+Rear",
      "/placeholder.svg?height=400&width=600&text=FX3+Top",
      "/placeholder.svg?height=400&width=600&text=FX3+Rig",
    ],
    description:
      "Sony FX3 combines full‑frame cinematic imagery with a compact body ideal for gimbal or handheld work. Excellent low‑light and autofocus.",
    specifications: {
      Sensor: "Full Frame Exmor R",
      Resolution: "4K DCI / UHD",
      "Frame Rates": "Up to 120fps 4K",
      "Dynamic Range": "15+ stops",
      Mount: "E Mount",
      Media: "CFexpress Type A / SD",
    },
    included: [
      "FX3 Body",
      "Top Handle (XLR)",
      "2x 160GB CFexpress A",
      "4x Batteries",
      "Dual Charger",
      "Cage",
      "64GB SD (backup)",
      "Carrying Case",
    ],
    owner: {
      name: "Windy City Gear",
      avatar: "/placeholder.svg?height=60&width=60&text=WC",
      rating: 4.8,
      reviews: 140,
      verified: true,
      responseTime: "Responds within 2 hours",
      joinedDate: "Member since 2021",
    },
    availability: { available: true, nextAvailable: "Available now" },
    policies: {
      deposit: "$800 deposit",
      insurance: "Recommended for multi‑day",
      pickup: "Pickup or insured courier",
      cancellation: "Free 24h prior",
    },
    badge: "Popular",
    category: "Cinema Cameras",
  },
  {
    id: 7,
    title: "DJI Phantom Professional Drone",
    subtitle: "Stabilized 4K Aerial Platform",
    price: 165,
    originalPrice: 200,
    rating: 4.6,
    reviews: 203,
    location: "Miami, FL",
    images: [
      "/dji-phantom.png",
      "/placeholder.svg?height=400&width=600&text=Phantom+Case",
      "/placeholder.svg?height=400&width=600&text=Phantom+Accessories",
      "/placeholder.svg?height=400&width=600&text=Phantom+Battery+Set",
    ],
    description:
      "Reliable DJI Phantom drone package for establishing aerial shots and smooth 4K footage. Includes extra batteries and ND filters.",
    specifications: {
      Sensor: "1\" CMOS",
      Video: "4K up to 60p",
      Photo: "20 MP RAW",
      Range: "10 km",
      "Flight Time": "28 min per battery",
      Weight: "≈ 1.4 kg",
    },
    included: [
      "Drone & Gimbal",
      "Remote Controller",
      "4x Flight Batteries",
      "ND Filter Set",
      "Charging Hub",
      "Propellers (spares)",
      "64GB microSD",
      "Hard Case",
    ],
    owner: {
      name: "Aerial Hub Miami",
      avatar: "/placeholder.svg?height=60&width=60&text=AH",
      rating: 4.7,
      reviews: 220,
      verified: true,
      responseTime: "Responds within 1 hour",
      joinedDate: "Member since 2019",
    },
    availability: { available: true, nextAvailable: "Available now" },
    policies: {
      deposit: "$500 deposit",
      insurance: "Required for commercial flights",
      pickup: "Pickup only",
      cancellation: "Free 24h prior",
    },
    badge: "Trending",
    category: "Drones",
  },
]

export function getListing(id: string | number) {
  const num = typeof id === "string" ? parseInt(id, 10) : id
  return LISTINGS.find(l => l.id === num)
}