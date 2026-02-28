// src/pages/ConceptsDashboard.jsx
import { useState } from 'react';
import { CONCEPTS } from '../data/concepts';
import { WEEKS, FREE_WEEKS } from '../data/roadmap';

const WEEK_NAMES = {
  1:'Two Pointers', 2:'Prefix Sum', 3:'Binary Search', 4:'Hashing', 5:'Sliding Window'
};

export default function ConceptsDashboard({ onSelectDay, onBack, isDark, theme }) {
  const [openWeeks, setOpenWeeks] = useState({ 1: true });
  const C = theme;

  const toggleWeek = (w) => setOpenWeeks(o => ({ ...o, [w]: !o[w] }));

  return (
    <div style={{ minHeight:'100vh', background:C.bg, fontFamily:"'Syne',system-ui,sans-serif", color:C.text, transition:'background .2s, color .2s' }}>
      <style>{`* { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:3px; }
      `}</style>

      {/* Fixed grid bg */}
      {isDark && <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(124,58,237,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.03) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none', zIndex:0 }} />}

      <div style={{ maxWidth:900, margin:'0 auto', padding:'24px 16px', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'20px 22px', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
            <div>
              <div style={{ fontSize:'.58rem', color:'#a78bfa', fontFamily:"'Space Mono',monospace", letterSpacing:'.1em', marginBottom:6 }}>// CONCEPTS & EXPLANATIONS</div>
              <h1 style={{ fontSize:'clamp(1.1rem,3vw,1.5rem)', fontWeight:800, color:C.text, marginBottom:4 }}>
                Learn Before You Solve
              </h1>
              <p style={{ color:C.muted, fontSize:'.78rem', lineHeight:1.6 }}>
                Each day: <strong style={{color:C.text}}>Where to use</strong> · <strong style={{color:C.text}}>When to use</strong> · <strong style={{color:C.text}}>Concept + Code</strong> · <strong style={{color:C.text}}>Template</strong>
              </p>
            </div>
            <button onClick={onBack} style={{ background:'transparent', border:`1px solid ${C.border}`, color:'#a78bfa', padding:'8px 16px', borderRadius:8, cursor:'pointer', fontFamily:'inherit', fontSize:'.78rem', fontWeight:700 }}>
              ← Back to Problems
            </button>
          </div>
        </div>

        {/* Week cards */}
        {[1,2,3,4,5].map(weekNum => {
          const conceptData = CONCEPTS[weekNum];
          const isOpen = !!openWeeks[weekNum];
          return (
            <div key={weekNum} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, marginBottom:10, overflow:'hidden' }}>

              {/* Week header — clickable */}
              <div onClick={() => toggleWeek(weekNum)} style={{
                padding:'16px 20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between',
                borderBottom: isOpen ? `1px solid ${C.border}` : 'none',
                transition:'background .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(124,58,237,.06)' : 'rgba(124,58,237,.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ background:'linear-gradient(135deg,#7c3aed,#5b21b6)', borderRadius:8, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono',monospace", fontWeight:800, color:'#fff', fontSize:'.85rem', flexShrink:0 }}>
                    {weekNum}
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:'.95rem', color:C.text }}>Week {weekNum} — {WEEK_NAMES[weekNum]}</div>
                    <div style={{ fontSize:'.68rem', color:C.muted, fontFamily:"'Space Mono',monospace", marginTop:2 }}>
                      {conceptData ? `${conceptData.days.length} days · concept + code + template` : 'Coming soon'}
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ background:'rgba(16,185,129,.12)', border:'1px solid rgba(16,185,129,.25)', color:'#34d399', fontSize:'.6rem', fontFamily:"'Space Mono',monospace", padding:'2px 8px', borderRadius:20 }}>FREE</div>
                  <span style={{ color:C.muted, fontSize:'.85rem', transition:'transform .2s', display:'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                </div>
              </div>

              {/* Day buttons */}
              {isOpen && conceptData && (
                <div style={{ padding:'14px 20px' }}>
                  <div style={{ fontSize:'.58rem', color:C.muted, fontFamily:"'Space Mono',monospace", letterSpacing:'.08em', marginBottom:10 }}>// SELECT A DAY TO LEARN</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:8 }}>
                    {conceptData.days.map((day, idx) => {
                      const [dayLabel, ...topicParts] = day.day.split(' — ');
                      const topic = topicParts.join(' — ');
                      const isMock = dayLabel === 'Sun';
                      const isRevision = dayLabel === 'Sat';
                      return (
                        <button key={idx} onClick={() => onSelectDay(weekNum, idx)} style={{
                          background: isMock ? (isDark?'rgba(245,158,11,.08)':'rgba(245,158,11,.06)') :
                                      isRevision ? (isDark?'rgba(16,185,129,.08)':'rgba(16,185,129,.06)') :
                                      isDark?'rgba(124,58,237,.07)':'rgba(124,58,237,.04)',
                          border: `1px solid ${isMock ? 'rgba(245,158,11,.25)' : isRevision ? 'rgba(16,185,129,.25)' : 'rgba(124,58,237,.2)'}`,
                          borderRadius:10, padding:'12px 14px', cursor:'pointer', textAlign:'left',
                          fontFamily:'inherit', transition:'all .15s',
                        }}
                          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow=`0 4px 12px rgba(124,58,237,.15)`; }}
                          onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
                        >
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5 }}>
                            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color: isMock?'#f59e0b':isRevision?'#34d399':'#a78bfa', fontWeight:700 }}>
                              {dayLabel}
                            </div>
                            <span style={{ fontSize:'.65rem', color:C.muted }}>→</span>
                          </div>
                          <div style={{ fontSize:'.78rem', fontWeight:700, color:C.text, lineHeight:1.3 }}>{topic}</div>
                          <div style={{ marginTop:5, fontSize:'.62rem', color:C.muted }}>concept · code · template</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Coming soon */}
              {isOpen && !conceptData && (
                <div style={{ padding:'20px', textAlign:'center', color:C.muted, fontSize:'.78rem', fontFamily:"'Space Mono',monospace" }}>
                  Concepts for Week {weekNum} coming soon...
                </div>
              )}
            </div>
          );
        })}

        {/* Locked weeks preview */}
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'18px 20px' }}>
          <div style={{ fontSize:'.58rem', color:'#64748b', fontFamily:"'Space Mono',monospace", letterSpacing:'.08em', marginBottom:12 }}>// WEEKS 6–21 · PRO CONCEPTS</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:6 }}>
            {[
              [6,'Matrix Traversal'],[7,'Advanced Matrix'],[8,'Binary Trees'],
              [9,'BST'],[10,'Tree DP'],[11,'Graph Basics'],[12,'BFS/DFS'],
              [13,'Shortest Path'],[14,'1D DP'],[15,'2D DP'],[16,'DP Optimization'],
              [17,'Advanced DP'],[18,'Backtracking'],[19,'Advanced BT'],
              [20,'System Design'],[21,'Mock Interviews'],
            ].map(([w, name]) => (
              <div key={w} style={{ background:isDark?'rgba(255,255,255,.02)':'rgba(0,0,0,.02)', border:`1px solid ${C.border}`, borderRadius:8, padding:'10px 12px', opacity:.6 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                  <span style={{ fontSize:'.75rem' }}>🔒</span>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:C.muted }}>WEEK {w}</div>
                </div>
                <div style={{ fontSize:'.73rem', color:C.muted, fontWeight:600 }}>{name}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:14, textAlign:'center' }}>
            <div style={{ fontSize:'.72rem', color:C.muted, marginBottom:8 }}>Unlock all 21 weeks of concepts + problems for ₹49</div>
          </div>
        </div>

      </div>
    </div>
  );
}