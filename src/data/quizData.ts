import { QuizQuestion, QuizDifficulty, QuizRank, RankInfo } from "@/types/quiz";

/**
 * =========================================================================
 * しょこら検定 問題データ管理方針
 * =========================================================================
 * 【最重要ルール】
 * 本検定で使用する問題は、サイト運営者が明示的に用意・承認した問題に限定されます。
 * AIによる独自の問題作成・追加・自動生成・無断編集は全面禁止です。
 * 
 * 運営者から提供された以下の情報は、許可なく変更しないでください：
 * - 問題文 / 4つの選択肢 / 正解 / 解説文 / 難易度 / 出典URL / 承認状態
 * 
 * 【承認状態 (isApproved)】
 * isApproved: true の問題のみがサイト上で公開・出題対象となります。
 * 承認が確認できない問題は公開用データに含めないでください。
 * 
 * ※過去の初期候補問題（92問）はバックアップファイル
 *   `src/data/quizQuestionsBackup.ts` に退避・保存されています。
 * =========================================================================
 */

export const QUIZ_RANKS: RankInfo[] = [
  {
    rank: "god",
    title: "しょこら神",
    minScore: 10,
    maxScore: 10,
    badge: "GOD",
    message: "パーフェクト達成！瀧脇笙古ちゃんへの愛と知識はまさに神の領域です！全問正解おめでとうございます！",
    color: "#E99A32",
    bgColor: "#FFF4C7",
  },
  {
    rank: "master",
    title: "しょこらマスター",
    minScore: 9,
    maxScore: 9,
    badge: "MASTER",
    message: "驚異の9問正解！細かい活動の軌跡まで熟知しているトップクラスのしょこらファンです！",
    color: "#D97706",
    bgColor: "#FEF3C7",
  },
  {
    rank: "doctor",
    title: "しょこら博士",
    minScore: 7,
    maxScore: 8,
    badge: "DOCTOR",
    message: "素晴らしい成績！笙古ちゃんの魅力を深く理解している頼もしいしょこら博士です！",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
  },
  {
    rank: "researcher",
    title: "しょこら研究員",
    minScore: 5,
    maxScore: 6,
    badge: "RESEARCHER",
    message: "ナイスチャレンジ！半分以上正解の好成績。これからも笙古ちゃんの活躍を一緒に追いかけましょう！",
    color: "#8C694D",
    bgColor: "#FFF9ED",
  },
  {
    rank: "apprentice",
    title: "しょこら見習い",
    minScore: 3,
    maxScore: 4,
    badge: "APPRENTICE",
    message: "健闘しました！このサイトの記事や動画をチェックすれば、もっともっと笙古ちゃんの魅力が見つかります！",
    color: "#5C4533",
    bgColor: "#FDF8F0",
  },
  {
    rank: "beginner",
    title: "しょこら初心者",
    minScore: 0,
    maxScore: 2,
    badge: "BEGINNER",
    message: "挑戦ありがとうございます！瀧脇笙古ちゃんの沼へようこそ。まずはプロフィールやHISTORYを見てみてくださいね！",
    color: "#78716C",
    bgColor: "#F5F5F4",
  },
];

/**
 * 認定ランク判定関数（出題数が10問以外の場合でも対応可能）
 */
export function getRankInfo(score: number, total: number = 10): RankInfo {
  if (total === 10) {
    if (score >= 10) return QUIZ_RANKS[0];
    if (score === 9) return QUIZ_RANKS[1];
    if (score >= 7) return QUIZ_RANKS[2];
    if (score >= 5) return QUIZ_RANKS[3];
    if (score >= 3) return QUIZ_RANKS[4];
    return QUIZ_RANKS[5];
  }

  // 出題数が10問以外の場合（パーセンテージ換算）
  if (total <= 0) return QUIZ_RANKS[5];
  const ratio = score / total;
  if (ratio >= 1.0) return QUIZ_RANKS[0]; // 全問正解
  if (ratio >= 0.9) return QUIZ_RANKS[1];
  if (ratio >= 0.7) return QUIZ_RANKS[2];
  if (ratio >= 0.5) return QUIZ_RANKS[3];
  if (ratio >= 0.3) return QUIZ_RANKS[4];
  return QUIZ_RANKS[5];
}

/**
 * 運営者承認済み問題データリスト
 * 
 * 【注意】
 * サイト運営者が直接提供・承認した問題のみをここに追加してください。
 * AIによる自動生成・独自追加は禁止されています。
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 現在、運営者承認待ちのため公開用リストは空です。
  // 運営者から問題が提供・承認され次第、ここに追加されます。
];

/**
 * 承認済みの公開対象問題を取得
 */
export function getApprovedQuestions(difficulty?: QuizDifficulty): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => {
    if (!q.isApproved) return false;
    if (difficulty && q.difficulty !== difficulty) return false;
    return true;
  });
}

/**
 * 指定難易度の承認済み問題からランダムに出題（最大count問、重複なし）
 * 選択肢のシャッフル時も正解との対応関係を厳密に保持
 */
export function getRandomQuizQuestions(difficulty: QuizDifficulty, count: number = 10): QuizQuestion[] {
  const approvedList = getApprovedQuestions(difficulty);
  if (approvedList.length === 0) {
    return [];
  }

  // シャッフル（Fisher-Yates）
  const shuffled = [...approvedList];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 出題問数を決定（承認済み問題数がcount未満なら承認済み全問）
  const pickCount = Math.min(count, shuffled.length);
  const selected = shuffled.slice(0, pickCount);

  // 選択肢のシャッフル（正解文字列との対応関係は不変）
  return selected.map((q) => {
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    return {
      ...q,
      options: shuffledOptions,
      // correctAnswer は options に含まれる文字列値のまま維持
    };
  });
}
