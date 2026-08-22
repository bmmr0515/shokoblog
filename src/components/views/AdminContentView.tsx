"use client";

import React, { useEffect, useState } from "react";
import { PendingContentItem } from "@/types/blog";
import {
  RefreshCw,
  UploadCloud,
  CheckCircle,
  XCircle,
  ExternalLink,
  ShieldAlert,
  Loader2,
  Clock,
  Sparkles,
} from "lucide-react";

export function AdminContentView() {
  const [items, setItems] = useState<PendingContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 1. 候補データ一覧の取得
  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      if (!res.ok) throw new Error("APIレスポンスエラー");
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // 2. 「新着候補を取得」
  const handleFetchCandidates = async () => {
    setFetching(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetch" }),
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
        setMessage({ type: "success", text: "新着候補の自動取得が完了しました！" });
      } else {
        setMessage({ type: "error", text: data.error || "取得に失敗しました。" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: `取得中にエラーが発生しました: ${err.message}` });
    } finally {
      setFetching(false);
    }
  };

  // 3. 個別ステータス更新 (approved / rejected / pending)
  const handleUpdateStatus = async (itemId: string, status: "approved" | "rejected" | "pending") => {
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-status", itemId, status }),
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // 4. 「公開する (ワンポチ公開)」
  const handlePublish = async () => {
    const approvedCount = items.filter((i) => i.status === "approved").length;
    if (approvedCount === 0) {
      setMessage({
        type: "error",
        text: "承認済み (approved) の新着候補がありません。リスト内の候補で「承認」ボタンを押してから公開を実行してください。",
      });
      return;
    }

    if (!confirm(`承認済みの ${approvedCount}件 の候補を本番データに反映し、GitHub へ push しますか？`)) {
      return;
    }

    setPublishing(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/content/publish", {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: "🎉 GitHubへのpushが完了しました。Vercelの自動デプロイが開始されます。",
        });
        loadContent();
      } else {
        setMessage({
          type: "error",
          text: data.error || "公開処理に失敗しました。",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: `公開中に通信エラーが発生しました: ${err.message}`,
      });
    } finally {
      setPublishing(false);
    }
  };

  const pendingItems = items.filter((i) => i.status === "pending");
  const approvedItems = items.filter((i) => i.status === "approved");
  const rejectedItems = items.filter((i) => i.status === "rejected");

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      {/* ヘッダー・ステータスバー */}
      <div className="bg-amber-900 text-white rounded-lg p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-800 text-amber-200 text-xs font-bold rounded border border-amber-700">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>ローカル開発環境専用 (Local Only)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              「しょこらの部屋」新着記事 管理センター
            </h1>
            <p className="text-xs text-amber-200">
              本画面および管理APIは本番環境 (Vercel) からは自動遮断 (404) されています。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleFetchCandidates}
              disabled={fetching || publishing}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm rounded transition-colors disabled:opacity-50"
            >
              {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>新着候補を取得</span>
            </button>

            <button
              onClick={handlePublish}
              disabled={fetching || publishing || approvedItems.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-md disabled:opacity-50"
            >
              {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              <span>公開する (Git Push)</span>
            </button>
          </div>
        </div>
      </div>

      {/* アラートメッセージ */}
      {message && (
        <div
          className={`p-4 rounded-lg border text-xs sm:text-sm font-bold flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-red-50 text-red-800 border-red-300"
          }`}
        >
          {message.type === "success" ? (
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* サマリーカウンター */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-3 sm:p-4 rounded-lg border border-amber-200 shadow-2xs">
          <div className="text-xs font-bold text-amber-800">未確認候補</div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-900 font-mono mt-1">
            {pendingItems.length}件
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-emerald-200 shadow-2xs">
          <div className="text-xs font-bold text-emerald-800">承認済み (本番反映対象)</div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-900 font-mono mt-1">
            {approvedItems.length}件
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-2xs">
          <div className="text-xs font-bold text-gray-600">却下済み</div>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-700 font-mono mt-1">
            {rejectedItems.length}件
          </div>
        </div>
      </div>

      {/* メインリスト */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>検出候補リスト</span>
          </h2>
          <span className="text-xs text-gray-500 font-medium">全{items.length}件の候補</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-500" />
            <p className="text-xs font-bold">候補データを読み込み中...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-500 space-y-2">
            <p className="text-sm font-bold text-gray-700">新着候補は現在ありません。</p>
            <p className="text-xs text-gray-400">
              右上の「新着候補を取得」ボタンを押すと、最新ニュース・動画を自動収集できます。
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="py-4 space-y-2.5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {item.date}
                      </span>
                      <span className="px-2 py-0.5 font-bold rounded bg-gray-100 text-gray-700 border border-gray-200">
                        {item.contentType}
                      </span>
                      <span className="px-2 py-0.5 font-bold rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {item.categoryCandidate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* ステータス切替ボタン */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleUpdateStatus(item.id, "approved")}
                      className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-colors ${
                        item.status === "approved"
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-300"
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>承認</span>
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(item.id, "rejected")}
                      className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-colors ${
                        item.status === "rejected"
                          ? "bg-red-600 text-white shadow-2xs"
                          : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700 border border-gray-300"
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>却下</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-2.5 rounded border border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-gray-800">提供: {item.source}</span>
                    <a
                      href={item.sourceURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline font-bold inline-flex items-center gap-0.5"
                    >
                      <span>元URLを確認 ↗</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  {item.descriptionCandidate && (
                    <p className="text-gray-500 leading-relaxed">{item.descriptionCandidate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
