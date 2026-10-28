"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#191919] text-zinc-400 text-xs font-mono border-t border-zinc-800">
      <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 py-14 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Logo & Subtitle */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 bg-[#F6C744] rounded-full" />
              <span className="text-xl font-maru font-extrabold text-white tracking-tight">
                しょこらの部屋
              </span>
            </div>
            <p className="text-zinc-400 text-xs font-sans leading-relaxed max-w-[480px]">
              ＝LOVE（イコールラブ）メンバー 瀧脇笙古さんの非公式ファンサイトです。最新ニュース、出演メディア情報、YouTube動画などの記録を配信しています。
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-[10px] font-bold text-[#F6C744] uppercase tracking-widest">
              // SITE INDEX
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
              <Link href="/news" className="hover:text-white transition-colors">NEWS (最新情報)</Link>
              <Link href="/articles" className="hover:text-white transition-colors">ARTICLES (記事)</Link>
              <Link href="/youtube" className="hover:text-white transition-colors">MOVIE (動画)</Link>
              <Link href="/history" className="hover:text-[#F6C744] text-[#F6C744] transition-colors">HISTORY (歴史)</Link>
              <Link href="/profile" className="hover:text-white transition-colors">PROFILE (人物)</Link>
              <Link href="/about" className="hover:text-white transition-colors">ABOUT (当サイトについて)</Link>
              <Link href="/operator" className="hover:text-white transition-colors">OPERATOR (運営者情報)</Link>
              <Link href="/contact" className="hover:text-white transition-colors">CONTACT (お問い合わせ)</Link>
            </div>
          </div>

          {/* Disclaimer & Operator Note */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-[10px] font-bold text-[#F6C744] uppercase tracking-widest">
              // DISCLAIMER & OPERATOR
            </div>
            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
              当サイト「しょこらの部屋」はファン有志（個人）により運営される非公式ファンサイトです。＝LOVE公式、所属事務所、関係各社とは一切関係ございません。
            </p>
            <p className="text-[10px] text-zinc-500 font-sans">
              運営主体：しょこらの部屋 運営チーム ／ ご連絡は<Link href="/contact" className="text-zinc-300 underline hover:text-[#F6C744] ml-1">お問い合わせフォーム</Link>より承ります。
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 font-bold">
          <div>
            &copy; {new Date().getFullYear()} しょこらの部屋 // TAKIWAKI SHOKO UNOFFICIAL FAN SITE
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/operator" className="hover:text-zinc-300">OPERATOR</Link>
            <Link href="/privacy" className="hover:text-zinc-300">PRIVACY POLICY</Link>
            <Link href="/disclaimer" className="hover:text-zinc-300">DISCLAIMER</Link>
            <Link href="/contact" className="hover:text-zinc-300">CONTACT</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
