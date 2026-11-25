"use client";

import React, { useEffect, useRef, useState } from "react";
import { QuizDifficulty, RankInfo } from "@/types/quiz";
import { Download, Sparkles, Image as ImageIcon, Check } from "lucide-react";

interface QuizCertificateCanvasProps {
  difficulty: QuizDifficulty;
  score: number;
  total: number;
  rankInfo: RankInfo;
}

export const QuizCertificateCanvas: React.FC<QuizCertificateCanvasProps> = ({
  difficulty,
  score,
  total,
  rankInfo,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const difficultyLabel =
    difficulty === "easy"
      ? "初級コース"
      : difficulty === "normal"
      ? "中級コース"
      : "上級コース";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    // 1. 背景（温かみのあるクリームグラデーション）
    const bgGrad = ctx.createLinearGradient(0, 0, size, size);
    bgGrad.addColorStop(0, "#FFFDF7");
    bgGrad.addColorStop(0.5, "#FFF9ED");
    bgGrad.addColorStop(1, "#FFF4DA");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, size, size);

    // 2. 外枠・装飾ボーダー
    // 外枠二重線
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#F6C744";
    ctx.strokeRect(40, 40, size - 80, size - 80);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#E99A32";
    ctx.strokeRect(60, 60, size - 120, size - 120);

    // 四隅のコーナー装飾
    const corners = [
      [80, 80],
      [size - 80, 80],
      [80, size - 80],
      [size - 80, size - 80],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = "#E99A32";
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#F6C744";
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. 上部ヘッダー（サブタイトル・サイト名）
    ctx.textAlign = "center";
    ctx.fillStyle = "#8C694D";
    ctx.font = "bold 28px 'Courier New', monospace";
    ctx.fillText("SHOKO TAKIWAKI UNOFFICIAL FAN SITE", size / 2, 130);

    ctx.fillStyle = "#5C4533";
    ctx.font = "bold 32px 'Hiragino Maru Gothic ProN', 'Zen Maru Gothic', sans-serif";
    ctx.fillText("しょこらの部屋 公認", size / 2, 175);

    // 4. メインタイトル「しょこら検定 認定証」
    ctx.fillStyle = "#191919";
    ctx.font = "900 68px 'Hiragino Maru Gothic ProN', 'Zen Maru Gothic', sans-serif";
    ctx.fillText("しょこら検定 認定証", size / 2, 260);

    // タイトル下のゴールドライン
    ctx.fillStyle = "#F6C744";
    ctx.fillRect(size / 2 - 160, 285, 320, 6);

    // 5. 受験コース表示
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.roundRect(size / 2 - 180, 320, 360, 56, 28);
    ctx.fill();
    ctx.strokeStyle = "#F0E4CE";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#5C4533";
    ctx.font = "bold 26px 'Hiragino Maru Gothic ProN', sans-serif";
    ctx.fillText(`【 ${difficultyLabel} 挑戦 】`, size / 2, 358);

    // 6. 中央 認定ランクカード
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(140, 410, size - 280, 340, 36);
    ctx.fill();
    ctx.strokeStyle = "#F6C744";
    ctx.lineWidth = 6;
    ctx.stroke();

    // ランク名
    ctx.fillStyle = rankInfo.color;
    ctx.font = "900 76px 'Hiragino Maru Gothic ProN', 'Zen Maru Gothic', sans-serif";
    ctx.fillText(rankInfo.title, size / 2, 515);

    // バッジ
    ctx.fillStyle = rankInfo.color;
    ctx.beginPath();
    ctx.roundRect(size / 2 - 80, 545, 160, 38, 19);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 20px 'Courier New', monospace";
    ctx.fillText(`[ ${rankInfo.badge} ]`, size / 2, 571);

    // 正解数
    ctx.fillStyle = "#191919";
    ctx.font = "bold 44px 'Hiragino Maru Gothic ProN', sans-serif";
    ctx.fillText(`得点：${score} / ${total} 問正解`, size / 2, 645);

    // パーセンテージ
    const percent = Math.round((score / total) * 100);
    ctx.fillStyle = "#8C694D";
    ctx.font = "bold 24px 'Courier New', monospace";
    ctx.fillText(`( 正答率 ${percent}% )`, size / 2, 695);

    // 7. メッセージ
    ctx.fillStyle = "#5C4533";
    ctx.font = "bold 24px 'Hiragino Maru Gothic ProN', sans-serif";
    // 1行または2行で描画
    if (rankInfo.message.length > 30) {
      const line1 = rankInfo.message.slice(0, 28);
      const line2 = rankInfo.message.slice(28);
      ctx.fillText(line1, size / 2, 800);
      ctx.fillText(line2, size / 2, 835);
    } else {
      ctx.fillText(rankInfo.message, size / 2, 815);
    }

    // 8. フッター（認定日・URL・ハッシュタグ）
    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

    ctx.fillStyle = "#8C694D";
    ctx.font = "bold 22px 'Courier New', monospace";
    ctx.fillText(`CERTIFIED DATE: ${dateStr}`, size / 2, 910);

    ctx.fillStyle = "#5C4533";
    ctx.font = "bold 20px 'Courier New', monospace";
    ctx.fillText("https://shokoblog.vercel.app/quiz  #しょこら検定", size / 2, 950);

    // DataURLの生成
    try {
      const url = canvas.toDataURL("image/png");
      setDataUrl(url);
    } catch (e) {
      // fallback
    }
  }, [difficulty, score, total, rankInfo, difficultyLabel]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `shokora-kentei-${difficulty}-${rankInfo.rank}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-4">
      {/* 隠しCanvas (1080x1080 実寸生成) */}
      <canvas ref={canvasRef} className="hidden" />

      {/* プレビュー表示 */}
      {dataUrl ? (
        <div className="space-y-3">
          <div className="relative mx-auto max-w-[340px] sm:max-w-[400px] aspect-square rounded-2xl overflow-hidden border-2 border-[#F6C744] shadow-md bg-white">
            <img
              src={dataUrl}
              alt="しょこら検定 認定証"
              className="w-full h-full object-cover select-none"
            />
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#191919]/80 text-[#F6C744] text-[10px] font-mono font-bold rounded-full">
              1080 × 1080
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-6 py-3 bg-[#E99A32] hover:bg-[#D97706] text-white font-maru font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>認定証画像を保存 (1080×1080)</span>
            </button>
          </div>
          <p className="text-[11px] text-[#8C694D] text-center font-sans">
            ※スマートフォンでは画像を長押ししても保存できます。
          </p>
        </div>
      ) : (
        <div className="p-8 text-center text-[#8C694D] font-mono text-xs">
          認定証画像を生成中...
        </div>
      )}
    </div>
  );
};
