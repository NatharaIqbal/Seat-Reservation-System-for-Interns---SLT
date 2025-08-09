import React from 'react';
import API from '../services/api';

const Report = () => {
  const downloadPDF = async () => {
    try {
      const response = await API.get('/bookings/report', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reservation-report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to download report');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-darkBlue mb-4">Usage Report</h2>
      <button
        onClick={downloadPDF}
        className="bg-primaryBlue text-white p-2 rounded hover:bg-darkBlue"
      >
        Download Usage Report (PDF)
      </button>
    </div>
  );
};

export default Report;