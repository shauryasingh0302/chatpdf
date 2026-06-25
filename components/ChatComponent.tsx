"use client";

import { Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import MessageList from "./MessageList";
import { useState, useEffect } from "react";
import axios from "axios";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

type Props = {
    chatId: number;
};

const ChatComponent = ({ chatId }: Props) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);

    useEffect(() => {
        const loadMessages = async () => {
            const { data } = await axios.post("/api/get-messages", { chatId });

            const loaded = data.map((m: any) => ({
                id: m.id.toString(),
                role: m.role === "system" ? "assistant" : m.role,
                content: m.content,
            }));

            setMessages(loaded);
            setIsLoadingMessages(false);
        };

        loadMessages();
    }, [chatId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [...messages, userMessage],
                chatId,
            }),
        });

        const reader = response.body!.getReader();

        const decoder = new TextDecoder();

        let aiText = "";

        const aiId = Date.now().toString() + "-ai";

        setMessages((prev) => [
            ...prev,
            {
                id: aiId,
                role: "assistant",
                content: "",
            },
        ]);

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            aiText += decoder.decode(value, { stream: true });

            setMessages((prev) =>
                prev.map((m) =>
                    m.id === aiId
                        ? {
                              ...m,
                              content: aiText,
                          }
                        : m
                )
            );
        }

        setIsLoading(false);
    };

    useEffect(() => {
        const container = document.getElementById("message-container");

        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <div className="flex h-full flex-col bg-white">

            {/* Header */}

            <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur-md">
                <div className="px-6 py-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                        AI Assistant
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Ask anything about your PDF
                    </p>
                </div>
            </div>

            {/* Messages */}

            <div
                id="message-container"
                className="flex-1 overflow-y-auto px-6 py-8"
            >
                {isLoadingMessages ? (
                    <div className="flex h-full flex-col items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-black" />

                        <p className="mt-4 text-sm text-gray-500">
                            Loading conversation...
                        </p>
                    </div>
                ) : (
                    <MessageList messages={messages} />
                )}
            </div>

            {/* Input */}

            <div className="border-t border-gray-200 bg-white px-5 py-5">

                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-3 rounded-2xl border border-gray-400 bg-white p-2 shadow-sm transition focus-within:border-black"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything about your PDF..."
                        className="border-none bg-transparent shadow-none focus-visible:ring-0"
                    />

                    <Button
                        disabled={isLoading}
                        className="h-11 w-11 rounded-xl bg-gray-800 p-0 hover:bg-black text-white"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                            <Send className="h-4 w-4 text-white" />
                        )}
                    </Button>
                </form>

                <p className="mt-3 text-center text-xs text-gray-500">
                    AI may occasionally make mistakes. Verify important information.
                </p>
            </div>
        </div>
    );
};

export default ChatComponent;