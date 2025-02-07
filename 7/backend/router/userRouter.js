const express = require("express");
const { getHotelById, bookHotel, getBookingsByUserId } = require("../controller/bookingController");
const {authenticateToken} = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/getHotels/:id', authenticateToken, getHotelById);
router.post('/bookHotel', authenticateToken, bookHotel);
router.get('/bookings/:id', authenticateToken, getBookingsByUserId);

module.exports = router;