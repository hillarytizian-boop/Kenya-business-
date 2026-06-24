import { useState, useEffect } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";

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

export const LOCATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", "Garissa", "Nyeri", "Meru", "Embu", "Machakos", "Kitui", "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Samburu", "Turkana", "Lodwar", "Kakamega", "Bungoma", "Busia", "Siaya", "Kisii", "Nyamira", "Homa Bay", "Migori", "Narok", "Kajiado", "Nanyuki", "Nyahururu", "Kericho", "Bomet", "Nandi", "Uasin Gishu", "Trans Nzoia", "Laikipia", "West Pokot", "Makueni", "Taita Taveta"];

export const LISTINGS = [
  // ─── BUSINESSES ──────────────────────────────────────────────────────────────
  {
    id: 1, category: "businesses", title: "Established Supermarket – Westlands",
    price: 4500000, priceLabel: "KES 4.5M", location: "Westlands, Nairobi",
    description: "Profitable supermarket with 8 years of operation. Monthly revenue KES 800K+. Well-equipped, loyal customer base, prime location.",
    image: "🏪", verified: true, featured: true, views: 1842, rating: 4.8, reviews: 23,
    seller: "James Mwangi", sellerVerified: true, daysAgo: 2, badge: "Featured",
    tags: ["Turnkey", "Profitable", "Prime Location"]
  },
  {
    id: 2, category: "businesses", title: "Café & Bakery – Karen Shopping Centre",
    price: 2800000, priceLabel: "KES 2.8M", location: "Karen, Nairobi",
    description: "Popular café with established clientele. Fully equipped kitchen, outdoor seating, 50 capacity. Good profit margins.",
    image: "☕", verified: true, featured: false, views: 1204, rating: 4.6, reviews: 45,
    seller: "Grace Wanjiru", sellerVerified: true, daysAgo: 5, badge: null,
    tags: ["Equipment Included", "High Traffic", "Profitable"]
  },
  {
    id: 3, category: "businesses", title: "Hardware Store – Industrial Area",
    price: 12000000, priceLabel: "KES 12M", location: "Industrial Area, Nairobi",
    description: "Large hardware store with 5 years operation. Stock worth KES 4M included. Established supplier network.",
    image: "🔨", verified: true, featured: true, views: 890, rating: 4.3, reviews: 18,
    seller: "Peter Kimani", sellerVerified: true, daysAgo: 10, badge: "Featured",
    tags: ["Stock Included", "Supplier Network", "Good Location"]
  },
  {
    id: 4, category: "businesses", title: "Salon & Spa – Kilimani",
    price: 950000, priceLabel: "KES 950K", location: "Kilimani, Nairobi",
    description: "Modern salon with 6 workstations. High-end clientele. Established 4 years. Monthly profit KES 150K+",
    image: "💇", verified: true, featured: false, views: 756, rating: 4.9, reviews: 67,
    seller: "Mary Achieng", sellerVerified: true, daysAgo: 3, badge: null,
    tags: ["High-End", "Loyal Clientele", "Profitable"]
  },

  // ─── PROPERTIES ──────────────────────────────────────────────────────────────
  {
    id: 5, category: "properties", title: "3BR Apartment – Kilimani",
    price: 8500000, priceLabel: "KES 8.5M", location: "Kilimani, Nairobi",
    description: "Modern 3-bedroom apartment, 120sqm, fully fitted kitchen, secure parking, 24hr security. Ready to move in.",
    image: "🏢", verified: true, featured: true, views: 3201, rating: 4.9, reviews: 41,
    seller: "Nairobi Realty Group", sellerVerified: true, daysAgo: 1, badge: "Hot",
    tags: ["En-suite", "Parking", "Swimming Pool"]
  },
  {
    id: 6, category: "properties", title: "4BR Mansion – Runda Estate",
    price: 28000000, priceLabel: "KES 28M", location: "Runda, Nairobi",
    description: "Spacious 4-bedroom mansion on 0.5 acre. 2 living rooms, garden, swimming pool, staff quarters. Gated community.",
    image: "🏘️", verified: true, featured: false, views: 2341, rating: 4.7, reviews: 34,
    seller: "Runda Properties Ltd", sellerVerified: true, daysAgo: 7, badge: null,
    tags: ["Gated", "Pool", "Staff Quarters"]
  },
  {
    id: 7, category: "properties", title: "Land 2.5 Acres – Kitengela",
    price: 12500000, priceLabel: "KES 12.5M", location: "Kitengela, Kajiado",
    description: "Prime development land with title deed. Access to water, electricity. Near new highway. Perfect for commercial or residential.",
    image: "🌅", verified: true, featured: true, views: 1892, rating: 4.5, reviews: 12,
    seller: "Kajiado Land Agency", sellerVerified: true, daysAgo: 4, badge: "Featured",
    tags: ["Title Deed", "Prime Location", "Commercial Potential"]
  },
  {
    id: 8, category: "properties", title: "Studio Apartment – CBD",
    price: 2800000, priceLabel: "KES 2.8M", location: "CBD, Nairobi",
    description: "Modern studio apartment in the heart of Nairobi. 35sqm, fully furnished. Perfect for investment or first-time buyer.",
    image: "🏢", verified: false, featured: false, views: 1567, rating: 4.2, reviews: 28,
    seller: "City Properties", sellerVerified: false, daysAgo: 9, badge: null,
    tags: ["Central", "Furnished", "Investment"]
  },

  // ─── VEHICLES ────────────────────────────────────────────────────────────────
  {
    id: 9, category: "vehicles", title: "Toyota Land Cruiser V8 2019",
    price: 6200000, priceLabel: "KES 6.2M", location: "Karen, Nairobi",
    description: "Single owner, full service history, locally used. Pearl white, leather interior, sunroof. KCX plates.",
    image: "🚙", verified: true, featured: false, views: 892, rating: 4.7, reviews: 12,
    seller: "AutoKe Premium", sellerVerified: true, daysAgo: 3, badge: null,
    tags: ["Single Owner", "Full History", "Petrol"]
  },
  {
    id: 10, category: "vehicles", title: "Toyota Hilux Double Cab 2021",
    price: 4500000, priceLabel: "KES 4.5M", location: "Thika, Kiambu",
    description: "Low mileage 35,000km. 4x4, automatic, A/C, reverse camera. Perfect for business and family use.",
    image: "🚛", verified: true, featured: false, views: 2345, rating: 4.8, reviews: 23,
    seller: "Hilux Motors", sellerVerified: true, daysAgo: 6, badge: null,
    tags: ["Low Mileage", "4x4", "Automatic"]
  },
  {
    id: 11, category: "vehicles", title: "Nissan X-Trail 2020",
    price: 3500000, priceLabel: "KES 3.5M", location: "Nakuru, Nakuru",
    description: "Well maintained SUV. One owner. Full service records. 7-seater, ideal for family.",
    image: "🚗", verified: true, featured: false, views: 1567, rating: 4.5, reviews: 34,
    seller: "Nakuru Auto Centre", sellerVerified: true, daysAgo: 11, badge: null,
    tags: ["7-Seater", "Well Maintained", "One Owner"]
  },
  {
    id: 12, category: "vehicles", title: "Motorcycle – Boxer BM150",
    price: 65000, priceLabel: "KES 65K", location: "Kisumu, Kisumu",
    description: "Very good condition. 2022 model. Low mileage. Perfect for delivery or personal use.",
    image: "🏍️", verified: false, featured: false, views: 892, rating: 4.3, reviews: 45,
    seller: "Kisumu Motors", sellerVerified: false, daysAgo: 8, badge: null,
    tags: ["Low Mileage", "Good Condition", "Economical"]
  },

  // ─── JOBS ────────────────────────────────────────────────────────────────────
  {
    id: 13, category: "jobs", title: "Senior Software Engineer – Fintech",
    price: 350000, priceLabel: "KES 350K/mo", location: "CBD, Nairobi",
    description: "Leading fintech company seeking Senior Software Engineer. React, Node.js, Python. 5+ years experience. Remote-friendly.",
    image: "💻", verified: true, featured: true, views: 2145, rating: 5.0, reviews: 8,
    seller: "PesaPulse Kenya", sellerVerified: true, daysAgo: 0, badge: "Urgent",
    tags: ["Remote OK", "Equity", "Health Insurance"]
  },
  {
    id: 14, category: "jobs", title: "Sales Manager – FMCG",
    price: 180000, priceLabel: "KES 180K/mo", location: "Mombasa Road, Nairobi",
    description: "Multinational FMCG company looking for experienced Sales Manager. 10+ years experience in FMCG sales.",
    image: "📊", verified: true, featured: false, views: 1342, rating: 4.4, reviews: 6,
    seller: "Global Brands Ltd", sellerVerified: true, daysAgo: 3, badge: null,
    tags: ["FMCG", "Managerial", "Bonuses"]
  },
  {
    id: 15, category: "jobs", title: "Registered Nurse – Aga Khan Hospital",
    price: 120000, priceLabel: "KES 120K/mo", location: "Westlands, Nairobi",
    description: "Seeking experienced Registered Nurse for specialized unit. 3+ years experience in ICU/CCU.",
    image: "🏥", verified: true, featured: false, views: 2341, rating: 4.6, reviews: 12,
    seller: "Aga Khan Hospital", sellerVerified: true, daysAgo: 5, badge: "New",
    tags: ["ICU Experience", "Full Benefits", "Permanent"]
  },
  {
    id: 16, category: "jobs", title: "Digital Marketing Specialist",
    price: 95000, priceLabel: "KES 95K/mo", location: "Karen, Nairobi",
    description: "E-commerce startup looking for digital marketing specialist. SEO, PPC, social media management experience required.",
    image: "📱", verified: true, featured: false, views: 1789, rating: 4.2, reviews: 9,
    seller: "ShopAfrica", sellerVerified: true, daysAgo: 7, badge: null,
    tags: ["SEO", "PPC", "E-commerce"]
  },

  // ─── SERVICES ────────────────────────────────────────────────────────────────
  {
    id: 17, category: "services", title: "Professional Web Design & Development",
    price: 25000, priceLabel: "From KES 25K", location: "Nairobi (Remote)",
    description: "Premium websites, e-commerce stores, and web apps. 10+ years experience. Portfolio of 200+ projects across East Africa.",
    image: "🎨", verified: true, featured: false, views: 674, rating: 4.6, reviews: 89,
    seller: "TizianTech Edge", sellerVerified: true, daysAgo: 5, badge: null,
    tags: ["E-commerce", "SEO", "Maintenance"]
  },
  {
    id: 18, category: "services", title: "Professional Cleaning Services",
    price: 5000, priceLabel: "From KES 5K", location: "Nairobi Wide",
    description: "Commercial and residential cleaning. Carpet cleaning, office cleaning, post-construction. Professional team.",
    image: "🧹", verified: true, featured: false, views: 456, rating: 4.8, reviews: 156,
    seller: "CleanKenya Solutions", sellerVerified: true, daysAgo: 2, badge: null,
    tags: ["Commercial", "Residential", "Eco-Friendly"]
  },
  {
    id: 19, category: "services", title: "Photography & Videography Services",
    price: 15000, priceLabel: "From KES 15K", location: "Nairobi & Rift Valley",
    description: "Professional photography and videography for events, weddings, corporate, product photography.",
    image: "📷", verified: true, featured: false, views: 234, rating: 4.9, reviews: 67,
    seller: "Lens Academy", sellerVerified: true, daysAgo: 8, badge: null,
    tags: ["Events", "Wedding", "Corporate"]
  },
  {
    id: 20, category: "services", title: "IT Support & Networking Services",
    price: 10000, priceLabel: "From KES 10K", location: "Nairobi (Remote/On-site)",
    description: "IT support, network installation, server management, cybersecurity consulting. Available 24/7.",
    image: "🖥️", verified: true, featured: false, views: 567, rating: 4.4, reviews: 34,
    seller: "TechFix Kenya", sellerVerified: true, daysAgo: 12, badge: null,
    tags: ["24/7 Support", "Cybersecurity", "Networking"]
  },

  // ─── ELECTRONICS ─────────────────────────────────────────────────────────────
  {
    id: 21, category: "electronics", title: "iPhone 15 Pro Max 256GB – New",
    price: 189000, priceLabel: "KES 189K", location: "CBD, Nairobi",
    description: "Brand new, sealed in box. Natural Titanium. M-Pesa accepted. Receipt provided. Warranty included.",
    image: "📱", verified: true, featured: false, views: 4523, rating: 4.5, reviews: 156,
    seller: "iStore Kenya", sellerVerified: true, daysAgo: 1, badge: "New",
    tags: ["Sealed", "Warranty", "Original"]
  },
  {
    id: 22, category: "electronics", title: "Samsung QLED 65\" TV – 2024",
    price: 185000, priceLabel: "KES 185K", location: "Westlands, Nairobi",
    description: "Samsung QLED 65-inch TV with 4K resolution. Smart TV with all features. Brand new in box.",
    image: "📺", verified: true, featured: false, views: 2341, rating: 4.7, reviews: 89,
    seller: "Electronics Hub", sellerVerified: true, daysAgo: 3, badge: null,
    tags: ["4K", "Smart TV", "New"]
  },
  {
    id: 23, category: "electronics", title: "MacBook Pro M3 Pro 2024",
    price: 350000, priceLabel: "KES 350K", location: "Karen, Nairobi",
    description: "Latest MacBook Pro M3 Pro chip. 16-inch, 36GB RAM, 1TB SSD. Perfect for professionals.",
    image: "💻", verified: true, featured: true, views: 789, rating: 4.9, reviews: 23,
    seller: "MacWorld Kenya", sellerVerified: true, daysAgo: 2, badge: "Featured",
    tags: ["M3 Pro", "36GB RAM", "1TB SSD"]
  },
  {
    id: 24, category: "electronics", title: "PlayStation 5 – Disc Edition",
    price: 95000, priceLabel: "KES 95K", location: "Nakuru, Nakuru",
    description: "Brand new PS5 console with controller. Disc edition with 2-year warranty.",
    image: "🎮", verified: false, featured: false, views: 2345, rating: 4.6, reviews: 45,
    seller: "GameHub KE", sellerVerified: false, daysAgo: 6, badge: null,
    tags: ["New", "Warranty", "Disc Edition"]
  },

  // ─── AGRICULTURE ─────────────────────────────────────────────────────────────
  {
    id: 25, category: "agriculture", title: "2-Acre Farm – Limuru (Title Deed Ready)",
    price: 1800000, priceLabel: "KES 1.8M", location: "Limuru, Kiambu",
    description: "2-acre fertile farm land, red soil, good rainfall. Power connected. Access road. Title deed ready to transfer.",
    image: "🌱", verified: true, featured: false, views: 1203, rating: 4.9, reviews: 7,
    seller: "Kiambu Land Agency", sellerVerified: false, daysAgo: 7, badge: null,
    tags: ["Title Deed", "Fertile", "Power"]
  },
  {
    id: 26, category: "agriculture", title: "5-Acre Greenhouse Farm – Nanyuki",
    price: 8500000, priceLabel: "KES 8.5M", location: "Nanyuki, Laikipia",
    description: "Established greenhouse farm with 5 acres under cultivation. Tomatoes and capsicum. Good water source.",
    image: "🌿", verified: true, featured: true, views: 892, rating: 4.7, reviews: 15,
    seller: "Nanyuki Farm Solutions", sellerVerified: true, daysAgo: 4, badge: "Featured",
    tags: ["Greenhouse", "Water Source", "Profitable"]
  },
  {
    id: 27, category: "agriculture", title: "1-Acre Land – Kericho (Tea Growing)",
    price: 950000, priceLabel: "KES 950K", location: "Kericho, Kericho",
    description: "Prime tea-growing land in Kericho. 1 acre with mature tea bushes. Good returns.",
    image: "🍃", verified: true, featured: false, views: 567, rating: 4.5, reviews: 9,
    seller: "Kericho Lands Ltd", sellerVerified: true, daysAgo: 10, badge: null,
    tags: ["Tea", "Mature Bushes", "Good Returns"]
  },

  // ─── FASHION ──────────────────────────────────────────────────────────────────
  {
    id: 28, category: "fashion", title: "Boutique Stock – Ladies Fashion (Bulk)",
    price: 45000, priceLabel: "KES 45K/lot", location: "Eastleigh, Nairobi",
    description: "Wholesale ladies dresses, tops, and skirts. 200 pieces per lot. Turkish fabric. New arrivals weekly.",
    image: "👗", verified: false, featured: false, views: 341, rating: 4.2, reviews: 34,
    seller: "Eastleigh Fashions", sellerVerified: false, daysAgo: 4, badge: null,
    tags: ["Wholesale", "Turkish", "200pcs"]
  },
  {
    id: 29, category: "fashion", title: "Premium African Wear Collection",
    price: 15000, priceLabel: "From KES 15K", location: "Mombasa, Mombasa",
    description: "High-quality African fashion designs. Kitenge, Kente, and modern African wear. Custom orders accepted.",
    image: "👘", verified: true, featured: false, views: 456, rating: 4.8, reviews: 56,
    seller: "African Couture", sellerVerified: true, daysAgo: 2, badge: "New",
    tags: ["Custom", "High Quality", "African Prints"]
  },
  {
    id: 30, category: "fashion", title: "Shoe Store Stock – Men's & Women's",
    price: 120000, priceLabel: "KES 120K/lot", location: "CBD, Nairobi",
    description: "Wholesale shoes lot - 300 pairs. Various styles and sizes. Good quality. Perfect for new store.",
    image: "👟", verified: false, featured: false, views: 289, rating: 4.0, reviews: 23,
    seller: "ShoeWorld KE", sellerVerified: false, daysAgo: 8, badge: null,
    tags: ["Wholesale", "Mixed Styles", "300 Pairs"]
  },

  // ─── EDUCATION ───────────────────────────────────────────────────────────────
  {
    id: 31, category: "education", title: "Pre-School Franchise – Karen",
    price: 4500000, priceLabel: "KES 4.5M", location: "Karen, Nairobi",
    description: "Established pre-school with 4 years operation. 50 students. Good reputation. Full curriculum.",
    image: "🏫", verified: true, featured: true, views: 678, rating: 4.9, reviews: 11,
    seller: "Little Scholars", sellerVerified: true, daysAgo: 5, badge: "Featured",
    tags: ["Franchise", "Established", "Good Reputation"]
  },
  {
    id: 32, category: "education", title: "Online Tutoring Services",
    price: 2500, priceLabel: "From KES 2.5K/hr", location: "Nairobi (Remote)",
    description: "Online tutoring in Mathematics, Sciences, and Languages. Experienced teachers. All levels.",
    image: "📚", verified: true, featured: false, views: 345, rating: 4.7, reviews: 45,
    seller: "TutorKenya", sellerVerified: true, daysAgo: 3, badge: null,
    tags: ["Online", "All Levels", "Experienced"]
  },

  // ─── HEALTHCARE ──────────────────────────────────────────────────────────────
  {
    id: 33, category: "healthcare", title: "Dental Clinic Equipment Lot",
    price: 2800000, priceLabel: "KES 2.8M", location: "Westlands, Nairobi",
    description: "Complete dental clinic equipment. 2 chairs, X-ray machine, sterilizer, all instruments. Well-maintained.",
    image: "🦷", verified: true, featured: false, views: 234, rating: 4.5, reviews: 6,
    seller: "Dental Supply KE", sellerVerified: true, daysAgo: 12, badge: null,
    tags: ["Complete", "Well Maintained", "Ready"]
  },
  {
    id: 34, category: "healthcare", title: "Pharmacy – Established Business",
    price: 5600000, priceLabel: "KES 5.6M", location: "Nakuru, Nakuru",
    description: "Established pharmacy in Nakuru. Stock worth KES 1.5M included. Good location, loyal customers.",
    image: "💊", verified: true, featured: false, views: 456, rating: 4.3, reviews: 9,
    seller: "Nakuru Pharmacy", sellerVerified: true, daysAgo: 7, badge: null,
    tags: ["Established", "Stock Included", "Good Location"]
  },

  // ─── PRODUCTS ────────────────────────────────────────────────────────────────
  {
    id: 35, category: "products", title: "Bulk Coffee – Premium Grade",
    price: 8500, priceLabel: "KES 8.5K/50kg", location: "Kiambu, Kiambu",
    description: "High-quality Kenyan coffee beans. Direct from farm. AA grade. Roasted and green options.",
    image: "☕", verified: true, featured: false, views: 234, rating: 4.9, reviews: 34,
    seller: "Kiambu Coffee Estates", sellerVerified: true, daysAgo: 2, badge: null,
    tags: ["Premium", "Direct Farm", "AA Grade"]
  },
  {
    id: 36, category: "products", title: "Furniture Manufacturing Business",
    price: 3200000, priceLabel: "KES 3.2M", location: "Thika, Kiambu",
    description: "Furniture manufacturing business with equipment, showroom, and stock. 10+ years experience.",
    image: "🪑", verified: true, featured: true, views: 789, rating: 4.7, reviews: 23,
    seller: "Thika Furniture", sellerVerified: true, daysAgo: 4, badge: "Featured",
    tags: ["Equipment", "Showroom", "Established"]
  },

  // ─── FINANCE ─────────────────────────────────────────────────────────────────
  {
    id: 37, category: "finance", title: "Micro-Finance Business for Sale",
    price: 15000000, priceLabel: "KES 15M", location: "CBD, Nairobi",
    description: "Established micro-finance business with 500+ active clients. Good portfolio and systems in place.",
    image: "💰", verified: true, featured: true, views: 345, rating: 4.4, reviews: 8,
    seller: "Finance Solutions KE", sellerVerified: true, daysAgo: 6, badge: "Featured",
    tags: ["Established", "Good Portfolio", "Systems"]
  },
  {
    id: 38, category: "finance", title: "Online Remittance Business",
    price: 8500000, priceLabel: "KES 8.5M", location: "Mombasa, Mombasa",
    description: "Online remittance business with platform and partnerships. Monthly transactions KES 200M+",
    image: "🌐", verified: true, featured: false, views: 234, rating: 4.5, reviews: 5,
    seller: "RemitKE", sellerVerified: true, daysAgo: 9, badge: null,
    tags: ["Online", "High Volume", "Partnerships"]
  },

  // ─── MORE PROPERTIES ────────────────────────────────────────────────────────
  {
    id: 39, category: "properties", title: "Commercial Building – Mombasa Road",
    price: 45000000, priceLabel: "KES 45M", location: "Mombasa Road, Nairobi",
    description: "Commercial building with ground floor shops and upper floors for offices. 10 tenants currently. Good returns.",
    image: "🏗️", verified: true, featured: true, views: 456, rating: 4.8, reviews: 15,
    seller: "Prime Properties KE", sellerVerified: true, daysAgo: 3, badge: "Hot",
    tags: ["Commercial", "Good Returns", "Prime Location"]
  },
  {
    id: 40, category: "properties", title: "Land 10 Acres – Naivasha",
    price: 6500000, priceLabel: "KES 6.5M", location: "Naivasha, Nakuru",
    description: "10 acres of land near Lake Naivasha. Great for agricultural or development. Title deed ready.",
    image: "🌾", verified: true, featured: false, views: 567, rating: 4.6, reviews: 11,
    seller: "Naivasha Lands", sellerVerified: true, daysAgo: 11, badge: null,
    tags: ["Title Deed", "Lake View", "Development"]
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

  // Check for stored user
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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setView("home");
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
      case "how":
        return <HowItWorks />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div style={{ background: COLORS.white, minHeight: "100vh" }}>
      <GlobalStyles />
      
      <Navbar 
        view={view} 
        setView={setView} 
        user={user} 
        setUser={setUser}
        onLoginOpen={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
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
