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
  Film,
  Newspaper
} from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export type SceneType = "opening" | "chapter" | "video" | "fade" | "credits_1" | "credits_films" | "credits_featuring" | "credits_curated" | "credits_disclaimer" | "last_frame";

export interface Scene {
  id: string;
  chapterNum?: string;
  type: SceneType;
  year?: string;
  label?: string;
  videoId?: string;
  start?: number;
  duration?: number;
}

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

// 無駄な解説テキストを排した純粋シネマシーンデータ
const SCENES: Scene[] = [
  // OPENING
  { id: "opening", type: "opening", duration: 3500 },

  // CHAPTER 01
  { id: "ch1-card", chapterNum: "01", type: "chapter", year: "2017", label: "01 / 2017 / AUDITION", duration: 3000 },
  { id: "ch1-video", chapterNum: "01", type: "video", videoId: "zXR_xhihDOQ", start: 1 },
  { id: "ch1-fade", type: "fade", duration: 1000 },

  // CHAPTER 02
  { id: "ch2-card", chapterNum: "02", type: "chapter", year: "2017", label: "02 / 2017 / TRAINING", duration: 3000 },
  { id: "ch2-video", chapterNum: "02", type: "video", videoId: "RPlkP-5jP44", start: 756 }, // 756 厳守
  { id: "ch2-fade", type: "fade", duration: 1000 },

  // CHAPTER 03
  { id: "ch3-card", chapterNum: "03", type: "chapter", year: "2020", label: "03 / 2020 / SASUKE", duration: 3000 },
  { id: "ch3-video", chapterNum: "03", type: "video", videoId: "zUeSRsheJC8", start: 0 },
  { id: "ch3-fade", type: "fade", duration: 1000 },

  // CHAPTER 04
  { id: "ch4-card", chapterNum: "04", type: "chapter", year: "2021", label: "04 / 2021 / FIRST CENTER", duration: 3000 },
  { id: "ch4-video", chapterNum: "04", type: "video", videoId: "ei0BtXWrVb4", start: 1065 }, // 1065 厳守
  { id: "ch4-fade", type: "fade", duration: 1000 },

  // CHAPTER 05
  { id: "ch5-card", chapterNum: "05", type: "chapter", year: "2021", label: "05 / 2021 / ON STAGE", duration: 3000 },
  { id: "ch5-video", chapterNum: "05", type: "video", videoId: "8Jtyt23R-jg", start: 0 },
  { id: "ch5-fade", type: "fade", duration: 1000 },

  // CHAPTER 06
  { id: "ch6-card", chapterNum: "06", type: "chapter", year: "2023", label: "06 / 2023 / MARATHON", duration: 3000 },
  { id: "ch6-video", chapterNum: "06", type: "video", videoId: "RoVAmDAGej8", start: 0 },
  { id: "ch6-fade", type: "fade", duration: 1000 },

  // CHAPTER 07
  { id: "ch7-card", chapterNum: "07", type: "chapter", year: "2024", label: "07 / HEART", duration: 3000 },
  { id: "ch7-video", chapterNum: "07", type: "video", videoId: "-syTHUFdQyk", start: 1678 }, // 1678 厳守
  { id: "ch7-fade", type: "fade", duration: 1000 },

  // CHAPTER 08
  { id: "ch8-card", chapterNum: "08", type: "chapter", year: "2025", label: "08 / 2025 / DOUBLE CENTER", duration: 3000 },
  { id: "ch8-video", chapterNum: "08", type: "video", videoId: "4xBmuiQNGdc", start: 0 },
  { id: "ch8-fade", type: "fade", duration: 1000 },

  // CHAPTER 09
  { id: "ch9-card", chapterNum: "09", type: "chapter", year: "2025", label: "09 / 2025 / YOKOHAMA", duration: 3000 },
  { id: "ch9-video", chapterNum: "09", type: "video", videoId: "fe_nGoGe9DQ", start: 0 },
  { id: "ch9-fade", type: "fade", duration: 1000 },

  // CHAPTER 10
  { id: "ch10-card", chapterNum: "10", type: "chapter", year: "2026", label: "10 / 2026 / FILA", duration: 3000 },
  { id: "ch10-video", chapterNum: "10", type: "video", videoId: "0dJb1WGsK2Q", start: 0 },
  { id: "ch10-fade", type: "fade", duration: 1000 },

  // ENDING CREDITS (1画面ずつフェード)
  { id: "cred-1", type: "credits_1", duration: 4000 },
  { id: "cred-films", type: "credits_films", duration: 7000 },
  { id: "cred-featuring", type: "credits_featuring", duration: 4000 },
  { id: "cred-curated", type: "credits_curated", duration: 4000 },
  { id: "cred-disclaimer", type: "credits_disclaimer", duration: 4500 },
  { id: "last-frame", type: "last_frame" }
];

