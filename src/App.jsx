// src/App.jsx
import { useAuth } from './hooks/useAuth';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  const { user, userData, setUserData, loading, register, login, logout, googleLogin } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', background:'#0a0a0f', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono',monospace", color:'#64748b', fontSize:'.85rem' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:12 }}>⚡</div>
          Loading CrackDSA...
        </div>
      </div>
    );
  }

  async function handleAuth(type, email, password, displayName) {
    if (type === 'register') {
      await register(email, password, displayName);
    } else {
      await login(email, password);
    }
  }

  if (!user || !userData) {
    return <AuthPage onAuth={handleAuth} onGoogle={googleLogin} />;
  }

  return (
    <Dashboard
      user={user}
      userData={userData}
      setUserData={setUserData}
      onLogout={logout}
    />
  );
}