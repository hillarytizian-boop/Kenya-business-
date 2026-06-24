import { useState, useEffect } from "react";

// ─── COMPONENTS ────────────────────────────────────────────────────────────────
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { FeaturedListings } from "./components/FeaturedListings";
import { HowItWorks } from "./components/HowItWorks";
import { TrustBanner } from "./components/TrustBanner";
import { Footer } from "./components/Footer";
import { BrowsePage } from "./pages/BrowsePage";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { SellPage } from "./pages/SellPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { LoginModal } from "./components/LoginModal";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
export const COLORS = {
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

export const CATEGORIES = [
  { id: "businesses", label: "Businesses", icon: "🏢", count: 2847 },
  { id: "properties", label: "Properties", icon: "🏠", count: 5621 },
  { id: "vehicles", label: "Vehicles", icon: "🚗", count: 3204 },
  { id: "jobs", label: "Jobs", icon: "💼", count: 1893 },
  { id: "services", label: "Services", icon: "🛠️", count: 4102 },
  { id: "electronics", label: "Electronics", icon: "📱", count: 6840 },
  { id: "agriculture", label: "Agriculture", icon: "🌾", count: 1205 },
  { id: "fashion", label: "Fashion", icon: "👗", count: 3917 },
  { id: "education", label: "Education", icon: "📚", count: 892 },
  { id: "healthcare", label: "Healthcare", icon: "🏥", count: 567 },
  { id: "products", label: "Products", icon: "📦", count: 8243 },
  { id: "finance", label: "Finance", icon: "💰", count: 431 },
];

export const LOCATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika"];

export const LISTINGS = [
  {
    id: 1, category: "businesses", title: "Established Supermarket – Westlands",
    price: 4500000, priceLabel: "KES 4.5M", location: "Westlands, Nairobi",
    description: "Profitable supermarket with 8 years of operation.",
    image: "🏪", verified: true, featured: true, views: 1842, rating: 4.8, reviews: 23,
    seller: "James Mwangi", sellerVerified: true, daysAgo: 2, badge: "Featured",
    tags: ["Turnkey", "Profitable", "Prime Location"]
  },
  {
    id: 2, category: "properties", title: "3BR Apartment – Kilimani",
    price: 8500000, priceLabel: "KES 8.5M", location: "Kilimani, Nairobi",
    description: "Modern 3-bedroom apartment, 120sqm, fully fitted kitchen.",
    image: "🏢", verified: true, featured: true, views: 3201, rating: 4.9, reviews: 41,
    seller: "Nairobi Realty Group", sellerVerified: true, daysAgo: 1, badge: "Hot",
    tags: ["En-suite", "Parking", "Swimming Pool"]
  },
];

export const STATS = [
  { label: "Active Listings", value: "47,280", icon: "📋", color: COLORS.green },
  { label: "Verified Sellers", value: "12,450", icon: "✅", color: COLORS.blue },
  { label: "Monthly Buyers", value: "89,000", icon: "👥", color: COLORS.saffron },
  { label: "Counties Covered", value: "47", icon: "📍", color: COLORS.purple },
];

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [filter, setFilter] = useState(null);
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoginOpen(false);
    setView("dashboard");
  };

  const renderPage = () => {
    switch(view) {
      case "home":
        return (
          <>
            <HeroSection setView={setView} />
            <CategoriesSection setView={setView} setFilter={setFilter} />
            <FeaturedListings setView={setView} setListing={setListing} />
            <HowItWorks />
            <TrustBanner setView={setView} />
          </>
        );
      case "browse":
        return <BrowsePage setView={setView} setListing={setListing} filter={filter} setFilter={setFilter} />;
      case "listing":
        return <ListingDetailPage listing={listing} setView={setView} user={user} />;
      case "sell":
        return <SellPage user={user} setUser={setUser} setView={setView} />;
      case "dashboard":
        return <DashboardPage user={user} setView={setView} />;
      case "admin":
        return <AdminDashboard setView={setView} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div style={{ background: COLORS.white, minHeight: "100vh" }}>
      <Navbar 
        view={view} 
        setView={setView} 
        user={user} 
        setUser={setUser}
        onLoginOpen={() => setIsLoginOpen(true)}
      />
      <main style={{ paddingTop: 64 }}>
        {renderPage()}
      </main>
      <Footer setView={setView} />
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
