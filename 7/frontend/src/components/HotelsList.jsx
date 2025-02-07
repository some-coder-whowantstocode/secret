import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHotels, deleteHotel } from '../requests/adminRequests';
import { bookHotel } from '../requests/userRequests'; // Import bookHotel function for users
import { useAuth } from '../context/AuthContext';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await getHotels();
        setHotels(hotelsData);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleDeleteHotel = async (hotelId) => {
    try {
      await deleteHotel(hotelId);
      setHotels(hotels.filter(hotel => hotel.id !== hotelId));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const handleAddHotel = () => {
    navigate('/add-hotel');
  };

  const handleBookHotel = async (hotelId) => {
    try {
      await bookHotel({ userId: user.username, hotelId });
      alert('Room booked successfully!');
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Failed to book room.');
    }
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Hotels</h1>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-300 text-left">Name</th>
            <th className="p-2 border-b border-gray-300 text-left">Location</th>
            <th className="p-2 border-b border-gray-300 text-left">Price</th>
            <th className="p-2 border-b border-gray-300 text-left">Availability</th>
            <th className="p-2 border-b border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel._id}>
              <td className="p-2 border-b border-gray-300 align-middle">
                {user.role === 'admin' ? (
                  <Link to={`/admin/hotels/${hotel._id}`} className="text-blue-500 hover:underline">{hotel.name}</Link>
                ) : (
                  hotel.name
                )}
              </td>
              <td className="p-2 border-b border-gray-300 align-middle">{hotel.location}</td>
              <td className="p-2 border-b border-gray-300 align-middle">₹{hotel.price}</td>
              <td className="p-2 border-b border-gray-300 align-middle">{hotel.roomAvailable} rooms</td>
              <td className="p-2 border-b border-gray-300 align-middle">
                {user.role === 'admin' ? (
                  <>
                    <button onClick={() => navigate(`/admin/edit-hotel/${hotel._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Edit</button>
                    <button onClick={() => handleDeleteHotel(hotel._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
                  </>
                ) : (
                  <button onClick={() => handleBookHotel(hotel._id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Book</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {user.role === 'admin' && <button className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddHotel}>Add Hotel</button>}
    </div>
  );
};

export default HotelsList;
