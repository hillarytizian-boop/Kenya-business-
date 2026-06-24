'use client';

import { AdminDashboard } from '../../components/AdminDashboard';
import { Navbar } from '../../components/Navbar';
import { useState } from 'react';

export default function AdminPage() {
  const [view, setView] = useState('admin');
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar 
        view={view} 
        setView={setView} 
        user={user} 
        setUser={setUser}
      />
      <div style={{ paddingTop: 64 }}>
        <AdminDashboard setView={setView} />
      </div>
    </>
  );
}
