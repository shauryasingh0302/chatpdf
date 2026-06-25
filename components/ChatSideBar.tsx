"use client";

import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import { FileText, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import SubscriptionButton from "./SubscriptionButton";

type Props = {
    chats: DrizzleChat[];
    chatId: number;
    isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
    return (
        <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-5">
                <Link href="/">
                    <Button className="w-full gap-2 rounded-xl bg-black text-white hover:bg-gray-900">
                        <PlusCircle className="h-4 w-4" />
                        New Chat
                    </Button>
                </Link>
            </div>

            {/* Chats */}
            <div className="flex-1 overflow-y-auto px-4 py-5">
                <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Recent Chats
                </p>

                <div className="space-y-2">
                    {chats.map((chat) => (
                        <Link key={chat.id} href={`/chat/${chat.id}`}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                                    chat.id === chatId
                                        ? "bg-black text-white shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <FileText
                                    className={cn(
                                        "h-4 w-4 shrink-0",
                                        chat.id === chatId
                                            ? "text-white"
                                            : "text-gray-500"
                                    )}
                                />

                                <p className="truncate text-sm font-medium">
                                    {chat.pdfName}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-200 p-5">
                <SubscriptionButton isPro={isPro} />
            </div>
        </aside>
    );
};

export default ChatSideBar;
















// "use client";
// import { DrizzleChat } from "@/lib/db/schema";
// import Link from "next/link";
// import React from "react";
// import { Button } from "./ui/button";
// import { MessageCircle, PlusCircle } from "lucide-react";
// import { cn } from "@/lib/utils";
// import SubscriptionButton from "./SubscriptionButton";

// type Props = {
//   chats: DrizzleChat[];
//   chatId: number;
//   isPro: boolean;
// };

// const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
//   return (
//     <div className="relative w-full h-screen p-4 text-gray-200 bg-gray-900">
//       <Link href="/">
//         <Button className="w-full border-dashed border-white border">
//           <PlusCircle className="mr-2 w-4 h-4" />
//           New Chat
//         </Button>
//       </Link>

//       <div className="flex flex-col gap-2 mt-4 pb-24 overflow-y-auto max-h-[80vh]">
//         {chats.map((chat) => (
//           <Link key={chat.id} href={`/chat/${chat.id}`}>
//             <div
//               className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
//                 "bg-blue-600 text-white": chat.id === chatId,
//                 "hover:text-white": chat.id !== chatId,
//               })}
//             >
//               <MessageCircle className="mr-2" />
//               <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
//                 {chat.pdfName}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <div className="absolute bottom-4 left-4 right-4">
//         <SubscriptionButton isPro={isPro} />
//       </div>
//     </div>
//   );
// };

// export default ChatSideBar;