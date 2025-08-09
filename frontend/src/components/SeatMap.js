import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../services/api';

const SeatMap = ({ isAdmin = false }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [layoutName, setLayoutName] = useState('testLayout');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const token = localStorage.getItem(isAdmin ? 'adminToken' : 'userToken');
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await API.get(`/seats/get/${layoutName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const layoutSeats = response.data.data.seats;
        const bookedResponse = await API.get(`/bookings/booked-seats/${dateStr}`);
        const unavailableResponse = await API.get(`/seats/unavailable-seats/${dateStr}`);
        const bookedSeats = bookedResponse.data.data.reservedSeats;
        const unavailableSeats = unavailableResponse.data.data.unavailableSeats;
        const updatedSeats = layoutSeats.map((seat) => ({
          label: seat.seatId,
          status: bookedSeats.includes(seat.seatId)
            ? 'reserved'
            : unavailableSeats.includes(seat.seatId)
              ? 'unavailable'
              : 'available',
        }));
        setSeats(updatedSeats);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch seats');
      }
    };
    fetchSeats();
  }, [selectedDate, layoutName, isAdmin]);

  const reserveSeat = async () => {
    try {
      const token = localStorage.getItem('userToken');
      await API.post(
        '/bookings',
        {
          seatId: selectedSeat,
          bookingDate: selectedDate.toISOString().split('T')[0],
          layoutName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Seat reserved successfully!');
      setSelectedSeat(null);
      setTimeout(() => setSuccess(''), 3000);
      const fetchSeats = async () => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await API.get(`/seats/get/${layoutName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const layoutSeats = response.data.data.seats;
        const bookedResponse = await API.get(`/bookings/booked-seats/${dateStr}`);
        const unavailableResponse = await API.get(`/seats/unavailable-seats/${dateStr}`);
        const bookedSeats = bookedResponse.data.data.reservedSeats;
        const unavailableSeats = unavailableResponse.data.data.unavailableSeats;
        const updatedSeats = layoutSeats.map((seat) => ({
          label: seat.seatId,
          status: bookedSeats.includes(seat.seatId)
            ? 'reserved'
            : unavailableSeats.includes(seat.seatId)
              ? 'unavailable'
              : 'available',
        }));
        setSeats(updatedSeats);
      };
      fetchSeats();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reserve seat');
    }
  };

  const markUnavailable = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await API.post(
        '/seats/mark-unavailable',
        {
          date: selectedDate.toISOString().split('T')[0],
          seatId: selectedSeat,
          layoutName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Seat marked unavailable');
      setSelectedSeat(null);
      setTimeout(() => setSuccess(''), 3000);
      const fetchSeats = async () => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await API.get(`/seats/get/${layoutName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const layoutSeats = response.data.data.seats;
        const bookedResponse = await API.get(`/bookings/booked-seats/${dateStr}`);
        const unavailableResponse = await API.get(`/seats/unavailable-seats/${dateStr}`);
        const bookedSeats = bookedResponse.data.data.reservedSeats;
        const unavailableSeats = unavailableResponse.data.data.unavailableSeats;
        const updatedSeats = layoutSeats.map((seat) => ({
          label: seat.seatId,
          status: bookedSeats.includes(seat.seatId)
            ? 'reserved'
            : unavailableSeats.includes(seat.seatId)
              ? 'unavailable'
              : 'available',
        }));
        setSeats(updatedSeats);
      };
      fetchSeats();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to mark seat unavailable');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold text-darkBlue mb-4">Seat Map</h3>
      <div className="mb-4 flex gap-4">
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        />
        <input
          type="text"
          value={layoutName}
          onChange={(e) => setLayoutName(e.target.value)}
          placeholder="Layout Name"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
        />
      </div>
      {error && <p className="text-danger mb-4">{error}</p>}
      {success && <p className="text-success mb-4">{success}</p>}
      <div className="flex gap-4 flex-wrap">
        {seats.map((seat) => (
          <button
            key={seat.label}
            disabled={seat.status !== 'available'}
            className={`p-4 rounded ${seat.status === 'available'
                ? 'bg-secondaryGreen text-white hover:bg-green-600'
                : seat.status === 'reserved'
                  ? 'bg-danger text-white'
                  : 'bg-primaryBlue text-white'
              }`}
            onClick={() => setSelectedSeat(seat.label)}
          >
            {seat.label}
          </button>
        ))}
      </div>
      {selectedSeat && (
        <div className="mt-4">
          {isAdmin ? (
            <button
              onClick={markUnavailable}
              className="bg-warning text-white p-2 rounded hover:bg-orange-600"
            >
              Mark {selectedSeat} Unavailable
            </button>
          ) : (
            <button
              onClick={reserveSeat}
              className="bg-primaryBlue text-white p-2 rounded hover:bg-darkBlue"
            >
              Confirm Reservation for {selectedSeat}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SeatMap;