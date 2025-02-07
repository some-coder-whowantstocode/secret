import api from './api';

// User signup
export const signup = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// User login
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        const { token } = response.data;
        localStorage.setItem('token', token); // Save token to local storage for authentication
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token in headers
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
