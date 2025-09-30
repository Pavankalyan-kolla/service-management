export const BASE = 'http://localhost:5000/api/services';

export async function fetchServices() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function createService(payload) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create service');
  return res.json();
}

export async function updateService(id, payload) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update service');
  return res.json();
}

export async function deleteService(id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete service');
  return true;
}
