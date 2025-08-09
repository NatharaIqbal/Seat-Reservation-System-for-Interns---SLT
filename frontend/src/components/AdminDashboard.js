import React, { useState } from 'react';
import Report from './Report';
import ReserveHistory from './ReserveHistory';
import SeatMap from './SeatMap';
import API from '../services/api';

const AdminDashboard = () => {
  const [layoutName, setLayoutName] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateLayout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await API.post(
        '/seats/create',
        { layoutName, totalSeats: parseInt(totalSeats) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Layout created successfully');
      setError('');
      setLayoutName('');
      setTotalSeats('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create layout');
      setSuccess('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-darkBlue mb-4">Admin Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl text-darkBlue mb-2">Create Seat Layout</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
            placeholder="Layout Name"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
          />
          <input
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            placeholder="Total Seats"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
          />
        </div>
        <button
          onClick={handleCreateLayout}
          className="bg-primaryBlue text-white p-2 rounded hover:bg-darkBlue"
        >
          Create Layout
        </button>
      </div>
      {error && <p className="text-danger mt-4">{error}</p>}
      {success && <p className="text-success mt-4">{success}</p>}
      <SeatMap isAdmin={true} />
      <ReserveHistory isAdmin={true} />
      <Report />
    </div>
  );
};

export default AdminDashboard;