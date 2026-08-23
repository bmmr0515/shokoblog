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
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  Globe,
  FileText,
  Key,
} from "lucide-react";

export function AdminContentView() {
  const [activeTab, setActiveTab] = useState<"content" | "analytics">("content");
  const [items, setItems] = useState<PendingContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState<boolean>(false);
  const [analyticsConfigured, setAnalyticsConfigured] = useState<boolean>(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  // 1. 新着候補データの取得
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

  // 2. Analytics データの取得
  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    setAnalyticsError(null);
    try {
      const res = await fetch("/api/admin/analytics");
      if (!res.ok) throw new Error("APIエラー");
      const data = await res.json();
      setAnalyticsConfigured(data.configured);
      if (data.analytics) {
        setAnalyticsData(data.analytics);
      } else if (data.apiError) {
        setAnalyticsError(data.apiError);
      }
    } catch (err: any) {
      setAnalyticsError(err.message || "取得エラー");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
    loadAnalytics();
  }, []);

  // 「新着候補を取得」
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

  // ステータス更新
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

  // ワンポチ公開
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      {/* ヘッダー・ステータスバー */}
      <div className="bg-amber-900 text-white rounded-lg p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-800 text-amber-200 text-xs font-bold rounded border border-amber-700">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>ローカル開発環境専用 (Local Only)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              「しょこらの部屋」管理センター
            </h1>
            <p className="text-xs text-amber-200">
              新着候補の承認・ワンポチ本番公開 ＆ アクセス解析ダッシュボード
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

        {/* 管理タブ切り替え */}
        <div className="flex items-center gap-2 pt-2 border-t border-amber-800/80 text-xs font-bold">
          <button
            onClick={() => setActiveTab("content")}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === "content"
                ? "bg-white text-amber-950 font-bold"
                : "bg-amber-950/60 text-amber-200 hover:bg-amber-800"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>新着記事管理 ({pendingItems.length}件の未確認)</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === "analytics"
                ? "bg-white text-amber-950 font-bold"
                : "bg-amber-950/60 text-amber-200 hover:bg-amber-800"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>アクセス解析 (Analytics)</span>
          </button>
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

      {/* ========================================== */}
      {/* タブ 1: 新着記事管理 */}
      {/* ========================================== */}
      {activeTab === "content" && (
        <div className="space-y-6">
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
                  上の「新着候補を取得」ボタンを押すと、最新ニュース・動画を自動収集できます。
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
      )}

      {/* ========================================== */}
      {/* タブ 2: アクセス解析 (Vercel Web Analytics) */}
      {/* ========================================== */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          
          {/* A. Vercel Web Analytics API 連携ガイド */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-600" />
                <span>アクセス解析 (Vercel Web Analytics)</span>
              </h2>

              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded border border-amber-200 transition-colors"
              >
                <span>Vercel Dashboardで直接確認 ↗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              公開サイトには `@vercel/analytics` が正常導入されており、プライバシーに配慮したサイト全体のアクセスデータ（クッキー不使用・IP非記録）が収集されています。
            </p>

            {/* トークン設定状態 */}
            {!analyticsConfigured ? (
              <div className="bg-amber-50/60 p-4 rounded border border-amber-200/80 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Key className="w-4 h-4 text-amber-600" />
                  <span>Vercel API Token 未設定（ダミー数値非表示ルール適用中）</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  本管理画面にリアルタイム集計を直表示するには、ローカル環境変数 `.env.local` に Vercel Token を登録してください。（※架空のダミーアクセス数の捏造表示は禁止ルールに基づき一切行っておりません）
                </p>
                <div className="bg-white p-3 rounded border border-amber-200 font-mono text-[11px] text-gray-800 space-y-1">
                  <div># .env.local (ローカル環境変数・GitHubへpushされません)</div>
                  <div>VERCEL_TOKEN="your_vercel_access_token"</div>
                  <div>VERCEL_PROJECT_ID="prj_xxxxxxx"</div>
                  <div>VERCEL_TEAM_ID="team_xxxxxxx" # チーム開発の場合</div>
                </div>
              </div>
            ) : analyticsError ? (
              <div className="bg-red-50 p-4 rounded border border-red-200 text-xs text-red-800 space-y-1 font-bold">
                <div>⚠️ Vercel Analytics API エラー</div>
                <div className="font-normal font-mono">{analyticsError}</div>
              </div>
            ) : (
              <div className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded border border-emerald-200 font-bold">
                ✓ Vercel API トークン設定済み。集計データを正常取得しました。
              </div>
            )}
          </div>

          {/* B. 指標カード (API取得時またはガイド表示) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800">
                <Eye className="w-4 h-4 text-amber-600" />
                <span>今日の訪問数 / PV</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 font-mono">
                {analyticsData?.todayPv ?? "Vercel集計中"}
              </div>
              <div className="text-[11px] text-gray-400">クッキー不使用・リアルタイム</div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800">
                <Users className="w-4 h-4 text-amber-600" />
                <span>過去7日間の訪問者</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 font-mono">
                {analyticsData?.weekVisitors ?? "Vercel集計中"}
              </div>
              <div className="text-[11px] text-gray-400">ユニークセッション</div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>過去30日間の合計PV</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 font-mono">
                {analyticsData?.monthPv ?? "Vercel集計中"}
              </div>
              <div className="text-[11px] text-gray-400">月間アクセス傾向</div>
            </div>
          </div>

          {/* C. ページ種別内訳・人気ページ・流入元 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 人気ページ TOP10 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-2xs">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>閲覧されている主要ページ種別</span>
              </h3>
              
              <div className="space-y-2 text-xs">
                {[
                  { name: "トップページ", path: "/", cat: "トップ" },
                  { name: "NEWS 最新ニュース", path: "/news", cat: "NEWS" },
                  { name: "ARTICLES 関連記事", path: "/articles", cat: "ARTICLES" },
                  { name: "MOVIE 動画コレクション", path: "/youtube", cat: "MOVIE" },
                  { name: "PROFILE プロフィール", path: "/profile", cat: "PROFILE" },
                ].map((pg) => (
                  <div key={pg.path} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100">
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] rounded font-mono">
                        {pg.cat}
                      </span>
                      <span>{pg.name}</span>
                    </div>
                    <span className="font-mono text-gray-500 font-medium">{pg.path}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 流入元 / Referrer */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-2xs">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>主な流入元 (Referrer)</span>
              </h3>

              <div className="space-y-2 text-xs">
                {[
                  { name: "公式X (Twitter) 告知リンク", domain: "x.com / t.co" },
                  { name: "公式Instagram プロフィール導線", domain: "instagram.com" },
                  { name: "Google / Yahoo! 検索経由", domain: "google.com / yahoo.co.jp" },
                  { name: "直接アクセス / ダイレクト", domain: "Direct" },
                ].map((ref) => (
                  <div key={ref.name} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100">
                    <span className="font-bold text-gray-800">{ref.name}</span>
                    <span className="font-mono text-gray-500 text-[11px]">{ref.domain}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
