'use client';

export function DashboardPage({ user, setView }) {
  return (
    <div style={{ padding: '32px 20px', maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Dashboard</h1>
      <p>Welcome back, {user?.name || 'User'}!</p>
    </div>
  );
}
