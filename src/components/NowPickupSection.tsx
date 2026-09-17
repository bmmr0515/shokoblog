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
            <span>現在開催中・重要トピック (2026.09.17時点)</span>
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
        {/* トピック 1: 本日「バズリズム02」放送（中京テレビ 深夜2:12〜） */}
        {/* ======================================================== */}
        <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full flex items-center gap-1">
                <Tv className="w-3 h-3 text-[#191919]" />
                <span>本日深夜 2:12〜</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">中京テレビ</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              「バズリズム02」放送
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              瀧脇笙古出演回の「バズリズム02」が中京テレビにて放送予定（深夜2:12〜）。
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
        {/* トピック 2: FILA × 瀧脇笙古 キャンペーン継続中 */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-[#E99A32] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#191919] text-[#F6C744] font-mono font-extrabold text-[10px] rounded-full flex items-center gap-1">
                <ShoppingBag className="w-3 h-3 text-[#F6C744]" />
                <span>ONLINE継続中</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">阪急WEB / FILA公式</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              FILA × 瀧脇笙古<br />キャンペーン継続中
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              スタイリングパートナー就任記念キャンペーンを継続中。阪急百貨店オンライン（〜10/31）およびFILA公式ストアでノベルティ実施中。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">PR TIMES / FILA</span>
            <a
              href="https://prtimes.jp/main/html/rd/p/000000100.000022172.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
            >
              <span>公式プレス ↗</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* トピック 3: 日刊スポーツ ハマスタ観戦記事 */}
        {/* ======================================================== */}
        <div className="bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between transition-colors">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full flex items-center gap-1 border border-[#F6C744]/40">
                <Clock className="w-3 h-3 text-[#E99A32]" />
                <span>最新単独記事</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#8C694D]">2026.09.11</span>
            </div>

            <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
              土砂降りのハマスタに瀧脇笙古<br />DeNA勝利を現地観戦
            </h3>

            <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
              瀧脇笙古が9月9日のDeNA戦を現地観戦。「木漏れ日メゾフォルテ」や石田裕太郎投手の登板に触れた日刊スポーツの取材記事。
            </p>
          </div>

          <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[10px] text-[#8C694D]">日刊スポーツ</span>
            <a
              href="https://www.nikkansports.com/entertainment/news/202609100001009.html"
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
