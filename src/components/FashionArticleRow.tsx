"use client";

import React from "react";
import { LinkItem } from "@/types/blog";
import { ExternalLink, Radio } from "lucide-react";

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

  const hasValidRadikoUrl =
    item.radikoURL &&
    item.radikoURL.trim() !== "" &&
    item.radikoURL !== "#" &&
    (item.radikoURL.startsWith("http://") || item.radikoURL.startsWith("https://"));

  return (
    <div className="group py-4 sm:py-5 border-b border-[#F0E4CE] hover:border-[#F6C744] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 flex-1">
        {/* 日付 */}
        <span className="font-mono text-xs text-[#8C694D] font-bold shrink-0">
          {item.publishedDate.replace(/-/g, ".")}
        </span>

        {/* カテゴリ / 媒体 */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] font-mono font-bold text-[10px] uppercase rounded-full">
            {item.category}
          </span>
          <span className="text-[#8C694D] font-sans text-[11px] font-bold">
            [{item.channelName || item.sourceName}]
          </span>
        </div>

        {/* タイトル */}
        <h3 className="font-bold text-[#191919] text-sm sm:text-base group-hover:text-[#E99A32] transition-colors leading-snug font-sans">
          {hasValidUrl ? (
            <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* radiko 正式個別URLが確認できる場合のみボタン表示 (推測URL禁止) */}
        {hasValidRadikoUrl && (
          <a
            href={item.radikoURL!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] bg-[#FFF4C7] hover:bg-[#F6C744] text-[#5C4533] hover:text-[#191919] px-2.5 py-1 rounded-full font-bold transition-colors border border-[#F6C744]/60"
          >
            <Radio className="w-3 h-3 text-[#E99A32]" />
            <span>radikoで聴く ↗</span>
          </a>
        )}

        {hasValidUrl && (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] text-[#8C694D] group-hover:text-[#191919] font-bold transition-colors"
          >
            <span>READ MORE</span>
            <ExternalLink className="w-3 h-3 text-[#E99A32]" />
          </a>
        )}
      </div>
    </div>
  );
};
