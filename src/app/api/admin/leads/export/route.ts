import { getAdminSession } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { jsonError, safeCsvCell } from "@/lib/security";

export async function GET() {
  if (!(await getAdminSession())) return jsonError("Please sign in again.", 401);

  try {
    const sql = getSql();
    const rows = (await sql.query(
      `SELECT l.id, l.created_at, l.name, l.phone, l.email, l.city, l.language,
              l.status, l.source, l.utm,
              coalesce(jsonb_object_agg(la.question_key, la.answer)
                FILTER (WHERE la.question_key IS NOT NULL), '{}'::jsonb) AS answers
       FROM leads l
       LEFT JOIN lead_answers la ON la.lead_id = l.id
       GROUP BY l.id
       ORDER BY l.created_at DESC`,
    )) as Array<Record<string, unknown>>;

    const headers = [
      "Lead ID",
      "Received at (UTC)",
      "Name",
      "Phone",
      "Email",
      "City",
      "Language",
      "Status",
      "Source",
      "UTM",
      "Answers",
    ];
    const lines = [headers.map(safeCsvCell).join(",")];

    for (const row of rows) {
      lines.push(
        [
          row.id,
          new Date(row.created_at as string | Date).toISOString(),
          row.name,
          row.phone,
          row.email,
          row.city,
          row.language,
          row.status,
          row.source,
          JSON.stringify(row.utm ?? {}),
          JSON.stringify(row.answers ?? {}),
        ]
          .map(safeCsvCell)
          .join(","),
      );
    }

    const date = new Date().toISOString().slice(0, 10);
    return new Response(`\uFEFF${lines.join("\r\n")}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="global-surat-leads-${date}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Lead export failed.", error);
    return jsonError("Could not export leads.", 503);
  }
}
