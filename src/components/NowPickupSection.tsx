"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Disc,
  Radio,
  Clock,
  AlertCircle,
  Tv,
  ShoppingBag,
  Trophy
} from "lucide-react";

export const NowPickupSection: React.FC = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const now = new Date();
    // 2026年12月31日 を過ぎたら自動非表示
    if (now > new Date("2026-12-31T23:59:59+09:00")) {
      setIsActive(false);
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
            <span>現在開催中・重要トピック (2026.11.20時点)</span>
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
        {/* トピック 1: 第77回NHK紅白歌合戦 初出場決定！ */}
        {/* ======================================================== */}
        <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#191919]" />
                <span>祝・初出場決定</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.11.13 発表</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              第77回NHK紅白歌合戦<br />＝LOVE 念願の初出場決定！
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              ＝LOVEが『第77回NHK紅白歌合戦』への初出場を果たすことが決定！初出場歌手発表記者会見には瀧脇笙古も登壇し、「みんなで夢を叶えることができて嬉しい」と感謝を語りました。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">NHK紅白歌合戦</span>
            <a
              href="https://equal-love.jp/news/detail/12408"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>公式ニュース ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 2: 年末大型音楽特番出演決定（ベストアーティスト & FNS歌謡祭） */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-[#E99A32] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#191919] text-[#F6C744] font-mono font-extrabold text-[10px] rounded-full flex items-center gap-1">
                <Tv className="w-3 h-3 text-[#F6C744]" />
                <span>大型特番出演</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">11.28 日テレ / 12.02 フジ</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              日テレ「ベストアーティスト」&<br />フジ「FNS歌謡祭 第1夜」出演！
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              日本テレビ系『ベストアーティスト2026』（11/28）およびフジテレビ系『2026 FNS歌謡祭 第1夜』（12/2）への生出演が決定。年末を彩る音楽特番でパフォーマンスを披露します。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">音楽番組出演情報</span>
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

        {/* ======================================================== */}
        {/* トピック 3: 東京ドーム単独公演 */}
        {/* ======================================================== */}
        <div className="bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full flex items-center gap-1 border border-[#F6C744]/40">
                <Disc className="w-3 h-3 text-[#E99A32]" />
                <span>2027年1月開催</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2027.01.16 — 01.17</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              ＝LOVE in TOKYO DOME<br />「全ては＝LOVE」
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              グループ結成以来の大きな目標であった東京ドーム単独公演の開催が決定。瀧脇笙古を含むメンバー全員で立つ憧れのステージに向けて期待が高まっています。
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

      </div>

    </section>
  );
};
