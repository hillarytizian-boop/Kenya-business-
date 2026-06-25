'use client';

import { useState, useEffect } from "react";

const COLORS = {
  white: "#FFFFFF",
  offWhite: "#F8F9FB",
  surface: "#F2F4F7",
  border: "#E4E7EC",
  borderLight: "#F0F2F5",
  ink: "#0D1117",
  inkMed: "#374151",
  inkLight: "#6B7280",
  inkFaint: "#9CA3AF",
  green: "#0B6E4F",
  greenLight: "#E6F4EF",
  greenMid: "#1A8A63",
  greenDark: "#08503A",
  saffron: "#E8A020",
  saffronLight: "#FEF3DC",
  saffronDark: "#C47D10",
  red: "#D92D20",
  redLight: "#FEF3F2",
  blue: "#1849A9",
  blueLight: "#EFF4FF",
  purple: "#6941C6",
  purpleLight: "#F4F3FF",
};

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function Avatar({ name, size = 36, color = COLORS.green }) {
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "18", border: `1.5px solid ${color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 700, color, fontFamily: "'Plus Jakarta Sans', sans-serif",
      flexShrink: 0,
    }}>{initials}</div>
  );
}

function Navbar({ view, setView, user, setUser, onLoginOpen = () => {} }) {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const elevated = scrollY > 10;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(255,255,255,0.97)",
      borderBottom: `1px solid ${elevated ? COLORS.border : "transparent"}`,
      backdropFilter: "blur(12px)",
      boxShadow: elevated ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.25s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64, gap: 24 }}>
        {/* Logo */}
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenMid})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🇰🇪</div>
          <div>
            <div className="jakarta" style={{ fontSize: 15, fontWeight: 800, color: COLORS.ink, lineHeight: 1 }}>Business Hub</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.green, letterSpacing: 1.5, lineHeight: 1.4 }}>KENYA</div>
          </div>
        </button>

        {/* Search */}
        <div className="hide-mobile" style={{ flex: 1, maxWidth: 480, position: "relative" }}>
          <input
            placeholder="Search businesses, properties, jobs, vehicles…"
            style={{
              width: "100%", padding: "9px 16px 9px 40px",
              border: `1.5px solid ${COLORS.border}`, borderRadius: 10,
              fontSize: 14, color: COLORS.ink, background: COLORS.offWhite,
              transition: "border-color 0.18s",
            }}
            onFocus={e => e.target.style.borderColor = COLORS.green}
            onBlur={e => e.target.style.borderColor = COLORS.border}
          />
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: COLORS.inkFaint }}>🔍</span>
        </div>

        {/* Nav links */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[["Browse", "browse"], ["Sell", "sell"], ["How it Works", "how"]].map(([label, v]) => (
            <button key={v} onClick={() => setView(v)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: view === v ? COLORS.green : COLORS.inkMed, background: view === v ? COLORS.greenLight : "transparent", transition: "all 0.15s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setView("dashboard")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
                <span style={{ fontSize: 20 }}>🔔</span>
                <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: COLORS.red, borderRadius: "50%", border: "1.5px solid white" }} />
              </button>
              <button onClick={() => setView("dashboard")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Avatar name={user.name} size={34} />
              </button>
              <button className="btn-primary hide-mobile" onClick={() => setView("sell")} style={{ padding: "8px 16px", fontSize: 14 }}>+ Post Listing</button>
            </div>
          ) : (
            <>
              <button className="btn-ghost hide-mobile" onClick={onLoginOpen}
                style={{ padding: "8px 16px", fontSize: 14 }}>Sign In</button>
              <button className="btn-primary" onClick={() => setView("sell")} style={{ padding: "8px 16px", fontSize: 14 }}>Post Free</button>
            </>
          )}

          {/* Mobile menu */}
          <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: `1.5px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16 }}>☰</button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", gap: 4 }}>
          {[["🏠 Home", "home"], ["📋 Browse", "browse"], ["💼 Sell", "sell"], ["ℹ️ How it Works", "how"], ["📊 Dashboard", "dashboard"]].map(([label, v]) => (
            <button key={v} onClick={() => { setView(v); setMenuOpen(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: COLORS.inkMed, textAlign: "left", background: view === v ? COLORS.greenLight : "transparent" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export { Navbar, COLORS };
