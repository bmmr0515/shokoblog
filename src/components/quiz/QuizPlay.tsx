"use client";

import React, { useState } from "react";
import { QuizQuestion, QuizDifficulty } from "@/types/quiz";
import { CheckCircle2, XCircle, ExternalLink, ArrowRight, Sparkles, HelpCircle } from "lucide-react";

interface QuizPlayProps {
  questions: QuizQuestion[];
  difficulty: QuizDifficulty;
  onFinishQuiz: (score: number, answeredQuestions: { question: QuizQuestion; userAnswer: string; isCorrect: boolean }[]) => void;
  onCancel: () => void;
}

export const QuizPlay: React.FC<QuizPlayProps> = ({
  questions,
  difficulty,
  onFinishQuiz,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [answeredHistory, setAnsweredHistory] = useState<
    { question: QuizQuestion; userAnswer: string; isCorrect: boolean }[]
  >([]);
  const [score, setScore] = useState<number>(0);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const difficultyLabel =
    difficulty === "easy"
      ? "初級"
      : difficulty === "normal"
      ? "中級"
      : "上級";

  const handleSelectOption = (option: string) => {
    if (isAnswered) return; // 既に回答済みの場合は変更不可

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(newScore);
    }

    setAnsweredHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        userAnswer: option,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      // スマホで解説を読んだあとにスムーズに上部へ戻す
      window.scrollTo({ top: 120, behavior: "smooth" });
    } else {
      // 最終問終了
      onFinishQuiz(score, answeredHistory);
    }
  };

  const isCurrentCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="space-y-6 max-w-[760px] mx-auto">
      
      {/* 進行バー ＆ ヘッダー */}
      <div className="bg-white border border-[#F0E4CE] rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] rounded-full text-[11px]">
              {difficultyLabel}コース
            </span>
            <span className="text-[#8C694D]">
              QUESTION {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#E99A32] font-mono">
              現在の正解数: <span className="font-extrabold text-sm text-[#191919]">{score}</span>
            </span>
            <button
              onClick={onCancel}
              className="text-[#8C694D] hover:text-[#191919] text-[11px] underline cursor-pointer"
            >
              中断
            </button>
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-full bg-[#FFF9ED] h-2.5 rounded-full overflow-hidden border border-[#F0E4CE]">
          <div
            className="bg-gradient-to-r from-[#F6C744] to-[#E99A32] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 問題カード */}
      <div className="bg-white border-2 border-[#F6C744] rounded-2xl p-5 sm:p-8 shadow-sm space-y-6">
        
        {/* カテゴリ ＆ 問題番号 */}
        <div className="flex items-center justify-between border-b border-[#F0E4CE] pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#191919] text-[#F6C744] text-[10px] font-mono font-bold rounded-full">
              Q.{currentIndex + 1}
            </span>
            <span className="text-xs font-bold text-[#8C694D] font-sans">
              ジャンル：{currentQ.categoryLabel}
            </span>
          </div>

          <span className="text-[11px] font-mono text-[#8C694D]">4択クイズ</span>
        </div>

        {/* 質問文 */}
        <div className="space-y-2">
          <h2 className="text-lg sm:text-2xl font-maru font-extrabold text-[#191919] leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* 4択選択肢リスト */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isTargetCorrect = option === currentQ.correctAnswer;

            let buttonStyle = "bg-[#FFFDF7] border-[#F0E4CE] text-[#191919] hover:bg-[#FFF4C7] hover:border-[#F6C744]";
            let icon = (
              <span className="w-6 h-6 rounded-full bg-[#FFF4C7] border border-[#F6C744]/60 text-[#5C4533] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
            );

            if (isAnswered) {
              if (isTargetCorrect) {
                // 正解の選択肢
                buttonStyle = "bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-bold";
                icon = <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0" />;
              } else if (isSelected && !isTargetCorrect) {
                // ユーザーが選んだ不正解の選択肢
                buttonStyle = "bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]";
                icon = <XCircle className="w-6 h-6 text-[#EF4444] shrink-0" />;
              } else {
                // それ以外の選択肢
                buttonStyle = "bg-zinc-50 border-zinc-200 text-zinc-400 opacity-60";
              }
            }

            return (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered}
                className={`w-full p-4 sm:p-5 rounded-xl border-2 ${buttonStyle} text-left text-sm sm:text-base font-sans font-bold transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default`}
              >
                <div className="flex items-center gap-3">
                  {icon}
                  <span className="leading-snug">{option}</span>
                </div>

                {isAnswered && isTargetCorrect && (
                  <span className="text-xs font-bold text-[#10B981] font-mono px-2 py-0.5 bg-white rounded border border-[#10B981]/40 shrink-0">
                    正解！
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 回答後 解説カード */}
        {isAnswered && (
          <div
            className={`mt-6 p-5 sm:p-6 rounded-xl border-2 space-y-4 animate-in fade-in duration-300 ${
              isCurrentCorrect
                ? "bg-[#FFF9ED] border-[#F6C744]"
                : "bg-[#FFF5F5] border-[#F87171]"
            }`}
          >
            {/* 正誤判定ヘッダー */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCurrentCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                    <span className="font-maru font-extrabold text-lg sm:text-xl text-[#065F46]">
                      正解！ お見事です！
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-[#EF4444]" />
                    <span className="font-maru font-extrabold text-lg sm:text-xl text-[#991B1B]">
                      ざんねん！ 不正解...
                    </span>
                  </>
                )}
              </div>

              {!isCurrentCorrect && (
                <div className="text-xs font-bold text-[#5C4533] font-sans">
                  正解は：<span className="text-[#191919] font-black underline">{currentQ.correctAnswer}</span>
                </div>
              )}
            </div>

            {/* 解説本文 */}
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-bold text-[#8C694D] uppercase font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E99A32]" />
                <span>EXPLANATION // 解説</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4533] leading-relaxed font-sans font-medium">
                {currentQ.explanation}
              </p>
            </div>

            {/* 公式出典・関連記事リンク ＆ 次へボタン */}
            <div className="pt-3 border-t border-[#F0E4CE] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {currentQ.sourceUrl ? (
                <a
                  href={currentQ.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-[#8C694D] hover:text-[#191919] inline-flex items-center gap-1 transition-colors"
                >
                  <span>関連公式情報・記事を読む</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E99A32]" />
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                className="py-3 px-6 bg-[#191919] hover:bg-[#5C4533] text-[#F6C744] hover:text-white rounded-xl font-maru font-extrabold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>
                  {currentIndex < questions.length - 1 ? "次の問題へ" : "結果を見る！"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
