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

  useEffect(() => {
    // 2026年10月6日 (ソラマチPOP UP終了翌日) を過ぎたら自動非表示
    const now = new Date();
    if (now > new Date("2026-10-06T00:00:00+09:00")) {
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
            <span>現在開催中・重要トピック (2026.10.02時点)</span>
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
        {/* トピック 1: 10/3 21st SINGLE 個別お話し会 */}
        {/* ======================================================== */}
        <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#191919]" />
                <span>10.03 開催</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.10.03</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              21st SINGLE<br />個別お話し会
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              ＝LOVE 21stシングル発売記念 個別お話し会が10月3日に開催。瀧脇笙古も参加。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">＝LOVE Official</span>
            <a
              href="https://equal-love.jp/news/detail/11646"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>詳細を見る ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 2: FILA POP UP 東京ソラマチ 10月5日まで */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-[#E99A32] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#191919] text-[#F6C744] font-mono font-extrabold text-[10px] rounded-full flex items-center gap-1">
                <ShoppingBag className="w-3 h-3 text-[#F6C744]" />
                <span>10/5まで開催中</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">東京ソラマチ</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              FILA POP UP<br />東京ソラマチ
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              瀧脇笙古がスタイリングパートナーを務めるFILA POP UPが東京ソラマチで10月5日まで開催中。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">FILA JAPAN</span>
            <a
              href="https://www.fila.jp/contents/feature/fila_takiwaki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>特設サイト ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 3: モデルプレス 白のミニワンピコーデ披露 */}
        {/* ======================================================== */}
        <div className="bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full flex items-center gap-1 border border-[#F6C744]/40">
                <Sparkles className="w-3 h-3 text-[#E99A32]" />
                <span>最新ニュース</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.09.30</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              白のミニワンピコーデ披露<br />モデルプレス紹介
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              瀧脇笙古がInstagramで公開した白のミニワンピース姿がモデルプレス・ライブドアニュースで紹介。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">モデルプレス</span>
            <a
              href="https://news.livedoor.com/article/detail/32451061/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>記事を読む ↗</span>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
