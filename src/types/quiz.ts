export type QuizDifficulty = "easy" | "normal" | "hard";

export type QuizCategory =
  | "profile"
  | "activity"
  | "music"
  | "cooking"
  | "sports"
  | "baystars"
  | "media";

export type EvidenceStatus = "primary_verified" | "needs_primary" | "unverified";

export interface CandidateQuestion {
  id: string;
  originalQuestionNumber?: number;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  sourceUrl: string;
  evidenceStatus: EvidenceStatus;
  operatorApproved: boolean;
  publish: boolean;
}

/**
 * 運営者厳格公開条件：
 * 1. evidenceStatus が primary_verified
 * 2. operatorApproved が true
 * 3. publish が true
 * の3点すべてを満たした場合のみ公開可能
 */
export function isCandidatePublishable(q: {
  evidenceStatus: EvidenceStatus;
  operatorApproved: boolean;
  publish: boolean;
}): boolean {
  return (
    q.evidenceStatus === "primary_verified" &&
    q.operatorApproved === true &&
    q.publish === true
  );
}

export interface QuizQuestion {
  id: string;
  difficulty: QuizDifficulty;
  category: QuizCategory;
  categoryLabel: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  sourceUrl: string;
  isApproved: boolean; // 運営者承認状態（trueのみ公開対象）
  approvedAt?: string; // 承認日時
  approvedBy?: string; // 承認者名
}

export type QuizRank =
  | "god"
  | "master"
  | "doctor"
  | "researcher"
  | "apprentice"
  | "beginner";

export interface RankInfo {
  rank: QuizRank;
  title: string;
  minScore: number;
  maxScore: number;
  badge: string;
  message: string;
  color: string;
  bgColor: string;
}

export interface QuizResultData {
  difficulty: QuizDifficulty;
  score: number;
  total: number;
  rankInfo: RankInfo;
  answeredAt: string;
}
