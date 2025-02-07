import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHotels, deleteHotel } from '../requests/adminRequests';
import { bookHotel } from '../requests/userRequests'; // Import bookHotel function for users
import { useAuth } from '../context/AuthContext';
import './HotelsList.css'; // Import CSS styles

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
    <div className="hotels-list-container">
      <h1>Hotels</h1>
      <table className="hotels-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel._id}>
              <td>
                {user.role === 'admin' ? (
                  <Link to={`/admin/hotels/${hotel._id}`}>{hotel.name}</Link>
                ) : (
                  hotel.name
                )}
              </td>
              <td>{hotel.location}</td>
              <td>₹{hotel.price}</td>
              <td>{hotel.roomAvailable} rooms</td>
              <td>
                {user.role === 'admin' ? (
                  <>
                    <button onClick={() => navigate(`/admin/edit-hotel/${hotel._id}`)}>Edit</button>
                    <button onClick={() => handleDeleteHotel(hotel._id)}>Delete</button>
                  </>
                ) : (
                  <button onClick={() => handleBookHotel(hotel._id)}>Book</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {user.role === 'admin' && <button className="add-hotel-button" onClick={handleAddHotel}>Add Hotel</button>}
    </div>
  );
};

export default HotelsList;
