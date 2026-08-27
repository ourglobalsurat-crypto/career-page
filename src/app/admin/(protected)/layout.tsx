import type { Metadata } from "next";

import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Lead Desk",
  robots: { index: false, follow: false, noarchive: true },
};

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <AdminShell adminEmail={admin.email}>{children}</AdminShell>;
}
