"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, Disc, Calendar, MapPin, Sparkles, Gift } from "lucide-react";

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
    <section className="w-full bg-[#FFF9ED] border-2 border-[#F6C744] rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm">
      
      {/* 1. リリース特設ヘッダー (大きな見出し ＋ 日付) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b-2 border-[#191919] pb-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#F6C744] text-[#191919] font-mono font-bold text-xs rounded-full uppercase flex items-center gap-1.5 shadow-2xs">
              <Disc className="w-3.5 h-3.5 text-[#191919] animate-spin-slow" />
              <span>NOW ON SALE // 2026.08.26 RELEASE</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#E99A32]">
              ＝LOVE 21st SINGLE
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-maru font-extrabold text-[#191919] leading-tight">
            21st SINGLE<br />『恋、はじめました。』発売!!
          </h2>
        </div>

        <div className="space-y-1 text-left lg:text-right">
          <div className="text-xs font-maru font-bold text-[#8C694D]">
            瀧脇笙古ちゃん 店頭キャンペーン情報まとめ
          </div>
          <a
            href="https://equal-love.jp/news/detail/11864"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#191919] hover:bg-[#5C4533] text-white font-maru font-extrabold text-xs rounded-xl transition-colors shadow-2xs group"
          >
            <span>キャンペーン詳細を見る ↗</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#F6C744] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 2. 瀧脇笙古ちゃん関連キャンペーン GRID (4項目) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. タワーレコード ソロ応援キャンペーン */}
        <div className="lg:col-span-6 bg-white border border-[#F0E4CE] p-5 rounded-xl space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F0E4CE] pb-2.5">
            <h3 className="font-maru font-extrabold text-base text-[#191919] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F6C744]" />
              <span>瀧脇笙古ちゃん ソロ応援キャンペーン</span>
            </h3>
            <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full">
              8/25 — 8/31
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans text-[#5C4533] leading-relaxed">
            <div className="font-bold text-[#191919]">
              【対象店舗】 タワーレコード横浜ビブレ店 / 新潟店 / 東浦店 / 京都店
            </div>
            
            <ul className="space-y-1.5 pl-3 list-disc font-bold">
              <li>
                <span className="text-[#191919]">特別レシート発行</span>：瀧脇笙古ちゃんソロ絵柄「プリントサイン＆メッセージ入り特別レシート」
              </li>
              <li>
                <span className="text-[#191919]">限定コメント映像</span>：瀧脇笙古ちゃん限定 撮り下ろしコメント映像放送（※一部店舗除く）
              </li>
              <li>
                <span className="text-[#191919]">コラボポストカード配布</span>：瀧脇笙古ちゃんソロ絵柄（※先着配布・ランダムで直筆サイン入り）
              </li>
            </ul>

            <div className="text-[10px] text-[#8C694D] pt-1 font-mono">
              ※実施期間は店舗により前後する可能性がございます。
            </div>
          </div>
        </div>

        {/* 2. 横浜ビブレ店（特にお知らせしたい強め表示） */}
        <div className="lg:col-span-6 bg-gradient-to-br from-white to-[#FFF4C7]/40 border-2 border-[#F6C744] p-5 rounded-xl space-y-3 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#F6C744] text-[#191919] font-mono font-extrabold text-[10px] rounded-bl-xl uppercase">
            SPECIAL STORE
          </div>

          <div className="border-b border-[#F0E4CE] pb-2.5">
            <div className="text-[10px] font-mono font-bold text-[#E99A32] uppercase">
              // YOKOHAMA VIVRE
            </div>
            <h3 className="font-maru font-extrabold text-base text-[#191919] flex items-center gap-1.5">
              <span>横浜ビブレ店はさらに特別！</span>
            </h3>
          </div>

          <div className="space-y-2 text-xs font-sans text-[#5C4533] leading-relaxed">
            <p className="font-bold text-[#191919]">
              神奈川県出身・ベイスターズファンのしょこちゃんゆかりの店舗！
            </p>

            <ul className="space-y-1 pl-3 list-disc font-bold">
              <li>コラボポスター展示</li>
              <li>直筆サイン色紙展示</li>
              <li>直筆コメント入りPOP展示</li>
              <li>対象商品購入者への抽選企画（直筆サイン入りPOPプレゼント）</li>
            </ul>

            <div className="p-2.5 bg-white/80 rounded-lg border border-[#F0E4CE] text-[11px] font-mono font-bold text-[#8C694D] space-y-0.5">
              <div>掲出・抽選券配布: 2026年8月25日〜8月31日</div>
              <div>当選発表予定: 2026年9月2日</div>
              <div>POP引換期間: 2026年9月2日〜9月23日</div>
            </div>
          </div>
        </div>

        {/* 3. 渋谷エリア */}
        <div className="lg:col-span-6 bg-white border border-[#F0E4CE] p-5 rounded-xl space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F0E4CE] pb-2.5">
            <h3 className="font-maru font-extrabold text-base text-[#191919] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E99A32]" />
              <span>渋谷でもしょこちゃん！</span>
            </h3>
            <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full">
              8/25 — 9/7
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans text-[#5C4533] leading-relaxed">
            <div className="font-bold text-[#191919]">
              【対象】 タワーレコード渋谷店（瀧脇笙古 / 齋藤樹愛羅 / 野口衣織）
            </div>

            <ul className="space-y-1 pl-3 list-disc font-bold">
              <li>限定撮り下ろしコメント映像放送</li>
              <li>＝LOVE直筆POPパネル展示 ＆ 展示パネル抽選プレゼント</li>
              <li>渋谷エリア3店舗スタンプラリー開催</li>
            </ul>
          </div>
        </div>

        {/* 4. 全国パネル展 */}
        <div className="lg:col-span-6 bg-white border border-[#F0E4CE] p-5 rounded-xl space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#F0E4CE] pb-2.5">
            <h3 className="font-maru font-extrabold text-base text-[#191919] flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#E99A32]" />
              <span>全国CDショップでパネル展</span>
            </h3>
            <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-[10px] rounded-full">
              8/25 — 8/31
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans text-[#5C4533] leading-relaxed">
            <p className="font-bold text-[#5C4533]">
              『恋、はじめました。』発売を記念したパネル展と、対象商品購入者への展示パネル抽選プレゼントを実施中。
            </p>

            <div className="text-[11px] font-mono font-bold text-[#8C694D]">
              ※展示期間・対象店舗は公式特設ページでご確認いただけます。
            </div>
          </div>
        </div>

      </div>

      {/* 3. 公式詳細ページリンク */}
      <div className="pt-2 border-t border-[#F0E4CE] flex justify-end">
        <a
          href="https://equal-love.jp/news/detail/11864"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#191919] transition-colors inline-flex items-center gap-1.5"
        >
          <span>公式NEWSページで全店舗キャンペーンを見る</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#E99A32]" />
        </a>
      </div>

    </section>
  );
};
