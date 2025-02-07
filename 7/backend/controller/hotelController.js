const Hotel = require('../model/Hotelmodel'); 
const Booking = require('../model/Bookingmodel')

const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching hotels', error });
    }
};


const addHotel = async (req, res) => {
    const { name, location, roomAvailable, price } = req.body;
    try {
        const newHotel = new Hotel({ name, location, roomAvailable, price });
        await newHotel.save();
        res.status(201).json({ message: 'Hotel added successfully', hotel: newHotel });
    } catch (error) {
        res.status(400).json({ message: 'Error adding hotel', error });
    }
};

const updateHotel = async (req, res) => {
    const { id, ...updates } = req.body;
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: 'Hotel updated successfully', updatedHotel });
    } catch (error) {
        res.status(400).json({ message: 'Error updating hotel', error });
    }
};

const deleteHotel = async (req, res) => {
    const { id } = req.body;
    try {
        await Hotel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting hotel', error });
    }
};

module.exports = { addHotel, getHotels, updateHotel, deleteHotel };