import {
    BrainCircuitIcon,
    FileTextIcon,
    MessageSquareTextIcon,
} from "lucide-react";

interface Feature {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

export default function FeaturesSection() {
    const features: Feature[] = [
        {
            icon: MessageSquareTextIcon,
            title: "Chat with Any PDF",
            description:
                "Upload your PDF and ask questions in natural language to get instant, context-aware answers.",
        },
        {
            icon: BrainCircuitIcon,
            title: "AI-Powered Insights",
            description:
                "Generate summaries, explain complex concepts, and extract the most important information effortlessly.",
        },
        {
            icon: FileTextIcon,
            title: "Smarter Study & Research",
            description:
                "Review research papers, textbooks, notes, and reports faster with AI-assisted document analysis.",
        },
    ];

    return (
        <div
            id="features"
            className="grid border mt-42 rounded-lg max-w-6xl mx-auto border-gray-200/70 grid-cols-1 divide-y divide-gray-200/70 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        >
            {features.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col items-start gap-4 p-8 pb-14 transition duration-300 hover:bg-gray-50"
                >
                    <div className="flex items-center gap-2 text-gray-700">
                        <item.icon className="size-5" />
                        <h2 className="text-base font-medium">
                            {item.title}
                        </h2>
                    </div>

                    <p className="max-w-72 text-sm/6 text-gray-500">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );
}