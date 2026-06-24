'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';

export default function Home() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar 
        view={view} 
        setView={setView} 
        user={user} 
        setUser={setUser}
      />
      <main style={{ paddingTop: 64, textAlign: 'center', padding: '120px 20px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 800 }}>
          Business Hub Kenya
        </h1>
        <p style={{ fontSize: 18, color: '#374151', marginTop: 16 }}>
          Kenya's #1 Business Marketplace
        </p>
        <div style={{ marginTop: 32 }}>
          <button style={{
            padding: '12px 24px',
            background: '#0B6E4F',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontSize: 16,
            cursor: 'pointer',
          }} onClick={() => setView('browse')}>
            Browse Listings
          </button>
        </div>
      </main>
    </div>
  );
}
