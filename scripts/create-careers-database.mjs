import fs from 'node:fs';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
const file = '.env.local';
const original = fs.readFileSync(file, 'utf8');
const env = dotenv.parse(original);
const url = new URL(env.DATABASE_URL);
const database = 'global_surat_careers';
if (url.pathname !== `/${database}`) {
  const sql = neon(env.DATABASE_URL.replace('-pooler.', '.'));
  const found = await sql.query('SELECT datname FROM pg_database WHERE datname=$1', [database]);
  if (!found.length) await sql.query('CREATE DATABASE global_surat_careers');
  url.pathname = `/${database}`;
  if (!fs.existsSync('.env.original-leads.local')) fs.writeFileSync('.env.original-leads.local', original);
  fs.writeFileSync(file, original.replace(/^DATABASE_URL=.*$/m, `DATABASE_URL=${url.toString()}`));
}
console.log('Separate careers database ready; local connection updated. Original connection retained in ignored .env.original-leads.local.');
