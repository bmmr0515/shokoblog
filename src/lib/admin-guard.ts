import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

/**
 * サーバーサイドコンポーネント (Page) 用のローカル専用ガード
 * Vercel 本番環境やプロダクションビルド実行時には 404 Not Found を返す
 */
export function guardLocalOnlyPage() {
  const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_URL;
  const isProduction = process.env.NODE_ENV === "production";

  if (isVercel || isProduction) {
    notFound();
  }
}

/**
 * API Route 用のローカル専用ガード
 */
export function isLocalEnvironment(): boolean {
  const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_URL;
  const isProduction = process.env.NODE_ENV === "production";
  return !isVercel && !isProduction;
}

export function createLocalOnlyApiResponse() {
  return NextResponse.json(
    { error: "404 Not Found (Management API is available only on local environment)" },
    { status: 404 }
  );
}
