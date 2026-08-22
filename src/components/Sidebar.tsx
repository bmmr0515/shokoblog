"use client";

import React from "react";
import Link from "next/link";
import { LinkItem, Category } from "@/types/blog";
import { INITIAL_TAGS, INITIAL_YEARS } from "@/data/mockData";
import { ExternalLink } from "lucide-react";

interface SidebarProps {
  items: LinkItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const categoriesList: Category[] = [
    "ニュース",
    "インタビュー",
    "YouTube",
    "ベイスターズ",
    "マラソン・スポーツ",
    "テレビ・ラジオ",
    "音楽・ライブ",
    "公式情報",
    "過去記事",
  ];

  return (
    <aside className="space-y-8 text-xs">
      
      {/* Profile Box */}
      <div className="border border-gray-200 p-4 space-y-2.5">
        <h3 className="font-bold text-gray-900 border-b border-amber-500 pb-1.5 text-sm flex items-center justify-between">
          <span>瀧脇 笙古（TAKIWAKI SHOKO）</span>
          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 font-normal">＝LOVE</span>
        </h3>
        <p className="text-gray-600 leading-relaxed">
          2001年7月9日生まれ、神奈川県出身。O型。趣味は料理・カフェ巡り。特技はマラソン（サブ4達成）。プロ野球ニュース木曜MC。
        </p>
        <div className="pt-1 flex gap-2">
          <Link
            href="/profile"
            className="flex-1 py-1.5 px-2 bg-gray-900 text-white font-bold text-center hover:bg-gray-800 transition-colors"
          >
            詳細プロフィール
          </Link>
          <a
            href="https://equal-love.jp/feature/takiwaki_shoko"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-2 bg-gray-100 text-gray-800 font-bold text-center border border-gray-300 hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
          >
            <span>公式HP</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </a>
        </div>
      </div>

      {/* Category Nav */}
      <div className="border border-gray-200 p-4 space-y-2">
        <h3 className="font-bold text-gray-900 border-b border-amber-500 pb-1.5 text-sm">
          CATEGORY
        </h3>
        <ul className="divide-y divide-gray-100">
          {categoriesList.map((cat) => (
            <li key={cat}>
              <Link
                href={`/category/${encodeURIComponent(cat)}`}
                className="flex items-center justify-between py-2 text-gray-700 hover:text-orange-600 font-medium"
              >
                <span>{cat}</span>
                <span className="text-[10px] font-mono text-gray-400">
                  ({items.filter((i) => i.category === cat).length})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Yearly Archive Nav */}
      <div className="border border-gray-200 p-4 space-y-2">
        <h3 className="font-bold text-gray-900 border-b border-amber-500 pb-1.5 text-sm">
          ARCHIVE
        </h3>
        <div className="grid grid-cols-2 gap-1.5 pt-1 font-mono">
          {INITIAL_YEARS.map((yr) => (
            <Link
              key={yr}
              href={`/archive/${yr}`}
              className="py-1 px-2 bg-gray-50 hover:bg-amber-50 hover:text-orange-600 border border-gray-200 text-gray-700 flex justify-between"
            >
              <span>{yr}年</span>
              <span className="text-gray-400 text-[10px]">({items.filter((i) => i.year === yr).length})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="border border-gray-200 p-4 space-y-2">
        <h3 className="font-bold text-gray-900 border-b border-amber-500 pb-1.5 text-sm">
          TAGS
        </h3>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {INITIAL_TAGS.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="px-2 py-0.5 bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-700 transition-colors text-[11px]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
};
