import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Heart, Sparkles, ShieldAlert } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumbs items={[{ label: "このサイトについて" }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-shoko-beige-border shadow-card space-y-6">
        <div className="space-y-2 border-b border-shoko-beige-border pb-4">
          <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold">
            <Heart className="w-4 h-4 fill-shoko-orange" />
            <span>About Us</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-shoko-text-main">
            「しょこらの部屋」について
          </h1>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-shoko-text-sub space-y-4">
          <p>
            「しょこらの部屋」は、指原莉乃プロデュースのアイドルグループ「=LOVE（イコールラブ）」のメンバーである瀧脇笙古（たきわき しょうこ）さんを応援するための、非公式情報アーカイブ・ファンブログです。
          </p>

          <h2 className="text-base sm:text-lg font-bold text-shoko-text-main text-shoko-orange pt-2">
            当サイトの目的
          </h2>
          <p>
            瀧脇笙古さんについて検索したファンや初心者の方が、最新ニュース、YouTube公式動画、出演情報、インタビュー、横浜・ベイスターズ・マラソン・料理などの過去の活動や魅力を一箇所で分かりやすく探せるポータルサイトを目指しています。
          </p>

          <h2 className="text-base sm:text-lg font-bold text-shoko-text-main text-shoko-orange pt-2">
            独自価値と編集方針
          </h2>
          <p>
            当サイトでは、単なる他サイトのニュース転載やリンク集にはせず、各トピックスについて分かりやすく要約・紹介し、管理人の視点による紹介コメントを添えて訪問者の皆様が楽しく情報を探せるよう配慮しています。
          </p>

          <div className="bg-shoko-beige p-4 rounded-2xl border border-shoko-beige-border flex items-start gap-3 my-4">
            <ShieldAlert className="w-5 h-5 text-shoko-orange shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-shoko-text-main">非公式ファンサイトに関する表示</p>
              <p>
                このサイトは瀧脇笙古さん、=LOVE、所属事務所、関係各社とは関係のない非公式ファンサイトです。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
