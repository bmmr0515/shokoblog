import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Lock, ShieldAlert, Globe, ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜しょこらの部屋",
  description: "＝LOVE 瀧脇笙古さんの非公式ファンサイト「しょこらの部屋」のプライバシーポリシーです。個人情報の取り扱い、Cookieの利用、Google AdSense、Vercel Web Analyticsについて定めています。",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 py-4">
      <Breadcrumbs items={[{ label: "プライバシーポリシー" }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-shoko-beige-border shadow-card space-y-8">
        
        {/* ヘッダー */}
        <div className="space-y-2 border-b border-shoko-beige-border pb-5">
          <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold uppercase tracking-wider font-mono">
            <Lock className="w-4 h-4" />
            <span>Privacy Policy & Legal Notes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-maru font-extrabold text-shoko-text-main">
            プライバシーポリシー
          </h1>
          <p className="text-xs text-shoko-text-sub font-sans leading-relaxed">
            当サイト「しょこらの部屋」（以下、「当サイト」といいます）における個人情報の保護、広告配信、Cookie（クッキー）等の取り扱い方針について定めています。
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-shoko-text-sub space-y-6 font-sans">
          
          {/* 1. 非公式ファンサイトに関する表示 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              1. 運営形態および非公式ファンサイトに関する表示
            </h2>
            <div className="bg-[#FFF9ED] p-4 sm:p-5 rounded-2xl border border-shoko-beige-border space-y-2">
              <p className="text-shoko-text-main font-bold">
                当サイト「しょこらの部屋」（https://shokoblog.vercel.app/）は、ファン有志（個人）により運営される非公式ファンサイト・情報アーカイブです。
              </p>
              <p className="text-xs text-shoko-text-sub leading-relaxed">
                瀧脇笙古さん本人、＝LOVE、所属事務所、レーベル、その他関係各社が運営・管理する公式サイトではありません。
              </p>
              <div className="pt-1 text-[11px] text-zinc-500">
                詳しい運営方針や広告に関する考え方については、
                <Link href="/policy" className="text-shoko-orange font-bold hover:underline mx-1">
                  運営方針・広告について
                </Link>
                をご確認ください。
              </div>
            </div>
          </section>

          {/* 2. 広告の配信について (Google AdSense等の第三者配信) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              2. 広告の配信について（Google AdSense）
            </h2>
            <p>
              当サイトでは、サイトの継続的な運営・保守・改善のため、第三者配信の広告サービス「Google AdSense（グーグル アドセンス）」を利用しています。
            </p>
            <p>
              Googleなどの第三者配信事業者は、Cookie（クッキー）等を利用して、ユーザーが当サイトや他のウェブサイトへ過去にアクセスした際の情報に基づいて広告を配信する場合があります。
            </p>
            <p>
              Cookieを使用することにより、Googleやそのパートナー事業者は、当サイトや他のサイトへのアクセス情報に基づき、適切な広告をユーザーに表示します。Cookieを通じて収集される情報には、氏名、住所、メールアドレス、電話番号など個人を特定する情報は一切含まれません。
            </p>
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2 text-xs">
              <p className="font-bold text-zinc-800">
                パーソナライズド広告の無効化（オプトアウト）について：
              </p>
              <p>
                ユーザーは、Googleの広告設定ページからパーソナライズド広告の掲載を無効にできます。
              </p>
              <p>
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-shoko-orange font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Google 広告設定（Ads Settings）</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p className="text-[11px] text-zinc-500">
                また、<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 underline">www.aboutads.info</a> にアクセスすることで、第三者配信事業者がパーソナライズド広告の掲載で使用するCookieを無効にすることも可能です。
              </p>
            </div>
          </section>

          {/* 3. 海外ユーザー対応および同意管理（CMP）について */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              3. 海外ユーザー対応および同意管理プラットフォーム（CMP）について
            </h2>
            <p>
              欧州経済領域（EEA）、英国、スイス等の地域からアクセスされるユーザーに対しては、Google AdSenseの「プライバシーとメッセージ」機能（Google認定同意管理プラットフォーム：CMP）を利用し、GDPR等の各法令に準拠した同意取得メッセージが表示される場合があります。
            </p>
            <p>
              当サイトでは、Googleの公式CMP機能を阻害するような独自の不完全なCookieバナーの設置やブロック処理は行わず、ユーザーがGoogle公式の同意ダイアログからプライバシー設定を適切に管理できる環境を維持しています。
            </p>
          </section>

          {/* 4. アクセス解析ツールについて (Vercel Web Analytics) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              4. アクセス解析ツールについて（Vercel Web Analytics）
            </h2>
            <p>
              当サイトでは、トラフィックの把握、ページの改善、利便性向上のため「Vercel Web Analytics」を利用しています。
            </p>
            <p>
              Vercel Web Analyticsはプライバシーを尊重した設計となっており、個人を特定できる情報（氏名や正確な住所など）は収集されず、集計・匿名化されたアクセス統計情報（閲覧ページ、端末種別など）のみを分析しています。
            </p>
          </section>

          {/* 5. 個人情報の利用目的 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              5. お問い合わせにおける個人情報の利用目的
            </h2>
            <p>
              当サイトのお問い合わせフォームをご利用いただく際、お名前やメールアドレス等の情報をご入力いただきます。これらの情報は、お問い合わせに対するご回答や掲載内容の修正・削除のご連絡にのみ利用し、正当な理由なく第三者に開示・提供することはありません。
            </p>
          </section>

          {/* 6. 免責事項 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              6. 免責事項
            </h2>
            <p>
              当サイトのコンテンツや掲載情報につきましては、正確な情報を掲載するよう細心の注意を払っておりますが、その正確性、最新性、安全性、適切性を保証するものではありません。当サイトに掲載された内容によって生じたトラブルや損害等の一切の責任を負いかねますのであらかじめご了承ください。
            </p>
            <p>
              また、当サイトからリンクやバナーなどによって他の外部サイトへ移動された場合、移動先サイトで提供される情報・サービス・個人情報保護等について当サイトは一切の責任を負いません。
            </p>
          </section>

          {/* 7. 著作権・肖像権および権利者の方へ */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              7. 著作権・肖像権および権利者の方への窓口
            </h2>
            <p>
              当サイトで紹介している記事、動画、画像等の著作権や肖像権は、各権利所有者様に帰属します。権利を侵害する目的は一切ございません。
            </p>
            <p>
              掲載内容に関して問題やご指摘、修正・削除のご要望がございましたら、権利者ご本人様または正当な関係者様よりお問い合わせフォームからご連絡ください。確認のうえ速やかに適切な対応を行います。
            </p>
          </section>

          {/* 8. お問い合わせ窓口 */}
          <section className="space-y-3 pt-2 bg-[#FFF9ED] p-5 rounded-2xl border border-shoko-beige-border">
            <h2 className="text-base sm:text-lg font-bold text-[#191919] flex items-center gap-2 border-b border-shoko-beige-border pb-2">
              <HelpCircle className="w-4 h-4 text-shoko-orange" />
              お問い合わせ窓口
            </h2>
            <p>
              本ポリシーに関するご質問や、掲載内容に関する修正・削除等のご依頼は、以下のフォームよりお願いいたします。
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-shoko-orange text-white font-bold rounded-xl text-xs hover:bg-shoko-orange-deep transition-colors shadow-2xs"
              >
                <span>お問い合わせフォームへ</span>
                <span>→</span>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
