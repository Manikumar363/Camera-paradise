// Basic geo utilities and a small ZIP -> center lookup

export type Coord = { lat: number; lng: number }
export type ZipCenter = Coord & { city: string; state: string }

const R_EARTH_MI = 3958.8
const toRad = (deg: number) => (deg * Math.PI) / 180

export function haversineMiles(a: Coord, b: Coord) {
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R_EARTH_MI * Math.asin(Math.sqrt(h))
}

const ZIP_TO_CENTER: Record<string, ZipCenter> = {
  "10001": { lat: 40.7505, lng: -73.9965, city: "New York", state: "NY" },
  "90001": { lat: 33.9731, lng: -118.2487, city: "Los Angeles", state: "CA" },
  "60601": { lat: 41.8864, lng: -87.6186, city: "Chicago", state: "IL" },
  "94105": { lat: 37.7898, lng: -122.3942, city: "San Francisco", state: "CA" },
  "98101": { lat: 47.6101, lng: -122.3344, city: "Seattle", state: "WA" },
}

export function getCenterForZip(zip: string): ZipCenter | null {
  const key = (zip || "").trim().slice(0, 5)
  return ZIP_TO_CENTER[key] ?? null
}
