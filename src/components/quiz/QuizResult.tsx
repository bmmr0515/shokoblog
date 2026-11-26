"use client";

import React from "react";
import Link from "next/link";
import { QuizDifficulty, QuizQuestion, RankInfo } from "@/types/quiz";
import { getRankInfo } from "@/data/quizData";
import { getSafeQuizShareText, getTwitterShareUrl } from "@/lib/quizShare";
import { Confetti } from "./Confetti";
import { QuizCertificateCanvas } from "./QuizCertificateCanvas";
import {
  Trophy,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Share2,
  BookOpen,
  ArrowRight,
  Video,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { AdSenseAd } from "@/components/ads/AdSenseAd";

interface QuizResultProps {
  difficulty: QuizDifficulty;
  score: number;
  total: number;
  answeredQuestions: {
    question: QuizQuestion;
    userAnswer: string;
    isCorrect: boolean;
  }[];
  onRetrySameDifficulty: () => void;
  onChangeDifficulty: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  difficulty,
  score,
  total,
  answeredQuestions,
  onRetrySameDifficulty,
  onChangeDifficulty,
}) => {
  const rankInfo: RankInfo = getRankInfo(score);
  const isPerfect = score === total;

  const difficultyLabel =
    difficulty === "easy"
      ? "初級"
      : difficulty === "normal"
      ? "中級"
      : "上級";

  // X (Twitter) シェアテキスト（指定テンプレート・280重み検証済み）
  const { shareText } = getSafeQuizShareText(
    difficultyLabel,
    rankInfo.title,
    rankInfo.message
  );
  const twitterShareLink = getTwitterShareUrl(shareText);

  return (
    <div className="space-y-10 max-w-[800px] mx-auto pb-8">
      {/* 全問正解時の紙吹雪演出 */}
      {isPerfect && <Confetti durationMs={5000} />}

      {/* 結果サマリーカード */}
      <div className="bg-white border-2 border-[#F6C744] rounded-2xl p-6 sm:p-10 shadow-md text-center space-y-6 relative overflow-hidden">
        {/* 背景の装飾光彩 */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#FFF4C7] rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#FFF9ED] rounded-full blur-2xl pointer-events-none" />

        <div className="relative space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF9ED] border border-[#F0E4CE] rounded-full text-xs font-mono font-bold text-[#8C694D]">
            <Trophy className="w-3.5 h-3.5 text-[#E99A32]" />
            <span>{difficultyLabel}コース 診断結果</span>
          </div>

          <h2 className="text-sm font-bold text-[#8C694D] uppercase font-mono tracking-widest">
            QUIZ RESULT & CERTIFICATION
          </h2>
        </div>

        {/* 認定ランク表示 */}
        <div className="relative py-4 space-y-3">
          <div className="text-xs font-bold text-[#8C694D] font-sans">
            あなたの認定ランク
          </div>

          <div
            className="text-4xl sm:text-5xl font-maru font-black tracking-tight drop-shadow-2xs"
            style={{ color: rankInfo.color }}
          >
            {rankInfo.title}
          </div>

          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-extrabold" style={{ backgroundColor: rankInfo.bgColor, color: rankInfo.color }}>
            [ {rankInfo.badge} RANK ]
          </div>

          {/* 得点表示 */}
          <div className="pt-2 text-2xl sm:text-3xl font-mono font-black text-[#191919]">
            正解数：<span className="text-4xl sm:text-5xl text-[#E99A32]">{score}</span> / {total} 問
          </div>
        </div>

        {/* メッセージ */}
        <div className="p-4 sm:p-5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-xl text-xs sm:text-sm text-[#5C4533] font-sans font-bold leading-relaxed max-w-[600px] mx-auto">
          {rankInfo.message}
        </div>

        {/* シェア＆再挑戦 アクションボタン */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={twitterShareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#191919] hover:bg-[#333] text-white font-maru font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#F6C744]" />
            <span>結果をX（旧Twitter）でポスト</span>
          </a>

          <button
            onClick={onRetrySameDifficulty}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#F6C744] hover:bg-[#E99A32] text-[#191919] hover:text-white font-maru font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>同じコースでもう一度</span>
          </button>

          <button
            onClick={onChangeDifficulty}
            className="w-full sm:w-auto px-5 py-3.5 bg-[#FFF9ED] hover:bg-[#FFF4C7] text-[#5C4533] border border-[#F0E4CE] font-maru font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>別のコースに挑戦</span>
          </button>
        </div>
      </div>

      {/* 認定証画像 生成・ダウンロードセクション */}
      <div className="bg-white border border-[#F0E4CE] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="border-b border-[#F0E4CE] pb-3 space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E99A32]" />
            <h3 className="font-maru font-extrabold text-base sm:text-lg text-[#191919]">
              正方形（1080×1080px）認定証画像
            </h3>
          </div>
          <p className="text-xs text-[#8C694D] font-sans">
            SNSへの投稿や記念に保存できる高解像度認定証です。
          </p>
        </div>

        <QuizCertificateCanvas
          difficulty={difficulty}
          score={score}
          total={total}
          rankInfo={rankInfo}
        />
      </div>

      {/* 今回の出題振り返りリスト */}
      <div className="bg-white border border-[#F0E4CE] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="border-b border-[#F0E4CE] pb-3">
          <h3 className="font-maru font-extrabold text-base text-[#191919] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#E99A32]" />
            <span>今回の出題の振り返り・解説</span>
          </h3>
        </div>

        <div className="divide-y divide-[#F0E4CE]/60">
          {answeredQuestions.map((item, idx) => (
            <div key={item.question.id} className="py-4 space-y-2 text-xs font-sans">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#8C694D]">Q.{idx + 1}</span>
                  <span className="px-2 py-0.5 bg-[#FFF4C7] text-[#5C4533] text-[10px] rounded-full font-bold">
                    {item.question.categoryLabel}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-bold">
                  {item.isCorrect ? (
                    <span className="text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 正解
                    </span>
                  ) : (
                    <span className="text-[#EF4444] flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> 不正解
                    </span>
                  )}
                </div>
              </div>

              <div className="font-bold text-[#191919] text-sm leading-snug">
                {item.question.question}
              </div>

              <div className="p-3 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE]/60 space-y-1">
                <div className="text-[11px] text-[#5C4533]">
                  <span className="font-bold">あなたの回答：</span>
                  <span className={item.isCorrect ? "font-bold text-[#065F46]" : "font-bold text-[#991B1B]"}>
                    {item.userAnswer}
                  </span>
                  {!item.isCorrect && (
                    <span className="ml-2 text-[#065F46] font-bold">
                      （正解：{item.question.correctAnswer}）
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#5C4533] leading-relaxed pt-1">
                  {item.question.explanation}
                </p>

                {item.question.sourceUrl && (
                  <div className="pt-1">
                    <a
                      href={item.question.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-[#8C694D] hover:text-[#191919] inline-flex items-center gap-0.5 underline"
                    >
                      <span>関連情報を見る</span>
                      <ExternalLink className="w-3 h-3 text-[#E99A32]" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* サイト内おすすめコンテンツへの誘導 */}
      <div className="bg-[#FFF9ED] border border-[#F0E4CE] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-bold text-[#8C694D] uppercase">
            EXPLORE SHOKO'S WORLD
          </div>
          <h3 className="font-maru font-extrabold text-base sm:text-lg text-[#191919]">
            もっと瀧脇笙古ちゃんを知るおすすめページ
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <Link
            href="/profile"
            className="p-4 bg-white hover:bg-[#FFF4C7] border border-[#F0E4CE] hover:border-[#F6C744] rounded-xl transition-all shadow-2xs space-y-1.5 block group"
          >
            <div className="flex items-center justify-between">
              <User className="w-4 h-4 text-[#E99A32]" />
              <ArrowRight className="w-3.5 h-3.5 text-[#8C694D] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-maru font-bold text-sm text-[#191919]">PROFILE</div>
            <div className="text-[11px] text-[#5C4533]">
              詳細プロフィール＆4つの魅力をチェック
            </div>
          </Link>

          <Link
            href="/history"
            className="p-4 bg-white hover:bg-[#FFF4C7] border border-[#F0E4CE] hover:border-[#F6C744] rounded-xl transition-all shadow-2xs space-y-1.5 block group"
          >
            <div className="flex items-center justify-between">
              <Trophy className="w-4 h-4 text-[#E99A32]" />
              <ArrowRight className="w-3.5 h-3.5 text-[#8C694D] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-maru font-bold text-sm text-[#191919]">HISTORY</div>
            <div className="text-[11px] text-[#5C4533]">
              2017年のオーディションから現在までの歩み
            </div>
          </Link>

          <Link
            href="/youtube"
            className="p-4 bg-white hover:bg-[#FFF4C7] border border-[#F0E4CE] hover:border-[#F6C744] rounded-xl transition-all shadow-2xs space-y-1.5 block group"
          >
            <div className="flex items-center justify-between">
              <Video className="w-4 h-4 text-[#E99A32]" />
              <ArrowRight className="w-3.5 h-3.5 text-[#8C694D] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-maru font-bold text-sm text-[#191919]">MOVIE</div>
            <div className="text-[11px] text-[#5C4533]">
              FILA、MV、ライブ映像コレクション
            </div>
          </Link>
        </div>
      </div>

      {/* 広告掲載（結果画面最下部・誤タップ防止の安全配置） */}
      <div className="pt-2">
        <AdSenseAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} />
      </div>

    </div>
  );
};
