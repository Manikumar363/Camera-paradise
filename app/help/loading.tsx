import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="space-y-2 mb-8">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Search FAQ Skeleton */}
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        {/* FAQ Section Skeleton */}
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-64" />
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {[...Array(3)].map((_, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <Skeleton className="h-6 w-full" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <Skeleton className="h-16 w-full" />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Options Skeleton */}
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Skeleton className="h-10 w-10 rounded-full mb-3" />
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-48 mb-3" />
                <Skeleton className="h-9 w-24" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit a Ticket Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
