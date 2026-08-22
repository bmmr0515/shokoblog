import type { Metadata } from "next";
import { CategoryView } from "@/components/views/CategoryView";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const decodedCategory = decodeURIComponent(params.category);
  return {
    title: `しょこらの部屋｜瀧脇笙古さん ${decodedCategory}記事一覧`,
    description: `瀧脇笙古さんに関する「${decodedCategory}」カテゴリのニュース・メディア記事・コンテンツ一覧です。`,
    openGraph: {
      title: `しょこらの部屋｜瀧脇笙古さん ${decodedCategory}記事一覧`,
      description: `瀧脇笙古さんに関する「${decodedCategory}」カテゴリのニュース・メディア記事・コンテンツ一覧です。`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryView rawCategory={params.category} />;
}
