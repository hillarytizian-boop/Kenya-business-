'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { FeaturedListings } from '../components/FeaturedListings';
import { HowItWorks } from '../components/HowItWorks';
import { TrustBanner } from '../components/TrustBanner';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';

export default function Home() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoginOpen(false);
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar 
        view={view} 
        setView={setView} 
        user={user} 
        setUser={setUser}
        onLoginOpen={() => setIsLoginOpen(true)}
      />
      
      <main style={{ paddingTop: 64 }}>
        <HeroSection setView={setView} />
        <CategoriesSection setView={setView} setFilter={() => {}} />
        <FeaturedListings setView={setView} setListing={() => {}} />
        <HowItWorks />
        <TrustBanner setView={setView} />
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
