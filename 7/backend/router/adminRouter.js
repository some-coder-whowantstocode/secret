const express = require("express");
const { getHotels, addHotel, updateHotel, deleteHotel, } = require("../controller/hotelController");
const {getBookingsByHotel, deleteBookingByAdmin} = require('../controller/bookingController')
const { authenticateAdmin,authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/getHotels', authenticateToken, getHotels);
router.post('/addHotel', authenticateAdmin, addHotel);
router.post('/updateHotel', authenticateAdmin, updateHotel);
router.post('/deleteHotel', authenticateAdmin, deleteHotel);
router.get('/bookings/:id', authenticateAdmin, getBookingsByHotel); 
router.post('/deleteBooking', authenticateAdmin, deleteBookingByAdmin); 
module.exports = router;
