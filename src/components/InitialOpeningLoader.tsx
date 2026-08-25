"use client";

import React, { useEffect, useState } from "react";

export const InitialOpeningLoader: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion チェック
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowLoader(false);
      return;
    }

    // 同一セッションでの連続表示を回避するためのチェック
    const hasSeenOp = sessionStorage.getItem("hasSeenShokoraOp");
    if (hasSeenOp) {
      setShowLoader(false);
      return;
    }

    // 0.65秒後にフェードアウト開始 ➔ 0.95秒後に完全非表示
    const timer1 = setTimeout(() => {
      setIsFadingOut(true);
    }, 650);

    const timer2 = setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem("hasSeenShokoraOp", "true");
    }, 950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!showLoader) return null;

  return (
    <div
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: "opacity 300ms ease-out",
      }}
      className="fixed inset-0 z-9999 bg-[#191919] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="text-center space-y-2.5">
        <div className="text-[10px] sm:text-xs tracking-widest text-[#F6C744] font-bold uppercase font-sans">
          瀧脇笙古 非公式ファンサイト
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-maru font-extrabold text-white tracking-tight">
          しょこらの部屋
        </h1>
      </div>
    </div>
  );
};
