'use client';
import {useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Trash2} from 'lucide-react';

export function DeleteApplication({id,name,redirectAfter=false}:{id:string;name:string;redirectAfter?:boolean}) {
  const dialog=useRef<HTMLDialogElement>(null);const router=useRouter();
  const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  async function remove(){
    setBusy(true);setError('');
    try {
      const response=await fetch(`/api/admin/leads/${id}`,{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({confirm:true})});
      const result=await response.json();
      if(!response.ok)throw new Error(result.message || 'Could not delete the application.');
      dialog.current?.close();if(redirectAfter)router.push('/gsm-admin/leads');router.refresh();
    }catch(error){setError(error instanceof Error?error.message:'Could not delete. Please try again.');}
    finally{setBusy(false);}
  }
  return <>
    <button type="button" className="delete-application-button" aria-label={`Delete application for ${name}`} onClick={()=>{setError('');dialog.current?.showModal();}}><Trash2 size={16}/> Delete</button>
    <dialog ref={dialog} className="application-dialog delete-dialog" aria-labelledby={`delete-title-${id}`} onCancel={e=>{if(busy)e.preventDefault();}}>
      <h2 id={`delete-title-${id}`}>Delete this application?</h2>
      <p><strong>{name}</strong> and their answers, notes, résumé and uploaded images will be permanently removed. This cannot be undone.</p>
      {error && <p className="admin-form-error" role="alert">{error}</p>}
      <footer><button type="button" className="admin-button secondary" disabled={busy} onClick={()=>dialog.current?.close()}>Keep application</button><button type="button" className="admin-button delete-confirm" disabled={busy} onClick={()=>void remove()}>{busy?'Deleting…':'Delete permanently'}</button></footer>
    </dialog>
  </>;
}
