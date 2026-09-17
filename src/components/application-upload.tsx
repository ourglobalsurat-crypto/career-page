/* eslint-disable @next/next/no-img-element -- Private authenticated attachments and local object URLs. */
'use client';

import {useEffect, useId, useRef, useState} from 'react';
import {CheckCircle2, FileText, ImagePlus, LoaderCircle, ShieldCheck, UploadCloud, X} from 'lucide-react';

export function ApplicationUpload({kind,value,submissionToken,onChange,onBusyChange}:{
  kind:'resume'|'image'; value:unknown; submissionToken:string;
  onChange:(value:string)=>void; onBusyChange:(busy:boolean)=>void;
}) {
  const input=useRef<HTMLInputElement>(null);
  const hintId=useId();
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [dragging,setDragging]=useState(false);
  const [fileInfo,setFileInfo]=useState<{name:string;size:number;preview?:string}|null>(null);
  const isImage=kind==='image';const label=isImage?'image':'résumé';
  const formats=isImage?'JPG, PNG or WebP':'PDF, DOC or DOCX';
  const Icon=isImage?ImagePlus:FileText;
  useEffect(()=>{const preview=fileInfo?.preview;return()=>{if(preview)URL.revokeObjectURL(preview);};},[fileInfo]);

  async function upload(file?:File) {
    if(!file || busy)return;
    setError('');setDragging(false);
    if(!file.size){setError('This file is empty. Choose another file.');return;}
    if(file.size>5*1024*1024){setError('This file is too large. Maximum size is 5 MB.');return;}
    if(!(isImage?/\.(jpe?g|png|webp)$/i:/\.(pdf|docx?)$/i).test(file.name)){setError(`Choose a ${formats} file.`);return;}
    setBusy(true);onBusyChange(true);
    try {
      const data=new FormData();data.set('resume',file);data.set('kind',kind);data.set('submissionToken',submissionToken);
      const response=await fetch('/api/resume',{method:'POST',body:data});
      const result=await response.json();
      if(!response.ok)throw new Error(result.message || 'Upload failed. Please try again.');
      setFileInfo({name:result.filename || file.name,size:result.size || file.size,preview:isImage?URL.createObjectURL(file):undefined});
      onChange(result.id);
    }catch(error){setError(error instanceof Error?error.message:'Upload failed. Please try again.');}
    finally{setBusy(false);onBusyChange(false);if(input.current)input.current.value='';}
  }

  return <div className="application-upload">
    <input ref={input} type="file" className="upload-native-input" tabIndex={-1} aria-label={`Upload ${label}`} accept={isImage?'.jpg,.jpeg,.png,.webp':'.pdf,.doc,.docx'} disabled={busy} onChange={e=>void upload(e.target.files?.[0])}/>
    <div className={`upload-zone${dragging?' dragging':''}${value?' uploaded':''}`} aria-busy={busy}
      onDragOver={e=>{e.preventDefault();if(!busy)setDragging(true);}}
      onDragLeave={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setDragging(false);}}
      onDrop={e=>{e.preventDefault();setDragging(false);if(e.dataTransfer.files.length!==1){setError('Please upload one file at a time.');return;}void upload(e.dataTransfer.files[0]);}}>
      <div className="upload-symbol">{busy?<LoaderCircle className="upload-spinner" size={32}/>:value?<CheckCircle2 size={32}/>:<UploadCloud size={32}/>}</div>
      <h3>{busy?`Uploading your ${label}…`:value?`Your ${label} is attached`:`Attach your ${label}`}</h3>
      <p>{value?'You can replace this file before submitting.':`Drag and drop your ${label} here, or choose a file below.`}</p>
      <button className="button button-primary upload-browse" type="button" disabled={busy} onClick={()=>input.current?.click()} aria-describedby={hintId}>
        <Icon size={19}/>{busy?'Uploading…':value?'Change file':isImage?'Choose image':'Choose résumé'}
      </button>
      <small id={hintId}>{formats} · Maximum 5 MB · One file</small>
    </div>
    {Boolean(value) && <div className="uploaded-file">
      {/* Local file previews use an object URL and do not leave the browser. */}
      {fileInfo?.preview ? <img src={fileInfo.preview} alt="Selected upload" className="uploaded-thumbnail"/> : <Icon size={25}/>}
      <div><strong>{fileInfo?.name || `Uploaded ${label}`}</strong><span>{fileInfo?`${(fileInfo.size/1024).toFixed(0)} KB · `:''}Ready to submit</span></div>
      <button type="button" aria-label={`Remove ${label}`} disabled={busy} onClick={()=>{onChange('');setFileInfo(null);setError('');if(input.current)input.current.value='';}}><X size={18}/></button>
    </div>}
    <div aria-live="polite" className="upload-status">{busy?`Uploading ${label}. Please wait.`:value?`${isImage?'Image':'Résumé'} uploaded successfully.`:''}</div>
    {error && <p className="form-error" role="alert">{error}{value?' Your previous upload is still attached.':''}</p>}
    <p className="upload-privacy"><ShieldCheck size={15}/> Only our hiring team can access your file.</p>
  </div>;
}
