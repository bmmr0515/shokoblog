"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { LinkItem, Category } from "@/types/blog";
import { INITIAL_LINK_ITEMS, INITIAL_TAGS, INITIAL_YEARS } from "@/data/mockData";
import { getLinkItems } from "@/lib/store";
import { ExternalLink } from "lucide-react";

interface SidebarProps {
  items?: LinkItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items: propItems }) => {
  // 全本番データ
  const allItems = useMemo(() => {
    let base = INITIAL_LINK_ITEMS;
    if (typeof window !== "undefined") {
      try {
        const store = getLinkItems();
        if (store && store.length > base.length) {
          base = store;
        }
      } catch (e) {
        // fallback
      }
    }
    return base;
  }, [propItems]);

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
    <aside className="space-y-8 text-xs font-mono">
      
      {/* Profile Summary */}
      <div className="border border-zinc-200 p-5 space-y-3 bg-white">
        <div className="border-b border-zinc-950 pb-2 space-y-0.5">
          <div className="text-[10px] font-bold text-yellow-600 uppercase">// PROFILE SUMMARY</div>
          <h3 className="font-extrabold text-zinc-950 text-sm font-sans">
            瀧脇 笙古（TAKIWAKI SHOKO）
          </h3>
        </div>
        <p className="text-zinc-600 leading-relaxed text-xs font-sans">
          2001年7月9日生まれ、神奈川県出身。趣味は料理・カフェ巡り。特技はマラソン（サブ4達成）。プロ野球ニュース木曜MC。
        </p>
        <div className="pt-1 flex gap-2 font-sans font-bold">
          <Link
            href="/profile"
            className="flex-1 py-2 px-2 bg-zinc-950 text-white text-center hover:bg-zinc-800 transition-colors text-xs"
          >
            詳細プロフィール
          </Link>
          <a
            href="https://equal-love.jp/feature/takiwaki_shoko"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-2 bg-zinc-50 text-zinc-900 text-center border border-zinc-200 hover:bg-zinc-100 transition-colors flex items-center justify-center gap-1 text-xs"
          >
            <span>公式HP</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* Category Nav */}
      <div className="border border-zinc-200 p-5 space-y-3 bg-white">
        <h3 className="font-extrabold text-zinc-950 border-b border-zinc-950 pb-2 text-xs tracking-widest uppercase">
          // CATEGORY
        </h3>
        <ul className="divide-y divide-zinc-100 font-sans">
          {categoriesList.map((cat) => {
            const count = allItems.filter((i) => i.category === cat).length;
            return (
              <li key={cat}>
                <Link
                  href={`/category/${encodeURIComponent(cat)}`}
                  className="flex items-center justify-between py-2 text-zinc-700 hover:text-amber-600 font-bold transition-colors text-xs"
                >
                  <span>{cat}</span>
                  <span className="font-mono text-[11px] text-zinc-400 font-bold">
                    ({count})
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Yearly Archive Nav */}
      <div className="border border-zinc-200 p-5 space-y-3 bg-white">
        <h3 className="font-extrabold text-zinc-950 border-b border-zinc-950 pb-2 text-xs tracking-widest uppercase">
          // ARCHIVE
        </h3>
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {INITIAL_YEARS.map((yr) => {
            const count = allItems.filter((i) => i.year === yr).length;
            return (
              <Link
                key={yr}
                href={`/archive/${yr}`}
                className="py-1.5 px-2 bg-zinc-50 hover:bg-zinc-950 hover:text-white border border-zinc-200 text-zinc-800 flex justify-between items-center transition-colors text-xs font-bold"
              >
                <span>{yr}年</span>
                <span className="text-[10px]">({count})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="border border-zinc-200 p-5 space-y-3 bg-white">
        <h3 className="font-extrabold text-zinc-950 border-b border-zinc-950 pb-2 text-xs tracking-widest uppercase">
          // TAGS
        </h3>
        <div className="flex flex-wrap gap-1.5 pt-1 font-sans">
          {INITIAL_TAGS.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-700 transition-colors text-[11px]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
};
