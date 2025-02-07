import api from './api';

export const getHotels = async () => {
    try {
        const response = await api.post('/admin/getHotels');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const addHotel = async (hotelData) => {
    try {
        const response = await api.post('/admin/addHotel', hotelData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateHotel = async (hotelData) => {
    try {
        const response = await api.post('/admin/updateHotel', hotelData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteHotel = async (hotelId) => {
    try {
        const response = await api.post('/admin/deleteHotel', { id: hotelId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteBooking = async (bookingId) => {
    try {
        const response = await api.post('/admin/deleteBooking', { bookingId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getBookingsByHotel = async (hotelId) => {
    try {
        const response = await api.get(`/admin/bookings/${hotelId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteBookingByAdmin = async (bookingId) => {
    try {
        const response = await api.post('/admin/deleteBooking', { bookingId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
