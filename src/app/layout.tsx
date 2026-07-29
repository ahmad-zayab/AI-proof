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
  metadataBase: new URL("https://ai-proof-engineer.vercel.app"),
  title: { 
    default: "AI-Proof Engineer | Is AI Coming For Your Job?", 
    template: "%s | AI-Proof Engineer" 
  },
  description: "Take the free 5-minute quiz to discover your personalized AI-Proof Score. Find out which developer skills are safe from automation and get a roadmap to future-proof your career.",
  keywords: ["AI proof skills", "will AI replace software engineers", "developer skills test", "AI-proof engineer quiz", "future proof developer career", "skills AI can't replace"],
  authors: [{ name: "AI-Proof Engineer" }],
  creator: "AI-Proof Engineer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-proof-engineer.vercel.app",
    siteName: "AI-Proof Engineer",
    title: "AI-Proof Engineer | Is AI Coming For Your Job?",
    description: "Take the free 5-minute quiz to discover your AI-Proof Score.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "AI-Proof Engineer" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Proof Engineer | Is AI Coming For Your Job?",
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
