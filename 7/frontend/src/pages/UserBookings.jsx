import React, { useEffect, useState } from 'react';
import { getBookingsByUserId } from '../requests/userRequests';
import { useAuth } from '../context/AuthContext';
import './UserBookings.css'; // Import CSS styles

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookingsByUserId(user._id);
        console.log(bookingsData)
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [user.username]);

  return (
    <div className="bookings-list-container">
      <h1>My Bookings</h1>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.hotel.name}</td>
              <td>{booking.hotel.location}</td>
              <td>₹{booking.hotel.price}</td>
              <td>{new Date(booking.date).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookings;
