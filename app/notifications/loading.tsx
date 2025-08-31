import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList } from "@/components/ui/tabs"

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="space-y-2 mb-8">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Tabs Skeleton */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </TabsList>

          {/* Notification List Skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-start gap-4">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-2 w-2 rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
