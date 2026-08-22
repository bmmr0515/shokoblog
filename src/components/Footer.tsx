import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 py-8 mt-12 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* 非公式ファンサイト表示 */}
        <div className="bg-amber-50/40 p-4 rounded border border-amber-200/70 space-y-1.5">
          <p className="font-bold text-amber-900">
            【非公式ファンサイトに関する表示】
          </p>
          <p className="text-gray-600 leading-relaxed">
            当サイトは瀧脇笙古さん、＝LOVEおよび所属事務所・関係各社とは関係のない非公式ファンサイトです。
          </p>
          <p className="text-gray-600 leading-relaxed">
            掲載している画像・動画・記事等の権利は各権利者に帰属します。
          </p>
        </div>

        {/* フッターナビゲーション */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 text-gray-600">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/about" className="hover:text-amber-800 transition-colors">このサイトについて</Link>
            <Link href="/operator" className="hover:text-amber-800 transition-colors">運営者情報</Link>
            <Link href="/privacy" className="hover:text-amber-800 transition-colors">プライバシーポリシー</Link>
            <Link href="/contact" className="hover:text-amber-800 transition-colors">お問い合わせ</Link>
            <Link href="/disclaimer" className="hover:text-amber-800 transition-colors">免責事項</Link>
            <Link href="/sitemap.xml" className="hover:text-amber-800 transition-colors">Sitemap</Link>
          </div>

          <div className="font-bold text-gray-900">
            しょこらの部屋
          </div>
        </div>

        <div className="text-center text-gray-400 text-[11px]">
          © {new Date().getFullYear()} しょこらの部屋 - 瀧脇笙古 非公式ファンサイト
        </div>
      </div>
    </footer>
  );
};
