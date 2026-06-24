import { useState } from 'react';

const COLORS = {
  white: "#FFFFFF",
  green: "#0B6E4F",
  greenMid: "#1A8A63",
  ink: "#0D1117",
  inkMed: "#374151",
  inkFaint: "#9CA3AF",
  border: "#E4E7EC",
  surface: "#F2F4F7",
  red: "#D92D20",
  redLight: "#FEF3F2",
};

export function LoginModal({ isOpen, onClose, onLogin }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin({ name: email.split('@')[0], email, role: 'buyer' });
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: '40px',
        maxWidth: 440,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
        position: 'relative',
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 20,
          color: COLORS.inkFaint,
        }}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🇰🇪</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
        </div>

        <div style={{
          display: 'flex',
          backgroundColor: COLORS.surface,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
        }}>
          <button onClick={() => setMode('login')} style={{
            flex: 1,
            padding: '10px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: mode === 'login' ? COLORS.white : 'transparent',
            color: mode === 'login' ? COLORS.green : COLORS.inkMed,
            boxShadow: mode === 'login' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
          }}>
            Sign In
          </button>
          <button onClick={() => setMode('register')} style={{
            flex: 1,
            padding: '10px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: mode === 'register' ? COLORS.white : 'transparent',
            color: mode === 'register' ? COLORS.green : COLORS.inkMed,
            boxShadow: mode === 'register' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
          }}>
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1.5px solid ${COLORS.border}`,
                borderRadius: 10,
                fontSize: 14,
              }}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={8}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1.5px solid ${COLORS.border}`,
                borderRadius: 10,
                fontSize: 14,
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '10px 14px',
              backgroundColor: COLORS.redLight,
              color: COLORS.red,
              borderRadius: 8,
              fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: COLORS.green,
              color: 'white',
              border: 'none',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
}
