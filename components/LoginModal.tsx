'use client';

import { useState } from 'react';

export function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin({ name: email.split('@')[0], email });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: 24,
        padding: '40px',
        maxWidth: 400,
        width: '100%',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center' }}>Sign In</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #E4E7EC', borderRadius: 8, marginBottom: 12 }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #E4E7EC', borderRadius: 8, marginBottom: 16 }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#0B6E4F',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
