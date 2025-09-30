import React, { useEffect, useState } from 'react';
import { fetchServices, createService, updateService, deleteService } from './api';
import ServiceList from './components/ServiceList';
import ServiceForm from './components/ServiceForm';

export default function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchServices();
      setServices(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(payload) {
    try {
      const created = await createService(payload);
      setServices(prev => [...prev, created]);
      setShowForm(false);
    } catch (e) {
      setError(e.message);
    }
  }

  function handleEditClick(service) {
    setEditing(service);
    setShowForm(true);
  }

  async function handleUpdate(id, payload) {
    try {
      const updated = await updateService(id, payload);
      setServices(prev => prev.map(s => (s.id === id ? updated : s)));
      setEditing(null);
      setShowForm(false);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this service (soft delete)?')) return;
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="container">
      <h1>Service Management</h1>
      {error && <div className="error">{error}</div>}
      <div style={{marginBottom:12}}>
        <button onClick={() => { setEditing(null); setShowForm(true); }}>Add Service</button>
      </div>

      {showForm && (
        <ServiceForm
          initial={editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}

      {loading ? <p>Loading...</p> : (
        <ServiceList services={services} onEdit={handleEditClick} onDelete={handleDelete} />
      )}
    </div>
  );
}
