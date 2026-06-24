export function DashboardPage({ user, setView }) {
  if (!user) {
    return (
      <div style={{ paddingTop: 120, textAlign: 'center' }}>
        <h2>Please sign in to view dashboard</h2>
        <button onClick={() => setView('home')} style={{
          padding: '12px 24px',
          background: '#0B6E4F',
          color: 'white',
          border: 'none',
          borderRadius: 10,
          cursor: 'pointer',
          marginTop: 20,
        }}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 20px', maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Dashboard</h1>
      <p style={{ color: '#6B7280' }}>Welcome back, {user.name}!</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16,
        marginTop: 24,
      }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 16, border: '1px solid #E4E7EC' }}>
          <div style={{ fontSize: 24 }}>📋</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0B6E4F' }}>3</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Active Listings</div>
        </div>
        <div style={{ background: 'white', padding: 20, borderRadius: 16, border: '1px solid #E4E7EC' }}>
          <div style={{ fontSize: 24 }}>👁</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#1849A9' }}>6,037</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Total Views</div>
        </div>
        <div style={{ background: 'white', padding: 20, borderRadius: 16, border: '1px solid #E4E7EC' }}>
          <div style={{ fontSize: 24 }}>💰</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#E8A020' }}>KES 2,400</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Revenue Earned</div>
        </div>
      </div>
    </div>
  );
}
