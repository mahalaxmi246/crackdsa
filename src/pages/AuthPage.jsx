// src/pages/AuthPage.jsx
import { useState } from 'react';

export default function AuthPage({ onAuth, onGoogle }) {
  const [tab, setTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handle() {
    setErr('');
    if (!email || !pw) { setErr('Email and password required.'); return; }
    if (pw.length < 6) { setErr('Password must be at least 6 characters.'); return; }
    if (tab === 'register') {
      if (!name.trim()) { setErr('Please enter your name.'); return; }
      if (pw !== pw2) { setErr('Passwords do not match.'); return; }
    }
    setLoading(true);
    try {
      await onAuth(tab, email.trim(), pw, name.trim());
    } catch (e) {
      const msgs = {
        'auth/email-already-in-use': 'This email is already registered. Please sign in.',
        'auth/user-not-found': 'No account found. Please register.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-email': 'Please enter a valid email.',
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/too-many-requests': 'Too many attempts. Please wait a moment.',
      };
      setErr(msgs[e.code] || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setErr('');
    setGoogleLoading(true);
    try { await onGoogle(); }
    catch (e) { setErr('Google sign-in failed. Please try again.'); }
    setGoogleLoading(false);
  }

  const inp = {
    width: '100%', padding: '11px 14px', background: '#0f0f17',
    border: '1px solid #2a2a3d', borderRadius: 8, color: '#e2e8f0',
    fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', marginBottom: 10,
    transition: 'border-color .2s',
  };

  const PAIN_POINTS = [
    'Open LeetCode daily but don\'t know what to solve?',
    'Doing random problems with no real progress?',
    'Have months to prep but zero structure?',
  ];

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0f',
      display: 'flex', alignItems: 'stretch',
      fontFamily: "'Syne', system-ui, sans-serif",
    }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) { .auth-left { display: none !important; } .auth-right { width: 100% !important; } }
      `}</style>

      {/* LEFT — Emotional pitch */}
      <div className="auth-left" style={{
        flex: 1, background: 'linear-gradient(160deg,#1a0533 0%,#0c1a2e 60%,#0a0a0f 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 52px', position: 'relative', overflow: 'hidden',
      }}>
        {/* subtle glow */}
        <div style={{ position: 'absolute', top: -80, left: -80, width: 400, height: 400, background: 'radial-gradient(ellipse,rgba(124,58,237,.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(124,58,237,.12)', border: '1px solid rgba(124,58,237,.25)', color: '#a78bfa', fontFamily: "'Space Mono',monospace", fontSize: '.6rem', padding: '4px 12px', borderRadius: 20, letterSpacing: '.08em', marginBottom: 40, width: 'fit-content' }}>
          CRACKDSA.IN · FREE TO START
        </div>

        {/* Main message */}
        <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, lineHeight: 1.25, color: '#e2e8f0', marginBottom: 16 }}>
          You don't need more<br />
          motivation.<br />
          <span style={{ color: '#a78bfa' }}>You need a plan.</span>
        </h1>

        <p style={{ color: '#64748b', fontSize: '.88rem', lineHeight: 1.8, marginBottom: 36, maxWidth: 340 }}>
          Every day, thousands of students open LeetCode and close it 10 minutes later — not because they're lazy, but because no one told them what to do next.
        </p>

        {/* Pain points */}
        <div style={{ marginBottom: 40 }}>
          {PAIN_POINTS.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <span style={{ color: '#f87171', fontSize: '.65rem' }}>✗</span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '.82rem', lineHeight: 1.5 }}>{p}</span>
            </div>
          ))}
        </div>

        {/* Solution line */}
        <div style={{ borderTop: '1px solid #1e1e2a', paddingTop: 28 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <span style={{ color: '#34d399', fontSize: '.65rem' }}>✓</span>
            </div>
            <span style={{ color: '#e2e8f0', fontSize: '.85rem', lineHeight: 1.5, fontWeight: 600 }}>21 weeks. Day-by-day. Concepts + problems + company assessments.</span>
          </div>
          <p style={{ color: '#475569', fontSize: '.75rem', lineHeight: 1.6, paddingLeft: 28 }}>
            Built by a student who faced the same problem. Free for the first 5 weeks.
          </p>
        </div>
      </div>

      {/* RIGHT — Auth form */}
      <div className="auth-right" style={{
        width: 420, flexShrink: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '40px 32px',
        background: '#0a0a0f', borderLeft: '1px solid #1e1e2a',
      }}>
        <div style={{ width: '100%', maxWidth: 360 }}>

          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#e2e8f0', marginBottom: 6 }}>
              {tab === 'login' ? 'Welcome back 👋' : 'Start your journey'}
            </h2>
            <p style={{ color: '#475569', fontSize: '.8rem' }}>
              {tab === 'login' ? 'Continue your 21-week plan.' : 'Free to join. No credit card needed.'}
            </p>
          </div>

          {/* Google */}
          <button onClick={handleGoogle} disabled={googleLoading} style={{
            width: '100%', padding: '11px', border: '1px solid #2a2a3d', borderRadius: 8,
            fontFamily: 'inherit', fontSize: '.88rem', fontWeight: 700, cursor: 'pointer',
            background: '#fff', color: '#0a0a0f', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10, marginBottom: 18,
            opacity: googleLoading ? .7 : 1, transition: 'opacity .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
            <svg width="17" height="17" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {googleLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: '#1e1e2a' }} />
            <span style={{ color: '#334155', fontSize: '.7rem', fontFamily: "'Space Mono',monospace" }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#1e1e2a' }} />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {['login', 'register'].map(t => (
              <button key={t} onClick={() => { setTab(t); setErr(''); }} style={{
                flex: 1, padding: '8px', borderRadius: 7, fontFamily: 'inherit',
                fontSize: '.78rem', fontWeight: 700, cursor: 'pointer',
                background: tab === t ? 'rgba(124,58,237,.12)' : 'transparent',
                color: tab === t ? '#a78bfa' : '#475569',
                border: `1px solid ${tab === t ? '#7c3aed' : '#1e1e2a'}`,
                transition: 'all .2s',
              }}>
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Fields */}
          {tab === 'register' && (
            <input style={inp} placeholder="Your name" value={name}
              onChange={e => setName(e.target.value)}
              onFocus={e => e.target.style.borderColor = '#7c3aed'}
              onBlur={e => e.target.style.borderColor = '#2a2a3d'} />
          )}
          <input style={inp} placeholder="Email address" type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={e => e.target.style.borderColor = '#7c3aed'}
            onBlur={e => e.target.style.borderColor = '#2a2a3d'}
            onKeyDown={e => e.key === 'Enter' && handle()} />
          <input style={inp} placeholder="Password" type="password" value={pw}
            onChange={e => setPw(e.target.value)}
            onFocus={e => e.target.style.borderColor = '#7c3aed'}
            onBlur={e => e.target.style.borderColor = '#2a2a3d'}
            onKeyDown={e => e.key === 'Enter' && handle()} />
          {tab === 'register' && (
            <input style={inp} placeholder="Confirm password" type="password" value={pw2}
              onChange={e => setPw2(e.target.value)}
              onFocus={e => e.target.style.borderColor = '#7c3aed'}
              onBlur={e => e.target.style.borderColor = '#2a2a3d'}
              onKeyDown={e => e.key === 'Enter' && handle()} />
          )}

          {err && (
            <div style={{ color: '#f87171', fontSize: '.76rem', padding: '8px 12px', background: 'rgba(239,68,68,.08)', borderRadius: 7, border: '1px solid rgba(239,68,68,.15)', marginBottom: 10 }}>
              {err}
            </div>
          )}

          <button onClick={handle} disabled={loading} style={{
            width: '100%', padding: 12, border: 'none', borderRadius: 8,
            fontFamily: 'inherit', fontSize: '.9rem', fontWeight: 700, cursor: 'pointer',
            background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', color: '#fff',
            opacity: loading ? .6 : 1, transition: 'opacity .2s',
          }}>
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign In →' : 'Start for Free →'}
          </button>

          <p style={{ textAlign: 'center', color: '#334155', fontSize: '.68rem', marginTop: 16, lineHeight: 1.6 }}>
            Progress synced to cloud · Free for Weeks 1–5
          </p>
        </div>
      </div>
    </div>
  );
}