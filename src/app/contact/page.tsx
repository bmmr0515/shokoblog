"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumbs items={[{ label: "お問い合わせ" }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-shoko-beige-border shadow-card space-y-6">
        <div className="space-y-2 border-b border-shoko-beige-border pb-4">
          <div className="flex items-center gap-2 text-shoko-orange text-xs font-bold">
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-shoko-text-main">
            お問い合わせ
          </h1>
          <p className="text-xs text-shoko-text-sub">
            当サイト（非公式ファンブログ「しょこらの部屋」）へのご意見・ご要望・権利者様からのご連絡はこちらから承っております。
          </p>
        </div>

        {submitted ? (
          <div className="bg-shoko-orange-light p-8 rounded-2xl text-center space-y-3 border border-shoko-orange/30">
            <CheckCircle2 className="w-10 h-10 text-shoko-orange mx-auto" />
            <h2 className="text-lg font-bold text-shoko-text-main">お問い合わせを受け付けました</h2>
            <p className="text-xs text-shoko-text-sub">
              メッセージをお送りいただきありがとうございます。内容を確認のうえ、必要に応じてご連絡いたします。
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-shoko-orange text-white text-xs font-bold"
            >
              もう一度送信する
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <label className="font-bold text-shoko-text-main">お名前 *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="しょこら太郎"
                className="w-full px-4 py-2.5 bg-shoko-beige rounded-xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-shoko-text-main">メールアドレス *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-2.5 bg-shoko-beige rounded-xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-shoko-text-main">お問い合わせ内容 *</label>
              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="お問い合わせ内容をご記入ください。"
                className="w-full px-4 py-2.5 bg-shoko-beige rounded-xl border border-shoko-beige-border focus:outline-none focus:border-shoko-orange"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-shoko-orange text-white font-bold rounded-xl hover:bg-shoko-orange-deep transition-colors shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>送信する</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
