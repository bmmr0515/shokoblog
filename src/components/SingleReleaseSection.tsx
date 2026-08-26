"use client";

import React, { useEffect, useState } from "react";
import {
  ExternalLink,
  Disc,
  Calendar,
  MapPin,
  Sparkles,
  Gift,
  PlayCircle,
  Frame,
  CheckCircle2,
  Tag,
  Star,
  Ticket
} from "lucide-react";

export const SingleReleaseSection: React.FC = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // 2026年9月7日 23:59:59 (JST) を過ぎたらトップの大型特集を自動非表示
    const now = new Date();
    const expiryDate = new Date("2026-09-07T23:59:59+09:00");

    if (now > expiryDate) {
      setIsActive(false);
    }
  }, []);

  if (!isActive) return null;

  return (
    <section className="w-full bg-[#FFFDF7] border-2 border-[#F6C744] rounded-3xl p-6 sm:p-9 lg:p-11 space-y-9 shadow-xs relative overflow-hidden">
      
      {/* 1. ヒーロー見出し (ワクワク感 ＋ タイポグラフィの強弱) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-[#191919] pb-6">
        <div className="space-y-3">
          
          {/* NOW ON SALE チケット風ラベル */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 bg-[#F6C744] text-[#191919] font-mono font-black text-xs rounded-full uppercase flex items-center gap-1.5 shadow-2xs">
              <Disc className="w-3.5 h-3.5 text-[#191919] animate-spin-slow" />
              <span>NOW ON SALE</span>
            </span>
            <span className="px-3 py-1 bg-[#FFF4C7] border border-[#F6C744]/60 text-[#5C4533] font-mono font-bold text-xs rounded-full flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#E99A32]" />
              <span>2026.08.26 RELEASE</span>
            </span>
          </div>

          {/* シングルタイトル ＋ 高揚感のある見せ方 */}
          <div className="space-y-1">
            <div className="text-xs sm:text-sm font-mono font-black text-[#8C694D] tracking-widest uppercase flex items-center gap-1.5">
              <span>＝LOVE 21st SINGLE</span>
              <span className="text-[#F6C744]">✦</span>
            </div>
            
            <h2 className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-maru font-extrabold text-[#191919] tracking-tight">
                『恋、はじめました。』
              </span>
              <span className="text-xl sm:text-3xl font-maru font-extrabold text-[#E99A32] tracking-wider">
                発売!!
              </span>
            </h2>
          </div>
        </div>

        {/* 右側: 瀧脇笙古ちゃん店頭企画 導線 */}
        <div className="space-y-2 text-left lg:text-right shrink-0">
          <div className="text-xs font-maru font-bold text-[#8C694D] flex items-center lg:justify-end gap-1">
            <Star className="w-3.5 h-3.5 text-[#F6C744] fill-[#F6C744]" />
            <span>瀧脇笙古ちゃん 店頭キャンペーンまとめ</span>
          </div>

          <a
            href="https://equal-love.jp/news/detail/11864"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#191919] hover:bg-[#5C4533] text-white font-maru font-extrabold text-xs sm:text-sm rounded-xl transition-all hover:scale-[1.02] shadow-2xs group"
          >
            <span>公式キャンペーン詳細を見る ↗</span>
            <ExternalLink className="w-4 h-4 text-[#F6C744] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 2. 瀧脇笙古ちゃん関連キャンペーン パネル (変形リズミカル GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ======================================================== */}
        {/* 【最強調】 1. 横浜ビブレ店 (2カラム相当のスペシャルパネル) */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#FFF9ED] via-white to-[#FFF4C7]/50 border-3 border-[#F6C744] p-6 sm:p-7 rounded-2xl space-y-5 shadow-xs hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
          
          {/* SPECIAL STORE 旗ラベル */}
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#F6C744] text-[#191919] font-mono font-black text-xs rounded-bl-2xl uppercase flex items-center gap-1 shadow-2xs">
            <Star className="w-3.5 h-3.5 text-[#191919] fill-[#191919]" />
            <span>SPECIAL STORE // 横浜</span>
          </div>

          {/* ヘッダー */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[11px] rounded-full">
              <MapPin className="w-3 h-3 text-[#E99A32]" />
              <span>タワーレコード横浜ビブレ店</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-maru font-extrabold text-[#191919] leading-snug">
              横浜ビブレ店はさらに特別！
            </h3>
            <p className="text-xs text-[#8C694D] font-bold">
              神奈川県出身・ベイスターズファンのしょこちゃんゆかりの店舗！
            </p>
          </div>

          {/* 内容分解: 特典＆掲出企画 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-3 bg-white/90 border border-[#F0E4CE] rounded-xl space-y-1">
              <div className="text-[10px] font-mono font-bold text-[#E99A32] flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>店頭特別展示</span>
              </div>
              <ul className="space-y-1 text-[#5C4533] font-bold text-xs">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F6C744] shrink-0" />
                  <span>コラボポスター展示</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F6C744] shrink-0" />
                  <span>直筆サイン色紙展示</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F6C744] shrink-0" />
                  <span>直筆コメント入りPOP展示</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-white/90 border border-[#F0E4CE] rounded-xl space-y-1">
              <div className="text-[10px] font-mono font-bold text-[#E99A32] flex items-center gap-1">
                <Gift className="w-3 h-3" />
                <span>限定購入特典</span>
              </div>
              <p className="text-[#5C4533] font-bold text-xs leading-relaxed">
                対象商品ご購入の方へ<br />
                <span className="text-[#191919] font-extrabold bg-[#FFF4C7] px-1 rounded">直筆サイン入りPOP</span> 抽選プレゼント！
              </p>
            </div>
          </div>

          {/* 下部サブボックス: 日程スケジュール */}
          <div className="p-3.5 bg-white rounded-xl border border-[#F0E4CE] text-xs font-mono font-bold text-[#5C4533] space-y-1.5">
            <div className="text-[10px] text-[#8C694D] uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#E99A32]" />
              <span>SCHEDULE // 横浜ビブレ店 スケジュール</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div>
                <span className="text-[#8C694D] block text-[10px]">【掲出・抽選配布】</span>
                <span className="text-[#191919]">8/25(火) — 8/31(月)</span>
              </div>
              <div>
                <span className="text-[#8C694D] block text-[10px]">【当選発表】</span>
                <span className="text-[#191919]">2026.09.02 (水)</span>
              </div>
              <div>
                <span className="text-[#8C694D] block text-[10px]">【POP引換期間】</span>
                <span className="text-[#191919]">9/2 — 9/23</span>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 2. タワーレコード ソロ応援キャンペーン (上段 右) */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-6 rounded-2xl space-y-4 shadow-2xs hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          
          <div className="space-y-3">
            {/* 上部ヘッダー */}
            <div className="flex items-center justify-between border-b border-[#F0E4CE] pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[#FFF4C7] text-[#5C4533] rounded-lg">
                  <Sparkles className="w-4 h-4 text-[#E99A32]" />
                </span>
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#8C694D] uppercase">
                    SOLO CAMPAIGN
                  </div>
                  <h3 className="font-maru font-extrabold text-base text-[#191919]">
                    瀧脇笙古ちゃん ソロ応援
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-xs rounded-full">
                8/25 — 8/31
              </span>
            </div>

            {/* 店舗 */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#8C694D] uppercase block">
                【対象店舗】
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs font-bold text-[#5C4533]">
                <span className="px-2 py-0.5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-md">横浜ビブレ店</span>
                <span className="px-2 py-0.5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-md">新潟店</span>
                <span className="px-2 py-0.5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-md">東浦店</span>
                <span className="px-2 py-0.5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-md">京都店</span>
              </div>
            </div>

            {/* 特典内容 */}
            <div className="space-y-2 text-xs font-sans">
              <span className="text-[10px] font-mono font-bold text-[#8C694D] uppercase block">
                【3大スペシャルソロ特典】
              </span>
              <ul className="space-y-1.5 text-[#5C4533] font-bold">
                <li className="flex items-start gap-2 bg-[#FFF9ED] p-2 rounded-lg border border-[#F0E4CE]/60">
                  <Ticket className="w-4 h-4 text-[#E99A32] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#191919] block font-extrabold">特別レシート発行</span>
                    <span className="text-[11px] text-[#5C4533]">瀧脇笙古ちゃんソロ絵柄<br />プリントサイン＆メッセージ入り！</span>
                  </div>
                </li>

                <li className="flex items-start gap-2 bg-[#FFF9ED] p-2 rounded-lg border border-[#F0E4CE]/60">
                  <PlayCircle className="w-4 h-4 text-[#E99A32] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#191919] block font-extrabold">限定コメント映像</span>
                    <span className="text-[11px] text-[#5C4533]">店内にて撮り下ろし映像を放映<br />※一部店舗を除く</span>
                  </div>
                </li>

                <li className="flex items-start gap-2 bg-[#FFF9ED] p-2 rounded-lg border border-[#F0E4CE]/60">
                  <Gift className="w-4 h-4 text-[#E99A32] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#191919] block font-extrabold">コラボポストカード先着配布</span>
                    <span className="text-[11px] text-[#5C4533]">瀧脇笙古ちゃんソロ絵柄<br />（※ランダムで直筆サイン入り）</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#8C694D] pt-2 border-t border-[#F0E4CE]">
            ※実施期間は店舗により前後する場合がございます。
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. 渋谷エリア (下段 左) */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-5.5 rounded-2xl space-y-3.5 shadow-2xs hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0E4CE] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[#FFF4C7] text-[#5C4533] rounded-lg">
                  <MapPin className="w-4 h-4 text-[#E99A32]" />
                </span>
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#8C694D] uppercase">
                    SHIBUYA AREA
                  </div>
                  <h3 className="font-maru font-extrabold text-base text-[#191919]">
                    渋谷でもしょこちゃん！
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-xs rounded-full">
                8/25 — 9/7
              </span>
            </div>

            <div className="text-xs font-sans text-[#5C4533] space-y-2">
              <div className="font-bold text-[#191919]">
                【店舗】 タワーレコード渋谷店
                <span className="text-[11px] font-normal text-[#8C694D] block">
                  (対象: 齋藤樹愛羅 / 瀧脇笙古 / 野口衣織)
                </span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold pt-1">
                <li className="p-2.5 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE] flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-[#E99A32] shrink-0" />
                  <span>限定コメント映像放送</span>
                </li>
                <li className="p-2.5 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE] flex items-center gap-2">
                  <Frame className="w-4 h-4 text-[#E99A32] shrink-0" />
                  <span>直筆POPパネル展示＆抽選</span>
                </li>
                <li className="p-2.5 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE] sm:col-span-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F6C744] shrink-0" />
                  <span>渋谷エリア3店舗スタンプラリー開催！</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-2 bg-[#FFF4C7]/40 rounded-lg text-[11px] font-mono text-[#8C694D] text-center font-bold">
            ※掲出・パネル抽選期間: 2026.08.25 — 09.07
          </div>

        </div>

        {/* ======================================================== */}
        {/* 4. 全国パネル展 (下段 右) */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-5.5 rounded-2xl space-y-3.5 shadow-2xs hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0E4CE] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[#FFF4C7] text-[#5C4533] rounded-lg">
                  <Frame className="w-4 h-4 text-[#E99A32]" />
                </span>
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#8C694D] uppercase">
                    JAPAN EXHIBITION
                  </div>
                  <h3 className="font-maru font-extrabold text-base text-[#191919]">
                    全国CDショップでパネル展
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-xs rounded-full">
                8/25 — 8/31
              </span>
            </div>

            <div className="text-xs font-sans text-[#5C4533] space-y-2 leading-relaxed">
              <p className="font-bold text-[#191919]">
                『恋、はじめました。』発売記念パネル展を実施中！
              </p>

              <div className="p-3 bg-[#FFF9ED] rounded-xl border border-[#F0E4CE] space-y-1 font-bold">
                <div className="flex items-center gap-1.5 text-[#191919]">
                  <Gift className="w-4 h-4 text-[#E99A32]" />
                  <span>展示パネル抽選プレゼント</span>
                </div>
                <p className="text-[11px] text-[#5C4533]">
                  対象商品をご購入いただいたお客様へ、展示パネルが当たる抽選券を配布中。
                </p>
              </div>
            </div>
          </div>

          <div className="p-2 bg-[#FFF4C7]/40 rounded-lg text-[11px] font-mono text-[#8C694D] text-center font-bold">
            ※対象店舗および展示期間の詳細は公式特設ページをご参照ください。
          </div>

        </div>

      </div>

    </section>
  );
};
