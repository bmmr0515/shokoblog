import { guardLocalOnlyPage } from "@/lib/admin-guard";
import { AdminContentView } from "@/components/views/AdminContentView";

export default function AdminContentPage() {
  // 本番環境（Vercel デプロイ等）では 404 を返却して完全遮断
  guardLocalOnlyPage();

  return <AdminContentView />;
}
