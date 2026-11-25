"use client";

import React from "react";
import { QuizDifficulty } from "@/types/quiz";
import { Sparkles, Award, Zap, Flame, HelpCircle, CheckCircle2 } from "lucide-react";

interface QuizCourseSelectProps {
  onSelectCourse: (difficulty: QuizDifficulty) => void;
}

export const QuizCourseSelect: React.FC<QuizCourseSelectProps> = ({ onSelectCourse }) => {
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
      poolCount: 31,
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
      poolCount: 31,
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
      poolCount: 30,
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
          <Sparkles className="w-3.5 h-3.5 text-[#E99A32]" />
          <span>SHOKO TAKIWAKI OFFICIAL FAN QUIZ</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-maru font-extrabold text-[#191919] leading-tight">
          コースを選んで検定スタート！
        </h2>

        <p className="text-xs sm:text-sm text-[#5C4533] font-sans font-bold leading-relaxed max-w-[620px] mx-auto">
          全問4択形式・1プレイ10問。問題プールから毎回ランダムに出題されます。<br className="hidden sm:inline" />
          全問正解で最高称号「<span className="text-[#E99A32] font-black">しょこら神</span>」を目指そう！
        </p>

        {/* ルール要点 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left text-xs font-sans">
          <div className="p-3 bg-white rounded-xl border border-[#F0E4CE] space-y-1">
            <div className="font-bold text-[#191919] flex items-center gap-1.5 font-maru">
              <CheckCircle2 className="w-4 h-4 text-[#F6C744]" />
              <span>1プレイ10問</span>
            </div>
            <p className="text-[11px] text-[#8C694D]">
              毎回ランダムに抽出されるため何度でも楽しめます。
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#F0E4CE] space-y-1">
            <div className="font-bold text-[#191919] flex items-center gap-1.5 font-maru">
              <CheckCircle2 className="w-4 h-4 text-[#F6C744]" />
              <span>全問解説＆リンク付き</span>
            </div>
            <p className="text-[11px] text-[#8C694D]">
              回答後に詳しい解説と関連公式情報が読めます。
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#F0E4CE] space-y-1">
            <div className="font-bold text-[#191919] flex items-center gap-1.5 font-maru">
              <CheckCircle2 className="w-4 h-4 text-[#F6C744]" />
              <span>認定証画像＆シェア</span>
            </div>
            <p className="text-[11px] text-[#8C694D]">
              1080×1080pxの認定証画像を保存してXでシェア可能！
            </p>
          </div>
        </div>
      </div>

      {/* コースカード一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {courses.map((c) => (
          <div
            key={c.difficulty}
            className={`${c.bg} border-2 ${c.border} rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-[#FFF4C7] border border-[#F6C744]/40 text-[#5C4533] font-mono font-bold text-[10px] rounded-full">
                  {c.badge}
                </span>
                <span className="text-[11px] font-mono font-bold text-[#8C694D]">
                  全{c.poolCount}問より出題
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
                <span className="font-bold text-[#5C4533]">おすすめ：</span>{c.target}
              </div>
            </div>

            <button
              onClick={() => onSelectCourse(c.difficulty)}
              className={`w-full py-3.5 px-4 ${c.btnBg} ${c.btnHover} rounded-xl font-maru font-extrabold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer`}
            >
              <span>{c.title}に挑戦する</span>
              <span className="font-mono">→</span>
            </button>
          </div>
        ))}
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
            <div className="font-bold text-[#E99A32] font-maru text-sm">10問：しょこら神</div>
            <div className="text-[11px] text-[#5C4533]">全問正解の最高栄誉！</div>
          </div>
          <div className="p-2.5 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE]">
            <div className="font-bold text-[#D97706] font-maru text-sm">9問：しょこらマスター</div>
            <div className="text-[11px] text-[#5C4533]">トップクラスの知識人</div>
          </div>
          <div className="p-2.5 bg-[#FFF9ED] rounded-lg border border-[#F0E4CE]">
            <div className="font-bold text-[#8C694D] font-maru text-sm">7〜8問：しょこら博士</div>
            <div className="text-[11px] text-[#5C4533]">深い理解を持つファン</div>
          </div>
          <div className="p-2.5 bg-[#FAFAFA] rounded-lg border border-zinc-200">
            <div className="font-bold text-[#5C4533] font-maru text-sm">5〜6問：しょこら研究員</div>
            <div className="text-[11px] text-zinc-600">半分以上正解の好成績</div>
          </div>
          <div className="p-2.5 bg-[#FAFAFA] rounded-lg border border-zinc-200">
            <div className="font-bold text-[#78716C] font-maru text-sm">3〜4問：しょこら見習い</div>
            <div className="text-[11px] text-zinc-600">ここからさらにステップアップ</div>
          </div>
          <div className="p-2.5 bg-[#FAFAFA] rounded-lg border border-zinc-200">
            <div className="font-bold text-zinc-500 font-maru text-sm">0〜2問：しょこら初心者</div>
            <div className="text-[11px] text-zinc-600">サイトを巡って学ぼう！</div>
          </div>
        </div>
      </div>

    </div>
  );
};
