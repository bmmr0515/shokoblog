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
            <span>現在開催中・重要トピック (2026.09.04時点)</span>
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
        {/* トピック 1: 本日深夜「バズリズム02」出演 */}
        {/* ======================================================== */}
        <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full flex items-center gap-1">
                <Tv className="w-3 h-3 text-[#191919]" />
                <span>本日深夜 24:59〜</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">日本テレビ</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              本日深夜「バズリズム02」出演
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              ＝LOVEが日本テレビ「バズリズム02」に出演予定（深夜24:59〜）。瀧脇笙古も出演メンバーとして掲載されています。
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

        {/* ======================================================== */}
        {/* トピック 2: 「恋、はじめました。」渋谷応援キャンペーン開催中 (9月7日まで) */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-[#E99A32] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#191919] text-[#F6C744] font-mono font-extrabold text-[10px] rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#F6C744]" />
                <span>9月7日まで</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.08.25 — 09.07</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              「恋、はじめました。」<br />渋谷応援キャンペーン開催中
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              タワーレコード渋谷では、齋藤樹愛羅・瀧脇笙古・野口衣織を対象に、撮り下ろしコメント映像、直筆POPパネル展示・抽選、渋谷3店舗スタンプラリーを実施中。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">タワーレコード渋谷</span>
            <a
              href="https://equal-love.jp/news/detail/11864"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>公式ニュース ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 3: 瀧脇笙古 直筆コメント入りPOP 当選者引き換え期間 */}
        {/* ======================================================== */}
        <div className="bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full flex items-center gap-1 border border-[#F6C744]/40">
                <ShoppingBag className="w-3 h-3 text-[#E99A32]" />
                <span>当選者引き換え期間</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.09.02 — 09.23</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              瀧脇笙古 直筆POP<br />当選者引き換え期間
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              タワーレコード横浜ビブレ店で実施された瀧脇笙古応援キャンペーンの当選POP引き換え期間は9月23日まで。（※抽選受付終了済み）
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">タワレコ横浜ビブレ</span>
            <a
              href="https://equal-love.jp/news/detail/11864"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>詳細案内 ↗</span>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
