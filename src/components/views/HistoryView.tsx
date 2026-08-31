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
  Newspaper,
  Volume2,
  VolumeX,
  ChevronRight
} from "lucide-react";

// YouTube IFrame Player API のグローバル型定義
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

// シーンオブジェクトの型定義
export type SceneType = "opening" | "title" | "video" | "text" | "interlude" | "ending";

export interface Scene {
  id: string;
  chapterNum?: string;
  type: SceneType;
  year?: string;
  titleEn?: string;
  titleJa?: string;
  subText?: string;
  subtitlePre?: string;
  subtitlePost?: string;
  specialStat?: { value: string; label: string };
  timeGapText?: string;
  // テキストカード用 (字幕カード切り替え配列)
  cards?: string[];
  // 動画用
  videoId?: string;
  start?: number;
  end?: number | null;
  duration?: number; // ミリ秒 (title / text / interlude 用)
}

// 全ドキュメンタリータイムラインのシーンデータ構造 (完全指定通り)
const SCENES: Scene[] = [
  // ========================================================
  // OPENING
  // ========================================================
  {
    id: "opening",
    type: "opening",
    year: "2017 — 2026",
    titleEn: "SHOKO TAKIWAKI",
    titleJa: "HISTORY",
    subText: "最初から、できたわけではない。",
    duration: 4500
  },

  // ========================================================
  // CHAPTER 01: 2017 / AUDITION
  // ========================================================
  {
    id: "ch1-title",
    chapterNum: "01",
    type: "title",
    year: "2017",
    titleEn: "AUDITION",
    titleJa: "THE BEGINNING",
    subText: "すべては、オーディションから。",
    duration: 3500
  },
  {
    id: "ch1-video",
    chapterNum: "01",
    type: "video",
    videoId: "zXR_xhihDOQ",
    start: 1,
    end: null
  },
  {
    id: "ch1-text",
    chapterNum: "01",
    type: "text",
    cards: [
      "2017年。＝LOVEのオーディションから、しょこちゃんのアイドル人生が始まりました。",
      "現在の姿だけを見ると、最初から何でもできたように見えるかもしれません。",
      "でも、このあと待っていたのは、決して順調な道だけではありませんでした。",
      "最初にぶつかったのは、ダンスでした。"
    ],
    duration: 10000
  },

  // ========================================================
  // CHAPTER 02: 2017 / TRAINING
  // ========================================================
  {
    id: "ch2-title",
    chapterNum: "02",
    type: "title",
    year: "2017",
    titleEn: "TRAINING",
    titleJa: "TRAINING",
    subText: "できない自分と向き合う。",
    duration: 3500
  },
  {
    id: "ch2-video",
    chapterNum: "02",
    type: "video",
    videoId: "RPlkP-5jP44",
    start: 756, // 厳守!
    end: null
  },
  {
    id: "ch2-text",
    chapterNum: "02",
    type: "text",
    cards: [
      "＝LOVE加入時、しょこちゃんはダンス未経験でした。",
      "初期の合宿では、厳しいレッスンの中で苦戦する姿も残されています。",
      "できなかったものが、少しずつできるようになっていく。",
      "このHISTORYで描きたい成長は、ここから始まっています。",
      "ダンス経験は、ありませんでした。"
    ],
    duration: 12000
  },

  // ========================================================
  // INTERLUDE: 2018 / COOKING
  // ========================================================
  {
    id: "interlude-cooking",
    chapterNum: "02.5",
    type: "interlude",
    year: "2018",
    titleEn: "COOKING",
    titleJa: "クックアイドルNo.1決定戦 優勝",
    cards: [
      "料理という、もうひとつの強み。",
      "「クックアイドルNo.1決定戦」に挑戦し、見事優勝を果たしました。",
      "好きなものを磨き、結果につなげていく。",
      "この姿勢は、その後の挑戦にもつながっていきます。"
    ],
    duration: 8500
  },

  // ========================================================
  // CHAPTER 03: 2020 / SASUKE
  // ========================================================
  {
    id: "ch3-title",
    chapterNum: "03",
    type: "title",
    year: "2020",
    titleEn: "SASUKE",
    titleJa: "CHALLENGE",
    subText: "挑戦する場所は、ステージだけではない。",
    duration: 3500
  },
  {
    id: "ch3-video",
    chapterNum: "03",
    type: "video",
    videoId: "zUeSRsheJC8",
    start: 0,
    end: null
  },
  {
    id: "ch3-text",
    chapterNum: "03",
    type: "text",
    cards: [
      "運動が得意という個性を生かし、2020年には「SASUKE」に挑戦。",
      "アイドル活動とは違う場所でも、新しいことに飛び込んでいきます。",
      "できることだけを選ぶのではなく、挑戦しながら活動の幅を広げていきました。",
      "そして2021年、大きな転機が訪れます。"
    ],
    duration: 10000
  },

  // ========================================================
  // CHAPTER 04: 2021 / FIRST CENTER (クライマックス 1)
  // ========================================================
  {
    id: "ch4-title",
    chapterNum: "04",
    type: "title",
    year: "2021",
    titleEn: "FIRST CENTER",
    titleJa: "FIRST CENTER",
    subtitlePre: "加入から4年。",
    subtitlePost: "初めて、センターに立ちました。",
    subText: "「BPM170の君へ」自身初センター",
    duration: 4500
  },
  {
    id: "ch4-video",
    chapterNum: "04",
    type: "video",
    videoId: "ei0BtXWrVb4",
    start: 1065, // 厳守!
    end: null
  },
  {
    id: "ch4-text",
    chapterNum: "04",
    type: "text",
    cards: [
      "2021年。「BPM170の君へ」で、しょこちゃんは自身初のセンターを任されました。",
      "加入当初はダンス未経験。思うようにできなかった時期から、少しずつ経験を積み重ねてきました。",
      "そして、その先で届いた初センター。",
      "さらにこの曲は、しょこちゃんの「走る」という個性とも深くつながっています。",
      "そして、その想いをステージへ。"
    ],
    duration: 12000
  },

  // ========================================================
  // CHAPTER 05: 2021 / ON STAGE
  // ========================================================
  {
    id: "ch5-title",
    chapterNum: "05",
    type: "title",
    year: "2021",
    titleEn: "ON STAGE",
    titleJa: "ON STAGE",
    subText: "真ん中に立つ姿。",
    duration: 3000
  },
  {
    id: "ch5-video",
    chapterNum: "05",
    type: "video",
    videoId: "8Jtyt23R-jg",
    start: 0,
    end: null
  },
  {
    id: "ch5-text",
    chapterNum: "05",
    type: "text",
    cards: [
      "メイキングで語られた想いは、実際のステージへ。",
      "真んちに立ち、楽曲を背負い、観客へ届ける。",
      "2017年の合宿から見てきたからこそ、この景色には意味があります。",
      "そして、“走る”という個性は、さらに先へ。"
    ],
    duration: 9000
  },

  // ========================================================
  // CHAPTER 06: 2023 / RUN
  // ========================================================
  {
    id: "ch6-title",
    chapterNum: "06",
    type: "title",
    year: "2023",
    titleEn: "RUN",
    titleJa: "RUN",
    specialStat: { value: "03:57:06", label: "SUB 4" },
    subText: "走り続けた先に。",
    duration: 4000
  },
  {
    id: "ch6-video",
    chapterNum: "06",
    type: "video",
    videoId: "RoVAmDAGej8",
    start: 0,
    end: null
  },
  {
    id: "ch6-text",
    chapterNum: "06",
    type: "text",
    cards: [
      "しょこちゃんを語るうえで、マラソンは欠かせません。",
      "継続して走り、記録と向き合い続け、東京マラソン2023では 3時間57分06秒 で完走。サブ4を達成しました。",
      "「BPM170の君へ」で描かれた個性が、現実の結果にもつながっていきました。",
      "走り続けた時間は、確かな記録になりました。"
    ],
    duration: 11000
  },

  // ========================================================
  // CHAPTER 07: HEART (本人の内面)
  // ========================================================
  {
    id: "ch7-title",
    chapterNum: "07",
    type: "title",
    year: "2024",
    titleEn: "HEART",
    titleJa: "HEART",
    subText: "強さだけでは、ありません。",
    duration: 3500
  },
  {
    id: "ch7-video",
    chapterNum: "07",
    type: "video",
    videoId: "-syTHUFdQyk",
    start: 1678, // 厳守!
    end: null
  },
  {
    id: "ch7-text",
    chapterNum: "07",
    type: "text",
    cards: [
      "努力を続けているからといって、いつも迷わないわけではありません。",
      "挑戦を重ねてきたしょこちゃんにも、悩みや不安があります。",
      "普段とは少し違う表情から、一人の人として積み重ねてきた時間が見えてきます。"
    ],
    duration: 9000
  },

  // ========================================================
  // CHAPTER 08: 2025 / DOUBLE CENTER
  // ========================================================
  {
    id: "ch8-title",
    chapterNum: "08",
    type: "title",
    year: "2025",
    titleEn: "DOUBLE CENTER",
    titleJa: "DOUBLE CENTER",
    timeGapText: "2021 FIRST CENTER ➔ 2025 DOUBLE CENTER",
    subText: "もう一度、センターへ。",
    duration: 4000
  },
  {
    id: "ch8-video",
    chapterNum: "08",
    type: "video",
    videoId: "4xBmuiQNGdc",
    start: 0,
    end: null
  },
  {
    id: "ch8-text",
    chapterNum: "08",
    type: "text",
    cards: [
      "初センターから約4年。",
      "「木漏れ日メゾフォルテ」で、音嶋莉沙ちゃんとのダブルセンターを務めました。",
      "歌も、ダンスも、ステージでの存在感も。",
      "活動を重ねる中で、少しずつ任される役割を増やしてきました。"
    ],
    duration: 10000
  },

  // ========================================================
  // CHAPTER 09: 2025 / YOKOHAMA
  // ========================================================
  {
    id: "ch9-title",
    chapterNum: "09",
    type: "title",
    year: "2025",
    titleEn: "YOKOHAMA",
    titleJa: "YOKOHAMA",
    subText: "好きだと言い続けた先に。 A DREAM CAME TRUE",
    duration: 3500
  },
  {
    id: "ch9-video",
    chapterNum: "09",
    type: "video",
    videoId: "fe_nGoGe9DQ",
    start: 0,
    end: null
  },
  {
    id: "ch9-text",
    chapterNum: "09",
    type: "text",
    cards: [
      "神奈川県出身。そして、横浜DeNAベイスターズを長く応援してきたしょこちゃん。",
      "野球について発信し、関連する仕事を重ね、ついには横浜スタジアムでセレモニアルピッチを務めました。",
      "好きなものを発信し続けることで、ひとつの夢が仕事につながりました。",
      "A DREAM CAME TRUE"
    ],
    duration: 10000
  },

  // ========================================================
  // CHAPTER 10: 2026 / NOW (ラスト)
  // ========================================================
  {
    id: "ch10-title",
    chapterNum: "10",
    type: "title",
    year: "2026",
    titleEn: "NOW",
    titleJa: "NOW",
    subText: "そして、現在。",
    duration: 3500
  },
  {
    id: "ch10-video",
    chapterNum: "10",
    type: "video",
    videoId: "0dJb1WGsK2Q",
    start: 0,
    end: null
  },
  {
    id: "ch10-text",
    chapterNum: "10",
    type: "text",
    cards: [
      "歌。ダンス。料理。マラソン。スポーツ。横浜。",
      "ひとつずつ活動の幅を広げてきた先で、2026年、FILAのスタイリングパートナーへ。",
      "2017年の合宿で苦戦していた姿から、約9年。",
      "突然ここに来たわけではありません。積み重ねてきた時間が、新しい景色につながっています。"
    ],
    duration: 11000
  },

  // ========================================================
  // ENDING
  // ========================================================
  {
    id: "ending",
    type: "ending",
    year: "2017 — 2026",
    titleEn: "SHOKO TAKIWAKI HISTORY",
    titleJa: "物語は、まだ続いています。"
  }
];

