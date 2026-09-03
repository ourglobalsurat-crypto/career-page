import "server-only";

import { createHash, createHmac } from "node:crypto";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import { growthPaths, locales, type GrowthPath, type Locale } from "@/lib/types";

const COOKIE_NAME = "gs_lead_receipt";
const RECEIPT_ISSUER = "global-surat-leads";
const RECEIPT_AUDIENCE = "global-surat-thank-you";
const RECEIPT_TTL_SECONDS = 15 * 60;
const receiptGrowthPaths: readonly ReceiptGrowthPath[] = [...growthPaths, "general"];

export type ReceiptGrowthPath = GrowthPath | "general";

type ReceiptClaims = {
  locale: Locale;
  growthPath: ReceiptGrowthPath;
};

export type LeadReceipt = ReceiptClaims & {
  leadId: string;
  eventId: string;
};

function receiptKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters.");
  }

  return createHash("sha256")
    .update("global-surat:lead-receipt:v1\0")
    .update(secret)
    .digest();
}

function eventIdForLead(leadId: string) {
  return createHmac("sha256", receiptKey())
    .update("global-surat:generate-lead:v1\0")
    .update(leadId)
    .digest("base64url")
    .slice(0, 32);
}

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

function isGrowthPath(value: unknown): value is ReceiptGrowthPath {
  return typeof value === "string" && receiptGrowthPaths.includes(value as ReceiptGrowthPath);
}

async function createLeadReceipt(
  leadId: string,
  locale: Locale,
  growthPath: ReceiptGrowthPath,
) {
  return new SignJWT({ locale, growthPath } satisfies ReceiptClaims)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(RECEIPT_ISSUER)
    .setAudience(RECEIPT_AUDIENCE)
    .setSubject(leadId)
    .setIssuedAt()
    .setExpirationTime(`${RECEIPT_TTL_SECONDS}s`)
    .sign(receiptKey());
}

export async function issueLeadReceipt(
  leadId: string,
  locale: Locale,
  growthPath: ReceiptGrowthPath = "general",
) {
  const token = await createLeadReceipt(leadId, locale, growthPath);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/thank-you",
    maxAge: RECEIPT_TTL_SECONDS,
    priority: "high",
  });
}

export async function verifyLeadReceipt(): Promise<LeadReceipt | null> {
  try {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, receiptKey(), {
      algorithms: ["HS256"],
      issuer: RECEIPT_ISSUER,
      audience: RECEIPT_AUDIENCE,
      clockTolerance: 5,
    });

    if (
      typeof payload.sub !== "string" ||
      !isLocale(payload.locale) ||
      !isGrowthPath(payload.growthPath)
    ) {
      return null;
    }

    return {
      leadId: payload.sub,
      locale: payload.locale,
      growthPath: payload.growthPath,
      eventId: eventIdForLead(payload.sub),
    };
  } catch {
    return null;
  }
}
