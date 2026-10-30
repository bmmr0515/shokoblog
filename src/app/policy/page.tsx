import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, Heart, ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営方針・広告について｜しょこらの部屋",
  description: "＝LOVE 瀧脇笙古さんの非公式ファンサイト「しょこらの部屋」の運営方針、広告掲載、著作権・権利配慮についてのご案内です。",
};

export default function PolicyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 py-4">
      <Breadcrumbs items={[{ label: "運営方針・広告について" }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-shoko-beige-border shadow-card space-y-8">
        
        {/* ヘッダー */}
        <div className="space-y-2 border-b border-shoko-beige-border pb-5">
          <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Site Policy & Advertisement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-maru font-extrabold text-shoko-text-main">
            運営方針・広告について
          </h1>
          <p className="text-xs text-shoko-text-sub font-sans leading-relaxed">
            当サイトの運営目的、広告掲載基準、著作権・肖像権への配慮方針、および非公式ファンサイトとしての基本方針について記載しています。
          </p>
        </div>

        {/* 本文エリア */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-shoko-text-sub space-y-6 font-sans">
          
          <div className="bg-[#FFF9ED] p-4 sm:p-5 rounded-2xl border border-shoko-beige-border space-y-2">
            <p className="text-shoko-text-main font-bold">
              「しょこらの部屋」は、瀧脇笙古さんの活動や魅力をより多くの方に知ってもらい、これまでの活動を振り返るために運営している非公式ファンサイトです。
            </p>
            <p className="text-xs text-shoko-text-sub leading-relaxed">
              瀧脇笙古さん本人、＝LOVE、所属事務所、レーベル、その他関係各社が運営する公式サイトではありません。
            </p>
          </div>

          {/* 1. 広告掲載について */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              広告掲載について
            </h2>
            <p>
              当サイトでは、サイトの継続的な運営・保守・改善のため、Google AdSenseなどの第三者配信広告を掲載する場合があります。
            </p>
            <p>
              広告掲載によって得られた収益は、サイトの運営費、サーバー・サービス利用費、機能改善、情報整理など、サイト運営に関わる費用へ充てる場合があります。
            </p>
            <p>
              広告の掲載は、瀧脇笙古さん本人、＝LOVE、所属事務所、関係企業による推薦・協賛・広告出稿を意味するものではありません。
            </p>
            <p>
              また、当サイトに表示される広告の商品・サービスと、瀧脇笙古さん本人および関係各社との間に関係があることを示すものではありません。
            </p>
          </section>

          {/* 2. 広告とコンテンツの区別 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              広告とコンテンツの区別
            </h2>
            <p>
              広告については、通常の記事やコンテンツと混同されないよう、「広告」「ADVERTISEMENT」などの表示を行います。
            </p>
            <p>
              企業から依頼を受けた記事、商品提供を受けた紹介、アフィリエイトによる紹介などを行う場合は、その関係が分かるよう明示します。
            </p>
            <p>
              広告であることを隠した形での商品・サービス紹介は行いません。
            </p>
          </section>

          {/* 3. 著作権・権利について */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              著作権・権利について
            </h2>
            <p>
              当サイトで紹介する動画、記事、画像、名称その他のコンテンツの権利は、それぞれの権利者に帰属します。
            </p>
            <p>
              YouTube動画については、原則として公式に提供されている埋め込み機能を利用します。
            </p>
            <p>
              外部メディアの記事については、記事内容そのものを転載するのではなく、概要紹介と掲載元へのリンクを基本とします。
            </p>
            <p>
              当サイトは、権利者のコンテンツそのものを販売したり、公式コンテンツであるかのように提供することを目的としていません。
            </p>
            <p>
              掲載内容について問題がある場合は、確認のうえ、修正・削除等の対応を行います。
            </p>
          </section>

          {/* 4. 非公式ファンサイトとしての方針 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              非公式ファンサイトとしての方針
            </h2>
            <p>
              当サイトは、瀧脇笙古さんの活動を応援することを目的としています。
            </p>
            <p>
              広告収益の有無にかかわらず、公式活動への導線を妨げることや、公式商品・サービスと競合することを目的とした運営は行いません。
            </p>
            <p>
              公式情報が存在する場合は、できる限り公式サイトや公式SNS、公式動画などへの導線を優先します。
            </p>
            <p>
              また、当サイト独自の商品を、瀧脇笙古さん本人や＝LOVEの公式商品であるかのように販売することはありません。
            </p>
          </section>

          {/* 5. 広告が表示されないコンテンツ */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              広告が表示されないコンテンツ
            </h2>
            <p>
              HISTORYなど、一部のコンテンツでは視聴体験や作品性を優先し、広告を掲載しない場合があります。
            </p>
            <p>
              広告を掲載する場合も、コンテンツの閲覧を大きく妨げない配置を心がけます。
            </p>
          </section>

          {/* 6. Google AdSenseについて */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              Google AdSenseについて
            </h2>
            <p>
              当サイトでは、Google AdSenseを利用する場合があります。
            </p>
            <p>
              Googleなどの第三者配信事業者はCookie等を利用し、ユーザーが当サイトや他のウェブサイトへ過去にアクセスした際の情報に基づいて広告を配信する場合があります。
            </p>
            <p>
              広告配信やCookie等の取り扱いについては、当サイトの
              <Link href="/privacy" className="text-shoko-orange font-bold hover:underline mx-1">
                プライバシーポリシー
              </Link>
              もあわせてご確認ください。
            </p>
          </section>

          {/* 7. お問い合わせ・権利者の方へ */}
          <section className="space-y-3 bg-[#FFF9ED] p-5 rounded-2xl border border-shoko-beige-border">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <HelpCircle className="w-4 h-4 text-shoko-orange" />
              お問い合わせ・権利者の方へ
            </h2>
            <p>
              掲載内容に関するご指摘、修正・削除のご要望、権利に関するお問い合わせについては、お問い合わせフォームよりご連絡ください。
            </p>
            <p className="text-xs text-shoko-text-sub">
              内容を確認のうえ、必要に応じて迅速に対応いたします。
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-shoko-orange text-white font-bold rounded-xl text-xs hover:bg-shoko-orange-deep transition-colors shadow-2xs"
              >
                <span>お問い合わせフォームはこちら</span>
                <span>→</span>
              </Link>
            </div>
          </section>

          {/* フッター署名 */}
          <div className="pt-4 border-t border-shoko-beige-border text-xs text-zinc-500 font-mono space-y-1">
            <p className="font-bold text-zinc-700">「しょこらの部屋」</p>
            <p>非公式ファンサイト</p>
          </div>

        </div>
      </div>
    </div>
  );
}
