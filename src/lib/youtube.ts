import { LinkItem } from "@/types/blog";

export type UnifiedCategory =
  | "ALL"
  | "MV関連"
  | "ライブ映像"
  | "インタビュー"
  | "スポーツ"
  | "イコノイジョイch"
  | "配信"
  | "ドキュメンタリー";

/**
 * YouTube URLから videoId (11桁の英数字・記号) を正確に抽出する関数
 */
export const extractYouTubeVideoId = (url: string | null | undefined): string | null => {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();

  // 1. standard watch?v=VIDEO_ID or &v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:watch\?v=|&v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // 2. youtu.be/VIDEO_ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  // 3. youtube.com/shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // 4. youtube.com/live/VIDEO_ID
  const liveMatch = trimmed.match(/live\/([a-zA-Z0-9_-]{11})/);
  if (liveMatch && liveMatch[1]) return liveMatch[1];

  // 5. embed/VIDEO_ID
  const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  return null;
};

/**
 * videoId から標準のYouTubeサムネイルURL(hqdefault.jpg)を生成する
 */
export const getYouTubeThumbnailUrl = (videoId: string | null | undefined): string => {
  if (!videoId) return "";
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

/**
 * ユーザー指定のカテゴリ統一ルール＆優先順位 (最新7カテゴリ)
 * 優先順位:
 * 1. スポーツ
 * 2. ライブ映像
 * 3. MV関連
 * 4. ドキュメンタリー
 * 5. インタビュー
 * 6. 配信
 * 7. イコノイジョイch
 */
export function getUnifiedCategory(item: LinkItem): UnifiedCategory {
  const titleLower = item.title.toLowerCase();
  const catLower = (item.category || "").toLowerCase();
  const urlLower = (item.youtubeURL || item.sourceURL || "").toLowerCase();

  // 1. スポーツ (優先度 1)
  // ※スポーツ企画はドキュメンタリーや密着であっても「スポーツ」を最優先
  const isSports =
    catLower.includes("スポーツ") ||
    catLower.includes("ベイスターズ") ||
    catLower.includes("sasuke") ||
    catLower.includes("マラソン") ||
    catLower.includes("ボートレース") ||
    catLower.includes("ボウリング") ||
    titleLower.includes("ベイスターズ") ||
    titleLower.includes("ハマスタ") ||
    titleLower.includes("ピッチ") ||
    titleLower.includes("始球式") ||
    titleLower.includes("野球") ||
    titleLower.includes("プロ野球") ||
    titleLower.includes("sasuke") ||
    titleLower.includes("マラソン") ||
    titleLower.includes("サブ4") ||
    titleLower.includes("ボートレース") ||
    titleLower.includes("ボウリング") ||
    (titleLower.includes("fila") && !titleLower.includes("special message"));

  if (isSports) return "スポーツ";

  // ※特例: Documentary of ＝LOVE シリーズは絶対にドキュメンタリーに分類
  if (titleLower.includes("documentary of")) {
    return "ドキュメンタリー";
  }

  // 2. ライブ映像 (優先度 2)
  // 公式ライブ映像、コンサート映像、ツアー映像、周年ライブ映像、FAN CAM、ライブ会場での個人フォーカス映像、センター曲のライブ映像、TV音楽番組生パフォーマンス映像
  const isLive =
    catLower.includes("fan cam") ||
    catLower.includes("ライブ") ||
    catLower.includes("音楽・ライブ") ||
    titleLower.includes("fan cam") ||
    titleLower.includes("【live】") ||
    titleLower.includes("【live full】") ||
    titleLower.includes("【live ver. full】") ||
    titleLower.includes("live ver") ||
    titleLower.includes("コンサート") ||
    titleLower.includes("cdtv") ||
    titleLower.includes("music awards") ||
    (titleLower.includes("ライブ") && !titleLower.includes("ドライブ")) ||
    (titleLower.includes("ツアー") && !titleLower.includes("社員旅行") && !titleLower.includes("documentary"));

  if (isLive) return "ライブ映像";

  // 3. MV関連 (優先度 3)
  // センター曲MV、Dance Focus、個人Dance動画、Shorts Dance動画、センター曲メイキング、楽曲関連公式映像
  const isMVRelated =
    catLower.includes("mv") ||
    catLower.includes("music video") ||
    catLower.includes("dance") ||
    catLower.includes("フォーカス") ||
    catLower.includes("センター曲") ||
    titleLower.includes("mv") ||
    titleLower.includes("dance") ||
    titleLower.includes("making") ||
    titleLower.includes("メイキング") ||
    titleLower.includes("劇薬中毒") ||
    titleLower.includes("ラブソングに襲われる") ||
    titleLower.includes("木漏れ日メゾフォルテ") ||
    titleLower.includes("bpm170") ||
    titleLower.includes("とくべチュ") ||
    titleLower.includes("絶対アイドル辞めないで") ||
    titleLower.includes("この空がトリガー") ||
    titleLower.includes("ナツマトぺ") ||
    titleLower.includes("360 ver") ||
    titleLower.includes("lyric video");

  if (isMVRelated) return "MV関連";

  // 4. ドキュメンタリー (優先度 4)
  // Documentary of ＝LOVE シリーズ、オーディション密着、合宿密着、ツアー密着、舞台裏密着、長期企画の記録映像、本人の挑戦や活動を追った密着型映像
  const isDocumentary =
    catLower.includes("ドキュメンタリー") ||
    titleLower.includes("documentary") ||
    titleLower.includes("オーディション") ||
    titleLower.includes("training camp") ||
    titleLower.includes("合宿") ||
    titleLower.includes("密着舞台裏");

  if (isDocumentary) return "ドキュメンタリー";

  // 5. インタビュー (優先度 5)
  const isInterview =
    catLower.includes("インタビュー") ||
    catLower.includes("イベント") ||
    titleLower.includes("インタビュー") ||
    titleLower.includes("トークノーカット") ||
    titleLower.includes("発表会") ||
    titleLower.includes("メッセージ") ||
    titleLower.includes("special message") ||
    titleLower.includes("くじ") ||
    titleLower.includes("ズートピア") ||
    titleLower.includes("浴衣") ||
    titleLower.includes("セルフィー");

  if (isInterview) return "インタビュー";

  // 6. 配信 (優先度 6)
  const isStream =
    catLower.includes("生配信") ||
    catLower.includes("配信") ||
    titleLower.includes("生配信") ||
    urlLower.includes("/live/");

  if (isStream) return "配信";

  // 7. イコノイジョイch (優先度 7)
  return "イコノイジョイch";
}
