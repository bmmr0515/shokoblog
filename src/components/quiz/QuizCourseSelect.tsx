"use client";

import React from "react";
import { QuizDifficulty } from "@/types/quiz";
import { getApprovedQuestions } from "@/data/quizData";
import { Sparkles, Award, Flame, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

interface QuizCourseSelectProps {
  onSelectCourse: (difficulty: QuizDifficulty) => void;
}

export const QuizCourseSelect: React.FC<QuizCourseSelectProps> = ({ onSelectCourse }) => {
  const easyCount = getApprovedQuestions("easy").length;
  const normalCount = getApprovedQuestions("normal").length;
  const hardCount = getApprovedQuestions("hard").length;
  const totalApproved = easyCount + normalCount + hardCount;

  const courses: {
    difficulty: QuizDifficulty;
    title: string;
    subTitle: string;
    description: string;
    target: string;
    poolCount: number;
    badge: string;
    color: string;
    border: string;
    bg: string;
    btnBg: string;
    btnHover: string;
    icon: React.ReactNode;
  }[] = [
    {
      difficulty: "easy",
      title: "初級コース",
      subTitle: "しょこちゃんの基本を知ろう！",
      description: "出身地、誕生日、サイリウムカラー、マラソンサブ4、ベイスターズファンなど、ファンなら押さえておきたい基本問題！",
      target: "最近ファンになった方・まずは肩慣らししたい方",
      poolCount: easyCount,
      badge: "BEGINNER",
      color: "#8C694D",
      border: "border-[#F6C744]",
      bg: "bg-[#FFF9ED]",
      btnBg: "bg-[#F6C744] text-[#191919]",
      btnHover: "hover:bg-[#E99A32] hover:text-white",
      icon: <Sparkles className="w-5 h-5 text-[#E99A32]" />,
    },
    {
      difficulty: "normal",
      title: "中級コース",
      subTitle: "本格派しょこらファンへの道！",
      description: "東京マラソンの詳細タイム、オーディション秘話、BAY☆スタ対談、VMAJ 3冠、紅白歌合戦会見エピソードなど充実の10問！",
      target: "ライブや配信を日常的にチェックしている方",
      poolCount: normalCount,
      badge: "REGULAR",
      color: "#E99A32",
      border: "border-[#E99A32]",
      bg: "bg-white",
      btnBg: "bg-[#E99A32] text-white",
      btnHover: "hover:bg-[#D97706]",
      icon: <Award className="w-5 h-5 text-[#E99A32]" />,
    },
    {
      difficulty: "hard",
      title: "上級コース",
      subTitle: "目指せ【しょこら神】！究極の難関",
      description: "コラム初回掲載号、対談選手、高校陸上部時代の種目、細かな歌割りや発言まで網羅。全問正解できたら真のしょこらマスター！",
      target: "結成当初から応援している方・全知識を試したい猛者",
      poolCount: hardCount,
      badge: "EXPERT",
      color: "#DC2626",
      border: "border-[#DC2626]/40",
      bg: "bg-white",
      btnBg: "bg-[#191919] text-[#F6C744]",
      btnHover: "hover:bg-[#333333]",
      icon: <Flame className="w-5 h-5 text-[#DC2626]" />,
    },
  ];

  return (
    <div className="space-y-8 max-w-[840px] mx-auto">
      
      {/* イントロダクション */}
      <div className="bg-[#FFF9ED] border border-[#F0E4CE] rounded-2xl p-6 sm:p-8 space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF4C7] border border-[#F6C744]/40 rounded-full text-xs font-mono font-bold text-[#5C4533]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E99A32]" />
          <span>運営者承認・公式確認クイズ</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-maru font-extrabold text-[#191919] leading-tight">
          しょこら検定
        </h2>

        <p className="text-xs sm:text-sm text-[#5C4533] font-sans font-bold leading-relaxed max-w-[620px] mx-auto">
          瀧脇笙古さんの活動や魅力をクイズ形式で楽しむファン度診断コンテンツです。<br className="hidden sm:inline" />
          当検定の問題は、信頼できる公式記録・一次情報に基づき、サイト運営者が明示的に確認・承認した問題のみを厳選して公開しています。
        </p>

        {/* 承認済み問題の準備状況アナウンス */}
        {totalApproved === 0 ? (
          <div className="p-4 bg-white border border-[#E99A32]/60 rounded-xl space-y-1.5 max-w-[580px] mx-auto text-left">
            <div className="flex items-center gap-2 font-bold text-[#D97706] text-xs font-maru">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>【問題データ準備中のお知らせ】</span>
            </div>
            <p className="text-[11px] text-[#5C4533] font-sans leading-relaxed">
              現在、サイト運営者によるクイズ問題の最終精査および承認作業を行っております。運営者承認済みの問題が順次公開されますので、公開まで今しばらくお待ちください。
            </p>
          </div>
        ) : (
          <div className="text-xs text-[#8C694D] font-mono font-bold">
            現在の承認済み公開問題：合計 {totalApproved} 問
          </div>
        )}

        {/* ルール要点 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left text-xs font-sans">
          <div className="p-3 bg-white rounded-xl border border-[#F0E4CE] space-y-1">
            <div className="font-bold text-[#191919] flex items-center gap-1.5 font-maru">
              <CheckCircle2 className="w-4 h-4 text-[#F6C744]" />
              <span>全問4択形式</span>
            </div>
            <p className="text-[11px] text-[#8C694D]">
              同一プレイ内の重複出題なし。選択肢もランダム配置。
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#F0E4CE] space-y-1">
            <div className="font-bold text-[#191919] flex items-center gap-1.5 font-maru">
              <CheckCircle2 className="w-4 h-4 text-[#F6C744]" />
              <span>全問解説＆出典付き</span>
            </div>
            <p className="text-[11px] text-[#8C694D]">
              回答後に詳しい解説と関連公式情報へのリンクを表示。
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#F0E4CE] space-y-1">
            <div className="font-bold text-[#191919] flex items-center gap-1.5 font-maru">
              <CheckCircle2 className="w-4 h-4 text-[#F6C744]" />
              <span>認定証画像＆シェア</span>
            </div>
            <p className="text-[11px] text-[#8C694D]">
              正方形（1080×1080px）認定証画像を保存＆Xシェア可能！
            </p>
          </div>
        </div>
      </div>

      {/* コースカード一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {courses.map((c) => {
          const isAvailable = c.poolCount > 0;
          const displayQuestionCount = isAvailable
            ? c.poolCount >= 10
              ? "全10問出題"
              : `全${c.poolCount}問出題`
            : "準備中";

          return (
            <div
              key={c.difficulty}
              className={`${c.bg} border-2 ${c.border} rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between ${
                isAvailable ? "hover:shadow-md transition-shadow" : "opacity-80"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] font-mono font-bold text-[10px] rounded-full">
                    {c.badge}
                  </span>
                  <span className={`text-[11px] font-mono font-bold ${isAvailable ? "text-[#8C694D]" : "text-zinc-400"}`}>
                    {isAvailable ? `公開中: ${c.poolCount}問` : "承認問題: 0問"}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {c.icon}
                    <h3 className="text-xl font-maru font-extrabold text-[#191919]">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-xs font-bold text-[#E99A32] font-maru">
                    {c.subTitle}
                  </p>
                </div>

                <p className="text-xs text-[#5C4533] font-sans leading-relaxed">
                  {c.description}
                </p>

                <div className="p-2.5 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE]/60 text-[11px] font-sans text-[#8C694D]">
                  <span className="font-bold text-[#5C4533]">出題形式：</span>
                  {displayQuestionCount}
                </div>
              </div>

              {isAvailable ? (
                <button
                  onClick={() => onSelectCourse(c.difficulty)}
                  className={`w-full py-3.5 px-4 ${c.btnBg} ${c.btnHover} rounded-xl font-maru font-extrabold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <span>{c.title}に挑戦する</span>
                  <span className="font-mono">→</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3.5 px-4 bg-zinc-200 text-zinc-500 rounded-xl font-maru font-bold text-sm cursor-not-allowed text-center"
                >
                  現在準備中（承認待ち）
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 認定ランク紹介 */}
      <div className="border border-[#F0E4CE] bg-white rounded-2xl p-5 sm:p-6 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-[#F0E4CE] pb-2.5">
          <Award className="w-4 h-4 text-[#E99A32]" />
          <h3 className="font-maru font-extrabold text-sm sm:text-base text-[#191919]">
            正解数と認定ランク一覧
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-sans">
          <div className="p-2.5 bg-[#FFF4C7] rounded-lg border border-[#F6C744]/40">
            <div className="font-bold text-[#E99A32] font-maru text-sm">全問正解：しょこら神</div>
            <div className="text-[11px] text-[#5C4533]">最高峰の栄誉称号！</div>
          </div>
          <div className="p-2.5 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE]">
            <div className="font-bold text-[#D97706] font-maru text-sm">90%以上：しょこらマスター</div>
            <div className="text-[11px] text-[#5C4533]">トップクラスの知識人</div>
          </div>
          <div className="p-2.5 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE]">
            <div className="font-bold text-[#8C694D] font-maru text-sm">70〜80%：しょこら博士</div>
            <div className="text-[11px] text-[#5C4533]">深い理解を持つファン</div>
          </div>
          <div className="p-2.5 bg-[#FAFAFA] rounded-lg border border-zinc-200">
            <div className="font-bold text-[#5C4533] font-maru text-sm">50〜60%：しょこら研究員</div>
            <div className="text-[11px] text-zinc-600">半分以上正解の好成績</div>
          </div>
          <div className="p-2.5 bg-[#FAFAFA] rounded-lg border border-zinc-200">
            <div className="font-bold text-[#78716C] font-maru text-sm">30〜40%：しょこら見習い</div>
            <div className="text-[11px] text-zinc-600">ここからステップアップ</div>
          </div>
          <div className="p-2.5 bg-[#FAFAFA] rounded-lg border border-zinc-200">
            <div className="font-bold text-zinc-500 font-maru text-sm">0〜20%：しょこら初心者</div>
            <div className="text-[11px] text-zinc-600">サイトを巡って学ぼう！</div>
          </div>
        </div>
      </div>

    </div>
  );
};
