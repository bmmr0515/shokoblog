"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LinkItem } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sidebar } from "@/components/Sidebar";
import { ArticleListWithAds } from "@/components/ArticleListWithAds";
import { Calendar } from "lucide-react";

export default function YearlyArchivePage() {
  const params = useParams();
  const yearParam = params.year as string;
  const yearNum = parseInt(yearParam, 10);

  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    setItems(getLinkItems());
  }, []);

  const yearItems = items.filter((item) => item.year === yearNum);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: `${yearNum}年 アーカイブ` }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-shoko-beige-border shadow-card space-y-2">
        <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold">
          <Calendar className="w-4 h-4" />
          <span>Yearly Archive</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-shoko-text-main">
          {yearNum}年の瀧脇笙古さん 関連記事・ニュース一覧
        </h1>
        <p className="text-xs text-shoko-text-sub">
          該当件数: {yearItems.length}件 （実在する確認済み情報）
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {yearItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-shoko-beige-border text-shoko-text-sub">
              {yearNum}年の登録記事はまだありません。
            </div>
          ) : (
            <ArticleListWithAds items={yearItems} />
          )}
        </div>

        <div>
          <Sidebar items={items} />
        </div>
      </div>
    </div>
  );
}
