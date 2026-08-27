"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Sidebar } from "@/components/Sidebar";
import { getLinkItems } from "@/lib/store";
import { LinkItem } from "@/types/blog";
import { ExternalLink, Award, Trophy, User, Heart, Sparkles, Flame, Users } from "lucide-react";

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
    { title: "クックアイドルNo.1決定戦", detail: "優勝 / 本人考案レシピ公開" },
    { title: "東京マラソン2023", detail: "3時間57分06秒 / サブ4達成" },
    { title: "BPM170の君へ", detail: "自身初センターを担当" },
    { title: "木漏れ日メゾフォルテ", detail: "音嶋莉沙ちゃんとのダブルセンター" },
    { title: "フジテレビONE『プロ野球ニュース』", detail: "木曜MC" },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-8 py-2">
      
      {/* パンくず ＆ 余白 */}
      <Breadcrumbs items={[{ label: "PROFILE" }]} />

      {/* タイトル強弱表現 */}
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
            瀧脇笙古 プロフィール ＆ 魅力紹介
          </span>
        </div>
      </div>

      {/* 2カラム構成 */}
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

          {/* 2. 4テーマ魅力特集 (EFFORT / GROWTH / FAN / CHALLENGE) */}
          <div className="border border-[#F0E4CE] p-6 sm:p-8 space-y-6 bg-white rounded-2xl shadow-2xs">
            <div className="border-b border-[#F0E4CE] pb-3 space-y-1">
              <div className="text-[10px] font-mono font-bold text-[#E99A32] uppercase">
                ESSENCE & CHARM OF SHOKO
              </div>
              <h3 className="font-maru font-extrabold text-lg sm:text-xl text-[#191919]">
                瀧脇笙古ちゃんの魅力 4つのストーリー
              </h3>
            </div>

            <div className="space-y-6 font-sans">
              
              {/* Theme 1: EFFORT / 努力 */}
              <div className="p-4 sm:p-5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="p-1 bg-[#F6C744] text-[#191919] rounded font-bold text-[10px]">
                    01
                  </span>
                  <span className="font-bold text-[#E99A32] text-xs uppercase">EFFORT // 努力と研鑽</span>
                </div>
                <h4 className="font-maru font-extrabold text-base text-[#191919]">
                  未経験から積み重ねたパフォーマンス
                </h4>
                <p className="text-xs text-[#5C4533] font-bold leading-relaxed max-w-[640px]">
                  ＝LOVE加入時はダンス未経験。そこから日々のレッスンと努力を積み重ね、現在ではダンスパートや重要な歌割りを任される場面も増えています。最初から完成されたアイドルではなく、地道な努力で成長してきた姿勢が大きな魅力です。
                </p>
              </div>

              {/* Theme 2: GROWTH / 成長と結果 */}
              <div className="p-4 sm:p-5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="p-1 bg-[#F6C744] text-[#191919] rounded font-bold text-[10px]">
                    02
                  </span>
                  <span className="font-bold text-[#E99A32] text-xs uppercase">GROWTH // 好きなことを結果に</span>
                </div>
                <h4 className="font-maru font-extrabold text-base text-[#191919]">
                  クックアイドル優勝 ＆ マラソン サブ4達成
                </h4>
                <p className="text-xs text-[#5C4533] font-bold leading-relaxed max-w-[640px]">
                  料理では「クックアイドルNo.1決定戦」で<span className="text-[#191919] bg-[#FFF4C7] px-1 rounded">優勝</span>し、本人考案レシピを公開。マラソンでは「東京マラソン2023」でサブ4（3時間57分06秒）を達成。さらにステージでは「BPM170の君へ」で自身初センター、「木漏れ日メゾフォルテ」ではダブルセンターを担当し、好きなこと・特技を確かな結果へと結びつけてきました。
                </p>
              </div>

              {/* Theme 3: FAN / ファンとの絆 */}
              <div className="p-4 sm:p-5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="p-1 bg-[#F6C744] text-[#191919] rounded font-bold text-[10px]">
                    03
                  </span>
                  <span className="font-bold text-[#E99A32] text-xs uppercase">FAN // ファンとの距離感と歩み</span>
                </div>
                <h4 className="font-maru font-extrabold text-base text-[#191919]">
                  一緒に成長を感じられる時間
                </h4>
                <p className="text-xs text-[#5C4533] font-bold leading-relaxed max-w-[640px]">
                  SHOWROOMなどを通して継続的に自分の言葉で発信を続け、ファンからは記憶力の良さや、一人ひとりとの交流を大切にする姿勢も魅力として語られています。「応援しているうちに、成長を一緒に感じられる」という時間そのものが、瀧脇笙古ちゃんを応援する楽しさの大きなひとつです。
                </p>
              </div>

              {/* Theme 4: CHALLENGE / 挑戦と愛 */}
              <div className="p-4 sm:p-5 bg-[#FFF9ED] border border-[#F0E4CE] rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="p-1 bg-[#F6C744] text-[#191919] rounded font-bold text-[10px]">
                    04
                  </span>
                  <span className="font-bold text-[#E99A32] text-xs uppercase">CHALLENGE // 横浜・ベイスターズ・挑戦</span>
                </div>
                <h4 className="font-maru font-extrabold text-base text-[#191919]">
                  個性を強みに変えていく力
                </h4>
                <p className="text-xs text-[#5C4533] font-bold leading-relaxed max-w-[640px]">
                  横浜DeNAベイスターズへの愛、横浜散策、SASUKEへの挑戦など、一見するとバラバラに見える好きなことや情熱を、一つずつ長く続けながら自分の確かな強みに変えてきたのが瀧脇笙古さんです。
                </p>
              </div>

            </div>
          </div>

          {/* 3. 主な記録・実績 */}
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

        </div>

        {/* サイドバー (280px〜340px) */}
        <div className="lg:col-span-4 sticky top-24">
          <Sidebar />
        </div>

      </div>
    </div>
  );
}
