'use client'

import { Send, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import MessageList from "./MessageList"
import { useState, useEffect } from "react"
import axios from "axios"

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

type Props = { chatId: number }

const ChatComponent = ({ chatId }: Props) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await axios.post('/api/get-messages', { chatId })
      const loaded = data.map((m: any) => ({
        id: m.id.toString(),
        role: m.role === 'system' ? 'assistant' : m.role,
        content: m.content,
      }))
      setMessages(loaded)
      setIsLoadingMessages(false)
    }
    loadMessages()
  }, [chatId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage], chatId }),
    })

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    let aiText = ''
    const aiId = Date.now().toString() + '-ai'

    setMessages(prev => [...prev, { id: aiId, role: 'assistant', content: '' }])

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      aiText += decoder.decode(value, { stream: true })
      setMessages(prev => prev.map(m => m.id === aiId ? { ...m, content: aiText } : m))
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const messageContainer = document.getElementById("message-container")
    if (messageContainer) {
      messageContainer.scrollTo({ top: messageContainer.scrollHeight, behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="relative max-h-screen overflow-scroll" id="message-container">
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {isLoadingMessages ? (
        <div className="flex flex-col items-center justify-center h-full mt-10">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin"/>
          <p className="mt-2 text-sm text-slate-400">Loading messages...</p>
        </div>
      ) : (
        <MessageList messages={messages} />
      )}

      <form onSubmit={handleSubmit} className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white">
        <div className="flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatComponent