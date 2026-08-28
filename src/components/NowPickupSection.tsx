"use client";

import React, { useEffect, useState } from "react";
import {
  Ticket,
  Tv,
  Gift,
  Disc,
  Sparkles,
  Radio
} from "lucide-react";

export const NowPickupSection: React.FC = () => {
  const [mode, setMode] = useState<"today_news" | "campaign">("today_news");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const now = new Date();
    // 2026-08-28 23:59:59 (JST) までは本日最新ニュースを表示
    const todayEnd = new Date("2026-08-28T23:59:59+09:00");
    // 2026-09-07 23:59:59 (JST) まではキャンペーンを表示
    const campaignEnd = new Date("2026-09-07T23:59:59+09:00");

    if (now <= todayEnd) {
      setMode("today_news");
    } else if (now <= campaignEnd) {
      setMode("campaign");
    } else {
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
            <span>本日開催・最新トピック</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-wider font-mono text-[#191919]">
            NOW / PICK UP
          </h2>
        </div>

        <a
          href="https://equal-love.jp/news/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#E99A32] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>公式NEWSを見る ↗</span>
        </a>
      </div>

      {mode === "today_news" ? (
        /* ======================================================== */
        /* 本日 (2026.08.28) 最新ニュース 3件コンパクト表示 */
        /* ======================================================== */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. 9th ANNIVERSARY PREMIUM CONCERT FC2次先行 当落日 */}
          <div className="bg-white border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full border border-[#F6C744]/40 flex items-center gap-1">
                  <Ticket className="w-3 h-3 text-[#E99A32]" />
                  <span>2026.08.28</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-[#E99A32]">FC2次先行</span>
              </div>

              <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
                9th ANNIVERSARY PREMIUM CONCERT FC2次先行 当落日
              </h3>

              <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
                ＝LOVE 9周年コンサート「＝LOVE 9th ANNIVERSARY PREMIUM CONCERT」（10月15日・16日 TOYOTA ARENA TOKYO）FC2次先行の当落発表日です。
              </p>
            </div>

            <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-[10px] text-[#8C694D]">公演：10/15・10/16</span>
              <a
                href="https://equal-love.jp/news/detail/11840"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
              >
                <span>公式詳細 ↗</span>
              </a>
            </div>
          </div>

          {/* 2. 本日Mステ出演 */}
          <div className="bg-[#FFF9ED] border-2 border-[#E99A32] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-[#E99A32] text-white font-mono font-bold text-[10px] rounded-full flex items-center gap-1">
                  <Tv className="w-3 h-3 text-white" />
                  <span>2026.08.28 (金)</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-[#191919] bg-[#FFF4C7] px-1.5 py-0.5 rounded">21:00〜21:54</span>
              </div>

              <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
                テレビ朝日「Mステ」出演！
              </h3>

              <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
                ＝LOVEがテレビ朝日系「ミュージックステーション」に出演。新曲『恋、はじめました。』を生披露します！
              </p>
            </div>

            <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-[10px] text-[#8C694D]">テレビ朝日系 21:00〜</span>
              <a
                href="https://sp.equal-love.jp/news/detail/11826"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
              >
                <span>公式詳細 ↗</span>
              </a>
            </div>
          </div>

          {/* 3. 21stシングル スペシャルプレゼント当選発表 (サンリオ) */}
          <div className="bg-white border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full border border-[#F6C744]/40 flex items-center gap-1">
                  <Gift className="w-3 h-3 text-[#E99A32]" />
                  <span>2026.08.28</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-[#E99A32]">当選発表日</span>
              </div>

              <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
                本日当選発表 (＝LOVE × サンリオ)
              </h3>

              <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
                21stシングル『恋、はじめました。』発売記念。9月2日開催「＝LOVE サンリオキャラクタースペシャルライブ」の当選発表日です。
              </p>
            </div>

            <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-[10px] text-[#8C694D]">開催：9月2日</span>
              <a
                href="https://equal-love.jp/news/detail/11602"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-0.5"
              >
                <span>公式詳細 ↗</span>
              </a>
            </div>
          </div>

        </div>
      ) : (
        /* ======================================================== */
        /* 2026-08-29 以降の常設キャンペーン表示 */
        /* ======================================================== */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* トピック 1: ＝LOVE 21stシングル発売店頭企画 */}
          <div className="bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full border border-[#F6C744]/40 flex items-center gap-1">
                  <Disc className="w-3 h-3 text-[#E99A32]" />
                  <span>2026.08.26 RELEASE</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-[#8C694D]">8/25 - 9/7</span>
              </div>

              <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
                21st SINGLE 『恋、はじめました。』発売記念
              </h3>

              <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
                横浜ビブレ店特別企画（直筆サイン色紙＆POP展示、抽選）をはじめ、タワレコ各店ソロ応援、渋谷、全国パネル展を開催中！
              </p>
            </div>

            <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-[10px] text-[#8C694D]">※横浜ビブレ特別展示中</span>
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

          {/* トピック 2: FILA × 瀧脇笙古 追加開催決定！ */}
          <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-4 rounded-xl space-y-2.5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#191919]" />
                  <span>追加開催決定！</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-[#E99A32]">FILA 2026FW</span>
              </div>

              <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919] leading-snug">
                FILA × 瀧脇笙古<br />就任記念キャンペーン 追加開催決定！
              </h3>

              <p className="text-xs text-[#5C4533] font-bold leading-relaxed font-sans">
                阪急うめだ本店に加え、<span className="text-[#191919] font-extrabold bg-[#FFF4C7] px-1 rounded">渋谷PARCO</span>・<span className="text-[#191919] font-extrabold bg-[#FFF4C7] px-1 rounded">東京ソラマチ</span>のPOP UPでもキャンペーン実施が決定しました。
              </p>

              <div className="text-[10px] text-[#8C694D] font-sans leading-tight space-y-0.5 pt-0.5">
                <div>・ノベルティはなくなり次第終了</div>
                <div>・阪急うめだ本店POP UPとは取り扱いアイテムが一部異なる</div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F0E4CE] flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-[10px] text-[#8C694D]">3会場で開催中</span>
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

          {/* トピック 3: Fm yokohama 「Tresen」 最新ゲスト生出演 */}
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
      )}

    </section>
  );
};
