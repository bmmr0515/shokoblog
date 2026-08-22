"use client";

import React from "react";
import { LinkItem } from "@/types/blog";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { YouTubeThumbnail } from "@/components/YouTubeThumbnail";
import { ExternalLink, Bookmark } from "lucide-react";

interface ArticleCardProps {
  item: LinkItem;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ item }) => {
  const targetUrl = item.youtubeURL || item.sourceURL;
  const isYoutube = item.contentType === "youtube" || !!item.youtubeURL || item.category === "YouTube";

  // youtubeURLから常に再計算
  const videoId = isYoutube ? (extractYouTubeVideoId(targetUrl) || item.videoId || null) : null;

  // 正確な実在ピンポイントURLが存在するかチェック
  const isValidUrl =
    targetUrl &&
    targetUrl.trim() !== "" &&
    targetUrl !== "#" &&
    !targetUrl.startsWith("javascript:") &&
    (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"));

  // ==========================================
  // CASE A: sourceURL / youtubeURL が null / 未設定の場合（掲載記録・完全非リンク表示）
  // ユーザー要件: リンク/href/クリックイベントは一切設定せず、日付・タイトル・媒体名・ステータス・補足を表示
  // ==========================================
  if (!isValidUrl) {
    return (
      <div className="py-4 border-b border-gray-200 select-text bg-gray-50/50 rounded-lg p-4 my-2 border-l-4 border-l-amber-400">
        <div className="space-y-2 w-full">
          {/* Published Date & Status Badge & Category & Media */}
          <div className="flex items-center gap-2.5 flex-wrap text-xs text-gray-500 font-medium">
            <span className="font-mono text-gray-700 font-semibold">{item.publishedDate}</span>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-[11px] flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-amber-700" />
              掲載記録 (非リンク)
            </span>
            <span className="px-2 py-0.5 bg-gray-200/80 text-gray-700 font-medium rounded text-[11px]">
              {item.category}
            </span>
            <span className="font-bold text-gray-800">
              媒体名: {item.channelName || item.sourceName}
            </span>
          </div>

          {/* Title (リンクなし・クリック不可) */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
            {item.title}
          </h3>

          {/* 補足・説明テキスト */}
          {item.description && (
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-white/80 p-2.5 rounded border border-gray-100">
              {item.description}
            </p>
          )}

          {/* Tags Footer */}
          <div className="pt-1 flex items-center gap-1.5 flex-wrap text-xs text-gray-500">
            {item.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CASE B: 正しいピンポイント元URLが存在する場合（直通外部リンク表示）
  // ==========================================
  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block py-4 border-b border-gray-200 hover:bg-gray-50/80 transition-colors cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* YouTubeの場合は共通 YouTubeThumbnail コンポーネントを使用 */}
        {isYoutube && videoId && (
          <YouTubeThumbnail videoId={videoId} title={item.title} className="w-full sm:w-44" />
        )}

        {/* Text Content Block */}
        <div className="flex-1 space-y-1.5 w-full">
          {/* Published Date & Category & Media */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-3">
              <span className="font-mono text-gray-700">{item.publishedDate}</span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-[11px]">
                {item.category}
              </span>
              <span className="font-bold text-gray-800 flex items-center gap-0.5">
                <span>{item.channelName || item.sourceName}</span>
                <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-orange-600" />
              </span>
            </div>

            <span className="font-bold text-orange-600 group-hover:underline flex items-center gap-0.5 shrink-0">
              <span>{isYoutube ? "YouTubeで見る ↗" : "記事を読む ↗"}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors flex items-baseline gap-1">
            <span>{item.title}</span>
            <ExternalLink className="w-3.5 h-3.5 text-orange-600 shrink-0 opacity-80" />
          </h3>

          {/* 紹介文 */}
          {item.description && (
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Tags Footer */}
          <div className="pt-1 flex items-center gap-1.5 flex-wrap text-xs text-gray-500">
            {item.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-gray-500 font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};
