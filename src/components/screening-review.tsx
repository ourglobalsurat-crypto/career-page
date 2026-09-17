'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import type {Screening} from '@/lib/screening';
export function ScreeningReview({id,screening,reviewScore}:{id:string;screening:Screening|null;reviewScore:number|null}) {
  const router = useRouter(); const [score,setScore]=useState(reviewScore?.toString() ?? '');
  const [note,setNote]=useState(''); const [message,setMessage]=useState(''); const [saving,setSaving]=useState(false);
  if(!screening) return null;
  const total = screening.score + (reviewScore ?? 0);
  return <section className="admin-card screening-card">
    <span className="admin-page-kicker">SCREENING</span>
    <h2>{reviewScore === null ? `${screening.score}/40 preliminary` : `${total}/100`}</h2>
    <p>{reviewScore === null ? 'HR review pending · 60 points to assess' : total >= 80 ? 'Strong candidate' : total >= 60 ? 'HR review' : total >= 40 ? 'Low priority' : 'Consider archiving'}</p>
    {Object.entries(screening.breakdown).map(([label,value]) => <p key={label}>{label}: <strong>{value}</strong></p>)}
    {screening.flags.map(flag => <p key={flag}><small>{flag}</small></p>)}
    <form onSubmit={async e => {e.preventDefault();setSaving(true);setMessage('');try {
      const response=await fetch(`/api/admin/leads/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'review',score:Number(score),note})});
      if(!response.ok) throw new Error('Could not save review.');
      setMessage('Review saved.');setNote('');router.refresh();
    }catch(error){setMessage(error instanceof Error ? error.message : 'Save failed.');}finally{setSaving(false);}}}>
      <label>HR assessment (0–60)<input type="number" min="0" max="60" required value={score} onChange={e=>setScore(e.target.value)} /></label>
      <small>Practical knowledge: 30 points. Verified results and portfolio: 30 points.</small>
      <label>Assessment notes<textarea required maxLength={2000} value={note} onChange={e=>setNote(e.target.value)} /></label>
      <button className="admin-button primary" disabled={saving}>{saving?'Saving…':'Save assessment'}</button>
      <p role="status">{message}</p>
    </form>
  </section>;
}
