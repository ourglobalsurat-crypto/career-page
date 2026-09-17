import { ArrowRight, Download, Search, Users } from "lucide-react";
import Link from "next/link";
import {DeleteApplication} from "@/components/delete-application";
import {requireAdmin} from "@/lib/auth";

import { LeadStatusControl } from "@/components/lead-status-control";
import { getLeads } from "@/lib/admin-data";
import { getPublishedQuestionnaire } from "@/lib/questionnaire";
import { leadStatuses, leadStatusLabels } from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(value));
}

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; position?: string; page?: string }> }) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const page = Math.max(1,Math.min(100000,Number.parseInt(params.page || '1') || 1));
  const results = await getLeads({ search: params.q, status: params.status, position:params.position, page });
  const leads = results.slice(0,50); const hasNext = results.length > 50;
  const pageLink = (n:number) => `/gsm-admin/leads?${new URLSearchParams({q:params.q || '',status:params.status || '',position:params.position || '',page:String(n)})}`;

  const form = await getPublishedQuestionnaire();
  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div><span className="admin-page-kicker">APPLICATION MANAGEMENT</span><h1>All applications</h1><p>Review applications, shortlist candidates and track hiring progress.</p></div>
        <Link className="admin-button secondary" href="/api/admin/leads/export" prefetch={false}><Download size={17} /> Export CSV</Link>
      </div>

      <form className="lead-filters" method="get">
        <label><Search size={17} /><input name="q" defaultValue={params.q || ""} placeholder="Search name, phone, email or city" /></label>
        <select name="status" defaultValue={params.status || ""} aria-label="Filter by status"><option value="">All statuses</option>{leadStatuses.map((status) => <option key={status} value={status}>{leadStatusLabels[status]}</option>)}</select>
        <select name="position" defaultValue={params.position || ""} aria-label="Filter by position"><option value="">All positions</option>{form.questions.find(q => q.config.systemRole === "flow_selector")?.options.map(o => <option key={o.id} value={o.id}>{o.label.en}</option>)}</select><button type="submit">Apply filters</button>
        {(params.q || params.status || params.position) && <Link href="/gsm-admin/leads">Clear</Link>}
      </form>

      <section className="admin-card leads-list-card">
        <header><div><span className="admin-page-kicker">RESULTS</span><h2>{leads.length} {leads.length === 1 ? "application" : "applications"}</h2></div><Users size={22} /></header>
        <div className="admin-table-wrap">
          <table className="admin-table leads-table">
            <thead><tr><th>Applicant</th><th>Phone / email</th><th>Position / score</th><th>City</th><th>Source</th><th>Received</th><th>Status</th><th /></tr></thead>
            <tbody>
              {leads.map((lead) => <tr key={lead.id}><td><strong>{lead.name || "Unnamed applicant"}</strong><small>{lead.language.toUpperCase()} response</small></td><td><strong>{lead.phone || "—"}</strong><small>{lead.email || ""}</small></td><td><strong>{lead.positionTitle}</strong><small>{lead.screening ? lead.reviewScore === null ? `${lead.screening.score}/40 · HR review pending` : `${lead.screening.score + lead.reviewScore}/100` : "Not scored"}</small></td><td>{lead.city || "—"}</td><td><span className="source-pill">{lead.source || "direct"}</span></td><td>{formatDate(lead.createdAt)}</td><td><LeadStatusControl id={lead.id} initialStatus={lead.status} /></td><td><div className="application-row-actions"><Link className="table-arrow" href={`/gsm-admin/leads/${lead.id}`} aria-label={`View details for ${lead.name || "lead"}`}><ArrowRight size={16} /></Link>{admin.role !== "viewer" && <DeleteApplication id={lead.id} name={lead.name || "Unnamed applicant"}/>}</div></td></tr>)}
              {!leads.length && <tr><td colSpan={8} className="empty-table"><Users size={24} /> No applications match these filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      <nav className="application-pagination" aria-label="Application pages">{page > 1 && <Link href={pageLink(page-1)}>← Previous</Link>}<span>Page {page}</span>{hasNext && <Link href={pageLink(page+1)}>Next →</Link>}</nav>
    </main>
  );
}