export function HistoryView() {
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isApiReady, setIsApiReady] = useState<boolean>(false);
  const [needUserResume, setNeedUserResume] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScene = SCENES[sceneIndex];

  // 1. YouTube IFrame Player API の動的読み込み
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

  // 2. タイマー解除のクリーンアップ
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // 3. 次のシーンへ自動進行
  const nextScene = () => {
    clearTimer();
    setNeedUserResume(false);
    if (sceneIndex < SCENES.length - 1) {
      setSceneIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  // 4. 前のシーンへ戻る
  const prevScene = () => {
    clearTimer();
    setNeedUserResume(false);
    if (sceneIndex > 0) {
      // 一つ前のビデオまたはタイトルに移動
      let targetIdx = sceneIndex - 1;
      while (targetIdx > 0 && SCENES[targetIdx].type === "text") {
        targetIdx--;
      }
      setSceneIndex(targetIdx);
    }
  };

  // 5. 特定のチャプター番号の先頭シーンへ跳躍
  const jumpToChapter = (chapterNumStr: string) => {
    clearTimer();
    setNeedUserResume(false);
    const targetIdx = SCENES.findIndex(
      (s) => s.chapterNum === chapterNumStr && (s.type === "title" || s.type === "video")
    );
    if (targetIdx !== -1) {
      if (!hasStarted) setHasStarted(true);
      setIsPlaying(true);
      setSceneIndex(targetIdx);
    }
  };

  // 6. YouTube プレイヤーの初期化 ＆ onStateChange 監視
  useEffect(() => {
    if (!isApiReady || currentScene.type !== "video") return;

    // 既存プレイヤーがあれば破棄
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {}
      playerRef.current = null;
    }

    const iframeContainer = document.getElementById("yt-player-slot");
    if (!iframeContainer) return;

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
            try {
              event.target.playVideo();
            } catch (err) {
              setNeedUserResume(true);
            }
          }
        },
        onStateChange: (event: any) => {
          // YT.PlayerState.ENDED (0)
          if (event.data === window.YT.PlayerState.ENDED) {
            nextScene();
          }
        },
        onError: () => {
          // エラー時も安全に次シーンへ進行
          nextScene();
        }
      }
    });

    return () => {
      clearTimer();
    };
  }, [sceneIndex, isApiReady]);

  // 7. 非動画シーン (title, text, interlude, opening) の自動タイマーカウントダウン
  useEffect(() => {
    clearTimer();
    setCardIndex(0);
    setNeedUserResume(false);

    if (!hasStarted || !isPlaying) return;

    if (currentScene.type === "text" && currentScene.cards) {
      // テキストカードの字幕スライドショータイマー
      const perCardTime = (currentScene.duration || 8000) / currentScene.cards.length;
      
      const interval = setInterval(() => {
        setCardIndex((prev) => {
          if (prev < currentScene.cards!.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, perCardTime);

      timerRef.current = setTimeout(() => {
        clearInterval(interval);
        nextScene();
      }, currentScene.duration || 8000);

      return () => {
        clearInterval(interval);
        clearTimer();
      };
    } else if (
      currentScene.type === "title" ||
      currentScene.type === "opening" ||
      currentScene.type === "interlude"
    ) {
      timerRef.current = setTimeout(() => {
        nextScene();
      }, currentScene.duration || 4000);
    }
  }, [sceneIndex, hasStarted, isPlaying]);

  // STORY再生開始トリガー
  const handleStartStory = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setSceneIndex(0);
  };

  // 再生/一時停止 トグル
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

  // フルスクリーン切り替え
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // チャプターリスト (10個)
  const chaptersList = [
    { num: "01", label: "01 START" },
    { num: "02", label: "02 TRAINING" },
    { num: "03", label: "03 CHALLENGE" },
    { num: "04", label: "04 FIRST CENTER" },
    { num: "05", label: "05 ON STAGE" },
    { num: "06", label: "06 RUN" },
    { num: "07", label: "07 HEART" },
    { num: "08", label: "08 DOUBLE CENTER" },
    { num: "09", label: "09 YOKOHAMA" },
    { num: "10", label: "10 NOW" },
  ];

  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen flex flex-col items-center justify-between font-sans selection:bg-[#F6C744] selection:text-[#191919]">
      
      {/* ======================================================== */}
      {/* 画面上部: 最小限のヘッダー */}
      {/* ======================================================== */}
      <header className="w-full max-w-[1400px] px-6 py-4 flex items-center justify-between z-30">
        <Link
          href="/"
          className="text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>← しょこらの部屋</span>
        </Link>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[#F6C744] font-extrabold tracking-widest flex items-center gap-1.5 uppercase">
            <Film className="w-4 h-4 text-[#F6C744]" />
            SHOKO TAKIWAKI HISTORY
          </span>
        </div>

        <Link
          href="/news"
          className="text-xs font-mono font-bold text-zinc-400 hover:text-[#F6C744] transition-colors hidden sm:flex items-center gap-1"
        >
          <span>最新ニュース ↗</span>
        </Link>
      </header>

      {/* ======================================================== */}
      {/* 画面中央: 1つの大画面 16:9 シネマプレイヤー (メイン領域) */}
      {/* ======================================================== */}
      <main className="w-full max-w-[1360px] px-4 sm:px-8 my-auto flex-1 flex flex-col justify-center py-2">
        
        <div
          ref={containerRef}
          className="relative w-full aspect-video bg-[#000000] border-2 border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center transition-all duration-500"
        >
          
          {/* A. 再生開始前 オーバーレイ (「STORYを再生する」) */}
          {!hasStarted && (
            <div className="absolute inset-0 z-30 bg-[#000000]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#F6C744] tracking-[0.3em] uppercase block">
                  DOCUMENTARY FILM
                </span>
                <h1 className="text-4xl sm:text-6xl font-mono font-extrabold text-white tracking-wider">
                  SHOKO TAKIWAKI
                </h1>
                <p className="text-xs font-mono text-zinc-500 font-bold tracking-widest">
                  2017 — 2026
                </p>
              </div>

              <p className="text-lg sm:text-2xl font-maru font-extrabold text-[#F6C744] tracking-wide pt-2">
                最初から、できたわけではない。
              </p>

              <button
                onClick={handleStartStory}
                className="mt-4 px-10 py-4 bg-[#F6C744] hover:bg-[#E99A32] text-[#191919] font-maru font-extrabold text-lg sm:text-xl rounded-full transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>STORYを再生する</span>
              </button>

              <p className="text-[11px] font-sans text-zinc-400 max-w-[480px]">
                画面の中央で動画と物語が自動進行します。<br />途中でのスキップや前後のチャプター移動も可能です。
              </p>
            </div>
          )}

          {/* B. 自動再生がブロックされた場合の「続きを再生」 */}
          {hasStarted && needUserResume && (
            <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-3">
              <p className="text-sm font-maru text-white font-bold">次のシーンを開始します</p>
              <button
                onClick={() => {
                  setNeedUserResume(false);
                  if (playerRef.current && playerRef.current.playVideo) {
                    playerRef.current.playVideo();
                  }
                }}
                className="px-6 py-2.5 bg-[#F6C744] text-[#191919] font-bold text-xs rounded-full flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>続きを再生</span>
              </button>
            </div>
          )}

          {/* C. SCENE 1: OPENING */}
          {hasStarted && currentScene.type === "opening" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 space-y-6 animate-fade-in">
              <div className="text-xs font-mono font-bold text-zinc-500 tracking-widest uppercase">
                {currentScene.year}
              </div>
              <h2 className="text-4xl sm:text-6xl font-mono font-extrabold text-white tracking-widest">
                {currentScene.titleEn}
              </h2>
              <p className="text-2xl sm:text-4xl font-maru font-extrabold text-[#F6C744] tracking-wide pt-2">
                {currentScene.subText}
              </p>
            </div>
          )}

          {/* D. SCENE 2: TITLE CARD (チャプター開始タイトル) */}
          {hasStarted && currentScene.type === "title" && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fade-in">
              <div className="text-xs font-mono font-bold text-[#F6C744] tracking-widest">
                CHAPTER {currentScene.chapterNum} // {currentScene.year}
              </div>

              <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-white tracking-widest">
                {currentScene.titleEn}
              </h2>

              {currentScene.subtitlePre && (
                <div className="text-sm sm:text-base font-mono text-[#F6C744] font-bold pt-1">
                  {currentScene.subtitlePre}
                </div>
              )}

              <p className="text-xl sm:text-3xl font-maru font-extrabold text-zinc-100">
                {currentScene.titleJa}
              </p>

              {currentScene.subtitlePost && (
                <div className="text-base sm:text-xl font-maru text-[#F6C744] font-bold">
                  {currentScene.subtitlePost}
                </div>
              )}

              {currentScene.timeGapText && (
                <div className="mt-2 px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#F6C744] font-bold rounded-lg">
                  {currentScene.timeGapText}
                </div>
              )}

              {currentScene.specialStat && (
                <div className="pt-3 space-y-1">
                  <div className="text-4xl sm:text-6xl font-mono font-extrabold text-white tracking-wider">
                    {currentScene.specialStat.value}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#F6C744] uppercase tracking-widest">
                    {currentScene.specialStat.label}
                  </div>
                </div>
              )}

              {currentScene.subText && (
                <p className="text-xs sm:text-sm text-zinc-400 font-sans font-medium pt-2">
                  {currentScene.subText}
                </p>
              )}
            </div>
          )}

          {/* E. SCENE 3: INTERLUDE CARD (動画なし繋ぎ) */}
          {hasStarted && currentScene.type === "interlude" && (
            <div className="absolute inset-0 z-20 bg-[#0B0B0B] flex flex-col items-center justify-center text-center p-8 space-y-5 animate-fade-in max-w-[800px] mx-auto">
              <div className="text-xs font-mono font-bold text-[#F6C744]">
                INTERLUDE // {currentScene.year}
              </div>
              <h2 className="text-2xl sm:text-4xl font-maru font-extrabold text-white">
                {currentScene.titleJa}
              </h2>
              {currentScene.cards && (
                <div className="text-xs sm:text-base text-zinc-300 font-sans leading-relaxed space-y-2 max-w-[600px] font-medium pt-2">
                  {currentScene.cards.map((c, idx) => (
                    <p key={idx}>{c}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* F. SCENE 4: YOUTUBE VIDEO PLAYER */}
          <div
            className={`w-full h-full ${
              hasStarted && currentScene.type === "video" ? "block" : "hidden"
            }`}
          >
            <div id="yt-player-slot" className="w-full h-full" />
          </div>

          {/* G. SCENE 5: TEXT CARD (字幕・解説カード) */}
          {hasStarted && currentScene.type === "text" && currentScene.cards && (
            <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-8 space-y-6 animate-fade-in">
              <div className="text-xs font-mono font-bold text-zinc-500 tracking-wider">
                CHAPTER {currentScene.chapterNum} // NARRATION
              </div>
              <div className="max-w-[720px] mx-auto px-4 min-h-[120px] flex items-center justify-center">
                <p className="text-lg sm:text-2xl font-maru font-extrabold text-zinc-100 leading-relaxed tracking-wide">
                  {currentScene.cards[cardIndex] || currentScene.cards[0]}
                </p>
              </div>
              <div className="flex gap-1.5 pt-4">
                {currentScene.cards.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === cardIndex ? "w-6 bg-[#F6C744]" : "w-1.5 bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* H. SCENE 6: ENDING CARD (エンディング) */}
          {hasStarted && currentScene.type === "ending" && (
            <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center text-center p-8 space-y-6 animate-fade-in">
              <div className="text-xs font-mono text-zinc-500 font-bold tracking-widest">
                2017 — 2026
              </div>

              <div className="space-y-2 text-sm sm:text-base text-zinc-300 font-sans font-medium">
                <p>できないところから始まりました。</p>
                <p>それでも、挑戦を続けました。</p>
                <p className="text-xs text-[#F6C744] font-mono font-bold pt-1">
                  初センター / サブ4 / ダブルセンター / 横浜スタジアム / FILA
                </p>
              </div>

              <div className="py-4 border-y border-zinc-800 my-2">
                <h2 className="text-3xl sm:text-5xl font-maru font-extrabold text-[#F6C744] tracking-wider">
                  物語は、まだ続いています。
                </h2>
              </div>

              <div className="text-xs font-mono text-zinc-500 font-bold">
                SHOKO TAKIWAKI HISTORY
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold">
                <button
                  onClick={() => {
                    setSceneIndex(0);
                    setIsPlaying(true);
                  }}
                  className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white rounded-full transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>REPLAY (最初から見る)</span>
                </button>
                <Link
                  href="/news"
                  className="px-6 py-3 bg-[#F6C744] text-[#191919] font-bold rounded-full hover:bg-[#E99A32] transition-colors flex items-center gap-2"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>LATEST NEWS (最新情報を見る ↗)</span>
                </Link>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* ======================================================== */}
      {/* 画面下部: プレイヤーコントロール ＆ プログレスバー */}
      {/* ======================================================== */}
      <footer className="w-full max-w-[1400px] px-6 py-4 space-y-3 z-30">
        
        {/* 細いチャプタープログレスバー (01 ━━━ 02 ━━━ 03 ... 10) */}
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
                    : "bg-zinc-950/80 text-zinc-500 border-zinc-800/80 hover:text-white hover:border-zinc-700"
                }`}
              >
                <span className="hidden sm:inline">{ch.label}</span>
                <span className="sm:hidden">{ch.num}</span>
              </button>
            );
          })}
        </div>

        {/* コントロールバー */}
        <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-mono">
          
          {/* 現在のステータス表示 */}
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-[#F6C744]">
              CHAPTER {currentScene.chapterNum || "01"} / 10
            </span>
            <span className="text-zinc-500 hidden sm:inline">|</span>
            <span className="text-zinc-300 font-bold truncate max-w-[200px] sm:max-w-[360px]">
              {currentScene.titleEn} {currentScene.year ? `(${currentScene.year})` : ""}
            </span>
          </div>

          {/* 再生ボタン類 */}
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
