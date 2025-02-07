import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHotel } from '../requests/adminRequests';
import './AuthStyles.css';

const AddHotel = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [roomAvailable, setRoomAvailable] = useState('');
  const navigate = useNavigate();

  const handleAddHotel = async () => {
    if (!name || !location || !price || !roomAvailable) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      const hotelData = {
        name,
        location,
        price: parseFloat(price),
        roomAvailable: parseInt(roomAvailable, 10),
        available: parseInt(roomAvailable, 10) > 0, // Hotel is available if there are rooms available
      };

      await addHotel(hotelData);
      alert('Hotel added successfully!');
      navigate('/hotels');
    } catch (error) {
      console.error('Error adding hotel:', error);
      alert('Failed to add hotel.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Add Hotel</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Hotel Name"
        className="auth-input"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Hotel Location"
        className="auth-input"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Hotel Price"
        className="auth-input"
      />
      <input
        type="number"
        value={roomAvailable}
        onChange={(e) => setRoomAvailable(e.target.value)}
        placeholder="Rooms Available"
        className="auth-input"
      />
      <button onClick={handleAddHotel} className="auth-button">Add Hotel</button>
    </div>
  );
};

export default AddHotel;
