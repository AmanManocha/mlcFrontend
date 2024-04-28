import axios from 'axios';
import { BASE_API_PATH } from './config';


const API = axios.create({
	baseURL: BASE_API_PATH,
	headers: {'Content-Type':  'application/json'}
});


API.interceptors.request.use((config) => {
	if (localStorage.getItem("access_token")) {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;
	}
	return config;
}, (error) => {
	// Do something with request error
	return Promise.reject(error);
});
API.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) { // Unauthorized error (token expired)
        // Clear the expired token from local storage
        localStorage.removeItem('access_token');
        // Redirect to sign-in page
        navigate('/signin'); // Adjust the route as per your application
    }
    return Promise.reject(error);
});
export default API;