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
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

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

  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((item) => {
      if (selectedCategory === "すべて") return true;
      const cat = getUnifiedCategory(item);
      return cat === selectedCategory;
    });

    return sortItemsByDate(filtered, sortOrder);
  }, [items, selectedCategory, sortOrder]);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-8 py-2">
      
      <Breadcrumbs items={[{ label: "MOVIE" }]} />

      <div className="border-b-2 border-[#191919] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C694D] uppercase">
            <Video className="w-4 h-4 text-[#E99A32]" />
            <span>VIDEO & MOVIE COLLECTION</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-3xl sm:text-4xl font-mono font-extrabold tracking-wider text-[#191919]">
              MOVIE
            </h1>
            <span className="text-xs sm:text-sm font-maru font-bold text-[#8C694D]">
              動画コレクション
            </span>
            <span className="text-xs font-mono text-zinc-400 font-bold">
              （全{filteredAndSortedItems.length}件）
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-[#FFF9ED] border border-[#F0E4CE] rounded-lg p-1 text-xs font-bold font-mono text-[#5C4533]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#E99A32] ml-1" />
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                sortOrder === "desc"
                  ? "bg-[#191919] text-white shadow-2xs"
                  : "text-[#8C694D] hover:text-[#191919]"
              }`}
            >
              新しい順
            </button>
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                sortOrder === "asc"
                  ? "bg-[#191919] text-white shadow-2xs"
                  : "text-[#8C694D] hover:text-[#191919]"
              }`}
            >
              古い順
            </button>
          </div>
        </div>
      </div>

      {/* カテゴリフィルター */}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredAndSortedItems.map((item) => (
              <YouTubeEmbedCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-24">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
