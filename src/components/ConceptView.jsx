// src/components/ConceptView.jsx
import { useState } from 'react';
import { CONCEPTS } from '../data/concepts';

export default function ConceptView({ weekNum, initialDay=0, onBack, isDark=true, theme }) {
  const [activeDay, setActiveDay] = useState(initialDay);
  const [lang, setLang] = useState('python');
  const data = CONCEPTS[weekNum];

  if (!data) return (
    <div style={{ minHeight:'100vh', background:theme?.bg||'#0a0a0f', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, color:'#64748b', fontFamily:"'Space Mono',monospace", fontSize:'.85rem' }}>
      Concepts for Week {weekNum} coming soon...
      <button onClick={onBack} style={{ background:'transparent', border:'1px solid #2a2a3d', color:'#a78bfa', padding:'8px 18px', borderRadius:7, cursor:'pointer', fontFamily:'inherit' }}>← Back to Problems</button>
    </div>
  );

  const day = data.days[activeDay];
  const LANGS = ['python','cpp','java'];
  const LANG_LABELS = { python:'Python', cpp:'C++', java:'Java' };

  return (
    <div style={{ minHeight:'100vh', background:theme?.bg||'#0a0a0f', fontFamily:"'Syne',system-ui,sans-serif", color:theme?.text||'#e2e8f0', transition:'background .2s, color .2s' }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:#2a2a3d; border-radius:3px; }
        .code-block { font-family:'Space Mono',monospace; font-size:.76rem; line-height:1.75; background:#0d0d14; border:1px solid #1e1e2a; border-radius:10px; padding:16px 18px; overflow-x:auto; color:#e2e8f0; white-space:pre; }
      `}</style>

      {/* Sticky top bar */}
      <div style={{ position:'sticky', top:0, zIndex:10, background:isDark?'rgba(10,10,15,.96)':'rgba(248,249,252,.96)', borderBottom:'1px solid #1e1e2a', backdropFilter:'blur(8px)', padding:'10px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={onBack} style={{ background:'transparent', border:'1px solid #2a2a3d', color:'#a78bfa', padding:'5px 12px', borderRadius:7, cursor:'pointer', fontFamily:'inherit', fontSize:'.76rem', fontWeight:700 }}>
            ← Problems
          </button>
          <div>
            <div style={{ fontSize:'.58rem', color:'#64748b', fontFamily:"'Space Mono',monospace", letterSpacing:'.08em' }}>WEEK {weekNum} · CONCEPTS</div>
            <div style={{ fontSize:'.88rem', fontWeight:800 }}>{data.title}</div>
          </div>
        </div>

        {/* Language switcher */}
        <div style={{ display:'flex', gap:4, background:'#12121a', border:'1px solid #2a2a3d', borderRadius:8, padding:3 }}>
          {LANGS.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding:'5px 14px', borderRadius:6, fontFamily:"'Space Mono',monospace", fontSize:'.68rem',
              fontWeight:700, cursor:'pointer', border:'none', transition:'all .15s',
              background: lang===l ? 'linear-gradient(135deg,#7c3aed,#5b21b6)' : 'transparent',
              color: lang===l ? '#fff' : '#64748b',
            }}>{LANG_LABELS[l]}</button>
          ))}
        </div>

        <div style={{ fontSize:'.7rem', color:'#64748b', fontStyle:'italic', display:'none' }}>💡 {data.tagline}</div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'20px 16px' }}>

        {/* Day tabs */}
        <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:20 }}>
          {data.days.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)} style={{
              padding:'6px 12px', borderRadius:7, fontFamily:'inherit', fontSize:'.72rem',
              fontWeight:700, cursor:'pointer', transition:'all .2s',
              background: activeDay===i ? 'linear-gradient(135deg,#7c3aed,#5b21b6)' : '#1a1a26',
              color: activeDay===i ? '#fff' : '#64748b',
              border: `1px solid ${activeDay===i ? '#7c3aed' : '#2a2a3d'}`,
            }}>
              {d.day.split(' — ')[0]}
            </button>
          ))}
        </div>

        {/* Day heading */}
        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:'.58rem', color:'#a78bfa', fontFamily:"'Space Mono',monospace", letterSpacing:'.1em', marginBottom:5 }}>// {day.day}</div>
          <h2 style={{ fontSize:'1.3rem', fontWeight:800, color:'#e2e8f0' }}>{day.day.split(' — ').slice(1).join(' — ')}</h2>
        </div>

        {/* WHERE / WHEN / WHAT — 3 cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:10, marginBottom:16 }}>
          {[
            { label:'WHERE TO USE', icon:'📍', color:'#f59e0b', bg:'rgba(245,158,11,.08)', border:'rgba(245,158,11,.2)', text: day.where },
            { label:'WHEN TO USE', icon:'⏰', color:'#06b6d4', bg:'rgba(6,182,212,.08)', border:'rgba(6,182,212,.2)', text: day.when },
            { label:'WHAT IS IT', icon:'🧠', color:'#a78bfa', bg:'rgba(124,58,237,.08)', border:'rgba(124,58,237,.2)', text: day.what },
          ].map(({ label, icon, color, bg, border, text }) => (
            <div key={label} style={{ background:bg, border:`1px solid ${border}`, borderRadius:12, padding:'14px 16px' }}>
              <div style={{ fontSize:'.58rem', fontFamily:"'Space Mono',monospace", color, letterSpacing:'.08em', marginBottom:7 }}>{icon} {label}</div>
              <p style={{ fontSize:'.78rem', color:'#94a3b8', lineHeight:1.7 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Code example */}
        <div style={{ background:'#1a1a26', border:'1px solid #2a2a3d', borderRadius:14, padding:'18px', marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12, flexWrap:'wrap', gap:8 }}>
            <div>
              <div style={{ fontSize:'.58rem', color:'#34d399', fontFamily:"'Space Mono',monospace", letterSpacing:'.08em', marginBottom:3 }}>// EXAMPLE</div>
              <div style={{ fontSize:'.95rem', fontWeight:800 }}>{day.example.title}</div>
            </div>
            <div style={{ fontSize:'.62rem', fontFamily:"'Space Mono',monospace", color:'#475569', background:'#12121a', border:'1px solid #2a2a3d', padding:'3px 10px', borderRadius:5 }}>
              {LANG_LABELS[lang]}
            </div>
          </div>
          <pre className="code-block">{day.example.code[lang]}</pre>
          <div style={{ marginTop:12, padding:'11px 14px', background:'rgba(6,182,212,.05)', border:'1px solid rgba(6,182,212,.12)', borderRadius:8 }}>
            <div style={{ fontSize:'.58rem', color:'#06b6d4', fontFamily:"'Space Mono',monospace", letterSpacing:'.08em', marginBottom:4 }}>// EXPLANATION</div>
            <p style={{ fontSize:'.78rem', color:'#94a3b8', lineHeight:1.7 }}>{day.example.explanation}</p>
          </div>
        </div>

        {/* Key insight */}
        <div style={{ background:'linear-gradient(135deg,rgba(124,58,237,.1),rgba(6,182,212,.06))', border:'1px solid rgba(124,58,237,.25)', borderRadius:12, padding:'14px 16px', marginBottom:14 }}>
          <div style={{ fontSize:'.58rem', color:'#a78bfa', fontFamily:"'Space Mono',monospace", letterSpacing:'.08em', marginBottom:6 }}>// 💡 KEY INSIGHT</div>
          <p style={{ fontSize:'.83rem', color:'#c4b5fd', lineHeight:1.7, fontWeight:600 }}>{day.keyInsight}</p>
        </div>

        {/* Template */}
        <div style={{ background:'#1a1a26', border:'1px solid rgba(245,158,11,.2)', borderRadius:14, padding:'18px', marginBottom:22 }}>
          <div style={{ fontSize:'.58rem', color:'#f59e0b', fontFamily:"'Space Mono',monospace", letterSpacing:'.08em', marginBottom:10 }}>// 📋 REUSABLE TEMPLATE — {LANG_LABELS[lang]}</div>
          <pre className="code-block" style={{ borderColor:'rgba(245,158,11,.12)' }}>{day.template[lang]}</pre>
        </div>

        {/* Navigation */}
        <div style={{ display:'flex', justifyContent:'space-between', gap:10 }}>
          <button onClick={() => setActiveDay(i => Math.max(0,i-1))} disabled={activeDay===0}
            style={{ padding:'10px 20px', border:'1px solid #2a2a3d', borderRadius:9, background:'transparent', color:activeDay===0?'#334155':'#a78bfa', fontFamily:'inherit', fontSize:'.8rem', fontWeight:700, cursor:activeDay===0?'not-allowed':'pointer' }}>
            ← Prev
          </button>
          <button onClick={onBack}
            style={{ padding:'10px 20px', border:'1px solid rgba(124,58,237,.4)', borderRadius:9, background:'rgba(124,58,237,.1)', color:'#a78bfa', fontFamily:'inherit', fontSize:'.8rem', fontWeight:700, cursor:'pointer' }}>
            ← Back to Problems
          </button>
          <button onClick={() => setActiveDay(i => Math.min(data.days.length-1,i+1))} disabled={activeDay===data.days.length-1}
            style={{ padding:'10px 20px', border:'1px solid #2a2a3d', borderRadius:9, background:activeDay===data.days.length-1?'transparent':'linear-gradient(135deg,#7c3aed,#5b21b6)', color:activeDay===data.days.length-1?'#334155':'#fff', fontFamily:'inherit', fontSize:'.8rem', fontWeight:700, cursor:activeDay===data.days.length-1?'not-allowed':'pointer' }}>
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}