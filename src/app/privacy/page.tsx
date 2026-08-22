import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumbs items={[{ label: "プライバシーポリシー" }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-shoko-beige-border shadow-card space-y-6">
        <div className="space-y-2 border-b border-shoko-beige-border pb-4">
          <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold">
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-shoko-text-main">
            プライバシーポリシー
          </h1>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-shoko-text-sub space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-shoko-text-main text-shoko-orange">
            1. 個人情報の利用目的
          </h2>
          <p>
            当サイトでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合にのみ利用いたします。
          </p>

          <h2 className="text-sm sm:text-base font-bold text-shoko-text-main text-shoko-orange">
            2. 広告の配信について (Google AdSense等)
          </h2>
          <p>
            当サイトは、第三者配信の広告サービス（Google AdSense等）を利用する可能性がございます。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。Cookieを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
          </p>

          <h2 className="text-sm sm:text-base font-bold text-shoko-text-main text-shoko-orange">
            3. アクセス解析ツールについて
          </h2>
          <p>
            当サイトでは、アクセス解析ツールを利用する場合があります。このデータは匿名で収集されており、個人を特定するものではありません。
          </p>

          <h2 className="text-sm sm:text-base font-bold text-shoko-text-main text-shoko-orange">
            4. 免責事項
          </h2>
          <p>
            当サイトのコンテンツ・情報について、できる限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
        </div>
      </div>
    </div>
  );
}
