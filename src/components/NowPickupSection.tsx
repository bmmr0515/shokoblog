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
    // 2026年11月1日 (阪急WEBキャンペーン終了翌日) を過ぎたら自動非表示
    const now = new Date();
    if (now > new Date("2026-11-01T00:00:00+09:00")) {
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
            <span>現在開催中・重要トピック (2026.09.24時点)</span>
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
        {/* トピック 1: フジテレビONE「プロ野球ニュース」出演 */}
        {/* ======================================================== */}
        <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full flex items-center gap-1">
                <Tv className="w-3 h-3 text-[#191919]" />
                <span>本日出演</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">フジテレビONE</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              「プロ野球ニュース」出演
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              フジテレビONE「プロ野球ニュース」に瀧脇笙古、山本杏奈が出演予定。
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
              <span>スケジュール ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 2: 集英社「Myojo 11月号」瀧脇笙古 掲載 */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-[#E99A32] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#191919] text-[#F6C744] font-mono font-extrabold text-[10px] rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#F6C744]" />
                <span>本日発売 / 掲載</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.09.24</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              「Myojo 11月号」<br />瀧脇笙古 掲載
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              2026年9月24日発売の「Myojo 11月号」に掲載。企画名「＝LOVEとヒミツのGIRL’S TALK 瀧脇笙古」。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">集英社 / Myojo</span>
            <a
              href="https://dmagazine.docomo.ne.jp/item/f19bfd22d643183b8a3e3546bab270d70dcf6c2f461aec35fdce5e3833c20860/1000/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>掲載ページ ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 3: FC限定 バースデーインタビュー公開 */}
        {/* ======================================================== */}
        <div className="bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full flex items-center gap-1 border border-[#F6C744]/40">
                <Clock className="w-3 h-3 text-[#E99A32]" />
                <span>会員限定</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.09.18</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              バースデーインタビュー公開<br />生誕記念コンテンツ更新
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              生誕記念特設サイトでバースデーインタビュー・集合写真・ダイジェスト動画が公開。（※FC会員ログイン要）
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">＝LOVE Official FC</span>
            <a
              href="https://equal-love.jp/news/detail/11963"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>FC告知 ↗</span>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
