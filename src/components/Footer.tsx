"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 text-xs font-mono border-t border-zinc-800">
      <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-10 lg:px-16 py-14 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Logo & Subtitle */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 bg-yellow-500" />
              <span className="text-xl font-black text-white tracking-tight font-sans">
                しょこらの部屋
              </span>
            </div>
            <p className="text-zinc-400 text-xs font-sans leading-relaxed max-w-[480px]">
              ＝LOVE（イコールラブ）メンバー 瀧脇笙古さんの非公式ファンサイトです。最新ニュース、出演メディア情報、YouTube動画などの記録を配信しています。
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
              // SITE INDEX
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link href="/news" className="hover:text-white transition-colors">NEWS (最新情報)</Link>
              <Link href="/articles" className="hover:text-white transition-colors">ARTICLES (記事)</Link>
              <Link href="/youtube" className="hover:text-white transition-colors">MOVIE (動画)</Link>
              <Link href="/profile" className="hover:text-white transition-colors">PROFILE (人物)</Link>
              <Link href="/about" className="hover:text-white transition-colors">ABOUT (当サイトについて)</Link>
              <Link href="/contact" className="hover:text-white transition-colors">CONTACT (お問い合わせ)</Link>
            </div>
          </div>

          {/* Disclaimer Note */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
              // DISCLAIMER
            </div>
            <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
              当サイトはファン有志が個人で運営する非公式ファンサイトであり、＝LOVE公式、株式会社代々木アニメーション学院、ソニー・ミュージックレーベルズとは一切関係ございません。
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 font-bold">
          <div>
            &copy; {new Date().getFullYear()} しょこらの部屋 // TAKIWAKI SHOKO UNOFFICIAL FAN SITE
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-zinc-300">PRIVACY POLICY</Link>
            <Link href="/disclaimer" className="hover:text-zinc-300">DISCLAIMER</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
