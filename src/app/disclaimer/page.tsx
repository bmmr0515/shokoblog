import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumbs items={[{ label: "免責事項" }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-shoko-beige-border shadow-card space-y-6">
        <div className="space-y-2 border-b border-shoko-beige-border pb-4">
          <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Disclaimer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-shoko-text-main">
            免責事項
          </h1>
        </div>

        {/* Highlight Banner */}
        <div className="bg-shoko-orange-light rounded-2xl p-5 border-2 border-shoko-orange space-y-2">
          <div className="flex items-center gap-2 text-shoko-orange font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>非公式ファンサイトに関する表示</span>
          </div>
          <p className="text-sm font-bold text-shoko-text-main leading-relaxed">
            このサイトは瀧脇笙古さん、=LOVE、所属事務所、関係各社とは関係のない非公式ファンサイトです。
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-shoko-text-sub space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-shoko-text-main text-shoko-orange">
            著作権・肖像権について
          </h2>
          <p>
            当サイトで掲載・紹介している画像・動画・引用文等の著作権や肖像権は、各権利所有者様に帰属いたします。当サイトは権利の侵害を目的としたものではありません。
          </p>
          <p>
            外部記事等の紹介につきましては、全文転載を行わず、内容を独自に要約した紹介文と引用最小限の記載、および情報元リンクの掲載を行っております。掲載内容やリンクに問題がございましたら、権利所有者様ご本人より<a href="/contact" className="text-shoko-orange underline font-bold">お問い合わせフォーム</a>までご連絡ください。確認後、迅速に対応いたします。
          </p>

          <h2 className="text-sm sm:text-base font-bold text-shoko-text-main text-shoko-orange">
            情報の正確性と損害賠償責任
          </h2>
          <p>
            当サイトのコンテンツや情報につきましては、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が混入する場合や情報が古くなっている場合もございます。当サイトに掲載された内容によって生じた損害等の責任は一切負いかねますので、あらかじめご了承ください。
          </p>
        </div>
      </div>
    </div>
  );
}
