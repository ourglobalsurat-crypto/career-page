# Global Surat lead landing page

A mobile-first Meta ads landing page and lead desk for Global Surat. The public experience uses plain Gujlish, Hinglish, or English and guides visitors through one large, simple question at a time. Every question is managed from the protected admin panel and stored in Neon Postgres.

## What is included

- Public landing pages at `/` and `/contact`
- Gujlish, Hinglish, and English language switching
- One-question-at-a-time lead form with progress, large tap targets, validation, consent, and a WhatsApp fallback
- UTM, source, campaign, referrer, language, and questionnaire-version capture
- Authenticated admin dashboard at `/admin`
- Lead search, filters, status management, notes, detail view, and CSV export
- Draft-and-publish questionnaire builder with add, edit, hide, delete, and reorder controls
- Short text, long text, email, phone, number, date, dropdown, single choice, checkboxes, yes/no, and rating question types
- Versioned forms and answer snapshots, so old leads keep the exact question text and options they answered
- Neon Postgres persistence, server-side validation, signed sessions, password hashing, rate limits, honeypot protection, idempotent submissions, and security headers

## Local setup

Requires Node.js 20.9 or newer.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set the values. Use the pooled Neon URL (`-pooler` hostname) for `DATABASE_URL`. If available, use a direct Neon URL for `DATABASE_URL_UNPOOLED`; schema setup prefers it.

3. Create the schema, seed the editable form, and create/update the admin account:

   ```bash
   npm run db:setup
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` for the landing page or `http://localhost:3000/admin` for the lead desk.

The setup script is idempotent. Running it again updates the configured admin password without deleting leads or published form data.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Pooled Neon Postgres connection used by the web application |
| `DATABASE_URL_UNPOOLED` | Optional direct Neon connection used for schema setup |
| `ADMIN_EMAIL` | Initial admin login email |
| `ADMIN_PASSWORD` | Initial admin login password; use a strong unique value |
| `SESSION_SECRET` | Random secret of at least 32 characters used to sign admin sessions |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits-only WhatsApp number including country code |
| `NEXT_PUBLIC_CONTACT_PHONE` | Display phone number |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Display contact email |

Never commit `.env.local`. The repository intentionally tracks only `.env.example`.

## Questionnaire workflow

Edits are saved to a draft and do not immediately affect live visitors. Select **Publish changes** when the draft is ready. Publishing archives the old version, makes the draft live atomically, and creates a new editable draft. Leads submitted from a recently archived form remain accepted for 24 hours so visitors already filling the form are not lost.

Question keys should stay stable once they are used for important contact fields. The default `full_name`, `phone`, `email`, and `city` keys are also copied into searchable lead columns.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

For the browser flow, start the app and run:

```bash
QA_BASE_URL=http://localhost:3000 npm run qa:e2e
```

On Windows PowerShell:

```powershell
$env:QA_BASE_URL = "http://localhost:3000"
npm run qa:e2e
```

The browser test submits and removes a synthetic lead, verifies admin login, updates a lead, creates and deletes a draft question, checks 1440/390/320 layouts, and writes ignored screenshots to `artifacts/qa`.

## Deployment

Vercel or another Node-compatible Next.js host can run the application. Add every environment variable above in the host, run `npm run db:setup` once against the production database, and then deploy with `npm run build`.

The optimized supplied logo and team photo live in `public/assets`; the large source originals are intentionally excluded from Git.

Before production traffic, rotate any database password that has been shared in chat or another non-secret channel and update the deployment environment variable.
