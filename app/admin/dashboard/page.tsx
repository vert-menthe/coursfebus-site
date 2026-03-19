'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };
  
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Chargement...</div>;
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ 
        background: '#fff', 
        padding: '16px 24px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Admin - Cours Fébus</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Déconnexion
        </button>
      </header>
      
      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px' }}>Dashboard</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <a href="/admin/stages" style={{ 
            display: 'block',
            background: '#fff', 
            padding: '24px', 
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <h3 style={{ marginTop: 0 }}>Gestion des stages</h3>
            <p style={{ color: '#666', marginBottom: 0 }}>
              Modifier les dates, places disponibles et contenu des stages
            </p>
          </a>
          
          <a href="/admin/galerie" style={{ 
            display: 'block',
            background: '#fff', 
            padding: '24px', 
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <h3 style={{ marginTop: 0 }}>Gestion de la galerie</h3>
            <p style={{ color: '#666', marginBottom: 0 }}>
              Ajouter ou supprimer des images et vidéos
            </p>
          </a>
          
          <a href="/admin/pages" style={{ 
            display: 'block',
            background: '#fff', 
            padding: '24px', 
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <h3 style={{ marginTop: 0 }}>Gestion des pages</h3>
            <p style={{ color: '#666', marginBottom: 0 }}>
              Modifier le contenu textuel des pages
            </p>
          </a>
        </div>
        
        <div style={{ marginTop: '40px' }}>
          <a href="/" style={{ color: '#080502' }}>← Retour au site</a>
        </div>
      </main>
    </div>
  );
}
