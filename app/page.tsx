import FileUpload from "@/components/FileUpload";
import SubscriptionButton from "@/components/SubscriptionButton";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import { checkSubscription } from "@/lib/subscription"

export default async function Home() {

  const {userId} = await auth()
  const isAuth = !!userId
  const isPro = await checkSubscription()

  let firstChat;
  if(userId){
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId))
    if(firstChat){
      firstChat = firstChat[0]
    }
  }

  return (
    <div className="w-screen min-h-screen bg-linear-to-r from-rose-100 to-teal-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton />
          </div>
          <div className="flex mt-6">
            {isAuth && firstChat && (
              <Link href={`/chat/${firstChat.id}`}>
                <Button className="px-8 py-6 rounded-xl text-base font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                  Go to Chats <ArrowRight className="ml-2"/>
                </Button>
              </Link>
            )}
            <div className="ml-3">
              <SubscriptionButton isPro={isPro}/>
            </div>
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to instantly answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload/>
            ) : (
              <Link href="/sign-in">
                <Button className="px-4 py-5 rounded-xl text-base font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                  Login to get Started
                  <LogIn className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}