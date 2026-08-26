"use client";

import React, { useEffect, useState } from "react";
import {
  Disc,
  Calendar,
  MapPin,
  Gift,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShoppingBag
} from "lucide-react";

export const NowPickupSection: React.FC = () => {
  const [showSingle, setShowSingle] = useState(true);
  const [showFila, setShowFila] = useState(true);

  useEffect(() => {
    const now = new Date();
    // 21stシングル特集は 2026.09.07 終了
    if (now > new Date("2026-09-07T23:59:59+09:00")) {
      setShowSingle(false);
    }
    // FILA POP UPは 2026.09.01 終了
    if (now > new Date("2026-09-01T23:59:59+09:00")) {
      setShowFila(false);
    }
  }, []);

  // どちらも終了していればセクション非表示
  if (!showSingle && !showFila) return null;

  return (
    <section className="space-y-6">
      
      {/* 1. セクション共通ヘッダー ＆ 統一CTAボタン */}
      <div className="flex items-end justify-between border-b-2 border-[#191919] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5C4533]">
            <span className="px-2 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full uppercase">
              NOW OPEN
            </span>
            <span>現在開催中・重要トピック</span>
          </div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider font-mono text-[#191919]">
              NOW / PICK UP
            </h2>
          </div>
        </div>

        {/* 統一メインCTA */}
        <a
          href="https://equal-love.jp/news/detail/11864"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#E99A32] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>キャンペーン詳細を見る ↗</span>
        </a>
      </div>

      {/* 2. トピックコンテンツ */}
      <div className="space-y-6">
        
        {/* ======================================================== */}
        {/* A. ＝LOVE 21stシングル発売記念 瀧脇笙古ちゃん店頭企画 */}
        {/* ======================================================== */}
        {showSingle && (
          <div className="bg-white border border-[#F0E4CE] rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
            
            {/* 21st ヘッダー (コンパクト化) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E4CE] pb-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-2.5 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[11px] rounded-full flex items-center gap-1 border border-[#F6C744]/40">
                  <Disc className="w-3.5 h-3.5 text-[#E99A32]" />
                  <span>2026.08.26 RELEASE</span>
                </span>
                <h3 className="text-lg sm:text-xl font-maru font-extrabold text-[#191919]">
                  21st SINGLE 『恋、はじめました。』発売!!
                </h3>
              </div>

              <span className="text-xs font-sans text-[#8C694D] font-bold shrink-0">
                瀧脇笙古ちゃん 店頭企画まとめ
              </span>
            </div>

            {/* 4つのコンパクト情報タイル (優先順位: 1.横浜ビブレ ➔ 2.ソロ応援 ➔ 3.渋谷 ➔ 4.全国) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              {/* 1. 横浜ビブレ店 (最優先・ほんのり強調) */}
              <div className="bg-[#FFF9ED] border-2 border-[#F6C744] p-3.5 rounded-xl space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[9px] rounded uppercase">
                      SPECIAL
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#8C694D]">8/25 - 8/31</span>
                  </div>
                  <h4 className="font-maru font-extrabold text-sm text-[#191919]">
                    横浜ビブレ店 特別企画
                  </h4>
                  <p className="text-[11px] text-[#5C4533] font-bold leading-tight font-sans">
                    コラボポスター / サイン色紙 / コメントPOP展示 ＆ <span className="underline decoration-[#F6C744]">サイン入りPOP抽選</span>！
                  </p>
                </div>
                <div className="pt-1 text-[10px] font-mono text-[#8C694D] border-t border-[#F0E4CE]">
                  ※引換: 9/2 - 9/23
                </div>
              </div>

              {/* 2. タワーレコード ソロ応援 */}
              <div className="bg-white border border-[#F0E4CE] p-3.5 rounded-xl space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#E99A32] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>ソロ応援</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#8C694D]">8/25 - 8/31</span>
                  </div>
                  <h4 className="font-maru font-extrabold text-sm text-[#191919]">
                    ソロ応援キャンペーン
                  </h4>
                  <p className="text-[11px] text-[#5C4533] font-bold leading-tight font-sans">
                    ソロレシート発行 / 限定コメント映像 / ソロポストカード先着配布（横浜ビブレ/新潟/東浦/京都）
                  </p>
                </div>
                <div className="pt-1 text-[10px] font-mono text-[#8C694D] border-t border-[#F0E4CE]">
                  ※タワーレコード4店舗
                </div>
              </div>

              {/* 3. 渋谷キャンペーン */}
              <div className="bg-white border border-[#F0E4CE] p-3.5 rounded-xl space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#E99A32] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>タワレコ渋谷</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#8C694D]">8/25 - 9/7</span>
                  </div>
                  <h4 className="font-maru font-extrabold text-sm text-[#191919]">
                    渋谷エリア展開
                  </h4>
                  <p className="text-[11px] text-[#5C4533] font-bold leading-tight font-sans">
                    コメント映像 / POPパネル展示＆抽選 / 渋谷エリア3店舗スタンプラリー開催！
                  </p>
                </div>
                <div className="pt-1 text-[10px] font-mono text-[#8C694D] border-t border-[#F0E4CE]">
                  ※タワーレコード渋谷店
                </div>
              </div>

              {/* 4. 全国パネル展 */}
              <div className="bg-white border border-[#F0E4CE] p-3.5 rounded-xl space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#E99A32] flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      <span>全国ショップ</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#8C694D]">8/25 - 8/31</span>
                  </div>
                  <h4 className="font-maru font-extrabold text-sm text-[#191919]">
                    全国パネル展
                  </h4>
                  <p className="text-[11px] text-[#5C4533] font-bold leading-tight font-sans">
                    全国CDショップにて『恋、はじめました。』発売記念パネル展 ＆ 展示パネル抽選プレゼント実施！
                  </p>
                </div>
                <div className="pt-1 text-[10px] font-mono text-[#8C694D] border-t border-[#F0E4CE]">
                  ※対象店舗は公式HPへ
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* B. FILA 2026FW POP UP (コンパクトPOP UP告知帯) */}
        {/* ======================================================== */}
        {showFila && (
          <div className="bg-[#FFF9ED] border border-[#F5ECD8] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#F6C744] text-[#191919] font-mono font-black text-[10px] rounded-full uppercase">
                  NOW OPEN
                </span>
                <span className="text-xs font-mono font-bold text-[#5C4533]">
                  2026.08.26 WED — 09.01 TUE
                </span>
              </div>
              <h3 className="font-maru font-extrabold text-base sm:text-lg text-[#191919]">
                FILA 2026FW POP UP 阪急うめだ本店 8F「GREEN AGE」で開催中
              </h3>
              <p className="text-xs text-[#5C4533] font-bold font-sans">
                瀧脇笙古ちゃん着用アイテム・最新コレクションを展開。購入者限定フォトカードキャンペーン実施中！
              </p>
            </div>

            <a
              href="https://www.fila.jp/contents/feature/fila_eley/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#191919] hover:bg-[#5C4533] text-white font-maru font-bold text-xs rounded-lg transition-colors shrink-0 inline-flex items-center gap-1 justify-center"
            >
              <span>POP UP詳細 ↗</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
};
