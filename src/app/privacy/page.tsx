import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Lock, ShieldAlert, Info, ExternalLink } from "lucide-react";
import Link from "next/link";

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
          <p className="text-xs text-shoko-text-sub font-sans">
            当サイト「しょこらの部屋」（以下、「当サイト」といいます）における個人情報の保護、広告配信、アクセス解析等の取扱い方針について定めています。
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-shoko-text-sub space-y-6 font-sans">
          
          {/* 1. 非公式ファンサイトに関する表示 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-shoko-text-main flex items-center gap-2 text-[#191919] border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              1. 運営形態および非公式ファンサイトに関する表示
            </h2>
            <div className="bg-[#FFF9ED] p-4 rounded-2xl border border-shoko-beige-border space-y-2">
              <p className="text-shoko-text-main font-bold">
                当サイト「しょこらの部屋」（https://shokoblog.vercel.app/）は、ファン有志が個人で運営する非公式ファンサイト・情報アーカイブです。
              </p>
              <p className="text-xs text-shoko-text-sub leading-relaxed">
                瀧脇笙古さんご本人、アイドルグループ「＝LOVE（イコールラブ）」、株式会社代々木アニメーション学院、株式会社ソニー・ミュージックレーベルズ、その他公式・所属事務所・関係企業とは一切関係ございません。
              </p>
            </div>
          </section>

          {/* 2. 広告の配信について (Google AdSense) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-shoko-text-main flex items-center gap-2 text-[#191919] border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              2. 広告の配信について（Google AdSense等の第三者配信）
            </h2>
            <p>
              当サイトでは、第三者配信の広告サービスである「Google AdSense（グーグル アドセンス）」を利用しています。
            </p>
            <p>
              Googleなどの第三者広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他のウェブサイトへのアクセスに関する情報「Cookie（クッキー）」等を使用することがあります。Cookieを使用することで当サイトはお客様のブラウザを識別できるようになりますが、氏名、住所、メールアドレス、電話番号など個人を特定する情報は一切含まれません。
            </p>
            <p>
              Googleなどの第三者配信事業者がCookieを使用して、ユーザーが当サイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信します。
            </p>
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2 text-xs">
              <p className="font-bold text-zinc-800">
                パーソナライズ広告の無効化（オプトアウト）について：
              </p>
              <p>
                ユーザーは、Googleの広告設定ページにてパーソナライズド広告を無効に設定できます。
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

          {/* 3. アクセス解析ツールについて (Vercel Web Analytics) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-shoko-text-main flex items-center gap-2 text-[#191919] border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              3. アクセス解析ツールについて（Vercel Web Analytics）
            </h2>
            <p>
              当サイトでは、サイトの利用状況の把握や機能改善、快適な閲覧環境の提供を目的として「Vercel Web Analytics」を利用しています。
            </p>
            <p>
              Vercel Web Analyticsはプライバシーを最優先に設計されており、個人を特定可能な情報（個人情報）を収集せず、プライバシー保護に配慮した形で集計・匿名化されたアクセス統計情報（閲覧ページ、デバイス種別など）を分析しています。
            </p>
          </section>

          {/* 4. 個人情報の利用目的 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-shoko-text-main flex items-center gap-2 text-[#191919] border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              4. お問い合わせにおける個人情報の利用目的
            </h2>
            <p>
              当サイトのお問い合わせフォームをご利用いただく際、お名前やメールアドレス等の情報をご入力いただく場合がございます。これらの個人情報は、お問い合わせに対するご回答や必要な情報をご連絡する場合にのみ利用し、それ以外の目的で使用することや、正当な理由なく第三者に開示・提供することはございません。
            </p>
          </section>

          {/* 5. 免責事項 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-shoko-text-main flex items-center gap-2 text-[#191919] border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              5. 免責事項
            </h2>
            <p>
              当サイトのコンテンツや掲載情報につきましては、正確な情報を掲載するよう細心の注意を払っておりますが、その正確性、最新性、安全性、適切性を保証するものではありません。当サイトに掲載された内容によって生じたトラブルや損害等の一切の責任を負いかねますのであらかじめご了承ください。
            </p>
            <p>
              また、当サイトからリンクやバナーなどによって他の外部サイトへ移動された場合、移動先サイトで提供される情報・サービス・個人情報保護等について当サイトは一切の責任を負いません。
            </p>
          </section>

          {/* 6. 著作権・肖像権について */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-shoko-text-main flex items-center gap-2 text-[#191919] border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              6. 著作権・肖像権について
            </h2>
            <p>
              当サイトで紹介している記事、動画、画像等の著作権や肖像権は、各権利所有者様に帰属いたします。権利を侵害する目的は一切ございません。掲載内容に関して問題がございましたら、権利者ご本人様よりお問い合わせフォームからご連絡いただけますようお願い申し上げます。確認のうえ速やかに適切に対応いたします。
            </p>
          </section>

          {/* 7. お問い合わせ先 */}
          <section className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-shoko-text-main flex items-center gap-2 text-[#191919] border-b border-shoko-beige-border pb-2">
              <span className="w-1.5 h-4 bg-shoko-orange rounded-full inline-block" />
              7. お問い合わせ窓口
            </h2>
            <p>
              本ポリシーに関するご質問や当サイトへのご連絡は、以下のフォームよりお願いいたします。
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
