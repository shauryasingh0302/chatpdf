'use client'

import { Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useChat } from '@ai-sdk/react'
import MessageList from "./MessageList"
import { useState, useEffect } from "react"
import { DefaultChatTransport } from 'ai'

type Props = {chatId: number}

const ChatComponent = ({chatId}: Props) => {

    const [input, setInput] = useState('')
	const { messages, sendMessage, status } = useChat({
    	transport: new DefaultChatTransport({
			api: '/api/chat' ,
			body: {
				chatId
			}
		})
	})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        sendMessage({ text: input })
        setInput('')
    }

	useEffect(()=>{
		const messageContainer = document.getElementById("message-container")
		if(messageContainer){
			messageContainer.scrollTo({
				top: messageContainer.scrollHeight,
				behavior: "smooth"
			})
		}
	},[messages])

    return (
        <div className="relative max-h-screen overflow-scroll" id="message-container">
            <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
                <h3 className="text-xl font-bold">Chat</h3>
            </div>

            <MessageList messages={messages}/>

            <form onSubmit={handleSubmit} className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white">
                <div className="flex">
                    <Input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="w-full"
                    />
                    <Button className="bg-blue-600 ml-2" disabled={status === 'streaming'}>
                        <Send className="h-4 w-4"/>
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default ChatComponent