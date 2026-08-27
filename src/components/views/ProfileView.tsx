"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sidebar } from "@/components/Sidebar";
import { getLinkItems } from "@/lib/store";
import { LinkItem } from "@/types/blog";
import { ExternalLink, Award, Trophy, User } from "lucide-react";

export function ProfileView() {
  const [items, setItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    setItems(getLinkItems());
  }, []);

  const profileTable = [
    { label: "氏名", val: "瀧脇 笙古（たきわき しょうこ）" },
    { label: "愛称", val: "しょこちゃん" },
    { label: "英語表記", val: "TAKIWAKI SHOKO" },
    { label: "所属グループ", val: "=LOVE（イコールラブ）" },
    { label: "サイリウムカラー", val: "イエロー × オレンジ" },
    { label: "生年月日", val: "2001年7月9日（かに座）" },
    { label: "出身地", val: "神奈川県（横浜市）" },
    { label: "血液型", val: "O型" },
    { label: "身長", val: "158cm" },
    { label: "趣味", val: "料理、ヘアアレンジ、横浜散策、カフェ巡り" },
    { label: "特技", val: "マラソン（東京マラソン3時間57分06秒 サブ4達成）" },
    { label: "メディア出演・活動", val: "フジテレビONE『プロ野球ニュース』木曜MC、サンスポ「BAY☆スタ」特別連載、FILA 26FWスタイリングパートナー、TBS『SASUKE』出場、ハマスタ始球式登板" },
  ];

  const mainAchievements = [
    { title: "東京マラソン2023", detail: "3時間57分06秒 / サブ4達成" },
    { title: "BPM170の君へ", detail: "自身初センター" },
    { title: "木漏れ日メゾフォルテ", detail: "音嶋莉沙ちゃんとのダブルセンター" },
    { title: "フジテレビONE『プロ野球ニュース』", detail: "木曜MC" },
    { title: "サンケイスポーツ特別版「BAY☆スタ」", detail: "「BAYSTARS=LOVE」連載" },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-8 py-2">
      
      {/* 9. パンくず ＆ 余白 */}
      <Breadcrumbs items={[{ label: "PROFILE" }]} />

      {/* 6. タイトル強弱表現 */}
      <div className="border-b-2 border-[#191919] pb-4 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C694D] uppercase">
          <User className="w-4 h-4 text-[#E99A32]" />
          <span>PROFILE & BIOGRAPHY</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-3xl sm:text-4xl font-mono font-extrabold tracking-wider text-[#191919]">
            PROFILE
          </h1>
          <span className="text-xs sm:text-sm font-maru font-bold text-[#8C694D]">
            瀧脇笙古 プロフィール
          </span>
        </div>
      </div>

      {/* 1. 2. 中央配置 ＆ 8:4 カラム */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* メインカラム (720px〜800px) */}
        <div className="lg:col-span-8 space-y-8 text-xs sm:text-sm">
          
          {/* 1. 基本情報 */}
          <div className="border border-[#F0E4CE] p-6 sm:p-8 space-y-6 bg-white rounded-2xl shadow-2xs">
            <div className="space-y-1.5 border-b border-[#F0E4CE] pb-4">
              <h2 className="text-2xl sm:text-3xl font-maru font-extrabold text-[#191919]">
                瀧脇 笙古 <span className="text-xs font-mono font-normal text-[#8C694D]">TAKIWAKI SHOKO</span>
              </h2>
              <p className="text-[#5C4533] font-bold bg-[#FFF4C7] px-3 py-1 inline-block text-xs border border-[#F6C744]/40 rounded-full font-mono">
                ＝LOVE メンバー / 神奈川県横浜市出身
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#191919] border-l-4 border-[#F6C744] pl-2.5 font-maru text-base">
                基本情報（＝LOVE公式サイト出典）
              </h3>
              <table className="w-full border-collapse border border-[#F0E4CE] text-left font-sans">
                <tbody>
                  {profileTable.map((row, idx) => (
                    <tr key={row.label} className={idx % 2 === 0 ? "bg-[#FFF9ED]/60" : "bg-white"}>
                      <th className="py-3 px-4 font-bold text-[#191919] w-1/3 border border-[#F0E4CE] text-xs font-mono">
                        {row.label}
                      </th>
                      <td className="py-3 px-4 text-[#5C4533] border border-[#F0E4CE] text-xs font-bold leading-relaxed">
                        {row.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-right">
              <a
                href="https://equal-love.jp/feature/takiwaki_shoko"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#5C4533] hover:text-[#191919] inline-flex items-center gap-1.5 text-xs font-mono"
              >
                <span>＝LOVE 公式プロフィールを見る ↗</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E99A32]" />
              </a>
            </div>
          </div>

          {/* 2. 主な記録・実績 */}
          <div className="border border-[#F6C744] p-6 sm:p-8 space-y-4 bg-[#FFF9ED]/80 rounded-2xl shadow-2xs">
            <h3 className="font-maru font-extrabold text-base text-[#191919] border-b border-[#F0E4CE] pb-2.5 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#E99A32]" />
              <span>しょこちゃんの主な活動・記録</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {mainAchievements.map((ach) => (
                <div key={ach.title} className="bg-white p-3.5 rounded-xl border border-[#F0E4CE] shadow-2xs space-y-1">
                  <div className="font-bold text-[#191919] text-xs flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#F6C744] shrink-0" />
                    <span>{ach.title}</span>
                  </div>
                  <div className="text-xs text-[#5C4533] font-bold pl-5">
                    {ach.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 経歴・主なトピックス (可読幅 max-w-[680px] / max-w-[640px]) */}
          <div className="border border-[#F0E4CE] p-6 sm:p-8 space-y-5 bg-white rounded-2xl shadow-2xs">
            <h3 className="font-maru font-extrabold text-base text-[#191919] border-b border-[#F0E4CE] pb-2.5">
              経歴・主なトピックス
            </h3>

            <div className="text-[#5C4533] leading-relaxed space-y-5 text-xs sm:text-sm font-sans font-bold max-w-[680px]">
              <div className="space-y-2">
                <h4 className="font-maru font-extrabold text-[#191919] text-sm sm:text-base border-l-4 border-[#F6C744] pl-2.5">
                  横浜・横浜DeNAベイスターズへの深い情熱
                </h4>
                <p className="max-w-[640px]">
                  2017年より＝LOVEのメンバーとして活動する、愛称「しょこちゃん」。神奈川・横浜への愛が強く、横浜DeNAベイスターズのファンとしても知られています。
                </p>
                <p className="max-w-[640px]">
                  横浜スタジアムでのセレモニアルピッチ、サンケイスポーツ特別版「BAY☆スタ」の連載「BAYSTARS=LOVE」、フジテレビONE『プロ野球ニュース』木曜MCなど、アイドルの枠を越えて野球・横浜に関わる活動を広げています。
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <h4 className="font-maru font-extrabold text-[#191919] text-sm sm:text-base border-l-4 border-[#F6C744] pl-2.5">
                  スポーツへのストイックな挑戦
                </h4>
                <p className="max-w-[640px]">
                  スポーツへの挑戦も、しょこちゃんを語るうえで欠かせません。東京マラソン2023では42.195kmを「3時間57分06秒」で完走し、念願のサブ4を達成。TBS『SASUKE』への出場やSASUKEアイドル予選会への挑戦など、持久力と努力を武器に活動の幅を広げています。
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <h4 className="font-maru font-extrabold text-[#191919] text-sm sm:text-base border-l-4 border-[#F6C744] pl-2.5">
                  センター楽曲と＝LOVEでの輝き
                </h4>
                <p className="max-w-[640px]">
                  ＝LOVEでは、2021年に「BPM170の君へ」で自身初のセンターを担当。疾走感のある楽曲と、ランニングを続けてきたしょこちゃん自身の歩みが重なる一曲となりました。
                </p>
                <p className="max-w-[640px]">
                  さらに「木漏れ日メゾフォルテ」では音嶋莉沙ちゃんとのダブルセンターを務めるなど、グループの中でも新たな表情を見せ続けています。
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <h4 className="font-maru font-extrabold text-[#191919] text-sm sm:text-base border-l-4 border-[#F6C744] pl-2.5">
                  料理と自然体で親しみやすい魅力
                </h4>
                <p className="max-w-[640px]">
                  料理も得意分野のひとつです。「クックアイドルNo.1決定戦」への挑戦をはじめ、グルメ企画や料理企画にも数多く出演。一方で「しょこりさ」の街歩きやハンバーガー部などでは、スポーツ時のストイックな姿とはまた違う、自然体で親しみやすい姿を見ることができます。
                </p>
                <p className="font-maru font-extrabold text-[#191919] pt-2 text-sm sm:text-base border-t border-[#F0E4CE]">
                  「アイドル」「ランナー」「野球ファン」「横浜」「料理」。一見するとバラバラに見える好きなことや挑戦を、ひとつずつ長く続けながら自分の強みに変えてきたのが瀧脇笙古さんです。
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* サイドバー (280px〜340px) */}
        <div className="lg:col-span-4 sticky top-24">
          <Sidebar />
        </div>

      </div>
    </div>
  );
}
