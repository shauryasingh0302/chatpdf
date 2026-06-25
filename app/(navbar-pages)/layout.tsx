import Footer from "@/components/footer";
import LenisScroll from "@/components/lenis";
import Navbar from "@/components/navbar";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Navbar />
            <LenisScroll />
            {children}
            <Footer />
        </>
    );
}
