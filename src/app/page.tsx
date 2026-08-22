import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function HomePage() {
  return <HomeView />;
}
