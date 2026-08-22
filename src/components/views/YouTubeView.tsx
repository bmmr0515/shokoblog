"use client";

import React, { useEffect, useState } from "react";
import { LinkItem } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { YouTubeEmbedCard } from "@/components/YouTubeEmbedCard";
import { Sidebar } from "@/components/Sidebar";
import { Video } from "lucide-react";
import { getUnifiedCategory } from "@/lib/youtube";

export function YouTubeView() {
  const [items, setItems] = useState<LinkItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");

  useEffect(() => {
    const all = getLinkItems();
    const ytList = all.filter((i) => i.contentType === "youtube" || !!i.youtubeURL || i.category === "YouTube");
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

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "すべて") return true;
    const cat = getUnifiedCategory(item);
    return cat === selectedCategory;
  });

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "MOVIE" }]} />

      <div className="border-b-2 border-amber-500 pb-2 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Video className="w-6 h-6 text-amber-500" />
          <span>MOVIE コレクション</span>
        </h1>
        <span className="text-xs text-gray-500 font-medium">全{filteredItems.length}件</span>
      </div>

      {/* カテゴリフィルター */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded font-bold transition-colors ${
              selectedCategory === cat
                ? "bg-amber-500 text-white shadow-2xs"
                : "bg-white text-gray-700 hover:bg-amber-50 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
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
