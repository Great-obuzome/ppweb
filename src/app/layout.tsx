import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UPBYNATURE — Daniel | GTM Engineer & Outbound Automation",
  description:
    "GTM engineer building lead generation, enrichment, and outbound automation systems for startups, agencies, and small businesses using Clay, n8n, AI agents, and custom workflows.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  keywords: [
    "GTM engineer",
    "Clay enrichment",
    "n8n automation",
    "cold outbound",
    "lead generation",
    "outbound automation",
    "AI agents",
    "UPBYNATURE",
  ],
  authors: [{ name: "Daniel", url: "https://upbynature.com" }],
  openGraph: {
    title: "UPBYNATURE — Daniel | GTM Engineer",
    description: "I build the systems that fill your pipeline.",
    siteName: "UPBYNATURE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F7F1DB] text-[#050409] font-sans antialiased selection:bg-[#1F4633] selection:text-[#F7F1DB]">
        {children}
      </body>
    </html>
  );
}
