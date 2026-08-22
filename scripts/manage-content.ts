import fs from "fs";
import path from "path";
import { PendingContentItem, LinkItem } from "../src/types/blog";
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "../src/lib/youtube";

const PENDING_FILE_PATH = path.resolve(process.cwd(), "src/data/pending-content.json");
const MOCK_DATA_PATH = path.resolve(process.cwd(), "src/data/mockData.ts");

function loadPendingList(): PendingContentItem[] {
  if (!fs.existsSync(PENDING_FILE_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(PENDING_FILE_PATH, "utf-8")) as PendingContentItem[];
  } catch (err) {
    return [];
  }
}

function savePendingList(items: PendingContentItem[]) {
  fs.writeFileSync(PENDING_FILE_PATH, JSON.stringify(items, null, 2), "utf-8");
}

// 1. content:check - 候補リスト確認
function checkPendingContent() {
  const items = loadPendingList();
  const pending = items.filter((i) => i.status === "pending");

  console.log("==========================================");
  console.log(`📋 「しょこらの部屋」未承認新着候補一覧 (${pending.length}件)`);
  console.log("==========================================");

  if (pending.length === 0) {
    console.log("🎉 現在、確認待ちの未承認候補はありません。");
    return;
  }

  pending.forEach((item, idx) => {
    console.log(`\n[${idx + 1}] ID: ${item.id}`);
    console.log(`    日付: ${item.date} | 種別: ${item.contentType} | カテゴリ候補: ${item.categoryCandidate}`);
    console.log(`    タイトル: ${item.title}`);
    console.log(`    媒体: ${item.source}`);
    console.log(`    URL: ${item.sourceURL}`);
  });

  console.log("\n------------------------------------------");
  console.log("💡 承認するには: npm run content:approve <ID または all>");
  console.log("💡 却下するには: npm run content:reject <ID または all>");
  console.log("------------------------------------------");
}

// 2. content:approve - 候補の承認と本番データの反映
function approvePendingContent(targetIds: string[]) {
  const items = loadPendingList();
  const pending = items.filter((i) => i.status === "pending");

  if (pending.length === 0) {
    console.log("🎉 承認対象の未承認候補はありません。");
    return;
  }

  const isAll = targetIds.includes("all");
  const approvedList: PendingContentItem[] = [];

  items.forEach((item) => {
    if (item.status === "pending" && (isAll || targetIds.includes(item.id))) {
      item.status = "approved";
      approvedList.push(item);
    }
  });

  if (approvedList.length === 0) {
    console.log("⚠️ 指定された ID に一致する未承認候補が見つかりませんでした。");
    return;
  }

  // pending-content.json を更新
  savePendingList(items);

  // mockData.ts の INITIAL_LINK_ITEMS に追記
  let mockContent = fs.readFileSync(MOCK_DATA_PATH, "utf-8");

  const newLinkItems: LinkItem[] = approvedList.map((app) => {
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

  // INITIAL_LINK_ITEMS 配列の先頭に挿入
  const linkItemMarker = "export const INITIAL_LINK_ITEMS: LinkItem[] = [";
  const jsonItemsStr = JSON.stringify(newLinkItems, null, 2).slice(1, -1).trim();

  if (mockContent.includes(linkItemMarker)) {
    mockContent = mockContent.replace(linkItemMarker, `${linkItemMarker}\n  ${jsonItemsStr},`);
    fs.writeFileSync(MOCK_DATA_PATH, mockContent, "utf-8");
    console.log(`✅ ${approvedList.length}件の候補を承認し、本番データ (mockData.ts) へ正常追加反映いたしました！`);
  } else {
    console.error("❌ mockData.ts 内の INITIAL_LINK_ITEMS が見つかりませんでした。");
  }
}

// 3. content:reject - 候補の却下
function rejectPendingContent(targetIds: string[]) {
  const items = loadPendingList();
  const isAll = targetIds.includes("all");
  let rejectedCount = 0;

  items.forEach((item) => {
    if (item.status === "pending" && (isAll || targetIds.includes(item.id))) {
      item.status = "rejected";
      rejectedCount++;
    }
  });

  if (rejectedCount === 0) {
    console.log("⚠️ 指定された ID に一致する未承認候補が見つかりませんでした。");
    return;
  }

  savePendingList(items);
  console.log(`🗑️ ${rejectedCount}件の候補を却下 (rejected) に変更しました。`);
}

// CLI コマンドハンドラー
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case "check":
    checkPendingContent();
    break;
  case "approve":
    if (args.length === 0) {
      console.log("使用法: npm run content:approve <ID または all>");
    } else {
      approvePendingContent(args);
    }
    break;
  case "reject":
    if (args.length === 0) {
      console.log("使用法: npm run content:reject <ID または all>");
    } else {
      rejectPendingContent(args);
    }
    break;
  default:
    console.log("使用法:");
    console.log("  npm run content:check        - 未承認候補一覧を表示");
    console.log("  npm run content:approve <ID> - 指定候補を承認して本番反映");
    console.log("  npm run content:reject <ID>  - 指定候補を却下");
    break;
}
