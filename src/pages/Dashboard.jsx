// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { WEEKS, FREE_WEEKS, PRICE } from '../data/roadmap';
import { CONCEPTS } from '../data/concepts';
import WeekCard from '../components/WeekCard';
import ConceptWeekPanel from '../components/ConceptWeekPanel';
import PaywallModal from '../components/PaywallModal';
import Certificate from '../components/Certificate';
import { useProgress } from '../hooks/useProgress';

const ALL_KEYS = [];
WEEKS.forEach(week => {
  week.days.forEach((d, di) => {
    d.tasks.forEach((_, ti) => { ALL_KEYS.push(`w${week.week}_d${di}_t${ti}`); });
  });
});

const DAY_TASK_COUNTS = [];
WEEKS.forEach(week => { week.days.forEach(d => DAY_TASK_COUNTS.push(d.tasks.length)); });

export default function Dashboard({ user, userData, setUserData, onLogout, isDark, T }) {
  const isPaid = userData?.isPaid || false;
  const displayName = user.displayName || userData?.displayName || user.email.split('@')[0];
  const { progress, toggleTask, resetProgress, syncProgress, saving } = useProgress(user.uid, userData?.progress);

  useEffect(() => { if (userData?.progress) syncProgress(userData.progress); }, []);

  const [openWeeks, setOpenWeeks] = useState({ 1: true });
  const [phase, setPhase] = useState('all');
  const [showPaywall, setShowPaywall] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [toast, setToast] = useState(null);
  const [mode, setMode] = useState('problems'); // 'problems' | 'concepts'
  const [lang, setLang] = useState('python');

  function showToast(msg, type='success') { setToast({ msg, type }); setTimeout(() => setToast(null), 2800); }
  function isWeekLocked(week) { if (isPaid) return false; if (week.alreadyDone) return false; return week.week > FREE_WEEKS; }

  const doneTasks = ALL_KEYS.filter(k => progress[k]).length;
  const pct = ALL_KEYS.length ? Math.round(doneTasks / ALL_KEYS.length * 100) : 0;
  const certUnlocked = pct >= 80 && isPaid;

  let tasksSoFar = 0, completedDays = 0;
  for (let i = 0; i < DAY_TASK_COUNTS.length; i++) {
    if (tasksSoFar + DAY_TASK_COUNTS[i] <= doneTasks) { tasksSoFar += DAY_TASK_COUNTS[i]; completedDays = i + 1; } else break;
  }
  const currentWeekNum = Math.min(21, Math.floor(completedDays / 7) + 1);
  const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const currentDayName = dayNames[completedDays % 7];

  const filteredWeeks = phase === 'all' ? WEEKS : WEEKS.filter(w => String(w.phase) === phase);

  async function handleReset() {
    if (!window.confirm('Reset all progress? This cannot be undone.')) return;
    await resetProgress(); showToast('Progress reset! 🔄', 'info');
  }
  function handlePaid() { setShowPaywall(false); setUserData(prev => ({ ...prev, isPaid: true })); showToast('🎉 All 21 weeks unlocked!', 'success'); }

  const C = T; // alias

  return (
    <div style={{ minHeight:'100vh', background:C.bg, fontFamily:"'Syne',system-ui,sans-serif", color:C.text, transition:'background .2s, color .2s' }}>
      <style>{`* { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:${C.card2}; }
        ::-webkit-scrollbar-thumb { background:${C.scrollThumb}; border-radius:3px; }
        a { color:inherit; }
        select, input, textarea { color-scheme: ${isDark?'dark':'light'}; }
      `}</style>

      {isDark && <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(124,58,237,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.03) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none', zIndex:0 }} />}

      <div style={{ maxWidth:1040, margin:'0 auto', padding:'24px 16px', position:'relative', zIndex:1 }}>

        {/* ── HEADER ── */}
        <div style={{ background:C.headerGrad, border:`1px solid ${C.border}`, borderRadius:20, padding:'28px 24px 20px', marginBottom:16, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-50, left:'50%', transform:'translateX(-50%)', width:500, height:200, background:'radial-gradient(ellipse,rgba(124,58,237,.2) 0%,transparent 70%)', pointerEvents:'none' }} />

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
              <div style={{ background:'rgba(124,58,237,.15)', border:'1px solid rgba(124,58,237,.3)', borderRadius:8, padding:'4px 13px', fontSize:'.72rem', color:isDark?'#a78bfa':'#2d0070', fontFamily:"'Space Mono',monospace", fontWeight:isDark?400:800 }}>👤 {displayName}</div>
              <div style={{ background:isPaid?'rgba(16,185,129,.15)':'rgba(251,191,36,.1)', border:`1px solid ${isPaid?'rgba(16,185,129,.3)':'rgba(251,191,36,.3)'}`, borderRadius:8, padding:'4px 13px', fontSize:'.7rem', fontWeight:700, color:isPaid?'#34d399':'#fbbf24' }}>
                {isPaid ? '✅ PRO' : '🔓 FREE'}
              </div>
              {saving && <div style={{ fontSize:'.65rem', color:C.muted, fontFamily:"'Space Mono',monospace" }}>⟳ saving...</div>}
            </div>
            <button onClick={onLogout} style={{ background:'transparent', border:`1px solid ${C.border}`, color:C.muted, borderRadius:7, padding:'4px 12px', fontSize:'.7rem', fontFamily:'inherit', cursor:'pointer' }}>Logout</button>
          </div>

          <div style={{ textAlign:'center', marginBottom:20 }}>
            <div style={{ display:'inline-block', background:'rgba(124,58,237,.2)', border:'1px solid rgba(124,58,237,.5)', color:isDark?'#a78bfa':'#2d0070', fontFamily:"'Space Mono',monospace", fontSize:'.6rem', padding:'3px 14px', borderRadius:20, letterSpacing:'.1em', marginBottom:10, fontWeight:isDark?400:800 }}>
              🛠 BUILT BY A STUDENT · FOR STUDENTS WHO WANT TO CRACK MNC
            </div>
            <h1 style={{ fontSize:'clamp(1.5rem,4vw,2.4rem)', fontWeight:800, lineHeight:1.15, marginBottom:6, color:C.text }}>
              Your <span style={{ color:'#a78bfa' }}>21-Week</span> DSA Battle Plan
            </h1>
            <p style={{ color:C.sub, fontSize:'.82rem', marginBottom:4 }}>For students who don't know <strong style={{color:C.text}}>what to do each day</strong> — this tells you exactly.</p>
            <p style={{ color:C.muted, fontSize:'.75rem' }}>Amazon · Google · Microsoft · Meta · Flipkart · Goldman Sachs</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:8, marginBottom:16 }}>
            {[['🎓','Students targeting MNCs','Campus or off-campus placements'],['😤','Stuck on random LeetCode','Want a structured daily plan'],['⏰','Have 3–6 months to prep','Want to make every day count'],['🏆','Dream: Amazon / Google','Ready to grind with a roadmap']].map(([icon,title,sub]) => (
              <div key={title} style={{
                background:isDark?'rgba(124,58,237,.1)':'#d8ccf0',
                border:`1px solid ${isDark?'rgba(124,58,237,.2)':'#9980cc'}`,
                borderRadius:10, padding:'10px 12px'
              }}>
                <div style={{ fontSize:'1.1rem', marginBottom:4 }}>{icon}</div>
                <div style={{ fontSize:'.75rem', fontWeight:800, color:isDark?'#e2e8f0':'#1e0a3c', marginBottom:2 }}>{title}</div>
                <div style={{ fontSize:'.65rem', color:isDark?'#94a3b8':C.whoCardSub||'#3d2d66', fontWeight:500 }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            {['🧑‍💻 Built by a student, for students','📋 500+ handpicked problems','🏢 Company-tagged assessments','☁️ Progress saved to cloud','🎓 Certificate on completion'].map(t => (
              <div key={t} style={{ background:isDark?'rgba(255,255,255,.05)':C.card2, border:`1px solid ${C.border}`, borderRadius:6, padding:'4px 10px', fontSize:'.62rem', color:isDark?'#94a3b8':'#2d1060', fontWeight:isDark?400:700 }}>{t}</div>
            ))}
          </div>
        </div>

        {/* ── URGENCY BANNER ── */}
        {!isPaid && (
          <div style={{ background:'linear-gradient(135deg,rgba(245,158,11,.1),rgba(239,68,68,.08))', border:'1px solid rgba(245,158,11,.3)', borderRadius:12, padding:'12px 18px', marginBottom:16, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
            <div>
              <div style={{ fontSize:'.75rem', fontWeight:700, color:'#f59e0b' }}>⚡ Early Bird Offer — ₹{PRICE} Lifetime</div>
              <div style={{ fontSize:'.68rem', color:isDark?'#92400e':'#78350f', marginTop:2 }}>Price increases to ₹99 once we cross 500 users. Lock in ₹{PRICE} now.</div>
            </div>
            <button onClick={() => setShowPaywall(true)} style={{ background:'linear-gradient(135deg,#f59e0b,#d97706)', border:'none', color:'#000', padding:'8px 18px', borderRadius:8, fontFamily:'inherit', fontSize:'.78rem', fontWeight:800, cursor:'pointer' }}>
              Unlock ₹{PRICE} →
            </button>
          </div>
        )}

        {/* ── POSITION TRACKER ── */}
        <div style={{ background:C.statCard, border:`1px solid ${C.border}`, borderRadius:16, padding:'18px 20px', marginBottom:14, transition:'background .2s' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:C.muted, letterSpacing:'.08em', marginBottom:8 }}>// WHERE YOU ARE NOW</div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ background:'linear-gradient(135deg,#7c3aed,#5b21b6)', borderRadius:10, padding:'10px 16px', textAlign:'center' }}>
                  <div style={{ fontSize:'.58rem', color:'#c4b5fd', fontFamily:"'Space Mono',monospace" }}>WEEK</div>
                  <div style={{ fontSize:'1.8rem', fontWeight:800, color:'#fff', lineHeight:1 }}>{currentWeekNum}</div>
                </div>
                <div style={{ background:'rgba(6,182,212,.12)', border:'1px solid rgba(6,182,212,.25)', borderRadius:10, padding:'10px 16px', textAlign:'center' }}>
                  <div style={{ fontSize:'.58rem', color:'#67e8f9', fontFamily:"'Space Mono',monospace" }}>DAY</div>
                  <div style={{ fontSize:'1.8rem', fontWeight:800, color:'#06b6d4', lineHeight:1 }}>{currentDayName}</div>
                </div>
                <div>
                  <div style={{ fontSize:'.88rem', fontWeight:700, color:C.text }}>Day {completedDays + 1} of {DAY_TASK_COUNTS.length}</div>
                  <div style={{ fontSize:'.72rem', color:C.muted, marginTop:2 }}>{doneTasks} tasks done · {ALL_KEYS.length - doneTasks} remaining</div>
                  <div style={{ fontSize:'.68rem', color:'#a78bfa', marginTop:4, fontFamily:"'Space Mono',monospace" }}>🔥 {completedDays} days completed</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.6rem', color:C.muted, letterSpacing:'.08em', marginBottom:8 }}>// WEEK PROGRESS</div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap', maxWidth:280 }}>
                {WEEKS.map(w => {
                  const wTasks = []; w.days.forEach((d,di) => d.tasks.forEach((_,ti) => wTasks.push(`w${w.week}_d${di}_t${ti}`)));
                  const wDone = wTasks.filter(k => progress[k]).length;
                  const wPct = wTasks.length ? wDone/wTasks.length : 0;
                  const isCurrentW = w.week === currentWeekNum;
                  const locked = !isPaid && w.week > FREE_WEEKS;
                  return (
                    <div key={w.week} title={`Week ${w.week} — ${Math.round(wPct*100)}%`} style={{
                      width:24, height:24, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'.55rem', fontWeight:700, fontFamily:"'Space Mono',monospace",
                      background:locked?C.card2:wPct===1?'#10b981':wPct>0?`rgba(124,58,237,${0.2+wPct*0.8})`:isCurrentW?'rgba(6,182,212,.2)':C.card2,
                      border:isCurrentW?'2px solid #06b6d4':`1px solid ${locked?C.border:wPct>0?'rgba(124,58,237,.3)':C.border}`,
                      color:locked?C.muted:wPct===1?'#fff':wPct>0?(isDark?'#c4b5fd':'#6d28d9'):isCurrentW?'#06b6d4':C.muted,
                    }}>
                      {locked ? '🔒' : w.week}
                    </div>
                  );
                })}
              </div>
              <div style={{ display:'flex', gap:12, marginTop:8 }}>
                {[['#10b981','Done'],['#7c3aed','In progress'],['#06b6d4','Current'],[isDark?'#2a2a3d':C.border,'Not started']].map(([c,l]) => (
                  <div key={l} style={{ display:'flex', alignItems:'center', gap:3, fontSize:'.58rem', color:C.muted }}>
                    <div style={{ width:8, height:8, borderRadius:2, background:c }} />{l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:14 }}>
          {[['TASKS DONE',doneTasks,'#06b6d4'],['TOTAL TASKS',ALL_KEYS.length,'#a78bfa'],['COMPLETION',pct+'%','#f59e0b'],['WEEKS LEFT',Math.max(0,21-currentWeekNum+1),'#10b981']].map(([label,val,color]) => (
            <div key={label} style={{ background:C.statCard, border:`1px solid ${C.border}`, borderRadius:12, padding:'11px 14px' }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.55rem', color:C.muted, letterSpacing:'.06em', marginBottom:3 }}>// {label}</div>
              <div style={{ fontSize:'1.4rem', fontWeight:800, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* ── PROGRESS BAR ── */}
        <div style={{ background:C.statCard, border:`1px solid ${C.border}`, borderRadius:12, padding:'13px 17px', marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.7rem', color:C.muted, fontFamily:"'Space Mono',monospace", marginBottom:6 }}>
            <span>Overall Progress</span><span>{pct}%</span>
          </div>
          <div style={{ background:C.trackBg, borderRadius:99, height:10, overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,#7c3aed,#06b6d4)', width:pct+'%', transition:'width .5s' }} />
          </div>
          {!isPaid && <div style={{ marginTop:8, fontSize:'.7rem', color:C.muted, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span>Weeks 1–{FREE_WEEKS} free · Weeks {FREE_WEEKS+1}–21 locked</span>
            <button onClick={() => setShowPaywall(true)} style={{ background:'linear-gradient(135deg,#7c3aed,#5b21b6)', border:'none', color:'#fff', padding:'3px 10px', borderRadius:5, fontFamily:'inherit', fontSize:'.68rem', fontWeight:700, cursor:'pointer' }}>Unlock ₹{PRICE}</button>
          </div>}
        </div>

        {/* ── ACTIONS + MODE SWITCHER ── */}
        <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
          {mode === 'problems' && <>
            <Btn onClick={() => setOpenWeeks(Object.fromEntries(filteredWeeks.map(w=>[w.week,true])))}>Expand All</Btn>
            <Btn onClick={() => setOpenWeeks({})}>Collapse All</Btn>
            <Btn onClick={handleReset}>Reset</Btn>
          </>}

          {/* Mode switcher */}
          <div style={{ display:'flex', background:C.card2, border:`1px solid ${C.border}`, borderRadius:9, padding:3, gap:3 }}>
            <button onClick={() => setMode('problems')} style={{
              padding:'6px 16px', borderRadius:7, fontFamily:'inherit', fontSize:'.76rem', fontWeight:700, cursor:'pointer', border:'none', transition:'all .2s',
              background:mode==='problems'?'linear-gradient(135deg,#7c3aed,#5b21b6)':'transparent',
              color:mode==='problems'?'#fff':C.muted,
            }}>📋 Problems</button>
            <button onClick={() => setMode('concepts')} style={{
              padding:'6px 16px', borderRadius:7, fontFamily:'inherit', fontSize:'.76rem', fontWeight:700, cursor:'pointer', border:'none', transition:'all .2s',
              background:mode==='concepts'?'linear-gradient(135deg,#7c3aed,#5b21b6)':'transparent',
              color:mode==='concepts'?'#fff':C.muted,
            }}>🧠 Concepts</button>
          </div>

          {mode === 'concepts' && (
            <div style={{ display:'flex', background:C.card2, border:`1px solid ${C.border}`, borderRadius:8, padding:3, gap:2, marginLeft:'auto' }}>
              {['python','cpp','java'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding:'5px 12px', borderRadius:6, fontFamily:"'Space Mono',monospace", fontSize:'.68rem', fontWeight:700, cursor:'pointer', border:'none', transition:'all .15s',
                  background:lang===l?'linear-gradient(135deg,#7c3aed,#5b21b6)':'transparent',
                  color:lang===l?'#fff':C.muted,
                }}>{l==='python'?'Python':l==='cpp'?'C++':'Java'}</button>
              ))}
            </div>
          )}

          {!isPaid && <Btn onClick={() => setShowPaywall(true)} primary isDark={isDark}>🔓 Unlock — ₹{PRICE}</Btn>}
          {certUnlocked && <Btn onClick={() => setShowCert(true)} gold>🏆 Certificate</Btn>}
        </div>

        {/* ── PROBLEMS MODE ── */}
        {mode === 'problems' && <>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:14 }}>
            {[['easy','#34d399'],['medium','#fbbf24'],['hard','#f87171'],['concept','#a78bfa'],['practice','#22d3ee'],['revision','#fca5a5'],['mock','#fde68a']].map(([t,c]) => (
              <div key={t} style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.65rem', color:C.muted, fontFamily:"'Space Mono',monospace" }}>
                <div style={{ width:7, height:7, borderRadius:2, background:c }} />{t}
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
            {[['all','All Weeks'],['0','✅ Mastered'],['1','Phase 1'],['2','Phase 2'],['3','Phase 3'],['4','Phase 4']].map(([val,label]) => (
              <button key={val} onClick={() => setPhase(val)} style={{
                padding:'6px 13px', borderRadius:7, cursor:'pointer', fontFamily:'inherit', fontSize:'.76rem', fontWeight:700, transition:'all .2s',
                background:phase===val?(isDark?'rgba(124,58,237,.15)':'rgba(124,58,237,.18)'):isDark?C.statCard:C.card2,
                color:phase===val?(isDark?'#a78bfa':'#5b21b6'):isDark?C.muted:'#4a3d2a',
                border:`1px solid ${phase===val?'#7c3aed':C.border}`,
              }}>{label}</button>
            ))}
          </div>
          {filteredWeeks.map((week, idx) => {
            const locked = isWeekLocked(week);
            const prevWeek = filteredWeeks[idx-1];
            const showBanner = !isPaid && locked && (!prevWeek || !isWeekLocked(prevWeek));
            return (
              <div key={week.week}>
                {showBanner && (
                  <div style={{ background:'linear-gradient(135deg,rgba(124,58,237,.1),rgba(6,182,212,.07))', border:'1px solid rgba(124,58,237,.35)', borderRadius:16, padding:'24px 20px', marginBottom:16, textAlign:'center' }}>
                    <div style={{ fontSize:'2rem', marginBottom:8 }}>🔒</div>
                    <h3 style={{ color:C.text, fontSize:'1.1rem', fontWeight:800, marginBottom:6 }}>Weeks 6–21 are locked</h3>
                    <p style={{ color:C.muted, fontSize:'.82rem', marginBottom:16, lineHeight:1.6 }}>Complete the free preview — unlock all 16 remaining weeks including Matrix, Trees, Graphs, DP and more.</p>
                    <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:14 }}>
                      {['📊 Matrix','🌳 Trees & Graphs','🧠 DP','🔁 Backtracking','🎯 Mocks'].map(f => (
                        <span key={f} style={{ background:'rgba(124,58,237,.12)', border:'1px solid rgba(124,58,237,.3)', color:'#a78bfa', fontSize:'.65rem', padding:'3px 10px', borderRadius:20 }}>{f}</span>
                      ))}
                    </div>
                    <button onClick={() => setShowPaywall(true)} style={{ background:'linear-gradient(135deg,#7c3aed,#5b21b6)', border:'none', color:'#fff', padding:'12px 32px', borderRadius:10, fontFamily:'inherit', fontSize:'1rem', fontWeight:800, cursor:'pointer' }}>
                      🔓 Unlock All 21 Weeks — ₹{PRICE}
                    </button>
                    <p style={{ color:C.muted, fontSize:'.68rem', marginTop:10 }}>One-time · Lifetime · UPI / PhonePe / GPay</p>
                  </div>
                )}
                <WeekCard week={week} open={!!openWeeks[week.week]} progress={progress}
                  onToggle={() => setOpenWeeks(o => ({ ...o, [week.week]: !o[week.week] }))}
                  onTaskClick={toggleTask} isLocked={locked} isDark={isDark} T={T} />
              </div>
            );
          })}
        </>}

        {/* ── CONCEPTS MODE ── */}
        {mode === 'concepts' && (
          <div>
            {/* Free weeks 1-5: always visible */}
            {[1,2,3,4,5].map(weekNum => (
              <ConceptWeekPanel key={weekNum} weekNum={weekNum} lang={lang} isDark={isDark} T={T}
                open={!!openWeeks[`c${weekNum}`]}
                onToggle={() => setOpenWeeks(o => ({ ...o, [`c${weekNum}`]: !o[`c${weekNum}`] }))} />
            ))}
            {/* Paid weeks 6-21: show if paid, else locked banner */}
            {isPaid ? (
              [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(weekNum => (
                <ConceptWeekPanel key={weekNum} weekNum={weekNum} lang={lang} isDark={isDark} T={T}
                  open={!!openWeeks[`c${weekNum}`]}
                  onToggle={() => setOpenWeeks(o => ({ ...o, [`c${weekNum}`]: !o[`c${weekNum}`] }))} />
              ))
            ) : (
              <div style={{ background:C.statCard, border:`1px solid ${C.border}`, borderRadius:14, padding:'20px', textAlign:'center', marginBottom:8 }}>
                <div style={{ fontSize:'.6rem', color:isDark?C.muted:'#2d0070', fontFamily:"'Space Mono',monospace", letterSpacing:'.08em', marginBottom:14, fontWeight:700 }}>// WEEKS 6–21 CONCEPTS — LOCKED</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:6, marginBottom:16 }}>
                  {[[6,'Matrix + Strings'],[7,'Linked List'],[8,'Stack & Queue'],[9,'Backtracking'],[10,'Binary Trees'],[11,'BST + Heaps'],[12,'Graphs BFS/DFS'],[13,'Shortest Path + MST'],[14,'1D DP'],[15,'2D DP'],[16,'DP Advanced'],[17,'Greedy + Tries'],[18,'Bit Manipulation'],[19,'Weak Topic Rev.'],[20,'Full Mock Week'],[21,'Interview Week 🎯']].map(([w,name]) => (
                    <div key={w} style={{ background:C.card2, border:`1px solid ${C.border}`, borderRadius:8, padding:'10px 12px', opacity:0.75 }}>
                      <div style={{ fontSize:'.6rem', color:isDark?C.muted:'#2d0070', fontFamily:"'Space Mono',monospace", marginBottom:3, fontWeight:700 }}>🔒 WEEK {w}</div>
                      <div style={{ fontSize:'.73rem', fontWeight:700, color:isDark?C.sub:'#1e0a3c' }}>{name}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowPaywall(true)} style={{ background:'linear-gradient(135deg,#7c3aed,#5b21b6)', border:'none', color:'#fff', padding:'10px 28px', borderRadius:9, fontFamily:'inherit', fontSize:'.82rem', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 14px rgba(124,58,237,.4)' }}>
                  🔓 Unlock All Concepts — ₹{PRICE}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── FEEDBACK ── */}
        <FeedbackSection uid={user.uid} T={T} isDark={isDark} />

        {/* ── FOOTER ── */}
        <div style={{ textAlign:'center', padding:'20px 0 12px', color:C.muted, fontSize:'.7rem', fontFamily:"'Space Mono',monospace" }}>
          crackdsa.in · Built by a student · {!isPaid && <span style={{ color:'#a78bfa', cursor:'pointer' }} onClick={() => setShowPaywall(true)}>Upgrade ₹{PRICE}</span>} · Made with ❤️
          <div style={{ marginTop:10, display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              ['Return Policy','return'],
              ['Refund Policy','refund'],
              ['Privacy Policy','privacy'],
              ['Disclaimer','disclaimer'],
              ['About & Contact','about'],
            ].map(([label, anchor]) => (
              <a
                key={label}
                href={`/legal.html#${anchor}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color:C.muted, textDecoration:'none', fontSize:'.62rem', borderBottom:`1px solid transparent`, transition:'color .15s, border-color .15s' }}
                onMouseEnter={e => { e.target.style.color='#a78bfa'; e.target.style.borderBottomColor='#a78bfa'; }}
                onMouseLeave={e => { e.target.style.color=C.muted; e.target.style.borderBottomColor='transparent'; }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {showPaywall && <PaywallModal uid={user.uid} onPaid={handlePaid} onClose={() => setShowPaywall(false)} isDark={isDark} T={C} />}
      {showCert && <Certificate name={displayName} percent={pct} onClose={() => setShowCert(false)} />}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

function Btn({ children, onClick, primary, gold, isDark=true }) {
  const bg     = primary ? (isDark?'rgba(124,58,237,.2)':'rgba(109,40,217,.15)') : gold ? 'rgba(245,158,11,.1)' : 'transparent';
  const border = primary ? (isDark?'#7c3aed':'#5b21b6') : gold ? 'rgba(245,158,11,.4)' : '#2a2a3d';
  const color  = primary ? (isDark?'#c4b5fd':'#2d0070') : gold ? '#f59e0b' : '#64748b';
  const fw     = primary && !isDark ? 800 : 700;
  return (
    <button onClick={onClick} style={{ fontFamily:'inherit', fontSize:'.76rem', fontWeight:fw, padding:'7px 14px', borderRadius:7, cursor:'pointer', border:`1px solid ${border}`, background:bg, color, transition:'all .2s' }}>
      {children}
    </button>
  );
}

function Toast({ msg, type }) {
  const bg = type==='info'?'rgba(6,182,212,.95)':type==='error'?'rgba(239,68,68,.95)':'rgba(16,185,129,.95)';
  return <div style={{ position:'fixed', bottom:24, right:76, background:bg, color:'#fff', padding:'12px 18px', borderRadius:10, fontSize:'.82rem', fontWeight:700, zIndex:9999, boxShadow:'0 8px 24px rgba(0,0,0,.4)', maxWidth:320 }}>{msg}</div>;
}

function FeedbackSection({ uid, T, isDark }) {
  const [type, setType] = useState('wrong_problem');
  const [week, setWeek] = useState('');
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!msg.trim()) return;
    setLoading(true);
    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      await addDoc(collection(db, 'feedback'), { uid, week, type, message:msg.trim(), createdAt:serverTimestamp() });
      setDone(true);
    } catch(e) { console.error(e); }
    setLoading(false);
  }

  const inp = {
    width:'100%', padding:'10px 13px', background:T.inputBg, border:`1px solid ${T.border}`,
    borderRadius:8, color:T.text, fontSize:'.83rem', fontFamily:'inherit', outline:'none', marginBottom:10,
  };

  return (
    <div style={{ background:T.statCard, border:`1px solid ${T.border}`, borderRadius:16, padding:'24px 20px', marginTop:8, marginBottom:16 }}>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:'.62rem', fontFamily:"'Space Mono',monospace", color:'#a78bfa', letterSpacing:'.1em', marginBottom:6 }}>// FEEDBACK</div>
        <h3 style={{ color:T.text, fontWeight:800, fontSize:'1rem', marginBottom:4 }}>Found something wrong?</h3>
        <p style={{ color:T.muted, fontSize:'.75rem' }}>Wrong problem, missing topic, broken link — tell me and I'll fix it. 🙏</p>
      </div>
      {done ? (
        <div style={{ textAlign:'center', padding:'16px', background:'rgba(16,185,129,.08)', border:'1px solid rgba(16,185,129,.2)', borderRadius:10 }}>
          <div style={{ fontSize:'1.8rem', marginBottom:6 }}>🙏</div>
          <div style={{ color:'#34d399', fontWeight:700 }}>Thanks! I'll review and fix it soon.</div>
        </div>
      ) : (
        <>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
            <select value={type} onChange={e => setType(e.target.value)} style={{ ...inp, marginBottom:0, cursor:'pointer' }}>
              <option value="wrong_problem">Wrong problem</option>
              <option value="wrong_difficulty">Wrong difficulty</option>
              <option value="broken_link">Broken LC link</option>
              <option value="missing_problem">Missing problem</option>
              <option value="suggestion">General suggestion</option>
            </select>
            <input placeholder="Which week? (e.g. Week 3)" value={week} onChange={e => setWeek(e.target.value)} style={{ ...inp, marginBottom:0 }} />
          </div>
          <textarea placeholder="Describe the issue..." value={msg} onChange={e => setMsg(e.target.value)} rows={3} style={{ ...inp, resize:'vertical', lineHeight:1.5 }} />
          <button onClick={submit} disabled={loading || !msg.trim()} style={{ padding:'10px 24px', border:'none', borderRadius:8, fontFamily:'inherit', fontSize:'.83rem', fontWeight:700, cursor:'pointer', background:'linear-gradient(135deg,#7c3aed,#5b21b6)', color:'#fff', opacity:(loading||!msg.trim())?0.6:1 }}>
            {loading ? 'Submitting...' : 'Submit Feedback →'}
          </button>
        </>
      )}
    </div>
  );
}