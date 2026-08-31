"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Play, Film, Calendar, List, ChevronRight } from "lucide-react";

interface Chapter {
  id: string;
  num: string;
  year: string;
  tag: string;
  titleEn: string;
  titleJa: string;
  subtitlePre?: string;
  subtitlePost?: string;
  copy: string[];
  videoId: string;
  start?: number;
  label?: string;
  specialStat?: { value: string; label: string };
  timeGapText?: string;
  isCinemaLast?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    id: "chapter-01",
    num: "01",
    year: "2017",
    tag: "START",
    titleEn: "THE BEGINNING",
    titleJa: "すべては、ここから始まりました。",
    copy: [
      "2017年。",
      "＝LOVEのオーディション。",
      "まだ、この先にどんな景色が待っているのか、",
      "誰にも分かりませんでした。"
    ],
    videoId: "zXR_xhihDOQ",
    start: 1
  },
  {
    id: "chapter-02",
    num: "02",
    year: "2017",
    tag: "TRAINING",
    titleEn: "TRAINING",
    titleJa: "できないところから、始まりました。",
    subtitlePre: "ダンス経験は、ありませんでした。",
    copy: [
      "ダンス未経験。",
      "初めての合宿。厳しいレッスン。",
      "思うようにできない自分と向き合いながら、",
      "それでも前へ進んでいきます。"
    ],
    videoId: "RPlkP-5jP44",
    start: 756
  },
  {
    id: "chapter-03",
    num: "03",
    year: "2020",
    tag: "CHALLENGE",
    titleEn: "CHALLENGE",
    titleJa: "アイドルの外でも、挑戦する。",
    label: "SASUKE 2020",
    copy: [
      "ステージだけではありません。",
      "運動を得意とする個性は、",
      "新しい挑戦へつながっていきます。"
    ],
    videoId: "zUeSRsheJC8"
  },
  {
    id: "chapter-04",
    num: "04",
    year: "2021",
    tag: "FIRST CENTER",
    titleEn: "FIRST CENTER",
    titleJa: "初めて、センターに立つ。",
    subtitlePre: "加入から4年。",
    subtitlePost: "初めて、センターに立ちました。",
    copy: [
      "加入から積み重ねてきた時間。",
      "そして2021年。",
      "「BPM170の君へ」で、",
      "自身初のセンターを任されました。"
    ],
    videoId: "ei0BtXWrVb4",
    start: 1065
  },
  {
    id: "chapter-05",
    num: "05",
    year: "2021",
    tag: "ON STAGE",
    titleEn: "ON STAGE",
    titleJa: "真ん中に立つ姿。",
    copy: [
      "メイキングで語られた想いは、",
      "ステージの上で形になります。"
    ],
    videoId: "8Jtyt23R-jg"
  },
  {
    id: "chapter-06",
    num: "06",
    year: "2023",
    tag: "RUN",
    titleEn: "RUN",
    titleJa: "走り続けた先に。",
    specialStat: { value: "03:57:06", label: "SUB 4" },
    copy: [
      "走ることは、",
      "いつしか瀧脇笙古ちゃんを象徴する個性のひとつになりました。",
      "東京マラソン2023。",
      "3時間57分06秒。",
      "サブ4達成。"
    ],
    videoId: "RoVAmDAGej8"
  },
  {
    id: "chapter-07",
    num: "07",
    year: "2024",
    tag: "HEART",
    titleEn: "HEART",
    titleJa: "強さだけでは、ありません。",
    label: "突然ですが占ってもいいですか？",
    copy: [
      "挑戦を続ける中で、",
      "迷うことも、悩むこともあります。",
      "普段とは少し違う、",
      "瀧脇笙古ちゃんの言葉。"
    ],
    videoId: "-syTHUFdQyk",
    start: 1678
  },
  {
    id: "chapter-08",
    num: "08",
    year: "2025",
    tag: "DOUBLE CENTER",
    titleEn: "DOUBLE CENTER",
    titleJa: "そして、もう一度センターへ。",
    timeGapText: "2021 FIRST CENTER → 2025 DOUBLE CENTER",
    copy: [
      "「BPM170の君へ」から年月を重ねて。",
      "2025年。",
      "「木漏れ日メゾフォルテ」で、",
      "音嶋莉沙ちゃんとのダブルセンターを務めました。"
    ],
    videoId: "4xBmuiQNGdc"
  },
  {
    id: "chapter-09",
    num: "09",
    year: "2025",
    tag: "YOKOHAMA",
    titleEn: "YOKOHAMA",
    titleJa: "好きなものを、発信し続ける。",
    label: "A DREAM CAME TRUE / 横浜スタジアム セレモニアルピッチ",
    copy: [
      "横浜。",
      "そして横浜DeNAベイスターズ。",
      "好きだと伝え続け、発信し続けた先で、",
      "ひとつの夢が叶いました。"
    ],
    videoId: "fe_nGoGe9DQ"
  },
  {
    id: "chapter-10",
    num: "10",
    year: "2026",
    tag: "NOW",
    titleEn: "NOW",
    titleJa: "そして、現在。",
    isCinemaLast: true,
    copy: [
      "挑戦する場所は、",
      "またひとつ広がりました。",
      "2026年。",
      "FILAのスタイリングパートナーへ。"
    ],
    videoId: "0dJb1WGsK2Q"
  }
];

