import React from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { UserCheck } from "lucide-react";

export default function OperatorPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumbs items={[{ label: "運営者情報" }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-shoko-beige-border shadow-card space-y-6">
        <div className="space-y-2 border-b border-shoko-beige-border pb-4">
          <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold">
            <UserCheck className="w-4 h-4" />
            <span>Operator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-shoko-text-main">
            運営者情報
          </h1>
        </div>

        <div className="overflow-hidden rounded-2xl border border-shoko-beige-border">
          <table className="w-full text-xs sm:text-sm text-left">
            <tbody>
              <tr className="bg-shoko-beige/40">
                <th className="py-3 px-4 font-bold text-shoko-text-main w-1/3 border-b border-shoko-beige-border">
                  サイト名
                </th>
                <td className="py-3 px-4 text-shoko-text-sub border-b border-shoko-beige-border">
                  しょこらの部屋 （=LOVE 瀧脇笙古さん非公式ファンサイト）
                </td>
              </tr>
              <tr className="bg-white">
                <th className="py-3 px-4 font-bold text-shoko-text-main border-b border-shoko-beige-border">
                  サイトURL
                </th>
                <td className="py-3 px-4 text-shoko-text-sub border-b border-shoko-beige-border">
                  https://shokoblog.example.com/
                </td>
              </tr>
              <tr className="bg-shoko-beige/40">
                <th className="py-3 px-4 font-bold text-shoko-text-main border-b border-shoko-beige-border">
                  管理人
                </th>
                <td className="py-3 px-4 text-shoko-text-sub border-b border-shoko-beige-border">
                  しょこらの部屋 運営事務局（一個人ファン）
                </td>
              </tr>
              <tr className="bg-white">
                <th className="py-3 px-4 font-bold text-shoko-text-main border-b border-shoko-beige-border">
                  お問い合わせ
                </th>
                <td className="py-3 px-4 text-shoko-text-sub border-b border-shoko-beige-border">
                  <a href="/contact" className="text-shoko-orange hover:underline font-semibold">
                    お問い合わせフォームはこちら
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
