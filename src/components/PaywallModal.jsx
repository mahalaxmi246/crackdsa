// src/components/PaywallModal.jsx
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PRICE } from '../data/roadmap';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_PLACEHOLDER';

export default function PaywallModal({ uid, onPaid, onClose, isDark=true, T }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const bg         = isDark ? '#1a1a26'               : '#faf7f2';
  const card       = isDark ? '#2d1b69'               : 'rgba(109,40,217,.08)';
  const cardBorder = isDark ? '#7c3aed'               : 'rgba(109,40,217,.35)';
  const text       = isDark ? '#e2e8f0'               : '#120f08';
  const muted      = isDark ? '#94a3b8'               : '#4a3d2a';
  const chipBg     = isDark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)';
  const chipBorder = isDark ? '#2a2a3d'               : '#c8bfae';
  const titleColor = isDark ? '#c4b5fd'               : '#4c1d95';
  const itemColor  = isDark ? '#ffffff'               : '#1a0f33';

  function loadRazorpay() {
    return new Promise(resolve => {
      if (window.Razorpay) { resolve(true); return; }
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload  = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  }

  async function handlePayment() {
    setErr(''); setLoading(true);
    const ok = await loadRazorpay();
    if (!ok) { setErr('Failed to load payment gateway. Check your connection.'); setLoading(false); return; }

    const rzp = new window.Razorpay({
      key:         RAZORPAY_KEY,
      amount:      PRICE * 100,
      currency:    'INR',
      name:        'CrackDSA.in',
      description: '21-Week DSA Roadmap — Lifetime Access',
      theme:       { color: '#7c3aed' },
      notes:       { uid },
      modal:       { ondismiss: () => setLoading(false) },

      handler: async (response) => {
        try {
          await updateDoc(doc(db, 'users', uid), {
            isPaid:         true,
            paymentId:      response.razorpay_payment_id,
            paymentStatus:  'paid',
            paidAt:         new Date().toISOString(),
            paymentGateway: 'razorpay',
          });
          onPaid();
        } catch(e) {
          setErr('Payment received but upgrade failed. Email support@crackdsa.in — ID: ' + response.razorpay_payment_id);
          setLoading(false);
        }
      },
    });

    rzp.on('payment.failed', (r) => {
      setErr('Payment failed: ' + (r.error?.description || 'Please try again.'));
      setLoading(false);
    });

    rzp.open();
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.85)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:16, backdropFilter:'blur(4px)' }}>
      <div style={{ background:bg, border:'2px solid #7c3aed', borderRadius:20, padding:'36px 28px', maxWidth:460, width:'100%', position:'relative', boxShadow:'0 24px 64px rgba(0,0,0,.5)' }}>
        <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'transparent', border:'none', color:muted, fontSize:'1.2rem', cursor:'pointer' }}>✕</button>

        {/* HEADER */}
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:'2.5rem', marginBottom:8 }}>🔒</div>
          <h2 style={{ color:text, fontSize:'1.4rem', fontWeight:800, marginBottom:8 }}>Unlock Full Access</h2>
          <p style={{ color:muted, fontSize:'.85rem', lineHeight:1.6 }}>
            Weeks 6–21 locked for free users.<br/>Get lifetime access for just
          </p>
          <div style={{ fontSize:'2.8rem', fontWeight:800, background:'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', margin:'10px 0 4px' }}>
            ₹{PRICE}
          </div>
          <p style={{ color:muted, fontSize:'.72rem' }}>One-time · Lifetime access · No renewals ever</p>
        </div>

        {/* WHAT YOU GET */}
        <div style={{ background:card, border:`1px solid ${cardBorder}`, borderRadius:12, padding:'16px', marginBottom:20 }}>
          <div style={{ color:titleColor, fontSize:'.72rem', fontFamily:"'Space Mono',monospace", marginBottom:10, fontWeight:800, letterSpacing:'.08em' }}>// WHAT YOU UNLOCK:</div>
          {[
            '✅ All 21 weeks of structured DSA practice',
            '✅ 500+ problems with Amazon · Google · Microsoft tags',
            '✅ Concept explanations + code templates (Py/C++/Java)',
            '✅ Weekly mock assessments for MNC prep',
            '✅ Progress saved forever to your account',
            '✅ Certificate of completion at 80%',
            '✅ All future content added free',
          ].map(item => (
            <div key={item} style={{ color:itemColor, fontSize:'.81rem', marginBottom:5, fontWeight:isDark?400:600, lineHeight:1.4 }}>{item}</div>
          ))}
        </div>

        {/* ERROR */}
        {err && (
          <div style={{ background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)', borderRadius:8, padding:'10px 14px', marginBottom:14 }}>
            <p style={{ color:'#fca5a5', fontSize:'.78rem', lineHeight:1.5, margin:0 }}>{err}</p>
          </div>
        )}

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width:'100%', padding:'15px', border:'none', borderRadius:10,
            fontFamily:'inherit', fontSize:'1rem', fontWeight:800,
            cursor: loading ? 'not-allowed' : 'pointer',
            background: loading ? '#3a3a5a' : 'linear-gradient(135deg,#7c3aed,#5b21b6)',
            color:'#fff', letterSpacing:'.02em',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(124,58,237,.5)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            transition:'all .2s',
          }}
        >
          {loading ? (
            <>
              <span style={{ width:18, height:18, border:'2px solid rgba(255,255,255,.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'rzp-spin .7s linear infinite' }} />
              Opening Secure Checkout...
            </>
          ) : (
            <>💳 Pay ₹{PRICE} — Secure Checkout</>
          )}
        </button>

        <style>{`@keyframes rzp-spin { to { transform:rotate(360deg); } }`}</style>

        {/* PAYMENT METHODS */}
        <div style={{ display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap', marginTop:14 }}>
          {['📱 PhonePe','🟢 GPay','💙 Paytm','🏦 UPI','💳 Card'].map(m => (
            <div key={m} style={{ background:chipBg, border:`1px solid ${chipBorder}`, borderRadius:6, padding:'4px 10px', fontSize:'.62rem', color:muted }}>{m}</div>
          ))}
        </div>

        {/* TRUST */}
        <div style={{ marginTop:14, display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap' }}>
          {[['🔐','SSL Secure'],['⚡','Instant Access'],['♾️','Lifetime'],['🇮🇳','Made in India']].map(([icon,label]) => (
            <div key={label} style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.63rem', color:muted }}>
              {icon} {label}
            </div>
          ))}
        </div>

        <p style={{ textAlign:'center', color:muted, fontSize:'.67rem', marginTop:12 }}>
          Powered by Razorpay &nbsp;·&nbsp; Issues? <a href="mailto:support@crackdsa.in" style={{ color:'#a78bfa', textDecoration:'none' }}>support@crackdsa.in</a>
        </p>
      </div>
    </div>
  );
}