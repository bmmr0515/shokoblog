"use client";

import React from "react";
import { LinkItem } from "@/types/blog";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { YouTubeThumbnail } from "@/components/YouTubeThumbnail";
import { ExternalLink } from "lucide-react";

interface YouTubeCardProps {
  item: LinkItem;
}

export const YouTubeCard: React.FC<YouTubeCardProps> = ({ item }) => {
  const targetUrl = item.youtubeURL || item.sourceURL;
  // 保存済みvideoIdに依存せず、youtubeURLから常に再計算
  const videoId = extractYouTubeVideoId(targetUrl) || item.videoId || "";
  const channel = item.channelName || item.sourceName;

  const isValidUrl =
    targetUrl &&
    targetUrl.trim() !== "" &&
    targetUrl !== "#" &&
    !targetUrl.startsWith("javascript:") &&
    (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"));

  if (!isValidUrl) return null;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group border border-gray-200 p-3.5 space-y-3 hover:bg-gray-50/90 transition-colors block cursor-pointer select-none bg-white rounded-lg shadow-sm"
    >
      {/* 共通の YouTubeThumbnail コンポーネントを使用（多段階フォールバック内蔵） */}
      {videoId && (
        <YouTubeThumbnail videoId={videoId} title={item.title} />
      )}

      {/* 動画テキスト・メタ情報 */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
          <span className="font-mono text-gray-700">{item.publishedDate}</span>
          <span className="px-2 py-0.5 bg-red-50 text-red-700 font-bold rounded text-[10px]">
            {item.category}
          </span>
        </div>

        <h4 className="font-bold text-sm text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug flex items-start gap-1">
          <span>{item.title}</span>
          <ExternalLink className="w-3.5 h-3.5 text-orange-600 shrink-0 opacity-80 mt-0.5" />
        </h4>

        <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px]">
          <span className="font-bold text-gray-700 line-clamp-1">{channel}</span>
          <span className="font-bold text-red-600 group-hover:underline shrink-0 flex items-center gap-0.5">
            <span>YouTubeで見る ↗</span>
          </span>
        </div>
      </div>
    </a>
  );
};
