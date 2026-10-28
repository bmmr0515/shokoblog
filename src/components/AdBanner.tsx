"use client";

import React from "react";
import { AdSettings } from "@/types/blog";
import { AdSenseAd } from "./ads/AdSenseAd";

interface AdBannerProps {
  type?: keyof Omit<AdSettings, "enabled">;
  slot?: string;
  className?: string;
}

/**
 * 広告表示ラッパーコンポーネント
 * スロットIDが設定されていない場合は何も描画しません（return null）。
 */
export const AdBanner: React.FC<AdBannerProps> = ({ type, slot, className }) => {
  const targetSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLES || process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME;
  return <AdSenseAd slot={targetSlot} className={className} />;
};
