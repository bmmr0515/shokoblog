import { NextRequest, NextResponse } from "next/server";
import { isLocalEnvironment, createLocalOnlyApiResponse } from "@/lib/admin-guard";
import axios from "axios";

export async function GET(req: NextRequest) {
  // 本番環境遮断ガード
  if (!isLocalEnvironment()) {
    return createLocalOnlyApiResponse();
  }

  const vercelToken = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!vercelToken || !projectId) {
    return NextResponse.json({
      success: true,
      configured: false,
      message: "Vercel API Token または Project ID が .env.local に設定されていません。",
      analytics: null,
    });
  }

  try {
    // Vercel Web Analytics Stats API
    // (例: GET https://api.vercel.com/v5/analytics/stats)
    const teamParam = teamId ? `&teamId=${teamId}` : "";
    const url = `https://api.vercel.com/v5/analytics/stats?projectId=${projectId}${teamParam}`;

    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
      timeout: 10000,
    });

    return NextResponse.json({
      success: true,
      configured: true,
      analytics: resp.data,
    });
  } catch (err: any) {
    console.warn("Vercel Analytics API 取得エラー:", err.response?.data || err.message);

    return NextResponse.json({
      success: true,
      configured: true,
      apiError: err.response?.data?.error?.message || err.message,
      analytics: null,
    });
  }
}
