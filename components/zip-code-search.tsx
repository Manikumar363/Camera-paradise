"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type Props = {
  placeholder?: string
  buttonText?: string
  className?: string
}

function ZipCodeSearch({
  placeholder = "Enter ZIP (e.g., 10001)",
  buttonText = "Find Vendors",
  className = "",
}: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [zip, setZip] = useState("")

  // If a zip is present in the URL (e.g., from /nearby), hydrate the input
  useEffect(() => {
    const z = params.get("zip")
    if (z) setZip(z)
  }, [params])

  function submit() {
    const z = (zip || "").trim()
    if (!/^\d{5}(-\d{4})?$/.test(z)) {
      // no-op if invalid
      return
    }
    router.push(`/nearby?zip=${encodeURIComponent(z)}`)
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 md:text-muted-foreground" />
        <Input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit()
          }}
          placeholder={placeholder}
          className="pl-10 bg-white/15 text-white placeholder:text-white/70 border-white/30 focus:border-white focus:ring-white md:bg-background md:text-foreground md:placeholder:text-muted-foreground md:border-input"
          aria-label="ZIP code"
        />
      </div>
      <Button
        onClick={submit}
        className="bg-gray-900 hover:bg-gray-800 text-white md:bg-primary md:hover:bg-primary/90"
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default ZipCodeSearch
export { ZipCodeSearch }
