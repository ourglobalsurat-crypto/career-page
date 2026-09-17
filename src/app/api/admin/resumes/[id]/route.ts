import {getAdminSession} from '@/lib/auth';
import {getSql} from '@/lib/db';
import {documentTextPreview} from '@/lib/document-preview';
import {z} from 'zod';
export const runtime='nodejs';
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}) {
  if(!await getAdminSession())return Response.json({message:'Unauthorized'},{status:401});
  const {id}=await params;
  if(!z.string().uuid().safeParse(id).success)return Response.json({message:'Not found'},{status:404});
  const rows=await getSql().query("SELECT filename,mime_type,encode(data,'hex') AS data FROM resume_uploads WHERE id=$1",[id]) as {filename:string;mime_type:string;data:string}[];
  if(!rows[0])return Response.json({message:'Not found'},{status:404});
  const file=rows[0];const bytes=Buffer.from(file.data,'hex');const query=new URL(request.url).searchParams;
  const image=['image/jpeg','image/png','image/webp'].includes(file.mime_type);const pdf=file.mime_type==='application/pdf';
  if(query.get('metadata')==='1'){
    let preview=pdf?'pdf':image?'image':'download';let text:string|undefined;
    let message='Download this Word document to view its original formatting on your device.';
    if(file.mime_type==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      try{text=await documentTextPreview(bytes);preview=text.trim()?'text':'download';}
      catch{message='A preview is unavailable for this document. You can still download the original file.';}
    }
    return Response.json({filename:file.filename,mimeType:file.mime_type,size:bytes.length,preview,text,message},{headers:{'Cache-Control':'private, no-store'}});
  }
  const inline=query.get('preview')==='1' && (pdf || image);
  const filename=file.filename.replace(/[^a-zA-Z0-9._ -]/g,'_');
  return new Response(bytes,{headers:{'Content-Type':file.mime_type,'Content-Disposition':`${inline?'inline':'attachment'}; filename="${filename}"`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','X-Frame-Options':'SAMEORIGIN','Content-Security-Policy':"default-src 'self'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'"}});
}
