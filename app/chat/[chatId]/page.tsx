import ChatComponent from "@/components/ChatComponent"
import ChatSideBar from "@/components/ChatSideBar"
import PDFViewer from "@/components/PDFViewer"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { checkSubscription } from "@/lib/subscription"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

type Props = {
    params: Promise<{
        chatId: string
    }>
}

const ChatPage = async ({ params }: Props) => {

    const { chatId } = await params
    const { userId } = await auth()

    if(!userId){
        return redirect('/sign-in')
    }

    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))

    if(!_chats){
        return redirect('/')
    }

    if(!_chats.find(chat => chat.id === parseInt(chatId))){
        return redirect('/')
    }

    const currentChat = _chats.find(chat=>chat.id === parseInt(chatId))
    const isPro = await checkSubscription()
    
    return (
        <div className="flex h-[100dvh] min-h-0 overflow-hidden bg-white">
            <div className="flex flex-1 min-h-0 overflow-hidden">
                <div className="w-80 flex-shrink-0">
                    <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
                </div>

                <div className="flex-shrink-0 w-[520px] p-4">
                    <PDFViewer pdf_url={currentChat?.pdfUrl || ''} />
                </div>

                <div className="flex-1 min-w-[620px] border-l border-slate-200">
                    <ChatComponent chatId={parseInt(chatId)} />
                </div>
            </div>
        </div>
    )
}

export default ChatPage