import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

/**
 * サーバーサイドコンポーネント (Page) 用のローカル専用ガード
 * Vercel 本番環境やプロダクションビルド実行時には 404 Not Found を返す
 */
export function guardLocalOnlyPage() {
  const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_URL;
  const isProduction = process.env.NODE_ENV === "production";
  const isDev = process.env.NODE_ENV === "development";

  // 本番環境、Vercel環境、または非開発環境では完全遮断
  if (isVercel || isProduction || !isDev) {
    notFound();
  }
}

/**
 * API Route 用のローカル専用ガード（多層防御）
 * - 開発環境 (NODE_ENV === 'development') かつ Vercel 以外の環境のみ許可
 * - リクエストが与えられた場合は Host ヘッダーがローカルホストであることを検証
 */
export function isLocalEnvironment(req?: Request | NextRequest): boolean {
  const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_URL;
  const isProduction = process.env.NODE_ENV === "production";
  const isDev = process.env.NODE_ENV === "development";

  if (isVercel || isProduction || !isDev) {
    return false;
  }

  // リクエストが与えられた場合、Host ヘッダーが localhost / 127.0.0.1 であることを検証
  if (req) {
    const host = req.headers.get("host") || "";
    const hostname = host.split(":")[0];
    const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
    if (!isLocalHost) {
      return false;
    }
  }

  return true;
}

/**
 * 404 Not Found レスポンス
 * 攻撃者に内部実装（ローカル専用APIの存在）を漏洩させないため汎用的な Not Found を返却
 */
export function createLocalOnlyApiResponse() {
  return NextResponse.json(
    { error: "Not Found" },
    { status: 404 }
  );
}
