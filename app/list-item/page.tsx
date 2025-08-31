"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Upload, X, DollarSign, Shield, Info } from "lucide-react"

export default function ListItemPage() {
  const [images, setImages] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages].slice(0, 10))
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const steps = [
    { number: 1, title: "Basic Info", description: "Tell us about your equipment" },
    { number: 2, title: "Photos", description: "Add photos of your gear" },
    { number: 3, title: "Pricing", description: "Set your rental price" },
    { number: 4, title: "Availability", description: "Set your availability" },
    { number: 5, title: "Policies", description: "Set rental terms" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-gray-900">
              CAMERA PARADISE
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/browse" className="text-gray-600 hover:text-gray-900">
              Browse
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.number ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.number ? "bg-orange-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">List Your Camera Equipment</CardTitle>
            <p className="text-gray-600">Share your gear with the community and earn money when you're not using it.</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Equipment Title *</Label>
                    <Input id="title" placeholder="e.g., Canon EOS R5 Mirrorless Camera" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cameras">Cameras</SelectItem>
                        <SelectItem value="lenses">Lenses</SelectItem>
                        <SelectItem value="drones">Drones</SelectItem>
                        <SelectItem value="audio">Audio Equipment</SelectItem>
                        <SelectItem value="lighting">Lighting</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brand">Brand *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canon">Canon</SelectItem>
                        <SelectItem value="sony">Sony</SelectItem>
                        <SelectItem value="nikon">Nikon</SelectItem>
                        <SelectItem value="red">RED</SelectItem>
                        <SelectItem value="blackmagic">Blackmagic</SelectItem>
                        <SelectItem value="dji">DJI</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="model">Model *</Label>
                    <Input id="model" placeholder="e.g., EOS R5" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your equipment, its condition, and any special features..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="included">What's Included</Label>
                  <Textarea
                    id="included"
                    placeholder="List all accessories, cables, cases, etc. that come with the rental..."
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>Equipment Photos *</Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Add at least 3 high-quality photos. The first photo will be your main listing image.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Equipment photo ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2 bg-orange-500 text-white">Main Photo</Badge>
                        )}
                      </div>
                    ))}

                    {images.length < 10 && (
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">Add Photo</span>
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="daily-price">Daily Rate *</Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input id="daily-price" type="number" placeholder="0" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="security-deposit">Security Deposit *</Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input id="security-deposit" type="number" placeholder="0" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Pricing Tips</h4>
                      <ul className="text-sm text-blue-800 mt-1 space-y-1">
                        <li>• Research similar equipment in your area</li>
                        <li>• Consider the equipment's age and condition</li>
                        <li>• Factor in wear and tear costs</li>
                        <li>• Set a security deposit to protect your investment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Discount Options</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weekly-discount" />
                      <Label htmlFor="weekly-discount" className="text-sm">
                        Weekly discount (7+ days)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="monthly-discount" />
                      <Label htmlFor="monthly-discount" className="text-sm">
                        Monthly discount (30+ days)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Availability */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label>Pickup Location *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <Input placeholder="Street Address" />
                    <Input placeholder="City, State, ZIP" />
                  </div>
                </div>

                <div>
                  <Label>Availability</Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Set your general availability. You can block specific dates later.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox id={day} defaultChecked />
                        <Label htmlFor={day} className="text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="pickup-time">Pickup Time</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flexible">Flexible</SelectItem>
                        <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                        <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="return-time">Return Time</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flexible">Flexible</SelectItem>
                        <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                        <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Policies */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <Label>Rental Requirements</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="id-required" defaultChecked />
                      <Label htmlFor="id-required" className="text-sm">
                        Valid ID required
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="insurance-required" />
                      <Label htmlFor="insurance-required" className="text-sm">
                        Renter's insurance required
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="experience-required" />
                      <Label htmlFor="experience-required" className="text-sm">
                        Professional experience required
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible - Free cancellation up to 24 hours</SelectItem>
                      <SelectItem value="moderate">Moderate - Free cancellation up to 48 hours</SelectItem>
                      <SelectItem value="strict">Strict - Free cancellation up to 7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="additional-terms">Additional Terms & Conditions</Label>
                  <Textarea
                    id="additional-terms"
                    placeholder="Any additional rules, restrictions, or requirements..."
                    className="mt-1"
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Protection & Insurance</h4>
                      <p className="text-sm text-green-800 mt-1">
                        All rentals are covered by our protection plan. Your equipment is insured against damage and
                        theft during the rental period.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Next Step
                </Button>
              ) : (
                <Button className="bg-orange-500 hover:bg-orange-600">Publish Listing</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
