import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBaseUrl, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: ["瀧脇笙古", "=LOVE", "イコラブ", "しょこちゃん", "しょこらの部屋", "横浜DeNAベイスターズ", "マラソン", "サブ4", "ファンサイト"],
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    locale: "ja_JP",
    siteName: "しょこらの部屋",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 800,
        alt: "しょこらの部屋",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-[#FFFDF7] text-zinc-900 font-sans antialiased">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
