'use client';

import { DashboardPage } from '../pages/DashboardPage';
import { Navbar } from '../components/Navbar';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');

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

  return (
    <>
      <Navbar view={view} setView={setView} user={user} setUser={setUser} />
      <DashboardPage user={user} setView={setView} />
    </>
  );
}
