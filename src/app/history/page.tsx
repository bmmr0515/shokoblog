import { Metadata } from "next";
import { HistoryView } from "@/components/views/HistoryView";

export const metadata: Metadata = {
  title: "HISTORY - 瀧脇笙古 ドキュメンタリー | しょこらの部屋",
  description: "ダンス未経験で始まった＝LOVEでの日々。悔しさも、挑戦も、走った距離も。瀧脇笙古ちゃんが積み重ねてきた2017年から現在までの時間を映像とともに辿るドキュメンタリーページ。",
};

export default function HistoryPage() {
  return <HistoryView />;
}
