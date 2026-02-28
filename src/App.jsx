// src/App.jsx
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

export const DARK = {
  bg:'#0a0a0f', card:'#1a1a26', card2:'#12121a', border:'#2a2a3d',
  text:'#e2e8f0', muted:'#64748b', sub:'#94a3b8', codebg:'#0d0d14',
  headerGrad:'linear-gradient(135deg,#1a0533 0%,#0c1a2e 100%)',
  statCard:'#1a1a26', trackBg:'#2a2a3d', inputBg:'#12121a', scrollThumb:'#2a2a3d',
};
// Warm cream light theme — all text dark, backgrounds warm
export const LIGHT = {
  bg:'#f5f0e8',         // warm cream base
  card:'#fefcf7',       // near-white warm card
  card2:'#f0ebe0',      // slightly deeper cream
  border:'#ddd5c4',     // warm tan border
  text:'#1a1208',       // very dark brown-black text
  muted:'#5c4d3a',      // warm brown muted
  sub:'#3d3020',        // dark warm subtext
  codebg:'#1e2030',     // code always dark
  headerGrad:'linear-gradient(135deg,#ede4ff 0%,#dbeafe 100%)',
  statCard:'#fefcf7',   // warm white cards
  trackBg:'#ddd5c4',    // warm tan track
  inputBg:'#fefcf7',    // warm white inputs
  scrollThumb:'#c4b59a',
};

export default function App() {
  const { user, userData, setUserData, loading, register, login, logout, googleLogin } = useAuth();
  const [isDark, setIsDark] = useState(true);
  const T = isDark ? DARK : LIGHT;

  if (loading) return (
    <div style={{ minHeight:'100vh', background:T.bg, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono',monospace", color:T.muted, fontSize:'.85rem' }}>
      <div style={{ textAlign:'center' }}><div style={{ fontSize:'2rem', marginBottom:12 }}>⚡</div>Loading CrackDSA...</div>
    </div>
  );

  async function handleAuth(type, email, password, displayName) {
    if (type === 'register') await register(email, password, displayName);
    else await login(email, password);
  }

  if (!user || !userData) return <AuthPage onAuth={handleAuth} onGoogle={googleLogin} />;

  return (
    <>
      <Dashboard user={user} userData={userData} setUserData={setUserData} onLogout={logout} isDark={isDark} T={T} />
      <button onClick={() => setIsDark(d => !d)} title={isDark?'Light Mode':'Dark Mode'} style={{
        position:'fixed', bottom:20, right:20, zIndex:999,
        background:T.card, border:`1px solid ${T.border}`, borderRadius:50,
        width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.1rem', cursor:'pointer', boxShadow:`0 4px 16px rgba(0,0,0,${isDark?'.4':'.12'})`, transition:'all .2s',
      }}>{isDark ? '☀️' : '🌙'}</button>
    </>
  );
}