import type { Metadata } from "next";
import { YouTubeView } from "@/components/views/YouTubeView";

export const metadata: Metadata = {
  title: "しょこらの部屋｜瀧脇笙古さん 動画",
  description: "瀧脇笙古さん出演のYouTube公式動画・ライブ・バラエティパフォーマンスコレクションです。",
  openGraph: {
    title: "しょこらの部屋｜瀧脇笙古さん 動画",
    description: "瀧脇笙古さん出演のYouTube公式動画・ライブ・バラエティパフォーマンスコレクションです。",
  },
};

export default function YouTubePage() {
  return <YouTubeView />;
}
