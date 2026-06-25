import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 w-full bg-white pt-10 text-sm text-slate-500 mt-30">
            <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-2 lg:col-span-1">
                    <Link href="/">
                        <Image
                            src="/assets/logo.svg"
                            alt="ChatPDF Logo"
                            width={68}
                            height={26}
                            className="h-7 w-auto"
                        />
                    </Link>

                    <p className="mt-6 text-sm/7">
                        ChatPDF lets you upload PDFs and chat with them using AI.
                        Summarize documents, ask questions, extract insights, and
                        understand complex information in seconds.
                    </p>
                </div>
                
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 md:flex-row">
                <p>
                    © {new Date().getFullYear()} ChatPDF. All rights reserved.
                </p>

                <div className="flex items-center gap-5">
                    <Link href="" className="hover:text-black">
                        Privacy Policy
                    </Link>

                    <Link href="" className="hover:text-black">
                        Terms of Service
                    </Link>

                    <Link href="" className="hover:text-black">
                        Refund Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}