export function HistoryView() {
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isApiReady, setIsApiReady] = useState<boolean>(false);
  const [needUserResume, setNeedUserResume] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScene = SCENES[sceneIndex];

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

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const nextScene = () => {
    clearTimer();
    setNeedUserResume(false);
    if (sceneIndex < SCENES.length - 1) {
      setSceneIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const prevScene = () => {
    clearTimer();
    setNeedUserResume(false);
    if (sceneIndex > 0) {
      let targetIdx = sceneIndex - 1;
      while (targetIdx > 0 && SCENES[targetIdx].type === "fade") {
        targetIdx--;
      }
      setSceneIndex(targetIdx);
    }
  };

  const jumpToChapter = (chapterNumStr: string) => {
    clearTimer();
    setNeedUserResume(false);
    const targetIdx = SCENES.findIndex((s) => s.chapterNum === chapterNumStr && s.type === "chapter");
    if (targetIdx !== -1) {
      if (!hasStarted) setHasStarted(true);
      setIsPlaying(true);
      setSceneIndex(targetIdx);
    }
  };

  // YouTube プレイヤー初期化
  useEffect(() => {
    if (!isApiReady || currentScene.type !== "video") return;

    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch (e) {}
      playerRef.current = null;
    }

    const iframeSlot = document.getElementById("yt-player-slot");
    if (!iframeSlot) return;

    playerRef.current = new window.YT.Player("yt-player-slot", {
      height: "100%",
      width: "100%",
      videoId: currentScene.videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        start: currentScene.start || 0,
      },
      events: {
        onReady: (event: any) => {
          if (isPlaying) {
            try { event.target.playVideo(); } catch (err) { setNeedUserResume(true); }
          }
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            nextScene();
          }
        },
        onError: () => {
          nextScene();
        }
      }
    });

    return () => {
      clearTimer();
    };
  }, [sceneIndex, isApiReady]);

  // 非動画シーンのタイマー進行
  useEffect(() => {
    clearTimer();
    setNeedUserResume(false);

    if (!hasStarted || !isPlaying) return;

    if (
      currentScene.type === "opening" ||
      currentScene.type === "chapter" ||
      currentScene.type === "fade" ||
      currentScene.type.startsWith("credits_")
    ) {
      timerRef.current = setTimeout(() => {
        nextScene();
      }, currentScene.duration || 3000);
    }
  }, [sceneIndex, hasStarted, isPlaying]);

  const handleStartStory = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setSceneIndex(0);
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearTimer();
      if (playerRef.current && playerRef.current.pauseVideo) {
        try { playerRef.current.pauseVideo(); } catch (e) {}
      }
    } else {
      setIsPlaying(true);
      if (currentScene.type === "video" && playerRef.current && playerRef.current.playVideo) {
        try { playerRef.current.playVideo(); } catch (e) {}
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const chaptersList = [
    { num: "01", label: "01 AUDITION" },
    { num: "02", label: "02 TRAINING" },
    { num: "03", label: "03 SASUKE" },
    { num: "04", label: "04 FIRST CENTER" },
    { num: "05", label: "05 ON STAGE" },
    { num: "06", label: "06 MARATHON" },
    { num: "07", label: "07 HEART" },
    { num: "08", label: "08 DOUBLE CENTER" },
    { num: "09", label: "09 YOKOHAMA" },
    { num: "10", label: "10 FILA" },
  ];

  return (
    <div className="bg-[#000000] text-zinc-100 min-h-screen flex flex-col items-center justify-between font-sans selection:bg-[#F6C744] selection:text-[#191919]">
      
      {/* 上部スリムヘッダー */}
      <header className="w-full max-w-[1400px] px-6 py-4 flex items-center justify-between z-30">
        <Link
          href="/"
          className="text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
        >
          ← しょこらの部屋
        </Link>

        <div className="flex items-center gap-2 font-mono text-xs text-[#F6C744] font-extrabold tracking-widest uppercase">
          <Film className="w-4 h-4 text-[#F6C744]" />
          <span>SHOKO TAKIWAKI HISTORY</span>
        </div>

        <Link
          href="/news"
          className="text-xs font-mono font-bold text-zinc-400 hover:text-[#F6C744] transition-colors hidden sm:block"
        >
          NEWS ↗
        </Link>
      </header>

      {/* 画面中央: 1つの 16:9 シネマプレイヤー (メインスクリーン) */}
      <main className="w-full max-w-[1360px] px-4 sm:px-8 my-auto flex-1 flex flex-col justify-center py-2">
        <div
          ref={containerRef}
          className="relative w-full aspect-video bg-[#000000] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center transition-all duration-500"
        >
          
          {/* 1. 再生開始前オーバーレイ */}
          {!hasStarted && (
            <div className="absolute inset-0 z-30 bg-[#000000]/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-6">
              <div className="space-y-3 font-mono">
                <div className="text-4xl sm:text-6xl font-extrabold tracking-widest text-white">
                  SHOKO TAKIWAKI
                </div>
                <div className="text-xl sm:text-3xl font-extrabold tracking-widest text-[#F6C744]">
                  HISTORY
                </div>
                <div className="text-xs text-zinc-500 font-bold tracking-widest">
                  2017 — 2026
                </div>
              </div>

              <button
                onClick={handleStartStory}
                className="mt-6 px-10 py-4 bg-[#F6C744] hover:bg-[#E99A32] text-[#191919] font-mono font-black text-lg sm:text-xl rounded-full transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>STORYを再生する</span>
              </button>
            </div>
          )}

          {/* 2. 自動再生補助ボタン */}
          {hasStarted && needUserResume && (
            <div className="absolute inset-0 z-40 bg-black/80 flex flex-col items-center justify-center space-y-3">
              <button
                onClick={() => {
                  setNeedUserResume(false);
                  if (playerRef.current && playerRef.current.playVideo) {
                    playerRef.current.playVideo();
                  }
                }}
                className="px-6 py-2.5 bg-[#F6C744] text-[#191919] font-mono font-bold text-xs rounded-full flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>続きを再生</span>
              </button>
            </div>
          )}

          {/* 3. SCENE: OPENING */}
          {hasStarted && currentScene.type === "opening" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 space-y-4 font-mono">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-widest text-white">
                SHOKO TAKIWAKI
              </div>
              <div className="text-xl sm:text-3xl font-extrabold tracking-widest text-[#F6C744]">
                HISTORY
              </div>
              <div className="text-xs text-zinc-500 font-bold tracking-widest">
                2017 — 2026
              </div>
            </div>
          )}

          {/* 4. SCENE: CHAPTER TITLE CARD */}
          {hasStarted && currentScene.type === "chapter" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-2">
              <div className="text-2xl sm:text-4xl font-extrabold tracking-widest text-[#F6C744]">
                {currentScene.label}
              </div>
            </div>
          )}

          {/* 5. SCENE: FADE (暗転 0.8〜1s) */}
          {hasStarted && currentScene.type === "fade" && (
            <div className="absolute inset-0 z-20 bg-black" />
          )}

          {/* 6. SCENE: VIDEO (YouTube API) */}
          <div
            className={`w-full h-full ${
              hasStarted && currentScene.type === "video" ? "block" : "hidden"
            }`}
          >
            <div id="yt-player-slot" className="w-full h-full" />
          </div>

          {/* 7. SCENE: CREDITS 1 */}
          {hasStarted && currentScene.type === "credits_1" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-4">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-widest text-white">
                SHOKO TAKIWAKI
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-widest text-[#F6C744]">
                HISTORY
              </div>
              <div className="text-xs text-zinc-500 font-bold tracking-widest">
                2017 — 2026
              </div>
            </div>
          )}

          {/* 8. SCENE: CREDITS FILMS */}
          {hasStarted && currentScene.type === "credits_films" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-3">
              <div className="text-xs text-[#F6C744] font-bold tracking-widest uppercase mb-1">
                // FEATURED FILMS
              </div>
              <div className="text-[11px] sm:text-xs text-zinc-300 space-y-1.5 font-sans font-medium max-w-[700px] leading-snug">
                {FEATURED_FILMS_LIST.map((f, idx) => (
                  <p key={idx}>{f}</p>
                ))}
              </div>
            </div>
          )}

          {/* 9. SCENE: CREDITS FEATURING */}
          {hasStarted && currentScene.type === "credits_featuring" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-3">
              <div className="text-xs text-[#F6C744] font-bold tracking-widest uppercase">
                FEATURING
              </div>
              <div className="text-3xl sm:text-5xl font-maru font-extrabold text-white tracking-widest pt-1">
                瀧脇 笙古
              </div>
            </div>
          )}

          {/* 10. SCENE: CREDITS CURATED */}
          {hasStarted && currentScene.type === "credits_curated" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-3">
              <div className="text-xs text-[#F6C744] font-bold tracking-widest uppercase">
                CURATED BY
              </div>
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-widest">
                IDEAL
              </div>
              <div className="text-xs text-zinc-400 font-bold tracking-widest pt-2">
                SHOKORA NO HEYA
              </div>
            </div>
          )}

          {/* 11. SCENE: CREDITS DISCLAIMER */}
          {hasStarted && currentScene.type === "credits_disclaimer" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-3">
              <div className="text-xs text-zinc-400 font-bold">
                This is an unofficial fan project.
              </div>
              <div className="text-[11px] text-zinc-500 max-w-[500px] leading-relaxed">
                All video content belongs to its respective rights holders.
              </div>
            </div>
          )}

          {/* 12. SCENE: LAST FRAME (IDEAL + REPLAY & LATEST NEWS) */}
          {hasStarted && currentScene.type === "last_frame" && (
            <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center text-center p-6 font-mono space-y-8">
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-widest">
                IDEAL
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold">
                <button
                  onClick={() => {
                    setSceneIndex(0);
                    setIsPlaying(true);
                  }}
                  className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white rounded-full transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#F6C744]" />
                  <span>REPLAY</span>
                </button>
                <Link
                  href="/news"
                  className="px-8 py-3 bg-[#F6C744] text-[#191919] font-bold rounded-full hover:bg-[#E99A32] transition-colors flex items-center gap-2"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>LATEST NEWS ↗</span>
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 画面下部: プログレスバー ＆ コントロール */}
      <footer className="w-full max-w-[1400px] px-6 py-4 space-y-3 z-30">
        
        {/* 細いチャプターバー (01 AUDITION ~ 10 FILA) */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 text-[10px] font-mono font-bold">
          {chaptersList.map((ch) => {
            const isCurrent = currentScene.chapterNum === ch.num;
            return (
              <button
                key={ch.num}
                onClick={() => jumpToChapter(ch.num)}
                className={`flex-1 py-1.5 transition-all text-center rounded border ${
                  isCurrent
                    ? "bg-[#F6C744] text-[#191919] border-[#F6C744] font-black scale-105 shadow-md"
                    : "bg-zinc-950/90 text-zinc-500 border-zinc-800/80 hover:text-white"
                }`}
              >
                <span className="hidden sm:inline">{ch.label}</span>
                <span className="sm:hidden">{ch.num}</span>
              </button>
            );
          })}
        </div>

        {/* コントロールバー */}
        <div className="flex items-center justify-between bg-zinc-950/90 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-[#F6C744]">
              CHAPTER {currentScene.chapterNum || "01"} / 10
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-300 font-bold">
              {currentScene.label || "SHOKO TAKIWAKI HISTORY"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevScene}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="前のチャプター"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {hasStarted && (
              <button
                onClick={togglePlay}
                className="p-2 bg-[#F6C744] text-[#191919] rounded-full hover:bg-[#E99A32] transition-colors"
                title={isPlaying ? "一時停止" : "再生"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
            )}

            <button
              onClick={nextScene}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="次のチャプター"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors ml-2 hidden sm:block"
              title="全画面"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </footer>

    </div>
  );
}
