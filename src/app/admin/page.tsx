import { guardLocalOnlyPage } from "@/lib/admin-guard";
import { AdminView } from "@/components/views/AdminView";

export default function AdminPage() {
  guardLocalOnlyPage();
  return <AdminView />;
}
