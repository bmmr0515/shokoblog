"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LinkItem } from "@/types/blog";
import { getLinkItems } from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sidebar } from "@/components/Sidebar";
import { ArticleListWithAds } from "@/components/ArticleListWithAds";
import { Search, Sparkles } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [inputQuery, setInputQuery] = useState(query);
  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    setItems(getLinkItems());
    setInputQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputQuery.trim())}`);
    }
  };

  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((k) => k.length > 0);

  const searchResults = query
    ? items.filter((item) => {
        const fullText = (
          item.title +
          " " +
          item.sourceName +
          " " +
          item.description +
          " " +
          item.category +
          " " +
          item.tags.join(" ")
        ).toLowerCase();

        return keywords.every((kw) => fullText.includes(kw));
      })
    : [];

  const suggestedKeywords = ["ベイスターズ", "マラソン", "料理", "横浜", "SASUKE", "インタビュー"];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "サイト内検索" }]} />

      {/* Search Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-shoko-beige-border shadow-card space-y-4">
        <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold">
          <Search className="w-4 h-4" />
          <span>Site Search</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-shoko-text-main">
          瀧脇笙古さんに関する実在ニュース・動画・インタビューを検索
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="例: ベイスターズ / マラソン / SASUKE / 横浜"
              className="w-full pl-10 pr-4 py-3 text-sm bg-shoko-beige rounded-2xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange focus:ring-2 focus:ring-shoko-orange/20"
            />
            <Search className="w-5 h-5 text-shoko-text-sub absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-shoko-orange text-white font-bold text-sm rounded-2xl hover:bg-shoko-orange-deep transition-colors shadow-sm"
          >
            検索
          </button>
        </form>

        {/* Suggested Keywords */}
        <div className="pt-2 flex items-center gap-2 flex-wrap text-xs text-shoko-text-sub">
          <span className="font-semibold text-shoko-orange flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> おすすめキーワード:
          </span>
          {suggestedKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => router.push(`/search?q=${encodeURIComponent(kw)}`)}
              className="px-3 py-1 rounded-full bg-shoko-beige hover:bg-shoko-orange-light hover:text-shoko-orange transition-colors border border-shoko-beige-border font-medium"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {query && (
            <div className="text-sm font-semibold text-shoko-text-sub">
              「<span className="text-shoko-orange">{query}</span>」の検索結果:{" "}
              <strong className="text-shoko-text-main">{searchResults.length}</strong> 件
            </div>
          )}

          {query === "" ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-shoko-beige-border text-shoko-text-sub space-y-3">
              <p className="text-base font-semibold">キーワードを入力して外部記事・動画を検索できます</p>
              <p className="text-xs text-shoko-text-light">
                「ベイスターズ」「マラソン」「料理」「横浜」「SASUKE」「インタビュー」などのキーワードでお探しの外部情報を探せます。
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-shoko-beige-border text-shoko-text-sub space-y-2">
              <p className="text-base font-semibold">該当する実在記事・リンクが見つかりませんでした。</p>
              <p className="text-xs text-shoko-text-light">別のキーワードをお試しください。</p>
            </div>
          ) : (
            <ArticleListWithAds items={searchResults} />
          )}
        </div>

        <div>
          <Sidebar items={items} />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">検索コンポーネントを読み込み中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
