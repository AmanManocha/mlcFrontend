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

export default API;