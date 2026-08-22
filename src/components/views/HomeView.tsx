"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LinkItem, Category } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { ArticleCard } from "@/components/ArticleCard";
import { YouTubeEmbedCard } from "@/components/YouTubeEmbedCard";
import { Sidebar } from "@/components/Sidebar";
import { AdBanner } from "@/components/AdBanner";
import { DiscoverRandomModal } from "@/components/DiscoverRandomModal";
import { ExternalLink, Newspaper, ArrowRight, Video, User } from "lucide-react";

export function HomeView() {
  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    setItems(getLinkItems());
  }, []);

  const latestItems = [...items].sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));

  const latestNewsList = latestItems.slice(0, 3);
  const articlesList = latestItems.filter((i) => i.contentType !== "youtube" && !i.youtubeURL && i.category !== "YouTube").slice(0, 8);
  const youtubeList = latestItems.filter((i) => i.contentType === "youtube" || !!i.youtubeURL || i.category === "YouTube").slice(0, 6);

  const mainCategories: { name: string; category: Category }[] = [
    { name: "ベイスターズ", category: "ベイスターズ" },
    { name: "マラソン・スポーツ", category: "マラソン・スポーツ" },
    { name: "料理", category: "料理" },
    { name: "インタビュー", category: "インタビュー" },
    { name: "過去記事", category: "過去記事" },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-8">

      {/* 1. ヒーローセクション */}
      <section className="bg-[#FFFDF4] border border-amber-200/80 rounded-lg p-5 sm:p-8 md:p-10 shadow-2xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          <div className="flex-1 space-y-4 text-left w-full">
            <div className="inline-block px-3 py-1 bg-amber-100/80 text-amber-900 text-xs font-bold rounded-full border border-amber-200">
              ＝LOVE 瀧脇笙古 非公式ファンサイト
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              しょこらの部屋へようこそ
            </h1>

            <p className="text-sm sm:text-base font-bold text-gray-800 leading-relaxed">
              瀧脇笙古さんのニュース、記事、動画をまとめた非公式ファンサイトです。
            </p>

            <div className="pt-2 flex items-center gap-2.5 flex-wrap">
              <a
                href="#news"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-2xs"
              >
                <span>最新ニュースを見る</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#articles"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-800 border border-gray-300 hover:bg-amber-50/50 hover:border-amber-300 font-bold text-xs sm:text-sm rounded transition-colors"
              >
                <span>記事一覧を見る</span>
              </a>

              <Link
                href="/youtube"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-800 border border-gray-300 hover:bg-amber-50/50 hover:border-amber-300 font-bold text-xs sm:text-sm rounded transition-colors"
              >
                <span>動画を見る</span>
              </Link>
            </div>

            {/* 2. 本人公式SNS */}
            <div className="pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
              <span className="font-bold text-amber-900 shrink-0">公式SNS:</span>
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
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-amber-100/60 text-gray-800 rounded border border-amber-200 transition-colors font-medium text-xs shadow-2xs"
                  >
                    <span className="font-bold text-amber-900">{sns.name}</span>
                    <span className="text-gray-500 font-mono text-[11px] group-hover:text-amber-900">{sns.account}</span>
                    <ExternalLink className="w-3 h-3 text-orange-600 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 shrink-0 flex items-center justify-center p-2">
            <div className="relative w-64 sm:w-72 md:w-80 aspect-4/3 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="しょこらの部屋 ロゴ"
                className="max-w-full max-h-full object-contain filter drop-shadow-2xs"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. 最新ニュース */}
      <section id="news" className="space-y-3 bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between border-b-2 border-amber-500 pb-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-amber-500" />
            <span>最新ニュース</span>
          </h2>
          <Link href="/news" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-0.5">
            <span>もっと見る →</span>
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
              <div key={item.id} className="py-2.5">
                {hasValidUrl ? (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-amber-50/40 p-1 rounded transition-colors block cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-gray-500 font-bold shrink-0">
                        {item.publishedDate.replace(/-/g, ".")}
                      </span>
                      <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium shrink-0 flex items-center gap-1">
                      <span>媒体: {item.channelName || item.sourceName}</span>
                      <ExternalLink className="w-3 h-3 text-orange-600" />
                    </span>
                  </a>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-1 text-gray-700">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-gray-500 font-bold shrink-0">
                        {item.publishedDate.replace(/-/g, ".")}
                      </span>
                      <span className="font-bold text-gray-900 leading-snug">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium shrink-0">
                      媒体: {item.channelName || item.sourceName} (掲載記録)
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <DiscoverRandomModal items={items} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        <div className="lg:col-span-2 space-y-10">

          {/* 4. 注目記事 / 新着記事 (ARTICLES) */}
          <section id="articles" className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-amber-500 pb-2">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                <span>ARTICLES</span>
                <span className="text-xs font-normal text-gray-500">注目記事・アーカイブ</span>
              </h2>
              <Link href="/articles" className="text-xs font-bold text-orange-600 hover:underline">
                記事一覧を見る →
              </Link>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
              <span className="text-gray-400 font-medium mr-1">主要タグ:</span>
              {mainCategories.map((c) => (
                <Link
                  key={c.name}
                  href={`/category/${encodeURIComponent(c.category)}`}
                  className="px-2 py-1 bg-white hover:bg-amber-50 text-gray-700 hover:text-amber-900 rounded border border-gray-200 text-xs font-medium transition-colors"
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

          {/* 5. 注目動画 (MOVIE) */}
          <section id="movie" className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between border-b-2 border-amber-500 pb-2">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-500" />
                <span>MOVIE</span>
                <span className="text-xs font-normal text-gray-500">YouTube動画コレクション</span>
              </h2>
              <Link href="/youtube" className="text-xs font-bold text-orange-600 hover:underline">
                全動画一覧へ →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {youtubeList.slice(0, 4).map((item) => (
                <YouTubeEmbedCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* 6. プロフィール導線 (PROFILE) */}
          <section id="profile" className="p-5 bg-amber-50/50 rounded-lg border border-amber-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>瀧脇笙古（たきわき しょうこ）プロフィール</span>
              </h3>
              <Link href="/profile" className="text-xs font-bold text-orange-600 hover:underline">
                詳細プロフィール →
              </Link>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              指原莉乃プロデュースのアイドルグループ「＝LOVE（イコールラブ）」のメンバー。愛称「しょこちゃん」。神奈川県出身。横浜DeNAベイスターズファン、サブ4達成のフルマラソンランナー、料理上手としても知られ、マルチに活躍中！
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs">
              <a
                href="https://x.com/shoko_takiwaki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 font-bold hover:underline flex items-center gap-1"
              >
                <span>公式X (@shoko_takiwaki) ↗</span>
              </a>
              <a
                href="https://www.instagram.com/takiwaki_shoko_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 font-bold hover:underline flex items-center gap-1"
              >
                <span>公式Instagram ↗</span>
              </a>
            </div>
          </section>

        </div>

        <div className="space-y-6">
          <Sidebar items={items} />
        </div>

      </div>

    </div>
  );
}
