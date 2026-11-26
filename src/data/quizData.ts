import rawCandidates from "./shokora_advanced_candidates_19.json";
import {
  QuizQuestion,
  QuizDifficulty,
  QuizRank,
  RankInfo,
  CandidateQuestion,
  isCandidatePublishable,
} from "@/types/quiz";

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
 * 【公開条件（3点すべて満たすこと）】
 * 1. evidenceStatus が "primary_verified"（一次資料との照合完了）
 * 2. operatorApproved が true（運営者による採用承認）
 * 3. publish が true（公開設定）
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
 * 運営者提供・上級採用候補問題（全19問）
 * rawCandidates (shokora_advanced_candidates_19.json) からインポートして一元管理
 */
const rawQuestions = ((rawCandidates as any)?.default?.questions || (rawCandidates as any)?.questions || rawCandidates) as CandidateQuestion[];
export const ADVANCED_CANDIDATE_QUESTIONS: CandidateQuestion[] = rawQuestions;

/**
 * 運営者承認済み固定問題リスト
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [];

/**
 * 問題データの整合性バリデーション関数
 * 不備がある場合は例外を投げる
 */
export function validateCandidateQuestions(candidates: CandidateQuestion[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const idSet = new Set<string>();

  candidates.forEach((q, idx) => {
    // 1. ID重複チェック
    if (idSet.has(q.id)) {
      errors.push(`重複する問題IDが存在します: ${q.id} (index: ${idx})`);
    }
    idSet.add(q.id);

    // 2. 選択肢は必ず4つ
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`問題ID ${q.id}: 選択肢が4つではありません (現在: ${q.options?.length})`);
    }

    // 3. 正解インデックスの範囲検証 (0〜3)
    if (
      typeof q.correctAnswerIndex !== "number" ||
      q.correctAnswerIndex < 0 ||
      q.correctAnswerIndex >= 4
    ) {
      errors.push(`問題ID ${q.id}: 正解インデックスが範囲外です (${q.correctAnswerIndex})`);
    }

    // 4. 正解選択肢の存在確認
    if (q.options && q.options[q.correctAnswerIndex] === undefined) {
      errors.push(`問題ID ${q.id}: 指定インデックスの選択肢が存在しません`);
    }

    // 5. 必須項目の確認
    if (!q.question || q.question.trim() === "") {
      errors.push(`問題ID ${q.id}: 問題文が空です`);
    }
    if (!q.sourceUrl || q.sourceUrl.trim() === "") {
      errors.push(`問題ID ${q.id}: 出典URLが空です`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 候補問題の検証・集計サマリーを取得
 */
export function getCandidateSummary(): {
  total: number;
  primaryVerified: number;
  needsPrimary: number;
  operatorApproved: number;
  publishTrue: number;
  publishable: number;
} {
  const total = ADVANCED_CANDIDATE_QUESTIONS.length;
  let primaryVerified = 0;
  let needsPrimary = 0;
  let operatorApproved = 0;
  let publishTrue = 0;
  let publishable = 0;

  ADVANCED_CANDIDATE_QUESTIONS.forEach((q) => {
    if (q.evidenceStatus === "primary_verified") primaryVerified++;
    if (q.evidenceStatus === "needs_primary") needsPrimary++;
    if (q.operatorApproved === true) operatorApproved++;
    if (q.publish === true) publishTrue++;
    if (isCandidatePublishable(q)) publishable++;
  });

  return {
    total,
    primaryVerified,
    needsPrimary,
    operatorApproved,
    publishTrue,
    publishable,
  };
}

/**
 * 承認済みの公開対象問題を取得
 * 
 * 公開条件3点（一次資料確認済み、運営者承認、公開フラグ）すべてを満たすもののみを抽出。
 * 運営者承認済みの上級12問が公開対象となります。
 */
export function getApprovedQuestions(difficulty?: QuizDifficulty): QuizQuestion[] {
  const publishableList: QuizQuestion[] = [];

  // 1. 通常登録の承認済み問題
  for (const q of QUIZ_QUESTIONS) {
    if (q.isApproved) {
      if (!difficulty || q.difficulty === difficulty) {
        publishableList.push(q);
      }
    }
  }

  // 2. 上級候補問題（3つの公開条件をすべて満たすもののみ）
  for (const c of ADVANCED_CANDIDATE_QUESTIONS) {
    if (isCandidatePublishable(c)) {
      if (!difficulty || difficulty === "hard") {
        publishableList.push({
          id: c.id,
          difficulty: "hard",
          category: "activity",
          categoryLabel: "上級・活動記録",
          question: c.question,
          options: c.options,
          correctAnswer: c.options[c.correctAnswerIndex],
          explanation: c.explanation,
          sourceUrl: c.sourceUrl,
          isApproved: true,
          approvedBy: "operator",
        });
      }
    }
  }

  return publishableList;
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
