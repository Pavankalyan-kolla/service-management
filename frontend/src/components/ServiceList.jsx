import React from 'react';

export default function ServiceList({ services, onEdit, onDelete }) {
  if (!services || services.length === 0) return <p>No services available.</p>;

  return (
    <table className="services">
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Active</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map(s => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.description}</td>
            <td>{s.price?.toFixed ? s.price.toFixed(2) : s.price}</td>
            <td>{s.isActive ? 'Yes' : 'No'}</td>
            <td>
              <button onClick={() => onEdit(s)}>Edit</button>
              <button onClick={() => onDelete(s.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
