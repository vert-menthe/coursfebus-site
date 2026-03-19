'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface StageDate {
  session: string;
  start: string;
  end: string;
  year: number;
}

interface Stage {
  id: string;
  slug: string;
  title: string;
  description: string;
  dates: StageDate[];
  max_students: number;
  is_active: boolean;
}

export default function AdminStages() {
  const router = useRouter();
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [editForm, setEditForm] = useState<Stage | null>(null);
  
  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'cours-febus-admin-secret-2025-secure';
  
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    fetchStages();
  }, [router]);
  
  const fetchStages = async () => {
    try {
      const res = await fetch('/api/stages');
      if (res.ok) {
        const data = await res.json();
        setStages(data);
      }
    } catch (error) {
      console.error('Error fetching stages:', error);
    }
    setLoading(false);
  };
  
  const handleEdit = (stage: Stage) => {
    setSelectedStage(stage);
    setEditForm({ ...stage });
  };
  
  const handleSave = async () => {
    if (!editForm) return;
    
    setSaving(true);
    try {
      const res = await fetch('/api/stages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminSecret,
        },
        body: JSON.stringify(editForm),
      });
      
      if (res.ok) {
        await fetchStages();
        setSelectedStage(null);
        setEditForm(null);
      } else {
        const error = await res.json();
        alert('Erreur: ' + error.error);
      }
    } catch (error) {
      console.error('Error saving stage:', error);
      alert('Erreur lors de la sauvegarde');
    }
    setSaving(false);
  };
  
  const handleCancel = () => {
    setSelectedStage(null);
    setEditForm(null);
  };
  
  const addDate = () => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      dates: [...editForm.dates, { session: 'Nouvelle session', start: '', end: '', year: new Date().getFullYear() }]
    });
  };
  
  const updateDate = (index: number, field: keyof StageDate, value: string | number) => {
    if (!editForm) return;
    const newDates = [...editForm.dates];
    newDates[index] = { ...newDates[index], [field]: value };
    setEditForm({ ...editForm, dates: newDates });
  };
  
  const removeDate = (index: number) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      dates: editForm.dates.filter((_, i) => i !== index)
    });
  };
  
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Chargement...</div>;
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
        <h1 style={{ margin: 0, fontSize: '24px' }}>Admin - Stages</h1>
        <div>
          <a href="/admin/dashboard" style={{ marginRight: '16px', color: '#080502' }}>Dashboard</a>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              router.push('/admin/login');
            }}
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
        </div>
      </header>
      
      <main style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        {!selectedStage ? (
          <>
            <h2 style={{ marginBottom: '24px' }}>Liste des stages</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stages.map(stage => (
                <div
                  key={stage.id}
                  style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{stage.title}</h3>
                      <p style={{ color: '#666', margin: '0 0 8px' }}>{stage.slug}</p>
                      <p style={{ margin: 0 }}>Places: {stage.max_students} / session</p>
                      <p style={{ margin: '8px 0 0', color: stage.is_active ? 'green' : 'red' }}>
                        {stage.is_active ? 'Actif' : 'Inactif'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEdit(stage)}
                      style={{
                        padding: '8px 16px',
                        background: '#080502',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              ))}
              
              {stages.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666' }}>
                  Aucun stage trouvé. Configurez d'abord la base de données Supabase.
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: '24px' }}>Modifier: {editForm?.title}</h2>
            
            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Titre</label>
                <input
                  type="text"
                  value={editForm?.title || ''}
                  onChange={(e) => setEditForm({ ...editForm!, title: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description</label>
                <textarea
                  value={editForm?.description || ''}
                  onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                  rows={4}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Places par session</label>
                <input
                  type="number"
                  value={editForm?.max_students || 6}
                  onChange={(e) => setEditForm({ ...editForm!, max_students: parseInt(e.target.value) })}
                  min={1}
                  max={20}
                  style={{ width: '100px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                  <input
                    type="checkbox"
                    checked={editForm?.is_active || false}
                    onChange={(e) => setEditForm({ ...editForm!, is_active: e.target.checked })}
                  />
                  Stage actif
                </label>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ fontWeight: '500' }}>Dates des sessions</label>
                  <button
                    type="button"
                    onClick={addDate}
                    style={{
                      padding: '4px 12px',
                      background: '#080502',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    + Ajouter une session
                  </button>
                </div>
                
                {editForm?.dates.map((date, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'flex-end',
                    marginBottom: '12px',
                    padding: '12px',
                    background: '#f9f9f9',
                    borderRadius: '4px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Nom de la session</label>
                      <input
                        type="text"
                        value={date.session}
                        onChange={(e) => updateDate(index, 'session', e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Début</label>
                      <input
                        type="date"
                        value={date.start}
                        onChange={(e) => updateDate(index, 'start', e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Fin</label>
                      <input
                        type="date"
                        value={date.end}
                        onChange={(e) => updateDate(index, 'end', e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                    <div style={{ width: '80px' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Année</label>
                      <input
                        type="number"
                        value={date.year}
                        onChange={(e) => updateDate(index, 'year', parseInt(e.target.value))}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDate(index)}
                      style={{
                        padding: '8px',
                        background: 'red',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: '12px 24px',
                    background: '#080502',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1
                  }}
                >
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </>
        )}
        
        <div style={{ marginTop: '40px' }}>
          <a href="/admin/dashboard" style={{ color: '#080502' }}>← Retour au dashboard</a>
        </div>
      </main>
    </div>
  );
}
