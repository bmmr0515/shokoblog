import nodemailer from "nodemailer";

export interface ContactFormData {
  name: string;
  email: string;
  category: string;
  targetUrl?: string;
  message: string;
}

/**
 * HTML特殊文字をエスケープしてXSSを防止する
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 日本標準時（JST）の現在日時文字列を生成する (YYYY-MM-DD HH:mm:ss JST)
 */
export function getJSTTimestamp(): string {
  const now = new Date();
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now) + " JST";
}

/**
 * Nodemailer SMTPトランスポーターを作成
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    throw new Error("SMTP認証情報 (SMTP_USER / SMTP_PASSWORD) が設定されていません。");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * 1. 管理者（IDEAL運営事務局）へお問い合わせ通知メールを送信
 * Reply-Toに問い合わせ者のメールアドレスを設定し、Gmail返信ボタンから直接返信可能にする
 */
export async function sendAdminNotification(data: ContactFormData, timestamp: string) {
  const transporter = createTransporter();
  const adminEmail = process.env.CONTACT_EMAIL || "ideal.ikonoijoy@gmail.com";
  const smtpUser = process.env.SMTP_USER || adminEmail;

  const subject = "【しょこらの部屋】新しいお問い合わせ";

  const textContent = `
【しょこらの部屋】にお問い合わせが届きました。
このメールに直接返信すると、お問い合わせ者（${data.email}）へ返信できます。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 受付日時: ${timestamp}
■ お名前: ${data.name}
■ メールアドレス: ${data.email}
■ お問い合わせ種別: ${data.category}
${data.targetUrl ? `■ 該当ページURL: ${data.targetUrl}\n` : ""}
■ お問い合わせ内容:
${data.message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

  const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  <h2 style="color: #e07038; border-bottom: 2px solid #e07038; padding-bottom: 8px; margin-top: 0;">
    【しょこらの部屋】新しいお問い合わせ
  </h2>
  <p style="font-size: 13px; color: #666;">
    サイトのお問い合わせフォームより新しいメッセージを受信しました。<br>
    ※このメールにそのまま返信すると、お問い合わせ者（${escapeHtml(data.email)}）へ直接返信できます。
  </p>
  
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
    <tr>
      <th style="text-align: left; padding: 8px 12px; background: #fafafa; border: 1px solid #eee; width: 130px;">受付日時</th>
      <td style="padding: 8px 12px; border: 1px solid #eee;">${escapeHtml(timestamp)}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px 12px; background: #fafafa; border: 1px solid #eee;">お名前</th>
      <td style="padding: 8px 12px; border: 1px solid #eee;">${escapeHtml(data.name)}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px 12px; background: #fafafa; border: 1px solid #eee;">メールアドレス</th>
      <td style="padding: 8px 12px; border: 1px solid #eee;">
        <a href="mailto:${escapeHtml(data.email)}" style="color: #e07038;">${escapeHtml(data.email)}</a>
      </td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px 12px; background: #fafafa; border: 1px solid #eee;">お問い合わせ種別</th>
      <td style="padding: 8px 12px; border: 1px solid #eee; font-weight: bold;">${escapeHtml(data.category)}</td>
    </tr>
    ${
      data.targetUrl
        ? `<tr>
      <th style="text-align: left; padding: 8px 12px; background: #fafafa; border: 1px solid #eee;">該当ページURL</th>
      <td style="padding: 8px 12px; border: 1px solid #eee;">
        <a href="${escapeHtml(data.targetUrl)}" target="_blank" rel="noopener noreferrer" style="color: #e07038; word-break: break-all;">${escapeHtml(data.targetUrl)}</a>
      </td>
    </tr>`
        : ""
    }
  </table>

  <div style="background: #fdfaf6; border: 1px solid #f2e6d9; border-radius: 6px; padding: 15px; margin: 20px 0;">
    <h3 style="margin-top: 0; font-size: 14px; color: #555;">■ お問い合わせ内容詳細:</h3>
    <div style="white-space: pre-wrap; font-size: 14px; color: #222; word-break: break-word;">${escapeHtml(data.message)}</div>
  </div>
</div>
`.trim();

  return await transporter.sendMail({
    from: `"しょこらの部屋 お問い合わせ" <${smtpUser}>`,
    to: adminEmail,
    replyTo: data.email,
    subject,
    text: textContent,
    html: htmlContent,
  });
}

/**
 * 2. お問い合わせ者へ自動返信メールを送信
 */
