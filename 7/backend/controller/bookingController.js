const Hotel = require('../model/Hotelmodel'); 
const Booking = require('../model/Bookingmodel')

const getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findById(id);
        if (hotel) {
            res.status(200).json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error fetching hotel', error });
    }
};
const bookHotel = async (req, res) => {
    const { id, userId, date } = req.body;
    try {
        const hotel = await Hotel.findById(id);
        if (hotel && hotel.roomAvailable > 0) {
            hotel.roomAvailable -= 1;
            await hotel.save();
            console.log(userId,id,date)
            const newBooking = new Booking({ user: userId, hotel: id, date:Date.now() });
            await newBooking.save();

            res.status(200).json({ message: 'Hotel booked successfully', hotel, booking: newBooking });
        } else {
            res.status(404).json({ message: 'Hotel not available' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error booking hotel', error });
    }
};

const getBookingsByUserId = async (req, res) => {
    const { id } = req.params; 
    try {
        const bookings = await Booking.find({ user: id }).populate('hotel'); // Assuming you want to populate hotel details
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching bookings', error });
    }
};

const getBookingsByHotel = async (req, res) => {
    const { id } = req.params; 
    try {
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        const bookings = await Booking.find({ hotel: id }).populate('user', 'username');
        
        res.status(200).json({
            hotel: {
                id: hotel._id,
                name: hotel.name,
                location: hotel.location,
                price: hotel.price
            },
            bookings
        });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching bookings', error });
    }
};
const deleteBookingByAdmin = async (req, res) => {
    const { bookingId } = req.body;
    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (booking) {
            res.status(200).json({ message: 'Booking deleted successfully', booking });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting booking', error });
    }
};

module.exports = { getHotelById, bookHotel, getBookingsByUserId, getBookingsByHotel, deleteBookingByAdmin };