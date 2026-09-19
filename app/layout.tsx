import type { Metadata } from "next";
import { Sora, Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["300", "400"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "Zyad Kamal Hamed · Designer, Developer, AI Engineer",
  description:
    "I design and build websites and AI tools for businesses, and work as an AI Specialist at a Sydney creative agency.",
  metadataBase: new URL("https://zyad-portfolio-sage.vercel.app"),
  openGraph: { title: "Zyad Kamal Hamed", description: "Design. Develop. Automate.", images: ["/img/sky-small.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${geist.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
