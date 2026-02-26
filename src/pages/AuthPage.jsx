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
    if (!email || !pw) { setErr('Email and password are required.'); return; }
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
        'auth/email-already-in-use': 'This email is already registered. Please login.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/too-many-requests': 'Too many attempts. Please wait a few minutes.',
      };
      setErr(msgs[e.code] || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setErr('');
    setGoogleLoading(true);
    try {
      await onGoogle();
    } catch (e) {
      setErr('Google sign-in failed. Please try again.');
    }
    setGoogleLoading(false);
  }

  const inp = {
    width:'100%', padding:'12px 14px', background:'#12121a',
    border:'1px solid #2a2a3d', borderRadius:9, color:'#e2e8f0',
    fontSize:'.9rem', fontFamily:'inherit', outline:'none', marginBottom:10,
  };

  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0f', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Syne',system-ui,sans-serif", padding:16, position:'relative' }}>
      {/* bg grid */}
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(124,58,237,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.04) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }} />

      <div style={{ background:'#1a1a26', border:'1px solid #2a2a3d', borderRadius:20, padding:'40px 32px', width:'100%', maxWidth:440, position:'relative', zIndex:1 }}>
        {/* glow */}
        <div style={{ position:'absolute', top:-40, left:'50%', transform:'translateX(-50%)', width:300, height:150, background:'radial-gradient(ellipse,rgba(124,58,237,.25) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ textAlign:'center', marginBottom:24, position:'relative' }}>
          <div style={{ display:'inline-block', background:'rgba(124,58,237,.2)', border:'1px solid rgba(124,58,237,.5)', color:'#a78bfa', fontFamily:"'Space Mono',monospace", fontSize:'.6rem', padding:'3px 14px', borderRadius:20, letterSpacing:'.1em', marginBottom:12 }}>
            CRACKDSA.IN · 21 WEEK MNC ROADMAP
          </div>
          <h1 style={{ fontSize:'1.8rem', fontWeight:800, color:'#e2e8f0', lineHeight:1.2, marginBottom:6 }}>
            {tab === 'login' ? 'Welcome Back 👋' : 'Join CrackDSA'}
          </h1>
          <p style={{ color:'#64748b', fontSize:'.82rem' }}>
            {tab === 'login' ? 'Continue your DSA journey' : 'Start your MNC interview prep today'}
          </p>
        </div>

        {/* Google Button */}
        <button onClick={handleGoogle} disabled={googleLoading} style={{
          width:'100%', padding:'12px', border:'1px solid #2a2a3d', borderRadius:9,
          fontFamily:'inherit', fontSize:'.9rem', fontWeight:700, cursor:'pointer',
          background:'#fff', color:'#1a1a26', display:'flex', alignItems:'center',
          justifyContent:'center', gap:10, marginBottom:16, opacity: googleLoading ? .7 : 1,
          transition:'all .2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background='#f1f5f9'}
          onMouseLeave={e => e.currentTarget.style.background='#fff'}>
          {/* Google G logo */}
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
          <div style={{ flex:1, height:1, background:'#2a2a3d' }} />
          <span style={{ color:'#475569', fontSize:'.72rem', fontFamily:"'Space Mono',monospace" }}>or</span>
          <div style={{ flex:1, height:1, background:'#2a2a3d' }} />
        </div>

        {/* Email/Password Tabs */}
        <div style={{ display:'flex', gap:6, marginBottom:16 }}>
          {['login','register'].map(t => (
            <button key={t} onClick={() => { setTab(t); setErr(''); }} style={{
              flex:1, padding:'8px', border:'none', borderRadius:8, fontFamily:'inherit',
              fontSize:'.78rem', fontWeight:700, cursor:'pointer', borderWidth:1, borderStyle:'solid',
              background: tab===t ? 'rgba(124,58,237,.15)' : 'transparent',
              color: tab===t ? '#a78bfa' : '#64748b',
              borderColor: tab===t ? '#7c3aed' : '#2a2a3d',
            }}>
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {tab === 'register' && (
          <input style={inp} placeholder="Your name" value={name}
            onChange={e => setName(e.target.value)}
            onFocus={e => e.target.style.borderColor='#7c3aed'}
            onBlur={e => e.target.style.borderColor='#2a2a3d'} />
        )}
        <input style={inp} placeholder="Email address" type="email" value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={e => e.target.style.borderColor='#7c3aed'}
          onBlur={e => e.target.style.borderColor='#2a2a3d'}
          onKeyDown={e => e.key==='Enter' && handle()} />
        <input style={inp} placeholder="Password" type="password" value={pw}
          onChange={e => setPw(e.target.value)}
          onFocus={e => e.target.style.borderColor='#7c3aed'}
          onBlur={e => e.target.style.borderColor='#2a2a3d'}
          onKeyDown={e => e.key==='Enter' && handle()} />
        {tab === 'register' && (
          <input style={inp} placeholder="Confirm password" type="password" value={pw2}
            onChange={e => setPw2(e.target.value)}
            onFocus={e => e.target.style.borderColor='#7c3aed'}
            onBlur={e => e.target.style.borderColor='#2a2a3d'}
            onKeyDown={e => e.key==='Enter' && handle()} />
        )}

        {err && (
          <div style={{ color:'#f87171', fontSize:'.78rem', padding:'8px 12px', background:'rgba(239,68,68,.1)', borderRadius:7, border:'1px solid rgba(239,68,68,.2)', marginBottom:10 }}>
            {err}
          </div>
        )}

        <button onClick={handle} disabled={loading} style={{
          width:'100%', padding:13, border:'none', borderRadius:9, fontFamily:'inherit',
          fontSize:'.92rem', fontWeight:700, cursor:'pointer',
          background:'linear-gradient(135deg,#7c3aed,#5b21b6)', color:'#fff',
          opacity: loading ? .6 : 1,
        }}>
          {loading ? 'Please wait...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
        </button>

        <p style={{ textAlign:'center', color:'#475569', fontSize:'.68rem', marginTop:14 }}>
          Progress saved to your account · Syncs across devices
        </p>
      </div>
    </div>
  );
}