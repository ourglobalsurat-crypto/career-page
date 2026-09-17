import dotenv from 'dotenv';
import {neon} from '@neondatabase/serverless';
dotenv.config({path:'.env.local',quiet:true});
const sql = neon(process.env.DATABASE_URL!.replace('-pooler.','.'));
async function main() {
  await sql.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS position_key text,
    ADD COLUMN IF NOT EXISTS position_title text,
    ADD COLUMN IF NOT EXISTS screening jsonb,
    ADD COLUMN IF NOT EXISTS review_score integer CHECK(review_score BETWEEN 0 AND 60)`);
  await sql.query('CREATE INDEX IF NOT EXISTS leads_position_idx ON leads(position_key,created_at DESC)');
  console.log('Careers screening and position columns ready.');
}
main().catch(() => {console.error('Careers schema setup failed.');process.exitCode=1;});
