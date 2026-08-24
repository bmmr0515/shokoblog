"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinkItem, Category } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Sidebar } from "@/components/Sidebar";
import { AdBanner } from "@/components/AdBanner";
import { DiscoverRandomModal } from "@/components/DiscoverRandomModal";
import { ExternalLink, ArrowRight, Film, User, ArrowUpRight } from "lucide-react";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { Reveal } from "@/components/Reveal";
import { HeroReveal } from "@/components/HeroReveal";
import { HeroVideoPlayer } from "@/components/HeroVideoPlayer";
import { FashionArticleRow } from "@/components/FashionArticleRow";
import { InitialOpeningLoader } from "@/components/InitialOpeningLoader";

export function HomeView() {
  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    setItems(getLinkItems());
  }, []);

  const latestItems = [...items].sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));

  // 1. YouTube動画アイテムの抽出
  const youtubeItems = latestItems.filter(
    (i) => i.contentType === "youtube" || !!i.youtubeURL || i.category === "YouTube" || i.category === "ライブ映像"
  );

  // ヒーロー動画ID (FILA 2026FW POP-UP 瀧脇笙古スタイリングパートナー動画)
  const HERO_VIDEO_ID = "0dJb1WGsK2Q";

  // LATEST MOVIE 用動画オブジェクト
  const latestMovieObj =
    youtubeItems.find(
      (i) =>
        i.videoId === HERO_VIDEO_ID ||
        extractYouTubeVideoId(i.youtubeURL || i.sourceURL) === HERO_VIDEO_ID
    ) || {
      id: "latest-hero-video",
      title: "＝LOVE 瀧脇笙古が魅せる「FILA」2026 FW 秋冬最新コレクション POP-UP",
      publishedDate: "2026.08.18",
      channelName: "FILA OFFICIAL",
      sourceURL: `https://www.youtube.com/watch?v=${HERO_VIDEO_ID}`,
      youtubeURL: `https://www.youtube.com/watch?v=${HERO_VIDEO_ID}`,
    };

  // MOVIE PICKUP 用 (HERO_VIDEO_ID を除外した 4件)
  const moviePickups = youtubeItems
    .filter(
      (i) =>
        i.videoId !== HERO_VIDEO_ID &&
        extractYouTubeVideoId(i.youtubeURL || i.sourceURL) !== HERO_VIDEO_ID
    )
    .slice(0, 4);

  // 2. NEWS (最新情報 4件)
  const newsItems = latestItems
    .filter((i) => i.category === "ニュース" || i.category === "公式情報" || i.category === "テレビ・ラジオ")
    .slice(0, 4);

  // 3. ARTICLES (関連記事 4件)
  const articleItems = latestItems
    .filter((i) => i.contentType !== "youtube" && !i.youtubeURL && i.category !== "YouTube")
    .slice(0, 4);

  const mainCategories: { name: string; category: Category }[] = [
    { name: "ベイスターズ", category: "ベイスターズ" },
    { name: "マラソン・スポーツ", category: "マラソン・スポーツ" },
    { name: "料理", category: "料理" },
    { name: "インタビュー", category: "インタビュー" },
    { name: "過去記事", category: "過去記事" },
  ];

  return (
    <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 space-y-16 sm:space-y-24 pb-16 pt-2">
      
      {/* 映画・作品特設サイト風 初回オープニングローダー */}
      <InitialOpeningLoader />

      {/* ======================================================== */}
      {/* 1. ヒーローセクション (フル幅化 ＆ 呪術廻戦風 大迫力映像ビジュアル) */}
      {/* ======================================================== */}
      <section className="relative py-2 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 左側 35%: タイトル・コピー・SNS (安全読性幅 max-w-[480px]) */}
          <div className="lg:col-span-4 space-y-5">
            <HeroReveal delay={0}>
              <div className="space-y-3 max-w-[480px]">
                <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-widest text-zinc-500 uppercase font-bold">
                  <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-bold text-[10px]">
                    LOOKBOOK 2026
                  </span>
                  <span>//</span>
                  <span>35°27'N 139°38'E</span>
                </div>

                {/* 大迫力タイトル ＋ 左アクセント縦ライン */}
                <div className="flex items-stretch gap-3">
                  <div className="w-1.5 bg-yellow-500 rounded-none shrink-0" />
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-none font-sans">
                    しょこらの部屋
                  </h1>
                </div>

                <p className="text-xs sm:text-sm font-bold text-zinc-700 leading-relaxed pt-1">
                  瀧脇笙古さんのニュース、記事、動画をまとめた非公式ファンサイトです。
                </p>
              </div>
            </HeroReveal>

            {/* PC表示用: SNS 導線 */}
            <div className="hidden lg:block max-w-[480px]">
              <HeroReveal delay={120}>
                <div className="pt-4 border-t border-zinc-200 space-y-2 text-xs">
                  <div className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                    OFFICIAL SOCIAL MEDIA // 瀧脇笙古
                  </div>
                  <div className="flex items-center gap-4 font-mono font-bold text-xs">
                    <a
                      href="https://x.com/shoko_takiwaki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-900 hover:text-yellow-600 transition-colors flex items-center gap-1"
                    >
                      <span>X (@shoko_takiwaki)</span>
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </a>
                    <span className="text-zinc-300">/</span>
                    <a
                      href="https://www.instagram.com/takiwaki_shoko_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-900 hover:text-yellow-600 transition-colors flex items-center gap-1"
                    >
                      <span>INSTAGRAM</span>
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </a>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          {/* 右側 65%: 画面幅を贅沢に使う巨大映像ビジュアル (0dJb1WGsK2Q) */}
          <div className="lg:col-span-8">
            <HeroReveal delay={250}>
              <div className="relative w-full">
                <HeroVideoPlayer videoId={HERO_VIDEO_ID} />
                
                {/* 映像下部ミニマルラベル */}
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500 font-bold">
                  <span className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-bold text-[9px]">KEY VISUAL</span>
                    <span>FILA 2026FW POP-UP COLLECTION</span>
                  </span>
                  <span>[AUTOPLAY ON]</span>
                </div>
              </div>
            </HeroReveal>
          </div>

          {/* スマホ表示用: SNS 導線 (動画直下) */}
          <div className="block lg:hidden pt-1">
            <HeroReveal delay={350}>
              <div className="p-3.5 bg-zinc-50 border border-zinc-200 space-y-2 text-xs font-mono">
                <div className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                  OFFICIAL SOCIAL MEDIA
                </div>
                <div className="flex items-center gap-4 font-bold text-xs">
                  <a
                    href="https://x.com/shoko_takiwaki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-900 hover:text-yellow-600 transition-colors flex items-center gap-1"
                  >
                    <span>X (@shoko_takiwaki)</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                  <span className="text-zinc-300">/</span>
                  <a
                    href="https://www.instagram.com/takiwaki_shoko_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-900 hover:text-yellow-600 transition-colors flex items-center gap-1"
                  >
                    <span>INSTAGRAM</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </div>
              </div>
            </HeroReveal>
          </div>

        </div>
      </section>

      {/* ヒーローとNEWSの間の洗練された境界線 */}
      <div className="border-b border-zinc-200 my-4 sm:my-6" />

      {/* ======================================================== */}
      {/* 01 NEWS (フル幅ベース - リスト構造) */}
      {/* ======================================================== */}
      <Reveal id="news" className="space-y-6 relative">
        <div className="absolute -top-12 right-0 text-7xl sm:text-8xl font-mono font-black text-zinc-100 select-none pointer-events-none">
          01
        </div>

        {/* セクションタイポグラフィ */}
        <div className="flex items-end justify-between border-b-2 border-zinc-950 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-950 uppercase">
              <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-bold text-[10px]">01</span>
              <span>//</span>
              <span>LATEST INFORMATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-zinc-950">
              NEWS
            </h2>
          </div>

          <Link href="/news" className="font-mono text-xs font-bold text-zinc-900 hover:text-amber-600 transition-colors flex items-center gap-1">
            <span>INDEX</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
        </div>

        {/* フル幅 リスト構造 */}
        <div className="divide-y divide-zinc-200">
          {newsItems.map((item) => (
            <FashionArticleRow key={item.id} item={item} />
          ))}
        </div>
      </Reveal>

      {/* ======================================================== */}
      {/* 02 MOVIE (フル幅ベース - 巨大動画 ＆ 変形エディトリアル GRID) */}
      {/* ======================================================== */}
      <Reveal id="movie" className="space-y-6 relative">
        <div className="absolute -top-12 right-0 text-7xl sm:text-8xl font-mono font-black text-zinc-100 select-none pointer-events-none">
          02
        </div>

        {/* セクションタイポグラフィ */}
        <div className="flex items-end justify-between border-b-2 border-zinc-950 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-950 uppercase">
              <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-bold text-[10px]">02</span>
              <span>//</span>
              <span>VISUAL & COLLECTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-zinc-950">
              MOVIE
            </h2>
          </div>

          <Link href="/youtube" className="font-mono text-xs font-bold text-zinc-900 hover:text-amber-600 transition-colors flex items-center gap-1">
            <span>ALL MOVIES</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
        </div>

        {/* 大画面 FILA 動画 0dJb1WGsK2Q */}
        <div className="space-y-3">
          <div className="font-mono text-xs font-bold text-zinc-700 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-bold text-[10px]">LATEST</span>
            <span>最新動画はこちら</span>
          </div>

          <div className="bg-zinc-950 p-2 sm:p-4 rounded-xs border border-zinc-200/80 shadow-2xs space-y-3">
            <HeroVideoPlayer videoId={HERO_VIDEO_ID} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 text-xs text-zinc-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-bold text-[10px]">
                  FEATURED
                </span>
                <span className="font-bold text-white text-sm">
                  {latestMovieObj.title}
                </span>
              </div>

              <a
                href={latestMovieObj.youtubeURL || `https://www.youtube.com/watch?v=${HERO_VIDEO_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white font-bold inline-flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>YOUTUBE ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* MOVIE PICKUP (変形エディトリアル GRID) */}
        {moviePickups.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="font-mono text-xs font-bold text-zinc-400 tracking-wider flex items-center gap-2">
              <span className="px-2 py-0.5 bg-zinc-950 text-white font-bold text-[10px]">PICKUP</span>
              <span>// RECOMMENDED VISUALS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {moviePickups.map((video) => {
                const vId = video.videoId || extractYouTubeVideoId(video.youtubeURL || video.sourceURL);
                const thumb = video.thumbnailURL || (vId ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg` : "/images/logo.png");
                const target = video.youtubeURL || video.sourceURL || "#";

                return (
                  <a
                    key={video.id}
                    href={target}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-zinc-200 hover:border-zinc-950 p-3 space-y-2.5 transition-colors block"
                  >
                    <div className="relative aspect-16/9 bg-zinc-900 overflow-hidden">
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-zinc-400 font-bold">
                        {video.publishedDate}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-950 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                        {video.title}
                      </h4>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </Reveal>

      <DiscoverRandomModal items={items} />

      {/* ======================================================== */}
      {/* 2カラムレイアウト: ARTICLES ＆ PROFILE ＋ サイドバー */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-2">
        <div className="lg:col-span-2 space-y-14">

          {/* ======================================================== */}
          {/* 03 ARTICLES (フル幅ベース - 関連記事 INDEX) */}
          {/* ======================================================== */}
          <Reveal id="articles" className="space-y-6 relative">
            <div className="absolute -top-12 right-0 text-7xl sm:text-8xl font-mono font-black text-zinc-100 select-none pointer-events-none">
              03
            </div>

            {/* セクションタイポグラフィ */}
            <div className="flex items-end justify-between border-b-2 border-zinc-950 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-950 uppercase">
                  <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-bold text-[10px]">03</span>
                  <span>//</span>
                  <span>EDITORIAL INDEX</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-zinc-950">
                  ARTICLES
                </h2>
              </div>

              <Link href="/articles" className="font-mono text-xs font-bold text-zinc-900 hover:text-amber-600 transition-colors flex items-center gap-1">
                <span>ALL ARTICLES</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </Link>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs font-mono pt-1">
              <span className="text-zinc-400 font-bold mr-1">// CATEGORIES:</span>
              {mainCategories.map((c) => (
                <Link
                  key={c.name}
                  href={`/category/${encodeURIComponent(c.category)}`}
                  className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 transition-colors text-[11px] font-bold"
                >
                  #{c.name}
                </Link>
              ))}
            </div>

            {/* ルックブック INDEX リスト */}
            <div className="divide-y divide-zinc-200">
              {articleItems.map((item) => (
                <FashionArticleRow key={item.id} item={item} />
              ))}
            </div>

            <AdBanner type="listMiddleAd" />
          </Reveal>

          {/* ======================================================== */}
          {/* 04 PROFILE (人物特集 LOOKBOOK) */}
          {/* ======================================================== */}
          <Reveal id="profile-teaser" className="space-y-6 relative">
            <div className="absolute -top-12 right-0 text-7xl sm:text-8xl font-mono font-black text-zinc-100 select-none pointer-events-none">
              04
            </div>

            {/* セクションタイポグラフィ */}
            <div className="flex items-end justify-between border-b-2 border-zinc-950 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-950 uppercase">
                  <span className="px-2 py-0.5 bg-yellow-500 text-zinc-950 font-bold text-[10px]">04</span>
                  <span>//</span>
                  <span>PROFILE & ESSENCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-zinc-950">
                  SHOKO TAKIWAKI
                </h2>
              </div>

              <Link
                href="/profile"
                className="font-mono text-xs font-bold text-zinc-900 hover:text-amber-600 transition-colors flex items-center gap-1"
              >
                <span>FULL PROFILE</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </Link>
            </div>

            <div className="bg-white border border-zinc-200 p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs font-bold text-zinc-400 tracking-wider">
                  // 瀧脇笙古 (たきわき しょうこ)
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-bold">
                  指原莉乃プロデュースの声優アイドルグループ「＝LOVE（イコールラブ）」メンバー。2001年7月9日生まれ、神奈川県出身。横浜DeNAベイスターズファン、サブ4達成ランナー、料理上手として知られるマルチクリエイター。
                </p>
              </div>

              {/* 人物特徴キーワード ルックブック GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {[
                  { label: "YOKOHAMA", sub: "横浜DeNAベイスターズ" },
                  { label: "RUNNING", sub: "フルマラソン サブ4" },
                  { label: "COOKING", sub: "クックパッドLIVE" },
                  { label: "CENTER", sub: "木漏れ日メゾフォルテ" },
                ].map((box) => (
                  <div key={box.label} className="p-3 bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <div className="font-extrabold text-zinc-950 text-xs">{box.label}</div>
                    <div className="text-[10px] text-zinc-500 leading-snug font-sans">{box.sub}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono font-bold border-t border-zinc-100">
                <a
                  href="https://x.com/shoko_takiwaki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 hover:text-yellow-600 transition-colors"
                >
                  X (@shoko_takiwaki) ↗
                </a>
                <span className="text-zinc-300">/</span>
                <a
                  href="https://www.instagram.com/takiwaki_shoko_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 hover:text-yellow-600 transition-colors"
                >
                  INSTAGRAM ↗
                </a>
              </div>
            </div>

          </Reveal>

        </div>

        {/* 右サイドバー */}
        <div className="space-y-6">
          <Sidebar />
        </div>

      </div>

    </div>
  );
}
