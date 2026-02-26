// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { WEEKS, FREE_WEEKS, PRICE } from '../data/roadmap';
import WeekCard from '../components/WeekCard';
import PaywallModal from '../components/PaywallModal';
import Certificate from '../components/Certificate';
import { useProgress } from '../hooks/useProgress';

// build all task keys
const ALL_KEYS = [];
WEEKS.forEach(week => {
  week.days.forEach((d, di) => {
    d.tasks.forEach((_, ti) => {
      ALL_KEYS.push(`w${week.week}_d${di}_t${ti}`);
    });
  });
});

export default function Dashboard({ user, userData, setUserData, onLogout }) {
  const isPaid = userData?.isPaid || false;
  const displayName = user.displayName || userData?.displayName || user.email.split('@')[0];

  const { progress, toggleTask, resetProgress, syncProgress, saving } = useProgress(user.uid, userData?.progress);

  // sync progress from firebase when userData loads
  useEffect(() => {
    if (userData?.progress) syncProgress(userData.progress);
  }, []);

  const [openWeeks, setOpenWeeks] = useState({ 1: true });
  const [phase, setPhase] = useState('all');
  const [showPaywall, setShowPaywall] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }

  function isWeekLocked(week) {
    if (isPaid) return false;
    if (week.alreadyDone) return false;           // weeks 1-5 always free
    return week.week > FREE_WEEKS;                 // weeks 1-8 free, 9-21 locked
  }

  // stats
  const doneTasks = ALL_KEYS.filter(k => progress[k]).length;
  const pct = ALL_KEYS.length ? Math.round(doneTasks / ALL_KEYS.length * 100) : 0;
  const certUnlocked = pct >= 80 && isPaid;

  // phase filter
  const phaseMap = { 0:'✅ Mastered', 1:'Phase 1', 2:'Phase 2', 3:'Phase 3', 4:'Phase 4' };
  const filteredWeeks = phase === 'all' ? WEEKS : WEEKS.filter(w => String(w.phase) === phase);

  async function handleReset() {
    if (!window.confirm('Reset all progress? This cannot be undone.')) return;
    await resetProgress();
    showToast('Progress reset! Starting fresh. 🔄', 'info');
  }

  function handlePaid() {
    setShowPaywall(false);
    setUserData(prev => ({ ...prev, isPaid: true }));
    showToast('🎉 Access unlocked! All 21 weeks are now available.', 'success');
  }

  const phaseColors = { 1:'#3b82f6', 2:'#8b5cf6', 3:'#10b981', 4:'#ef4444' };

  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0f', fontFamily:"'Syne',system-ui,sans-serif", color:'#e2e8f0' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #12121a; }
        ::-webkit-scrollbar-thumb { background: #2a2a3d; border-radius: 3px; }
      `}</style>

      {/* Grid bg */}
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(124,58,237,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.03) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none', zIndex:0 }} />

      <div style={{ maxWidth:1040, margin:'0 auto', padding:'24px 16px', position:'relative', zIndex:1 }}>

        {/* HEADER */}
        <div style={{ background:'linear-gradient(135deg,#1a0533 0%,#0c1a2e 100%)', border:'1px solid #2a2a3d', borderRadius:20, padding:'32px 24px 24px', marginBottom:20, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-50, left:'50%', transform:'translateX(-50%)', width:500, height:200, background:'radial-gradient(ellipse,rgba(124,58,237,.28) 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ textAlign:'center', position:'relative' }}>
            <div style={{ display:'inline-block', background:'rgba(124,58,237,.2)', border:'1px solid rgba(124,58,237,.5)', color:'#a78bfa', fontFamily:"'Space Mono',monospace", fontSize:'.6rem', padding:'3px 14px', borderRadius:20, letterSpacing:'.1em', marginBottom:10 }}>
              CRACKDSA.IN · 21 WEEKS · 500+ PROBLEMS
            </div>
            <h1 style={{ fontSize:'clamp(1.5rem,4vw,2.4rem)', fontWeight:800, lineHeight:1.15, marginBottom:6 }}>
              Crack Your <span style={{ color:'#a78bfa' }}>MNC</span> DSA Interview
            </h1>
            <p style={{ color:'#64748b', fontSize:'.82rem', marginBottom:16 }}>Amazon · Google · Microsoft · Meta · Flipkart · Goldman Sachs</p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, flexWrap:'wrap' }}>
              <div style={{ background:'rgba(124,58,237,.15)', border:'1px solid rgba(124,58,237,.3)', borderRadius:8, padding:'4px 13px', fontSize:'.75rem', color:'#c4b5fd', fontFamily:"'Space Mono',monospace" }}>
                👤 {displayName}
              </div>
              <div style={{ background: isPaid ? 'rgba(16,185,129,.15)' : 'rgba(251,191,36,.1)', border:`1px solid ${isPaid ? 'rgba(16,185,129,.3)' : 'rgba(251,191,36,.3)'}`, borderRadius:8, padding:'4px 13px', fontSize:'.72rem', fontWeight:700, color: isPaid ? '#34d399' : '#fbbf24' }}>
                {isPaid ? '✅ PRO' : `🔓 FREE — Weeks 1-${FREE_WEEKS}`}
              </div>
              {saving && <div style={{ fontSize:'.68rem', color:'#64748b', fontFamily:"'Space Mono',monospace" }}>⟳ saving...</div>}
              <button onClick={onLogout} style={{ background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.25)', color:'#f87171', borderRadius:7, padding:'4px 12px', fontSize:'.72rem', fontFamily:'inherit', fontWeight:700, cursor:'pointer' }}>Logout</button>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:10, marginBottom:16 }}>
          {[
            ['TASKS DONE', doneTasks, '#06b6d4'],
            ['TOTAL', ALL_KEYS.length, '#a78bfa'],
            ['COMPLETION', pct+'%', '#f59e0b'],
            ['WEEKS LEFT', Math.max(0, 21-Math.round(pct/100*21)), '#10b981'],
          ].map(([label, val, color]) => (
            <div key={label} style={{ background:'#1a1a26', border:'1px solid #2a2a3d', borderRadius:12, padding:'13px 15px' }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.58rem', color:'#64748b', letterSpacing:'.06em', marginBottom:3 }}>// {label}</div>
              <div style={{ fontSize:'1.55rem', fontWeight:800, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* PROGRESS BAR */}
        <div style={{ background:'#1a1a26', border:'1px solid #2a2a3d', borderRadius:12, padding:'13px 17px', marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.7rem', color:'#64748b', fontFamily:"'Space Mono',monospace", marginBottom:6 }}>
            <span>Overall Progress</span><span>{pct}%</span>
          </div>
          <div style={{ background:'#2a2a3d', borderRadius:99, height:10, overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,#7c3aed,#06b6d4)', width:pct+'%', transition:'width .5s cubic-bezier(.4,0,.2,1)' }} />
          </div>
          {!isPaid && (
            <div style={{ marginTop:8, fontSize:'.7rem', color:'#64748b', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span>Weeks 1–{FREE_WEEKS} free · Weeks {FREE_WEEKS+1}–21 locked</span>
              <button onClick={() => setShowPaywall(true)} style={{ background:'linear-gradient(135deg,#7c3aed,#5b21b6)', border:'none', color:'#fff', padding:'3px 10px', borderRadius:5, fontFamily:'inherit', fontSize:'.68rem', fontWeight:700, cursor:'pointer' }}>
                Unlock ₹{PRICE}
              </button>
            </div>
          )}
          {certUnlocked && (
            <div style={{ marginTop:8, fontSize:'.73rem', color:'#f59e0b', display:'flex', alignItems:'center', gap:8, justifyContent:'center' }}>
              🏆 You've reached 80%! &nbsp;
              <button onClick={() => setShowCert(true)} style={{ background:'linear-gradient(135deg,#f59e0b,#d97706)', border:'none', color:'#000', padding:'3px 10px', borderRadius:5, fontFamily:'inherit', fontSize:'.68rem', fontWeight:700, cursor:'pointer' }}>
                Get Certificate
              </button>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
          <ActionBtn onClick={() => setOpenWeeks(Object.fromEntries(filteredWeeks.map(w=>[w.week,true])))}>Expand All</ActionBtn>
          <ActionBtn onClick={() => setOpenWeeks({})}>Collapse All</ActionBtn>
          <ActionBtn onClick={handleReset} danger>🔄 Reset Progress</ActionBtn>
          {!isPaid && <ActionBtn onClick={() => setShowPaywall(true)} primary>🔓 Unlock All Weeks — ₹{PRICE}</ActionBtn>}
          {certUnlocked && <ActionBtn onClick={() => setShowCert(true)} gold>🏆 Get Certificate</ActionBtn>}
        </div>

        {/* LEGEND */}
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:16 }}>
          {[['easy','#34d399'],['medium','#fbbf24'],['hard','#f87171'],['concept','#a78bfa'],['practice','#22d3ee'],['revision','#fca5a5'],['mock','#fde68a']].map(([t,c]) => (
            <div key={t} style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.65rem', color:'#64748b', fontFamily:"'Space Mono',monospace" }}>
              <div style={{ width:7, height:7, borderRadius:2, background:c }} />{t}
            </div>
          ))}
        </div>

        {/* PHASE TABS */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
          {[['all','All Weeks'],['0','✅ Mastered'],['1','Phase 1'],['2','Phase 2'],['3','Phase 3'],['4','Phase 4']].map(([val,label]) => (
            <button key={val} onClick={() => setPhase(val)} style={{
              padding:'6px 13px', border:'none', borderRadius:7, cursor:'pointer', fontFamily:'inherit', fontSize:'.76rem', fontWeight:700, transition:'all .2s',
              background: phase===val ? 'rgba(124,58,237,.15)' : '#1a1a26',
              color: phase===val ? '#a78bfa' : '#64748b',
              borderWidth:1, borderStyle:'solid', borderColor: phase===val ? '#7c3aed' : '#2a2a3d',
            }}>{label}</button>
          ))}
        </div>

        {/* WEEK CARDS */}
        {filteredWeeks.map((week, idx) => {
          const locked = isWeekLocked(week);
          const prevWeek = filteredWeeks[idx - 1];
          const showBanner = !isPaid && locked && (!prevWeek || !isWeekLocked(prevWeek));
          return (
            <div key={week.week}>
              {showBanner && (
                <div style={{
                  background:'linear-gradient(135deg,rgba(124,58,237,.12),rgba(6,182,212,.08))',
                  border:'1px solid rgba(124,58,237,.4)',
                  borderRadius:16, padding:'24px 20px', marginBottom:16, textAlign:'center',
                }}>
                  <div style={{ fontSize:'2rem', marginBottom:8 }}>🔒</div>
                  <h3 style={{ color:'#e2e8f0', fontSize:'1.1rem', fontWeight:800, marginBottom:6 }}>
                    Weeks 6–21 are locked
                  </h3>
                  <p style={{ color:'#64748b', fontSize:'.82rem', marginBottom:16, lineHeight:1.6 }}>
                    You have completed the free preview — Weeks 1–5.<br/>
                    Unlock all 16 remaining weeks including Matrix, Trees, Graphs, DP and more.
                  </p>
                  <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:14 }}>
                    {['📊 Matrix','🌳 Trees & Graphs','🧠 DP','🔁 Backtracking','🎯 Mocks'].map(f => (
                      <span key={f} style={{ background:'rgba(124,58,237,.12)', border:'1px solid rgba(124,58,237,.3)', color:'#a78bfa', fontSize:'.65rem', padding:'3px 10px', borderRadius:20 }}>{f}</span>
                    ))}
                  </div>
                  <button onClick={() => setShowPaywall(true)} style={{
                    background:'linear-gradient(135deg,#7c3aed,#5b21b6)', border:'none', color:'#fff',
                    padding:'12px 32px', borderRadius:10, fontFamily:'inherit', fontSize:'1rem',
                    fontWeight:800, cursor:'pointer',
                  }}>
                    🔓 Unlock All 21 Weeks — ₹{PRICE}
                  </button>
                  <p style={{ color:'#475569', fontSize:'.68rem', marginTop:10 }}>One-time · Lifetime · UPI / PhonePe / GPay</p>
                </div>
              )}
              <WeekCard
                week={week}
                open={!!openWeeks[week.week]}
                progress={progress}
                onToggle={() => setOpenWeeks(o => ({ ...o, [week.week]: !o[week.week] }))}
                onTaskClick={toggleTask}
                isLocked={locked}
              />
            </div>
          );
        })}

        {/* Footer */}
        <div style={{ textAlign:'center', padding:'24px 0 8px', color:'#334155', fontSize:'.7rem', fontFamily:"'Space Mono',monospace" }}>
          crackdsa.in · Built for MNC prep · {!isPaid && <><span style={{ color:'#a78bfa', cursor:'pointer' }} onClick={() => setShowPaywall(true)}>Upgrade to Pro ₹{PRICE}</span> · </>}Made with ❤️ for Indian engineers
        </div>
      </div>

      {showPaywall && <PaywallModal uid={user.uid} onPaid={handlePaid} onClose={() => setShowPaywall(false)} />}
      {showCert && <Certificate name={displayName} percent={pct} onClose={() => setShowCert(false)} />}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

function ActionBtn({ children, onClick, danger, primary, gold }) {
  const colors = danger ? { bg:'rgba(239,68,68,.1)', border:'rgba(239,68,68,.3)', color:'#f87171', hover:'rgba(239,68,68,.2)' }
    : primary ? { bg:'linear-gradient(135deg,rgba(124,58,237,.3),rgba(91,33,182,.3))', border:'#7c3aed', color:'#c4b5fd', hover:'rgba(124,58,237,.4)' }
    : gold ? { bg:'rgba(245,158,11,.1)', border:'rgba(245,158,11,.3)', color:'#f59e0b', hover:'rgba(245,158,11,.2)' }
    : { bg:'transparent', border:'#2a2a3d', color:'#64748b', hover:'#2a2a3d30' };

  return (
    <button onClick={onClick} style={{ fontFamily:'inherit', fontSize:'.76rem', fontWeight:700, padding:'7px 14px', borderRadius:7, cursor:'pointer', border:`1px solid ${colors.border}`, background:colors.bg, color:colors.color, transition:'all .2s' }}
      onMouseEnter={e => e.currentTarget.style.background = colors.hover}
      onMouseLeave={e => e.currentTarget.style.background = colors.bg}>
      {children}
    </button>
  );
}

function Toast({ msg, type }) {
  const bg = type === 'info' ? 'rgba(6,182,212,.95)' : type === 'error' ? 'rgba(239,68,68,.95)' : 'rgba(16,185,129,.95)';
  return (
    <div style={{ position:'fixed', bottom:24, right:24, background:bg, color:'#fff', padding:'12px 18px', borderRadius:10, fontSize:'.82rem', fontWeight:700, fontFamily:"'Syne',sans-serif", zIndex:9999, boxShadow:'0 8px 24px rgba(0,0,0,.4)', maxWidth:320, lineHeight:1.4 }}>
      {msg}
    </div>
  );
}