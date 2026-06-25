"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

interface NavLink {
    name: string;
    href: string;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = useRef(0);

    const navLinks: NavLink[] = [
        { name: "Home", href: "/#home" },
        { name: "Features", href: "/#features" },
        { name: "Process", href: "/#process" },
        { name: "Pricing", href: "/#pricing" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScrollY.current && currentScroll > 80) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            lastScrollY.current = currentScroll;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { user, isSignedIn } = useUser();

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-40 bg-white/60 backdrop-blur-md transition-transform duration-400 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div className="flex items-center justify-between px-4 py-4 md:px-16 lg:px-24 xl:px-32 border-b border-gray-200">
                    <a href="/">
                        <Image
                            src="/assets/logo.svg"
                            alt="Logo"
                            width={68}
                            height={26}
                            className="h-7 w-auto md:mr-31"
                        />
                    </a>

                    

                    <div className="hidden md:flex items-center gap-3">
                        {isSignedIn ? (
                            <>
                                <span className="px-4 py-2.5 text-base text-gray-600">
                                    Hi,{" "}
                                    <span className="font-semibold text-gray-900">
                                        {user?.firstName ||
                                            user?.username ||
                                            "User"}
                                    </span>
                                </span>

                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "h-11 w-11",
                                        },
                                    }}
                                />
                            </>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="px-6 py-2.5 hover:bg-gray-100 rounded-lg text-base"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="transition active:scale-90 md:hidden"
                    >
                        <MenuIcon className="size-6.5" />
                    </button>
                </div>
            </nav>

            <div
                className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-white/40 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                
                {isSignedIn ? (
                    <>
                        <div className="flex flex-col items-center gap-3 mb-4">
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "h-16 w-16",
                                    },
                                }}
                            />

                            <p className="text-xl font-medium text-gray-700">
                                Hi,{" "}
                                <span className="font-semibold text-black">
                                    {user?.firstName ||
                                        user?.username ||
                                        "User"}
                                </span>
                            </p>
                        </div>
                    </>
                ) : (
                    <Link
                        href="/sign-in"
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 text-lg hover:bg-gray-100 rounded-lg"
                    >
                        Login
                    </Link>
                )}

                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}

                <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md bg-linear-to-b from-gray-600 to-gray-800 p-2 text-white ring-white active:ring-2"
                >
                    <XIcon />
                </button>
            </div>
            <div className="h-18" />
        </>
    );
}
