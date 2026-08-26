"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, MapPin, Calendar, Sparkles } from "lucide-react";

export const FilaPopUpBanner: React.FC = () => {
  // デフォルト true で確実にバナーを初回レンダリング
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // 終了日時の判定: 2026年9月1日 23:59:59 (JST)
    // 実機ブラウザの年数差に左右されず、終了日時を明確に過ぎた場合のみ非表示にする
    const now = new Date();
    const expiryDate = new Date("2026-09-01T23:59:59+09:00");

    if (now > expiryDate) {
      setIsActive(false);
    }
  }, []);

  // 2026年9月2日以降は自動で非表示
  if (!isActive) return null;

  return (
    <div className="w-full bg-[#FFF9ED] border-2 border-[#F6C744] rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* 左側: ステータス ＆ イベント大見出し */}
        <div className="space-y-2 lg:max-w-[420px]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-bold text-[10px] sm:text-xs rounded-full uppercase flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#191919]" />
              <span>NOW OPEN // 開催中</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#E99A32]">
              FILA 2026FW
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-maru font-extrabold text-[#191919] leading-snug">
            FILA 2026FW POP UP<br className="hidden sm:inline" /> 阪急うめだ本店で開催中
          </h3>
        </div>

        {/* 中央: 期間・場所・キャンペーン本文 */}
        <div className="flex-1 space-y-2.5 border-y lg:border-y-0 lg:border-x border-[#F0E4CE] py-4 lg:py-0 lg:px-8 text-xs font-sans">
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono font-bold text-[#5C4533]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#E99A32]" />
              <span>2026.08.26 WED — 09.01 TUE</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E99A32]" />
              <span>阪急うめだ本店 8F 「GREEN AGE」コトコトステージ81</span>
            </div>
          </div>

          <p className="text-xs text-[#5C4533] font-bold leading-relaxed">
            FILA 2026FWのスタイリングパートナーを務める瀧脇笙古ちゃんの着用アイテムを含む最新コレクションが展開されています。購入者限定のフォトカードキャンペーンも実施中です。
          </p>
        </div>

        {/* 右側: 公式詳細ページへのCTAボタン */}
        <div className="shrink-0 pt-1 lg:pt-0">
          <a
            href="https://www.fila.jp/contents/feature/fila_eley/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto px-6 py-3 bg-[#191919] hover:bg-[#5C4533] text-white font-maru font-extrabold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2 shadow-2xs group"
          >
            <span>POP UPの詳細を見る ↗</span>
            <ExternalLink className="w-4 h-4 text-[#F6C744] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
};
