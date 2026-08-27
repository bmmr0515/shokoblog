"use client";

import React, { useEffect, useState } from "react";
import { LinkItem } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FashionArticleRow } from "@/components/FashionArticleRow";
import { Sidebar } from "@/components/Sidebar";
import { FileText } from "lucide-react";
import { sortItemsByDate } from "@/lib/date-sort";

export function ArticlesView() {
  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    const all = getLinkItems();
    const articleList = all.filter((i) => i.contentType !== "youtube" && !i.youtubeURL && i.category !== "YouTube");
    setItems(sortItemsByDate(articleList, "desc"));
  }, []);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-8 py-2">
      
      <Breadcrumbs items={[{ label: "ARTICLES" }]} />

      <div className="border-b-2 border-[#191919] pb-4 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C694D] uppercase">
          <FileText className="w-4 h-4 text-[#E99A32]" />
          <span>EDITORIAL INDEX & INTERVIEWS</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-3xl sm:text-4xl font-mono font-extrabold tracking-wider text-[#191919]">
            ARTICLES
          </h1>
          <span className="text-xs sm:text-sm font-maru font-bold text-[#8C694D]">
            関連記事・インタビュー記録
          </span>
          <span className="text-xs font-mono text-zinc-400 font-bold ml-auto sm:ml-0">
            （全{items.length}件）
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <div className="lg:col-span-8 space-y-2">
          <div className="divide-y divide-[#F0E4CE] bg-white border border-[#F0E4CE] rounded-2xl px-6 sm:px-8 shadow-2xs">
            {items.map((item) => (
              <FashionArticleRow key={item.id} item={item} />
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
