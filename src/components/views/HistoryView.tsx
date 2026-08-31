"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Maximize2,
  Minimize2,
  Film,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  List,
  X,
  Volume2,
  Tv
} from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export interface ChapterData {
  num: string;
  year: string;
  titleEn: string;
  titleJa: string;
  subStat?: { value: string; label: string };
  programName?: string;
  desc: string[];
  videoId: string;
  start?: number;
}

const CHAPTERS: ChapterData[] = [
  {
    num: "01",
    year: "2017",
    titleEn: "AUDITION",
    titleJa: "2017 / AUDITION",
    desc: [
      "2017年、＝LOVEのオーディションに参加。",
      "ここから瀧脇笙古ちゃんのアイドル活動が始まります。",
      "オーディション当時の映像には、現在とはまだ違う初々しい姿が残されています。",
      "結成後は歌やダンスを学びながら、＝LOVEのメンバーとして活動をスタートしていきます。"
    ],
    videoId: "zXR_xhihDOQ",
    start: 1
  },
  {
    num: "02",
    year: "2017",
    titleEn: "TRAINING CAMP",
    titleJa: "2017 / TRAINING CAMP",
    desc: [
      "＝LOVE加入時、しょこちゃんはダンス未経験でした。",
      "結成直後の合宿では、牧野アンナ先生による厳しいレッスンを受けています。",
      "振り付けや表現を一から学び、グループとしてステージに立つための準備を重ねていた時期です。",
      "後年のパフォーマンスと見比べると、加入当初からの変化がよく分かる映像でもあります。"
    ],
    videoId: "RPlkP-5jP44",
    start: 756 // 厳守!
  },
  {
    num: "03",
    year: "2020",
    titleEn: "SASUKE",
    titleJa: "2020 / SASUKE",
    desc: [
      "活動を続ける中で、スポーツも瀧脇笙古ちゃんを特徴づける分野のひとつになっていきます。",
      "2020年にはTBS「SASUKE」に出演。",
      "＝LOVEとしてのステージ活動とは異なる場所でも、運動能力を生かした仕事が増えていきました。",
      "マラソンをはじめ、後のスポーツ関連の活動にもつながっていく時期です。"
    ],
    videoId: "zUeSRsheJC8",
    start: 0
  },
  {
    num: "04",
    year: "2021",
    titleEn: "FIRST CENTER",
    titleJa: "2021 / FIRST CENTER",
    desc: [
      "2021年、「BPM170の君へ」で自身初のセンターを担当しました。",
      "ランニングをテーマにした楽曲で、瀧脇笙古ちゃん自身の個性とも結びついた一曲です。",
      "この章ではMVではなく、センター曲の制作過程を記録したメイキング映像を使用します。",
      "本人がセンターという役割を受け止める様子も残されています。"
    ],
    videoId: "ei0BtXWrVb4",
    start: 1065 // 厳守!
  },
  {
    num: "05",
    year: "2021",
    titleEn: "ON STAGE",
    titleJa: "2021 / ON STAGE",
    desc: [
      "「BPM170の君へ」は、ライブでも披露されました。",
      "メイキングで見る制作過程と、完成したステージを続けて見ることで、初センターという出来事を違う角度から見ることができます。",
      "加入当初の合宿映像から約4年。ステージ中央で楽曲を届ける姿へと変化しています。"
    ],
    videoId: "8Jtyt23R-jg",
    start: 0
  },
  {
    num: "06",
    year: "2023",
    titleEn: "TOKYO MARATHON",
    titleJa: "2023 / TOKYO MARATHON",
    subStat: { value: "03:57:06", label: "SUB 4" },
    desc: [
      "ランニングは、しょこちゃんが長く続けてきた活動のひとつです。",
      "東京マラソン2023では、3時間57分06秒で完走。4時間を切る「サブ4」を達成しました。",
      "「BPM170の君へ」のような楽曲だけでなく、実際の競技でも継続して結果を残していることが分かります。"
    ],
    videoId: "RoVAmDAGej8",
    start: 0
  },
  {
    num: "07",
    year: "2024",
    titleEn: "INTERVIEW",
    titleJa: "HEART / INTERVIEW",
    programName: "突然ですが占ってもいいですか？",
    desc: [
      "活動の実績だけではなく、本人が自分自身について語る映像もHISTORYに残します。",
      "「突然ですが占ってもいいですか？」出演時には、普段の活動では見えにくい考えや気持ちについて語る場面があります。",
      "ここでは、その一部から再生します。"
    ],
    videoId: "-syTHUFdQyk",
    start: 1678 // 厳守!
  },
  {
    num: "08",
    year: "2025",
    titleEn: "DOUBLE CENTER",
    titleJa: "2025 / DOUBLE CENTER",
    desc: [
      "2025年、「木漏れ日メゾフォルテ」で音嶋莉沙ちゃんとのダブルセンターを担当しました。",
      "「BPM170の君へ」での初センターから約4年後のセンター楽曲です。",
      "活動を重ねる中で、歌やダンスでも担当する役割が増えてきた時期のひとつとして紹介してください。"
    ],
    videoId: "4xBmuiQNGdc",
    start: 0
  },
  {
    num: "09",
    year: "2025",
    titleEn: "YOKOHAMA",
    titleJa: "2025 / YOKOHAMA",
    desc: [
      "神奈川県出身で、横浜DeNAベイスターズを応援してきたしょこちゃん。",
      "野球に関する発信や仕事を続ける中で、横浜スタジアムでのセレモニアルピッチも実現しました。",
      "横浜やベイスターズに関する活動は、現在では瀧脇笙古ちゃんを紹介するうえで欠かせないテーマのひとつになっています。"
    ],
    videoId: "fe_nGoGe9DQ",
    start: 0
  },
  {
    num: "10",
    year: "2026",
    titleEn: "FILA",
    titleJa: "2026 / FILA",
    desc: [
      "2026年、FILA 2026FWシーズンのスタイリングパートナーに就任しました。",
      "これまでのアイドル活動やスポーツ関連とはまた異なる、ファッションの分野へ活動が広がっています。",
      "2017年のオーディションから約9年。このHISTORYでは、現在地点としてこの映像を最後に配置します。"
    ],
    videoId: "0dJb1WGsK2Q",
    start: 0
  }
];

