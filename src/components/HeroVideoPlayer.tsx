"use client";

import React from "react";

interface HeroVideoPlayerProps {
  videoId?: string;
  className?: string;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  videoId = "T9kq0EVZgzY",
  className = "",
}) => {
  // 指定されたパラメータ付きの公式組み込み URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?si=or3llUFGc63K_jhE&controls=0&autoplay=1&mute=1&playsinline=1`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
      }}
      className={`bg-black rounded-xl border border-gray-200/80 shadow-2xs ${className}`}
    >
      {/* 指定された YouTube iframe を JSX 正式記法で直接描画 */}
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
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
