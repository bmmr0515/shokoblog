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
    <div className="group py-5 sm:py-6 border-b border-[#F0E4CE] hover:border-[#F6C744] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-xs">
      
      <div className="space-y-2 flex-1 max-w-[720px]">
        {/* メタ情報 (日付 ＋ カテゴリ ＋ 媒体名) */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="font-mono text-xs text-[#8C694D] font-bold shrink-0">
            {item.publishedDate.replace(/-/g, ".")}
          </span>

          <span className="px-2.5 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] font-mono font-bold text-[10px] uppercase rounded-full shrink-0">
            {item.category}
          </span>

          <span className="text-[#8C694D] font-sans text-[11px] font-bold shrink-0">
            [{item.channelName || item.sourceName}]
          </span>
        </div>

        {/* タイトル (可読幅制限 max-w-[680px] / 28〜36文字で自然折り返し) */}
        <h3 className="font-bold text-[#191919] text-sm sm:text-base group-hover:text-[#E99A32] transition-colors leading-snug font-sans max-w-[680px]">
          {hasValidUrl ? (
            <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>

        {/* 説明文 (可読幅制限 max-w-[640px] / 36〜48文字で自然折り返し) */}
        {item.description && (
          <p className="text-xs text-[#5C4533] leading-relaxed font-sans line-clamp-2 max-w-[640px]">
            {item.description}
          </p>
        )}
      </div>

      {/* 右端アクションボタン */}
      <div className="flex items-center gap-3 shrink-0 sm:pt-1">
        {hasValidRadikoUrl && (
          <a
            href={item.radikoURL!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] bg-[#FFF4C7] hover:bg-[#F6C744] text-[#5C4533] hover:text-[#191919] px-3 py-1 rounded-full font-bold transition-colors border border-[#F6C744]/60 shadow-2xs"
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
