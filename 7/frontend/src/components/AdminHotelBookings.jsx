import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelById } from '../requests/adminRequests';
import { deleteBooking } from '../requests/adminRequests';
import './AdminHotelBookings.css';

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
    <div className="admin-hotel-bookings-container">
      <h1>{hotel.name}</h1>
      <p>{hotel.location}</p>
      <p>Price: ₹{hotel.price}</p>
      <p>Availability: {hotel.roomAvailable} rooms</p>
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
            <tr key={booking.id}>
              <td>{booking.userName}</td>
              <td>{booking.date}</td>
              <td>
                <button onClick={() => handleDeleteBooking(booking.id)}>Delete Booking</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotelBookings;
