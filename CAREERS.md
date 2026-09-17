# Global Surat careers

A career landing page using the original Global Surat design, with a role-based application form and a protected hiring admin panel.

## Local access

- Careers: http://127.0.0.1:3000
- Admin: http://127.0.0.1:3000/admin
- Sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the ignored `.env.local` file. Existing local credentials were retained.

Run `npm run dev -- --hostname 127.0.0.1` to start the app again. Nothing is deployed or pushed to GitHub by this setup.

## Database and MCP

Neon MCP is configured at `https://mcp.neon.tech/mcp` and authenticated through OAuth. The app itself uses the existing Neon serverless driver; MCP is a development tool, not a runtime dependency.

The separate `global_surat_careers` database was created inside the existing Neon project. `.env.local` points to it. The original lead database connection is backed up in the ignored `.env.original-leads.local`; the original lead data was not migrated or modified.

On a fresh careers database, run `npm run db:setup`. This creates the tables, seeds the questionnaire, and configures the admin using environment values. Do not point this command at a different production database. Schema setup uses the direct Neon endpoint.

## Positions and applications

There are 11 seeded positions: Performance Marketer, Lead Generation Expert, D2C Growth Expert, SEO Expert / SEO Specialist, Manager / Senior Manager, Influencer Marketing Executive, Video Editor, Social Media Manager, Shopify Developer, Graphic Designer, and Sales Executive.

Applicants select a position first and answer that role's questions, then provide contact details, employment status, salary, availability, Surat-office preference, motivation and résumé. Contact fields, salaries, links, choices, ratings and answer lengths are validated both in the browser and on the server. Portfolio links are mandatory for Graphic Designer and Video Editor. The seed includes the supplied practical questions, multi-select questions, Shopify technology ratings, project URLs, and Sales Executive questions.

The career page and question editor are English-only. The total question count and progress bar appear after a position is selected, using only that role's questions and the shared application fields.

## Admin workflow

1. Open **Positions & questions → Manage positions** to add, rename or remove a position. Removing a position closes it when published; historical applications retain their original title and question snapshots. At least one position must remain open.
2. Add or edit questions and select the relevant **Position**, or select **All positions** for shared questions. Filter the builder by position for easier editing. Each open position needs at least one active question.
3. **Publish changes** makes the draft live and creates the next editable draft. Applicants using an older form must refresh before submitting.
4. Open **Applications** to search, filter by position or status, paginate, inspect answers, download résumés, add notes and export CSV.
5. Use New, Interview, Shortlisted, Hired and Archived statuses to track the hiring process. Database status codes retain the legacy mapping (`new`, `contacted`, `qualified`, `won`, `not_interested`).

## Screening

An automatic **preliminary score out of 40** summarizes self-reported experience (20), availability (10), and whether evidence was supplied (10). Evidence presence is not evidence quality. HR assigns the remaining **60 points** after evaluating practical knowledge (30) and verified results / portfolio (30), with required assessment notes.

Only after HR assessment is the total shown out of 100: 80+ Strong candidate, 60–79 HR review, 40–59 Low priority, below 40 Consider archiving. No application is automatically rejected. Surat-office concerns and Shopify junior-level indicators are flagged for discussion. New roles can be created without code; the preliminary score treats the first role-specific single-choice question as an ascending experience scale, so place an appropriate experience question first or adjust `src/lib/screening.ts` for a custom rubric.

## Résumé handling

PDF, DOC and DOCX files up to 5 MB are validated and stored privately in Neon as binary data. An upload is bound to its application submission token. Only authenticated admins can preview or download files, with no-store headers. Files are not placed in `public/`. Unsubmitted uploads remain private; define a retention and cleanup schedule before deploying publicly.

## Validation

```sh
npm run typecheck
npm run lint
npm run build
npm run qa:e2e
```

Browser integration tests require the local server on port 3000. They use installed Edge on Windows, or Playwright Chromium elsewhere. Tests create and remove synthetic applications; the browser test also publishes the restored questionnaire draft. Run them against the isolated development database only. Screenshots and the integration summary are in ignored `artifacts/`.

The application is running locally with a cloud Neon database. Production hosting, résumé retention policy, translated hiring copy, and any custom screening rubric remain separate configuration choices.

## Attachment controls and application deletion

- Applicants see a prominent upload area with drag-and-drop, a choose-file button, accepted formats, size limit, progress, and change/remove controls. Navigation waits for uploads to finish.
- In Admin > Questionnaire, add a question and select **Image upload** as the answer type. Choose the position, required/optional setting, save, and publish. Images support JPG, PNG and WebP up to 5 MB and 25 megapixels. Images are decoded and re-encoded to validate them and remove EXIF metadata.
- Application details offer private PDF and image previews, DOCX text previews, and original-file downloads. Older DOC files use download only. DOCX archive expansion is bounded before text extraction; previews never use third-party services.
- Owners and editors can delete applications from the list or detail page after confirming. Deletion removes answers, notes, and all files associated with that application token in one database statement, retaining an audit event. Viewers cannot delete.
- Targeted verification: set QA_BASE_URL to http://127.0.0.1:5000 and run `npx tsx scripts/qa-attachments.ts`. This creates and removes a synthetic application without publishing questionnaire changes.
