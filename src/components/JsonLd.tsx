import React from "react";
import { LinkItem } from "@/types/blog";
import { getBaseUrl } from "@/lib/site";

interface JsonLdProps {
  item: LinkItem;
}

export const JsonLd: React.FC<JsonLdProps> = ({ item }) => {
  const baseUrl = getBaseUrl();
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": item.title,
    "image": [item.thumbnailURL],
    "datePublished": item.publishedDate,
    "author": {
      "@type": "Organization",
      "name": item.sourceName,
      "url": item.sourceURL
    },
    "publisher": {
      "@type": "Organization",
      "name": "しょこらの部屋 (=LOVE 瀧脇笙古ファンサイト)",
      "url": baseUrl
    },
    "description": item.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": item.sourceURL
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
};
