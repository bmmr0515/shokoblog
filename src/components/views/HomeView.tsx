"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinkItem, Category } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";
import { AdBanner } from "@/components/AdBanner";
import { DiscoverRandomModal } from "@/components/DiscoverRandomModal";
import { ExternalLink, Play, ArrowRight, Sparkles, Film, User, ArrowUpRight } from "lucide-react";
import { extractYouTubeVideoId } from "@/lib/youtube";

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

  // 注目動画 (FEATURE MOVIE) の選定
  const featureMovie =
    youtubeItems.find((i) => i.isFeatured || i.isHighlight) || youtubeItems[0];

  // MOVIE PICKUP 用 (FEATURE MOVIE を除いた最新 4件)
  const moviePickups = youtubeItems
    .filter((i) => i.id !== featureMovie?.id)
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
      {/* 1. ヒーローセクション (作品サイトのキービジュアル風) */}
      {/* ======================================================== */}
      <section className="relative bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-2xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 左側 (PC): ロゴ・タイトル・コピー */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-full border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>＝LOVE 瀧脇笙古 非公式ファンサイト</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950 leading-tight">
                しょこらの部屋へようこそ
              </h1>
              <p className="text-sm sm:text-base font-bold text-gray-700 leading-relaxed">
                瀧脇笙古さんのニュース、記事、動画、出演情報をまとめた非公式ファンサイトです。
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <a
                href="#feature-movie"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-lg transition-colors shadow-2xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>注目動画を見る</span>
              </a>

              <a
                href="#news"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 hover:bg-amber-50 text-gray-800 border border-gray-200 hover:border-amber-300 font-bold text-xs sm:text-sm rounded-lg transition-colors"
              >
                <span>最新情報</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* 右側 (PC): キービジュアル (ロゴ ＆ 注目動画サムネイルの美しい融合) */}
          <div className="lg:col-span-6">
            {featureMovie ? (
              <div className="relative group bg-gray-900 rounded-xl overflow-hidden shadow-xs border border-gray-200">
                {(() => {
                  const vId = featureMovie.videoId || extractYouTubeVideoId(featureMovie.youtubeURL || featureMovie.sourceURL);
                  const thumb = featureMovie.thumbnailURL || (vId ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg` : "/images/logo.png");
                  const target = featureMovie.youtubeURL || featureMovie.sourceURL || "#";

                  return (
                    <a href={target} target="_blank" rel="noopener noreferrer" className="block relative aspect-16/9 overflow-hidden">
                      <img
                        src={thumb}
                        alt={featureMovie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-5 space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-amber-300">
                          <span className="px-2 py-0.5 bg-amber-500/90 text-white rounded font-mono">FEATURED</span>
                          <span>{featureMovie.publishedDate}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-extrabold text-white line-clamp-2 leading-snug">
                          {featureMovie.title}
                        </h3>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-amber-500/90 text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </a>
                  );
                })()}
              </div>
            ) : (
              <div className="relative aspect-16/9 bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center p-6">
                <img src="/images/logo.png" alt="ロゴ" className="max-h-full object-contain" />
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. 公式SNS (ヒーロー直下に極シンプル・上品に配置) */}
      {/* ======================================================== */}
      <section id="official-sns" className="pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50/80 rounded-xl border border-gray-200/80">
          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900">
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
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-50 text-gray-800 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors font-bold shadow-2xs"
              >
                <span className="text-amber-950 font-extrabold">{sns.name}</span>
                <span className="text-gray-500 font-mono text-[11px] group-hover:text-amber-900">{sns.account}</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. NEWS (最新情報 - 作品サイト風の凛としたリスト) */}
      {/* ======================================================== */}
      <section id="news" className="space-y-6">
        
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

          <Link href="/news" className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1">
            <span>一覧を見る</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-2xs overflow-hidden">
          {newsItems.map((item) => {
            const targetUrl = item.youtubeURL || item.sourceURL;
            const hasValidUrl =
              targetUrl &&
              targetUrl.trim() !== "" &&
              targetUrl !== "#" &&
              !targetUrl.startsWith("javascript:") &&
              (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"));

            return (
              <div key={item.id} className="p-4 sm:p-5 hover:bg-amber-50/30 transition-colors">
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
                      <span className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-amber-900 transition-colors leading-snug">
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
                      <span className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium shrink-0">
                      {item.channelName || item.sourceName} (掲載記録)
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FEATURE MOVIE (注目動画 - トップページの主役) */}
      {/* ======================================================== */}
      {featureMovie && (
        <section id="feature-movie" className="space-y-6 pt-4">
          
          {/* 作品サイト風 見出し */}
          <div className="flex items-end justify-between border-b border-gray-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-7 bg-amber-500 rounded-full shrink-0" />
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-extrabold tracking-widest font-mono text-gray-950">
                  FEATURE MOVIE
                </h2>
                <span className="text-xs font-bold text-gray-500">
                  注目動画
                </span>
              </div>
            </div>

            <Link href="/youtube" className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1">
              <span>すべての動画を見る</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </Link>
          </div>

          {/* メイン動画 1本（映画PV紹介スタイルの完璧なレイアウト） */}
          {(() => {
            const videoId = featureMovie.videoId || extractYouTubeVideoId(featureMovie.youtubeURL || featureMovie.sourceURL);
            const targetUrl = featureMovie.youtubeURL || featureMovie.sourceURL || "#";

            return (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-2xs space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* 左側: 大画面動画プレイヤー (アスペクト比 16:9) */}
                  <div className="lg:col-span-7">
                    {videoId ? (
                      <div className="relative w-full aspect-16/9 bg-black rounded-xl overflow-hidden shadow-xs border border-gray-300">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={featureMovie.title}
                          className="absolute top-0 left-0 w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="relative w-full aspect-16/9 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
                        <img
                          src={featureMovie.thumbnailURL || "/images/logo.png"}
                          alt={featureMovie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* 右側: 作品PV解説風の情報ブロック */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span className="px-2.5 py-0.5 bg-amber-500 text-white font-extrabold text-[11px] rounded">
                          PICKUP MOVIE
                        </span>
                        <span className="font-mono font-bold text-gray-500">
                          {featureMovie.publishedDate}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 font-bold text-[11px] rounded border border-gray-200">
                          {featureMovie.channelName || featureMovie.sourceName}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 leading-snug">
                        {featureMovie.title}
                      </h3>

                      {featureMovie.description && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-4">
                          {featureMovie.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-lg transition-colors shadow-2xs"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>YouTubeで動画を見る ↗</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

        </section>
      )}

      {/* ======================================================== */}
      {/* 5. MOVIE PICKUP (動画ピックアップ 4件横並び) */}
      {/* ======================================================== */}
      {moviePickups.length > 0 && (
        <section id="movie-pickup" className="space-y-4">
          
          <div className="flex items-center gap-2 text-xs font-extrabold text-gray-800 border-b border-gray-200 pb-2">
            <Film className="w-4 h-4 text-amber-600" />
            <span>MOVIE PICKUP</span>
            <span className="text-gray-400 font-normal">| 関連動画ピックアップ</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                  className="group bg-white hover:bg-amber-50/40 rounded-xl border border-gray-200 hover:border-amber-300 p-2.5 space-y-2.5 transition-colors block shadow-2xs"
                >
                  <div className="relative aspect-16/9 bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={thumb}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <div className="w-8 h-8 bg-amber-500/90 text-white rounded-full flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-gray-400 font-bold">
                      {video.publishedDate}
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-amber-900 line-clamp-2 leading-snug">
                      {video.title}
                    </h4>
                  </div>
                </a>
              );
            })}
          </div>

        </section>
      )}

      <DiscoverRandomModal items={items} />

      {/* ======================================================== */}
      {/* 2カラムレイアウト: メインコンテンツ (ARTICLES / PROFILE) ＋ サイドバー */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
        <div className="lg:col-span-2 space-y-12">

          {/* ======================================================== */}
          {/* 6. ARTICLES (関連記事 / 注目記事 4件) */}
          {/* ======================================================== */}
          <section id="articles" className="space-y-6">
            
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

              <Link href="/articles" className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1">
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
          </section>

          {/* ======================================================== */}
          {/* 7. PROFILE導線 (しょこちゃんの人物像が伝わる導線) */}
          {/* ======================================================== */}
          <section id="profile-teaser" className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-extrabold text-gray-950">
                  瀧脇笙古（たきわき しょうこ）プロフィール
                </h3>
              </div>

              <Link
                href="/profile"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-900 hover:underline"
              >
                <span>プロフィールを見る</span>
                <ArrowUpRight className="w-4 h-4 text-amber-700" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              指原莉諾プロデュースのアイドルグループ「＝LOVE（イコールラブ）」のメンバー。愛称「しょこちゃん」。2001年7月9日生まれ、神奈川県出身。
            </p>

            {/* 人物特徴キーワードタグ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              {[
                { label: "横浜 / ベイスターズ", desc: "大のベイスターズファン。BAY☆スタ連載中" },
                { label: "フルマラソン", desc: "サブ4達成の本格派ランナー" },
                { label: "料理・スイーツ", desc: "クックパッドLIVEや料理番組で活躍" },
                { label: "＝LOVE センター", desc: "『木漏れ日メゾフォルテ』ダブルセンター" },
              ].map((box) => (
                <div key={box.label} className="p-3 bg-gray-50 rounded-xl border border-gray-200/70 space-y-1">
                  <div className="font-extrabold text-amber-900 text-xs">{box.label}</div>
                  <div className="text-[11px] text-gray-500 leading-snug">{box.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold border-t border-gray-100">
              <a
                href="https://x.com/shoko_takiwaki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:underline flex items-center gap-1"
              >
                <span>公式X (@shoko_takiwaki) ↗</span>
              </a>
              <a
                href="https://www.instagram.com/takiwaki_shoko_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:underline flex items-center gap-1"
              >
                <span>公式Instagram ↗</span>
              </a>
            </div>

          </section>

        </div>

        {/* 右サイドバー */}
        <div className="space-y-6">
          <Sidebar />
        </div>

      </div>

    </div>
  );
}
