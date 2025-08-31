"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { User, Lock, Bell, Shield, CreditCard, Upload, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <p className="text-gray-600 mb-8">Manage your profile, security, notifications, and preferences.</p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="mr-2 h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="mr-2 h-4 w-4" /> Privacy
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="mr-2 h-4 w-4" /> Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile Picture" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="profile-image-upload"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="profile-image-upload">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" /> Change Photo
                        </span>
                      </Button>
                    </label>
                    <Button
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => setProfileImage("/placeholder.svg?height=100&width=100")}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remove Photo
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" defaultValue="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="john.doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Passionate photographer and videographer based in New York."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="New York, NY" />
                </div>
                <Button>Save Profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-owner">Register as Equipment Owner</Label>
                  <Switch id="is-owner" defaultChecked />
                </div>
                <p className="text-sm text-gray-600">
                  If enabled, you can list your camera equipment for rent on the platform.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="2fa-status">Enable 2FA</Label>
                  <Switch id="2fa-status" />
                </div>
                <p className="text-sm text-gray-600">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">Setup 2FA</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Recent login activity would be displayed here (e.g., device, location, time).
                </p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-bookings">New Booking Requests</Label>
                  <Switch id="email-bookings" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-messages">New Messages</Label>
                  <Switch id="email-messages" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-payments">Payment Confirmations</Label>
                  <Switch id="email-payments" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-reviews">New Reviews</Label>
                  <Switch id="email-reviews" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-system">System Announcements</Label>
                  <Switch id="email-system" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-marketing">Marketing Updates</Label>
                  <Switch id="email-marketing" />
                </div>
                <div>
                  <Label htmlFor="email-frequency">Email Frequency</Label>
                  <Select defaultValue="instant">
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
                  <Switch id="inapp-bookings" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-messages">New Messages</Label>
                  <Switch id="inapp-messages" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-payments">Payment Confirmations</Label>
                  <Switch id="inapp-payments" defaultChecked />
                </div>
                <Button>Save In-App Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-public">Make my profile public</Label>
                  <Switch id="profile-public" defaultChecked />
                </div>
                <p className="text-sm text-gray-600">
                  If disabled, your profile will only be visible to users you interact with.
                </p>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-email">Show my email address on profile</Label>
                  <Switch id="show-email" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-phone">Show my phone number on profile</Label>
                  <Switch id="show-phone" />
                </div>
                <Button>Save Privacy Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  You can request a copy of your data or request account deletion.
                </p>
                <Button variant="outline">Request My Data</Button>
                <Button variant="destructive" className="ml-2">
                  Request Account Deletion
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-500">Your saved payment methods would be listed here.</p>
                <Button>Add New Payment Method</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Your past rental transactions and payouts would be listed here.</p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription & Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-500">Your current subscription plan details would be displayed here.</p>
                <Button>Manage Subscription</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
