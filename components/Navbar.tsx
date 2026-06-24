'use client';

import { useState } from 'react';

interface NavbarProps {
  view: string;
  setView: (view: string) => void;
  user: any;
  setUser: (user: any) => void;
  onLoginOpen?: () => void;
}

export function Navbar({ view, setView, user, setUser, onLoginOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

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
          background: 'transparent',
          color: '#374151',
          border: '1px solid #E4E7EC',
          borderRadius: 8,
          cursor: 'pointer',
        }} onClick={() => setView('browse')}>
          Browse
        </button>
        
        {user ? (
          <>
            <span style={{ fontSize: 14 }}>👋 {user.name}</span>
            <button style={{
              padding: '8px 16px',
              background: '#D92D20',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }} onClick={() => { setUser(null); localStorage.removeItem('user'); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button style={{
              padding: '8px 16px',
              background: 'transparent',
              color: '#0B6E4F',
              border: '1px solid #0B6E4F',
              borderRadius: 8,
              cursor: 'pointer',
            }} onClick={onLoginOpen}>
              Sign In
            </button>
            <button style={{
              padding: '8px 18px',
              background: '#0B6E4F',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
            }} onClick={() => setView('sell')}>
              Post Free
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
