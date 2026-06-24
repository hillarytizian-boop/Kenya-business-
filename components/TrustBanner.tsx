export function TrustBanner({ setView }) {
  return (
    <section style={{ padding: "0 20px 64px" }}>
      <div style={{
        background: "linear-gradient(135deg, #0B6E4F, #1A8A63)",
        borderRadius: 24,
        padding: "48px 40px",
        textAlign: "center",
        color: "white",
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 800 }}>Ready to Grow Your Business?</h2>
        <p style={{ opacity: 0.8 }}>Join 12,000+ verified sellers</p>
      </div>
    </section>
  );
}
