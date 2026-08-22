"use client";

import React from "react";
import { AdSettings } from "@/types/blog";

interface AdBannerProps {
  type?: keyof Omit<AdSettings, "enabled">;
  className?: string;
}

/**
 * 広告表示コンポーネント
 * 現在はユーザー方針に従い、サイト内に一切の広告・広告枠・プレースホルダー・余白を表示しません。
 */
export const AdBanner: React.FC<AdBannerProps> = () => {
  // 現段階では完全に広告を非表示 (null) に統一
  return null;
};