const FEATURED_FILMS_LIST = [
  "Documentary of =LOVE - Episode 0 - Audition -",
  "Documentary of =LOVE - Episode 1 - Training Camp -",
  "SASUKE 2020",
  "『BPM170の君へ』 Making",
  "『BPM170の君へ』 Live Performance",
  "Tokyo Marathon 2023",
  "突然ですが占ってもいいですか？",
  "『木漏れ日メゾフォルテ』",
  "横浜スタジアム セレモニアルピッチ",
  "FILA 2026FW"
];

export function HistoryView() {
  // モード: "chapter" (初期デフォルト / ドキュメンタリー資料) | "film" (全自動シネマシアター)
  const [mode, setMode] = useState<"chapter" | "film">("chapter");
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState<boolean>(false);
  
  // FILM MODE 内ステート
  const [filmSceneIndex, setFilmSceneIndex] = useState<number>(0);
  const [isPlayingFilm, setIsPlayingFilm] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  const [isApiReady, setIsApiReady] = useState<boolean>(false);
  const [needUserResume, setNeedUserResume] = useState<boolean>(false);

  const playerRefChapter = useRef<any>(null);
  const playerRefFilm = useRef<any>(null);
  const filmStageRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChapter = CHAPTERS[currentChapterIndex];

  // YouTube API ロード
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsApiReady(true);
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsApiReady(true);
    };
  }, []);

  // CHAPTER MODE 用 プレイヤー初期化
  useEffect(() => {
    if (!isApiReady || mode !== "chapter") return;

    if (playerRefChapter.current) {
      try { playerRefChapter.current.destroy(); } catch (e) {}
      playerRefChapter.current = null;
    }

    const slot = document.getElementById("yt-slot-chapter");
    if (!slot) return;

    playerRefChapter.current = new window.YT.Player("yt-slot-chapter", {
      height: "100%",
      width: "100%",
      videoId: currentChapter.videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        start: currentChapter.start || 0,
      }
    });

  }, [currentChapterIndex, mode, isApiReady]);

  // FILM MODE 切り替え時 & 退出時の同期
  const enterFilmMode = () => {
    setMode("film");
    setIsPlayingFilm(true);
    // 全チャプターシーン ＋ チャプターカード ＋ エンドクレジット構造にマッピング
    setFilmSceneIndex(currentChapterIndex * 3); // 各チャプター: card ➔ video ➔ fade
    
    // 可能であれば Fullscreen API 実行
    if (filmStageRef.current && filmStageRef.current.requestFullscreen) {
      filmStageRef.current.requestFullscreen().catch(() => {});
    }
  };

  const exitFilmMode = () => {
    setMode("chapter");
    setIsPlayingFilm(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // FILM MODE 用チャプターナビゲーション
  const jumpChapter = (newIdx: number) => {
    if (newIdx >= 0 && newIdx < CHAPTERS.length) {
      setCurrentChapterIndex(newIdx);
      if (mode === "film") {
        setFilmSceneIndex(newIdx * 3);
      }
    }
    setIsChapterDrawerOpen(false);
  };

  return (
    <div className="bg-[#0A0A0A] text-zinc-100 min-h-screen font-sans selection:bg-[#F6C744] selection:text-[#191919] pb-12">
      
      {/* ======================================================== */}
      {/* 1. 全ページ共通 ヘッダーナビゲーション */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-800/80 px-6 py-3.5 flex items-center justify-between">
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
            HISTORY // 2017 — 2026
          </span>
        </div>

        {/* 右上 FILM MODE 切替ボタン */}
        <div className="flex items-center gap-2">
          {mode === "chapter" ? (
            <button
              onClick={enterFilmMode}
              className="px-3.5 py-1.5 bg-[#F6C744] hover:bg-[#E99A32] text-[#191919] font-mono font-black text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>⛶ FILM MODE</span>
            </button>
          ) : (
            <button
              onClick={exitFilmMode}
              className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-[#F6C744]" />
              <span>EXIT FILM MODE</span>
            </button>
          )}
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. 初期表示デフォルト: CHAPTER MODE (資料＆動画2カラム) */}
      {/* ======================================================== */}
      {mode === "chapter" && (
        <main className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 pt-6 space-y-8">
          
          {/* オープニングヘッダー */}
          <div className="border-b border-zinc-800 pb-5 space-y-2 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F6C744] tracking-widest">
                DOCUMENTARY ARCHIVE
              </span>
              <span className="text-xs font-bold text-zinc-500">
                2017 — 2026
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider">
                SHOKO TAKIWAKI <span className="text-[#F6C744]">HISTORY</span>
              </h1>
              <span className="text-xs text-zinc-400 font-sans font-medium">
                CHAPTER {currentChapter.num} / 10
              </span>
            </div>
          </div>

          {/* PC 2カラム構造 (左: 65% 16:9動画 / 右: 35% ドキュメンタリー解説) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 左側: 65%〜70% 16:9 動画表示エリア */}
            <div className="lg:col-span-8 space-y-3">
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <div id="yt-slot-chapter" className="w-full h-full" />
                
                {/* プレイヤー右上の FILM MODE ショートカット */}
                <button
                  onClick={enterFilmMode}
                  className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-black/80 hover:bg-[#F6C744] text-white hover:text-[#191919] font-mono font-bold text-[11px] rounded-lg transition-colors border border-zinc-700 flex items-center gap-1.5 backdrop-blur-xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>⛶ FILM MODE</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
                <span>チャプター {currentChapter.num} / 10</span>
                <span>start={currentChapter.start || 0}s</span>
              </div>
            </div>

            {/* 右側: 30%〜35% ドキュメンタリー資料・解説テキスト */}
            <div className="lg:col-span-4 space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl">
              
              <div className="space-y-2 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#F6C744] font-bold">
                  <span>CHAPTER {currentChapter.num}</span>
                  <span>//</span>
                  <span>{currentChapter.year}</span>
                </div>
                <h2 className="text-2xl font-maru font-extrabold text-white">
                  {currentChapter.titleJa}
                </h2>
                {currentChapter.programName && (
                  <div className="inline-flex items-center gap-1 text-xs font-mono bg-zinc-800 text-amber-300 px-2.5 py-0.5 rounded border border-zinc-700">
                    <Tv className="w-3 h-3" />
                    <span>{currentChapter.programName}</span>
                  </div>
                )}
              </div>

              {/* 特殊数字表示 (マラソン) */}
              {currentChapter.subStat && (
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center space-y-0.5 font-mono">
                  <div className="text-3xl font-extrabold text-white tracking-widest">
                    {currentChapter.subStat.value}
                  </div>
                  <div className="text-xs text-[#F6C744] font-bold">
                    {currentChapter.subStat.label}
                  </div>
                </div>
              )}

              {/* NHKドキュメンタリー風 自然で客観的な解説文 */}
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {currentChapter.desc.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

            </div>

          </div>

          {/* CHAPTER MODE ナビゲーション */}
          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            
            {/* 前後移動 */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => jumpChapter(currentChapterIndex - 1)}
                disabled={currentChapterIndex === 0}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 font-bold"
              >
                <ChevronLeft className="w-4 h-4 text-[#F6C744]" />
                <span>PREVIOUS</span>
              </button>

              <span className="font-bold text-[#F6C744] px-2">
                {currentChapter.num} / 10
              </span>

              <button
                onClick={() => jumpChapter(currentChapterIndex + 1)}
                disabled={currentChapterIndex === CHAPTERS.length - 1}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 font-bold"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4 text-[#F6C744]" />
              </button>
            </div>

            {/* チャプター一覧ポップアップボタン */}
            <div className="relative">
              <button
                onClick={() => setIsChapterDrawerOpen(!isChapterDrawerOpen)}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg transition-colors flex items-center gap-2 font-bold"
              >
                <List className="w-4 h-4 text-[#F6C744]" />
                <span>CHAPTERS INDEX ({CHAPTERS.length})</span>
              </button>

              {/* チャプター一覧メニュー */}
              {isChapterDrawerOpen && (
                <div className="absolute right-0 bottom-12 z-30 w-72 bg-zinc-900 border border-zinc-800 p-3 rounded-xl shadow-2xl space-y-1 max-h-80 overflow-y-auto">
                  <div className="text-[10px] font-bold text-zinc-500 px-2 py-1 uppercase border-b border-zinc-800 mb-1">
                    全10チャプター一覧
                  </div>
                  {CHAPTERS.map((ch, idx) => (
                    <button
                      key={ch.num}
                      onClick={() => jumpChapter(idx)}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                        idx === currentChapterIndex
                          ? "bg-[#F6C744] text-[#191919] font-black"
                          : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                    >
                      <span className="font-bold">{ch.num} {ch.titleEn}</span>
                      <span className="text-[10px] font-mono opacity-70">{ch.year}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </main>
      )}

      {/* ======================================================== */}
      {/* 3. FILM MODE (完全フルスクリーンシアター全自動モード) */}
      {/* ======================================================== */}
      {mode === "film" && (
        <div
          ref={filmStageRef}
          className="fixed inset-0 z-50 w-screen h-screen bg-black text-white font-sans overflow-hidden select-none flex flex-col justify-between"
          onMouseMove={() => {
            setShowControls(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setShowControls(false), 3500);
          }}
        >
          {/* 退出オーバーレイボタン */}
          <header className={`absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-black/90 via-black/40 to-transparent px-6 py-4 flex items-center justify-between transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
            <button
              onClick={exitFilmMode}
              className="text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg border border-zinc-800"
            >
              <X className="w-4 h-4 text-[#F6C744]" />
              <span>EXIT FILM MODE</span>
            </button>

            <div className="text-xs font-mono text-[#F6C744] font-extrabold tracking-widest uppercase">
              SHOKO TAKIWAKI HISTORY // FILM MODE
            </div>
          </header>

          {/* FILM MODE シネマ領域 */}
          <div className="relative w-full h-full flex-1 bg-black flex items-center justify-center overflow-hidden">
            <div className="w-full h-full aspect-video max-w-full max-h-full">
              <iframe
                src={`https://www.youtube.com/embed/${currentChapter.videoId}?start=${currentChapter.start || 0}&autoplay=1&controls=0&rel=0&modestbranding=1`}
                title={currentChapter.titleJa}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* 操作時のみ表示される下部バー */}
          <footer className={`absolute bottom-0 left-0 w-full z-40 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-6 py-4 space-y-3 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
            
            {/* チャプター切り替えバー */}
            <div className="flex items-center justify-between gap-1 sm:gap-2 text-[10px] font-mono font-bold">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.num}
                  onClick={() => jumpChapter(idx)}
                  className={`flex-1 py-1.5 transition-all text-center rounded border ${
                    idx === currentChapterIndex
                      ? "bg-[#F6C744] text-[#191919] border-[#F6C744] font-black scale-105 shadow-md"
                      : "bg-black/60 text-zinc-500 border-zinc-800/80 hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">{ch.num} {ch.titleEn}</span>
                  <span className="sm:hidden">{ch.num}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between bg-black/80 border border-zinc-800/80 rounded-xl px-4 py-2 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-[#F6C744]">
                  CHAPTER {currentChapter.num} / 10
                </span>
                <span className="text-zinc-600 hidden sm:inline">|</span>
                <span className="text-zinc-300 font-bold">
                  {currentChapter.titleJa} ({currentChapter.year})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => jumpChapter(currentChapterIndex - 1)}
                  disabled={currentChapterIndex === 0}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
                  title="前へ"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => jumpChapter(currentChapterIndex + 1)}
                  disabled={currentChapterIndex === CHAPTERS.length - 1}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
                  title="次へ"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={exitFilmMode}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors ml-2"
                  title="EXIT FILM MODE"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </footer>

        </div>
      )}

    </div>
  );
}
