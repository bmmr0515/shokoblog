"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinkItem } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";

export function NewsView() {
  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    const all = getLinkItems();
    const newsList = all.filter(
      (i) => i.category === "ニュース" || i.category === "公式情報" || i.category === "テレビ・ラジオ" || i.category === "メディア"
    );
    setItems(newsList);
  }, []);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "NEWS" }]} />

      <div className="border-b-2 border-amber-500 pb-2">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <span>NEWS</span>
          <span className="text-sm font-normal text-gray-500">最新ニュース・トピックス ({items.length}件)</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <ArticleCard key={item.id} item={item} />
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
