import React, { useEffect, useState } from 'react';
import { getBookingsByUserId } from '../requests/userRequests';
import { useAuth } from '../context/AuthContext';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookingsByUserId(user._id);
        console.log(bookingsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [user.username]);

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">My Bookings</h1>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-300 text-left">Hotel Name</th>
            <th className="p-2 border-b border-gray-300 text-left">Location</th>
            <th className="p-2 border-b border-gray-300 text-left">Price</th>
            <th className="p-2 border-b border-gray-300 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="p-2 border-b border-gray-300 align-middle">{booking.hotel.name}</td>
              <td className="p-2 border-b border-gray-300 align-middle">{booking.hotel.location}</td>
              <td className="p-2 border-b border-gray-300 align-middle">₹{booking.hotel.price}</td>
              <td className="p-2 border-b border-gray-300 align-middle">{new Date(booking.date).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookings;
