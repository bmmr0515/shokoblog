"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinkItem, Category } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";
import { AdBanner } from "@/components/AdBanner";
import { DiscoverRandomModal } from "@/components/DiscoverRandomModal";
import { ExternalLink, Newspaper, ArrowRight, Play, User, Sparkles, Film, ArrowUpRight } from "lucide-react";
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

  // 注目動画 1本の選定 (isFeatured/isHighlight があれば優先、無ければ最新動画)
  const featuredVideo =
    youtubeItems.find((i) => i.isFeatured || i.isHighlight) || youtubeItems[0];

  // メイン動画の下に並べるサブ動画 4件 (メイン動画を除外)
  const subVideoList = youtubeItems
    .filter((i) => i.id !== featuredVideo?.id)
    .slice(0, 4);

  // 2. 最新ニュース (3件)
  const latestNewsList = latestItems
    .filter((i) => i.category === "ニュース" || i.category === "公式情報" || i.category === "テレビ・ラジオ")
    .slice(0, 4);

  // 3. 注目記事 / 新着記事 (4件)
  const articlesList = latestItems
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
    <div className="space-y-10 sm:space-y-14 pb-8">

      {/* ======================================================== */}
      {/* 1. ヒーローセクション & 公式SNS */}
      {/* ======================================================== */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          <div className="flex-1 space-y-3 text-left w-full">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/90 text-amber-900 text-xs font-bold rounded border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>＝LOVE 瀧脇笙古 非公式ファンサイト</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
              しょこらの部屋へようこそ
            </h1>

            <p className="text-sm sm:text-base font-bold text-gray-700 leading-relaxed">
              瀧脇笙古さんのニュース、記事、動画、出演情報をまとめた非公式ファンサイトです。
            </p>

            {/* 2. 公式SNS導線 */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs">
              <span className="font-extrabold text-amber-900 shrink-0 flex items-center gap-1">
                <span>公式SNS</span>
              </span>

              <div className="flex items-center gap-2.5 flex-wrap">
                {[
                  { id: "x", name: "X", account: "@shoko_takiwaki", url: "https://x.com/shoko_takiwaki" },
                  { id: "instagram", name: "Instagram", account: "@takiwaki_shoko_", url: "https://www.instagram.com/takiwaki_shoko_/" }
                ].map((sns) => (
                  <a
                    key={sns.id}
                    href={sns.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-amber-50 text-gray-800 rounded border border-gray-200 hover:border-amber-300 transition-colors font-medium text-xs shadow-2xs"
                  >
                    <span className="font-extrabold text-amber-900">{sns.name}</span>
                    <span className="text-gray-500 font-mono text-[11px] group-hover:text-amber-900">{sns.account}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-72 shrink-0 flex items-center justify-center p-2">
            <div className="relative w-56 sm:w-64 md:w-72 aspect-4/3 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="しょこらの部屋 ロゴ"
                className="max-w-full max-h-full object-contain filter drop-shadow-2xs"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. 最新動画 (LATEST MOVIE - トップページの主役級見せ場) */}
      {/* ======================================================== */}
      {featuredVideo && (
        <section id="latest-movie" className="space-y-6 bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-2xs">
          
          {/* アニメ作品サイト風 見出し */}
          <div className="flex items-center justify-between border-b-2 border-amber-500 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-7 bg-amber-500 rounded-full shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 leading-none">
                  最新動画
                </h2>
                <span className="text-[11px] font-mono font-bold text-amber-600 tracking-wider">
                  LATEST MOVIE
                </span>
              </div>
            </div>

            <Link
              href="/youtube"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded border border-amber-200 transition-colors"
            >
              <span>動画一覧を見る</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
            </Link>
          </div>

          {/* メイン動画 1本（PC: 左に動画・右に情報 / スマホ: 上に動画・下に情報） */}
          {(() => {
            const videoId = featuredVideo.videoId || extractYouTubeVideoId(featuredVideo.youtubeURL || featuredVideo.sourceURL);
            const targetUrl = featuredVideo.youtubeURL || featuredVideo.sourceURL;

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-amber-50/40 p-4 sm:p-6 rounded-lg border border-amber-200/80">
                
                {/* 左側: 埋め込みプレイヤー */}
                <div className="lg:col-span-7 space-y-2">
                  {videoId ? (
                    <div className="relative w-full aspect-16/9 bg-black rounded-lg overflow-hidden shadow-xs border border-gray-300">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={featuredVideo.title}
                        className="absolute top-0 left-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-16/9 bg-gray-100 rounded-lg overflow-hidden shadow-xs border border-gray-300 flex items-center justify-center">
                      <img
                        src={featuredVideo.thumbnailURL || "/images/logo.png"}
                        alt={featuredVideo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* 右側: 情報・説明・導線ボタン */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="px-2 py-0.5 bg-amber-500 text-white font-bold text-[11px] rounded">
                        注目動画
                      </span>
                      <span className="font-mono text-gray-500 font-bold">
                        {featuredVideo.publishedDate}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 font-bold text-[11px] rounded border border-gray-200">
                        {featuredVideo.channelName || featuredVideo.sourceName}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug">
                      {featuredVideo.title}
                    </h3>

                    {featuredVideo.description && (
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-4">
                        {featuredVideo.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    {targetUrl && (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm rounded transition-colors shadow-2xs"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>YouTubeでフル視聴する ↗</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })()}

          {/* 5. サブ動画リスト (アニメ公式サイトの最新PV一覧風) */}
          {subVideoList.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                <Film className="w-4 h-4 text-amber-600" />
                <span>最新動画ピックアップ</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {subVideoList.map((video) => {
                  const vId = video.videoId || extractYouTubeVideoId(video.youtubeURL || video.sourceURL);
                  const thumb = video.thumbnailURL || (vId ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg` : "/images/logo.png");
                  const target = video.youtubeURL || video.sourceURL || "#";

                  return (
                    <a
                      key={video.id}
                      href={target}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gray-50 hover:bg-amber-50/60 rounded border border-gray-200 hover:border-amber-300 p-2 space-y-2 transition-colors block"
                    >
                      <div className="relative aspect-16/9 bg-gray-200 rounded overflow-hidden">
                        <img
                          src={thumb}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                          <div className="w-7 h-7 bg-amber-500/90 text-white rounded-full flex items-center justify-center shadow-xs">
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
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
            </div>
          )}

        </section>
      )}

      {/* ======================================================== */}
      {/* 4. 最新ニュース (NEWS) */}
      {/* ======================================================== */}
      <section id="news" className="space-y-4 bg-white rounded-xl border border-gray-200 p-5 sm:p-8 shadow-2xs">
        
        {/* 作品サイト風 見出し */}
        <div className="flex items-center justify-between border-b-2 border-amber-500 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 bg-amber-500 rounded-full shrink-0" />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 leading-none">
                最新ニュース
              </h2>
              <span className="text-[11px] font-mono font-bold text-amber-600 tracking-wider">
                LATEST NEWS
              </span>
            </div>
          </div>

          <Link href="/news" className="text-xs font-bold text-amber-900 hover:underline flex items-center gap-0.5">
            <span>ニュース一覧 →</span>
          </Link>
        </div>

        <div className="divide-y divide-gray-100 text-xs sm:text-sm">
          {latestNewsList.map((item) => {
            const targetUrl = item.youtubeURL || item.sourceURL;
            const hasValidUrl =
              targetUrl &&
              targetUrl.trim() !== "" &&
              targetUrl !== "#" &&
              !targetUrl.startsWith("javascript:") &&
              (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"));

            return (
              <div key={item.id} className="py-3">
                {hasValidUrl ? (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-amber-50/40 p-1.5 rounded transition-colors block cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-amber-800 font-bold shrink-0 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {item.publishedDate.replace(/-/g, ".")}
                      </span>
                      <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium shrink-0 flex items-center gap-1">
                      <span>{item.channelName || item.sourceName}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                    </span>
                  </a>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-1.5 text-gray-700">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-amber-800 font-bold shrink-0 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {item.publishedDate.replace(/-/g, ".")}
                      </span>
                      <span className="font-bold text-gray-900 leading-snug">
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

      <DiscoverRandomModal items={items} />

      {/* ======================================================== */}
      {/* 2カラムレイアウト: メインコンテンツ ＋ サイドバー */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        <div className="lg:col-span-2 space-y-10">

          {/* 5. 注目記事 / 新着記事 (ARTICLES) */}
          <section id="articles" className="space-y-4">
            
            {/* 作品サイト風 見出し */}
            <div className="flex items-center justify-between border-b-2 border-amber-500 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-7 bg-amber-500 rounded-full shrink-0" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 leading-none">
                    注目記事・アーカイブ
                  </h2>
                  <span className="text-[11px] font-mono font-bold text-amber-600 tracking-wider">
                    ARTICLES
                  </span>
                </div>
              </div>

              <Link href="/articles" className="text-xs font-bold text-amber-900 hover:underline">
                記事一覧を見る →
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
              {articlesList.map((item) => (
                <ArticleCard key={item.id} item={item} />
              ))}
            </div>

            <AdBanner type="listMiddleAd" />
          </section>

          {/* 6. 動画一覧への導線 (ALL MOVIES) */}
          <section className="bg-amber-500 text-white rounded-xl p-6 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold flex items-center gap-2">
                  <Film className="w-5 h-5 text-amber-100" />
                  <span>すべての動画コレクションを見る</span>
                </h3>
                <p className="text-xs text-amber-100 font-medium">
                  YouTube出演映像・ライブ映像・バラエティ等の公式動画をすべてチェックできます。
                </p>
              </div>

              <Link
                href="/youtube"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-amber-950 hover:bg-amber-50 font-extrabold text-xs sm:text-sm rounded transition-colors shrink-0 shadow-2xs"
              >
                <span>全動画一覧へ</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* 7. プロフィール導線 (PROFILE) */}
          <section id="profile" className="p-6 bg-amber-50/60 rounded-xl border border-amber-200 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>瀧脇笙古（たきわき しょうこ）プロフィール</span>
              </h3>
              <Link href="/profile" className="text-xs font-bold text-amber-900 hover:underline">
                詳細プロフィール →
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              指原莉乃プロデュースのアイドルグループ「＝LOVE（イコールラブ）」のメンバー。愛称「しょこちゃん」。神奈川県出身。横浜DeNAベイスターズファン、サブ4達成のフルマラソンランナー、料理上手としても知られ、マルチに活躍中！
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs font-bold">
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

        <div className="space-y-6">
          <Sidebar />
        </div>

      </div>

    </div>
  );
}
