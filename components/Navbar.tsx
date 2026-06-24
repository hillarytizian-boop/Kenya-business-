'use client';

import { useState } from 'react';

export function Navbar({ view, setView, user, setUser }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255,255,255,0.97)',
      borderBottom: '1px solid #E4E7EC',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>🇰🇪</span>
        <span style={{ fontWeight: 800, fontSize: 16 }}>Business Hub</span>
        <span style={{ color: '#0B6E4F', fontSize: 10, fontWeight: 600, letterSpacing: 1.5 }}>KENYA</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{
          padding: '8px 16px',
          background: '#0B6E4F',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }} onClick={() => setView('browse')}>
          Browse
        </button>
      </div>
    </nav>
  );
}
