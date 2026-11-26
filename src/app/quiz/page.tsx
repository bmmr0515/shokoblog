import { Metadata } from "next";
import { QuizView } from "@/components/views/QuizView";

const QUIZ_OGP_IMAGE = "https://shokoblog.vercel.app/images/quiz-ogp.jpg";

export const metadata: Metadata = {
  title: "しょこら検定 | 瀧脇笙古ファン度診断クイズ - しょこらの部屋",
  description:
    "＝LOVE（イコールラブ）瀧脇笙古さんの非公式ファン検定クイズ「しょこら検定」！あなたは笙古ちゃんをどれだけ知ってる？初級・中級・上級の3コースでファン度を診断！認定証画像保存やXシェアも対応！",
  openGraph: {
    title: "しょこら検定 | 瀧脇笙古ファン度診断クイズ - しょこらの部屋",
    description:
      "あなたは笙古ちゃんをどれだけ知ってる？初級・中級・上級の3コースでファン度を診断！全問正解で「しょこら神」を目指そう！",
    url: "https://shokoblog.vercel.app/quiz",
    siteName: "しょこらの部屋",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: QUIZ_OGP_IMAGE,
        width: 1200,
        height: 630,
        alt: "しょこら検定｜あなたは笙古ちゃんをどれだけ知ってる？ - しょこらの部屋",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "しょこら検定 | 瀧脇笙古ファン度診断クイズ",
    description:
      "あなたは笙古ちゃんをどれだけ知ってる？初級・中級・上級の3コースで瀧脇笙古ちゃんファン度を診断！認定ランクをGETしてシェアしよう✨",
    images: [QUIZ_OGP_IMAGE],
  },
};

export default function QuizPage() {
  return <QuizView />;
}
