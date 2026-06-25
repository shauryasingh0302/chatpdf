import { cn } from "@/lib/utils";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

type Props = {
    messages: Message[];
};

const MessageList = ({ messages }: Props) => {
    if (!messages) return <></>;

    return (
        <div className="flex flex-col gap-6 px-6 py-2">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={cn("flex", {
                        "justify-end pl-12": message.role === "user",
                        "justify-start pr-12": message.role === "assistant",
                    })}
                >
                    <div
                        className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-6 transition-all duration-200",
                            {
                                "bg-gray-800 text-white shadow-lg":
                                    message.role === "user",

                                "border border-gray-200 bg-white text-gray-800 shadow-sm":
                                    message.role === "assistant",
                            },
                        )}
                    >
                        <p className="whitespace-pre-wrap break-words">
                            {message.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
