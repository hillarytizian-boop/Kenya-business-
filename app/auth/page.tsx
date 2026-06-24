'use client';

import { LoginModal } from '../components/LoginModal';
import { useState } from 'react';

export default function AuthPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogin = (userData: any) => {
    localStorage.setItem('user', JSON.stringify(userData));
    window.location.href = '/dashboard';
  };

  return (
    <LoginModal 
      isOpen={isOpen} 
      onClose={() => window.location.href = '/'} 
      onLogin={handleLogin} 
    />
  );
}
