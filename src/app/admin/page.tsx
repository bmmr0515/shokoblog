"use client";

import React, { useEffect, useState } from "react";
import { LinkItem, Category, ContentType, AdSettings, DraftCandidate } from "@/types/blog";
import {
  getLinkItems,
  saveLinkItems,
  getAdSettings,
  saveAdSettings,
  getDraftCandidates,
} from "@/lib/store";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"items" | "ads">("items");
  const [items, setItems] = useState<LinkItem[]>([]);
  const [adSettings, setAdSettings] = useState<AdSettings | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceURL, setSourceURL] = useState("");
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().substring(0, 10));
  const [category, setCategory] = useState<Category>("ニュース");
  const [tagsInput, setTagsInput] = useState("瀧脇笙古, =LOVE");
  const [description, setDescription] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80");
  const [contentType, setContentType] = useState<ContentType>("news");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setItems(getLinkItems());
    setAdSettings(getAdSettings());
  }, []);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !sourceName) {
      alert("タイトルおよび媒体名は必須です。");
      return;
    }

    const tags = tagsInput.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    const pubYear = parseInt(publishedDate.substring(0, 4), 10) || 2026;
    const nowChecked = new Date().toISOString().replace("T", " ").substring(0, 16);

    const finalSourceURL = sourceURL.trim() ? sourceURL.trim() : null;

    const newItem: LinkItem = {
      id: editingId || `link-${Date.now()}`,
      title,
      sourceName,
      sourceURL: finalSourceURL,
      publishedDate,
      year: pubYear,
      category,
      tags,
      description: description || `この記事では${title}について紹介されています。`,
      thumbnailURL,
      contentType,
      youtubeURL: youtubeURL.trim() || undefined,
      verified: true,
      lastCheckedAt: nowChecked,
    };

    let updated: LinkItem[];
    if (editingId) {
      updated = items.map((i) => (i.id === editingId ? newItem : i));
      showToast("リンク・掲載記録情報を更新しました！");
    } else {
      updated = [newItem, ...items];
      showToast("新しいリンク・掲載記録を追加しました！");
    }

    setItems(updated);
    saveLinkItems(updated);
    resetForm();
  };

  const handleEditClick = (item: LinkItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSourceName(item.sourceName);
    setSourceURL(item.sourceURL || "");
    setPublishedDate(item.publishedDate);
    setCategory(item.category);
    setTagsInput(item.tags.join(", "));
    setDescription(item.description);
    setThumbnailURL(item.thumbnailURL);
    setContentType(item.contentType);
    setYoutubeURL(item.youtubeURL || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("本当にこの登録項目を削除しますか？")) {
      const updated = items.filter((i) => i.id !== id);
      setItems(updated);
      saveLinkItems(updated);
      showToast("項目を削除しました。");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSourceName("");
    setSourceURL("");
    setPublishedDate(new Date().toISOString().substring(0, 10));
    setCategory("ニュース");
    setTagsInput("瀧脇笙古, =LOVE");
    setDescription("");
    setThumbnailURL("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80");
    setContentType("news");
    setYoutubeURL("");
  };

  const categoriesList: Category[] = [
    "ニュース",
    "インタビュー",
    "YouTube",
    "ベイスターズ",
    "マラソン・スポーツ",
    "テレビ・ラジオ",
    "音楽・ライブ",
    "バラエティ",
    "料理",
    "公式情報",
    "過去記事",
  ];

  return (
    <div className="space-y-6 text-xs">
      <Breadcrumbs items={[{ label: "ADMIN" }]} />

      {message && (
        <div className="fixed top-16 right-4 z-50 bg-amber-500 text-white px-4 py-2 font-bold text-xs shadow animate-bounce">
          {message}
        </div>
      )}

      <div className="border-b-2 border-amber-500 pb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          管理画面（実在リンク・掲載記録管理）
        </h1>
      </div>

      <div className="space-y-6">
        <div className="border border-gray-200 p-5 space-y-4 bg-white">
          <h2 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-2">
            {editingId ? "登録項目の編集" : "新規項目の追加"}
          </h2>

          <form onSubmit={handleItemSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-gray-800">正式タイトル *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-800">媒体名 (sourceName) *</label>
                <input
                  type="text"
                  required
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  placeholder="サンケイスポーツ, Full-Count"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-800">ピンポイント元URL (確実でない場合は空欄で記録表示)</label>
                <input
                  type="url"
                  value={sourceURL}
                  onChange={(e) => setSourceURL(e.target.value)}
                  placeholder="確実な対象URLがない場合は空欄 (null化)"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-800">公開日</label>
                <input
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-800">カテゴリー</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300"
                >
                  {categoriesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-gray-800">短い紹介文 (description)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors"
              >
                {editingId ? "更新する" : "追加する"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold border border-gray-300"
                >
                  キャンセル
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="border border-gray-200 p-5 space-y-3 bg-white">
          <h2 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-2">
            登録一覧 ({items.length}件)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-800 font-bold">
                  <th className="p-2 border border-gray-200">公開日</th>
                  <th className="p-2 border border-gray-200">カテゴリー</th>
                  <th className="p-2 border border-gray-200">媒体名</th>
                  <th className="p-2 border border-gray-200">タイトル</th>
                  <th className="p-2 border border-gray-200">リンク状態</th>
                  <th className="p-2 border border-gray-200 text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2 border border-gray-200 whitespace-nowrap">{item.publishedDate}</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap font-bold text-amber-800">{item.category}</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap font-bold">{item.sourceName}</td>
                    <td className="p-2 border border-gray-200 font-bold max-w-[250px] truncate">{item.title}</td>
                    <td className="p-2 border border-gray-200 font-bold">
                      {item.sourceURL || item.youtubeURL ? (
                        <span className="text-green-600">直通リンクあり</span>
                      ) : (
                        <span className="text-gray-500">掲載記録 (null)</span>
                      )}
                    </td>
                    <td className="p-2 border border-gray-200 text-center whitespace-nowrap space-x-2">
                      <button onClick={() => handleEditClick(item)} className="text-blue-600 font-bold">編集</button>
                      <button onClick={() => handleDeleteClick(item.id)} className="text-red-600 font-bold">削除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
