import React from "react";
import { LinkItem } from "@/types/blog";
import { ArticleCard } from "./ArticleCard";
import { AdBanner } from "./AdBanner";

interface ArticleListWithAdsProps {
  items: LinkItem[];
  adInterval?: number;
}

export const ArticleListWithAds: React.FC<ArticleListWithAdsProps> = ({
  items,
  adInterval = 4,
}) => {
  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const showAd = index > 0 && index % adInterval === 0;

        return (
          <React.Fragment key={item.id}>
            {showAd && <AdBanner type="listMiddleAd" />}
            <ArticleCard item={item} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
