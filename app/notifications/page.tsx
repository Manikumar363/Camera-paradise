"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, MessageCircle, DollarSign, Star, Settings, AlertCircle } from "lucide-react"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: "booking",
      message: "New booking request for Canon EOS R5 from Sarah Johnson.",
      time: "2 hours ago",
      read: false,
      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 2,
      type: "message",
      message: "You have a new message from Mike Rodriguez.",
      time: "5 hours ago",
      read: false,
      icon: <MessageCircle className="h-5 w-5 text-green-500" />,
    },
    {
      id: 3,
      type: "payment",
      message: "Payment for Sony A7 III rental (ID: BK002) has been processed.",
      time: "Yesterday",
      read: true,
      icon: <DollarSign className="h-5 w-5 text-purple-500" />,
    },
    {
      id: 4,
      type: "review",
      message: "Emily Chen left a 5-star review on your Canon EOS R5 listing.",
      time: "2 days ago",
      read: false,
      icon: <Star className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: 5,
      type: "system",
      message: "Platform update: New features have been rolled out!",
      time: "3 days ago",
      read: true,
      icon: <AlertCircle className="h-5 w-5 text-gray-500" />,
    },
    {
      id: 6,
      type: "booking",
      message: "Your booking for DJI Ronin-S has been confirmed.",
      time: "4 days ago",
      read: true,
      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,
    },
  ]

  const notificationSettings = {
    email: {
      bookingRequests: true,
      newMessages: true,
      paymentUpdates: true,
      newReviews: true,
      systemUpdates: false,
      marketing: false,
      frequency: "instant",
    },
    inApp: {
      bookingRequests: true,
      newMessages: true,
      paymentUpdates: true,
      newReviews: true,
      systemUpdates: true,
    },
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notif.read
    return notif.type === activeTab
  })

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case "booking":
        return "Booking"
      case "message":
        return "Message"
      case "payment":
        return "Payment"
      case "review":
        return "Review"
      case "system":
        return "System"
      default:
        return "General"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <p className="text-gray-600 mb-8">Stay updated on your rentals, messages, and platform activity.</p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* All, Unread, Booking, Message, Payment Tabs */}
          {(["all", "unread", "booking", "message", "payment", "review", "system"] as const).map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <Card
                    key={notif.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      !notif.read ? "border-blue-200 bg-blue-50/50" : ""
                    }`}
                  >
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="flex-shrink-0">{notif.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-medium ${!notif.read ? "font-semibold" : ""}`}>
                            {getNotificationTypeLabel(notif.type)}
                          </h3>
                          <span className="text-sm text-gray-500">{notif.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{notif.message}</p>
                      </div>
                      {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    <p>No notifications found for this category.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-bookings">New Booking Requests</Label>
                  <Switch id="email-bookings" defaultChecked={notificationSettings.email.bookingRequests} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-messages">New Messages</Label>
                  <Switch id="email-messages" defaultChecked={notificationSettings.email.newMessages} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-payments">Payment Updates</Label>
                  <Switch id="email-payments" defaultChecked={notificationSettings.email.paymentUpdates} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-reviews">New Reviews</Label>
                  <Switch id="email-reviews" defaultChecked={notificationSettings.email.newReviews} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-system">System Announcements</Label>
                  <Switch id="email-system" defaultChecked={notificationSettings.email.systemUpdates} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-marketing">Marketing Updates</Label>
                  <Switch id="email-marketing" defaultChecked={notificationSettings.email.marketing} />
                </div>
                <div>
                  <Label htmlFor="email-frequency">Email Frequency</Label>
                  <Select defaultValue={notificationSettings.email.frequency}>
                    <SelectTrigger id="email-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant (as they happen)</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                      <SelectItem value="none">No Email Notifications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Email Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In-App Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-bookings">New Booking Requests</Label>
                  <Switch id="inapp-bookings" defaultChecked={notificationSettings.inApp.bookingRequests} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-messages">New Messages</Label>
                  <Switch id="inapp-messages" defaultChecked={notificationSettings.inApp.newMessages} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-payments">Payment Confirmations</Label>
                  <Switch id="inapp-payments" defaultChecked={notificationSettings.inApp.paymentUpdates} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-reviews">New Reviews</Label>
                  <Switch id="inapp-reviews" defaultChecked={notificationSettings.inApp.newReviews} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-system">System Announcements</Label>
                  <Switch id="inapp-system" defaultChecked={notificationSettings.inApp.systemUpdates} />
                </div>
                <Button>Save In-App Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
