"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export interface AdSenseAdProps {
  client?: string;
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  label?: string;
}

/**
 * Google AdSense 広告表示用共通コンポーネント
 * 
 * 方針:
 * - slot または client が未設定の場合は何も描画しない (return null)
 * - 未設定時に空の広告枠・プレースホルダー・高さを一切残さない
 * - 広告表示時のみ「広告」などの控えめなラベルを表示
 * - React Strict Modeや再レンダリングによる二重 push を防止
 * - try/catch によるエラー隔離でサイト本体への影響を防止
 */
export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT,
  slot,
  format = "auto",
  responsive = true,
  className = "",
  label = "広告",
}) => {
  const isPushed = useRef(false);

  useEffect(() => {
    // クライアントIDまたはスロットIDが未設定の場合は何もしない
    if (!client || !slot) return;
    if (isPushed.current) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      }
    } catch (e) {
      // 広告ブロッカーやAdSenseスクリプト未読込時のエラーを安全に隔離
      console.warn("AdSense push initialization skipped or failed:", e);
    }
  }, [client, slot]);

  // slot または client が未設定の場合は何も描画しない
  if (!client || !slot || slot.trim() === "") {
    return null;
  }

  return (
    <div className={`my-8 py-4 px-2 text-center bg-[#FCFAF6] border-y border-zinc-200/70 rounded-md overflow-hidden ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-2 select-none">
        <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
          {label || "広告"}
        </span>
        <span className="text-[9px] text-zinc-300 font-mono tracking-wider uppercase">
          / ADVERTISEMENT
        </span>
      </div>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};
