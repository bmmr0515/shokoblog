import { LinkItem } from "@/types/blog";

/**
 * 多様な日付文字列をタイムスタンプスコア（ミリ秒数値）に変換する関数
 * - YYYY-MM-DD, YYYY.MM.DD ➔ 完全なミリ秒
 * - YYYY-MM ➔ 該当月の1日
 * - YYYY ➔ 該当年の1月1日
 * - 不明・無効 ➔ 0 (最後尾へ)
 */
export function getFlexibleDateScore(item: LinkItem): number {
  const dateStr = item.publishedDate || (item as unknown as { date?: string }).date;
  if (!dateStr || dateStr.trim() === "" || dateStr === "日付不明" || dateStr === "不明") {
    // 日付不明の場合は年情報(year)があれば補正、なければ0 (リスト最後尾へ)
    if (item.year && !isNaN(Number(item.year))) {
      return new Date(`${item.year}-01-01T00:00:00Z`).getTime();
    }
    return 0;
  }

  const cleaned = dateStr.trim().replace(/\./g, "-");

  // YYYY-MM-DD 形式
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    const timestamp = Date.parse(`${cleaned}T00:00:00Z`);
    if (!isNaN(timestamp)) return timestamp;
  }

  // YYYY-MM 形式
  if (/^\d{4}-\d{2}$/.test(cleaned)) {
    const timestamp = Date.parse(`${cleaned}-01T00:00:00Z`);
    if (!isNaN(timestamp)) return timestamp;
  }

  // YYYY 形式
  if (/^\d{4}$/.test(cleaned)) {
    const timestamp = Date.parse(`${cleaned}-01-01T00:00:00Z`);
    if (!isNaN(timestamp)) return timestamp;
  }

  // その他一般的なDate.parse試行
  const fallback = Date.parse(cleaned);
  if (!isNaN(fallback)) {
    return fallback;
  }

  // どうしても数値パースできない場合は year を参照
  if (item.year && !isNaN(Number(item.year))) {
    return new Date(`${item.year}-01-01T00:00:00Z`).getTime();
  }

  return 0;
}

/**
 * LinkItem 配列を日付順にソートする関数
 * @param items 対象配列
 * @param order "desc" (新しい順) | "asc" (古い順)
 */
export function sortItemsByDate(items: LinkItem[], order: "desc" | "asc" = "desc"): LinkItem[] {
  return [...items].sort((a, b) => {
    const scoreA = getFlexibleDateScore(a);
    const scoreB = getFlexibleDateScore(b);

    if (scoreA === scoreB) {
      // 日付スコアが同一の場合は id で安定ソート
      return a.id.localeCompare(b.id);
    }

    return order === "desc" ? scoreB - scoreA : scoreA - scoreB;
  });
}
