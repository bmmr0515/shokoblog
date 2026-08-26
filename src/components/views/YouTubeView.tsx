"use client";

import React, { useEffect, useState, useMemo } from "react";
import { LinkItem } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { YouTubeEmbedCard } from "@/components/YouTubeEmbedCard";
import { Sidebar } from "@/components/Sidebar";
import { Video, ArrowUpDown } from "lucide-react";
import { getUnifiedCategory } from "@/lib/youtube";
import { sortItemsByDate } from "@/lib/date-sort";

export function YouTubeView() {
  const [items, setItems] = useState<LinkItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc"); // デフォルト: "desc" (新しい順)

  useEffect(() => {
    const all = getLinkItems();
    const ytList = all.filter((i) => i.contentType === "youtube" || !!i.youtubeURL || i.category === "YouTube" || i.category === "ライブ映像");
    setItems(ytList);
  }, []);

  const categoryList = [
    "すべて",
    "MV関連",
    "ライブ映像",
    "インタビュー",
    "スポーツ",
    "イコノイジョイch",
    "配信",
    "ドキュメンタリー"
  ];

  // フィルタリング ＆ 新しい順(降順)ソートの維持
  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((item) => {
      if (selectedCategory === "すべて") return true;
      const cat = getUnifiedCategory(item);
      return cat === selectedCategory;
    });

    // 常に sortItemsByDate で並び替え（デフォルト:降順）
    return sortItemsByDate(filtered, sortOrder);
  }, [items, selectedCategory, sortOrder]);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "MOVIE" }]} />

      <div className="border-b-2 border-amber-500 pb-2 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Video className="w-6 h-6 text-amber-500" />
          <span>MOVIE コレクション</span>
        </h1>

        <div className="flex items-center gap-3">
          {/* 並び順切り替え UI (デフォルト: 新しい順) */}
          <div className="flex items-center gap-1 bg-[#FFF9ED] border border-[#F0E4CE] rounded-lg p-1 text-xs font-bold font-mono text-[#5C4533]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#E99A32] ml-1" />
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-2 py-0.5 rounded transition-colors ${
                sortOrder === "desc"
                  ? "bg-[#191919] text-white shadow-2xs"
                  : "text-[#8C694D] hover:text-[#191919]"
              }`}
            >
              新しい順
            </button>
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-2 py-0.5 rounded transition-colors ${
                sortOrder === "asc"
                  ? "bg-[#191919] text-white shadow-2xs"
                  : "text-[#8C694D] hover:text-[#191919]"
              }`}
            >
              古い順
            </button>
          </div>

          <span className="text-xs text-gray-500 font-mono font-bold">
            全{filteredAndSortedItems.length}件
          </span>
        </div>
      </div>

      {/* カテゴリフィルター (切り替えても最新順を維持) */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              selectedCategory === cat
                ? "bg-[#F6C744] text-[#191919] shadow-2xs font-maru"
                : "bg-white text-gray-700 hover:bg-[#FFF4C7] border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredAndSortedItems.map((item) => (
              <YouTubeEmbedCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
