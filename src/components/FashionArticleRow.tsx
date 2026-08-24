"use client";

import React from "react";
import { LinkItem } from "@/types/blog";
import { ExternalLink } from "lucide-react";

interface FashionArticleRowProps {
  item: LinkItem;
}

export const FashionArticleRow: React.FC<FashionArticleRowProps> = ({ item }) => {
  const targetUrl = item.youtubeURL || item.sourceURL;
  const hasValidUrl =
    targetUrl &&
    targetUrl.trim() !== "" &&
    targetUrl !== "#" &&
    !targetUrl.startsWith("javascript:") &&
    (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"));

  const content = (
    <div className="group py-4 sm:py-5 border-b border-[#F0E4CE] hover:border-[#F6C744] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 flex-1">
        {/* 日付 */}
        <span className="font-mono text-xs text-[#8C694D] font-bold shrink-0">
          {item.publishedDate.replace(/-/g, ".")}
        </span>

        {/* カテゴリ / 媒体 (ひまわりイエロー ＋ ブラウン文字) */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] font-mono font-bold text-[10px] uppercase rounded-full">
            {item.category}
          </span>
          <span className="text-[#8C694D] font-mono text-[11px] font-bold">
            // {item.channelName || item.sourceName}
          </span>
        </div>

        {/* タイトル (柔らかく読みやすい Noto Sans / 丸みほんのり) */}
        <h3 className="font-bold text-[#191919] text-sm sm:text-base group-hover:text-[#E99A32] transition-colors leading-snug font-sans">
          {item.title}
        </h3>
      </div>

      {hasValidUrl && (
        <span className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] text-[#8C694D] group-hover:text-[#191919] font-bold transition-colors">
          <span>READ MORE</span>
          <ExternalLink className="w-3 h-3 text-[#E99A32]" />
        </span>
      )}
    </div>
  );

  if (hasValidUrl && targetUrl) {
    return (
      <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};
