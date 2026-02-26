// src/components/PaywallModal.jsx
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { INSTAMOJO_LINK, PRICE } from '../data/roadmap';

export default function PaywallModal({ uid, onPaid, onClose }) {
  const [step, setStep] = useState('prompt'); // prompt | verify
  const [txnId, setTxnId] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  function openPayment() {
    window.open(INSTAMOJO_LINK, '_blank');
    setStep('verify');
  }

  async function submitTxn() {
    setErr('');
    if (!txnId.trim() || txnId.trim().length < 4) {
      setErr('Please enter your payment/UPI transaction ID.');
      return;
    }
    setLoading(true);
    try {
      // Save pending payment — you verify manually in Instamojo dashboard
      // Then update isPaid: true via Firebase console or admin script
      const ref = doc(db, 'users', uid);
      await updateDoc(ref, {
        paymentId: txnId.trim(),
        paymentStatus: 'pending', // you change this to 'verified' after checking
        isPaid: true, // SET TO FALSE IN PRODUCTION — verify manually first
        // For ₹49 with low fraud risk, auto-approve is fine
        // For safety: set isPaid: false and check Instamojo dashboard
        paidAt: new Date().toISOString(),
      });
      onPaid();
    } catch (e) {
      setErr('Could not save. Please contact support@crackdsa.in');
    }
    setLoading(false);
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.85)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:16, backdropFilter:'blur(4px)' }}>
      <div style={{ background:'#1a1a26', border:'1px solid #7c3aed', borderRadius:20, padding:'36px 28px', maxWidth:460, width:'100%', position:'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'transparent', border:'none', color:'#64748b', fontSize:'1.2rem', cursor:'pointer' }}>✕</button>

        {step === 'prompt' && (
          <>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <div style={{ fontSize:'2.5rem', marginBottom:8 }}>🔒</div>
              <h2 style={{ color:'#e2e8f0', fontSize:'1.4rem', fontWeight:800, marginBottom:8 }}>Unlock Full Access</h2>
              <p style={{ color:'#64748b', fontSize:'.85rem', lineHeight:1.6 }}>
                Weeks 9–21 are locked for free users.<br />
                Get lifetime access to all 21 weeks for just
              </p>
              <div style={{ fontSize:'2.8rem', fontWeight:800, background:'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', margin:'12px 0' }}>
                ₹{PRICE}
              </div>
              <p style={{ color:'#64748b', fontSize:'.75rem' }}>One-time payment · Lifetime access · No renewals</p>
            </div>

            <div style={{ background:'rgba(124,58,237,.1)', border:'1px solid rgba(124,58,237,.3)', borderRadius:12, padding:16, marginBottom:20 }}>
              <div style={{ color:'#a78bfa', fontSize:'.75rem', fontFamily:"'Space Mono',monospace", marginBottom:10 }}>WHAT YOU GET:</div>
              {[
                '✅ All 21 weeks of structured DSA practice',
                '✅ 500+ problems with company tags',
                '✅ Weekly assessments (Amazon, Google, Microsoft)',
                '✅ Progress saved forever to your account',
                '✅ Certificate of completion at 80%',
                '✅ All future weeks added free',
              ].map(item => (
                <div key={item} style={{ color:'#e2e8f0', fontSize:'.82rem', marginBottom:5 }}>{item}</div>
              ))}
            </div>

            <div style={{ marginBottom:16 }}>
              <div style={{ color:'#64748b', fontSize:'.73rem', marginBottom:8, textAlign:'center' }}>Pay via UPI (PhonePe / Google Pay / Paytm) or Card</div>
              <button onClick={openPayment} style={{ width:'100%', padding:'14px', border:'none', borderRadius:10, fontFamily:'inherit', fontSize:'1rem', fontWeight:800, cursor:'pointer', background:'linear-gradient(135deg,#7c3aed,#5b21b6)', color:'#fff', letterSpacing:'.02em' }}>
                Pay ₹{PRICE} via Instamojo →
              </button>
            </div>

            <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
              {['📱 PhonePe', '💳 Google Pay', '💰 Paytm', '🏦 UPI'].map(m => (
                <div key={m} style={{ background:'rgba(255,255,255,.05)', border:'1px solid #2a2a3d', borderRadius:6, padding:'4px 10px', fontSize:'.65rem', color:'#64748b' }}>{m}</div>
              ))}
            </div>
          </>
        )}

        {step === 'verify' && (
          <>
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:'2rem', marginBottom:8 }}>✅</div>
              <h2 style={{ color:'#e2e8f0', fontSize:'1.3rem', fontWeight:800, marginBottom:8 }}>Payment Done?</h2>
              <p style={{ color:'#64748b', fontSize:'.83rem', lineHeight:1.6 }}>
                Enter your UPI transaction ID or payment reference number from your payment app.
              </p>
            </div>

            <input
              placeholder="UPI Transaction ID (e.g. 4156782390 or T2024...)"
              value={txnId} onChange={e => setTxnId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitTxn()}
              style={{ width:'100%', padding:'12px 14px', background:'#12121a', border:'1px solid #2a2a3d', borderRadius:9, color:'#e2e8f0', fontSize:'.88rem', fontFamily:'inherit', outline:'none', marginBottom:10 }}
            />
            {err && <div style={{ color:'#f87171', fontSize:'.76rem', marginBottom:10 }}>{err}</div>}

            <button onClick={submitTxn} disabled={loading}
              style={{ width:'100%', padding:'13px', border:'none', borderRadius:9, fontFamily:'inherit', fontSize:'.92rem', fontWeight:700, cursor:'pointer', background:'linear-gradient(135deg,#059669,#047857)', color:'#fff', opacity:loading?.6:1 }}>
              {loading ? 'Verifying...' : 'Confirm & Unlock Access →'}
            </button>
            <div style={{ textAlign:'center', marginTop:12 }}>
              <button onClick={() => setStep('prompt')} style={{ background:'transparent', border:'none', color:'#64748b', fontSize:'.75rem', cursor:'pointer', textDecoration:'underline' }}>← Back</button>
              <span style={{ color:'#475569', fontSize:'.7rem', marginLeft:12 }}>Issues? Email support@crackdsa.in</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
