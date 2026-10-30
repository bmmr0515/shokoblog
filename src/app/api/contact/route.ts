import { NextRequest, NextResponse } from "next/server";
import {
  ContactFormData,
  getJSTTimestamp,
  sendAdminNotification,
  sendAutoReply,
} from "@/lib/email";

// レート制限用インメモリストア (IP -> 送信タイムスタンプ配列)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1分
const MAX_REQUESTS_PER_WINDOW = 3; // 1分間に最大3件

/**
 * 簡易レート制限チェッカー
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // 1分以上前の古いタイムスタンプを削除
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // 制限超過
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

/**
 * メールアドレスの簡易バリデーション
 */
function isValidEmail(email: string): boolean {
  if (!email || email.length > 255) return false;
  // RFC準拠の一般的なメール正規表現
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * URLのバリデーション (任意項目)
 */
function isValidUrl(url: string): boolean {
  if (!url) return true;
  if (url.length > 500) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. IPアドレス取得とレート制限
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "短時間に多数のリクエストが送信されました。しばらく時間をおいてから再度お試しください。",
        },
        { status: 429 }
      );
    }

    // 2. リクエストボディのパース
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "無効なリクエスト形式です。" },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      category,
      targetUrl,
      message,
      hp_field, // ハニーポット（スパムボット対策）
    } = body;

    // 3. スパムボット対策 (ハニーポットフィールドに値が入っている場合は無言で成功扱い)
    if (hp_field) {
      return NextResponse.json({
        success: true,
        message: "お問い合わせを受け付けました。",
      });
    }

    // 4. 入力値バリデーション
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: "お名前を100文字以内でご入力ください。" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "有効なメールアドレスをご入力ください。" },
        { status: 400 }
      );
    }

    if (!category || typeof category !== "string" || category.trim().length === 0 || category.length > 100) {
      return NextResponse.json(
        { success: false, error: "お問い合わせ種別を選択してください。" },
        { status: 400 }
      );
    }

    if (targetUrl && (typeof targetUrl !== "string" || !isValidUrl(targetUrl))) {
      return NextResponse.json(
        { success: false, error: "有効なURL（http:// または https:// で始まるURL）をご入力ください。" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "お問い合わせ内容を5,000文字以内でご入力ください。" },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: name.trim(),
      email: email.trim(),
      category: category.trim(),
      targetUrl: targetUrl ? targetUrl.trim() : undefined,
      message: message.trim(),
    };

    const timestamp = getJSTTimestamp();

    // 5. お問い合わせ通知メール送信（管理者宛て）
    let adminNotified = false;
    try {
      await sendAdminNotification(formData, timestamp);
      adminNotified = true;
    } catch (adminMailError: any) {
      console.error("【お問い合わせ通知メール送信エラー】", {
        message: adminMailError?.message,
        code: adminMailError?.code,
      });

      return NextResponse.json(
        {
          success: false,
          error: "メール送信中にエラーが発生しました。時間をおいて再度お試しいただくか、運営アドレスへ直接ご連絡ください。",
        },
        { status: 500 }
      );
    }

    // 6. 自動返信メール送信（お問い合わせ者宛て）
    let autoReplySent = false;
    try {
      await sendAutoReply(formData, timestamp);
      autoReplySent = true;
    } catch (autoReplyError: any) {
      // 管理者への通知は成功しているため、自動返信の失敗はログに残しつつ全体の処理は成功として扱う
      console.warn("【お問い合わせ自動返信メール送信失敗】", {
        message: autoReplyError?.message,
        code: autoReplyError?.code,
      });
    }

    return NextResponse.json({
      success: true,
      message: "お問い合わせを受け付けました。",
      adminNotified,
      autoReplySent,
    });
  } catch (err: any) {
    console.error("【お問い合わせAPI予期せぬエラー】", err?.message);
    return NextResponse.json(
      {
        success: false,
        error: "サーバー内部で予期せぬエラーが発生しました。",
      },
      { status: 500 }
    );
  }
}
