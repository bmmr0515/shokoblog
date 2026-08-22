"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LinkItem } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sidebar } from "@/components/Sidebar";
import { ArticleListWithAds } from "@/components/ArticleListWithAds";
import { Tag as TagIcon } from "lucide-react";

export default function TagPage() {
  const params = useParams();
  const rawTag = params.tag as string;
  const tag = decodeURIComponent(rawTag);

  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    setItems(getLinkItems());
  }, []);

  const tagItems = items.filter((i) => i.tags.includes(tag));

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: `タグ: #${tag}` }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-shoko-beige-border shadow-card space-y-2">
        <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold">
          <TagIcon className="w-4 h-4" />
          <span>Tag Archive</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-shoko-text-main">
          「#{tag}」のタグがついたリンク一覧
        </h1>
        <p className="text-xs text-shoko-text-sub">
          該当件数: {tagItems.length}件
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {tagItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-shoko-beige-border text-shoko-text-sub">
              このタグがついた登録リンクはありません。
            </div>
          ) : (
            <ArticleListWithAds items={tagItems} />
          )}
        </div>

        <div>
          <Sidebar items={items} />
        </div>
      </div>
    </div>
  );
}
