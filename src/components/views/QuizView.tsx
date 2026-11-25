"use client";

import React, { useState, useEffect } from "react";
import { QuizDifficulty, QuizQuestion } from "@/types/quiz";
import { getRandomQuizQuestions } from "@/data/quizData";
import { QuizCourseSelect } from "@/components/quiz/QuizCourseSelect";
import { QuizPlay } from "@/components/quiz/QuizPlay";
import { QuizResult } from "@/components/quiz/QuizResult";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HelpCircle, Award, Sparkles } from "lucide-react";

export function QuizView() {
  const [mode, setMode] = useState<"select" | "playing" | "result">("select");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("easy");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    { question: QuizQuestion; userAnswer: string; isCorrect: boolean }[]
  >([]);

  // 匿名プレイ統計（localStorage）
  const [playCount, setPlayCount] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("shokora_quiz_play_count");
      if (stored) {
        setPlayCount(parseInt(stored, 10) || 0);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleStartQuiz = (selectedDifficulty: QuizDifficulty) => {
    const qList = getRandomQuizQuestions(selectedDifficulty, 10);
    setDifficulty(selectedDifficulty);
    setQuestions(qList);
    setScore(0);
    setAnsweredQuestions([]);
    setMode("playing");

    // プレイ開始イベント（匿名カウント）
    try {
      const current = parseInt(localStorage.getItem("shokora_quiz_play_count") || "0", 10);
      const next = current + 1;
      localStorage.setItem("shokora_quiz_play_count", next.toString());
      setPlayCount(next);
    } catch (e) {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinishQuiz = (
    finalScore: number,
    finalAnswered: { question: QuizQuestion; userAnswer: string; isCorrect: boolean }[]
  ) => {
    setScore(finalScore);
    setAnsweredQuestions(finalAnswered);
    setMode("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetrySameDifficulty = () => {
    handleStartQuiz(difficulty);
  };

  const handleChangeDifficulty = () => {
    setMode("select");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-8 py-2">
      
      {/* パンくずリスト */}
      <Breadcrumbs items={[{ label: "しょこら検定" }]} />

      {/* ヘッダータイトル */}
      <div className="border-b-2 border-[#191919] pb-4 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C694D] uppercase">
          <HelpCircle className="w-4 h-4 text-[#E99A32]" />
          <span>SHOKO TAKIWAKI OFFICIAL FAN QUIZ</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-3xl sm:text-4xl font-mono font-extrabold tracking-wider text-[#191919]">
            しょこら検定
          </h1>
          <span className="text-xs sm:text-sm font-maru font-bold text-[#8C694D]">
            瀧脇笙古ファン度診断クイズ（全問4択・10問チャレンジ）
          </span>

          {playCount > 0 && (
            <span className="text-xs font-mono text-[#8C694D] font-bold ml-auto sm:ml-0 px-2.5 py-0.5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-full">
              あなたの挑戦回数: {playCount}回
            </span>
          )}
        </div>
      </div>

      {/* モード別コンテンツ切り替え */}
      {mode === "select" && (
        <QuizCourseSelect onSelectCourse={handleStartQuiz} />
      )}

      {mode === "playing" && (
        <QuizPlay
          questions={questions}
          difficulty={difficulty}
          onFinishQuiz={handleFinishQuiz}
          onCancel={handleChangeDifficulty}
        />
      )}

      {mode === "result" && (
        <QuizResult
          difficulty={difficulty}
          score={score}
          total={questions.length}
          answeredQuestions={answeredQuestions}
          onRetrySameDifficulty={handleRetrySameDifficulty}
          onChangeDifficulty={handleChangeDifficulty}
        />
      )}

    </div>
  );
}
