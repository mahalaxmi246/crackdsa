// src/components/WeekCard.jsx
const TAG_COLORS = {
  easy:     ['#0d2d1f','#34d399'],
  medium:   ['#2d1f00','#fbbf24'],
  hard:     ['#2d0d0d','#f87171'],
  concept:  ['#1a1030','#a78bfa'],
  practice: ['#001e2d','#22d3ee'],
  revision: ['#2d1010','#fca5a5'],
  mock:     ['#2d2000','#fde68a'],
};
const CO_COLORS = {
  amazon:'#ff9900', google:'#4285f4', microsoft:'#00a4ef', meta:'#0668e1',
  adobe:'#ff0000', flipkart:'#f9af1c', samsung:'#1428a0', oracle:'#dc3545',
  goldman:'#5f9ea0', uber:'#1a1a1a', default:'#64748b',
};
const DIFF_COLORS = { E:'#34d399', M:'#fbbf24', H:'#f87171' };

export default function WeekCard({ week, open, progress, onToggle, onTaskClick, isLocked }) {
  let total = 0, done = 0;
  week.days.forEach((d, di) => d.tasks.forEach((_, ti) => {
    total++;
    if (progress[`w${week.week}_d${di}_t${ti}`]) done++;
  }));
  const pct = total ? Math.round(done / total * 100) : 0;

  const phaseBg = {
    0: 'linear-gradient(135deg,#065f46,#047857)',
    1: 'linear-gradient(135deg,#1e3a5f,#1e40af)',
    2: 'linear-gradient(135deg,#3b1f6b,#7c3aed)',
    3: 'linear-gradient(135deg,#1a2e1f,#15803d)',
    4: 'linear-gradient(135deg,#7c1f1f,#b91c1c)',
  };

  // LOCKED — just show a greyed out non-clickable row
  if (isLocked) {
    return (
      <div style={{
        background:'#12121a', border:'1px solid #1e1e2a',
        borderRadius:16, marginBottom:8, overflow:'hidden', opacity: 0.45,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 18px' }}>
          <div style={{ background:'#1e1e2a', color:'#475569', fontFamily:"'Space Mono',monospace", fontSize:'.58rem', padding:'3px 9px', borderRadius:5, flexShrink:0 }}>
            WEEK {week.week}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'.85rem', fontWeight:700, color:'#475569', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {week.title}
            </div>
            <div style={{ fontSize:'.63rem', color:'#334155', fontFamily:"'Space Mono',monospace" }}>
              {week.phaseLabel}
            </div>
          </div>
          <span style={{ fontSize:'.8rem' }}>🔒</span>
        </div>
      </div>
    );
  }

  // UNLOCKED — full card
  return (
    <div style={{
      background:'#1a1a26', border:'1px solid #2a2a3d',
      borderRadius:16, marginBottom:12, overflow:'hidden', transition:'border-color .2s'
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor='rgba(124,58,237,.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor='#2a2a3d'}>

      {/* Header */}
      <div onClick={onToggle}
        style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 18px', cursor:'pointer', userSelect:'none' }}>
        <div style={{
          background: phaseBg[week.phase] || phaseBg[1],
          color:'#fff', fontFamily:"'Space Mono',monospace",
          fontSize:'.58rem', padding:'3px 9px', borderRadius:5, flexShrink:0, letterSpacing:'.04em'
        }}>
          WEEK {week.week}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'.88rem', fontWeight:700, color:'#e2e8f0', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
            {week.title}
          </div>
          <div style={{ fontSize:'.63rem', color:'#64748b', fontFamily:"'Space Mono',monospace" }}>
            {week.phaseLabel}
          </div>
        </div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.68rem', color: done===total && total>0 ? '#10b981' : '#06b6d4', flexShrink:0 }}>
          {done}/{total}
        </div>
        <div style={{ color:'#64748b', fontSize:'.85rem', transition:'transform .25s', transform:open?'rotate(180deg)':'rotate(0)', flexShrink:0 }}>▾</div>
      </div>

      {/* Progress bar */}
      <div style={{ height:2, background:'#2a2a3d' }}>
        <div style={{ height:'100%', background:'linear-gradient(90deg,#7c3aed,#06b6d4)', width:pct+'%', transition:'width .4s' }} />
      </div>

      {/* Open content */}
      {open && (
        <div style={{ padding:'0 18px 18px' }}>
          <div style={{ fontSize:'.78rem', color:'#64748b', margin:'12px 0', padding:'9px 13px', background:'rgba(6,182,212,.07)', borderLeft:'3px solid #06b6d4', borderRadius:'0 8px 8px 0', fontStyle:'italic' }}>
            {week.goal}
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
            {week.patterns.map(p => (
              <span key={p} style={{ background:'rgba(124,58,237,.12)', border:'1px solid rgba(124,58,237,.3)', color:'#c4b5fd', fontSize:'.58rem', fontFamily:"'Space Mono',monospace", padding:'2px 8px', borderRadius:20 }}>{p}</span>
            ))}
          </div>

          {week.days.map((d, di) => (
            <div key={di} style={{ marginBottom:14 }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.62rem', color:'#f59e0b', letterSpacing:'.08em', marginBottom:6, display:'flex', alignItems:'center', gap:8 }}>
                {d.day}
                <span style={{ flex:1, height:1, background:'#2a2a3d', display:'block' }} />
              </div>
              {d.tasks.map((task, ti) => {
                const key = `w${week.week}_d${di}_t${ti}`;
                const isDone = !!progress[key];
                const [bg, color] = TAG_COLORS[task.tag] || TAG_COLORS.concept;
                return (
                  <div key={ti} onClick={() => onTaskClick(key)}
                    style={{
                      display:'flex', alignItems:'flex-start', gap:9, padding:'8px 11px',
                      background: isDone ? '#0d2d1f' : '#12121a',
                      border:`1px solid ${isDone ? 'rgba(16,185,129,.25)' : '#2a2a3d'}`,
                      borderRadius:9, marginBottom:3, cursor:'pointer', opacity: isDone ? .7 : 1, transition:'all .15s'
                    }}
                    onMouseEnter={e => { if (!isDone) e.currentTarget.style.background='#16162a'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = isDone ? '#0d2d1f' : '#12121a'; }}>
                    <div style={{
                      width:16, height:16, flexShrink:0, marginTop:2,
                      border:`2px solid ${isDone ? '#10b981' : '#2a2a3d'}`,
                      borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center',
                      background: isDone ? '#10b981' : 'transparent', transition:'all .2s'
                    }}>
                      {isDone && <span style={{ color:'#fff', fontSize:'.6rem' }}>✓</span>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'.81rem', lineHeight:1.4, textDecoration: isDone ? 'line-through' : 'none', color: isDone ? '#64748b' : '#e2e8f0' }}>
                        {task.t}
                      </div>
                      <div style={{ display:'flex', gap:5, marginTop:3, flexWrap:'wrap', alignItems:'center' }}>
                        <span style={{ fontSize:'.57rem', fontFamily:"'Space Mono',monospace", padding:'2px 6px', borderRadius:3, fontWeight:700, background:`${bg}99`, color }}>
                          {task.tag.toUpperCase()}
                        </span>
                        {task.lc && task.lc !== 'custom' && (
                          <span style={{ fontSize:'.56rem', fontFamily:"'Space Mono',monospace", color:'#475569', background:'rgba(255,255,255,.04)', border:'1px solid #2a2a3d', padding:'1px 5px', borderRadius:3 }}>
                            LC{task.lc}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {week.assessment && (
            <div style={{ marginTop:16, background:'linear-gradient(135deg,rgba(124,58,237,.08),rgba(6,182,212,.05))', border:'1px solid rgba(124,58,237,.3)', borderRadius:12, padding:'14px 16px' }}>
              <div style={{ fontSize:'.67rem', fontFamily:"'Space Mono',monospace", color:'#a78bfa', letterSpacing:'.1em', marginBottom:10 }}>🎯 {week.assessment.title}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:8 }}>
                {week.assessment.companies.map(co => (
                  <div key={co.name} style={{ background:'rgba(0,0,0,.25)', borderRadius:8, padding:'10px 12px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
                      <span style={{ fontSize:'.65rem', fontWeight:700, padding:'2px 8px', borderRadius:4, background:`${CO_COLORS[co.cls]||CO_COLORS.default}22`, color:CO_COLORS[co.cls]||CO_COLORS.default, border:`1px solid ${CO_COLORS[co.cls]||CO_COLORS.default}44` }}>
                        {co.name}
                      </span>
                      <span style={{ fontSize:'.56rem', fontFamily:"'Space Mono',monospace", color:'#64748b', background:'rgba(255,255,255,.05)', padding:'2px 5px', borderRadius:3, border:'1px solid #2a2a3d' }}>
                        {co.year}
                      </span>
                    </div>
                    <ul style={{ listStyle:'none' }}>
                      {co.problems.map((p,i) => (
                        <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:5, padding:'2px 0', fontSize:'.73rem', color:'#e2e8f0', lineHeight:1.35 }}>
                          <span style={{ color:'#06b6d4', fontSize:'.62rem', flexShrink:0, marginTop:2 }}>→</span>
                          <span style={{ fontSize:'.54rem', fontFamily:"'Space Mono',monospace", padding:'1px 4px', borderRadius:3, background:`${DIFF_COLORS[p.diff]}22`, color:DIFF_COLORS[p.diff], flexShrink:0, marginTop:2 }}>
                            {p.diff}
                          </span>
                          {p.t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}