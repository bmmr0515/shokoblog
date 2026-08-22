import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBaseUrl, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/site";

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
      <body className="min-h-screen flex flex-col justify-between bg-shoko-beige text-shoko-text-main">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
