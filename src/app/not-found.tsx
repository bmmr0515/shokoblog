import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 text-center space-y-6">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-mono text-2xl font-bold border border-amber-200">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          ページが見つかりませんでした。
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          お探しのページは削除されたか、移動された可能性がございます。URLをご確認いただくか、トップページより他のコンテンツをお楽しみください。
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-2xs"
        >
          <Home className="w-4 h-4" />
          <span>しょこらの部屋トップへ戻る</span>
        </Link>
      </div>
    </div>
  );
}
