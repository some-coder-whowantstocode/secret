import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteBooking, getBookingsByHotel } from '../requests/adminRequests'; // Updated import path

const AdminHotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const response = await getBookingsByHotel(id);
      setHotel(response.hotel);
      setBookings(response.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{hotel.name}</h1>
      <p className="mb-2">Location: {hotel.location}</p>
      <p className="mb-2">Price: ₹{hotel.price}</p>
      <p className="mb-4">Available Rooms: {hotel.roomAvailable}</p>
      <h2 className="text-xl font-semibold mb-3">Bookings</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-300 text-left">User</th>
            <th className="p-2 border-b border-gray-300 text-left">Date</th>
            <th className="p-2 border-b border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="p-2 border-b border-gray-300 align-middle">{booking.user.username}</td>
              <td className="p-2 border-b border-gray-300 align-middle">{new Date(booking.date).toLocaleString()}</td>
              <td className="p-2 border-b border-gray-300 align-middle">
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => handleDeleteBooking(booking._id)}
                >
                  Delete Booking
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotelDetails;
