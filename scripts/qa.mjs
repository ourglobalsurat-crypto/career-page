import path from "node:path";
import { mkdir } from "node:fs/promises";

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { chromium } from "playwright";

dotenv.config({ path: path.resolve(".env.local"), quiet: true });

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:3000";
const outputDir = path.resolve("artifacts", "qa");
const errors = [];
let createdLeadId = null;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function watchPage(page, label) {
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`${label} console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`${label} page: ${error.message}`));
}

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.platform === "win32" ? { channel: "msedge" } : {}),
});

try {
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 });
  const page = await desktopContext.newPage();
  watchPage(page, "desktop");

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert((await page.title()).includes("Global Surat"), "Landing page title is incorrect.");
  assert(await page.getByRole("heading", { name: /તમારા બિઝનેસ માટે વધુ/ }).isVisible(), "Gujarati hero heading is not visible.");
  assert(await page.getByRole("heading", { name: /અત્યારે તમારા બિઝનેસને/ }).isVisible(), "Gujarati questionnaire is not visible above the fold.");
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Desktop page has horizontal overflow.");
  assert(await page.evaluate(() => {
    const header = document.querySelector(".site-header")?.getBoundingClientRect();
    const logo = document.querySelector(".brand-link img")?.getBoundingClientRect();
    return Boolean(header && logo && logo.top >= header.top && logo.bottom <= header.bottom);
  }), "Desktop logo is clipped by the navbar.");
  await page.screenshot({ path: path.join(outputDir, "landing-header-desktop.png"), fullPage: false });
  await page.screenshot({ path: path.join(outputDir, "landing-desktop.png"), fullPage: true });

  await page.getByRole("button", { name: "हिन्दी" }).click();
  assert(await page.getByRole("heading", { name: /अपने बिज़नेस के लिए ज़्यादा/ }).isVisible(), "Hindi hero heading is not visible.");
  assert(await page.getByRole("heading", { name: /अभी आपके बिज़नेस को/ }).isVisible(), "Hindi questionnaire is not visible.");
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Hindi page has horizontal overflow.");
  await page.screenshot({ path: path.join(outputDir, "landing-hindi.png"), fullPage: false });

  await page.getByRole("button", { name: "English" }).click();
  await page.getByRole("button", { name: /More calls & WhatsApp enquiries/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: /I provide a service/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: /Running, but growth is slow/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: "₹20,000 – ₹50,000" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: "Within 30 days" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Type your full name").fill("QA Test Lead");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("10-digit mobile number").fill("9876543210");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Example: Surat").fill("Surat");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder(/We get enquiries/).fill("Automated end-to-end QA submission.");
  await page.locator(".consent-row input").check();

  const leadResponsePromise = page.waitForResponse((response) => response.url().endsWith("/api/leads") && response.request().method() === "POST");
  await page.getByRole("button", { name: /Send my details/ }).click();
  const leadResponse = await leadResponsePromise;
  const leadResult = await leadResponse.json();
  assert(leadResponse.status() === 201 && leadResult.ok, `Lead submission failed with ${leadResponse.status()}.`);
  createdLeadId = leadResult.leadId;
  await page.getByRole("heading", { name: /we’ve got it/ }).waitFor();
  await page.screenshot({ path: path.join(outputDir, "landing-success.png"), fullPage: false });

  await page.goto(`${baseUrl}/admin/login`, { waitUntil: "networkidle" });
  await page.locator("#admin-email").fill(process.env.ADMIN_EMAIL);
  await page.locator("#admin-password").fill(process.env.ADMIN_PASSWORD);
  await page.getByRole("button", { name: /Open lead desk/ }).click();
  await page.waitForURL(`${baseUrl}/admin`, { timeout: 15000 });
  await page.getByRole("heading", { name: "Lead pulse" }).waitFor();
  assert(await page.getByText("QA Test Lead", { exact: true }).isVisible(), "Submitted lead did not appear in the dashboard.");
  await page.screenshot({ path: path.join(outputDir, "admin-dashboard.png"), fullPage: true });

  await page.getByRole("link", { name: "View QA Test Lead" }).click();
  await page.waitForURL(new RegExp(`/admin/leads/${createdLeadId}$`));
  await page.locator(".lead-status-select").selectOption("qualified");
  await page.getByLabel("Add an internal note").fill("Automated QA note: lead update works.");
  await page.getByRole("button", { name: /Save note/ }).click();
  await page.getByText(/lead update works/).waitFor();

  await page.goto(`${baseUrl}/admin/questionnaire`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Questionnaire" }).waitFor();
  await page.getByRole("button", { name: "Add question" }).click();
  await page.getByLabel("Question key").fill("qa_temporary_question");
  const questionTextArea = page.locator(".editor-copy-fields label").filter({ hasText: "Question text" }).locator("textarea");
  assert((await questionTextArea.count()) === 1, "Question text editor was not unique.");
  await questionTextArea.fill("QA temporary question");
  await page.getByRole("button", { name: /Save to draft/ }).click();
  await page.locator(".question-editor").waitFor({ state: "detached" });
  const tempRow = page.locator(".builder-row").filter({ hasText: "QA temporary question" });
  await tempRow.waitFor();
  page.once("dialog", (dialog) => dialog.accept());
  await tempRow.getByRole("button", { name: "Delete question" }).click();
  await page.getByText("Question deleted from the draft.").waitFor();
  await page.screenshot({ path: path.join(outputDir, "admin-questionnaire.png"), fullPage: true });

  await desktopContext.close();

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const mobile = await mobileContext.newPage();
  watchPage(mobile, "mobile");
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "390px page has horizontal overflow.");
  const mobileOrder = await mobile.evaluate(() => {
    const form = document.querySelector(".form-column")?.getBoundingClientRect().top ?? 9999;
    const copy = document.querySelector(".hero-copy")?.getBoundingClientRect().top ?? 9999;
    return { form, copy };
  });
  assert(mobileOrder.form < mobileOrder.copy, "Mobile form is not placed before the long hero copy.");
  assert(await mobile.evaluate(() => {
    const header = document.querySelector(".site-header")?.getBoundingClientRect();
    const logo = document.querySelector(".brand-link img")?.getBoundingClientRect();
    return Boolean(header && logo && logo.top >= header.top && logo.bottom <= header.bottom);
  }), "Mobile logo is clipped by the navbar.");
  await mobile.screenshot({ path: path.join(outputDir, "landing-header-mobile.png"), fullPage: false });
  await mobile.screenshot({ path: path.join(outputDir, "landing-mobile-390.png"), fullPage: true });
  await mobileContext.close();

  const narrowContext = await browser.newContext({ viewport: { width: 320, height: 740 }, deviceScaleFactor: 1 });
  const narrow = await narrowContext.newPage();
  watchPage(narrow, "narrow");
  await narrow.goto(baseUrl, { waitUntil: "networkidle" });
  assert(await narrow.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "320px page has horizontal overflow.");
  await narrowContext.close();

  assert(errors.length === 0, `Browser errors:\n${errors.join("\n")}`);
  console.log("Browser QA passed: public flow, Neon persistence, admin login, lead updates, builder CRUD, and 1440/390/320 layouts.");
  console.log(`Screenshots: ${outputDir}`);
} finally {
  await browser.close();

  const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
  if (sql) {
    if (createdLeadId) {
      await sql.query(`DELETE FROM leads WHERE id = $1 AND name = 'QA Test Lead'`, [createdLeadId]);
    }
    await sql.query(
      `DELETE FROM questions
       WHERE question_key = 'qa_temporary_question'
         AND version_id IN (SELECT id FROM form_versions WHERE status = 'draft')`,
    );
  }
}
