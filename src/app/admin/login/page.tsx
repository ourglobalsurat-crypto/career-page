import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="admin-login-page">
      <section className="admin-login-visual">
        <Image src="/assets/global-surat-team.webp" alt="Global Surat team" fill sizes="(max-width: 850px) 0px, 50vw" priority />
        <div className="admin-login-overlay" />
        <div className="admin-login-quote">
          <span>GLOBAL SURAT · LEAD DESK</span>
          <blockquote>Every enquiry deserves a clear, human follow-up.</blockquote>
          <p>Secure internal access for the Global Surat team.</p>
        </div>
      </section>
      <section className="admin-login-panel">
        <Link className="admin-login-logo" href="/" aria-label="Back to landing page"><Image src="/assets/global-surat-logo.png" alt="Global Surat" width={190} height={102} priority /></Link>
        <div className="admin-login-card">
          <span className="admin-page-kicker">PRIVATE ADMIN AREA</span>
          <h1>Welcome back.</h1>
          <p>Sign in to review leads and update the questionnaire.</p>
          <AdminLoginForm />
        </div>
        <small>Protected by a secure, expiring session.</small>
      </section>
    </main>
  );
}
