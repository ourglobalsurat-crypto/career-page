import { z } from "zod";

import { createAdminSession, validateAdminCredentials } from "@/lib/auth";
import { rateLimit, requestFingerprint } from "@/lib/rate-limit";
import { isSameOrigin, jsonError } from "@/lib/security";

export const runtime = "nodejs";

const loginSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
});

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError("Request origin was not accepted.", 403);

  const fingerprint = requestFingerprint(request);
  if (!rateLimit(`admin-login:${fingerprint}`, 8, 15 * 60 * 1000).allowed) {
    return jsonError("Too many login attempts. Please wait and try again.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid login request.", 400);
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return jsonError("Enter a valid email and password.", 400);

  try {
    const admin = await validateAdminCredentials(parsed.data.email, parsed.data.password);
    if (!admin) return jsonError("Email or password is incorrect.", 401);

    await createAdminSession(admin);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed.", error);
    return jsonError("Admin login is temporarily unavailable.", 503);
  }
}
