import fs from "fs";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import { INITIAL_LINK_ITEMS } from "../src/data/mockData";
import { PendingContentItem, Category, ContentType } from "../src/types/blog";
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "../src/lib/youtube";

const PENDING_FILE_PATH = path.resolve(process.cwd(), "src/data/pending-content.json");

// 既存のURLおよびVideoIDのSetを構築
function buildExistingSets(pendingItems: PendingContentItem[]) {
  const urls = new Set<string>();
  const videoIds = new Set<string>();

  // 1. 本番既存データ
  INITIAL_LINK_ITEMS.forEach((item) => {
    if (item.sourceURL) urls.add(item.sourceURL.trim().toLowerCase());
    if (item.youtubeURL) urls.add(item.youtubeURL.trim().toLowerCase());
    if (item.videoId) videoIds.add(item.videoId.trim());
    const vId = extractYouTubeVideoId(item.sourceURL || item.youtubeURL);
    if (vId) videoIds.add(vId);
  });

  // 2. 既存の pending 候補データ
  pendingItems.forEach((item) => {
    if (item.sourceURL) urls.add(item.sourceURL.trim().toLowerCase());
    if (item.youtubeURL) urls.add(item.youtubeURL.trim().toLowerCase());
    if (item.videoId) videoIds.add(item.videoId.trim());
    const vId = extractYouTubeVideoId(item.sourceURL || item.youtubeURL);
    if (vId) videoIds.add(vId);
  });

  return { urls, videoIds };
}

function loadPendingFile(): PendingContentItem[] {
  if (!fs.existsSync(PENDING_FILE_PATH)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(PENDING_FILE_PATH, "utf-8");
    return JSON.parse(raw) as PendingContentItem[];
  } catch (err) {
    console.error("pending-content.json の読み込みエラー:", err);
    return [];
  }
}

function determineCategory(title: string, source: string): Category {
  const t = title.toLowerCase();

  if (t.includes("ベイスターズ") || t.includes("ハマスタ") || t.includes("ピッチ") || t.includes("始球式") || t.includes("bay☆スタ") || t.includes("baystars")) {
    return "ベイスターズ";
  }
  if (t.includes("マラソン") || t.includes("サブ4") || t.includes("ランニング") || t.includes("sasuke") || t.includes("スポーツ")) {
    return "マラソン・スポーツ";
  }
  if (t.includes("料理") || t.includes("クック") || t.includes("レシピ") || t.includes("ハンバーガー")) {
    return "料理";
  }
  if (t.includes("インタビュー") || t.includes("対談") || t.includes("語る")) {
    return "インタビュー";
  }
  if (source.toLowerCase().includes("youtube") || t.includes("mv") || t.includes("動画")) {
    return "YouTube";
  }
  if (t.includes("放送") || t.includes("出演") || t.includes("テレビ") || t.includes("ラジオ")) {
    return "テレビ・ラジオ";
  }
  return "ニュース";
}

function determineContentType(title: string, url: string, source: string): ContentType {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (url.includes("equal-love.jp/news/")) return "official";
  if (title.includes("インタビュー") || title.includes("対談")) return "interview";
  if (source.includes("サンスポ") || source.includes("雑誌") || title.includes("発売") || title.includes("掲載")) return "magazine";
  return "news";
}

// 1. ＝LOVE 公式NEWS クローラー
async function fetchOfficialNews(): Promise<Partial<PendingContentItem>[]> {
  const results: Partial<PendingContentItem>[] = [];
  try {
    console.log("🔍 ＝LOVE公式NEWSをクロール中...");
    const resp = await axios.get("https://equal-love.jp/news/", {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(resp.data);
    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (!href || !href.includes("/news/detail/")) return;

      const fullUrl = href.startsWith("http") ? href : `https://equal-love.jp${href}`;
      const title = $(el).text().trim();
      const parentText = $(el).parent().text().trim();

      const dateMatch = parentText.match(/(\d{4})[./-](\d{2})[./-](\d{2})/);
      const formattedDate = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : new Date().toISOString().split("T")[0];

      if (title && title.length > 5 && fullUrl) {
        const isShokoRelated =
          title.includes("瀧脇") ||
          title.includes("笙古") ||
          title.includes("しょこ") ||
          title.includes("BAY☆スタ") ||
          title.includes("セレモニアルピッチ") ||
          title.includes("プロ野球ニュース") ||
          title.includes("お話し会") ||
          title.includes("撮影会");

        if (isShokoRelated) {
          results.push({
            date: formattedDate,
            title,
            source: "＝LOVE Official Website",
            sourceURL: fullUrl,
            contentType: "official",
            categoryCandidate: determineCategory(title, "＝LOVE Official Website"),
            descriptionCandidate: `＝LOVE公式NEWS掲載: ${title}`,
          });
        }
      }
    });
  } catch (err: any) {
    console.warn("⚠️ ＝LOVE公式NEWSの取得中に警告:", err.message);
  }
  return results;
}

