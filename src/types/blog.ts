export type Category =
  | "ニュース"
  | "インタビュー"
  | "YouTube"
  | "ベイスターズ"
  | "マラソン・スポーツ"
  | "テレビ・ラジオ"
  | "イベント"
  | "音楽・ライブ"
  | "バラエティ"
  | "料理"
  | "公式情報"
  | "過去記事"
  | "FAN CAM"
  | "Dance Focus"
  | "Music Video"
  | "ライブ"
  | "スポーツ"
  | "マラソン"
  | "SASUKE"
  | "生配信"
  | "スポーツ・ファッション"
  | "声優・アニメ"
  | "MV関連"
  | "ライブ映像"
  | "イコノイジョイch"
  | "配信"
  | "ドキュメンタリー"
  | "コラボ"
  | "掲載"
  | "モデル"
  | "ライブレポート"
  | "会見"
  | "メディア";

export type ContentType =
  | "news"
  | "interview"
  | "official"
  | "youtube"
  | "event"
  | "radio"
  | "tv"
  | "magazine"
  | "blog";

export interface LinkItem {
  id: string;
  title: string;
  sourceName: string;
  channelName?: string;
  sourceURL: string | null;
  publishedDate: string;
  year: number;
  category: Category;
  tags: string[];
  description: string;
  thumbnailURL: string;
  contentType: ContentType;
  youtubeURL?: string | null;
  videoId?: string;
  verified: boolean;
  lastCheckedAt: string;
  isFeatured?: boolean;
  isHighlight?: boolean;
}

export interface AdSettings {
  enabled: boolean;
  titleUnderAd: string;
  contentMiddleAd: string;
  contentEndAd: string;
  sidebarAd: string;
  listMiddleAd: string;
}

export interface DraftCandidate {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedDate: string;
  summary: string;
  category: Category;
}