const TIMELINE_DATA = [
  { year: "2017", title: "＝LOVEオーディション合格・デビュー", desc: "ダンス未経験で合宿へ参加。過酷なレッスンを乗り越えアイドル人生がスタート。" },
  { year: "2018", title: "クックアイドルNo.1決定戦 優勝", desc: "特技の料理を活かし「クックアイドルNo.1決定戦」で見事優勝。オリジナルレシピを披露。" },
  { year: "2020", title: "TBS『SASUKE 2020』初出場", desc: "運動能力の高さを活かし、アイドル界のスポーツ枠としてSASUKE本戦へ挑む。" },
  { year: "2021", title: "「BPM170の君へ」初センター", desc: "加入から4年、自身の走り続ける歩みと重なる楽曲で念願の単独初センターを獲得。" },
  { year: "2023", title: "東京マラソン2023 サブ4達成", desc: "42.195kmを「3時間57分06秒」で完走。有言実行の努力でサブ4を達成。" },
  { year: "2024", title: "プロ野球ニュース 木曜MC / テレビ出演", desc: "フジテレビONE『プロ野球ニュース』木曜MCを担当。横浜愛と野球知識を深める。" },
  { year: "2025", title: "「木漏れ日メゾフォルテ」ダブルセンター", desc: "音嶋莉沙ちゃんとのダブルセンターを担当。表現力の幅をステージで証明。" },
  { year: "2025", title: "横浜スタジアム セレモニアルピッチ登板", desc: "愛し続けた横浜DeNAベイスターズの本拠地・ハマスタのマウンドで夢の投球。" },
  { year: "2026", title: "FILA 2026FW スタイリングパートナー就任", desc: "FILA Japanのスタイリングパートナーに抜擢。モデル・スポーツの架け橋へ。" }
];

