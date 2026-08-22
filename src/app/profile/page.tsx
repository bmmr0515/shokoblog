import type { Metadata } from "next";
import { ProfileView } from "@/components/views/ProfileView";

export const metadata: Metadata = {
  title: "しょこらの部屋｜瀧脇笙古さん プロフィール",
  description: "＝LOVE 瀧脇笙古（しょこちゃん）のプロフィール・主な活動記録です。",
  openGraph: {
    title: "しょこらの部屋｜瀧脇笙古さん プロフィール",
    description: "＝LOVE 瀧脇笙古（しょこちゃん）のプロフィール・主な活動記録です。",
  },
};

export default function ProfilePage() {
  return <ProfileView />;
}
