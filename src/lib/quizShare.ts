/**
 * しょこら検定 X (Twitter) シェア文生成 & 文字数計算ユーティリティ
 * 
 * 【Xの文字数カウント仕様】
 * - ASCII文字（半角英数記号、改行など）: 重み1
 * - 非ASCII文字（日本語、全角、絵文字など）: 重み2
 * - URL（https?://...）: 一律23重み（t.co短縮URL扱い）
 * - 上限: 280重み（全角140文字相当）
 */

/**
 * URL以外の文字列の重みを計算
 */
function countNonUrlWeight(text: string): number {
  let weight = 0;
  // サロゲートペア（絵文字等）に対応するためコードポイント単位で反復
  for (const ch of Array.from(text)) {
    const code = ch.codePointAt(0) || 0;
    if (code <= 0x7f) {
      weight += 1;
    } else {
      weight += 2;
    }
  }
  return weight;
}

/**
 * X (Twitter) 公式仕様に準拠した重み計算関数
 */
export function calculateTwitterWeight(text: string): number {
  const urlRegex = /https?:\/\/[^\s]+/g;
  let weight = 0;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    const beforeText = text.slice(lastIndex, match.index);
    weight += countNonUrlWeight(beforeText);
    weight += 23; // t.coの固定長
    lastIndex = match.index + match[0].length;
  }

  const remainingText = text.slice(lastIndex);
  weight += countNonUrlWeight(remainingText);

  return weight;
}

/**
 * 運営者指定の短縮テンプレートに基づいてシェア文を生成
 */
export function buildQuizShareText(
  difficultyLabel: string,
  rankTitle: string,
  comment: string
): string {
  return `🍫しょこら検定【${difficultyLabel}】\n\n認定ランクは《${rankTitle}》！\n${comment}\n\nあなたも挑戦してみよう✨\n\n#しょこら検定 #瀧脇笙古 #イコラブ\nhttps://shokoblog.vercel.app/quiz`;
}

/**
 * 文字数制限（280重み）を厳密に保証する安全なシェア文生成関数
 * 280重みを超える場合は認定コメントを自動短縮して末尾に「…」を付加
 */
export function getSafeQuizShareText(
  difficultyLabel: string,
  rankTitle: string,
  rawComment: string
): {
  shareText: string;
  weight: number;
  isTruncated: boolean;
} {
  let comment = rawComment;
  let shareText = buildQuizShareText(difficultyLabel, rankTitle, comment);
  let weight = calculateTwitterWeight(shareText);

  if (weight <= 280) {
    return {
      shareText,
      weight,
      isTruncated: false,
    };
  }

  // 280重みを超過する場合は認定コメントを末尾から1文字ずつ削る
  const chars = Array.from(rawComment);
  while (chars.length > 0) {
    chars.pop();
    comment = chars.join("") + "…";
    shareText = buildQuizShareText(difficultyLabel, rankTitle, comment);
    weight = calculateTwitterWeight(shareText);
    if (weight <= 280) {
      return {
        shareText,
        weight,
        isTruncated: true,
      };
    }
  }

  return {
    shareText,
    weight,
    isTruncated: true,
  };
}

/**
 * X (Twitter) の Web Intent 共有リンクを生成
 */
export function getTwitterShareUrl(shareText: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
}
