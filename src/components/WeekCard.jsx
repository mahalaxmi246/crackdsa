import { getLCUrl } from '../data/lcSlugs';

const TAG_COLORS_DARK = {
  easy:     ['rgba(16,185,129,.15)','#34d399'],
  medium:   ['rgba(251,191,36,.12)','#fbbf24'],
  hard:     ['rgba(248,113,113,.12)','#f87171'],
  concept:  ['rgba(167,139,250,.12)','#a78bfa'],
  practice: ['rgba(34,211,238,.1)','#22d3ee'],
  revision: ['rgba(252,165,165,.1)','#fca5a5'],
  mock:     ['rgba(253,230,138,.1)','#fde68a'],
};
const TAG_COLORS_LIGHT = {
  easy:     ['rgba(16,185,129,.12)','#059669'],
  medium:   ['rgba(217,119,6,.12)','#d97706'],
  hard:     ['rgba(220,38,38,.1)','#dc2626'],
  concept:  ['rgba(124,58,237,.12)','#7c3aed'],
  practice: ['rgba(8,145,178,.1)','#0891b2'],
  revision: ['rgba(225,29,72,.08)','#e11d48'],
  mock:     ['rgba(161,98,7,.1)','#a16207'],
};
const CO_COLORS = {
  amazon:'#ff9900', google:'#4285f4', microsoft:'#00a4ef', meta:'#0668e1',
  adobe:'#ff0000', flipkart:'#f9af1c', samsung:'#1428a0', oracle:'#dc3545',
  goldman:'#5f9ea0', uber:'#6b7280', default:'#64748b',
};
const DIFF_COLORS = { E:'#10b981', M:'#f59e0b', H:'#ef4444' };
const TAG_ORDER = { easy:0, medium:1, hard:2, concept:3, practice:3, revision:3, mock:3 };
function sortTasks(tasks) {
  return [...tasks].sort((a,b) => (TAG_ORDER[a.tag]??3)-(TAG_ORDER[b.tag]??3));
}

const phaseBg = {
  0:'linear-gradient(135deg,#065f46,#047857)',
  1:'linear-gradient(135deg,#1e3a5f,#1e40af)',
  2:'linear-gradient(135deg,#3b1f6b,#7c3aed)',
  3:'linear-gradient(135deg,#1a2e1f,#15803d)',
  4:'linear-gradient(135deg,#7c1f1f,#b91c1c)',
};

