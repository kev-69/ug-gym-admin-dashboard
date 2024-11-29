// src/pages/Subscriptions.jsx
import React, { useState } from 'react';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
];

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(mockData);

  const approveSubscription = (id) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: 'Approved' } : sub
      )
    );
  };

  return (
    <div>
      <h2>Manage Subscriptions</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.name}</td>
              <td>{sub.email}</td>
              <td>{sub.status}</td>
              <td>
                {sub.status === 'Pending' && (
                  <button onClick={() => approveSubscription(sub.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}