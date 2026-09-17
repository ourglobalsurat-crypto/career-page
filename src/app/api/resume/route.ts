import crypto from 'node:crypto';
import sharp from 'sharp';
import { z } from 'zod';
import { getSql } from '@/lib/db';
import { isSameOrigin, jsonError } from '@/lib/security';
import { rateLimit, requestFingerprint } from '@/lib/rate-limit';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  if(!isSameOrigin(request)) return jsonError('Invalid request origin.',403);
  if(!rateLimit(`resume:${requestFingerprint(request)}`,15,10*60*1000).allowed) return jsonError('Too many uploads. Please try later.',429);
  if(Number(request.headers.get('content-length') || 0) > 5*1024*1024 + 8192) return jsonError('Maximum file size is 5 MB.',413);
  try {
    // Limit streamed bodies too, including requests without Content-Length.
    const reader = request.body?.getReader(); if(!reader) return jsonError('Missing file.',400);
    const chunks: Uint8Array[] = []; let total = 0;
    while(true) { const {done,value} = await reader.read(); if(done) break; total += value.length;
      if(total > 5*1024*1024+8192) { await reader.cancel(); return jsonError('Maximum file size is 5 MB.',413); } chunks.push(value); }
    const form = await new Response(Buffer.concat(chunks),{headers:{'Content-Type':request.headers.get('content-type') || ''}}).formData();
    const file = form.get('resume'); const token = form.get('submissionToken');
    const kind = form.get('kind') || 'resume';
    if(kind !== 'resume' && kind !== 'image') return jsonError('Unsupported upload type.',400);
    if(!(file instanceof File) || !z.string().uuid().safeParse(token).success || file.size === 0 || file.size > 5*1024*1024) return jsonError('Upload a résumé up to 5 MB.',400);
    let bytes = Buffer.from(await file.arrayBuffer()); const extension = file.name.split('.').pop()?.toLowerCase();
    let filename = file.name.replace(/[^a-zA-Z0-9._ -]/g,'_').slice(0,150);
    let mime: string;
    if(kind === 'image') {
      if(!['jpg','jpeg','png','webp'].includes(extension || '')) return jsonError('Choose a JPG, PNG or WebP image.',400);
      try {
        const image=sharp(bytes,{limitInputPixels:25000000,animated:false});
        const meta=await image.metadata();
        if(!['jpeg','png','webp'].includes(meta.format || '') || !meta.width || !meta.height || (meta.pages ?? 1)>1) return jsonError('Choose a valid, non-animated JPG, PNG or WebP image.',400);
        const format=meta.format as 'jpeg'|'png'|'webp';
        // Re-encode to verify the full image and remove private EXIF metadata.
        bytes=Buffer.from(await image.rotate().toFormat(format).toBuffer());
        if(bytes.length>5*1024*1024)return jsonError('The processed image exceeds 5 MB. Please choose a smaller image.',413);
        mime=`image/${format}`;filename=filename.replace(/\.[^.]+$/, '')+`.${format === 'jpeg' ? 'jpg' : format}`;
      }catch{return jsonError('This image could not be read. Choose a valid image under 25 megapixels.',400);}
    } else {
    const valid = extension === 'pdf' ? bytes.subarray(0,5).toString() === '%PDF-'
      : extension === 'doc' ? bytes.subarray(0,8).toString('hex') === 'd0cf11e0a1b11ae1'
      : extension === 'docx' ? bytes.subarray(0,4).toString('hex') === '504b0304' && bytes.includes(Buffer.from('word/')) : false;
    if(!valid) return jsonError('Choose a valid PDF, DOC or DOCX file.',400);
    mime = extension === 'pdf' ? 'application/pdf' : extension === 'doc' ? 'application/msword' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    const id = crypto.randomUUID();
    await getSql().query('INSERT INTO resume_uploads (id,submission_token,filename,mime_type,data) VALUES ($1,$2,$3,$4,decode($5,\'hex\'))',[id,token,filename,mime,bytes.toString('hex')]);
    return Response.json({ok:true,id,filename,size:bytes.length},{status:201});
  } catch { return jsonError('Could not upload. Please try again.',503); }
}
