import React, { useEffect, useState } from 'react';

export default function ServiceForm({ initial, onCreate, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    isActive: true
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || '',
        description: initial.description || '',
        price: initial.price || 0,
        isActive: initial.isActive !== undefined ? initial.isActive : true
      });
    } else {
      setForm({ name: '', description: '', price: 0, isActive: true });
    }
  }, [initial]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (name === 'price' ? parseFloat(value) : value) }));
  }

  function submit(e) {
    e.preventDefault();
    if (initial && initial.id) {
      onUpdate(initial.id, form);
    } else {
      onCreate(form);
    }
  }

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={submit}>
        <h3>{initial ? 'Edit Service' : 'Add Service'}</h3>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} required />
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={onChange} />
        <label>Price</label>
        <input name="price" type="number" step="0.01" value={form.price} onChange={onChange} required />
        <label>
          <input name="isActive" type="checkbox" checked={form.isActive} onChange={onChange} />
          Active
        </label>

        <div className="actions">
          <button type="submit">{initial ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
