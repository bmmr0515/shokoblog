"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Disc,
  Radio,
  Clock,
  AlertCircle,
  Tv,
  ShoppingBag
} from "lucide-react";

export const NowPickupSection: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [isFcActive, setIsFcActive] = useState(true);

  useEffect(() => {
    const now = new Date();
    // 2026年11月15日 を過ぎたら自動非表示
    if (now > new Date("2026-11-15T23:59:59+09:00")) {
      setIsActive(false);
    }
    // 11月2日以降は東京ドームFC「受付中」表示を自動で外す
    if (now > new Date("2026-11-01T23:59:59+09:00")) {
      setIsFcActive(false);
    }
  }, []);

  if (!isActive) return null;

  return (
    <section className="space-y-4">
      
      {/* セクション共通ヘッダー */}
      <div className="flex items-end justify-between border-b-2 border-[#191919] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5C4533]">
            <span className="px-2 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full uppercase">
              NOW / PICK UP
            </span>
            <span>現在開催中・重要トピック (2026.10.27時点)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-wider font-mono text-[#191919]">
            NOW / PICK UP
          </h2>
        </div>

        <a
          href="https://equal-love.jp/schedule/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#E99A32] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>公式スケジュール ↗</span>
        </a>
      </div>

      {/* PC: 3カラム横並び / スマホ: 縦並びのコンパクトカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* ======================================================== */}
        {/* トピック 1: 東京ドーム公演 FC先行受付 (11/1まで) */}
        {/* ======================================================== */}
        <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#191919]" />
                <span>{isFcActive ? "FC先行受付中" : "FC先行受付終了"}</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.10.26 — 11.01</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              ＝LOVE in TOKYO DOME<br />FC先行受付スタート
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              2027年1月開催の東京ドーム公演「全ては＝LOVE」FC先行受付中（11月1日 23:59まで）。瀧脇笙古も出演。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">東京ドーム公演</span>
            <a
              href="https://equal-love.jp/news/detail/12299"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>公式ニュース ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 2: 日本シリーズ第1戦・第2戦 ハマスタ現地観戦 */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-[#E99A32] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#191919] text-[#F6C744] font-mono font-extrabold text-[10px] rounded-full flex items-center gap-1">
                <Disc className="w-3 h-3 text-[#F6C744]" />
                <span>最新記事 / 現地観戦</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.10.25 — 10.26</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              日本シリーズ2連戦<br />ハマスタ現地観戦
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              瀧脇笙古が日本シリーズ第1戦・第2戦を横浜スタジアムで現地観戦。2日連続でDeNAを応援した様子が話題に。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">Full-Count / 日刊スポーツ</span>
            <a
              href="https://full-count.jp/2026/10/26/post2036620/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>記事を読む ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 3: 直近ライブ予定（本日 名古屋 / 明日 東京ドーム） */}
        {/* ======================================================== */}
        <div className="bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full flex items-center gap-1 border border-[#F6C744]/40">
                <Clock className="w-3 h-3 text-[#E99A32]" />
                <span>直近ライブ予定</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">10.28 名古屋 / 10.29 東京D</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              21st 名古屋ライブ &<br />MTV VMAJ 2026
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              本日10/28中日ホールにて名古屋スペシャルライブ開催。明日10/29は東京ドームにて「MTV VMAJ 2026」に出演予定。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">＝LOVE Official</span>
            <a
              href="https://equal-love.jp/schedule/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>公式スケジュール ↗</span>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
