import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api' // Spring Boot URL

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    /*headers: {
        'Content-Type' : 'application/json',
    },*/
});

/* REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {
        // 1. Getting jwt token from the local storage
        const token = localStorage.getItem('jwtToken');

        // 2. If token exists, adding it to the Authorization header
        if(token) {
            console.log("2. Adding authorization token");
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);*/

export default api;