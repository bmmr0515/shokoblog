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
import { FilaPopUpBanner } from "@/components/FilaPopUpBanner";
import { SingleReleaseSection } from "@/components/SingleReleaseSection";

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
    <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 space-y-14 sm:space-y-20 pb-16 pt-2">
      
      {/* 初回オープニングローダー */}
      <InitialOpeningLoader />

      {/* ======================================================== */}
      {/* 1. ヒーローセクション */}
      {/* ======================================================== */}
      <section className="relative py-6 sm:py-10 px-5 sm:px-10 bg-[#FFF9ED] rounded-2xl border border-[#F5ECD8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 左側 40%: しょこらの部屋・説明文・公式SNS */}
          <div className="lg:col-span-5 space-y-6">
            <HeroReveal delay={0}>
              <div className="space-y-4">
                
                {/* 「しょこらの部屋」必ず1行固定 ＋ 上品な Zen Maru Gothic ＋ ひまわりイエロー縦ライン */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-10 sm:h-12 bg-[#F6C744] rounded-full shrink-0" />
                  <div className="flex items-baseline gap-2 overflow-hidden">
                    <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-maru font-extrabold tracking-tight text-[#191919] leading-none whitespace-nowrap">
                      しょこらの部屋
                    </h1>
                    <span className="text-[#F6C744] text-xl font-bold select-none">✦</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-[#5C4533] leading-relaxed font-sans pt-1">
                  瀧脇笙古さんのニュース、記事、動画、出演情報をまとめた非公式ファンサイトです。
                </p>
              </div>
            </HeroReveal>

            {/* PC表示用: 公式SNS 導線 */}
            <div className="hidden lg:block pt-2">
              <HeroReveal delay={120}>
                <div className="pt-4 border-t border-[#F0E4CE] space-y-2.5">
                  <div className="text-[11px] font-bold text-[#8C694D] tracking-wider uppercase">
                    公式SNS
                  </div>
                  <div className="flex items-center gap-3 font-bold text-xs">
                    <a
                      href="https://x.com/shoko_takiwaki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-white hover:bg-[#FFF4C7] border border-[#F0E4CE] text-[#5C4533] hover:text-[#191919] transition-colors flex items-center gap-1.5 rounded-full shadow-2xs"
                    >
                      <span>公式X (@shoko_takiwaki)</span>
                      <ExternalLink className="w-3 h-3 text-[#E99A32]" />
                    </a>
                    <a
                      href="https://www.instagram.com/takiwaki_shoko_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-white hover:bg-[#FFF4C7] border border-[#F0E4CE] text-[#5C4533] hover:text-[#191919] transition-colors flex items-center gap-1.5 rounded-full shadow-2xs"
                    >
                      <span>公式Instagram</span>
                      <ExternalLink className="w-3 h-3 text-[#E99A32]" />
                    </a>
                  </div>
                </div>
              </HeroReveal>
            </div>
          </div>

          {/* 右側 60%: FILA 巨大動画ビジュアル (0dJb1WGsK2Q) */}
          <div className="lg:col-span-7">
            <HeroReveal delay={250}>
              <div className="relative w-full">
                <HeroVideoPlayer videoId={HERO_VIDEO_ID} />
                
                {/* 映像下部 テキスト */}
                <div className="pt-2.5 flex items-center justify-between text-xs text-[#8C694D] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] text-[10px] rounded-full">
                      注目動画
                    </span>
                    <span>FILA 2026FW POP-UP</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">[AUTOPLAY ON]</span>
                </div>
              </div>
            </HeroReveal>
          </div>

          {/* スマホ表示用: 公式SNS 導線 (動画直下) */}
          <div className="block lg:hidden pt-1">
            <HeroReveal delay={350}>
              <div className="p-4 bg-white rounded-xl border border-[#F0E4CE] space-y-2 text-xs">
                <div className="text-[11px] font-bold text-[#8C694D] tracking-wider uppercase">
                  公式SNS
                </div>
                <div className="flex items-center gap-2.5 flex-wrap font-bold">
                  <a
                    href="https://x.com/shoko_takiwaki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-[#FFF9ED] hover:bg-[#FFF4C7] border border-[#F0E4CE] text-[#5C4533] transition-colors flex items-center gap-1 rounded-full"
                  >
                    <span>公式X</span>
                    <ExternalLink className="w-3 h-3 text-[#E99A32]" />
                  </a>
                  <a
                    href="https://www.instagram.com/takiwaki_shoko_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-[#FFF9ED] hover:bg-[#FFF4C7] border border-[#F0E4CE] text-[#5C4533] transition-colors flex items-center gap-1 rounded-full"
                  >
                    <span>公式Instagram</span>
                    <ExternalLink className="w-3 h-3 text-[#E99A32]" />
                  </a>
                </div>
              </div>
            </HeroReveal>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. ＝LOVE 21stシングル発売記念 瀧脇笙古ちゃん店頭キャンペーン特集 */}
      {/* ======================================================== */}
      <Reveal id="single-release-section">
        <SingleReleaseSection />
      </Reveal>

      {/* ======================================================== */}
      {/* 3. FILA POP UP 告知専用セクション */}
      {/* ======================================================== */}
      <Reveal id="fila-popup-section">
        <FilaPopUpBanner />
      </Reveal>

      {/* ======================================================== */}
      {/* 01 NEWS (最新情報) */}
      {/* ======================================================== */}
      <Reveal id="news" className="space-y-6 relative">
        <div className="absolute -top-10 right-2 text-6xl sm:text-7xl font-mono font-bold text-[#FFF4C7] select-none pointer-events-none">
          01
        </div>

        {/* セクションタイポグラフィ */}
        <div className="flex items-end justify-between border-b-2 border-[#191919] pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#5C4533] uppercase">
              <span className="px-2 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] text-[10px] rounded-full font-mono">
                01
              </span>
              <span>最新情報</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-[#191919]">
              NEWS
            </h2>
          </div>

          <Link href="/news" className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#E99A32] transition-colors flex items-center gap-1">
            <span>ニュース一覧</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E99A32]" />
          </Link>
        </div>

        {/* フル幅 リスト構造 */}
        <div className="divide-y divide-[#F0E4CE]">
          {newsItems.map((item) => (
            <FashionArticleRow key={item.id} item={item} />
          ))}
        </div>
      </Reveal>

      {/* ======================================================== */}
      {/* 02 MOVIE (動画コレクション) */}
      {/* ======================================================== */}
      <Reveal id="movie" className="space-y-6 relative">
        <div className="absolute -top-10 right-2 text-6xl sm:text-7xl font-mono font-bold text-[#FFF4C7] select-none pointer-events-none">
          02
        </div>

        {/* セクションタイポグラフィ */}
        <div className="flex items-end justify-between border-b-2 border-[#191919] pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#5C4533] uppercase">
              <span className="px-2 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] text-[10px] rounded-full font-mono">
                02
              </span>
              <span>動画</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-[#191919]">
                MOVIE
              </h2>
              <span className="text-xs font-maru font-bold text-[#8C694D]">
                動画コレクション
              </span>
            </div>
          </div>

          <Link href="/youtube" className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#E99A32] transition-colors flex items-center gap-1">
            <span>動画一覧</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E99A32]" />
          </Link>
        </div>

        {/* 大画面 FILA 動画 0dJb1WGsK2Q */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#5C4533] flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#F6C744] text-[#191919] text-[10px] rounded-full font-mono">LATEST</span>
            <span className="font-maru font-bold">最新動画はこちら</span>
          </div>

          <div className="bg-[#191919] p-2.5 sm:p-4 rounded-xl border border-[#F0E4CE] shadow-2xs space-y-3">
            <HeroVideoPlayer videoId={HERO_VIDEO_ID} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] font-bold text-[10px] rounded-full">
                  注目
                </span>
                <span className="font-bold text-white text-sm font-sans">
                  {latestMovieObj.title}
                </span>
              </div>

              <a
                href={latestMovieObj.youtubeURL || `https://www.youtube.com/watch?v=${HERO_VIDEO_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white font-bold inline-flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>YouTubeで視聴 ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* MOVIE PICKUP */}
        {moviePickups.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="text-xs font-bold text-[#8C694D] tracking-wider flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#FFF4C7] text-[#5C4533] text-[10px] rounded-full border border-[#F6C744]/40 font-mono">PICKUP</span>
              <span>おすすめ動画</span>
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
                    className="group bg-white border border-[#F0E4CE] hover:border-[#F6C744] p-3 space-y-2.5 transition-colors block rounded-xl shadow-2xs"
                  >
                    <div className="relative aspect-16/9 bg-zinc-900 rounded-lg overflow-hidden">
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-[#8C694D] font-bold">
                        {video.publishedDate}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#191919] group-hover:text-[#E99A32] transition-colors line-clamp-2 leading-snug font-sans">
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
          {/* 03 ARTICLES (関連記事) */}
          {/* ======================================================== */}
          <Reveal id="articles" className="space-y-6 relative">
            <div className="absolute -top-10 right-2 text-6xl sm:text-7xl font-mono font-bold text-[#FFF4C7] select-none pointer-events-none">
              03
            </div>

            {/* セクションタイポグラフィ */}
            <div className="flex items-end justify-between border-b-2 border-[#191919] pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5C4533] uppercase">
                  <span className="px-2 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] text-[10px] rounded-full font-mono">03</span>
                  <span>記事・記録</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-[#191919]">
                    ARTICLES
                  </h2>
                  <span className="text-xs font-maru font-bold text-[#8C694D]">
                    関連記事・記録
                  </span>
                </div>
              </div>

              <Link href="/articles" className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#E99A32] transition-colors flex items-center gap-1">
                <span>記事一覧</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E99A32]" />
              </Link>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="text-[#8C694D] font-bold mr-1">主要カテゴリ:</span>
              {mainCategories.map((c) => (
                <Link
                  key={c.name}
                  href={`/category/${encodeURIComponent(c.category)}`}
                  className="px-2.5 py-0.5 bg-white hover:bg-[#FFF4C7] border border-[#F0E4CE] text-[#5C4533] transition-colors text-[11px] font-bold rounded-full"
                >
                  #{c.name}
                </Link>
              ))}
            </div>

            {/* ルックブック INDEX リスト */}
            <div className="divide-y divide-[#F0E4CE]">
              {articleItems.map((item) => (
                <FashionArticleRow key={item.id} item={item} />
              ))}
            </div>

            <AdBanner type="listMiddleAd" />
          </Reveal>

          {/* ======================================================== */}
          {/* 04 PROFILE (人物特集) */}
          {/* ======================================================== */}
          <Reveal id="profile-teaser" className="space-y-6 relative">
            <div className="absolute -top-10 right-2 text-6xl sm:text-7xl font-mono font-bold text-[#FFF4C7] select-none pointer-events-none">
              04
            </div>

            {/* セクションタイポグラフィ */}
            <div className="flex items-end justify-between border-b-2 border-[#191919] pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5C4533] uppercase">
                  <span className="px-2 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] text-[10px] rounded-full font-mono">04</span>
                  <span>プロフィール</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-[#191919]">
                    SHOKO TAKIWAKI
                  </h2>
                  <span className="text-xs font-maru font-bold text-[#8C694D]">
                    瀧脇笙古 プロフィール
                  </span>
                </div>
              </div>

              <Link
                href="/profile"
                className="font-mono text-xs font-bold text-[#5C4533] hover:text-[#E99A32] transition-colors flex items-center gap-1"
              >
                <span>プロフィール詳細</span>
                <ArrowUpRight className="w-4 h-4 text-[#E99A32]" />
              </Link>
            </div>

            {/* 人物特集ページ風の洗練されたカード */}
            <div className="bg-white border border-[#F0E4CE] p-6 sm:p-8 space-y-6 rounded-2xl shadow-2xs">
              
              {/* 大見出し ＋ 確実な一次情報文章 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#F0E4CE] pb-3">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-maru font-extrabold text-[#191919]">
                      瀧脇笙古 <span className="text-xs font-mono font-normal text-[#8C694D]">（たきわき しょうこ）</span>
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-[#FFF4C7] text-[#5C4533] font-mono font-bold text-xs rounded-full border border-[#F6C744]/40">
                    ＝LOVE
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5C4533] leading-relaxed font-bold font-sans">
                  2001年7月9日生まれ、神奈川県出身。指原莉乃プロデュースのアイドルグループ「＝LOVE」のメンバー。愛称は「しょこちゃん」。料理、ヘアアレンジ、横浜散策、カフェ巡りを趣味とし、特技はマラソン。横浜DeNAベイスターズへの愛、フルマラソンへの挑戦、料理、そしてステージで見せるパフォーマンスなど、好きなことを長く続けながら自分の強みに変えてきたメンバーです。
                </p>
              </div>

              {/* 特徴 4項目 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* 1. YOKOHAMA */}
                <div className="p-4 bg-[#FFF9ED] border border-[#F0E4CE] space-y-1.5 rounded-xl">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-extrabold text-[#191919] text-xs">YOKOHAMA</span>
                    <span className="text-[10px] text-[#E99A32] font-bold">横浜・ベイスターズ</span>
                  </div>
                  <p className="text-[11px] text-[#5C4533] leading-relaxed font-sans font-bold">
                    横浜とベイスターズを愛する、しょこちゃん。神奈川県出身で公式プロフィールの趣味にも「横浜散策」。横浜DeNAベイスターズファンとしても知られ、セレモニアルピッチ、連載「BAY☆スタ」、野球関連番組など活動の幅を広げています。
                  </p>
                </div>

                {/* 2. RUNNING */}
                <div className="p-4 bg-[#FFF9ED] border border-[#F0E4CE] space-y-1.5 rounded-xl">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-extrabold text-[#191919] text-xs">RUNNING</span>
                    <span className="text-[10px] text-[#E99A32] font-bold">サブ4達成</span>
                  </div>
                  <p className="text-[11px] text-[#5C4533] leading-relaxed font-sans font-bold">
                    <span className="text-[#191919] font-extrabold">東京マラソン2023でサブ4達成（3時間57分06秒）</span>。フルマラソン完走とサブ4を達成し、公式プロフィールの特技でも「マラソン」とされています。
                  </p>
                </div>

                {/* 3. COOKING */}
                <div className="p-4 bg-[#FFF9ED] border border-[#F0E4CE] space-y-1.5 rounded-xl">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-extrabold text-[#191919] text-xs">COOKING</span>
                    <span className="text-[10px] text-[#E99A32] font-bold">料理・カレー丼</span>
                  </div>
                  <p className="text-[11px] text-[#5C4533] leading-relaxed font-sans font-bold">
                    公式プロフィールの趣味のひとつが「料理」。2018年の「クックアイドルNo.1決定戦」で決勝進出し、本人考案の「疲労回復キーマカレー丼」を公開。
                  </p>
                </div>

                {/* 4. CENTER */}
                <div className="p-4 bg-[#FFF9ED] border border-[#F0E4CE] space-y-1.5 rounded-xl">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-extrabold text-[#191919] text-xs">CENTER</span>
                    <span className="text-[10px] text-[#E99A32] font-bold">センター楽曲</span>
                  </div>
                  <p className="text-[11px] text-[#5C4533] leading-relaxed font-sans font-bold">
                    2021年「BPM170の君へ」で自身初センターを担当。さらに2025年「木漏れ日メゾフォルテ」では音嶋莉沙ちゃんとのダブルセンターを担当。
                  </p>
                </div>

              </div>

              {/* SNS 導線 */}
              <div className="pt-2 flex items-center gap-4 text-xs font-bold border-t border-[#F0E4CE]">
                <a
                  href="https://x.com/shoko_takiwaki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C4533] hover:text-[#E99A32] transition-colors"
                >
                  公式X (@shoko_takiwaki) ↗
                </a>
                <span className="text-[#F0E4CE]">/</span>
                <a
                  href="https://www.instagram.com/takiwaki_shoko_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C4533] hover:text-[#E99A32] transition-colors"
                >
                  公式Instagram ↗
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
