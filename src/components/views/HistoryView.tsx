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
  List,
  X,
  ChevronLeft,
  ChevronRight,
  Tv,
  Newspaper
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

// 敬体から常体（ドキュメンタリーのナレーション調）へ全10チャプター統一
const CHAPTERS: ChapterData[] = [
  {
    num: "01",
    year: "2017",
    titleEn: "AUDITION",
    titleJa: "2017 / AUDITION",
    desc: [
      "本人は、自分が合格するとは思っていなかったという。",
      "「指原莉乃さんにタダで会える」くらいの気持ちで会場へ向かい、エレベーターに最後に乗り込んだ結果、受付では一番最初になった。",
      "そのままオーディションも一番手となり、緊張で震えながら長渕剛さんの楽曲を披露。",
      "その歌が指原莉乃さんの目に留まり、合格した。",
      "さらに会場では、当時推していた矢吹奈子さんにも会うことができ、そのことをすぐ家族に報告したという。",
      "ここから、瀧脇笙古の＝LOVEでの活動が始まった。"
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
      "＝LOVE加入時、瀧脇笙古はダンス未経験だった。",
      "結成直後の合宿では、牧野アンナ先生による厳しいレッスンを受けている。",
      "振り付けや表現を一から学び、グループとしてステージに立つための準備を重ねていた時期だ。",
      "後年のパフォーマンスと見比べると、加入当初からの変化がよく分かる映像でもある。"
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
      "活動を続ける中で、スポーツも瀧脇笙古を特徴づける分野のひとつになっていった。",
      "2020年にはTBS「SASUKE」に出演。",
      "＝LOVEとしてのステージ活動とは異なる場所でも、運動能力を生かした仕事が増えていく。",
      "マラソンをはじめ、その後のスポーツ関連の活動にもつながっていった。"
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
      "2021年、「BPM170の君へ」で自身初のセンターを担当。",
      "ランニングをテーマにした楽曲で、瀧脇笙古自身の個性とも深く結びついた一曲となった。",
      "この章ではMVではなく、センター曲の制作過程を記録したメイキング映像を使用。",
      "本人がセンターという役割を受け止める様子も残されている。"
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
      "「BPM170の君へ」はライブでも披露された。",
      "メイキングで見る制作過程と、完成したステージを続けて見ることで、初センターという出来事を違う角度から見ることができる。",
      "加入当初の合宿映像から約4年。ステージ中央で楽曲を届ける姿へと変化している。"
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
      "ランニングは、瀧脇笙古が長く続けてきた活動のひとつだ。",
      "東京マラソン2023では、3時間57分06秒で完走。4時間を切る「サブ4」を達成した。",
      "「BPM170の君へ」のような楽曲だけでなく、実際の競技でも継続して結果を残している。"
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
      "活動の実績だけでなく、本人が自分自身について語る映像もHISTORYに残す。",
      "「突然ですが占ってもいいですか？」出演時には、普段の活動では見えにくい考えや気持ちについて語る場面がある。",
      "ここでは、その一部から再生する。"
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
      "2025年、「木漏れ日メゾフォルテ」で音嶋莉沙ちゃんとのダブルセンターを担当。",
      "「BPM170の君へ」での初センターから約4年後のセンター楽曲となった。",
      "活動を重ねる中で、歌やダンスでも担当する役割が増えてきた時期のひとつだ。"
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
      "神奈川県出身で、横浜DeNAベイスターズを応援してきた瀧脇笙古。",
      "野球に関する発信や仕事を続ける中で、横浜スタジアムでのセレモニアルピッチも実現した。",
      "横浜やベイスターズに関する活動は、現在では瀧脇笙古を紹介するうえで欠かせないテーマのひとつとなっている。"
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
      "2026年、FILA 2026FWシーズンのスタイリングパートナーに就任。",
      "これまでのアイドル活動やスポーツ関連とは異なる、ファッションの分野へ活動が広がった。",
      "2017年のオーディションから約9年。このHISTORYでは、現在地点としてこの映像を最後に配置する。"
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

type FilmSubState = "start_screen" | "opening" | "chapter_title" | "video" | "fade" | "credits_1" | "credits_films" | "credits_featuring" | "credits_curated" | "credits_disclaimer" | "last_frame";

export function HistoryView() {
  const [mode, setMode] = useState<"chapter" | "film">("chapter");
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState<boolean>(false);
  
  // FILM MODE ステート
  const [filmSubState, setFilmSubState] = useState<FilmSubState>("start_screen");
  const [isPlayingFilm, setIsPlayingFilm] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  const [isApiReady, setIsApiReady] = useState<boolean>(false);

  const playerRefChapter = useRef<any>(null);
  const playerRefFilm = useRef<any>(null);
  const filmStageRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const filmStepTimerRef = useRef<NodeJS.Timeout | null>(null);

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
        cc_load_policy: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        start: currentChapter.start || 0,
      }
    });

  }, [currentChapterIndex, mode, isApiReady]);

  // FILM MODE 用 YouTube Iframe API 初期化
  useEffect(() => {
    if (!isApiReady || mode !== "film" || filmSubState !== "video") return;

    if (playerRefFilm.current) {
      try { playerRefFilm.current.destroy(); } catch (e) {}
      playerRefFilm.current = null;
    }

    const slotFilm = document.getElementById("yt-slot-film-cinema");
    if (!slotFilm) return;

    playerRefFilm.current = new window.YT.Player("yt-slot-film-cinema", {
      height: "100%",
      width: "100%",
      videoId: currentChapter.videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        cc_load_policy: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        start: currentChapter.start || 0,
      },
      events: {
        onReady: (event: any) => {
          if (isPlayingFilm) {
            try { event.target.playVideo(); } catch (err) {}
          }
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            handleVideoEnd();
          }
        },
        onError: () => {
          handleVideoEnd();
        }
      }
    });
  }, [filmSubState, currentChapterIndex, mode, isApiReady]);

  const handleVideoEnd = () => {
    setFilmSubState("fade");
    if (filmStepTimerRef.current) clearTimeout(filmStepTimerRef.current);

    filmStepTimerRef.current = setTimeout(() => {
      if (currentChapterIndex < CHAPTERS.length - 1) {
        setCurrentChapterIndex((prev) => prev + 1);
        setFilmSubState("chapter_title");
      } else {
        startEndingCredits();
      }
    }, 1000);
  };

  useEffect(() => {
    if (mode !== "film") return;

    if (filmSubState === "opening") {
      if (filmStepTimerRef.current) clearTimeout(filmStepTimerRef.current);
      filmStepTimerRef.current = setTimeout(() => {
        setFilmSubState("chapter_title");
      }, 3500);
    } else if (filmSubState === "chapter_title") {
      if (filmStepTimerRef.current) clearTimeout(filmStepTimerRef.current);
      filmStepTimerRef.current = setTimeout(() => {
        setFilmSubState("video");
      }, 3000);
    }
  }, [filmSubState, mode]);

  const startEndingCredits = () => {
    setFilmSubState("credits_1");
    if (filmStepTimerRef.current) clearTimeout(filmStepTimerRef.current);

    const steps: { state: FilmSubState; duration: number }[] = [
      { state: "credits_films", duration: 7000 },
      { state: "credits_featuring", duration: 4000 },
      { state: "credits_curated", duration: 4000 },
      { state: "credits_disclaimer", duration: 4500 },
      { state: "last_frame", duration: 0 }
    ];

    let stepIdx = 0;
    const runNextCredit = () => {
      if (stepIdx < steps.length) {
        const item = steps[stepIdx];
        stepIdx++;
        setFilmSubState(item.state);
        if (item.duration > 0) {
          filmStepTimerRef.current = setTimeout(runNextCredit, item.duration);
        }
      }
    };

    filmStepTimerRef.current = setTimeout(runNextCredit, 4000);
  };

  const resetHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowControls(true);

    if (isPlayingFilm && filmSubState === "video") {
      hideTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (mode !== "film") return;

    const handleUserActivity = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
      if ("clientY" in e && typeof e.clientY === "number") {
        if (e.clientY > window.innerHeight * 0.75) {
          setShowControls(true);
        }
      }
      resetHideTimer();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    resetHideTimer();

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [mode, isPlayingFilm, filmSubState]);

  const startFromBeginning = () => {
    if (filmStepTimerRef.current) clearTimeout(filmStepTimerRef.current);
    setCurrentChapterIndex(0);
    setFilmSubState("opening");
    setIsPlayingFilm(true);
    setShowControls(true);
    resetHideTimer();
  };

  const jumpChapter = (newIdx: number) => {
    if (newIdx >= 0 && newIdx < CHAPTERS.length) {
      if (filmStepTimerRef.current) clearTimeout(filmStepTimerRef.current);
      setCurrentChapterIndex(newIdx);
      if (mode === "film") {
        setFilmSubState("chapter_title");
        setIsPlayingFilm(true);
        setShowControls(true);
        resetHideTimer();
      }
    }
    setIsChapterDrawerOpen(false);
  };

  const enterFilmMode = () => {
    setMode("film");
    setFilmSubState("start_screen");
    setIsPlayingFilm(false);
    setShowControls(true);

    if (filmStageRef.current && filmStageRef.current.requestFullscreen) {
      filmStageRef.current.requestFullscreen().catch(() => {});
    }
  };

  const exitFilmMode = () => {
    setMode("chapter");
    setIsPlayingFilm(false);
    if (filmStepTimerRef.current) clearTimeout(filmStepTimerRef.current);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const toggleFilmPlay = () => {
    if (isPlayingFilm) {
      setIsPlayingFilm(false);
      setShowControls(true);
      if (playerRefFilm.current && playerRefFilm.current.pauseVideo) {
        try { playerRefFilm.current.pauseVideo(); } catch (e) {}
      }
    } else {
      setIsPlayingFilm(true);
      resetHideTimer();
      if (playerRefFilm.current && playerRefFilm.current.playVideo) {
        try { playerRefFilm.current.playVideo(); } catch (e) {}
      }
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-zinc-100 min-h-screen font-sans selection:bg-[#F6C744] selection:text-[#191919] pb-12">
      
      {/* 1. ヘッダーナビゲーション */}
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

      {/* 2. CHAPTER MODE (初期表示デフォルト: 資料＆動画 2カラム) */}
      {mode === "chapter" && (
        <main className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 pt-6 space-y-8">
          
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <div id="yt-slot-chapter" className="w-full h-full" />
                
                <button
                  onClick={enterFilmMode}
                  className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-black/80 hover:bg-[#F6C744] text-white hover:text-[#191919] font-mono font-bold text-[11px] rounded-lg transition-colors border border-zinc-700 flex items-center gap-1.5 backdrop-blur-xs cursor-pointer"
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

            {/* ドキュメンタリーナレーション調の常体解説テキスト */}
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

              <div className="space-y-3 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {currentChapter.desc.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

          </div>

          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => jumpChapter(currentChapterIndex - 1)}
                disabled={currentChapterIndex === 0}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 font-bold cursor-pointer"
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
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 font-bold cursor-pointer"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4 text-[#F6C744]" />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsChapterDrawerOpen(!isChapterDrawerOpen)}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg transition-colors flex items-center gap-2 font-bold cursor-pointer"
              >
                <List className="w-4 h-4 text-[#F6C744]" />
                <span>CHAPTERS INDEX ({CHAPTERS.length})</span>
              </button>

              {isChapterDrawerOpen && (
                <div className="absolute right-0 bottom-12 z-30 w-72 bg-zinc-900 border border-zinc-800 p-3 rounded-xl shadow-2xl space-y-1 max-h-80 overflow-y-auto">
                  <div className="text-[10px] font-bold text-zinc-500 px-2 py-1 uppercase border-b border-zinc-800 mb-1">
                    全10チャプター一覧
                  </div>
                  {CHAPTERS.map((ch, idx) => (
                    <button
                      key={ch.num}
                      onClick={() => jumpChapter(idx)}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
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

      {/* 3. FILM MODE (100% 映画没入シアター) */}
      {mode === "film" && (
        <div
          ref={filmStageRef}
          className={`fixed inset-0 z-50 w-screen h-screen bg-black text-white font-sans overflow-hidden select-none flex flex-col justify-between transition-all duration-300 ${
            !showControls && isPlayingFilm && filmSubState === "video" ? "cursor-none" : "cursor-default"
          }`}
        >
          <header
            className={`absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent px-6 py-4 flex items-center justify-between transition-all duration-300 ${
              showControls || filmSubState !== "video"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={exitFilmMode}
              className="text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 bg-black/70 px-3.5 py-1.5 rounded-lg border border-zinc-800 backdrop-blur-xs cursor-pointer"
            >
              <X className="w-4 h-4 text-[#F6C744]" />
              <span>EXIT FILM MODE</span>
            </button>

            <div className="text-xs font-mono text-[#F6C744] font-extrabold tracking-widest uppercase">
              SHOKO TAKIWAKI HISTORY // FILM MODE
            </div>
          </header>

          <div className="relative w-full h-full flex-1 bg-black flex items-center justify-center overflow-hidden">
            
            {filmSubState === "start_screen" && (
              <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center text-center p-6 space-y-6">
                <div className="space-y-3 font-mono">
                  <div className="text-4xl sm:text-7xl font-extrabold tracking-widest text-white">
                    SHOKO TAKIWAKI
                  </div>
                  <div className="text-2xl sm:text-4xl font-extrabold tracking-widest text-[#F6C744]">
                    HISTORY
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-500 font-bold tracking-widest">
                    2017 — 2026
                  </div>
                </div>

                <button
                  onClick={startFromBeginning}
                  className="mt-6 px-10 py-4 bg-[#F6C744] hover:bg-[#E99A32] text-[#191919] font-mono font-black text-lg sm:text-xl rounded-full transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3 cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-current" />
                  <span>▶ START FROM BEGINNING (最初から再生)</span>
                </button>
              </div>
            )}

            {filmSubState === "opening" && (
              <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 space-y-4 font-mono animate-fade-in">
                <div className="text-4xl sm:text-7xl font-extrabold tracking-widest text-white">
                  SHOKO TAKIWAKI
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold tracking-widest text-[#F6C744]">
                  HISTORY
                </div>
                <div className="text-sm text-zinc-500 font-bold tracking-widest">
                  2017 — 2026
                </div>
              </div>
            )}

            {filmSubState === "chapter_title" && (
              <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono animate-fade-in">
                <div className="text-3xl sm:text-6xl font-extrabold tracking-widest text-[#F6C744]">
                  {currentChapter.num} / {currentChapter.year} / {currentChapter.titleEn}
                </div>
              </div>
            )}

            {filmSubState === "fade" && (
              <div className="absolute inset-0 z-20 bg-black" />
            )}

            <div
              className={`w-full h-full max-w-full max-h-full flex items-center justify-center ${
                filmSubState === "video" ? "block" : "hidden"
              }`}
            >
              <div className="relative w-full h-full aspect-video max-w-full max-h-full">
                <div id="yt-slot-film-cinema" className="w-full h-full" />
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={toggleFilmPlay}
                />
              </div>
            </div>

            {filmSubState === "credits_1" && (
              <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-4 animate-fade-in">
                <div className="text-4xl sm:text-7xl font-extrabold tracking-widest text-white">
                  SHOKO TAKIWAKI
                </div>
                <div className="text-2xl sm:text-4xl font-bold tracking-widest text-[#F6C744]">
                  HISTORY
                </div>
                <div className="text-sm text-zinc-500 font-bold tracking-widest">
                  2017 — 2026
                </div>
              </div>
            )}

            {filmSubState === "credits_films" && (
              <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-4 animate-fade-in">
                <div className="text-xs text-[#F6C744] font-bold tracking-widest uppercase mb-2">
                  // FEATURED FILMS
                </div>
                <div className="text-xs sm:text-sm text-zinc-300 space-y-2 font-sans font-medium max-w-[800px] leading-relaxed">
                  {FEATURED_FILMS_LIST.map((f, idx) => (
                    <p key={idx}>{f}</p>
                  ))}
                </div>
              </div>
            )}

            {filmSubState === "credits_featuring" && (
              <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-4 animate-fade-in">
                <div className="text-xs text-[#F6C744] font-bold tracking-widest uppercase">
                  FEATURING
                </div>
                <div className="text-4xl sm:text-6xl font-maru font-extrabold text-white tracking-widest pt-2">
                  瀧脇 笙古
                </div>
              </div>
            )}

            {filmSubState === "credits_curated" && (
              <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-3 animate-fade-in">
                <div className="text-xs text-[#F6C744] font-bold tracking-widest uppercase">
                  CURATED BY
                </div>
                <div className="text-4xl sm:text-6xl font-extrabold text-white tracking-widest">
                  IDEAL
                </div>
                <div className="text-xs text-zinc-400 font-bold tracking-widest pt-2">
                  SHOKORA NO HEYA
                </div>
              </div>
            )}

            {filmSubState === "credits_disclaimer" && (
              <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-3 animate-fade-in">
                <div className="text-sm text-zinc-400 font-bold">
                  This is an unofficial fan project.
                </div>
                <div className="text-xs text-zinc-500 max-w-[600px] leading-relaxed">
                  All video content belongs to its respective rights holders.
                </div>
              </div>
            )}

            {filmSubState === "last_frame" && (
              <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-10 animate-fade-in">
                <div className="text-4xl sm:text-6xl font-extrabold text-white tracking-widest">
                  IDEAL
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold">
                  <button
                    onClick={startFromBeginning}
                    className="px-8 py-3.5 bg-[#F6C744] hover:bg-[#E99A32] text-[#191919] font-black rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>▶ 最初から再生 (START FROM BEGINNING)</span>
                  </button>
                  <button
                    onClick={exitFilmMode}
                    className="px-8 py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white rounded-full transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <X className="w-4 h-4 text-[#F6C744]" />
                    <span>CHAPTER MODEへ戻る</span>
                  </button>
                  <Link
                    href="/news"
                    className="px-8 py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white rounded-full transition-colors flex items-center gap-2"
                  >
                    <Newspaper className="w-4 h-4" />
                    <span>LATEST NEWS ↗</span>
                  </Link>
                </div>
              </div>
            )}

          </div>

          <footer
            className={`absolute bottom-0 left-0 w-full z-40 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-6 py-4 space-y-3 transition-all duration-300 ${
              showControls || filmSubState !== "video"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between gap-1 sm:gap-2 text-[10px] font-mono font-bold">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.num}
                  onClick={() => jumpChapter(idx)}
                  className={`flex-1 py-1.5 transition-all text-center rounded border cursor-pointer ${
                    idx === currentChapterIndex
                      ? "bg-[#F6C744] text-[#191919] border-[#F6C744] font-black scale-105 shadow-md"
                      : "bg-black/70 text-zinc-500 border-zinc-800/80 hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">{ch.num} {ch.titleEn}</span>
                  <span className="sm:hidden">{ch.num}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between bg-black/80 border border-zinc-800/80 rounded-xl px-4 py-2 text-xs font-mono backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={startFromBeginning}
                  className="px-3 py-1 bg-[#F6C744] hover:bg-[#E99A32] text-[#191919] font-black rounded text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>最初から再生</span>
                </button>
                <span className="text-zinc-600 hidden sm:inline">|</span>
                <span className="font-extrabold text-[#F6C744]">
                  CHAPTER {currentChapter.num} / 10
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => jumpChapter(currentChapterIndex - 1)}
                  disabled={currentChapterIndex === 0}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
                  title="前へ"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleFilmPlay}
                  className="p-2 bg-[#F6C744] text-[#191919] rounded-full hover:bg-[#E99A32] transition-colors cursor-pointer"
                  title={isPlayingFilm ? "一時停止" : "再生"}
                >
                  {isPlayingFilm ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => jumpChapter(currentChapterIndex + 1)}
                  disabled={currentChapterIndex === CHAPTERS.length - 1}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
                  title="次へ"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={exitFilmMode}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors ml-2 cursor-pointer"
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
