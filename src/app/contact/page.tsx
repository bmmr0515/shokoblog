"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Mail, Send, CheckCircle2, ShieldAlert, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [category, setCategory] = useState("権利者の方からの掲載内容に関するお問い合わせ（修正・削除依頼等）");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [message, setMessage] = useState("");
  const [hpField, setHpField] = useState(""); // ハニーポット（スパムボット対策）
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          name,
          email,
          targetUrl: targetUrl.trim() || undefined,
          message,
          hp_field: hpField,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "お問い合わせの送信に失敗しました。");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(
        err.message || "送信中にエラーが発生しました。通信環境をご確認のうえ、再度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 py-4">
      <Breadcrumbs items={[{ label: "お問い合わせ" }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-shoko-beige-border shadow-card space-y-6">
        
        {/* ヘッダー */}
        <div className="space-y-2 border-b border-shoko-beige-border pb-4">
          <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold font-mono uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-maru font-extrabold text-shoko-text-main">
            お問い合わせ
          </h1>
          <p className="text-xs text-shoko-text-sub font-sans leading-relaxed">
            当サイト（非公式ファンサイト「しょこらの部屋」）へのご意見・ご要望、および権利者様からの掲載内容に関するご連絡はこちらから承っております。
          </p>
        </div>

        {/* 権利者の方からの掲載内容に関するお問い合わせ 専用案内枠 */}
        <div className="bg-[#FFF9ED] p-4 sm:p-5 rounded-2xl border border-shoko-beige-border space-y-2.5">
          <div className="flex items-center gap-2 text-[#191919] font-bold text-xs sm:text-sm">
            <ShieldAlert className="w-4 h-4 text-shoko-orange shrink-0" />
            <span>権利者の方からの掲載内容に関するお問い合わせ（修正・削除のご依頼）</span>
          </div>
          <p className="text-xs text-shoko-text-sub leading-relaxed font-sans">
            当サイトで紹介している記事、動画、画像等の権利は各権利所有者様に帰属します。当サイトは瀧脇笙古さんの活動を応援する目的でファン有志が個人運営しており、権利を侵害する意図は一切ございません。
          </p>
          <p className="text-xs text-shoko-text-sub leading-relaxed font-sans">
            万が一、掲載内容についてご指摘、修正、削除等のご要望がございましたら、権利者ご本人様または正当な関係者様より本フォームからご連絡ください。内容を確認のうえ、迅速かつ誠実に対応（記事の修正・削除等）をいたします。
          </p>
          <div className="pt-1 text-[11px] text-zinc-500 font-sans">
            当サイトの基本方針については
            <Link href="/policy" className="text-shoko-orange font-bold hover:underline mx-1">
              運営方針・広告について
            </Link>
            もご確認ください。
          </div>
        </div>

        {submitted ? (
          <div className="bg-shoko-orange-light p-8 rounded-2xl text-center space-y-3 border border-shoko-orange/30">
            <CheckCircle2 className="w-10 h-10 text-shoko-orange mx-auto" />
            <h2 className="text-lg font-bold text-shoko-text-main font-maru">お問い合わせを受け付けました</h2>
            <p className="text-xs text-shoko-text-sub font-sans leading-relaxed">
              メッセージをお送りいただきありがとうございます。内容を確認のうえ、必要に応じて迅速に対応・ご連絡いたします。
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setTargetUrl("");
                setMessage("");
                setHpField("");
                setErrorMessage(null);
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-shoko-orange text-white text-xs font-bold hover:bg-shoko-orange-deep transition-colors"
            >
              もう一度送信する
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm font-sans">
            {/* エラーメッセージ */}
            {errorMessage && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-200 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                <div className="text-xs leading-relaxed font-sans">{errorMessage}</div>
              </div>
            )}

            {/* スパムボット対策ハニーポット（ブラウザ上は非表示） */}
            <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
              <label htmlFor="hp_field">お名前の確認</label>
              <input
                id="hp_field"
                type="text"
                name="hp_field"
                tabIndex={-1}
                autoComplete="off"
                value={hpField}
                onChange={(e) => setHpField(e.target.value)}
              />
            </div>
            
            {/* お問い合わせ種別 */}
            <div className="space-y-1.5">
              <label className="font-bold text-shoko-text-main block">
                お問い合わせ種別 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-shoko-beige rounded-xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange font-sans text-xs sm:text-sm"
              >
                <option value="権利者の方からの掲載内容に関するお問い合わせ（修正・削除依頼等）">
                  【重要】権利者の方からの掲載内容に関するお問い合わせ（修正・削除依頼等）
                </option>
                <option value="掲載情報の修正・リンク切れのご報告">
                  掲載情報の誤り・リンク切れのご報告
                </option>
                <option value="サイトへのご意見・ご要望">
                  サイトへのご意見・ご要望
                </option>
                <option value="その他のお問い合わせ">
                  その他のお問い合わせ
                </option>
              </select>
            </div>

            {/* お名前 */}
            <div className="space-y-1.5">
              <label className="font-bold text-shoko-text-main block">
                お名前（または法人名・ご所属） *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="お名前をご入力ください"
                className="w-full px-4 py-2.5 bg-shoko-beige rounded-xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange font-sans"
              />
            </div>

            {/* メールアドレス */}
            <div className="space-y-1.5">
              <label className="font-bold text-shoko-text-main block">
                メールアドレス *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-2.5 bg-shoko-beige rounded-xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange font-sans"
              />
            </div>

            {/* 該当URL（任意） */}
            <div className="space-y-1.5">
              <label className="font-bold text-shoko-text-main block">
                該当ページのURL（修正・削除対象のURLがある場合）
              </label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://shokoblog.vercel.app/news/... など"
                className="w-full px-4 py-2.5 bg-shoko-beige rounded-xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange font-sans"
              />
            </div>

            {/* お問い合わせ内容 */}
            <div className="space-y-1.5">
              <label className="font-bold text-shoko-text-main block">
                お問い合わせ内容詳細 *
              </label>
              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ご要件の詳細（修正箇所、削除のご要望、権利関係の詳細など）をご記入ください。"
                className="w-full px-4 py-2.5 bg-shoko-beige rounded-xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-shoko-orange text-white font-bold rounded-xl hover:bg-shoko-orange-deep transition-colors shadow-md flex items-center gap-2 ${
                isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>送信中...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>送信する</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
