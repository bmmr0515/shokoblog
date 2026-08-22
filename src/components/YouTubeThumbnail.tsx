"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeThumbnailProps {
  videoId: string;
  title: string;
  className?: string;
}

export const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({
  videoId,
  title,
  className = "",
}) => {
  // 画像URL試行順序リスト
  const qualities = [
    "maxresdefault",
    "sddefault",
    "hqdefault",
    "mqdefault",
    "default",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFailed, setIsFailed] = useState(false);

  const handleImgError = () => {
    if (currentIndex < qualities.length - 1) {
      // 次の解像度候補へフォールバック
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 全5種類の解像度で失敗した場合は画像領域自体を非表示（プレースホルダー全廃）
      setIsFailed(true);
    }
  };

  if (isFailed || !videoId) return null;

  const currentUrl = `https://i.ytimg.com/vi/${videoId}/${qualities[currentIndex]}.jpg`;

  return (
    <div className={`aspect-video relative rounded overflow-hidden bg-black block w-full shrink-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentUrl}
        alt={title}
        onError={handleImgError}
        loading="lazy"
        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
      />
      <span className="absolute inset-0 m-auto w-9 h-9 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        <Play className="w-4 h-4 fill-white ml-0.5" />
      </span>
    </div>
  );
};
