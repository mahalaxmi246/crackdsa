// src/components/Certificate.jsx
export default function Certificate({ name, percent, onClose }) {
  const date = new Date().toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' });

  function downloadCert() {
    const canvas = document.getElementById('cert-canvas');
    const link = document.createElement('a');
    link.download = `CrackDSA-Certificate-${name.replace(/\s+/g,'-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  // Draw cert on canvas
  function drawCert(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Background
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, W, H);

    // Border gradient
    const grad = ctx.createLinearGradient(0,0,W,H);
    grad.addColorStop(0, '#7c3aed');
    grad.addColorStop(1, '#06b6d4');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, W-24, H-24);

    // Inner subtle border
    ctx.strokeStyle = 'rgba(124,58,237,.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(24, 24, W-48, H-48);

    // CrackDSA logo text
    ctx.font = 'bold 22px Space Mono, monospace';
    ctx.fillStyle = '#a78bfa';
    ctx.textAlign = 'center';
    ctx.fillText('CrackDSA.in', W/2, 70);

    // Title
    ctx.font = 'bold 42px Syne, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Certificate of Completion', W/2, 140);

    // Subtitle
    ctx.font = '18px Syne, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('This is to certify that', W/2, 190);

    // Name
    ctx.font = 'bold 52px Syne, sans-serif';
    const nameGrad = ctx.createLinearGradient(W/2-200,0,W/2+200,0);
    nameGrad.addColorStop(0,'#a78bfa');
    nameGrad.addColorStop(1,'#06b6d4');
    ctx.fillStyle = nameGrad;
    ctx.fillText(name, W/2, 265);

    // Line
    ctx.strokeStyle = 'rgba(167,139,250,.3)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W/2-200, 285); ctx.lineTo(W/2+200, 285); ctx.stroke();

    // Body text
    ctx.font = '17px Syne, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('has successfully completed the', W/2, 320);

    ctx.font = 'bold 22px Syne, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('21-Week DSA MNC Interview Preparation Roadmap', W/2, 358);

    ctx.font = '16px Syne, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`with ${Math.round(percent)}% task completion`, W/2, 392);

    // Topics covered
    ctx.font = '13px Space Mono, monospace';
    ctx.fillStyle = '#475569';
    const topics = 'Two Pointers · Binary Search · Hashing · Sliding Window · Linked List · Trees · Graphs · Dynamic Programming · Backtracking';
    ctx.fillText(topics, W/2, 430);

    // Date
    ctx.font = '15px Syne, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`Issued on ${date}`, W/2, 480);

    // Stars decoration
    ctx.fillStyle = '#f59e0b';
    ctx.font = '24px serif';
    ctx.fillText('⭐⭐⭐', W/2, 520);

    // Bottom note
    ctx.font = '11px Space Mono, monospace';
    ctx.fillStyle = '#334155';
    ctx.fillText('crackdsa.in · Verify at crackdsa.in/verify', W/2, H-30);
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.9)', zIndex:1000, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:16, backdropFilter:'blur(6px)' }}>
      <div style={{ background:'#1a1a26', border:'1px solid #f59e0b', borderRadius:20, padding:'28px 24px', maxWidth:720, width:'100%', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h2 style={{ color:'#f59e0b', fontWeight:800, fontSize:'1.2rem' }}>🏆 Your Certificate is Ready!</h2>
          <button onClick={onClose} style={{ background:'transparent', border:'none', color:'#64748b', fontSize:'1.2rem', cursor:'pointer' }}>✕</button>
        </div>
        <canvas id="cert-canvas" width={820} height={560} ref={drawCert}
          style={{ width:'100%', border:'2px solid #2a2a3d', borderRadius:10, display:'block' }} />
        <div style={{ display:'flex', gap:10, marginTop:16 }}>
          <button onClick={downloadCert}
            style={{ flex:1, padding:'12px', border:'none', borderRadius:9, fontFamily:'inherit', fontSize:'.9rem', fontWeight:700, cursor:'pointer', background:'linear-gradient(135deg,#f59e0b,#d97706)', color:'#000' }}>
            ⬇ Download Certificate (PNG)
          </button>
          <button onClick={onClose}
            style={{ padding:'12px 20px', border:'1px solid #2a2a3d', borderRadius:9, fontFamily:'inherit', fontSize:'.85rem', cursor:'pointer', background:'transparent', color:'#64748b' }}>
            Close
          </button>
        </div>
        <p style={{ textAlign:'center', color:'#475569', fontSize:'.72rem', marginTop:10 }}>
          Share on LinkedIn to show recruiters your preparation! Tag #CrackDSA
        </p>
      </div>
    </div>
  );
}
