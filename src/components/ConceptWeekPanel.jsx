// src/components/ConceptWeekPanel.jsx
import { useState, useEffect } from 'react';
import { CONCEPTS } from '../data/concepts';

const WEEK_NAMES = {
  1:'Two Pointers', 2:'Prefix Sum', 3:'Binary Search', 4:'Hashing', 5:'Sliding Window',
  6:'Matrix + Strings Complete', 7:'Linked List — All Pointer Patterns',
  8:'Stack & Queue — All Patterns', 9:'Recursion & Backtracking Complete',
  10:'Binary Trees — Traversals, Views, Paths', 11:'BST + Heaps / Priority Queue',
  12:'Graphs — BFS, DFS, Cycle, Topo Sort',
  13:'Graphs — Shortest Path + Union-Find + MST', 14:'DP — 1D Patterns Complete',
  15:'DP — 2D, Grid, LCS, Edit Distance', 16:'DP — Stocks, Palindromes, Word Break, Bitmask',
  17:'Greedy + Tries + Final DP Patterns', 18:'Bit Manipulation + Math + Number Theory',
  19:'Weak Topic Revision + System Design Basics', 20:'Full Mock Interview Week',
  21:'Interview Week — Polish & Execute 🎯'
};
const LANG_LABELS = { python:'Python', cpp:'C++', java:'Java' };

