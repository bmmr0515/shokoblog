"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sidebar } from "@/components/Sidebar";
import { getLinkItems } from "@/lib/store";
import { LinkItem } from "@/types/blog";
import { ExternalLink, Award, Trophy } from "lucide-react";

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
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "PROFILE" }]} />

      <div className="border-b-2 border-amber-500 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <span>PROFILE</span>
          <span className="text-sm font-normal text-gray-500">瀧脇笙古 プロフィール</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 text-xs sm:text-sm">
          
          {/* 1. 基本情報 */}
          <div className="border border-gray-200 p-5 sm:p-6 space-y-5 bg-white rounded-lg">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900">
                瀧脇 笙古 <span className="text-xs font-normal text-gray-500">TAKIWAKI SHOKO</span>
              </h2>
              <p className="text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 inline-block text-xs border border-amber-200 rounded">
                ＝LOVE メンバー / 神奈川県横浜市出身
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 border-l-4 border-amber-500 pl-2">
                基本情報（＝LOVE公式サイト出典）
              </h3>
              <table className="w-full border-collapse border border-gray-200 text-left">
                <tbody>
                  {profileTable.map((row, idx) => (
                    <tr key={row.label} className={idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                      <th className="py-2.5 px-3 font-bold text-gray-900 w-1/3 border border-gray-200 text-xs">
                        {row.label}
                      </th>
                      <td className="py-2.5 px-3 text-gray-700 border border-gray-200 text-xs">
                        {row.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-1 text-right">
              <a
                href="https://equal-love.jp/feature/takiwaki_shoko"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-orange-600 hover:underline inline-flex items-center gap-1 text-xs"
              >
                <span>＝LOVE 公式プロフィールを見る</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. 主な記録・実績 */}
          <div className="border border-amber-200 p-5 sm:p-6 space-y-4 bg-amber-50/20 rounded-lg">
            <h3 className="font-bold text-base text-gray-900 border-b border-amber-300 pb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>しょこちゃんの主な活動・記録</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mainAchievements.map((ach) => (
                <div key={ach.title} className="bg-white p-3 rounded border border-amber-200/80 shadow-2xs space-y-1">
                  <div className="font-bold text-gray-900 text-xs flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{ach.title}</span>
                  </div>
                  <div className="text-xs text-amber-900 font-medium pl-4">
                    {ach.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 経歴・主なトピックス */}
          <div className="border border-gray-200 p-5 sm:p-6 space-y-4 bg-white rounded-lg">
            <h3 className="font-bold text-base text-gray-900 border-b border-amber-500 pb-2">
              経歴・主なトピックス
            </h3>

            <div className="text-gray-700 leading-relaxed space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm border-l-3 border-amber-500 pl-2">
                  横浜・横浜DeNAベイスターズへの深い情熱
                </h4>
                <p>
                  2017年より＝LOVEのメンバーとして活動する、愛称「しょこちゃん」。神奈川・横浜への愛が強く、横浜DeNAベイスターズのファンとしても知られています。
                </p>
                <p>
                  横浜スタジアムでのセレモニアルピッチ、サンケイスポーツ特別版「BAY☆スタ」の連載「BAYSTARS=LOVE」、フジテレビONE『プロ野球ニュース』木曜MCなど、アイドルの枠を越えて野球・横浜に関わる活動を広げています。
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm border-l-3 border-amber-500 pl-2">
                  スポーツへのストイックな挑戦
                </h4>
                <p>
                  スポーツへの挑戦も、しょこちゃんを語るうえで欠かせません。東京マラソン2023では42.195kmを「3時間57分06秒」で完走し、念願のサブ4を達成。TBS『SASUKE』への出場やSASUKEアイドル予選会への挑戦など、持久力と努力を武器に活動の幅を広げています。
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm border-l-3 border-amber-500 pl-2">
                  センター楽曲と＝LOVEでの輝き
                </h4>
                <p>
                  ＝LOVEでは、2021年に「BPM170の君へ」で自身初のセンターを担当。疾走感のある楽曲と、ランニングを続けてきたしょこちゃん自身の歩みが重なる一曲となりました。
                </p>
                <p>
                  さらに「木漏れ日メゾフォルテ」では音嶋莉沙ちゃんとのダブルセンターを務めるなど、グループの中でも新たな表情を見せ続けています。
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm border-l-3 border-amber-500 pl-2">
                  料理・マルチな才能と多様な魅力
                </h4>
                <p>
                  料理も得意分野のひとつです。「クックアイドルNo.1決定戦」への挑戦をはじめ、グルメ企画や料理企画にも数多く出演。一方で「しょこりさ」の街歩きやハンバーガー部などでは、スポーツ時のストイックな姿とはまた違う、自然体で親しみやすい姿を見ることができます。
                </p>
                <p className="font-bold text-gray-900 pt-1">
                  「アイドル」「ランナー」「野球ファン」「横浜」「料理」。一見するとバラバラに見える活動を、ひとつずつ自分の強みに変えてきたのが瀧脇笙古さんです。
                </p>
              </div>
            </div>
          </div>

        </div>

        <div>
          <Sidebar items={items} />
        </div>
      </div>
    </div>
  );
}
