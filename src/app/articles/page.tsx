import type { Metadata } from "next";
import { ArticlesView } from "@/components/views/ArticlesView";

export const metadata: Metadata = {
  title: "しょこらの部屋｜瀧脇笙古さん 関連記事",
  description: "瀧脇笙古さんに関するインタビュー・メディア記事・過去記事一覧です。",
  openGraph: {
    title: "しょこらの部屋｜瀧脇笙古さん 関連記事",
    description: "瀧脇笙古さんに関するインタビュー・メディア記事・過去記事一覧です。",
  },
};

export default function ArticlesPage() {
  return <ArticlesView />;
}
