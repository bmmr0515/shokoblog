"use client";

import React, { useState } from "react";
import { LinkItem } from "@/types/blog";
import { ExternalLink, X, RefreshCw } from "lucide-react";

interface DiscoverRandomModalProps {
  items: LinkItem[];
}

export const DiscoverRandomModal: React.FC<DiscoverRandomModalProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<LinkItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlePickRandom = () => {
    if (items.length === 0) return;
    const randomIndex = Math.floor(Math.random() * items.length);
    setSelectedItem(items[randomIndex]);
    setIsOpen(true);
  };

  const targetUrl = selectedItem?.youtubeURL || selectedItem?.sourceURL;
  const isValidUrl =
    targetUrl &&
    targetUrl.trim() !== "" &&
    targetUrl !== "#" &&
    !targetUrl.startsWith("javascript:") &&
    (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"));

  return (
    <>
      <button
        onClick={handlePickRandom}
        className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs sm:text-sm transition-colors border-l-4 border-amber-500 flex items-center justify-between"
      >
        <span>過去のコンテンツ・記録を発掘する（ランダム表示）</span>
        <span className="text-amber-400 font-normal text-xs">クリックで発見 →</span>
      </button>

      {isOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white max-w-lg w-full p-6 space-y-4 border-2 border-amber-500 relative text-xs">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 border border-amber-200 inline-block">
                {selectedItem.year}年 ({selectedItem.category})
              </span>
              <h3 className="text-base font-bold text-gray-900 pt-1">
                {selectedItem.title}
              </h3>
            </div>

            <div className="text-gray-600 leading-relaxed bg-gray-50 p-3 border border-gray-200">
              <p className="font-bold text-gray-800 pb-1">
                媒体: {selectedItem.sourceName} ({selectedItem.publishedDate})
              </p>
              <p>{selectedItem.description}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handlePickRandom}
                className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold border border-gray-300 flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                <span>別の項目を見る</span>
              </button>

              {isValidUrl ? (
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white font-bold flex items-center justify-center gap-1 text-center"
                >
                  <span>元のページへ ↗</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="flex-1 py-2 px-3 bg-gray-100 text-gray-500 font-bold border border-gray-300 text-center flex items-center justify-center">
                  (掲載・活動記録)
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
