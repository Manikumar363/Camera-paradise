"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, LineChart, DollarSign, Eye, CalendarDays, Star, TrendingUp } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Bar, Line, BarChart } from "recharts"

export default function OwnerAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30d")

  // Mock data for charts
  const revenueData = [
    { name: "Jan", total: 400, avg: 300 },
    { name: "Feb", total: 300, avg: 280 },
    { name: "Mar", total: 500, avg: 450 },
    { name: "Apr", total: 450, avg: 400 },
    { name: "May", total: 600, avg: 550 },
    { name: "Jun", total: 700, avg: 650 },
  ]

  const viewsData = [
    { name: "Week 1", views: 120, clicks: 80 },
    { name: "Week 2", views: 150, clicks: 100 },
    { name: "Week 3", views: 130, clicks: 90 },
    { name: "Week 4", views: 180, clicks: 120 },
  ]

  const bookingConversionData = [
    { name: "Canon R5", conversion: 0.08 },
    { name: "Sony A7 III", conversion: 0.07 },
    { name: "DJI Ronin-S", conversion: 0.05 },
    { name: "Nikon D850", conversion: 0.06 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-gray-600">Gain insights into your listings and earnings</p>
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,500</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 new bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Based on 73 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" /> Earnings Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  total: {
                    label: "Total Earnings",
                    color: "hsl(var(--chart-1))",
                  },
                  avg: {
                    label: "Average Earnings",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="var(--color-total)" name="Total Earnings" />
                    <Line type="monotone" dataKey="avg" stroke="var(--color-avg)" name="Average Earnings" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" /> Listing Views & Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  views: {
                    label: "Views",
                    color: "hsl(var(--chart-1))",
                  },
                  clicks: {
                    label: "Clicks",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="views" fill="var(--color-views)" name="Views" />
                    <Bar dataKey="clicks" fill="var(--color-clicks)" name="Clicks" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Listings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> Top Performing Listings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingConversionData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-blue-600 font-semibold">{(item.conversion * 100).toFixed(1)}% Conversion</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Other Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rental Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center text-gray-500">
                Rental trends chart (e.g., peak seasons) would be displayed here.
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center text-gray-500">
                Customer demographics data would be displayed here.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