export function HistoryView() {
  const [viewMode, setViewMode] = useState<"story" | "timeline">("story");
  const [activeChapter, setActiveChapter] = useState<string>("chapter-01");
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // チャプターの交差判定 (IntersectionObserver)
  useEffect(() => {
    if (viewMode !== "story") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  const handleStartStory = () => {
    setHasStarted(true);
    const firstEl = document.getElementById("chapter-01");
    if (firstEl) {
      firstEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToChapter = (id: string) => {
    setHasStarted(true);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0B0B0B] text-zinc-100 min-h-screen font-sans selection:bg-[#F6C744] selection:text-[#191919] pb-16">
      
      {/* 上部固定 モード切替 ＆ タイトルヘッダー */}
      <header className="sticky top-0 z-40 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
          >
            ← しょこらの部屋
          </Link>
          <span className="text-zinc-700 font-mono text-xs">/</span>
          <span className="text-xs font-mono font-bold text-[#F6C744] uppercase tracking-widest flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#F6C744]" />
            DOCUMENTARY HISTORY
          </span>
        </div>

        {/* STORY MODE / TIMELINE MODE 切替 */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs font-mono font-bold">
          <button
            onClick={() => setViewMode("story")}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === "story"
                ? "bg-[#F6C744] text-[#191919] font-extrabold shadow-2xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Film className="w-3 h-3" />
            <span>STORY MODE</span>
          </button>
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === "timeline"
                ? "bg-[#F6C744] text-[#191919] font-extrabold shadow-2xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <List className="w-3 h-3" />
            <span>TIMELINE</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* モード A: STORY MODE (映画的ドキュメンタリー体験) */}
      {/* ======================================================== */}
      {viewMode === "story" && (
        <div>
          
          {/* Hero Section / ファーストビュー */}
          <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-20 relative border-b border-zinc-800/60 bg-gradient-to-b from-[#121212] to-[#0B0B0B]">
            <div className="space-y-6 max-w-[720px] mx-auto">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#F6C744] uppercase block">
                  SHOKO TAKIWAKI DOCUMENTARY
                </span>
                <h1 className="text-5xl sm:text-7xl font-mono font-extrabold tracking-wider text-white">
                  HISTORY
                </h1>
                <p className="text-xs font-mono text-zinc-500 font-bold tracking-widest">
                  2017 — 2026
                </p>
              </div>

              <div className="py-6 space-y-4 border-y border-zinc-800/80">
                <h2 className="text-2xl sm:text-4xl font-maru font-extrabold text-white tracking-wide leading-snug">
                  最初から、できたわけではない。
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-[560px] mx-auto font-medium">
                  ダンス未経験で始まった＝LOVEでの日々。<br />
                  悔しさも、挑戦も、走った距離も。<br />
                  瀧脇笙古ちゃんが積み重ねてきた時間を、映像とともに辿ります。
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartStory}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#F6C744] text-[#191919] font-maru font-extrabold text-base rounded-full hover:bg-[#E99A32] transition-all transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>STORYをはじめる</span>
                </button>
              </div>

            </div>
          </section>

          {/* チャプターナビゲーション (PC固定 / スマホコンパクト) */}
          <aside className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-30 space-y-1.5 font-mono text-[10px] bg-zinc-900/90 border border-zinc-800/80 backdrop-blur-md p-3 rounded-xl shadow-xl max-h-[75vh] overflow-y-auto">
            <div className="text-zinc-500 font-bold px-2 py-1 uppercase text-[9px] border-b border-zinc-800 mb-1">
              CHAPTERS
            </div>
            {CHAPTERS.map((ch) => {
              const isCurrent = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => scrollToChapter(ch.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? "bg-[#F6C744] text-[#191919] font-black"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  <span>{ch.num} {ch.tag}</span>
                  <span className="text-[9px] opacity-70">{ch.year}</span>
                </button>
              );
            })}
          </aside>

          {/* スマホ用現在チャプター位置インジケーター */}
          <div className="lg:hidden sticky top-14 z-30 bg-zinc-900/90 border-b border-zinc-800 px-4 py-2 text-center text-xs font-mono font-bold text-[#F6C744]">
            {activeChapter && (
              <span>
                CHAPTER {CHAPTERS.find((c) => c.id === activeChapter)?.num || "01"} / 10 :{" "}
                {CHAPTERS.find((c) => c.id === activeChapter)?.tag}
              </span>
            )}
          </div>

          {/* 全10チャプターメイン表示エリア */}
          <div className="space-y-28 sm:space-y-36 py-16">
            {CHAPTERS.map((ch, index) => {
              const embedSrc = `https://www.youtube.com/embed/${ch.videoId}?${
                ch.start ? `start=${ch.start}&` : ""
              }controls=0&rel=0&modestbranding=1`;

              return (
                <section
                  key={ch.id}
                  id={ch.id}
                  className="max-w-[1000px] mx-auto px-5 sm:px-8 space-y-8 scroll-mt-24"
                >
                  {/* チャプタータイトルカード */}
                  <div className="space-y-3 text-center sm:text-left border-l-2 border-[#F6C744] pl-4 sm:pl-6">
                    <div className="flex items-center justify-between sm:justify-start gap-3 font-mono text-xs text-zinc-500 font-bold">
                      <span className="text-[#F6C744] uppercase tracking-widest font-extrabold text-sm">
                        CHAPTER {ch.num}
                      </span>
                      <span>// {ch.year}</span>
                      <span className="text-zinc-400 tracking-wider">[{ch.titleEn}]</span>
                    </div>

                    {/* チャプター前字幕・演出 */}
                    {ch.subtitlePre && (
                      <div className="text-xs sm:text-sm font-mono text-[#F6C744] font-bold tracking-wider pt-1">
                        {ch.subtitlePre}
                      </div>
                    )}

                    <h2 className="text-2xl sm:text-4xl font-maru font-extrabold text-white leading-snug">
                      {ch.titleJa}
                    </h2>

                    {/* チャプター後字幕・演出 */}
                    {ch.subtitlePost && (
                      <div className="text-sm sm:text-base font-maru text-amber-300 font-bold pt-1">
                        {ch.subtitlePost}
                      </div>
                    )}

                    {/* 特殊時系列テキスト (Ch 08) */}
                    {ch.timeGapText && (
                      <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#F6C744] font-bold rounded-md">
                        {ch.timeGapText}
                      </div>
                    )}
                  </div>

                  {/* 文章コピー */}
                  <div className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed space-y-1.5 max-w-[640px]">
                    {ch.copy.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>

                  {/* 特殊数字表示 (Ch 06 マラソン) */}
                  {ch.specialStat && (
                    <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl text-center space-y-1 max-w-[400px]">
                      <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-widest">
                        {ch.specialStat.value}
                      </div>
                      <div className="text-xs font-mono font-bold text-[#F6C744] uppercase tracking-wider">
                        {ch.specialStat.label}
                      </div>
                    </div>
                  )}

                  {/* 動画表示 (16:9 レスポンシブ / 巨大・洗練) */}
                  <div className="space-y-2">
                    {ch.label && (
                      <div className="text-xs font-mono text-zinc-400 font-bold flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-[#F6C744]" />
                        <span>{ch.label}</span>
                      </div>
                    )}

                    <div
                      className={`relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black ${
                        ch.isCinemaLast ? "lg:max-w-[1100px] border-2 border-[#F6C744]/60" : ""
                      }`}
                    >
                      <iframe
                        src={embedSrc}
                        title={ch.titleJa}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* 次章へのガイドリンク */}
                  {index < CHAPTERS.length - 1 && (
                    <div className="pt-6 text-right">
                      <button
                        onClick={() => scrollToChapter(CHAPTERS[index + 1].id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-400 hover:text-[#F6C744] transition-colors"
                      >
                        <span>NEXT CHAPTER ({CHAPTERS[index + 1].num})</span>
                        <ChevronRight className="w-4 h-4 text-[#F6C744]" />
                      </button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* ENDING / 余韻・シネマティック締め */}
          {/* ======================================================== */}
          <section className="bg-black py-24 px-6 text-center border-t border-zinc-800/80 space-y-12">
            <div className="max-w-[640px] mx-auto space-y-6">
              
              <div className="text-zinc-500 font-mono font-bold text-sm tracking-widest">
                2017 — 2026
              </div>

              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed font-medium">
                できないところから始まって、<br />
                挑戦を重ねて、<br />
                少しずつ景色を変えてきました。
              </p>

              <div className="py-6 border-y border-zinc-800/80">
                <h2 className="text-3xl sm:text-5xl font-maru font-extrabold text-[#F6C744] tracking-wide leading-tight">
                  物語は、まだ続いています。
                </h2>
              </div>

              <div className="space-y-1 text-xs font-mono text-zinc-500 font-bold">
                <p>SHOKO TAKIWAKI</p>
                <p>HISTORY</p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono font-bold">
                <Link
                  href="/news"
                  className="px-6 py-3 bg-[#F6C744] text-[#191919] font-bold rounded-full hover:bg-[#E99A32] transition-colors flex items-center gap-2"
                >
                  <span>最新のしょこちゃんを見る →</span>
                </Link>
                <button
                  onClick={() => scrollToChapter("chapter-01")}
                  className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-full transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>最初からもう一度見る</span>
                </button>
              </div>

            </div>
          </section>

        </div>
      )}

      {/* ======================================================== */}
      {/* モード B: TIMELINE MODE (テキスト年表一覧モード) */}
      {/* ======================================================== */}
      {viewMode === "timeline" && (
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 py-12 space-y-10">
          
          <div className="border-b border-zinc-800 pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F6C744]">
              <Calendar className="w-4 h-4" />
              <span>TIMELINE INDEX</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-mono font-extrabold text-white">
              年表タイムライン
            </h1>
            <p className="text-xs text-zinc-400 font-sans">
              瀧脇笙古ちゃんの2017年加入から現在までの主な出来事・実績の一覧記録です。
            </p>
          </div>

          <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8 py-2">
            {TIMELINE_DATA.map((item, index) => (
              <div key={index} className="relative group space-y-1">
                {/* タイムラインドット */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-800 border-2 border-[#F6C744] group-hover:bg-[#F6C744] transition-colors" />
                
                <span className="text-xs font-mono font-extrabold text-[#F6C744] tracking-wider block">
                  {item.year}
                </span>

                <h3 className="font-maru font-extrabold text-base sm:text-lg text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-[640px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <button
              onClick={() => setViewMode("story")}
              className="px-6 py-3 bg-[#F6C744] text-[#191919] font-mono font-bold text-xs rounded-full hover:bg-[#E99A32] transition-colors inline-flex items-center gap-2"
            >
              <Film className="w-4 h-4" />
              <span>STORY MODE (映像付きドキュメンタリー) で見る</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
