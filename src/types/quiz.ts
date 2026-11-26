export type QuizDifficulty = "easy" | "normal" | "hard";

export type QuizCategory =
  | "profile"
  | "activity"
  | "music"
  | "cooking"
  | "sports"
  | "baystars"
  | "media";

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
