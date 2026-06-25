'use client';

import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
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

// ─── 62 LISTINGS ──────────────────────────────────────────────────────────────
const CATEGORIES = [
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

const LOCATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", "Garissa", "Nyeri", "Meru", "Embu", "Machakos", "Kitui", "Wajir", "Mandera", "Marsabit", "Isiolo", "Samburu", "Turkana", "Kakamega", "Bungoma", "Busia", "Siaya", "Kisii", "Nyamira", "Homa Bay", "Migori", "Narok", "Kajiado", "Nanyuki", "Kericho", "Bomet", "Nandi", "Uasin Gishu"];

const LISTINGS = [
  // ─── BUSINESSES ──────────────────────────────────────────────────────────────
  { id: 1, category: "businesses", title: "Established Supermarket – Westlands", price: 4500000, priceLabel: "KES 4.5M", location: "Westlands, Nairobi", description: "Profitable supermarket with 8 years of operation. Monthly revenue KES 800K+. Well-equipped, loyal customer base, prime location.", image: "🏪", verified: true, featured: true, views: 1842, rating: 4.8, reviews: 23, seller: "James Mwangi", sellerVerified: true, daysAgo: 2, badge: "Featured", tags: ["Turnkey", "Profitable", "Prime Location"] },
  { id: 2, category: "businesses", title: "Café & Bakery – Karen Shopping Centre", price: 2800000, priceLabel: "KES 2.8M", location: "Karen, Nairobi", description: "Popular café with established clientele. Fully equipped kitchen, outdoor seating, 50 capacity.", image: "☕", verified: true, featured: false, views: 1204, rating: 4.6, reviews: 45, seller: "Grace Wanjiru", sellerVerified: true, daysAgo: 5, badge: null, tags: ["Equipment Included", "High Traffic", "Profitable"] },
  { id: 3, category: "businesses", title: "Hardware Store – Industrial Area", price: 12000000, priceLabel: "KES 12M", location: "Industrial Area, Nairobi", description: "Large hardware store with 5 years operation. Stock worth KES 4M included. Established supplier network.", image: "🔨", verified: true, featured: true, views: 890, rating: 4.3, reviews: 18, seller: "Peter Kimani", sellerVerified: true, daysAgo: 10, badge: "Featured", tags: ["Stock Included", "Supplier Network", "Good Location"] },
  { id: 4, category: "businesses", title: "Salon & Spa – Kilimani", price: 950000, priceLabel: "KES 950K", location: "Kilimani, Nairobi", description: "Modern salon with 6 workstations. High-end clientele. Established 4 years. Monthly profit KES 150K+", image: "💇", verified: true, featured: false, views: 756, rating: 4.9, reviews: 67, seller: "Mary Achieng", sellerVerified: true, daysAgo: 3, badge: null, tags: ["High-End", "Loyal Clientele", "Profitable"] },
  { id: 5, category: "businesses", title: "Pharmacy – CBD", price: 5600000, priceLabel: "KES 5.6M", location: "CBD, Nairobi", description: "Well-established pharmacy in the city centre. Stock worth KES 2M included.", image: "💊", verified: true, featured: false, views: 2341, rating: 4.7, reviews: 34, seller: "Nairobi Pharmacy Ltd", sellerVerified: true, daysAgo: 7, badge: null, tags: ["Stock Included", "Central Location", "Good Returns"] },
  { id: 6, category: "businesses", title: "Car Wash & Detailing – Westlands", price: 1800000, priceLabel: "KES 1.8M", location: "Westlands, Nairobi", description: "Busy car wash with 5 bays. 3 years operation. Monthly revenue KES 300K+.", image: "🚗", verified: true, featured: false, views: 567, rating: 4.2, reviews: 45, seller: "CarCare Kenya", sellerVerified: true, daysAgo: 12, badge: null, tags: ["Equipment", "Busy Location", "Good Revenue"] },
  { id: 7, category: "businesses", title: "Electronics Shop – Mombasa Road", price: 3500000, priceLabel: "KES 3.5M", location: "Mombasa Road, Nairobi", description: "Electronic shop selling phones, TVs, and accessories. Stock worth KES 1.5M.", image: "📱", verified: true, featured: false, views: 234, rating: 4.5, reviews: 23, seller: "Tech World", sellerVerified: true, daysAgo: 8, badge: null, tags: ["Stock Included", "Good Location", "Profitable"] },
  { id: 8, category: "businesses", title: "Laundromat – Kilimani", price: 750000, priceLabel: "KES 750K", location: "Kilimani, Nairobi", description: "Self-service laundromat with 8 machines. Good location near apartments.", image: "🧺", verified: false, featured: false, views: 345, rating: 4.3, reviews: 56, seller: "Clean & Fresh", sellerVerified: false, daysAgo: 6, badge: null, tags: ["Self-Service", "Good Location", "Low Overhead"] },
  { id: 9, category: "businesses", title: "Restaurant – Ngong Road", price: 4200000, priceLabel: "KES 4.2M", location: "Ngong Road, Nairobi", description: "Popular restaurant serving African cuisine. 60 capacity. Fully equipped.", image: "🍽️", verified: true, featured: true, views: 789, rating: 4.8, reviews: 89, seller: "African Flavours", sellerVerified: true, daysAgo: 4, badge: "Hot", tags: ["Fully Equipped", "Good Reputation", "Profitable"] },
  { id: 10, category: "businesses", title: "Butchery – Umoja Estate", price: 1200000, priceLabel: "KES 1.2M", location: "Umoja, Nairobi", description: "Established butchery with cold room. Good customer base.", image: "🥩", verified: true, featured: false, views: 456, rating: 4.6, reviews: 34, seller: "Fresh Meats", sellerVerified: true, daysAgo: 9, badge: null, tags: ["Cold Room", "Established", "Profitable"] },
  // ─── PROPERTIES ──────────────────────────────────────────────────────────────
  { id: 11, category: "properties", title: "3BR Apartment – Kilimani", price: 8500000, priceLabel: "KES 8.5M", location: "Kilimani, Nairobi", description: "Modern 3-bedroom apartment, 120sqm, fully fitted kitchen, secure parking.", image: "🏢", verified: true, featured: true, views: 3201, rating: 4.9, reviews: 41, seller: "Nairobi Realty Group", sellerVerified: true, daysAgo: 1, badge: "Hot", tags: ["En-suite", "Parking", "Swimming Pool"] },
  { id: 12, category: "properties", title: "4BR Mansion – Runda Estate", price: 28000000, priceLabel: "KES 28M", location: "Runda, Nairobi", description: "Spacious 4-bedroom mansion on 0.5 acre. Garden, pool, staff quarters.", image: "🏘️", verified: true, featured: false, views: 2341, rating: 4.7, reviews: 34, seller: "Runda Properties Ltd", sellerVerified: true, daysAgo: 7, badge: null, tags: ["Gated", "Pool", "Staff Quarters"] },
  { id: 13, category: "properties", title: "Land 2.5 Acres – Kitengela", price: 12500000, priceLabel: "KES 12.5M", location: "Kitengela, Kajiado", description: "Prime development land with title deed. Near new highway.", image: "🌅", verified: true, featured: true, views: 1892, rating: 4.5, reviews: 12, seller: "Kajiado Land Agency", sellerVerified: true, daysAgo: 4, badge: "Featured", tags: ["Title Deed", "Prime Location", "Commercial Potential"] },
  { id: 14, category: "properties", title: "Studio Apartment – CBD", price: 2800000, priceLabel: "KES 2.8M", location: "CBD, Nairobi", description: "Modern studio apartment in the heart of Nairobi. Fully furnished.", image: "🏢", verified: false, featured: false, views: 1567, rating: 4.2, reviews: 28, seller: "City Properties", sellerVerified: false, daysAgo: 9, badge: null, tags: ["Central", "Furnished", "Investment"] },
  { id: 15, category: "properties", title: "Commercial Building – Mombasa Road", price: 45000000, priceLabel: "KES 45M", location: "Mombasa Road, Nairobi", description: "Commercial building with shops and offices. 10 tenants.", image: "🏗️", verified: true, featured: true, views: 456, rating: 4.8, reviews: 15, seller: "Prime Properties KE", sellerVerified: true, daysAgo: 3, badge: "Hot", tags: ["Commercial", "Good Returns", "Prime Location"] },
  { id: 16, category: "properties", title: "Land 10 Acres – Naivasha", price: 6500000, priceLabel: "KES 6.5M", location: "Naivasha, Nakuru", description: "10 acres of land near Lake Naivasha. Great for agricultural or development.", image: "🌾", verified: true, featured: false, views: 567, rating: 4.6, reviews: 11, seller: "Naivasha Lands", sellerVerified: true, daysAgo: 11, badge: null, tags: ["Title Deed", "Lake View", "Development"] },
  { id: 17, category: "properties", title: "2BR Bungalow – Nakuru", price: 3500000, priceLabel: "KES 3.5M", location: "Nakuru, Nakuru", description: "Cosy 2-bedroom bungalow with garden. Quiet neighborhood.", image: "🏡", verified: true, featured: false, views: 234, rating: 4.4, reviews: 8, seller: "Nakuru Homes", sellerVerified: true, daysAgo: 5, badge: null, tags: ["Garden", "Quiet", "First Time"] },
  { id: 18, category: "properties", title: "Warehouse – Industrial Area", price: 12000000, priceLabel: "KES 12M", location: "Industrial Area, Nairobi", description: "Large warehouse 500sqm with office space. Good for manufacturing.", image: "🏭", verified: true, featured: false, views: 345, rating: 4.3, reviews: 6, seller: "Industrial Spaces", sellerVerified: true, daysAgo: 14, badge: null, tags: ["Large Space", "Office", "Good Access"] },
  { id: 19, category: "properties", title: "Beachfront Villa – Diani", price: 25000000, priceLabel: "KES 25M", location: "Diani, Kwale", description: "Luxury 5-bedroom villa on Diani beach. Private pool, staff quarters.", image: "🏖️", verified: true, featured: true, views: 678, rating: 5.0, reviews: 23, seller: "Diani Property Group", sellerVerified: true, daysAgo: 2, badge: "Featured", tags: ["Beachfront", "Pool", "Luxury"] },
  { id: 20, category: "properties", title: "Land 1 Acre – Karen", price: 8500000, priceLabel: "KES 8.5M", location: "Karen, Nairobi", description: "Prime 1-acre plot in Karen. Ready for construction.", image: "🌳", verified: true, featured: false, views: 456, rating: 4.7, reviews: 9, seller: "Karen Land Agency", sellerVerified: true, daysAgo: 8, badge: null, tags: ["Prime Location", "Ready to Build", "Good Neighborhood"] },
  // ─── VEHICLES ──────────────────────────────────────────────────────────────
  { id: 21, category: "vehicles", title: "Toyota Land Cruiser V8 2019", price: 6200000, priceLabel: "KES 6.2M", location: "Karen, Nairobi", description: "Single owner, full service history. Pearl white, leather interior.", image: "🚙", verified: true, featured: false, views: 892, rating: 4.7, reviews: 12, seller: "AutoKe Premium", sellerVerified: true, daysAgo: 3, badge: null, tags: ["Single Owner", "Full History", "Petrol"] },
  { id: 22, category: "vehicles", title: "Toyota Hilux Double Cab 2021", price: 4500000, priceLabel: "KES 4.5M", location: "Thika, Kiambu", description: "Low mileage 35,000km. 4x4, automatic. Perfect for business.", image: "🚛", verified: true, featured: false, views: 2345, rating: 4.8, reviews: 23, seller: "Hilux Motors", sellerVerified: true, daysAgo: 6, badge: null, tags: ["Low Mileage", "4x4", "Automatic"] },
  { id: 23, category: "vehicles", title: "Nissan X-Trail 2020", price: 3500000, priceLabel: "KES 3.5M", location: "Nakuru, Nakuru", description: "Well maintained SUV. One owner. 7-seater.", image: "🚗", verified: true, featured: false, views: 1567, rating: 4.5, reviews: 34, seller: "Nakuru Auto Centre", sellerVerified: true, daysAgo: 11, badge: null, tags: ["7-Seater", "Well Maintained", "One Owner"] },
  { id: 24, category: "vehicles", title: "Motorcycle – Boxer BM150", price: 65000, priceLabel: "KES 65K", location: "Kisumu, Kisumu", description: "2022 model. Low mileage. Perfect for delivery.", image: "🏍️", verified: false, featured: false, views: 892, rating: 4.3, reviews: 45, seller: "Kisumu Motors", sellerVerified: false, daysAgo: 8, badge: null, tags: ["Low Mileage", "Good Condition", "Economical"] },
  { id: 25, category: "vehicles", title: "Mercedes Benz E200 2018", price: 4800000, priceLabel: "KES 4.8M", location: "Westlands, Nairobi", description: "Elegant Mercedes E200. Full service history.", image: "🚘", verified: true, featured: false, views: 678, rating: 4.6, reviews: 18, seller: "Luxury Auto", sellerVerified: true, daysAgo: 5, badge: null, tags: ["Luxury", "Well Maintained", "Full History"] },
  { id: 26, category: "vehicles", title: "Toyota Sienta 2020", price: 2800000, priceLabel: "KES 2.8M", location: "Mombasa, Mombasa", description: "Family-friendly 7-seater. Good condition. Low mileage.", image: "🚐", verified: true, featured: false, views: 234, rating: 4.4, reviews: 12, seller: "Mombasa Autos", sellerVerified: true, daysAgo: 9, badge: null, tags: ["7-Seater", "Family", "Low Mileage"] },
  { id: 27, category: "vehicles", title: "Isuzu D-Max 2021", price: 4200000, priceLabel: "KES 4.2M", location: "Thika, Kiambu", description: "Double cab pick-up. 4x4, diesel. 30,000km.", image: "🚜", verified: true, featured: false, views: 345, rating: 4.7, reviews: 15, seller: "Pickup Kenya", sellerVerified: true, daysAgo: 4, badge: null, tags: ["Double Cab", "4x4", "Diesel"] },
  { id: 28, category: "vehicles", title: "VW Polo Vivo 2019", price: 1500000, priceLabel: "KES 1.5M", location: "CBD, Nairobi", description: "Well-maintained VW Polo. 40,000km.", image: "🚗", verified: false, featured: false, views: 456, rating: 4.2, reviews: 8, seller: "City Cars", sellerVerified: false, daysAgo: 12, badge: null, tags: ["City", "Good Condition", "Economical"] },
  // ─── JOBS ──────────────────────────────────────────────────────────────────
  { id: 29, category: "jobs", title: "Senior Software Engineer – Fintech", price: 350000, priceLabel: "KES 350K/mo", location: "CBD, Nairobi", description: "Fintech seeking Senior Software Engineer. React, Node.js, Python. 5+ years.", image: "💻", verified: true, featured: true, views: 2145, rating: 5.0, reviews: 8, seller: "PesaPulse Kenya", sellerVerified: true, daysAgo: 0, badge: "Urgent", tags: ["Remote OK", "Equity", "Health Insurance"] },
  { id: 30, category: "jobs", title: "Sales Manager – FMCG", price: 180000, priceLabel: "KES 180K/mo", location: "Mombasa Road, Nairobi", description: "FMCG company looking for experienced Sales Manager. 10+ years.", image: "📊", verified: true, featured: false, views: 1342, rating: 4.4, reviews: 6, seller: "Global Brands Ltd", sellerVerified: true, daysAgo: 3, badge: null, tags: ["FMCG", "Managerial", "Bonuses"] },
  { id: 31, category: "jobs", title: "Registered Nurse – Aga Khan Hospital", price: 120000, priceLabel: "KES 120K/mo", location: "Westlands, Nairobi", description: "Seeking experienced RN for specialized unit. 3+ years ICU experience.", image: "🏥", verified: true, featured: false, views: 2341, rating: 4.6, reviews: 12, seller: "Aga Khan Hospital", sellerVerified: true, daysAgo: 5, badge: "New", tags: ["ICU Experience", "Full Benefits", "Permanent"] },
  { id: 32, category: "jobs", title: "Digital Marketing Specialist", price: 95000, priceLabel: "KES 95K/mo", location: "Karen, Nairobi", description: "E-commerce startup looking for digital marketing specialist. SEO, PPC.", image: "📱", verified: true, featured: false, views: 1789, rating: 4.2, reviews: 9, seller: "ShopAfrica", sellerVerified: true, daysAgo: 7, badge: null, tags: ["SEO", "PPC", "E-commerce"] },
  { id: 33, category: "jobs", title: "Accountant – Manufacturing", price: 85000, priceLabel: "KES 85K/mo", location: "Industrial Area, Nairobi", description: "Manufacturing company seeking Accountant with 3+ years. CPA required.", image: "📊", verified: true, featured: false, views: 567, rating: 4.3, reviews: 7, seller: "Manufacturing Ltd", sellerVerified: true, daysAgo: 8, badge: null, tags: ["CPA", "Manufacturing", "Full Time"] },
  { id: 34, category: "jobs", title: "Construction Project Manager", price: 150000, priceLabel: "KES 150K/mo", location: "Nairobi Wide", description: "Seeking Project Manager for construction projects. 5+ years experience.", image: "🏗️", verified: true, featured: false, views: 234, rating: 4.5, reviews: 5, seller: "BuildCo Kenya", sellerVerified: true, daysAgo: 10, badge: null, tags: ["Construction", "Managerial", "5+ Years"] },
  { id: 35, category: "jobs", title: "Customer Service Manager", price: 75000, priceLabel: "KES 75K/mo", location: "Mombasa, Mombasa", description: "Telecom company seeking Customer Service Manager. 3+ years.", image: "📞", verified: true, featured: false, views: 345, rating: 4.1, reviews: 6, seller: "Telecom Kenya", sellerVerified: true, daysAgo: 6, badge: null, tags: ["Telecom", "Managerial", "Full Time"] },
  { id: 36, category: "jobs", title: "Graphic Designer – Creative Agency", price: 65000, priceLabel: "KES 65K/mo", location: "Westlands, Nairobi", description: "Creative agency seeking Graphic Designer. 2+ years. Adobe Suite.", image: "🎨", verified: true, featured: false, views: 456, rating: 4.4, reviews: 8, seller: "Creative Hub", sellerVerified: true, daysAgo: 4, badge: "New", tags: ["Adobe Suite", "Creative", "Agency"] },
  // ─── SERVICES ──────────────────────────────────────────────────────────────
  { id: 37, category: "services", title: "Professional Web Design & Development", price: 25000, priceLabel: "From KES 25K", location: "Nairobi (Remote)", description: "Premium websites, e-commerce stores, and web apps. 10+ years.", image: "🎨", verified: true, featured: false, views: 674, rating: 4.6, reviews: 89, seller: "TizianTech Edge", sellerVerified: true, daysAgo: 5, badge: null, tags: ["E-commerce", "SEO", "Maintenance"] },
  { id: 38, category: "services", title: "Professional Cleaning Services", price: 5000, priceLabel: "From KES 5K", location: "Nairobi Wide", description: "Commercial and residential cleaning. Carpet, office, post-construction.", image: "🧹", verified: true, featured: false, views: 456, rating: 4.8, reviews: 156, seller: "CleanKenya Solutions", sellerVerified: true, daysAgo: 2, badge: null, tags: ["Commercial", "Residential", "Eco-Friendly"] },
  { id: 39, category: "services", title: "Photography & Videography Services", price: 15000, priceLabel: "From KES 15K", location: "Nairobi & Rift Valley", description: "Professional photography and videography for events, weddings, corporate.", image: "📷", verified: true, featured: false, views: 234, rating: 4.9, reviews: 67, seller: "Lens Academy", sellerVerified: true, daysAgo: 8, badge: null, tags: ["Events", "Wedding", "Corporate"] },
  { id: 40, category: "services", title: "IT Support & Networking Services", price: 10000, priceLabel: "From KES 10K", location: "Nairobi (Remote/On-site)", description: "IT support, network installation, server management, cybersecurity.", image: "🖥️", verified: true, featured: false, views: 567, rating: 4.4, reviews: 34, seller: "TechFix Kenya", sellerVerified: true, daysAgo: 12, badge: null, tags: ["24/7 Support", "Cybersecurity", "Networking"] },
  { id: 41, category: "services", title: "Accounting & Tax Services", price: 15000, priceLabel: "From KES 15K", location: "Nairobi (Remote)", description: "Accounting, bookkeeping, and tax services. KRA compliant.", image: "🧾", verified: true, featured: false, views: 345, rating: 4.7, reviews: 45, seller: "TaxPro Kenya", sellerVerified: true, daysAgo: 6, badge: null, tags: ["KRA", "QuickBooks", "Professional"] },
  { id: 42, category: "services", title: "Legal Services – Business Law", price: 20000, priceLabel: "From KES 20K", location: "CBD, Nairobi", description: "Business legal services. Company registration, contracts, IP.", image: "⚖️", verified: true, featured: false, views: 234, rating: 4.9, reviews: 23, seller: "LegalAdvice KE", sellerVerified: true, daysAgo: 9, badge: null, tags: ["Business Law", "Contracts", "Registration"] },
  { id: 43, category: "services", title: "Plumbing & Electrical Services", price: 2500, priceLabel: "From KES 2.5K", location: "Nairobi Wide", description: "Professional plumbing and electrical services. Licensed and insured.", image: "🔧", verified: true, featured: false, views: 456, rating: 4.6, reviews: 78, seller: "FixIt Kenya", sellerVerified: true, daysAgo: 3, badge: null, tags: ["Licensed", "24/7", "Emergency"] },
  { id: 44, category: "services", title: "Event Planning & Catering", price: 30000, priceLabel: "From KES 30K", location: "Nairobi Wide", description: "Full-service event planning and catering. Weddings, corporate events.", image: "🎊", verified: true, featured: false, views: 234, rating: 4.8, reviews: 56, seller: "EventPro Kenya", sellerVerified: true, daysAgo: 7, badge: null, tags: ["Weddings", "Corporate", "Catering"] },
  // ─── ELECTRONICS ────────────────────────────────────────────────────────────
  { id: 45, category: "electronics", title: "iPhone 15 Pro Max 256GB – New", price: 189000, priceLabel: "KES 189K", location: "CBD, Nairobi", description: "Brand new, sealed in box. Natural Titanium. Warranty included.", image: "📱", verified: true, featured: false, views: 4523, rating: 4.5, reviews: 156, seller: "iStore Kenya", sellerVerified: true, daysAgo: 1, badge: "New", tags: ["Sealed", "Warranty", "Original"] },
  { id: 46, category: "electronics", title: "Samsung QLED 65\" TV – 2024", price: 185000, priceLabel: "KES 185K", location: "Westlands, Nairobi", description: "Samsung QLED 65-inch TV with 4K resolution. Smart TV. Brand new.", image: "📺", verified: true, featured: false, views: 2341, rating: 4.7, reviews: 89, seller: "Electronics Hub", sellerVerified: true, daysAgo: 3, badge: null, tags: ["4K", "Smart TV", "New"] },
  { id: 47, category: "electronics", title: "MacBook Pro M3 Pro 2024", price: 350000, priceLabel: "KES 350K", location: "Karen, Nairobi", description: "MacBook Pro M3 Pro chip. 16-inch, 36GB RAM, 1TB SSD.", image: "💻", verified: true, featured: true, views: 789, rating: 4.9, reviews: 23, seller: "MacWorld Kenya", sellerVerified: true, daysAgo: 2, badge: "Featured", tags: ["M3 Pro", "36GB RAM", "1TB SSD"] },
  { id: 48, category: "electronics", title: "PlayStation 5 – Disc Edition", price: 95000, priceLabel: "KES 95K", location: "Nakuru, Nakuru", description: "Brand new PS5 console with controller. 2-year warranty.", image: "🎮", verified: false, featured: false, views: 2345, rating: 4.6, reviews: 45, seller: "GameHub KE", sellerVerified: false, daysAgo: 6, badge: null, tags: ["New", "Warranty", "Disc Edition"] },
  { id: 49, category: "electronics", title: "Dell XPS 15 – 2024", price: 280000, priceLabel: "KES 280K", location: "Mombasa, Mombasa", description: "Dell XPS 15 with Intel i9, 32GB RAM, 1TB SSD.", image: "💻", verified: true, featured: false, views: 456, rating: 4.8, reviews: 34, seller: "Dell Kenya", sellerVerified: true, daysAgo: 5, badge: null, tags: ["i9", "32GB", "1TB SSD"] },
  { id: 50, category: "electronics", title: "AirPods Pro 2 – New", price: 35000, priceLabel: "KES 35K", location: "CBD, Nairobi", description: "Brand new AirPods Pro 2. Sealed box. Noise cancellation.", image: "🎧", verified: true, featured: false, views: 234, rating: 4.7, reviews: 56, seller: "Apple Kenya", sellerVerified: true, daysAgo: 2, badge: "New", tags: ["Sealed", "Warranty", "Noise Cancelling"] },
  // ─── AGRICULTURE ────────────────────────────────────────────────────────────
  { id: 51, category: "agriculture", title: "2-Acre Farm – Limuru (Title Deed Ready)", price: 1800000, priceLabel: "KES 1.8M", location: "Limuru, Kiambu", description: "2-acre fertile farm land, red soil, good rainfall. Title deed ready.", image: "🌱", verified: true, featured: false, views: 1203, rating: 4.9, reviews: 7, seller: "Kiambu Land Agency", sellerVerified: false, daysAgo: 7, badge: null, tags: ["Title Deed", "Fertile", "Power"] },
  { id: 52, category: "agriculture", title: "5-Acre Greenhouse Farm – Nanyuki", price: 8500000, priceLabel: "KES 8.5M", location: "Nanyuki, Laikipia", description: "Established greenhouse farm with 5 acres under cultivation.", image: "🌿", verified: true, featured: true, views: 892, rating: 4.7, reviews: 15, seller: "Nanyuki Farm Solutions", sellerVerified: true, daysAgo: 4, badge: "Featured", tags: ["Greenhouse", "Water Source", "Profitable"] },
  { id: 53, category: "agriculture", title: "1-Acre Land – Kericho (Tea Growing)", price: 950000, priceLabel: "KES 950K", location: "Kericho, Kericho", description: "Prime tea-growing land in Kericho. 1 acre with mature tea bushes.", image: "🍃", verified: true, featured: false, views: 567, rating: 4.5, reviews: 9, seller: "Kericho Lands Ltd", sellerVerified: true, daysAgo: 10, badge: null, tags: ["Tea", "Mature Bushes", "Good Returns"] },
  { id: 54, category: "agriculture", title: "Dairy Farm – 15 Cows + Equipment", price: 3200000, priceLabel: "KES 3.2M", location: "Nakuru, Nakuru", description: "Established dairy farm with 15 cows, milking equipment, 3 acres.", image: "🐄", verified: true, featured: false, views: 456, rating: 4.6, reviews: 12, seller: "Nakuru Dairy", sellerVerified: true, daysAgo: 8, badge: null, tags: ["Dairy", "Equipment", "Established"] },
  // ─── FASHION ────────────────────────────────────────────────────────────────
  { id: 55, category: "fashion", title: "Boutique Stock – Ladies Fashion (Bulk)", price: 45000, priceLabel: "KES 45K/lot", location: "Eastleigh, Nairobi", description: "Wholesale ladies dresses, tops, and skirts. 200 pieces per lot.", image: "👗", verified: false, featured: false, views: 341, rating: 4.2, reviews: 34, seller: "Eastleigh Fashions", sellerVerified: false, daysAgo: 4, badge: null, tags: ["Wholesale", "Turkish", "200pcs"] },
  { id: 56, category: "fashion", title: "Premium African Wear Collection", price: 15000, priceLabel: "From KES 15K", location: "Mombasa, Mombasa", description: "High-quality African fashion designs. Kitenge, Kente, modern wear.", image: "👘", verified: true, featured: false, views: 456, rating: 4.8, reviews: 56, seller: "African Couture", sellerVerified: true, daysAgo: 2, badge: "New", tags: ["Custom", "High Quality", "African Prints"] },
  { id: 57, category: "fashion", title: "Shoe Store Stock – Men's & Women's", price: 120000, priceLabel: "KES 120K/lot", location: "CBD, Nairobi", description: "Wholesale shoes lot - 300 pairs. Various styles and sizes.", image: "👟", verified: false, featured: false, views: 289, rating: 4.0, reviews: 23, seller: "ShoeWorld KE", sellerVerified: false, daysAgo: 8, badge: null, tags: ["Wholesale", "Mixed Styles", "300 Pairs"] },
  { id: 58, category: "fashion", title: "Custom Suits & Tailoring Business", price: 850000, priceLabel: "KES 850K", location: "Westlands, Nairobi", description: "Established tailoring business with equipment, fabric stock.", image: "👔", verified: true, featured: false, views: 234, rating: 4.7, reviews: 34, seller: "TailorMade KE", sellerVerified: true, daysAgo: 11, badge: null, tags: ["Equipment", "Customer Base", "Profitable"] },
  // ─── EDUCATION ──────────────────────────────────────────────────────────────
  { id: 59, category: "education", title: "Pre-School Franchise – Karen", price: 4500000, priceLabel: "KES 4.5M", location: "Karen, Nairobi", description: "Established pre-school with 4 years operation. 50 students. Good reputation.", image: "🏫", verified: true, featured: true, views: 678, rating: 4.9, reviews: 11, seller: "Little Scholars", sellerVerified: true, daysAgo: 5, badge: "Featured", tags: ["Franchise", "Established", "Good Reputation"] },
  { id: 60, category: "education", title: "Online Tutoring Services", price: 2500, priceLabel: "From KES 2.5K/hr", location: "Nairobi (Remote)", description: "Online tutoring in Mathematics, Sciences, and Languages. All levels.", image: "📚", verified: true, featured: false, views: 345, rating: 4.7, reviews: 45, seller: "TutorKenya", sellerVerified: true, daysAgo: 3, badge: null, tags: ["Online", "All Levels", "Experienced"] },
  // ─── HEALTHCARE ─────────────────────────────────────────────────────────────
  { id: 61, category: "healthcare", title: "Dental Clinic Equipment Lot", price: 2800000, priceLabel: "KES 2.8M", location: "Westlands, Nairobi", description: "Complete dental clinic equipment. 2 chairs, X-ray machine, sterilizer.", image: "🦷", verified: true, featured: false, views: 234, rating: 4.5, reviews: 6, seller: "Dental Supply KE", sellerVerified: true, daysAgo: 12, badge: null, tags: ["Complete", "Well Maintained", "Ready"] },
  { id: 62, category: "healthcare", title: "Pharmacy – Established Business", price: 5600000, priceLabel: "KES 5.6M", location: "Nakuru, Nakuru", description: "Established pharmacy in Nakuru. Stock worth KES 1.5M included.", image: "💊", verified: true, featured: false, views: 456, rating: 4.3, reviews: 9, seller: "Nakuru Pharmacy", sellerVerified: true, daysAgo: 7, badge: null, tags: ["Established", "Stock Included", "Good Location"] },
];

const STATS = [
  { label: "Active Listings", value: "47,280", icon: "📋", color: COLORS.green },
  { label: "Verified Sellers", value: "12,450", icon: "✅", color: COLORS.blue },
  { label: "Monthly Buyers", value: "89,000", icon: "👥", color: COLORS.saffron },
  { label: "Counties Covered", value: "47", icon: "📍", color: COLORS.purple },
];

// ─── UTILITY HOOKS ──────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: ${COLORS.white}; color: ${COLORS.ink}; -webkit-font-smoothing: antialiased; }
    .jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
    .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
    .fade-up-2 { transition-delay: 0.1s; }
    .fade-up-3 { transition-delay: 0.2s; }
    .fade-up-4 { transition-delay: 0.3s; }
    .card-hover { transition: box-shadow 0.22s ease, transform 0.22s ease; }
    .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); }
    .btn-primary { background: ${COLORS.green}; color: white; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; border-radius: 10px; transition: background 0.18s, transform 0.18s, box-shadow 0.18s; }
    .btn-primary:hover { background: ${COLORS.greenMid}; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(11,110,79,0.3); }
    .btn-ghost { background: transparent; color: ${COLORS.inkMed}; border: 1.5px solid ${COLORS.border}; cursor: pointer; font-family: 'Inter', sans-serif; font-weight: 500; border-radius: 8px; transition: all 0.18s; }
    .btn-ghost:hover { background: ${COLORS.surface}; border-color: ${COLORS.inkFaint}; }
    .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 100px; letter-spacing: 0.3px; }
    .badge-green { background: ${COLORS.greenLight}; color: ${COLORS.green}; }
    .badge-saffron { background: ${COLORS.saffronLight}; color: ${COLORS.saffronDark}; }
    .badge-red { background: ${COLORS.redLight}; color: ${COLORS.red}; }
    .badge-blue { background: ${COLORS.blueLight}; color: ${COLORS.blue}; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${COLORS.surface}; }
    ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
    input:focus, select:focus, textarea:focus { outline: none; }
    .dot-pattern { background-image: radial-gradient(${COLORS.border} 1px, transparent 1px); background-size: 20px 20px; }
    .verified-ribbon { position: relative; }
    .verified-ribbon::after { content: '✓'; position: absolute; top: 10px; right: -6px; background: ${COLORS.green}; color: white; font-size: 9px; font-weight: 800; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
    .tab-active { color: ${COLORS.green}; border-bottom: 2px solid ${COLORS.green}; }
    .tab-inactive { color: ${COLORS.inkLight}; border-bottom: 2px solid transparent; }
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
    }
    @media (min-width: 769px) {
      .hide-desktop { display: none !important; }
    }
  `}</style>
);

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

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

function Stars({ rating }) {
  return (
    <span style={{ color: COLORS.saffron, fontSize: 13, letterSpacing: -1 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

function VerifiedBadge({ size = "sm" }) {
  const s = size === "sm" ? { fontSize: 10, padding: "2px 6px" } : { fontSize: 12, padding: "3px 9px" };
  return (
    <span className="badge badge-green" style={s}>
      ✓ Verified
    </span>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────────
function Navbar({ view, setView, user, setUser }) {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const elevated = scrollY > 10;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password");
      setLoginLoading(false);
      return;
    }

    setTimeout(() => {
      setUser({
        name: loginEmail.split('@')[0],
        email: loginEmail,
        role: "seller",
        isVerified: true
      });
      setIsLoginOpen(false);
      setLoginEmail("");
      setLoginPassword("");
      setLoginLoading(false);
      setView("dashboard");
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setView("home");
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(255,255,255,0.97)",
        borderBottom: `1px solid ${elevated ? COLORS.border : "transparent"}`,
        backdropFilter: "blur(12px)",
        boxShadow: elevated ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.25s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64, gap: 24 }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenMid})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🇰🇪</div>
            <div>
              <div className="jakarta" style={{ fontSize: 15, fontWeight: 800, color: COLORS.ink, lineHeight: 1 }}>Business Hub</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.green, letterSpacing: 1.5, lineHeight: 1.4 }}>KENYA</div>
            </div>
          </button>

          <div className="hide-mobile" style={{ flex: 1, maxWidth: 480, position: "relative" }}>
            <input placeholder="Search businesses, properties, jobs, vehicles…"
              style={{ width: "100%", padding: "9px 16px 9px 40px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, color: COLORS.ink, background: COLORS.offWhite }}
            />
            <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: COLORS.inkFaint }}>🔍</span>
          </div>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[["Browse", "browse"], ["Sell", "sell"], ["How it Works", "how"]].map(([label, v]) => (
              <button key={v} onClick={() => setView(v)}
                style={{ background: view === v ? COLORS.greenLight : "transparent", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: view === v ? COLORS.green : COLORS.inkMed, transition: "all 0.15s" }}>
                {label}
              </button>
            ))}
          </div>

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
                <button className="btn-ghost hide-mobile" onClick={() => setIsLoginOpen(true)}
                  style={{ padding: "8px 16px", fontSize: 14 }}>Sign In</button>
                <button className="btn-primary" onClick={() => setView("sell")} style={{ padding: "8px 16px", fontSize: 14 }}>Post Free</button>
              </>
            )}

            <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: `1.5px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16 }}>☰</button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", gap: 4 }}>
            {[["🏠 Home", "home"], ["📋 Browse", "browse"], ["💼 Sell", "sell"], ["ℹ️ How it Works", "how"], ["📊 Dashboard", "dashboard"]].map(([label, v]) => (
              <button key={v} onClick={() => { setView(v); setMenuOpen(false); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: COLORS.inkMed, textAlign: "left", background: view === v ? COLORS.greenLight : "transparent" }}>
                {label}
              </button>
            ))}
            {!user && (
              <button onClick={() => { setIsLoginOpen(true); setMenuOpen(false); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: COLORS.inkMed, textAlign: "left" }}>
                🔑 Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      {isLoginOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "20px",
        }} onClick={() => setIsLoginOpen(false)}>
          <div style={{
            background: "white", borderRadius: 24, padding: "40px", maxWidth: 420, width: "100%",
            boxShadow: "0 24px 64px rgba(0,0,0,0.2)", position: "relative",
          }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsLoginOpen(false)}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", fontSize: 20, color: COLORS.inkFaint }}>✕</button>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🇰🇪</div>
              <h2 className="jakarta" style={{ fontSize: 24, fontWeight: 800, color: COLORS.ink }}>Welcome Back</h2>
              <p style={{ fontSize: 14, color: COLORS.inkMed }}>Sign in to access your dashboard</p>
            </div>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>Email</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ width: "100%", padding: "12px 16px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14 }} required />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>Password</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ width: "100%", padding: "12px 16px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14 }} required minLength={8} />
              </div>
              {loginError && (
                <div style={{ padding: "10px 14px", background: COLORS.redLight, color: COLORS.red, borderRadius: 8, fontSize: 13 }}>{loginError}</div>
              )}
              <button type="submit" disabled={loginLoading}
                style={{ width: "100%", padding: "14px", background: COLORS.green, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loginLoading ? "not-allowed" : "pointer", opacity: loginLoading ? 0.7 : 1 }}>
                {loginLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function HeroSection({ setView }) {
  const [ref, inView] = useInView(0.1);
  const [activeLoc, setActiveLoc] = useState(0);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const t = setInterval(() => setActiveLoc(l => (l + 1) % LOCATIONS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, #FFFFFF 0%, ${COLORS.greenLight} 60%, #FFFFFF 100%)`, paddingTop: 120, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
      <div className="dot-pattern" style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", opacity: 0.4 }} />
      <div style={{ position: "absolute", top: 80, right: "8%", width: 200, height: 200, background: `radial-gradient(circle, ${COLORS.saffron}20, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 40, left: "5%", width: 150, height: 150, background: `radial-gradient(circle, ${COLORS.green}15, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        <div style={{ maxWidth: 680 }}>
          <div className={`fade-up ${inView ? "visible" : ""}`} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 20 }}>🇰🇪</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.green, letterSpacing: 0.5 }}>Kenya's #1 Business Marketplace</span>
            <span style={{ padding: "2px 8px", background: COLORS.saffronLight, color: COLORS.saffronDark, borderRadius: 100, fontSize: 11, fontWeight: 700 }}>47 Counties</span>
          </div>

          <h1 className={`jakarta fade-up fade-up-2 ${inView ? "visible" : ""}`} style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800, color: COLORS.ink, lineHeight: 1.12, marginBottom: 20 }}>
            Discover & Grow Your<br />
            Business in{" "}
            <span style={{ color: COLORS.green, position: "relative" }}>
              Kenya
              <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%" }} viewBox="0 0 200 8" fill="none">
                <path d="M0 6 Q100 0 200 6" stroke={COLORS.saffron} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className={`fade-up fade-up-3 ${inView ? "visible" : ""}`} style={{ fontSize: 17, color: COLORS.inkMed, lineHeight: 1.65, marginBottom: 32 }}>
            Post your listing for <strong>KES 100</strong> and reach thousands of buyers across Kenya.
          </p>

          <div className={`fade-up fade-up-4 ${inView ? "visible" : ""}`} style={{ background: "white", border: `1.5px solid ${COLORS.border}`, borderRadius: 14, padding: 8, display: "flex", gap: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", marginBottom: 16 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 8px" }}>
              <span style={{ fontSize: 18 }}>🔍</span>
              <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                placeholder="What are you looking for?"
                style={{ flex: 1, border: "none", background: "none", fontSize: 15, color: COLORS.ink }} />
            </div>
            <div style={{ width: 1, background: COLORS.border, margin: "4px 0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", minWidth: 140 }}>
              <span style={{ fontSize: 16 }}>📍</span>
              <span style={{ fontSize: 14, color: COLORS.inkLight, transition: "color 0.3s" }}>{LOCATIONS[activeLoc]}</span>
            </div>
            <button className="btn-primary" onClick={() => setView("browse")} style={{ padding: "12px 22px", fontSize: 15 }}>Search</button>
          </div>

          <div className={`fade-up fade-up-4 ${inView ? "visible" : ""}`} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.inkFaint, marginRight: 4 }}>Popular:</span>
            {["Land for Sale", "Toyota Vehicles", "Supermarket Jobs", "Web Design", "2BR Apartments"].map(s => (
              <button key={s} onClick={() => setView("browse")}
                style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 100, padding: "5px 12px", fontSize: 12, fontWeight: 500, color: COLORS.inkMed, cursor: "pointer", transition: "all 0.15s" }}
                onMouseOver={e => { e.target.style.background = COLORS.greenLight; e.target.style.borderColor = COLORS.green; e.target.style.color = COLORS.green; }}
                onMouseOut={e => { e.target.style.background = COLORS.surface; e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.inkMed; }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginTop: 56, maxWidth: 680 }}>
          {STATS.map((s, i) => (
            <div key={s.label} className={`fade-up fade-up-${i + 1} ${inView ? "visible" : ""}`}
              style={{ background: "white", borderRadius: 12, padding: "16px 18px", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div className="jakarta" style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: COLORS.inkLight, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORIES ─────────────────────────────────────────────────────────────────
function CategoriesSection({ setView, setFilter }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "64px 0", background: COLORS.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div className={`fade-up ${inView ? "visible" : ""}`} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.green, letterSpacing: 1.5, marginBottom: 8 }}>CATEGORIES</div>
            <h2 className="jakarta" style={{ fontSize: 28, fontWeight: 800, color: COLORS.ink }}>Browse by Category</h2>
          </div>
          <button className="btn-ghost" onClick={() => setView("browse")} style={{ padding: "8px 16px", fontSize: 13 }}>View All →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          {CATEGORIES.map((cat, i) => (
            <button key={cat.id}
              className={`card-hover fade-up fade-up-${Math.min(i % 4 + 1, 4)} ${inView ? "visible" : ""}`}
              onClick={() => { setFilter(cat.id); setView("browse"); }}
              style={{ background: COLORS.white, border: `1.5px solid ${COLORS.border}`, borderRadius: 14, padding: "18px 12px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = COLORS.green; e.currentTarget.style.background = COLORS.greenLight; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.background = COLORS.white; }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.icon}</div>
              <div className="jakarta" style={{ fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>{cat.label}</div>
              <div style={{ fontSize: 11, color: COLORS.inkFaint }}>{cat.count.toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LISTING CARD ──────────────────────────────────────────────────────────────
function ListingCard({ listing, onClick, delay = 0 }) {
  const [ref, inView] = useInView();
  const getBadgeClass = (badge) => {
    if (badge === "Featured") return "badge-saffron";
    if (badge === "Hot") return "badge-red";
    if (badge === "Urgent") return "badge-red";
    if (badge === "New") return "badge-blue";
    return "badge-green";
  };

  return (
    <div ref={ref}
      className={`card-hover fade-up fade-up-${delay % 4 + 1} ${inView ? "visible" : ""}`}
      onClick={onClick}
      style={{ background: COLORS.white, border: `1.5px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div style={{ height: 160, background: `linear-gradient(135deg, ${COLORS.greenLight}, ${COLORS.saffronLight})`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>
        {listing.image}
        {listing.badge && (<div style={{ position: "absolute", top: 12, left: 12 }}><span className={`badge ${getBadgeClass(listing.badge)}`}>{listing.badge}</span></div>)}
        {listing.featured && (<div style={{ position: "absolute", top: 12, right: 12 }}><span style={{ fontSize: 14 }}>⭐</span></div>)}
        <div style={{ position: "absolute", bottom: 10, right: 12 }}><span style={{ fontSize: 11, color: COLORS.inkLight, background: "rgba(255,255,255,0.9)", padding: "2px 7px", borderRadius: 100 }}>👁 {listing.views.toLocaleString()}</span></div>
      </div>

      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span className="badge badge-green" style={{ fontSize: 10 }}>{CATEGORIES.find(c => c.id === listing.category)?.label || listing.category}</span>
          {listing.verified && <VerifiedBadge />}
        </div>
        <h3 className="jakarta" style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 6, lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{listing.title}</h3>
        <p style={{ fontSize: 12, color: COLORS.inkLight, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5 }}>{listing.description}</p>
        <div className="jakarta" style={{ fontSize: 17, fontWeight: 800, color: COLORS.green, marginBottom: 10 }}>{listing.priceLabel}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: COLORS.inkLight }}><span>📍</span> {listing.location}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Stars rating={listing.rating} /><span style={{ fontSize: 11, color: COLORS.inkLight }}>({listing.reviews})</span></div>
        </div>
      </div>

      <div style={{ padding: "10px 18px", borderTop: `1px solid ${COLORS.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar name={listing.seller} size={24} />
          <span style={{ fontSize: 12, color: COLORS.inkMed, fontWeight: 500 }}>{listing.seller}</span>
          {listing.sellerVerified && <span style={{ fontSize: 10 }}>✅</span>}
        </div>
        <span style={{ fontSize: 11, color: COLORS.inkFaint }}>{listing.daysAgo === 0 ? "Today" : `${listing.daysAgo}d ago`}</span>
      </div>
    </div>
  );
}

// ─── FEATURED LISTINGS ─────────────────────────────────────────────────────────
function FeaturedListings({ setView, setListing }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "64px 0", background: COLORS.offWhite }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div className={`fade-up ${inView ? "visible" : ""}`} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.green, letterSpacing: 1.5, marginBottom: 8 }}>TRENDING NOW</div>
            <h2 className="jakarta" style={{ fontSize: 28, fontWeight: 800, color: COLORS.ink }}>Featured Listings</h2>
          </div>
          <button className="btn-ghost" onClick={() => setView("browse")} style={{ padding: "8px 16px", fontSize: 13 }}>View All →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {LISTINGS.slice(0, 8).map((l, i) => (
            <ListingCard key={l.id} listing={l} delay={i}
              onClick={() => { setListing(l); setView("listing"); }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const [ref, inView] = useInView();
  const steps = [
    { icon: "📝", title: "Create an Account", desc: "Sign up free with your email or phone number." },
    { icon: "💳", title: "Pay KES 100 via M-Pesa", desc: "Secure STK Push. Instant payment confirmation." },
    { icon: "📣", title: "Your Listing Goes Live", desc: "Reach thousands of buyers across Kenya." },
    { icon: "🤝", title: "Connect & Close Deals", desc: "Buyers pay KES 50 to unlock your contact details." },
  ];

  return (
    <section ref={ref} style={{ padding: "80px 0", background: COLORS.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div className={`fade-up ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.green, letterSpacing: 1.5, marginBottom: 12 }}>HOW IT WORKS</div>
          <h2 className="jakarta" style={{ fontSize: 32, fontWeight: 800, color: COLORS.ink }}>Start Selling in Minutes</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, position: "relative" }}>
          <div className="hide-mobile" style={{ position: "absolute", top: 40, left: "12%", right: "12%", height: 2, background: `linear-gradient(to right, ${COLORS.green}, ${COLORS.saffron})`, zIndex: 0, opacity: 0.3 }} />
          {steps.map((step, i) => (
            <div key={i} className={`fade-up fade-up-${i + 1} ${inView ? "visible" : ""}`} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 72, height: 72, background: i % 2 === 0 ? COLORS.greenLight : COLORS.saffronLight, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 20px", border: `2px solid ${i % 2 === 0 ? COLORS.green + "30" : COLORS.saffron + "40"}` }}>{step.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.inkFaint, letterSpacing: 1, marginBottom: 8 }}>STEP {i + 1}</div>
              <h3 className="jakarta" style={{ fontSize: 16, fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: COLORS.inkMed, lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRUST BANNER ──────────────────────────────────────────────────────────────
function TrustBanner({ setView }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ padding: "0 0 64px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div className={`fade-up ${inView ? "visible" : ""}`}
          style={{ background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenMid})`, borderRadius: 24, padding: "48px 40px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <div>
            <h2 className="jakarta" style={{ fontSize: 28, fontWeight: 800, color: "white" }}>Ready to Grow Your Business?</h2>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>Join 12,000+ verified sellers on Business Hub Kenya</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setView("sell")} style={{ background: COLORS.saffron, padding: "14px 28px", fontSize: 15, borderRadius: 12 }}>Post a Listing — KES 100</button>
            <button onClick={() => setView("browse")} style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.4)", color: "white", padding: "14px 24px", fontSize: 15, borderRadius: 12, cursor: "pointer", fontWeight: 600 }}>Browse Free →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setView }) {
  return (
    <footer style={{ background: COLORS.ink, color: "rgba(255,255,255,0.7)", padding: "56px 0 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: COLORS.green, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🇰🇪</div>
              <div><div className="jakarta" style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Business Hub Kenya</div><div style={{ fontSize: 10, color: COLORS.green, letterSpacing: 1.5 }}>MARKETPLACE</div></div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 240 }}>Kenya's most trusted marketplace for businesses, properties, vehicles, and opportunities.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>{["📱", "💬", "📘"].map((ico, i) => (<div key={i} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{ico}</div>))}</div>
          </div>
          {[
            { title: "Marketplace", links: ["Browse Listings", "Post a Listing", "How it Works", "Pricing", "Seller Guide"] },
            { title: "Company", links: ["About Us", "Blog", "Press", "Careers", "Contact"] },
            { title: "Support", links: ["Help Center", "Safety Tips", "Report Listing", "Privacy Policy", "Terms of Service"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="jakarta" style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 16 }}>{col.title}</h4>
              {col.links.map(l => (<div key={l} style={{ fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color 0.15s" }} onMouseOver={e => e.target.style.color = "white"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.7)"}>{l}</div>))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 12 }}>
          <span>© 2025 Business Hub Kenya. All rights reserved.</span>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}><span>🔒 Secured by M-Pesa Daraja API</span><span>🛡️ OWASP Compliant</span></div>
        </div>
      </div>
    </footer>
  );
}

// ─── BROWSE PAGE ──────────────────────────────────────────────────────────────
function BrowsePage({ setView, setListing, filter, setFilter }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [sort, setSort] = useState("recent");

  const filtered = LISTINGS.filter(l => {
    const matchCat = !filter || l.category === filter;
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase());
    const matchLoc = location === "All Locations" || l.location.includes(location);
    return matchCat && matchSearch && matchLoc;
  });

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: COLORS.offWhite }}>
      <div style={{ background: "white", borderBottom: `1px solid ${COLORS.border}`, padding: "16px 0", position: "sticky", top: 64, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings…"
              style={{ width: "100%", padding: "9px 12px 9px 38px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14 }} />
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>🔍</span>
          </div>
          <select value={filter || ""} onChange={e => setFilter(e.target.value || null)}
            style={{ padding: "9px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, background: "white", color: COLORS.ink, cursor: "pointer" }}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <select value={location} onChange={e => setLocation(e.target.value)}
            style={{ padding: "9px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, background: "white", color: COLORS.ink, cursor: "pointer" }}>
            <option>All Locations</option>
            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ padding: "9px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, background: "white", color: COLORS.ink, cursor: "pointer" }}>
            <option value="recent">Most Recent</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="popular">Most Popular</option>
          </select>
          {filter && (<button className="btn-ghost" onClick={() => setFilter(null)} style={{ padding: "8px 14px", fontSize: 13 }}>Clear ✕</button>)}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ marginBottom: 16, fontSize: 14, color: COLORS.inkMed }}>Showing <strong>{filtered.length}</strong> listings</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setFilter(filter === cat.id ? null : cat.id)}
              style={{ padding: "6px 14px", borderRadius: 100, border: `1.5px solid ${filter === cat.id ? COLORS.green : COLORS.border}`, background: filter === cat.id ? COLORS.greenLight : "white", color: filter === cat.id ? COLORS.green : COLORS.inkMed, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {filtered.map((l, i) => (
              <ListingCard key={l.id} listing={l} delay={i} onClick={() => { setListing(l); setView("listing"); }} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 20px", color: COLORS.inkLight }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 className="jakarta" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.ink }}>No listings found</h3>
            <button className="btn-primary" onClick={() => { setSearch(""); setFilter(null); }} style={{ margin: "20px auto 0", padding: "10px 20px", fontSize: 14 }}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LISTING DETAIL PAGE ──────────────────────────────────────────────────────
function ListingDetailPage({ listing, setView, user }) {
  const [unlocked, setUnlocked] = useState(false);
  const [payStep, setPayStep] = useState(null);
  const [phone, setPhone] = useState("+254");
  const [saved, setSaved] = useState(false);

  if (!listing) { setView("browse"); return null; }

  const handleUnlock = () => {
    if (!user) { setView("home"); return; }
    setPayStep("prompt");
  };

  const handlePay = () => {
    setPayStep("processing");
    setTimeout(() => { setPayStep("done"); setUnlocked(true); }, 3000);
  };

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: COLORS.offWhite }}>
      <div style={{ background: "white", borderBottom: `1px solid ${COLORS.border}`, padding: "12px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", fontSize: 13, color: COLORS.inkLight }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.green, fontWeight: 500 }}>Home</button>
          <span style={{ margin: "0 8px" }}>›</span>
          <button onClick={() => setView("browse")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.green, fontWeight: 500 }}>Browse</button>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>{listing.title}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 28, alignItems: "start" }}>
        <div>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.greenLight}, ${COLORS.saffronLight})`, borderRadius: 20, height: 300, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 96, marginBottom: 24, border: `1px solid ${COLORS.border}` }}>{listing.image}</div>

          <div style={{ background: "white", borderRadius: 16, padding: 24, marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
              <span className="badge badge-green">{CATEGORIES.find(c => c.id === listing.category)?.label}</span>
              {listing.verified && <VerifiedBadge size="md" />}
              {listing.badge && <span className={`badge badge-${listing.badge === "Hot" ? "red" : "saffron"}`}>{listing.badge}</span>}
            </div>
            <h1 className="jakarta" style={{ fontSize: 26, fontWeight: 800, color: COLORS.ink, marginBottom: 10 }}>{listing.title}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: COLORS.inkMed }}><span>📍</span> {listing.location}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: COLORS.inkMed }}><Stars rating={listing.rating} /><span>{listing.rating} ({listing.reviews} reviews)</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: COLORS.inkMed }}><span>👁</span> {listing.views.toLocaleString()} views</div>
              <div style={{ fontSize: 14, color: COLORS.inkFaint }}>Posted {listing.daysAgo === 0 ? "today" : `${listing.daysAgo} days ago`}</div>
            </div>
            <div className="jakarta" style={{ fontSize: 30, fontWeight: 800, color: COLORS.green }}>{listing.priceLabel}</div>
          </div>

          <div style={{ background: "white", borderRadius: 16, padding: 24, marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
            <h2 className="jakarta" style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Description</h2>
            <p style={{ fontSize: 15, color: COLORS.inkMed, lineHeight: 1.75 }}>{listing.description}</p>
            {listing.tags && (<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>{listing.tags.map(t => (<span key={t} style={{ padding: "5px 12px", background: COLORS.surface, borderRadius: 100, fontSize: 12, fontWeight: 500, color: COLORS.inkMed, border: `1px solid ${COLORS.border}` }}>✓ {t}</span>))}</div>)}
          </div>

          <div style={{ background: COLORS.saffronLight, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.saffron}30` }}>
            <h3 className="jakarta" style={{ fontSize: 15, fontWeight: 700, color: COLORS.saffronDark, marginBottom: 10 }}>🛡️ Safety Tips</h3>
            <ul style={{ paddingLeft: 16, fontSize: 13, color: COLORS.inkMed, lineHeight: 2 }}>
              <li>Always meet in a public, safe location</li>
              <li>Verify the seller's identity before payment</li>
              <li>Never send money in advance without verification</li>
              <li>Report suspicious listings immediately</li>
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 90 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}` }}>
            <h3 className="jakarta" style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>About the Seller</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="verified-ribbon"><Avatar name={listing.seller} size={48} /></div>
              <div><div className="jakarta" style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink }}>{listing.seller}</div>{listing.sellerVerified && <VerifiedBadge size="md" />}<div style={{ fontSize: 12, color: COLORS.inkFaint, marginTop: 4 }}>Member since 2023</div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[["24 Listings", "📋"], ["4.8 Rating", "⭐"], ["98% Response", "⚡"], ["2hr Reply", "🕐"]].map(([label, icon]) => (<div key={label} style={{ background: COLORS.surface, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}><div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div><div style={{ fontSize: 11, fontWeight: 600, color: COLORS.inkMed }}>{label}</div></div>))}
            </div>

            {!unlocked ? (
              <div>
                <div style={{ background: COLORS.surface, borderRadius: 12, padding: 16, marginBottom: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
                  <div className="jakarta" style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, marginBottom: 6 }}>Seller Contact Hidden</div>
                  <div style={{ fontSize: 12, color: COLORS.inkMed, lineHeight: 1.6 }}>Pay <strong style={{ color: COLORS.green }}>KES 50</strong> via M-Pesa to unlock contact. Access lasts 7 days.</div>
                </div>
                <button className="btn-primary" onClick={handleUnlock} style={{ width: "100%", padding: "14px", fontSize: 15 }}>🔓 Unlock Contact — KES 50</button>
              </div>
            ) : (
              <div>
                <div style={{ background: COLORS.greenLight, borderRadius: 12, padding: 16, marginBottom: 14, border: `1px solid ${COLORS.green}30` }}>
                  <div className="jakarta" style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, marginBottom: 12 }}>✅ Contact Unlocked (expires in 7 days)</div>
                  {[["📞", "Phone", "+254 712 345 678"], ["💬", "WhatsApp", "+254 712 345 678"], ["📧", "Email", "seller@example.co.ke"], ["📍", "Location", listing.location]].map(([icon, label, val]) => (<div key={label} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13 }}><span>{icon}</span><div><div style={{ fontWeight: 600, color: COLORS.inkMed, fontSize: 11, marginBottom: 2 }}>{label}</div><div style={{ color: COLORS.ink }}>{val}</div></div></div>))}
                </div>
                <button style={{ width: "100%", padding: "13px", background: "#25D366", border: "none", borderRadius: 10, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>💬 Message on WhatsApp</button>
              </div>
            )}
          </div>

          <button className={saved ? "btn-outline" : "btn-ghost"} onClick={() => setSaved(!saved)} style={{ width: "100%", padding: "12px", fontSize: 14 }}>{saved ? "❤️ Saved" : "🤍 Save Listing"}</button>
          <button className="btn-ghost" style={{ width: "100%", padding: "12px", fontSize: 14 }}>🚩 Report Listing</button>
        </div>
      </div>

      {payStep && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 32, maxWidth: 400, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            {payStep === "prompt" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 24 }}><div style={{ fontSize: 48, marginBottom: 12 }}>📱</div><h3 className="jakarta" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Pay via M-Pesa</h3><p style={{ fontSize: 14, color: COLORS.inkMed }}>Enter your M-Pesa number to unlock seller contacts for <strong>KES 50</strong></p></div>
                <div style={{ marginBottom: 20 }}><label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>M-Pesa Phone Number</label><input value={phone} onChange={e => setPhone(e.target.value)} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 15, color: COLORS.ink }} /></div>
                <div style={{ background: COLORS.greenLight, borderRadius: 10, padding: 12, marginBottom: 20, fontSize: 13, color: COLORS.green }}>✓ You'll receive an STK Push on {phone}. Enter your M-Pesa PIN to complete.</div>
                <button className="btn-primary" onClick={handlePay} style={{ width: "100%", padding: "14px", fontSize: 15 }}>Send STK Push — KES 50</button>
                <button onClick={() => setPayStep(null)} style={{ width: "100%", padding: "12px", marginTop: 10, background: "none", border: "none", cursor: "pointer", fontSize: 14, color: COLORS.inkLight }}>Cancel</button>
              </>
            )}
            {payStep === "processing" && (
              <div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div><h3 className="jakarta" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Awaiting M-Pesa Payment</h3><p style={{ fontSize: 14, color: COLORS.inkMed, marginBottom: 20 }}>Check your phone for the M-Pesa PIN prompt.</p><div style={{ height: 4, background: COLORS.surface, borderRadius: 2, overflow: "hidden" }}><div style={{ height: "100%", background: COLORS.green, borderRadius: 2, animation: "skeleton-load 1.5s infinite" }} /></div></div>
            )}
            {payStep === "done" && (
              <div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ width: 64, height: 64, background: COLORS.greenLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✅</div><h3 className="jakarta" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: COLORS.green }}>Payment Confirmed!</h3><p style={{ fontSize: 14, color: COLORS.inkMed, marginBottom: 24 }}>KES 50 received. Seller contact unlocked for 7 days.</p><button className="btn-primary" onClick={() => setPayStep(null)} style={{ width: "100%", padding: "14px", fontSize: 15 }}>View Contact Details</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SELL PAGE ─────────────────────────────────────────────────────────────────
function SellPage({ user, setUser, setView }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: "", category: "", location: "", price: "", description: "", phone: "" });
  const [payStep, setPayStep] = useState(null);
  const [mpesa, setMpesa] = useState("+254");

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!user) { setUser({ name: "Hillary Kamau", email: "hillary@tiziantech.co.ke", role: "seller" }); }
    setPayStep("prompt");
  };

  const handlePay = () => {
    setPayStep("processing");
    setTimeout(() => { setPayStep("done"); }, 3000);
  };

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: COLORS.offWhite }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px" }}>
        <h1 className="jakarta" style={{ fontSize: 28, fontWeight: 800, color: COLORS.ink, marginBottom: 8 }}>Post a Listing</h1>
        <p style={{ color: COLORS.inkMed, fontSize: 15 }}>Reach thousands of buyers across Kenya for only KES 100</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 32, alignItems: "center" }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, flex: s < 3 ? 1 : 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: step >= s ? COLORS.green : COLORS.surface, border: `2px solid ${step >= s ? COLORS.green : COLORS.border}`, color: step >= s ? "white" : COLORS.inkFaint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{step > s ? "✓" : s}</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: step >= s ? COLORS.green : COLORS.inkFaint }}>{["Listing Details", "Contact Info", "Payment"][s - 1]}</span>
              {s < 3 && <div style={{ flex: 1, height: 2, background: step > s ? COLORS.green : COLORS.border, borderRadius: 1 }} />}
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: 20, padding: 32, border: `1px solid ${COLORS.border}` }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 className="jakarta" style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Listing Details</h2>
              {[{ label: "Listing Title *", key: "title", placeholder: "e.g. Toyota Land Cruiser V8 2019", type: "text" },
                { label: "Description *", key: "description", placeholder: "Describe what you're selling in detail…", type: "textarea" },
                { label: "Price (KES) *", key: "price", placeholder: "e.g. 1500000", type: "number" }].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>{field.label}</label>
                  {field.type === "textarea" ? (<textarea value={form[field.key]} onChange={e => update(field.key, e.target.value)} placeholder={field.placeholder} rows={4} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, resize: "vertical", color: COLORS.ink }} />) : (<input type={field.type} value={form[field.key]} onChange={e => update(field.key, e.target.value)} placeholder={field.placeholder} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, color: COLORS.ink }} />)}
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div><label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>Category *</label><select value={form.category} onChange={e => update("category", e.target.value)} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, background: "white", color: COLORS.ink }}><option value="">Select category</option>{CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
                <div><label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>Location *</label><select value={form.location} onChange={e => update("location", e.target.value)} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, background: "white", color: COLORS.ink }}><option value="">Select location</option>{LOCATIONS.map(l => <option key={l}>{l}</option>)}</select></div>
              </div>
              <div><label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>Photos & Videos</label><div style={{ border: `2px dashed ${COLORS.border}`, borderRadius: 12, padding: "32px 20px", textAlign: "center", cursor: "pointer", background: COLORS.offWhite }}><div style={{ fontSize: 32, marginBottom: 8 }}>📸</div><div className="jakarta" style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 4 }}>Drop files or click to upload</div><div style={{ fontSize: 12, color: COLORS.inkFaint }}>PNG, JPG, MP4 up to 10MB each</div></div></div>
              <button className="btn-primary" onClick={() => setStep(2)} style={{ padding: "14px", fontSize: 15, marginTop: 8 }}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 className="jakarta" style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Contact Information</h2>
              <p style={{ fontSize: 13, color: COLORS.inkMed, padding: "12px 14px", background: COLORS.blueLight, borderRadius: 10 }}>ℹ️ Your contact details are hidden by default. Buyers pay KES 50 to unlock them.</p>
              {[{ label: "Phone Number (M-Pesa verified)", key: "phone", placeholder: "+254 7XX XXX XXX" },
                { label: "WhatsApp Number", key: "whatsapp", placeholder: "+254 7XX XXX XXX" },
                { label: "Email Address", key: "email", placeholder: "you@example.com" },
                { label: "Business Name (optional)", key: "business", placeholder: "e.g. Nairobi Motors Ltd" }].map(f => (
                <div key={f.key}><label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>{f.label}</label><input placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 14, color: COLORS.ink }} /></div>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}><button className="btn-ghost" onClick={() => setStep(1)} style={{ flex: 1, padding: "12px" }}>← Back</button><button className="btn-primary" onClick={() => setStep(3)} style={{ flex: 2, padding: "14px", fontSize: 15 }}>Review Listing →</button></div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="jakarta" style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Review & Pay</h2>
              <div style={{ background: COLORS.offWhite, borderRadius: 12, padding: 18, marginBottom: 20 }}>
                <h3 className="jakarta" style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{form.title || "Your Listing Title"}</h3>
                <p style={{ fontSize: 13, color: COLORS.inkMed, marginBottom: 10 }}>{form.description || "Description will appear here…"}</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13 }}><span>📍 {form.location || "Location"}</span><span>📂 {CATEGORIES.find(c => c.id === form.category)?.label || "Category"}</span><span>💰 KES {form.price ? parseInt(form.price).toLocaleString() : "Price"}</span></div>
              </div>

              <div style={{ background: "white", border: `1.5px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 18px", borderBottom: `1px solid ${COLORS.border}` }}><span style={{ fontSize: 14, color: COLORS.inkMed }}>Listing publication fee</span><span className="jakarta" style={{ fontWeight: 700, color: COLORS.ink }}>KES 100</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 18px" }}><span className="jakarta" style={{ fontWeight: 700, fontSize: 16 }}>Total</span><span className="jakarta" style={{ fontWeight: 800, fontSize: 18, color: COLORS.green }}>KES 100</span></div>
              </div>

              <div style={{ background: COLORS.greenLight, borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, color: COLORS.inkMed }}>✅ Your listing will go live immediately after payment confirmation via M-Pesa STK Push</div>

              <div style={{ display: "flex", gap: 12 }}><button className="btn-ghost" onClick={() => setStep(2)} style={{ flex: 1, padding: "12px" }}>← Back</button><button className="btn-primary" onClick={handleSubmit} style={{ flex: 2, padding: "14px", fontSize: 15 }}>📱 Pay KES 100 via M-Pesa</button></div>
            </div>
          )}
        </div>
      </div>

      {payStep && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 32, maxWidth: 400, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            {payStep === "prompt" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 24 }}><div style={{ width: 64, height: 64, background: COLORS.greenLight, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px" }}>📱</div><h3 className="jakarta" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Pay with M-Pesa</h3><p style={{ fontSize: 14, color: COLORS.inkMed }}>Enter your M-Pesa number for the STK Push</p></div>
                <div style={{ marginBottom: 20 }}><label style={{ fontSize: 13, fontWeight: 600, color: COLORS.inkMed, display: "block", marginBottom: 6 }}>Phone Number</label><input value={mpesa} onChange={e => setMpesa(e.target.value)} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, fontSize: 15, color: COLORS.ink }} /></div>
                <button className="btn-primary" onClick={handlePay} style={{ width: "100%", padding: "14px", fontSize: 15, marginBottom: 10 }}>Send KES 100 STK Push</button>
                <button onClick={() => setPayStep(null)} style={{ width: "100%", padding: "10px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: COLORS.inkLight }}>Cancel</button>
              </>
            )}
            {payStep === "processing" && (
              <div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div><h3 className="jakarta" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>STK Push Sent</h3><p style={{ fontSize: 14, color: COLORS.inkMed, marginBottom: 24 }}>Enter your M-Pesa PIN on {mpesa} to complete payment…</p><div style={{ height: 4, background: COLORS.surface, borderRadius: 2, overflow: "hidden" }}><div style={{ height: "100%", background: COLORS.green, borderRadius: 2, animation: "skeleton-load 1.5s infinite" }} /></div></div>
            )}
            {payStep === "done" && (
              <div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ width: 72, height: 72, background: COLORS.greenLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 16px" }}>🎉</div><h3 className="jakarta" style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: COLORS.green }}>Listing Published!</h3><p style={{ fontSize: 14, color: COLORS.inkMed, marginBottom: 8 }}>KES 100 received. Your listing is now live!</p><button className="btn-primary" onClick={() => { setPayStep(null); setView("dashboard"); }} style={{ width: "100%", padding: "14px", fontSize: 15, marginBottom: 10 }}>Go to Dashboard</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD PAGE ────────────────────────────────────────────────────────────
function DashboardPage({ user, setView }) {
  const [activeTab, setActiveTab] = useState("overview");
  if (!user) { return <div style={{ paddingTop: 120, textAlign: "center" }}><button className="btn-primary" onClick={() => setView("home")} style={{ padding: "12px 24px" }}>Sign In to View Dashboard</button></div>; }

  const tabs = [{ id: "overview", label: "📊 Overview" }, { id: "listings", label: "📋 My Listings" }, { id: "contacts", label: "🔓 Contacts Unlocked" }, { id: "payments", label: "💳 Payments" }, { id: "analytics", label: "📈 Analytics" }, { id: "profile", label: "👤 Profile" }];
  const mockListings = LISTINGS.slice(0, 3).map(l => ({ ...l, status: "active" }));

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: COLORS.offWhite }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}><Avatar name={user.name} size={48} /><div><div className="jakarta" style={{ fontSize: 20, fontWeight: 800, color: COLORS.ink }}>Welcome, {user.name.split(" ")[0]}</div><div style={{ fontSize: 13, color: COLORS.inkMed }}>{user.email} · <VerifiedBadge /></div></div></div>
          <button className="btn-primary" onClick={() => setView("sell")} style={{ padding: "10px 20px", fontSize: 14 }}>+ New Listing</button>
        </div>

        <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${COLORS.border}`, marginBottom: 28, overflowX: "auto" }}>{tabs.map(t => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={activeTab === t.id ? "tab-active" : "tab-inactive"} style={{ padding: "10px 18px", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", transition: "all 0.15s" }}>{t.label}</button>))}</div>

        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
              {[{ label: "Active Listings", value: "3", icon: "📋", color: COLORS.green, bg: COLORS.greenLight }, { label: "Total Views", value: "6,037", icon: "👁", color: COLORS.blue, bg: COLORS.blueLight }, { label: "Contacts Unlocked", value: "48", icon: "🔓", color: COLORS.saffron, bg: COLORS.saffronLight }, { label: "Revenue Earned", value: "KES 2,400", icon: "💰", color: COLORS.purple, bg: COLORS.purpleLight }].map(s => (<div key={s.label} style={{ background: "white", borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}` }}><div style={{ width: 40, height: 40, background: s.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 12 }}>{s.icon}</div><div className="jakarta" style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div><div style={{ fontSize: 12, color: COLORS.inkMed, fontWeight: 500, marginTop: 4 }}>{s.label}</div></div>))}
            </div>

            <div style={{ background: "white", borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
              <h3 className="jakarta" style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent Activity</h3>
              {[{ icon: "🔓", text: "A buyer unlocked your contact from 'Supermarket – Westlands'", time: "2 min ago", color: COLORS.green }, { icon: "👁", text: "Your listing 'Toyota Land Cruiser' received 12 new views", time: "1 hr ago", color: COLORS.blue }, { icon: "💳", text: "Payment received: KES 50 (contact unlock)", time: "3 hr ago", color: COLORS.saffron }, { icon: "⭐", text: "New review posted on your profile — 5 stars", time: "Yesterday", color: COLORS.purple }].map((a, i) => (<div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: i < 3 ? `1px solid ${COLORS.borderLight}` : "none" }}><div style={{ width: 36, height: 36, background: a.color + "15", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{a.icon}</div><div style={{ flex: 1 }}><div style={{ fontSize: 13, color: COLORS.ink }}>{a.text}</div><div style={{ fontSize: 11, color: COLORS.inkFaint, marginTop: 2 }}>{a.time}</div></div></div>))}
            </div>
          </div>
        )}

        {activeTab === "listings" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h3 className="jakarta" style={{ fontSize: 18, fontWeight: 700 }}>My Listings</h3><button className="btn-primary" onClick={() => setView("sell")} style={{ padding: "9px 18px", fontSize: 13 }}>+ New Listing</button></div>
            {mockListings.map(l => (<div key={l.id} style={{ background: "white", borderRadius: 14, padding: "16px 20px", border: `1px solid ${COLORS.border}`, marginBottom: 12, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}><div style={{ fontSize: 36 }}>{l.image}</div><div style={{ flex: 1, minWidth: 200 }}><div className="jakarta" style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{l.title}</div><div style={{ display: "flex", gap: 12, fontSize: 12, color: COLORS.inkLight }}><span>👁 {l.views.toLocaleString()} views</span><span>📍 {l.location}</span><span className="badge badge-green">Active</span></div></div><div className="jakarta" style={{ fontSize: 16, fontWeight: 800, color: COLORS.green }}>{l.priceLabel}</div><div style={{ display: "flex", gap: 8 }}><button className="btn-ghost" style={{ padding: "7px 14px", fontSize: 12 }}>Edit</button><button className="btn-ghost" style={{ padding: "7px 14px", fontSize: 12, color: COLORS.red }}>Delete</button></div></div>))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
function AdminDashboard({ setView }) {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [{ id: "overview", label: "📊 Overview" }, { id: "listings", label: "📋 Listings" }, { id: "users", label: "👥 Users" }, { id: "payments", label: "💳 Revenue" }, { id: "moderation", label: "🛡️ Moderation" }];

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: COLORS.offWhite }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div><h1 className="jakarta" style={{ fontSize: 24, fontWeight: 800, color: COLORS.ink }}>Admin Dashboard</h1><p style={{ fontSize: 13, color: COLORS.inkMed }}>Business Hub Kenya — Control Center</p></div>
          <span className="badge badge-red" style={{ fontSize: 12, padding: "6px 12px" }}>⚠️ 3 Listings Pending Review</span>
        </div>

        <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${COLORS.border}`, marginBottom: 28, overflowX: "auto" }}>{tabs.map(t => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={activeTab === t.id ? "tab-active" : "tab-inactive"} style={{ padding: "10px 18px", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap" }}>{t.label}</button>))}</div>

        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
              {[{ label: "Total Users", value: "12,891", icon: "👥", color: COLORS.blue }, { label: "Active Listings", value: "47,280", icon: "📋", color: COLORS.green }, { label: "Revenue (This Month)", value: "KES 4.7M", icon: "💰", color: COLORS.saffron }, { label: "Pending Moderation", value: "3", icon: "⚠️", color: COLORS.red }, { label: "Contact Unlocks", value: "8,930", icon: "🔓", color: COLORS.purple }, { label: "Fraud Flags", value: "12", icon: "🚩", color: COLORS.red }].map(s => (<div key={s.label} style={{ background: "white", borderRadius: 16, padding: 18, border: `1px solid ${COLORS.border}` }}><div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div><div className="jakarta" style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div><div style={{ fontSize: 11, color: COLORS.inkMed, fontWeight: 500, marginTop: 3 }}>{s.label}</div></div>))}
            </div>

            <div style={{ background: "white", borderRadius: 16, padding: 24, border: `1px solid ${COLORS.border}` }}>
              <h3 className="jakarta" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Monthly Revenue Breakdown</h3>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 120 }}>{[["Jan", 280], ["Feb", 320], ["Mar", 410], ["Apr", 380], ["May", 460], ["Jun", 470]].map(([m, v]) => (<div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}><span style={{ fontSize: 11, color: COLORS.inkMed, fontWeight: 600 }}>{(v * 10000).toLocaleString()}</span><div style={{ width: "100%", height: `${(v / 470) * 100}px`, background: `linear-gradient(to top, ${COLORS.green}, ${COLORS.greenMid})`, borderRadius: "6px 6px 0 0", minHeight: 8 }} /><span style={{ fontSize: 11, color: COLORS.inkFaint }}>{m}</span></div>))}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [view, setView] = useState("home");
  const [filter, setFilter] = useState(null);
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch (e) { localStorage.removeItem('user'); }
    }
  }, []);

  const renderPage = () => {
    switch(view) {
      case "home": return (<><HeroSection setView={setView} /><CategoriesSection setView={setView} setFilter={setFilter} /><FeaturedListings setView={setView} setListing={setListing} /><HowItWorks /><TrustBanner setView={setView} /></>);
      case "browse": return <BrowsePage setView={setView} setListing={setListing} filter={filter} setFilter={setFilter} />;
      case "listing": return <ListingDetailPage listing={listing} setView={setView} user={user} />;
      case "sell": return <SellPage user={user} setUser={setUser} setView={setView} />;
      case "dashboard": return <DashboardPage user={user} setView={setView} />;
      case "admin": return <AdminDashboard setView={setView} />;
      default: return <div>Page not found</div>;
    }
  };

  return (
    <div style={{ background: COLORS.white, minHeight: "100vh" }}>
      <GlobalStyles />
      <Navbar view={view} setView={setView} user={user} setUser={setUser} />
      <main style={{ paddingTop: 64 }}>{renderPage()}</main>
      <Footer setView={setView} />
    </div>
  );
}
