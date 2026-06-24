export function AdminDashboard({ setView }) {
  return (
    <div style={{ padding: '32px 20px', maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Admin Dashboard</h1>
      <p style={{ color: '#6B7280' }}>Business Hub Kenya — Control Center</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 16,
        marginTop: 24,
      }}>
        <div style={{ background: 'white', padding: 18, borderRadius: 16, border: '1px solid #E4E7EC' }}>
          <div style={{ fontSize: 22 }}>👥</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1849A9' }}>12,891</div>
          <div style={{ fontSize: 11, color: '#6B7280' }}>Total Users</div>
        </div>
        <div style={{ background: 'white', padding: 18, borderRadius: 16, border: '1px solid #E4E7EC' }}>
          <div style={{ fontSize: 22 }}>📋</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0B6E4F' }}>47,280</div>
          <div style={{ fontSize: 11, color: '#6B7280' }}>Active Listings</div>
        </div>
        <div style={{ background: 'white', padding: 18, borderRadius: 16, border: '1px solid #E4E7EC' }}>
          <div style={{ fontSize: 22 }}>💰</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#E8A020' }}>KES 4.7M</div>
          <div style={{ fontSize: 11, color: '#6B7280' }}>Revenue (This Month)</div>
        </div>
        <div style={{ background: 'white', padding: 18, borderRadius: 16, border: '1px solid #E4E7EC' }}>
          <div style={{ fontSize: 22 }}>⚠️</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#D92D20' }}>3</div>
          <div style={{ fontSize: 11, color: '#6B7280' }}>Pending Moderation</div>
        </div>
      </div>
    </div>
  );
}
