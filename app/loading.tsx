import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-10 w-64" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="bg-gray-200 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <Skeleton className="h-12 w-96" />
              <Skeleton className="h-6 w-80" />
            </div>
            <Skeleton className="h-12 w-24" />
          </div>
        </div>
      </div>

      {/* Featured Products Skeleton */}
      <div className="px-4 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-20" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="w-16 h-16 mx-auto mb-3 rounded-full" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
