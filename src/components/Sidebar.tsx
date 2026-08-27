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
    <aside className="space-y-6 text-xs font-mono">
      
      {/* Profile Summary */}
      <div className="border border-[#F0E4CE] p-5 sm:p-6 space-y-3 bg-white rounded-2xl shadow-2xs">
        <div className="border-b border-[#F0E4CE] pb-2.5 space-y-1">
          <div className="text-[10px] font-bold text-[#E99A32] uppercase font-mono">PROFILE SUMMARY</div>
          <h3 className="font-maru font-extrabold text-[#191919] text-base">
            瀧脇 笙古 <span className="text-xs font-mono font-normal text-[#8C694D]">（SHOKO）</span>
          </h3>
        </div>
        <p className="text-[#5C4533] leading-relaxed text-xs font-sans font-bold">
          2001年7月9日生まれ、神奈川県出身。趣味は料理・カフェ巡り。特技はマラソン（サブ4達成）。プロ野球ニュース木曜MC。
        </p>
        <div className="pt-2 flex gap-2 font-sans font-bold text-xs">
          <Link
            href="/profile"
            className="flex-1 py-2 px-2 bg-[#191919] hover:bg-[#5C4533] text-white text-center transition-colors rounded-xl"
          >
            詳細プロフィール
          </Link>
          <a
            href="https://equal-love.jp/feature/takiwaki_shoko"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-2 bg-[#FFF9ED] text-[#5C4533] text-center border border-[#F0E4CE] hover:bg-[#FFF4C7] transition-colors flex items-center justify-center gap-1 rounded-xl"
          >
            <span>公式HP ↗</span>
          </a>
        </div>
      </div>

      {/* Category Nav */}
      <div className="border border-[#F0E4CE] p-5 sm:p-6 space-y-3 bg-white rounded-2xl shadow-2xs">
        <h3 className="font-extrabold text-[#191919] border-b border-[#F0E4CE] pb-2 text-xs tracking-widest uppercase">
          CATEGORY
        </h3>
        <ul className="divide-y divide-[#F0E4CE]/60 font-sans">
          {categoriesList.map((cat) => {
            const count = allItems.filter((i) => i.category === cat).length;
            return (
              <li key={cat}>
                <Link
                  href={`/category/${encodeURIComponent(cat)}`}
                  className="flex items-center justify-between py-2 text-[#5C4533] hover:text-[#E99A32] font-bold transition-colors text-xs"
                >
                  <span>{cat}</span>
                  <span className="font-mono text-[11px] text-[#8C694D] font-bold">
                    ({count})
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Yearly Archive Nav */}
      <div className="border border-[#F0E4CE] p-5 sm:p-6 space-y-3 bg-white rounded-2xl shadow-2xs">
        <h3 className="font-extrabold text-[#191919] border-b border-[#F0E4CE] pb-2 text-xs tracking-widest uppercase">
          ARCHIVE
        </h3>
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {INITIAL_YEARS.map((yr) => {
            const count = allItems.filter((i) => i.year === yr).length;
            return (
              <Link
                key={yr}
                href={`/archive/${yr}`}
                className="py-1.5 px-2 bg-[#FFF9ED] hover:bg-[#FFF4C7] border border-[#F0E4CE] text-[#5C4533] flex justify-between items-center transition-colors text-xs font-bold rounded-lg"
              >
                <span>{yr}年</span>
                <span className="text-[10px] text-[#8C694D]">({count})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="border border-[#F0E4CE] p-5 sm:p-6 space-y-3 bg-white rounded-2xl shadow-2xs">
        <h3 className="font-extrabold text-[#191919] border-b border-[#F0E4CE] pb-2 text-xs tracking-widest uppercase">
          TAGS
        </h3>
        <div className="flex flex-wrap gap-1.5 pt-1 font-sans">
          {INITIAL_TAGS.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="px-2.5 py-1 bg-[#FFF9ED] hover:bg-[#FFF4C7] text-[#5C4533] transition-colors text-[11px] rounded-full border border-[#F0E4CE]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
};
