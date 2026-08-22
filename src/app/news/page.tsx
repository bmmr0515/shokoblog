import type { Metadata } from "next";
import { NewsView } from "@/components/views/NewsView";

export const metadata: Metadata = {
  title: "しょこらの部屋｜瀧脇笙古さん NEWS",
  description: "瀧脇笙古さんの最新ニュース・出演トピックス一覧です。",
  openGraph: {
    title: "しょこらの部屋｜瀧脇笙古さん NEWS",
    description: "瀧脇笙古さんの最新ニュース・出演トピックス一覧です。",
  },
};

export default function NewsPage() {
  return <NewsView />;
}
