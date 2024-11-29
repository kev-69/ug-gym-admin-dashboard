// src/pages/Dashboard.jsx
import React from 'react';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div>Total Subscriptions: 100</div>
        <div>Pending Approvals: 5</div>
        <div>Revenue: GHS 10,000</div>
        <div>Active Members: 75</div>
      </div>
    </div>
  );
}
