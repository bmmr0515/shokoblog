"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinkItem, Category } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";
import { AdBanner } from "@/components/AdBanner";
import { DiscoverRandomModal } from "@/components/DiscoverRandomModal";
import { ExternalLink, ArrowRight, Sparkles, Film, User, ArrowUpRight } from "lucide-react";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { Reveal } from "@/components/Reveal";
import { HeroReveal } from "@/components/HeroReveal";
import { HeroVideoPlayer } from "@/components/HeroVideoPlayer";

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

  // ヒーロー動画ID
  const HERO_VIDEO_ID = "T9kq0EVZgzY";

  // LATEST MOVIE 用動画オブジェクト (HERO_VIDEO_ID に対応するオブジェクト)
  const latestMovieObj =
    youtubeItems.find(
      (i) =>
        i.videoId === HERO_VIDEO_ID ||
        extractYouTubeVideoId(i.youtubeURL || i.sourceURL) === HERO_VIDEO_ID
    ) || {
      id: "latest-hero-video",
      title: "＝LOVE(イコールラブ) 瀧脇笙古 関連最新映像",
      publishedDate: "2026.08",
      channelName: "＝LOVE公式",
      sourceURL: `https://www.youtube.com/watch?v=${HERO_VIDEO_ID}`,
      youtubeURL: `https://www.youtube.com/watch?v=${HERO_VIDEO_ID}`,
    };

  // MOVIE PICKUP 用 (HERO_VIDEO_ID を除外した最新 4件)
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

  // 3. ARTICLES (関連記事 / 注目記事 4件)
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
    <div className="space-y-16 sm:space-y-20 pb-12">

      {/* ======================================================== */}
      {/* 1. ヒーローセクション (Client Component による確実アニメーション & iframe描画) */}
      {/* ======================================================== */}
      <section className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* 左側 (PC): タイトル・コピー・CTA (ロード順次表示: 0ms, 120ms, 220ms) */}
          <div className="lg:col-span-5 space-y-4">
            <HeroReveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-full border border-amber-200/80">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>＝LOVE 瀧脇笙古 非公式ファンサイト</span>
              </div>
            </HeroReveal>

            <HeroReveal delay={120}>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950 leading-tight">
                  しょこらの部屋へようこそ
                </h1>
                <p className="text-sm sm:text-base font-bold text-gray-700 leading-relaxed">
                  瀧脇笙古さんのニュース、記事、動画、出演情報をまとめた非公式ファンサイトです。
                </p>
              </div>
            </HeroReveal>

            <HeroReveal delay={220}>
              <div className="pt-2">
                <a
                  href="#news"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-lg transition-colors shadow-2xs"
                >
                  <span>最新情報をチェック</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </HeroReveal>
          </div>

          {/* 右側 (PC): 注目動画 (ロード 300ms で発火 / DOM内100% <iframe> 描画) */}
          <div className="lg:col-span-7">
            <HeroReveal delay={300}>
              <HeroVideoPlayer videoId={HERO_VIDEO_ID} />
            </HeroReveal>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. 公式SNS (Reveal スクロール連動) */}
      {/* ======================================================== */}
      <Reveal id="official-sns" className="pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50/70 rounded-xl border border-gray-200/80">
          <div className="flex items-center gap-2 text-xs font-extrabold text-gray-900">
            <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
            <span>瀧脇笙古 Official SNS</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap text-xs">
            {[
              { id: "x", name: "X", account: "@shoko_takiwaki", url: "https://x.com/shoko_takiwaki" },
              { id: "instagram", name: "Instagram", account: "@takiwaki_shoko_", url: "https://www.instagram.com/takiwaki_shoko_/" }
            ].map((sns) => (
              <a
                key={sns.id}
                href={sns.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-50 text-gray-800 rounded-md border border-gray-200 hover:border-amber-300 transition-colors font-bold shadow-2xs"
              >
                <span className="text-gray-950 font-extrabold">{sns.name}</span>
                <span className="text-gray-500 font-mono text-[11px] group-hover:text-amber-900">{sns.account}</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-0.5" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ======================================================== */}
      {/* 3. NEWS (最新情報 - Reveal ＋ 行ごとの stagger フェードイン) */}
      {/* ======================================================== */}
      <Reveal id="news" className="space-y-6">
        
        {/* 作品サイト風 見出し */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 bg-amber-500 rounded-full shrink-0" />
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl font-extrabold tracking-widest font-mono text-gray-950">
                NEWS
              </h2>
              <span className="text-xs font-bold text-gray-500">
                最新情報
              </span>
            </div>
          </div>

          <Link href="/news" className="text-xs font-bold text-gray-800 hover:text-amber-600 hover:underline flex items-center gap-1 transition-colors">
            <span>一覧を見る</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-2xs overflow-hidden">
          {newsItems.map((item, index) => {
            const targetUrl = item.youtubeURL || item.sourceURL;
            const hasValidUrl =
              targetUrl &&
              targetUrl.trim() !== "" &&
              targetUrl !== "#" &&
              !targetUrl.startsWith("javascript:") &&
              (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"));

            return (
              <Reveal key={item.id} delay={index * 90} translateY={16}>
                <div className="p-4 sm:p-5 hover:bg-amber-50/20 transition-colors">
                  {hasValidUrl ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 block cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <span className="font-mono text-xs text-amber-900 font-bold shrink-0 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/80 w-fit">
                          {item.publishedDate.replace(/-/g, ".")}
                        </span>
                        <span className="font-bold text-gray-950 text-sm sm:text-base group-hover:text-amber-900 transition-colors leading-snug">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium shrink-0 flex items-center gap-1.5">
                        <span>{item.channelName || item.sourceName}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      </span>
                    </a>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-gray-700">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <span className="font-mono text-xs text-amber-900 font-bold shrink-0 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/80 w-fit">
                          {item.publishedDate.replace(/-/g, ".")}
                        </span>
                        <span className="font-bold text-gray-950 text-sm sm:text-base leading-snug">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium shrink-0">
                        {item.channelName || item.sourceName} (掲載記録)
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      {/* ======================================================== */}
      {/* 4. LATEST MOVIE 「最新動画はこちら」 */}
      {/* ======================================================== */}
      <Reveal id="latest-movie" className="space-y-6 pt-2">
        {/* 見出し */}
        <div className="flex items-end justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 bg-amber-500 rounded-full shrink-0" />
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl font-extrabold tracking-widest font-mono text-gray-950">
                LATEST MOVIE
              </h2>
              <span className="text-xs font-bold text-gray-500">
                最新動画はこちら
              </span>
            </div>
          </div>

          <Link href="/youtube" className="text-xs font-bold text-gray-800 hover:text-amber-600 hover:underline flex items-center gap-1 transition-colors">
            <span>動画一覧を見る</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </Link>
        </div>

        {/* 動画プレイヤー (100% <iframe> 描画コンポーネント) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-2xs space-y-4">
          <HeroVideoPlayer videoId={HERO_VIDEO_ID} />

          {/* 動画の下の小さなテキストと動画タイトル */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                最新動画はこちら
              </span>
              <h3 className="font-extrabold text-gray-950 text-sm leading-snug">
                {latestMovieObj.title}
              </h3>
            </div>

            <a
              href={latestMovieObj.youtubeURL || `https://www.youtube.com/watch?v=${HERO_VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-900 font-bold inline-flex items-center gap-1 shrink-0"
            >
              <span>YouTubeでフル視聴 ↗</span>
            </a>
          </div>
        </div>
      </Reveal>

      {/* ======================================================== */}
      {/* 5. MOVIE PICKUP (Reveal スクロール連動 ＋ カード内表示) */}
      {/* ======================================================== */}
      {moviePickups.length > 0 && (
        <Reveal id="movie-pickup" className="space-y-4 pt-2">
          
          <div className="flex items-center gap-2 text-xs font-extrabold text-gray-800 border-b border-gray-200 pb-2">
            <Film className="w-4 h-4 text-amber-600" />
            <span>MOVIE PICKUP</span>
            <span className="text-gray-400 font-normal">| 関連動画ピックアップ</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {moviePickups.map((video, idx) => {
              const vId = video.videoId || extractYouTubeVideoId(video.youtubeURL || video.sourceURL);
              const thumb = video.thumbnailURL || (vId ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg` : "/images/logo.png");
              const target = video.youtubeURL || video.sourceURL || "#";

              return (
                <Reveal key={video.id} delay={idx * 90} translateY={16}>
                  <a
                    href={target}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white hover:bg-amber-50/20 rounded-md border border-gray-100 p-2 space-y-2 transition-colors block"
                  >
                    <div className="relative aspect-16/9 bg-gray-900 rounded-sm overflow-hidden">
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-gray-400 font-bold">
                        {video.publishedDate}
                      </div>
                      <h4 className="text-xs font-bold text-gray-950 group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
                        {video.title}
                      </h4>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

        </Reveal>
      )}

      <DiscoverRandomModal items={items} />

      {/* ======================================================== */}
      {/* 2カラムレイアウト: メインコンテンツ (ARTICLES / PROFILE) ＋ サイドバー */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-2">
        <div className="lg:col-span-2 space-y-12">

          {/* ======================================================== */}
          {/* 6. ARTICLES (関連記事 / 注目記事 4件) */}
          {/* ======================================================== */}
          <Reveal id="articles" className="space-y-6">
            
            {/* 作品サイト風 見出し */}
            <div className="flex items-end justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-7 bg-amber-500 rounded-full shrink-0" />
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl font-extrabold tracking-widest font-mono text-gray-950">
                    ARTICLES
                  </h2>
                  <span className="text-xs font-bold text-gray-500">
                    関連記事・記録
                  </span>
                </div>
              </div>

              <Link href="/articles" className="text-xs font-bold text-gray-800 hover:text-amber-600 hover:underline flex items-center gap-1 transition-colors">
                <span>記事一覧を見る</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </Link>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
              <span className="text-gray-400 font-medium mr-1">主要カテゴリ:</span>
              {mainCategories.map((c) => (
                <Link
                  key={c.name}
                  href={`/category/${encodeURIComponent(c.category)}`}
                  className="px-2.5 py-1 bg-white hover:bg-amber-50 text-gray-700 hover:text-amber-900 rounded border border-gray-200 text-xs font-medium transition-colors"
                >
                  #{c.name}
                </Link>
              ))}
            </div>

            <div className="divide-y divide-gray-200">
              {articleItems.map((item) => (
                <ArticleCard key={item.id} item={item} />
              ))}
            </div>

            <AdBanner type="listMiddleAd" />
          </Reveal>

          {/* ======================================================== */}
          {/* 7. PROFILE導線 (Reveal スクロールフェードイン) */}
          {/* ======================================================== */}
          <Reveal id="profile-teaser" className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-extrabold text-gray-950">
                  瀧脇笙古（たきわき しょうこ）プロフィール
                </h3>
              </div>

              <Link
                href="/profile"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-gray-800 hover:text-amber-600 hover:underline transition-colors"
              >
                <span>プロフィールを見る</span>
                <ArrowUpRight className="w-4 h-4 text-amber-600" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              指原莉乃プロデュースのアイドルグループ「＝LOVE（イコールラブ）」のメンバー。愛称「しょこちゃん」。2001年7月9日生まれ、神奈川県出身。
            </p>

            {/* 人物特徴キーワードタグ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              {[
                { label: "横浜 / ベイスターズ", desc: "大のベイスターズファン。BAY☆スタ連載中" },
                { label: "フルマラソン", desc: "サブ4達成の本格派ランナー" },
                { label: "料理・スイーツ", desc: "クックパッドLIVEや料理番組で活躍" },
                { label: "＝LOVE センター", desc: "『木漏れ日メゾフォルテ』ダブルセンター" },
              ].map((box) => (
                <div key={box.label} className="p-3 bg-gray-50/80 rounded-lg border border-gray-200/80 space-y-1">
                  <div className="font-extrabold text-gray-950 text-xs">{box.label}</div>
                  <div className="text-[11px] text-gray-500 leading-snug">{box.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold border-t border-gray-100">
              <a
                href="https://x.com/shoko_takiwaki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-amber-600 hover:underline flex items-center gap-1 transition-colors"
              >
                <span>公式X (@shoko_takiwaki) ↗</span>
              </a>
              <a
                href="https://www.instagram.com/takiwaki_shoko_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-amber-600 hover:underline flex items-center gap-1 transition-colors"
              >
                <span>公式Instagram ↗</span>
              </a>
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
