import { clearAdminSession, getAdminSession } from "@/lib/auth";
import { isSameOrigin, jsonError } from "@/lib/security";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError("Request origin was not accepted.", 403);
  if (!(await getAdminSession())) return jsonError("You are not signed in.", 401);
  await clearAdminSession();
  return Response.json({ ok: true });
}
