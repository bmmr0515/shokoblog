import { Metadata } from "next";
import { QuizView } from "@/components/views/QuizView";
import { getBaseUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "しょこら検定 | 瀧脇笙古ファン度診断クイズ - しょこらの部屋",
  description:
    "＝LOVE（イコールラブ）瀧脇笙古さんの非公式ファン検定クイズ「しょこら検定」！プロフィール、ベイスターズ愛、マラソン、料理、楽曲の軌跡など初級・中級・上級の全92問からランダムに10問出題。1080×1080pxの認定証画像保存やXシェアも対応！",
  openGraph: {
    title: "しょこら検定 | 瀧脇笙古ファン度診断クイズ",
    description:
      "＝LOVE 瀧脇笙古さんの非公式ファン検定クイズ「しょこら検定」！あなたのしょこら愛は何点？全問正解で「しょこら神」を目指そう！",
    url: `${getBaseUrl()}/quiz`,
    siteName: "しょこらの部屋",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${getBaseUrl()}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: "しょこら検定 - しょこらの部屋",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "しょこら検定 | 瀧脇笙古ファン度診断クイズ",
    description:
      "全問4択・10問チャレンジ！瀧脇笙古ちゃんのファン度を診断して認定証画像をGETしよう！",
    images: [`${getBaseUrl()}/images/logo.png`],
  },
};

export default function QuizPage() {
  return <QuizView />;
}
