import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          {/* Chat List Sidebar Skeleton */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <Skeleton className="h-10 w-full" />
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                  <Skeleton className="h-3 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Window Skeleton */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                  <Skeleton className="h-16 w-[70%] rounded-lg" />
                </div>
              ))}
            </div>
            <div className="p-4">
              <div className="flex w-full items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="flex-1 h-10 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
