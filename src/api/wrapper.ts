import axios from 'axios';

const $api = axios.create({
	baseURL: `${import.meta.env.VITE_API_HOST}`
});

$api.interceptors.request.use(config => {
	config.headers
		? (config.headers['x-auth'] = `${localStorage.getItem('token')}`)
		: null;

	return config;
});

export default $api;
