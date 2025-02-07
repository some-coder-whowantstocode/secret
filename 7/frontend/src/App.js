import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hotels from './pages/Hotels';
import UserBookings from './pages/UserBookings';
import AdminHotelDetails from './components/AdminHotelDetails';
import AddHotel from './pages/AddHotel';
import { AuthProvider } from './context/AuthContext';
import './styles.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/user-bookings" element={<UserBookings />} />
          <Route path="/admin/hotels/:id" element={<AdminHotelDetails />} />
          <Route path="/add-hotel" element={<AddHotel />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
