import api from './api';

// Get Hotel by ID
export const getHotelById = async (id) => {
    try {
        const response = await api.get(`/user/getHotels/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Book Hotel
export const bookHotel = async (bookingData) => {
    try {
        const response = await api.post('/user/bookHotel', bookingData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Get Bookings by User ID
export const getBookingsByUserId = async (userId) => {
    try {
        console.log(`/user/bookings/${userId}`)
        const response = await api.get(`/user/bookings/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
