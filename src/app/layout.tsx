import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, BuyMeCoffeeWidget } from "@/components/layout";

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600"], 
  variable: "--font-body" 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: "--font-heading" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-proof.vercel.app"),
  title: { 
    default: "AI Proof | Is AI Coming For Your Job?", 
    template: "%s | AI Proof" 
  },
  description: "Take the 7-question engineering assessment. Find out which developer skills are safe from automation.",
  keywords: ["AI proof skills", "will AI replace software engineers", "developer skills test", "AI-proof engineer quiz", "future proof developer career", "skills AI can't replace"],
  authors: [{ name: "AI Proof" }],
  creator: "AI Proof",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-proof.vercel.app",
    siteName: "AI Proof",
    title: "AI Proof | Is AI Coming For Your Job?",
    description: "Take the free 5-minute quiz to discover your AI-Proof Score.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "AI Proof" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Proof | Is AI Coming For Your Job?",
    description: "Take the free 5-minute quiz to discover your AI-Proof Score.",
    images: ["/og-default.png"]
  },
  robots: { 
    index: true, 
    follow: true, 
    googleBot: { index: true, follow: true } 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BuyMeCoffeeWidget />
      </body>
    </html>
  );
}
