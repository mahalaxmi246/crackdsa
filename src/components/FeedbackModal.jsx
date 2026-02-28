// src/components/FeedbackModal.jsx
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function FeedbackModal({ uid, onClose }) {
  const [week, setWeek] = useState('');
  const [type, setType] = useState('wrong_problem');
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!msg.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        uid, week, type, message: msg.trim(),
        createdAt: serverTimestamp(),
      });
      setDone(true);
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  }

  const inp = {
    width:'100%', padding:'10px 13px', background:'#12121a',
    border:'1px solid #2a2a3d', borderRadius:8, color:'#e2e8f0',
    fontSize:'.85rem', fontFamily:'inherit', outline:'none', marginBottom:10,
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.8)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:16, backdropFilter:'blur(4px)' }}>
      <div style={{ background:'#1a1a26', border:'1px solid #2a2a3d', borderRadius:18, padding:'28px 24px', maxWidth:420, width:'100%', position:'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:14, right:16, background:'transparent', border:'none', color:'#64748b', fontSize:'1.1rem', cursor:'pointer' }}>✕</button>

        {done ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:10 }}>🙏</div>
            <h3 style={{ color:'#e2e8f0', fontWeight:800, marginBottom:8 }}>Thanks for the feedback!</h3>
            <p style={{ color:'#64748b', fontSize:'.82rem', marginBottom:16 }}>I'll review and fix it soon. Built by a student, improved by students!</p>
            <button onClick={onClose} style={{ background:'linear-gradient(135deg,#7c3aed,#5b21b6)', border:'none', color:'#fff', padding:'9px 24px', borderRadius:8, fontFamily:'inherit', fontWeight:700, cursor:'pointer' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:'.65rem', fontFamily:"'Space Mono',monospace", color:'#a78bfa', letterSpacing:'.1em', marginBottom:6 }}>// SUGGEST A CORRECTION</div>
              <h3 style={{ color:'#e2e8f0', fontWeight:800, fontSize:'1.1rem' }}>Found something wrong?</h3>
              <p style={{ color:'#64748b', fontSize:'.78rem', marginTop:4 }}>Wrong problem, broken link, wrong difficulty? Tell me and I'll fix it!</p>
            </div>

            <select value={type} onChange={e => setType(e.target.value)} style={{ ...inp, cursor:'pointer' }}>
              <option value="wrong_problem">Wrong problem in this week</option>
              <option value="wrong_difficulty">Wrong difficulty tag</option>
              <option value="broken_link">Broken LeetCode link</option>
              <option value="missing_problem">Important problem missing</option>
              <option value="other">Other suggestion</option>
            </select>

            <input
              placeholder="Which week? (e.g. Week 3 — Binary Search)"
              value={week} onChange={e => setWeek(e.target.value)}
              style={inp}
            />

            <textarea
              placeholder="Describe the issue or suggestion..."
              value={msg} onChange={e => setMsg(e.target.value)}
              rows={4}
              style={{ ...inp, resize:'vertical', lineHeight:1.5 }}
            />

            <button onClick={submit} disabled={loading || !msg.trim()} style={{
              width:'100%', padding:'11px', border:'none', borderRadius:9,
              fontFamily:'inherit', fontSize:'.9rem', fontWeight:700, cursor:'pointer',
              background:'linear-gradient(135deg,#7c3aed,#5b21b6)', color:'#fff',
              opacity: loading || !msg.trim() ? .6 : 1,
            }}>
              {loading ? 'Submitting...' : 'Submit Feedback →'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}