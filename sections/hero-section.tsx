"use client";

import {
    ArrowRight,
    LogIn,
    MessageSquare,
    Sparkles,
    TrendingUpIcon,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import FileUpload from "@/components/FileUpload";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubscriptionButton from "@/components/SubscriptionButton";

interface HeroSectionProps {
    isAuth: boolean;
    isPro: boolean;
    firstChat: {
        id: number;
    } | null;
}

export default function HeroSection({
    isAuth,
    isPro,
    firstChat,
}: HeroSectionProps) {
    interface Prompt {
        label: string;
    }

    const prompts: Prompt[] = [
        { label: "Research Paper" },
        { label: "Study Notes" },
        { label: "Ask Questions" },
        { label: "Exam Prep" },
        { label: "Summarize PDF" },
        { label: "Key Insights" },
        { label: "Chapter Summary" },
        { label: "Quiz Me" },
        { label: "Important Topics" },
        { label: "Explain Concepts" },
        { label: "Revision Notes" },
        { label: "Find Definitions" },
        { label: "Generate MCQs" },
        { label: "Interview Questions" },
        { label: "Technical Document" },
        { label: "Legal Document" },
        { label: "Financial Report" },
        { label: "Meeting Notes" },
        { label: "User Manual" },
        { label: "Project Report" },
        { label: "Assignment Help" },
        { label: "Case Study" },
        { label: "Compare Sections" },
        { label: "Extract Tables" },
        { label: "Find References" },
        { label: "Citation Support" },
        { label: "Translate PDF" },
        { label: "Quick Review" },
    ];

    return (
        <section
            id="home"
            className="flex flex-col items-center justify-center"
        >
            <div className="flex items-center gap-2 text-gray-500 mt-18">
                <TrendingUpIcon className="size-4.5" />
                <span>Trusted by thousands of students</span>
            </div>

            <h1 className="text-center text-5xl/17 md:text-[64px]/20 font-semibold max-w-2xl m-2">
                Chat with your PDFs using AI
            </h1>

            <p className="text-center text-base text-gray-500 max-w-md mt-2">
                Upload any PDF. Ask questions, get summaries, and understand
                documents instantly.
            </p>

            <div className="flex items-center justify-center gap-3 mt-8 mb-8">
                {isAuth ? (
                    firstChat && (
                        <Link href={`/chat/${firstChat.id}`}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="gap-2 bg-white hover:bg-gray-100 border-gray-400"
                            >
                                <MessageSquare className="size-4" />
                                Go to Chats
                            </Button>
                        </Link>
                    )
                ) : (
                    <Link href="/sign-in">
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 bg-white hover:bg-gray-100 border-gray-400"
                        >
                            <LogIn className="size-4" />
                            Login to Get Started
                        </Button>
                    </Link>
                )}

                <SubscriptionButton isPro={isPro} />
            </div>

            {isAuth && (<FileUpload />)}

            <Marquee
                gradient
                speed={30}
                pauseOnHover
                className="max-w-2xl w-full mt-3"
            >
                {prompts.map((item) => (
                    <button
                        key={item.label}
                        className="px-4 py-1.5 mx-2 border rounded-full transition bg-gray-200 text-gray-800 border-gray-300"
                    >
                        {item.label}
                    </button>
                ))}
            </Marquee>
        </section>
    );
}
