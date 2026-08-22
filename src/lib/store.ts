import { LinkItem, AdSettings, DraftCandidate } from "@/types/blog";
import { INITIAL_LINK_ITEMS, INITIAL_AD_SETTINGS, INITIAL_DRAFT_CANDIDATES, INITIAL_TAGS, INITIAL_YEARS } from "@/data/mockData";

const STORAGE_KEYS = {
  LINK_ITEMS: "shokoblog_link_items",
  AD_SETTINGS: "shokoblog_ads",
  DRAFTS: "shokoblog_drafts",
  TAGS: "shokoblog_tags",
};

export function getLinkItems(): LinkItem[] {
  if (typeof window === "undefined") return INITIAL_LINK_ITEMS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LINK_ITEMS);
    return data ? JSON.parse(data) : INITIAL_LINK_ITEMS;
  } catch (e) {
    return INITIAL_LINK_ITEMS;
  }
}

export function saveLinkItems(items: LinkItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.LINK_ITEMS, JSON.stringify(items));
}

export function getAdSettings(): AdSettings {
  if (typeof window === "undefined") return INITIAL_AD_SETTINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AD_SETTINGS);
    return data ? JSON.parse(data) : INITIAL_AD_SETTINGS;
  } catch (e) {
    return INITIAL_AD_SETTINGS;
  }
}

export function saveAdSettings(settings: AdSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.AD_SETTINGS, JSON.stringify(settings));
}

export function getDraftCandidates(): DraftCandidate[] {
  if (typeof window === "undefined") return INITIAL_DRAFT_CANDIDATES;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    return data ? JSON.parse(data) : INITIAL_DRAFT_CANDIDATES;
  } catch (e) {
    return INITIAL_DRAFT_CANDIDATES;
  }
}

export function saveDraftCandidates(drafts: DraftCandidate[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
}

export function getTags(): string[] {
  return INITIAL_TAGS;
}

export function getYears(): number[] {
  return INITIAL_YEARS;
}
