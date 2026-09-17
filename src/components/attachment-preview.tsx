/* eslint-disable @next/next/no-img-element -- Private authenticated attachments and local object URLs. */
'use client';
import {useRef,useState} from 'react';
import {Download,Eye,X} from 'lucide-react';
type Preview={filename:string;mimeType:string;size:number;preview:'pdf'|'image'|'text'|'download';text?:string;message?:string};
export function AttachmentPreview({id,kind}:{id:string;kind:'file'|'image'}){
  const dialog=useRef<HTMLDialogElement>(null);const [file,setFile]=useState<Preview|null>(null);
  const [error,setError]=useState('');const [loading,setLoading]=useState(false);
  const label=kind==='image'?'image':'résumé';const url=`/api/admin/resumes/${id}`;
  async function open(){
    dialog.current?.showModal();setError('');setLoading(true);setFile(null);
    try{const response=await fetch(`${url}?metadata=1`);const result=await response.json();if(!response.ok)throw new Error(result.message || 'Could not load preview.');setFile(result);}
    catch(error){setError(error instanceof Error?error.message:'Could not load preview.');}finally{setLoading(false);}
  }
  return <div className="attachment-actions">
    <button className="admin-button secondary" type="button" onClick={()=>void open()}><Eye size={17}/> Preview {label}</button>
    <a className="attachment-download" href={url}><Download size={16}/> Download {label}</a>
    <dialog ref={dialog} className="application-dialog preview-dialog" aria-labelledby={`preview-title-${id}`}>
      <header><div><h2 id={`preview-title-${id}`}>{file?.filename || `${kind==='image'?'Image':'Résumé'} preview`}</h2>{file && <p>{Math.ceil(file.size/1024)} KB · Private attachment</p>}</div><button type="button" aria-label="Close preview" onClick={()=>dialog.current?.close()}><X size={22}/></button></header>
      {loading && <p role="status" className="preview-message">Loading preview…</p>}
      {error && <p role="alert" className="preview-message">{error}</p>}
      {file?.preview==='pdf' && <iframe className="resume-pdf-preview" title="Résumé PDF preview" src={`${url}?preview=1`}/>}
      {file?.preview==='image' && <img className="admin-image-preview" src={`${url}?preview=1`} alt={file.filename}/>}
      {file?.preview==='text' && <><p className="preview-message">Text preview · Download the Word file for its original formatting.</p><pre className="resume-text-preview">{file.text}</pre></>}
      {file?.preview==='download' && <p className="preview-message">{file.message || 'This file cannot be previewed here. Download it to view on your device.'}</p>}
      <footer><a className="admin-button primary" href={url}><Download size={17}/> Download {label}</a>{file?.preview==='pdf' && <a className="admin-button secondary" href={`${url}?preview=1`} target="_blank" rel="noopener noreferrer">Open PDF in new tab</a>}</footer>
    </dialog>
  </div>;
}
