import React from 'react';
import ReserveHistory from './ReserveHistory';
import SeatMap from './SeatMap';

const InternDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-darkBlue mb-4">Intern Dashboard</h2>
      <SeatMap />
      <ReserveHistory />
    </div>
  );
};

export default InternDashboard;