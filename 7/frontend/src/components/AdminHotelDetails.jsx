import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteBooking, getBookingsByHotel } from '../requests/adminRequests'; // Updated import path
import './AdminHotelDetails.css'; // Import CSS styles

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
    <div className="admin-hotel-details-container">
      <h1>{hotel.name}</h1>
      <p>Location: {hotel.location}</p>
      <p>Price: ₹{hotel.price}</p>
      <p>Available Rooms: {hotel.roomAvailable}</p>
      <h2>Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user.username}</td>
              <td>{new Date(booking.date).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDeleteBooking(booking._id)}>Delete Booking</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotelDetails;
