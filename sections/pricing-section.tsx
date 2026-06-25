"use client";

import {
    CheckIcon,
    ShieldCheckIcon,
    SparklesIcon,
    ZapIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PricingItem {
    title: string;
    description: string;
    mostPopular?: boolean;
    price: string;
    buttonText: string;
    features: string[];
}

export default function PricingSection() {
    const router = useRouter();

    const data: PricingItem[] = [
        {
            title: "Free",
            description: "Perfect for getting started for students",
            price: "$0",
            buttonText: "Get Started",
            features: [
                "Upload up to 3 PDFs",
                "Basic AI chat with documents",
                "10 MB max file size",
                "Standard response speed",
                "Basic AI chat with documents",
            ],
        },
        {
            title: "Pro",
            mostPopular: true,
            description: "For students, researchers, and professionals",
            price: "$20",
            buttonText: "Upgrade to Pro",
            features: [
                "Unlimited PDF uploads",
                "Unlimited AI conversations",
                "Larger file uploads",
                "Priority AI responses",
                "Access to newest AI models",
                "Priority support",
            ],
        },
    ];

    return (
        <section
            id="pricing"
            className="mx-auto mt-32 flex max-w-7xl flex-col items-start justify-between gap-14 px-4 md:flex-row"
        >
            <div className="max-w-sm">
                <h3 className="font-domine text-3xl">OUR PRICING</h3>

                <p className="mt-4 text-sm/6 text-gray-500">
                    Choose a plan that fits your goals and scale. Every plan
                    includes powerful AI features, fast performance, and all the
                    tools you need without limits.
                </p>

                <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-gray-500">
                        <div className="rounded-md border border-gray-200 p-2.5">
                            <SparklesIcon className="size-5" />
                        </div>
                        <p>Advanced AI features included</p>
                    </div>

                    <div className="flex items-center gap-3 text-gray-500">
                        <div className="rounded-md border border-gray-200 p-2.5">
                            <ZapIcon className="size-5" />
                        </div>
                        <p>Lightning fast load speed always</p>
                    </div>

                    <div className="flex items-center gap-3 text-gray-500">
                        <div className="rounded-md border border-gray-200 p-2.5">
                            <ShieldCheckIcon className="size-5" />
                        </div>
                        <p>Clear honest usage with limits</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-end justify-center gap-10">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`group w-full max-w-80 rounded-xl p-6 pb-10 ${
                            item.mostPopular
                                ? "bg-gray-800 text-white"
                                : "border border-slate-200 bg-white"
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <h3 className="text-lg font-semibold">
                                {item.title}
                            </h3>

                            <p
                                className={
                                    item.mostPopular
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                }
                            >
                                {item.description}
                            </p>

                            <p className="mt-4 text-2xl font-semibold">
                                {item.price}
                                <span
                                    className={`text-sm font-normal ${
                                        item.mostPopular
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {" "}
                                    /month
                                </span>
                            </p>

                            <button
                                onClick={() => {
                                    if (item.mostPopular) {
                                        router.push("/checkout");
                                    }
                                }}
                                className={`mt-4 w-full rounded-lg py-2.5 font-medium transition ${
                                    item.mostPopular
                                        ? "bg-white text-gray-900 hover:bg-gray-100"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }`}
                            >
                                {item.buttonText}
                            </button>
                        </div>

                        <div className="mt-2 flex flex-col">
                            {item.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-2 border-b py-3 ${
                                        item.mostPopular
                                            ? "border-gray-700"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <div
                                        className={`rounded-full p-1 ${
                                            item.mostPopular
                                                ? "bg-white/10"
                                                : "bg-gray-800"
                                        }`}
                                    >
                                        <CheckIcon
                                            className="size-3 text-white"
                                            strokeWidth={2.5}
                                        />
                                    </div>

                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}