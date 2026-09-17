import dotenv from 'dotenv';
import {neon} from '@neondatabase/serverless';
dotenv.config({path:'.env.local',quiet:true});
const sql=neon(process.env.DATABASE_URL);
if(!new URL(process.env.DATABASE_URL).pathname.endsWith('/global_surat_careers')) throw new Error('Not the isolated careers database');
const rows=await sql.query("SELECT id,submission_token FROM leads WHERE name LIKE 'QA CAREERS %' AND email='qa@example.com'");
for(const row of rows) {
 await sql.query('DELETE FROM audit_log WHERE entity_id=$1',[row.id]);
 await sql.query('DELETE FROM leads WHERE id=$1',[row.id]);
 await sql.query('DELETE FROM resume_uploads WHERE submission_token=$1',[row.submission_token]);
}
console.log(`Removed ${rows.length} synthetic career applications.`);
