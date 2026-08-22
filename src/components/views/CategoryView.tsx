"use client";

import React, { useEffect, useState } from "react";
import { LinkItem, Category } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sidebar } from "@/components/Sidebar";
import { ArticleCard } from "@/components/ArticleCard";
import { Folder } from "lucide-react";

interface CategoryViewProps {
  rawCategory: string;
}

export function CategoryView({ rawCategory }: CategoryViewProps) {
  const category = decodeURIComponent(rawCategory) as Category;
  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    setItems(getLinkItems());
  }, []);

  const categoryItems = items.filter((i) => i.category === category);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: `カテゴリー: ${category}` }]} />

      <div className="border-b-2 border-amber-500 pb-2 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <Folder className="w-5 h-5 text-amber-500" />
          <span>「{category}」の記事・アーカイブ</span>
        </h1>
        <span className="text-xs text-gray-500 font-medium">全{categoryItems.length}件</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {categoryItems.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200 text-gray-500 text-xs">
              このカテゴリーの登録リンク・記事はまだありません。
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {categoryItems.map((item) => (
                <ArticleCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div>
          <Sidebar items={items} />
        </div>
      </div>
    </div>
  );
}
