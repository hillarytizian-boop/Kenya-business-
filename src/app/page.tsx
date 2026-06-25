'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { FeaturedListings } from '../components/FeaturedListings';
import { HowItWorks } from '../components/HowItWorks';
import { TrustBanner } from '../components/TrustBanner';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';

export default function Home() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
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

  const handleLogin = (userData: any) => {
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
