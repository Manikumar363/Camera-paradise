import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar Skeleton */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <Skeleton className="h-10 w-full flex-1" />
          <div className="flex gap-2 w-full md:w-auto">
            <Skeleton className="h-10 w-full md:w-[180px]" />
            <Skeleton className="h-10 w-10 hidden sm:block" />
            <Skeleton className="h-10 w-full md:w-[100px]" />
          </div>
        </div>

        {/* Listings Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
              <Skeleton className="w-full h-48 rounded-t-lg" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-1 mt-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-9 w-9 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-9 w-9 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-9 w-9 rounded-md" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