export default function WeekCard({ week, open, progress, onToggle, onTaskClick, isLocked, isDark=true, T }) {
  let total=0, done=0;
  week.days.forEach((d,di) => d.tasks.forEach((_,ti) => {
    total++;
    if (progress[`w${week.week}_d${di}_t${ti}`]) done++;
  }));
  const pct = total ? Math.round(done/total*100) : 0;
  const TAG_COLORS = isDark ? TAG_COLORS_DARK : TAG_COLORS_LIGHT;

  // Task row bg colors
  const taskDoneBg     = isDark ? 'rgba(16,185,129,.1)'  : 'rgba(16,185,129,.12)';
  const taskDoneBorder = isDark ? 'rgba(16,185,129,.25)' : 'rgba(16,185,129,.35)';
  const taskUndoneBg   = isDark ? T?.card2||'#12121a' : T?.taskUndone||'#ede8de';
  const taskHoverBg    = isDark ? '#16162a'           : T?.taskHover||'#e2dace';

  if (isLocked) return (
    <div style={{ background:isDark?T?.card2:T?.card2||'#e8e0d0', border:`1px solid ${T?.border}`, borderRadius:16, marginBottom:8, overflow:'hidden', opacity:.5 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 18px' }}>
        <div style={{ background:T?.card2, color:T?.muted, fontFamily:"'Space Mono',monospace", fontSize:'.58rem', padding:'3px 9px', borderRadius:5, flexShrink:0 }}>WEEK {week.week}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:'.85rem', fontWeight:700, color:T?.muted }}>{week.title}</div>
          <div style={{ fontSize:'.63rem', color:T?.muted, fontFamily:"'Space Mono',monospace" }}>{week.phaseLabel}</div>
        </div>
        <span style={{ fontSize:'.8rem' }}>🔒</span>
      </div>
    </div>
  );

  return (
    <div style={{ background:T?.statCard||T?.card, border:`1px solid ${T?.border}`, borderRadius:16, marginBottom:12, overflow:'hidden', transition:'all .2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor='rgba(124,58,237,.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor=T?.border}>

      {/* Header */}
      <div onClick={onToggle} style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 18px', cursor:'pointer', userSelect:'none' }}>
        <div style={{ background:phaseBg[week.phase]||phaseBg[1], color:'#fff', fontFamily:"'Space Mono',monospace", fontSize:'.58rem', padding:'3px 9px', borderRadius:5, flexShrink:0 }}>
          WEEK {week.week}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'.88rem', fontWeight:700, color:T?.text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{week.title}</div>
          <div style={{ fontSize:'.63rem', color:T?.muted, fontFamily:"'Space Mono',monospace" }}>{week.phaseLabel}</div>
        </div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.68rem', color:done===total&&total>0?'#10b981':'#06b6d4', flexShrink:0 }}>{done}/{total}</div>
        <div style={{ color:T?.muted, fontSize:'.85rem', transition:'transform .25s', transform:open?'rotate(180deg)':'rotate(0)', flexShrink:0 }}>▾</div>
      </div>

      {/* Progress bar */}
      <div style={{ height:2, background:T?.trackBg||T?.border }}>
        <div style={{ height:'100%', background:'linear-gradient(90deg,#7c3aed,#06b6d4)', width:pct+'%', transition:'width .4s' }} />
      </div>

      {/* Open content */}
      {open && (
        <div style={{ padding:'0 18px 18px' }}>
          <div style={{ fontSize:'.78rem', color:isDark?T?.sub:'#1e0040', margin:'12px 0', fontWeight:isDark?400:600, padding:'9px 13px', background:isDark?'rgba(6,182,212,.07)':'rgba(8,145,178,.08)', borderLeft:'3px solid #0891b2', borderRadius:'0 8px 8px 0', fontStyle:'italic' }}>
            {week.goal}
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
            {week.patterns.map(p => (
              <span key={p} style={{ background:isDark?'rgba(124,58,237,.12)':'rgba(124,58,237,.12)', border:`1px solid ${isDark?'rgba(124,58,237,.3)':'rgba(109,40,217,.4)'}`, color:isDark?'#c4b5fd':'#1e0040', fontWeight:isDark?400:800, fontSize:'.58rem', fontFamily:"'Space Mono',monospace", padding:'2px 8px', borderRadius:20 }}>{p}</span>
            ))}
          </div>

          {week.days.map((d,di) => (
            <div key={di} style={{ marginBottom:14 }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'.62rem', color:'#f59e0b', letterSpacing:'.08em', marginBottom:6, display:'flex', alignItems:'center', gap:8 }}>
                {d.day}
                <span style={{ flex:1, height:1, background:T?.border, display:'block' }} />
              </div>
              {sortTasks(d.tasks).map((task,ti) => {
                const key = `w${week.week}_d${di}_t${ti}`;
                const isDone = !!progress[key];
                const [tagBg, tagColor] = TAG_COLORS[task.tag]||TAG_COLORS.concept;
                return (
                  <div key={ti} onClick={() => onTaskClick(key)}
                    style={{
                      display:'flex', alignItems:'flex-start', gap:9, padding:'9px 12px',
                      background: isDone ? taskDoneBg : taskUndoneBg,
                      border:`1px solid ${isDone ? taskDoneBorder : T?.border}`,
                      borderRadius:9, marginBottom:4, cursor:'pointer', transition:'all .15s',
                    }}
                    onMouseEnter={e => { if (!isDone) e.currentTarget.style.background=taskHoverBg; }}
                    onMouseLeave={e => { e.currentTarget.style.background=isDone?taskDoneBg:taskUndoneBg; }}>
                    {/* Checkbox */}
                    <div style={{
                      width:17, height:17, flexShrink:0, marginTop:2,
                      border:`2px solid ${isDone?'#10b981':T?.border}`,
                      borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center',
                      background:isDone?'#10b981':'transparent', transition:'all .2s',
                    }}>
                      {isDone && <span style={{ color:'#fff', fontSize:'.6rem', fontWeight:900 }}>✓</span>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{
                        fontSize:'.81rem', lineHeight:1.4,
                        textDecoration:isDone?'line-through':'none',
                        color:isDone?T?.muted:T?.text,
                      }}>
                        {task.t}
                      </div>
                      <div style={{ display:'flex', gap:5, marginTop:4, flexWrap:'wrap', alignItems:'center' }}>
                        <span style={{ fontSize:'.57rem', fontFamily:"'Space Mono',monospace", padding:'2px 6px', borderRadius:3, fontWeight:700, background:tagBg, color:tagColor }}>
                          {task.tag.toUpperCase()}
                        </span>
                        {task.lc && task.lc !== 'custom' && getLCUrl(task.lc) && (
                          <a href={getLCUrl(task.lc)} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{ fontSize:'.56rem', fontFamily:"'Space Mono',monospace", color:'#06b6d4', background:isDark?'rgba(6,182,212,.08)':'rgba(8,145,178,.1)', border:'1px solid rgba(6,182,212,.3)', padding:'1px 6px', borderRadius:3, textDecoration:'none' }}>
                            LC {task.lc} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Assessment */}
          {week.assessment && (
            <div style={{ marginTop:16, background:isDark?'rgba(124,58,237,.08)':'rgba(124,58,237,.1)', border:`1px solid ${isDark?'rgba(124,58,237,.25)':'rgba(109,40,217,.25)'}`, borderRadius:12, padding:'14px 16px' }}>
              <div style={{ fontSize:'.67rem', fontFamily:"'Space Mono',monospace", color:isDark?'#a78bfa':'#2d0070', letterSpacing:'.1em', marginBottom:10, fontWeight:800 }}>🎯 {week.assessment.title}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:8 }}>
                {week.assessment.companies.map(co => (
                  <div key={co.name} style={{ background:isDark?'rgba(0,0,0,.2)':'rgba(0,0,0,.06)', border:`1px solid ${T?.border}`, borderRadius:8, padding:'10px 12px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
                      <span style={{ fontSize:'.65rem', fontWeight:700, padding:'2px 8px', borderRadius:4, background:`${CO_COLORS[co.cls]||CO_COLORS.default}22`, color:CO_COLORS[co.cls]||CO_COLORS.default, border:`1px solid ${CO_COLORS[co.cls]||CO_COLORS.default}44` }}>
                        {co.name}
                      </span>
                      <span style={{ fontSize:'.56rem', fontFamily:"'Space Mono',monospace", color:isDark?T?.muted:'#2d0070', fontWeight:isDark?400:700, background:isDark?'rgba(255,255,255,.05)':'rgba(0,0,0,.04)', padding:'2px 5px', borderRadius:3, border:`1px solid ${T?.border}` }}>
                        {co.year}
                      </span>
                    </div>
                    <ul style={{ listStyle:'none' }}>
                      {co.problems.map((p,i) => (
                        <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:5, padding:'2px 0', fontSize:'.73rem', color:isDark?T?.text:'#0d0820', lineHeight:1.35, fontWeight:isDark?400:700 }}>
                          <span style={{ color:'#06b6d4', fontSize:'.62rem', flexShrink:0, marginTop:2 }}>→</span>
                          <span style={{ fontSize:'.54rem', fontFamily:"'Space Mono',monospace", padding:'1px 4px', borderRadius:3, background:`${DIFF_COLORS[p.diff]}22`, color:DIFF_COLORS[p.diff], flexShrink:0, marginTop:2 }}>{p.diff}</span>
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