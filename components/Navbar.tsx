import { useState } from 'react';

const COLORS = {
  white: "#FFFFFF",
  green: "#0B6E4F",
  greenLight: "#E6F4EF",
  greenMid: "#1A8A63",
  ink: "#0D1117",
  inkMed: "#374151",
  inkLight: "#6B7280",
  border: "#E4E7EC",
  surface: "#F2F4F7",
  red: "#D92D20",
};

export function Navbar({ view, setView, user, setUser, onLoginOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "rgba(255,255,255,0.97)",
      borderBottom: `1px solid ${COLORS.border}`,
      backdropFilter: "blur(12px)",
      height: 64,
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        height: 64,
        gap: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 36,
            height: 36,
            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenMid})`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}>🇰🇪</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.ink, lineHeight: 1 }}>
              Business Hub
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.green, letterSpacing: 1.5, lineHeight: 1.4 }}>
              KENYA
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <button onClick={() => setView("dashboard")} style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 500,
              color: COLORS.inkMed,
            }}>
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={onLoginOpen} style={{
                padding: "8px 16px",
                fontSize: 14,
                background: "transparent",
                color: COLORS.inkMed,
                border: `1.5px solid ${COLORS.border}`,
                borderRadius: 10,
                cursor: "pointer",
              }}>
                Sign In
              </button>
              <button onClick={() => setView("sell")} style={{
                padding: "8px 18px",
                fontSize: 14,
                background: COLORS.green,
                color: "white",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
              }}>
                Post Free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
