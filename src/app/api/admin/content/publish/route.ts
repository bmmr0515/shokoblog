import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { isLocalEnvironment, createLocalOnlyApiResponse } from "@/lib/admin-guard";
import { PendingContentItem, LinkItem } from "@/types/blog";
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "@/lib/youtube";

const PENDING_FILE_PATH = path.resolve(process.cwd(), "src/data/pending-content.json");
const MOCK_DATA_PATH = path.resolve(process.cwd(), "src/data/mockData.ts");

export async function POST() {
  if (!isLocalEnvironment()) {
    return createLocalOnlyApiResponse();
  }

  let step = "初期化";

  try {
    // Step 1: 承認済み候補の取得
    step = "承認済み候補の読み込み";
    if (!fs.existsSync(PENDING_FILE_PATH)) {
      return NextResponse.json({ success: false, error: "pending-content.json が存在しません。" }, { status: 400 });
    }

    const pendingItems: PendingContentItem[] = JSON.parse(fs.readFileSync(PENDING_FILE_PATH, "utf-8"));
    const approvedItems = pendingItems.filter((i) => i.status === "approved");

    if (approvedItems.length === 0) {
      return NextResponse.json({
        success: false,
        error: "承認済み (approved) の新着候補がありません。「承認」ボタンを押してから「公開する」を実行してください。",
      }, { status: 400 });
    }

    // Step 2: mockData.ts への追加書き込み
    step = "本番データ (mockData.ts) への反映";
    let mockContent = fs.readFileSync(MOCK_DATA_PATH, "utf-8");

    const newLinkItems: LinkItem[] = approvedItems.map((app) => {
      const pubDate = app.date;
      const year = parseInt(pubDate.split("-")[0], 10) || new Date().getFullYear();
      const videoId = app.videoId || extractYouTubeVideoId(app.sourceURL);

      return {
        id: `link-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: app.title,
        sourceName: app.source,
        channelName: app.contentType === "youtube" ? app.source : undefined,
        sourceURL: app.sourceURL,
        publishedDate: pubDate,
        year,
        category: app.categoryCandidate,
        tags: ["瀧脇笙古", "=LOVE", app.categoryCandidate],
        description: app.descriptionCandidate,
        thumbnailURL: app.thumbnailURL || (videoId ? getYouTubeThumbnailUrl(videoId) : "/images/logo.png"),
        contentType: app.contentType,
        youtubeURL: app.youtubeURL || (app.contentType === "youtube" ? app.sourceURL : null),
        videoId: videoId || undefined,
        verified: true,
        lastCheckedAt: new Date().toISOString(),
        isFeatured: false,
        isHighlight: false,
      };
    });

    const linkItemMarker = "export const INITIAL_LINK_ITEMS: LinkItem[] = [";
    const jsonItemsStr = JSON.stringify(newLinkItems, null, 2).slice(1, -1).trim();

    if (!mockContent.includes(linkItemMarker)) {
      throw new Error("mockData.ts 内の INITIAL_LINK_ITEMS マーカーが見つかりません。");
    }

    mockContent = mockContent.replace(linkItemMarker, `${linkItemMarker}\n  ${jsonItemsStr},`);
    fs.writeFileSync(MOCK_DATA_PATH, mockContent, "utf-8");

    // 承認された候補を pending リストから除外（または status を保持）
    const remainingPendingItems = pendingItems.filter((i) => i.status !== "approved");
    fs.writeFileSync(PENDING_FILE_PATH, JSON.stringify(remainingPendingItems, null, 2), "utf-8");

    // Step 3: Git Add
    step = "Git Add (git add .)";
    execSync("git add .", { cwd: process.cwd(), encoding: "utf-8" });

    // Step 4: Git Commit
    step = "Git Commit (git commit)";
    const commitMsg = `feat(content): publish ${approvedItems.length} approved article(s)`;
    try {
      execSync(`git commit -m "${commitMsg}"`, { cwd: process.cwd(), encoding: "utf-8" });
    } catch (e: any) {
      // 変更がなければコミットエラーを無視して進む
      console.log("Git commit 変更なし");
    }

    // Step 5: Git Push
    step = "Git Push (git push origin main)";
    execSync("git push origin main", { cwd: process.cwd(), encoding: "utf-8" });

    return NextResponse.json({
      success: true,
      publishedCount: approvedItems.length,
      message: "GitHubへのpushが完了しました。Vercelの自動デプロイが開始されます。",
    });

  } catch (err: any) {
    console.error(`❌ ワンポチ公開エラー [フェーズ: ${step}]:`, err);
    return NextResponse.json({
      success: false,
      step,
      error: `フェーズ「${step}」で失敗しました: ${err.message || err}`,
    }, { status: 500 });
  }
}
