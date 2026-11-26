import { Metadata } from "next";
import { QuizView } from "@/components/views/QuizView";

const QUIZ_OGP_IMAGE = "https://shokoblog.vercel.app/images/shokora-quiz-ogp.png";

export const metadata: Metadata = {
  title: "しょこら検定｜瀧脇笙古ファン度をチェック！ - しょこらの部屋",
  description:
    "あなたは笙古ちゃんをどれだけ知ってる？初級・中級・上級の3コースに挑戦！認定ランクを獲得して、結果をXでシェアしよう！",
  openGraph: {
    title: "しょこら検定｜瀧脇笙古ファン度をチェック！",
    description:
      "あなたは笙古ちゃんをどれだけ知ってる？初級・中級・上級の3コースに挑戦！認定ランクを獲得して、結果をXでシェアしよう！",
    url: "https://shokoblog.vercel.app/quiz",
    siteName: "しょこらの部屋",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: QUIZ_OGP_IMAGE,
        width: 1200,
        height: 630,
        alt: "しょこら検定｜瀧脇笙古ファン度をチェック！ - しょこらの部屋",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "しょこら検定｜瀧脇笙古ファン度をチェック！",
    description:
      "あなたは笙古ちゃんをどれだけ知ってる？初級・中級・上級の3コースに挑戦！認定ランクを獲得して、結果をXでシェアしよう！",
    images: [QUIZ_OGP_IMAGE],
  },
};

export default function QuizPage() {
  return <QuizView />;
}
