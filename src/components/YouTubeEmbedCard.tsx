"use client";

import React from "react";
import { LinkItem } from "@/types/blog";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { ExternalLink } from "lucide-react";

interface YouTubeEmbedCardProps {
  item: LinkItem;
}

export const YouTubeEmbedCard: React.FC<YouTubeEmbedCardProps> = ({ item }) => {
  const targetUrl = item.youtubeURL || item.sourceURL;
  // youtubeURLからのみvideoIdをパース（URL以外から推測しない）
  const videoId = extractYouTubeVideoId(targetUrl) || item.videoId;

  // videoIdが正しく取得できない、またはtargetUrlが存在しない場合は表示しない（不正URL対策）
  if (!videoId || videoId.length !== 11 || !targetUrl) return null;

  const channel = item.channelName || item.sourceName;

  return (
    <div className="border border-gray-200 p-3.5 space-y-3 bg-white rounded-lg shadow-sm">
      {/* 1. YouTube 公式 iframe 埋め込み (16:9 アスペクト比 & loading="lazy" 必須) */}
      <div className="aspect-video relative rounded overflow-hidden bg-black block w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={item.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* 2. 日付・カテゴリー・タイトル・チャンネル名・YouTubeで見るリンク */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
          <span className="font-mono text-gray-700">{item.publishedDate}</span>
          <span className="px-2 py-0.5 bg-red-50 text-red-700 font-bold rounded text-[10px]">
            {item.category}
          </span>
        </div>

        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug">
          {item.title}
        </h3>

        <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px]">
          <span className="font-bold text-gray-700 line-clamp-1">{channel}</span>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-red-600 hover:underline shrink-0 flex items-center gap-0.5"
          >
            <span>YouTubeで見る</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
