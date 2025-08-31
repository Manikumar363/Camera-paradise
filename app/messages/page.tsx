"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Search, MessageSquare, Send, Paperclip, Smile, Star, Flag, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [messageInput, setMessageInput] = useState("")

  const chats = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hi! Is the Canon R5 available next week?",
      time: "2 hours ago",
      unread: true,
      messages: [
        { id: 1, sender: "Sarah Johnson", content: "Hi! Is the Canon R5 available next week?", time: "2 hours ago" },
        { id: 2, sender: "You", content: "Yes, it is! What dates are you looking for?", time: "1 hour ago" },
        {
          id: 3,
          sender: "Sarah Johnson",
          content: "Jan 25-28. Also, does it come with a battery?",
          time: "30 mins ago",
        },
      ],
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for the Sony A7 III! Great rental.",
      time: "Yesterday",
      unread: false,
      messages: [
        { id: 1, sender: "Mike Rodriguez", content: "Thanks for the Sony A7 III! Great rental.", time: "Yesterday" },
        {
          id: 2,
          sender: "You",
          content: "Glad to hear it! Please leave a review when you have a moment.",
          time: "Yesterday",
        },
      ],
    },
    {
      id: 3,
      user: "Emily Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Regarding the DJI Ronin-S, is it compatible with a Blackmagic Pocket?",
      time: "3 days ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "Emily Chen",
          content: "Regarding the DJI Ronin-S, is it compatible with a Blackmagic Pocket?",
          time: "3 days ago",
        },
        { id: 2, sender: "You", content: "Yes, it is! I've used it with that camera before.", time: "3 days ago" },
      ],
    },
  ]

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage = {
        id: selectedChat.messages.length + 1,
        sender: "You",
        content: messageInput,
        time: "Just now",
      }
      setSelectedChat((prevChat: any) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }))
      setMessageInput("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          {/* Chat List Sidebar */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search chats..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedChat?.id === chat.id ? "bg-blue-50/50 border-l-4 border-blue-600" : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.user} />
                    <AvatarFallback>{chat.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-medium ${chat.unread ? "font-semibold" : ""}`}>{chat.user}</h3>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">{chat.lastMessage}</p>
                  </div>
                  {chat.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedChat ? (
              <>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.user} />
                      <AvatarFallback>{selectedChat.user[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{selectedChat.user}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" /> Mark as Important
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" /> Report User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <Separator />
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChat.messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "You"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span
                          className={`block text-xs mt-1 ${
                            message.sender === "You" ? "text-blue-200" : "text-gray-500"
                          }`}
                        >
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <Separator />
                <CardFooter className="p-4">
                  <div className="flex w-full items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Textarea
                      placeholder="Type your message..."
                      className="flex-1 resize-none min-h-[40px] max-h-[120px]"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageSquare className="h-16 w-16 mb-4" />
                <p className="text-lg">Select a chat to start messaging</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
