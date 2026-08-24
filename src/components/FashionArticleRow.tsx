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
    <div className="group py-4 sm:py-5 border-b border-zinc-200 hover:border-zinc-950 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 flex-1">
        {/* 日付 */}
        <span className="font-mono text-xs text-zinc-400 font-bold shrink-0">
          {item.publishedDate.replace(/-/g, ".")}
        </span>

        {/* カテゴリ / 媒体 (KEY VISUAL と共通デザイン言語) */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-mono font-bold text-[10px] uppercase rounded-none">
            {item.category}
          </span>
          <span className="text-zinc-500 font-mono text-[11px] font-bold">
            // {item.channelName || item.sourceName}
          </span>
        </div>

        {/* タイトル */}
        <h3 className="font-extrabold text-zinc-950 text-sm sm:text-base group-hover:text-amber-600 transition-colors leading-snug">
          {item.title}
        </h3>
      </div>

      {hasValidUrl && (
        <span className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 group-hover:text-zinc-950 font-bold transition-colors">
          <span>READ MORE</span>
          <ExternalLink className="w-3 h-3" />
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
