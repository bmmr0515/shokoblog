import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isLocalEnvironment, createLocalOnlyApiResponse } from "@/lib/admin-guard";
import { PendingContentItem } from "@/types/blog";
import { execSync } from "child_process";

const PENDING_FILE_PATH = path.resolve(process.cwd(), "src/data/pending-content.json");

function loadPendingItems(): PendingContentItem[] {
  if (!fs.existsSync(PENDING_FILE_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(PENDING_FILE_PATH, "utf-8")) as PendingContentItem[];
  } catch (err) {
    return [];
  }
}

function savePendingItems(items: PendingContentItem[]) {
  fs.writeFileSync(PENDING_FILE_PATH, JSON.stringify(items, null, 2), "utf-8");
}

// 候補一覧取得
export async function GET() {
  if (!isLocalEnvironment()) {
    return createLocalOnlyApiResponse();
  }
  const items = loadPendingItems();
  return NextResponse.json({ success: true, items });
}

// クローラー実行 または ステータス更新
export async function POST(req: NextRequest) {
  if (!isLocalEnvironment()) {
    return createLocalOnlyApiResponse();
  }

  try {
    const body = await req.json();
    const { action, itemId, status } = body;

    // A. クローラー実行 (新着候補を取得)
    if (action === "fetch") {
      execSync("npx tsx scripts/fetch-pending-content.ts", { cwd: process.cwd(), encoding: "utf-8" });
      const updatedItems = loadPendingItems();
      return NextResponse.json({
        success: true,
        message: "新着候補の取得が完了しました。",
        items: updatedItems,
      });
    }

    // B. 個別アイテムのステータス更新 (approved / rejected / pending)
    if (action === "update-status" && itemId && status) {
      const items = loadPendingItems();
      const target = items.find((i) => i.id === itemId);
      if (target) {
        target.status = status;
        savePendingItems(items);
        return NextResponse.json({ success: true, items });
      }
      return NextResponse.json({ success: false, error: "指定IDの候補が見つかりません。" }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: "無効なアクションです。" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "処理中にエラーが発生しました。" }, { status: 500 });
  }
}