export async function sendAutoReply(data: ContactFormData, timestamp: string) {
  const transporter = createTransporter();
  const adminEmail = process.env.CONTACT_EMAIL || "ideal.ikonoijoy@gmail.com";
  const smtpUser = process.env.SMTP_USER || adminEmail;

  const subject = "【しょこらの部屋】お問い合わせを受け付けました";

  // ユーザー様ご指定の文面を忠実に再現
  const textContent = `
${data.name} 様

お問い合わせいただき、ありがとうございます。
瀧脇笙古さんの非公式ファンサイト「しょこらの部屋」運営事務局です。

以下の内容でお問い合わせを受け付けました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【お問い合わせ内容】
■ お問い合わせ種別:
${data.category}

■ お名前（または法人名・ご所属）:
${data.name}

■ メールアドレス:
${data.email}
${data.targetUrl ? `\n■ 該当ページURL:\n${data.targetUrl}\n` : ""}
■ お問い合わせ内容詳細:
${data.message}

■ 受付日時:
${timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

内容を確認のうえ、必要に応じてご連絡いたします。
お問い合わせ内容によっては返信までにお時間をいただく場合や、個別に返信できない場合がございます。

今後とも「しょこらの部屋」をよろしくお願いいたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDEAL運営事務局
しょこらの部屋
https://shokoblog.vercel.app/
※このメールは自動送信されています。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

  const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.7; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  <p style="font-size: 15px; margin-top: 0;">${escapeHtml(data.name)} 様</p>

  <p style="font-size: 14px;">
    お問い合わせいただき、ありがとうございます。<br>
    瀧脇笙古さんの非公式ファンサイト「しょこらの部屋」運営事務局です。
  </p>

  <p style="font-size: 14px;">
    以下の内容でお問い合わせを受け付けました。
  </p>

  <div style="background: #faf8f5; border: 1px solid #ebd8c8; border-radius: 6px; padding: 16px; margin: 20px 0;">
    <h3 style="margin-top: 0; font-size: 14px; color: #e07038; border-bottom: 1px dashed #ebd8c8; padding-bottom: 6px;">
      【お問い合わせ内容】
    </h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <tr>
        <td style="padding: 6px 0; color: #666; width: 120px; vertical-align: top;">お問い合わせ種別</td>
        <td style="padding: 6px 0; font-weight: bold; color: #222;">${escapeHtml(data.category)}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #666; vertical-align: top;">お名前</td>
        <td style="padding: 6px 0; color: #222;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #666; vertical-align: top;">メールアドレス</td>
        <td style="padding: 6px 0; color: #222;">${escapeHtml(data.email)}</td>
      </tr>
      ${
        data.targetUrl
          ? `<tr>
        <td style="padding: 6px 0; color: #666; vertical-align: top;">該当ページURL</td>
        <td style="padding: 6px 0; color: #222; word-break: break-all;">${escapeHtml(data.targetUrl)}</td>
      </tr>`
          : ""
      }
      <tr>
        <td style="padding: 6px 0; color: #666; vertical-align: top;">受付日時</td>
        <td style="padding: 6px 0; color: #222;">${escapeHtml(timestamp)}</td>
      </tr>
      <tr>
        <td colspan="2" style="padding-top: 10px; color: #666; border-top: 1px solid #f0e6dc;">お問い合わせ内容詳細:</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 6px 0; white-space: pre-wrap; color: #222; word-break: break-word;">${escapeHtml(data.message)}</td>
      </tr>
    </table>
  </div>

  <p style="font-size: 14px;">
    内容を確認のうえ、必要に応じてご連絡いたします。<br>
    お問い合わせ内容によっては返信までにお時間をいただく場合や、個別に返信できない場合がございます。
  </p>

  <p style="font-size: 14px;">
    今後とも「しょこらの部屋」をよろしくお願いいたします。
  </p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 16px;">

  <div style="font-size: 12px; color: #777;">
    <p style="margin: 2px 0; font-weight: bold; color: #555;">IDEAL運営事務局</p>
    <p style="margin: 2px 0;">しょこらの部屋（非公式ファンサイト）</p>
    <p style="margin: 2px 0;"><a href="https://shokoblog.vercel.app/" style="color: #e07038; text-decoration: none;">https://shokoblog.vercel.app/</a></p>
    <p style="margin: 8px 0 0; color: #999;">※このメールは自動送信されています。</p>
  </div>
</div>
`.trim();

  return await transporter.sendMail({
    from: `"IDEAL運営事務局" <${smtpUser}>`,
    to: data.email,
    replyTo: adminEmail,
    subject,
    text: textContent,
    html: htmlContent,
  });
}
