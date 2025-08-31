"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { InventoryItem } from "@/data/inventory"

type Props = {
  item: InventoryItem
  className?: string
}

export default function VendorItemCard({ item, className }: Props) {
  return (
    <Card className={cn("group overflow-hidden", className)}>
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={item.image || "/placeholder.svg?height=240&width=360&query=gear%20image"}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-base line-clamp-1">{item.name}</CardTitle>
        <div className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {item.brand ? `${item.brand} • ` : ""}
          {item.category}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-semibold">${item.pricePerDay}/day</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Rent now
          </Button>
          <Button variant="ghost" size="icon" aria-label="Save">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
