"use client";

import React, { useState } from "react";

interface HeroVideoPlayerProps {
  videoId?: string;
  className?: string;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  videoId = "T9kq0EVZgzY",
  className = "",
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&loop=1&playlist=${videoId}`;
  const fallbackThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
      }}
      className={`bg-black rounded-xl border border-gray-200/80 shadow-xs ${className}`}
    >
      {/* 2. 空白防止用 フォールバック高画質サムネイル (iframe ロード前/失敗時の全滅回避) */}
      <img
        src={fallbackThumb}
        alt="ヒーロー注目動画サムネイル"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: iframeLoaded ? 0 : 1,
          transition: "opacity 500ms ease-out",
        }}
      />

      {/* 1. 実際の <iframe> 要素 (必ずDOM内に描画) */}
      <iframe
        src={embedUrl}
        title="しょこらの部屋 注目映像"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setIframeLoaded(true)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
          pointerEvents: "auto",
        }}
      />
    </div>
  );
};
