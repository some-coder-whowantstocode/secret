import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9310',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
