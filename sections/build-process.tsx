"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
    title: string;
    description: string;
};

const leftSteps: Step[] = [
    {
        title: "Upload Your PDF",
        description:
            "Upload any PDF including research papers, lecture notes, books, reports, or technical documents. Our AI securely processes your file and prepares it for intelligent conversations.",
    },
    {
        title: "Learn Faster",
        description:
            "Generate summaries, create study notes, extract key insights, and revise important topics without reading every page manually.",
    },
];

const rightSteps: Step[] = [
    {
        title: "Ask Anything",
        description:
            "Chat naturally with your document. Ask questions, clarify concepts, locate information, or request explanations based entirely on your uploaded PDF.",
    },
    {
        title: "Get Accurate Answers",
        description:
            "Receive context-aware responses powered by AI that understands your document, helping you study, research, and work more efficiently.",
    },
];

export default function BuildProcess() {
    const segmentRefs = useRef<HTMLDivElement[]>([]);
    const [progress, setProgress] = useState<number[]>([0, 0, 0]);

    useEffect(() => {
        const handleScroll = () => {
            const updated = segmentRefs.current.map((el) => {
                if (!el) return 0;

                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                const start = windowHeight * 0.6;
                const end = windowHeight * 0.2;

                let percent = (start - rect.top) / (start - end);

                percent = Math.min(Math.max(percent, 0), 1);

                return percent;
            });

            setProgress(updated);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="process" className="flex flex-col items-center mt-32">
            <p className="font-domine">Simple 4-Step Process</p>

            <h3 className="text-3xl max-w-sm text-gray-500 text-center mt-5">
                Chat with Any PDF in Four Simple Steps
            </h3>

            <div className="flex flex-col md:flex-row mt-20 md:mt-32">
                <div>
                    {leftSteps.map((step, index) => (
                        <div key={index} className="max-w-lg h-60 md:mt-60">
                            <h3 className="text-xl underline font-domine">
                                {step.title}
                            </h3>
                            <p className="mt-6 text-gray-500 text-sm/6">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="hidden md:flex flex-col items-center">
                    <div className="size-4 bg-gray-800" />

                    {[0, 1, 2].map((i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div
                                ref={(el) => {
                                    if (el) segmentRefs.current[i] = el;
                                }}
                                data-index={i}
                                className="relative w-0.5 mx-10 h-60 bg-gray-300 overflow-hidden"
                            >
                                <div
                                    style={{ height: `${progress[i] * 100}%` }}
                                    className="absolute top-0 left-0 w-full bg-gray-800"
                                />
                            </div>
                            <div
                                className={`size-4 ${progress[i] > 0.95 ? "bg-gray-800" : "bg-gray-300"}`}
                            />
                        </div>
                    ))}
                </div>

                <div>
                    {rightSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`max-w-lg h-60 ${index === 0 ? "" : "md:mt-60"}`}
                        >
                            <h3 className="text-xl underline font-domine">
                                {step.title}
                            </h3>
                            <p className="mt-6 text-gray-500 text-sm/6">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
