// ─── DATA ────────────────────────────────────────────────────────────────────
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

const LISTINGS = [
  { id: 1, category: "businesses", title: "Established Supermarket – Westlands", priceLabel: "KES 4.5M", location: "Westlands, Nairobi", description: "Profitable supermarket with 8 years of operation.", image: "🏪", verified: true, featured: true, views: 1842, rating: 4.8, reviews: 23, seller: "James Mwangi", daysAgo: 2, badge: "Featured", tags: ["Turnkey", "Profitable"] },
  { id: 2, category: "properties", title: "3BR Apartment – Kilimani", priceLabel: "KES 8.5M", location: "Kilimani, Nairobi", description: "Modern 3-bedroom apartment, 120sqm, fully fitted kitchen.", image: "🏢", verified: true, featured: true, views: 3201, rating: 4.9, reviews: 41, seller: "Nairobi Realty Group", daysAgo: 1, badge: "Hot", tags: ["En-suite", "Parking"] },
  { id: 3, category: "vehicles", title: "Toyota Land Cruiser V8 2019", priceLabel: "KES 6.2M", location: "Karen, Nairobi", description: "Single owner, full service history, locally used.", image: "🚙", verified: true, featured: false, views: 892, rating: 4.7, reviews: 12, seller: "AutoKe Premium", daysAgo: 3, badge: null, tags: ["Single Owner", "Full History"] },
  { id: 4, category: "jobs", title: "Senior Software Engineer – Fintech", priceLabel: "KES 350K/mo", location: "CBD, Nairobi", description: "Leading fintech company seeking Senior Software Engineer.", image: "💻", verified: true, featured: true, views: 2145, rating: 5.0, reviews: 8, seller: "PesaPulse Kenya", daysAgo: 0, badge: "Urgent", tags: ["Remote OK", "Equity"] },
  { id: 5, category: "services", title: "Professional Web Design & Development", priceLabel: "From KES 25K", location: "Nairobi (Remote)", description: "Premium websites, e-commerce stores, and web apps.", image: "🎨", verified: true, featured: false, views: 674, rating: 4.6, reviews: 89, seller: "TizianTech Edge", daysAgo: 5, badge: null, tags: ["E-commerce", "SEO"] },
  { id: 6, category: "electronics", title: "iPhone 15 Pro Max 256GB – New", priceLabel: "KES 189K", location: "CBD, Nairobi", description: "Brand new, sealed in box. Natural Titanium.", image: "📱", verified: true, featured: false, views: 4523, rating: 4.5, reviews: 156, seller: "iStore Kenya", daysAgo: 1, badge: "New", tags: ["Sealed", "Warranty"] },
  { id: 7, category: "agriculture", title: "2-Acre Farm – Limuru (Title Deed Ready)", priceLabel: "KES 1.8M", location: "Limuru, Kiambu", description: "2-acre fertile farm land, red soil, good rainfall.", image: "🌱", verified: true, featured: false, views: 1203, rating: 4.9, reviews: 7, seller: "Kiambu Land Agency", daysAgo: 7, badge: null, tags: ["Title Deed", "Fertile"] },
  { id: 8, category: "fashion", title: "Boutique Stock – Ladies Fashion (Bulk)", priceLabel: "KES 45K/lot", location: "Eastleigh, Nairobi", description: "Wholesale ladies dresses, tops, and skirts. 200 pieces per lot.", image: "👗", verified: false, featured: false, views: 341, rating: 4.2, reviews: 34, seller: "Eastleigh Fashions", daysAgo: 4, badge: null, tags: ["Wholesale", "Turkish"] },
];

// ─── MOBILE MENU ────────────────────────────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
}

// ─── LOCATION ROTATOR ────────────────────────────────────────────────────────
const LOCATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", "Garissa", "Nyeri"];
let locationIndex = 0;

if (document.getElementById('locationDisplay')) {
  setInterval(() => {
    locationIndex = (locationIndex + 1) % LOCATIONS.length;
    document.getElementById('locationDisplay').textContent = LOCATIONS[locationIndex];
  }, 2000);
}

// ─── RENDER CATEGORIES ──────────────────────────────────────────────────────
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="location.href='browse.html?category=${cat.id}'">
      <div class="icon">${cat.icon}</div>
      <div class="name">${cat.label}</div>
      <div class="count">${cat.count.toLocaleString()}</div>
    </div>
  `).join('');
}

// ─── RENDER LISTINGS ──────────────────────────────────────────────────────
function renderListings() {
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;

  const featured = LISTINGS.filter(l => l.featured).slice(0, 8);

  grid.innerHTML = featured.map(l => {
    const stars = '★'.repeat(Math.round(l.rating)) + '☆'.repeat(5 - Math.round(l.rating));
    const badgeHtml = l.badge ? `<span class="badge ${getBadgeClass(l.badge)}">${l.badge}</span>` : '';
    const verifiedHtml = l.verified ? `<span class="badge badge-green">✓ Verified</span>` : '';
    const daysText = l.daysAgo === 0 ? 'Today' : `${l.daysAgo}d ago`;

    return `
      <div class="listing-card" onclick="location.href='listing.html?id=${l.id}'">
        <div class="listing-image">
          ${l.image}
          ${badgeHtml}
          ${l.featured ? '<div class="featured-star">⭐</div>' : ''}
          <div class="view-count">👁 ${l.views.toLocaleString()}</div>
        </div>
        <div class="listing-body">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
            <span class="badge badge-green" style="font-size:10px;">${CATEGORIES.find(c => c.id === l.category)?.label || l.category}</span>
            ${verifiedHtml}
          </div>
          <h3>${l.title}</h3>
          <div class="desc">${l.description}</div>
          <div class="price">${l.priceLabel}</div>
          <div class="meta">
            <span>📍 ${l.location}</span>
            <div>
              <span class="stars">${stars}</span>
              <span>(${l.reviews})</span>
            </div>
          </div>
        </div>
        <div class="listing-footer">
          <div class="seller">
            <div class="avatar">${l.seller.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</div>
            <span>${l.seller}</span>
          </div>
          <span class="days">${daysText}</span>
        </div>
      </div>
    `;
  }).join('');
}

function getBadgeClass(badge) {
  const map = { 'Featured': 'badge-saffron', 'Hot': 'badge-red', 'Urgent': 'badge-red', 'New': 'badge-blue' };
  return map[badge] || 'badge-green';
}

// ─── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderListings();
});
