export function ListingDetailPage({ listing, setView, user }) {
  return (
    <div style={{ padding: '32px 20px', maxWidth: 1280, margin: '0 auto' }}>
      <h1>Listing Detail</h1>
      <p>{listing?.title || 'Listing not found'}</p>
    </div>
  );
}
