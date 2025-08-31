"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Phone, MessageCircle } from "lucide-react"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")

  const faqs = [
    {
      question: "How do I list my camera equipment for rent?",
      answer:
        "To list your equipment, navigate to the 'List Your Gear' section from your dashboard. You'll be guided through a step-by-step form to add details, photos, pricing, and availability for your items.",
    },
    {
      question: "What are the fees for renting equipment?",
      answer:
        "As a renter, you only pay the daily rental rate set by the owner, plus a small service fee. There are no hidden commissions. Owners keep 100% of their listed rental price.",
    },
    {
      question: "How does ID verification work?",
      answer:
        "For enhanced trust and security, we require all owners and renters to complete an ID verification process. This involves submitting a valid government-issued ID, which is securely processed and stored.",
    },
    {
      question: "What if the equipment gets damaged during a rental?",
      answer:
        "Our platform includes damage protection. In case of damage, please report it immediately through the booking details page. We will guide you through the claims process, which may involve a security deposit or insurance claim.",
    },
    {
      question: "Can I cancel a booking?",
      answer:
        "Cancellation policies are set by individual owners. You can find the specific cancellation policy on each listing's detail page. Generally, free cancellation is available up to 24 hours before the rental period begins.",
    },
  ]

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Support Ticket Submitted:", { ticketSubject, ticketMessage })
    alert("Your support ticket has been submitted. We will get back to you shortly!")
    setTicketSubject("")
    setTicketMessage("")
  }

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        <p className="text-gray-600 mb-8">Find answers to common questions or contact our support team.</p>

        {/* Search FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for questions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-center text-gray-500 py-4">No matching FAQs found.</p>
            )}
          </CardContent>
        </Card>

        {/* Contact Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <MessageCircle className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg mb-1">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-3">Chat with our support team in real-time.</p>
              <Button variant="outline">Start Chat</Button>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Mail className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg mb-1">Email Us</h3>
              <p className="text-sm text-gray-600 mb-3">Send us an email and we'll respond within 24 hours.</p>
              <Button variant="outline" asChild>
                <a href="mailto:support@example.com">Send Email</a>
              </Button>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Phone className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg mb-1">Call Us</h3>
              <p className="text-sm text-gray-600 mb-3">Speak directly with a support agent.</p>
              <Button variant="outline" asChild>
                <a href="tel:+15551234567">Call Now</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit a Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <Label htmlFor="ticket-subject">Subject</Label>
                <Input
                  id="ticket-subject"
                  placeholder="e.g., Issue with booking #123"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ticket-category">Category</Label>
                <Select required>
                  <SelectTrigger id="ticket-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Booking Issue</SelectItem>
                    <SelectItem value="payment">Payment Issue</SelectItem>
                    <SelectItem value="listing">Listing Issue</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ticket-message">Message</Label>
                <Textarea
                  id="ticket-message"
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Submit Ticket</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
