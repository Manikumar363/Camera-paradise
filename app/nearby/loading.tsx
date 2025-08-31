import { Card, CardContent } from "@/components/ui/card"

export default function LoadingNearby() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="hidden lg:block lg:col-span-3">
          <Card className="animate-pulse">
            <CardContent className="p-6 space-y-3">
              <div className="h-4 w-40 bg-muted rounded" />
              <div className="h-10 w-full bg-muted rounded" />
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-24 w-full bg-muted rounded" />
            </CardContent>
          </Card>
        </aside>
        <section className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="aspect-[16/10] w-full bg-muted" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}
