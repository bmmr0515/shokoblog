"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 予期せぬエラーのログ（個人情報やシークレットを含めず概要のみ）
    console.error("Application runtime error:", error.digest || error.message);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 text-center space-y-6">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-mono text-2xl font-bold border border-red-200">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          一時的なエラーが発生しました
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          ページの読み込み中に問題が発生しました。時間をおいて再読み込みいただくか、トップページより他のコンテンツをお楽しみください。
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-2xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>もう一度試す</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F6C744] hover:bg-[#E99A32] text-zinc-900 font-bold text-xs sm:text-sm rounded transition-colors shadow-2xs"
        >
          <Home className="w-4 h-4" />
          <span>トップへ戻る</span>
        </Link>
      </div>
    </div>
  );
}
