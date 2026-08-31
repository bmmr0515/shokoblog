"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Disc,
  Radio,
  Clock,
  AlertCircle
} from "lucide-react";

export const NowPickupSection: React.FC = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // 2026年9月7日 23:59:59 (JST) を過ぎたら自動非表示
    const now = new Date();
    if (now > new Date("2026-09-07T23:59:59+09:00")) {
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
            <span>現在開催中・重要トピック (2026.08.31時点)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-wider font-mono text-[#191919]">
            NOW / PICK UP
          </h2>
        </div>

        <a
          href="https://www.fila.jp/contents/feature/fila_eley/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#E99A32] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>公式情報を見る ↗</span>
        </a>
      </div>

      {/* PC: 3カラム横並び / スマホ: 縦並びのコンパクトカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* ======================================================== */}
        {/* トピック 1: FILA 2026FW POP UP 阪急うめだ本店 (明日まで) */}
        {/* ======================================================== */}
        <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#E99A32] text-white font-mono font-extrabold text-[10px] rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3 text-white" />
                <span>明日まで</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.08.26 — 09.01</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              FILA 2026FW POP UP<br />阪急うめだ本店
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              瀧脇笙古ちゃんがスタイリングパートナーを務めるFILA 2026FW POP UPは、阪急うめだ本店で9月1日まで開催中。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">阪急うめだ8F GREEN AGE</span>
            <a
              href="https://www.fila.jp/contents/feature/fila_eley/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>FILA特集を見る ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 2: 21st SINGLE 店頭キャンペーン (本日まで) */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-[#E99A32] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#191919] text-[#F6C744] font-mono font-extrabold text-[10px] rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-[#F6C744]" />
                <span>基本本日まで</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">21st SINGLE</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              21st SINGLE 『恋、はじめました。』店頭キャンペーン
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              瀧脇笙古ちゃんソロ応援キャンペーン、全国パネル展など、基本実施期間は8月31日まで。（※店舗により期間が異なる場合があります）
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">※店舗により異なる場合あり</span>
            <a
              href="https://equal-love.jp/news/detail/11864"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>詳細 ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 3: Fm yokohama 「Tresen」 最新ゲスト生出演 */}
        {/* ======================================================== */}
        <div className="bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full flex items-center gap-1 border border-[#F6C744]/40">
                <Radio className="w-3 h-3 text-[#E99A32]" />
                <span>2026.08.27 GUEST</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#E99A32]">Fm yokohama</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              Fm yokohama「Tresen」ゲスト出演
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              ＝LOVEの瀧脇笙古ちゃんがFm yokohama「Tresen」にゲスト生出演！今回で番組最多<span className="text-[#191919] font-extrabold bg-[#FFF4C7] px-1 rounded">18回目</span>の登場となった最新出演公式記事。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">Tresen 番組公式ブログ</span>
            <a
              href="https://tresen.fmyokohama.jp/51060/"
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
