export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const incoming = new URL(origin);
    const url = new URL(request.url);
    // Next can normalize its internal URL to localhost even when the browser
    // requested 127.0.0.1. The Host header preserves the actual public host.
    return incoming.protocol === url.protocol && incoming.host === (request.headers.get('host') || url.host);
  } catch { return false; }
}

export function jsonError(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

export function safeCsvCell(value: unknown) {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