export default function ConceptWeekPanel({ weekNum, lang, isDark, T, open, onToggle }) {
  const data = CONCEPTS[weekNum];
  const [activeDay, setActiveDay] = useState(0);
  const [todos, setTodos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`concept_todos_w${weekNum}`) || '{}'); } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(`concept_todos_w${weekNum}`, JSON.stringify(todos));
  }, [todos, weekNum]);

  const toggleTodo = (key) => setTodos(t => ({ ...t, [key]: !t[key] }));
  const doneTodos = data ? data.days.filter((_, i) => todos[`d${i}`]).length : 0;

  if (!data) return null;

  const day = data.days[activeDay];
  const todoKey = `d${activeDay}`;
  const isDone = !!todos[todoKey];

  return (
    <div style={{ background:T.statCard, border:`1px solid ${T.border}`, borderRadius:14, marginBottom:10, overflow:'hidden', transition:'background .2s' }}>

      {/* Week header */}
      <div onClick={onToggle} style={{
        padding:'16px 20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between',
        borderBottom: open ? `1px solid ${T.border}` : 'none',
      }}
        onMouseEnter={e => e.currentTarget.style.background = isDark?'rgba(124,58,237,.05)':'rgba(124,58,237,.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ background:'linear-gradient(135deg,#7c3aed,#5b21b6)', borderRadius:8, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono',monospace", fontWeight:800, color:'#fff', fontSize:'.85rem', flexShrink:0 }}>
            {weekNum}
          </div>
          <div>
            <div style={{ fontWeight:800, fontSize:'.95rem', color:T.text }}>Week {weekNum} — {WEEK_NAMES[weekNum]}</div>
            <div style={{ fontSize:'.68rem', color:T.muted, fontFamily:"'Space Mono',monospace", marginTop:2 }}>
              {doneTodos}/{data.days.length} days studied · concept + code + template
            </div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* Mini progress */}
          <div style={{ display:'flex', gap:3 }}>
            {data.days.map((_, i) => (
              <div key={i} style={{ width:6, height:6, borderRadius:2, background:todos[`d${i}`]?'#10b981':T.border, transition:'background .2s' }} />
            ))}
          </div>
          <div style={{ background:'rgba(16,185,129,.12)', border:'1px solid rgba(16,185,129,.25)', color:'#34d399', fontSize:'.6rem', fontFamily:"'Space Mono',monospace", padding:'2px 8px', borderRadius:20 }}>FREE</div>
          <span style={{ color:T.muted, fontSize:'.85rem', transition:'transform .2s', display:'inline-block', transform:open?'rotate(180deg)':'rotate(0deg)' }}>▾</span>
        </div>
      </div>

      {/* Open content */}
      {open && (
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', minHeight:500 }}>

          {/* LEFT — day list */}
          <div style={{ borderRight:`1px solid ${T.border}`, padding:'12px 8px', display:'flex', flexDirection:'column', gap:4, overflowY:'auto', maxHeight:600 }}>
            <div style={{ fontSize:'.58rem', color:T.muted, fontFamily:"'Space Mono',monospace", letterSpacing:'.06em', padding:'4px 8px', marginBottom:4 }}>// SELECT DAY</div>
            {data.days.map((d, i) => {
              const [dayLabel, ...topicParts] = d.day.split(' — ');
              const topic = topicParts.join(' — ');
              const isMock = dayLabel === 'Sun';
              const isRev = dayLabel === 'Sat';
              const isDone = !!todos[`d${i}`];
              const isActive = activeDay === i;
              return (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  display:'flex', alignItems:'center', gap:8, padding:'9px 10px', borderRadius:8,
                  cursor:'pointer', border:`1px solid ${isActive?(isDark?'rgba(124,58,237,.5)':'rgba(124,58,237,.4)'):'transparent'}`,
                  background:isActive?(isDark?'rgba(124,58,237,.15)':'rgba(124,58,237,.1)'):'transparent',
                  textAlign:'left', fontFamily:'inherit', transition:'all .15s', width:'100%',
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = isDark?'rgba(255,255,255,.04)':'rgba(0,0,0,.04)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  {/* Checkbox */}
                  <div onClick={e => { e.stopPropagation(); toggleTodo(`d${i}`); }} style={{
                    width:16, height:16, borderRadius:4, border:`2px solid ${isDone?'#10b981':T?.border}`,
                    background:isDone?'#10b981':'transparent', display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0, cursor:'pointer', transition:'all .15s',
                  }}>
                    {isDone && <span style={{ color:'#fff', fontSize:'.6rem', fontWeight:900 }}>✓</span>}
                  </div>
                  <div style={{ overflow:'hidden' }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:isMock?'#f59e0b':isRev?'#34d399':'#a78bfa', fontWeight:700 }}>{dayLabel}</div>
                    <div style={{ fontSize:'.72rem', fontWeight:600, color:isActive?T.text:(isDark?T.sub:'#1e0a3c'), whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textDecoration:isDone?'line-through':'none', opacity:isDone?.7:1 }}>{topic}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT — concept content */}
          <div style={{ padding:'20px', overflowY:'auto', maxHeight:600 }}>
            {/* Day header + mark done */}
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16, gap:12 }}>
              <div>
                <div style={{ fontSize:'.58rem', color:'#a78bfa', fontFamily:"'Space Mono',monospace", letterSpacing:'.08em', marginBottom:4 }}>// {day.day}</div>
                <h3 style={{ fontSize:'1.1rem', fontWeight:800, color:T.text }}>{day.day.split(' — ').slice(1).join(' — ')}</h3>
              </div>
              <button onClick={() => toggleTodo(todoKey)} style={{
                display:'flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:8, cursor:'pointer', fontFamily:'inherit', fontSize:'.72rem', fontWeight:700, border:'none', flexShrink:0,
                background:isDone?'rgba(16,185,129,.15)':'rgba(124,58,237,.12)',
                color:isDone?'#16a34a':(isDark?'#a78bfa':'#3b0764'),
              }}>
                {isDone ? '✓ Studied' : '○ Mark Studied'}
              </button>
            </div>

            {/* WHERE / WHEN / WHAT */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:14 }}>
              {[
                { label:'WHERE', icon:'📍', color:'#f59e0b', bg:isDark?'rgba(245,158,11,.08)':'rgba(245,158,11,.15)', border:isDark?'rgba(245,158,11,.2)':'rgba(180,100,0,.3)', text:day.where },
                { label:'WHEN', icon:'⏰', color:'#06b6d4', bg:isDark?'rgba(6,182,212,.08)':'rgba(6,182,212,.12)', border:isDark?'rgba(6,182,212,.2)':'rgba(8,120,180,.3)', text:day.when },
                { label:'WHAT', icon:'🧠', color:'#a78bfa', bg:isDark?'rgba(124,58,237,.08)':'rgba(124,58,237,.12)', border:isDark?'rgba(124,58,237,.2)':'rgba(109,40,217,.3)', text:day.what },
              ].map(({ label, icon, color, bg, border, text }) => (
                <div key={label} style={{ background:bg, border:`1px solid ${border}`, borderRadius:10, padding:'12px' }}>
                  <div style={{ fontSize:'.58rem', fontFamily:"'Space Mono',monospace", color:isDark?color:(label==='WHERE'?'#78350f':label==='WHEN'?'#0c4a6e':'#3b0764'), letterSpacing:'.06em', marginBottom:6, fontWeight:800 }}>{icon} {label}</div>
                  <p style={{ fontSize:'.72rem', color:isDark?T.sub:'#0d0820', lineHeight:1.65, fontWeight:isDark?400:700 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Code example */}
            <div style={{ background:T?.card, border:`1px solid ${T.border}`, borderRadius:12, padding:'16px', marginBottom:12 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                <div>
                  <div style={{ fontSize:'.58rem', color:'#34d399', fontFamily:"'Space Mono',monospace", letterSpacing:'.06em', marginBottom:3 }}>// EXAMPLE</div>
                  <div style={{ fontSize:'.88rem', fontWeight:800, color:T.text }}>{day.example.title}</div>
                </div>
                <div style={{ fontSize:'.6rem', fontFamily:"'Space Mono',monospace", color:T.muted, background:T.card2, border:`1px solid ${T.border}`, padding:'2px 8px', borderRadius:5 }}>{LANG_LABELS[lang]}</div>
              </div>
              <pre style={{ fontFamily:"'Space Mono',monospace", fontSize:'.73rem', lineHeight:1.75, background:'#1e2030', border:'1px solid #2a2a3d', borderRadius:9, padding:'14px 16px', overflowX:'auto', color:'#e2e8f0', whiteSpace:'pre', margin:0 }}>{day.example.code[lang]}</pre>
              <div style={{ marginTop:10, padding:'10px 12px', background:isDark?'rgba(6,182,212,.05)':'rgba(6,182,212,.07)', border:'1px solid rgba(6,182,212,.15)', borderRadius:8 }}>
                <div style={{ fontSize:'.58rem', color:'#06b6d4', fontFamily:"'Space Mono',monospace", letterSpacing:'.06em', marginBottom:4 }}>// EXPLANATION</div>
                <p style={{ fontSize:'.73rem', color:isDark?T.sub:'#0d0820', lineHeight:1.65, fontWeight:isDark?400:700 }}>{day.example.explanation}</p>
              </div>
            </div>

            {/* Key insight */}
            <div style={{ background:isDark?'rgba(124,58,237,.08)':'rgba(109,40,217,.18)', border:`1px solid ${isDark?'rgba(124,58,237,.2)':'rgba(88,28,135,.45)'}`, borderRadius:10, padding:'12px 14px', marginBottom:12 }}>
              <div style={{ fontSize:'.58rem', color:isDark?'#a78bfa':'#1a004a', fontFamily:"'Space Mono',monospace", letterSpacing:'.06em', marginBottom:6, fontWeight:800 }}>// 💡 KEY INSIGHT</div>
              <p style={{ fontSize:'.78rem', color:isDark?'#c4b5fd':'#1a004a', lineHeight:1.65, fontWeight:800 }}>{day.keyInsight}</p>
            </div>

            {/* Template */}
            <div style={{ background:T?.card, border:`1px solid rgba(245,158,11,.25)`, borderRadius:12, padding:'14px' }}>
              <div style={{ fontSize:'.58rem', color:'#f59e0b', fontFamily:"'Space Mono',monospace", letterSpacing:'.06em', marginBottom:10 }}>// 📋 REUSABLE TEMPLATE — {LANG_LABELS[lang]}</div>
              <pre style={{ fontFamily:"'Space Mono',monospace", fontSize:'.73rem', lineHeight:1.75, background:'#1e2030', border:'1px solid rgba(245,158,11,.15)', borderRadius:9, padding:'14px 16px', overflowX:'auto', color:'#e2e8f0', whiteSpace:'pre', margin:0 }}>{day.template[lang]}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}