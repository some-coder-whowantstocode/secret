import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelById } from '../requests/adminRequests';
import { deleteBooking } from '../requests/adminRequests';

const AdminHotelBookings = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelData = await getHotelById(id);
        setHotel(hotelData);
        setBookings(hotelData.bookings || []);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      alert('Booking deleted successfully!');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking.');
    }
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{hotel.name}</h1>
      <p className="mb-2">{hotel.location}</p>
      <p className="mb-2">Price: ₹{hotel.price}</p>
      <p className="mb-4">Availability: {hotel.roomAvailable} rooms</p>
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
            <tr key={booking.id}>
              <td className="p-2 border-b border-gray-300 align-middle">{booking.userName}</td>
              <td className="p-2 border-b border-gray-300 align-middle">{booking.date}</td>
              <td className="p-2 border-b border-gray-300 align-middle">
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => handleDeleteBooking(booking.id)}
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

export default AdminHotelBookings;
