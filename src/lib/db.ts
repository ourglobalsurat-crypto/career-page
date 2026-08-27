import "server-only";

import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!client) {
    client = neon(connectionString, {
      fetchOptions: { cache: "no-store" },
    });
  }

  return client;
}