// 2. PR TIMES・ニュースフィード クローラー
async function fetchPRTimesNews(): Promise<Partial<PendingContentItem>[]> {
  const results: Partial<PendingContentItem>[] = [];
  try {
    console.log("🔍 PR TIMES / ニュースフィードをクロール中...");
    const searchUrl = "https://prtimes.jp/main/html/searchrlp/company_id/22608";
    const resp = await axios.get(searchUrl, {
      timeout: 10000,
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
    });
    const $ = cheerio.load(resp.data);

    $("a").each((_, el) => {
      const href = $(el).attr("href");
      const title = $(el).text().trim();
      if (href && href.includes("/main/html/rd/") && title && title.length > 5) {
        if (title.includes("瀧脇") || title.includes("BAY☆スタ") || title.includes("＝LOVE")) {
          const fullUrl = href.startsWith("http") ? href : `https://prtimes.jp${href}`;
          results.push({
            date: new Date().toISOString().split("T")[0],
            title,
            source: "PR TIMES / サンスポ",
            sourceURL: fullUrl,
            contentType: "news",
            categoryCandidate: determineCategory(title, "PR TIMES"),
            descriptionCandidate: `プレスリリース: ${title}`,
          });
        }
      }
    });
  } catch (err: any) {
    console.warn("⚠️ PR TIMESの取得中に警告:", err.message);
  }
  return results;
}

async function main() {
  console.log("==========================================");
  console.log("🚀 新着記事・動画 自動候補収集スクリプト開始");
  console.log("==========================================");

  const existingPendingList = loadPendingFile();
  const { urls: existingUrls, videoIds: existingVideoIds } = buildExistingSets(existingPendingList);

  const officialNews = await fetchOfficialNews();
  const prNews = await fetchPRTimesNews();

  const fetchedCandidates = [...officialNews, ...prNews];
  console.log(`📡 取得した検出アイテム総数: ${fetchedCandidates.length}件`);

  let addedCount = 0;
  const nowISO = new Date().toISOString();

  for (const candidate of fetchedCandidates) {
    if (!candidate.sourceURL || !candidate.title) continue;

    const normalizedUrl = candidate.sourceURL.trim().toLowerCase();
    const videoId = candidate.videoId || extractYouTubeVideoId(candidate.sourceURL);

    if (existingUrls.has(normalizedUrl)) continue;
    if (videoId && existingVideoIds.has(videoId)) continue;

    const newItem: PendingContentItem = {
      id: `pending-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: candidate.date || nowISO.split("T")[0],
      title: candidate.title.trim(),
      source: candidate.source || "Webメディア",
      sourceURL: candidate.sourceURL.trim(),
      contentType: candidate.contentType || determineContentType(candidate.title, candidate.sourceURL, candidate.source || ""),
      categoryCandidate: candidate.categoryCandidate || determineCategory(candidate.title, candidate.source || ""),
      descriptionCandidate: candidate.descriptionCandidate || `${candidate.source}: ${candidate.title}`,
      detectedAt: nowISO,
      status: "pending",
      thumbnailURL: candidate.thumbnailURL,
      youtubeURL: candidate.youtubeURL,
      videoId: videoId || undefined,
    };

    existingPendingList.push(newItem);
    existingUrls.add(normalizedUrl);
    if (videoId) existingVideoIds.add(videoId);
    addedCount++;
    console.log(`✨ 新規新着候補を追加: [${newItem.date}] ${newItem.title} (${newItem.source})`);
  }

  fs.writeFileSync(PENDING_FILE_PATH, JSON.stringify(existingPendingList, null, 2), "utf-8");

  console.log("==========================================");
  console.log(`✅ 収集完了！ 新規追加候補: ${addedCount}件 / 全未承認リスト数: ${existingPendingList.filter(i => i.status === "pending").length}件`);
  console.log("==========================================");
}

main().catch((err) => {
  console.error("❌ クロール実行中に致命的なエラーが発生しました:", err);
  process.exit(1);
});
