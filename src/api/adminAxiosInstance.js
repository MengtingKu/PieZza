/* eslint-disable no-useless-escape */
import axios from 'axios';
import { store } from '@/store.js';
import { logOut } from '@slices/authSlice';

const { VITE_BASE_URL: baseURL, VITE_APP_PATH: apiPath } = import.meta.env;

const getTokenFromCookie = () =>
	document.cookie.replace(
		/(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
		'$1'
	);

const token = getTokenFromCookie();
if (token) {
	axios.defaults.headers.common.Authorization = token;
}

const axiosInstance = axios.create({
	baseURL: `${baseURL}/api/${apiPath}/admin`,
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		if (error.response && error.response.status === 401) {
			store.dispatch(logOut());
		}

		return Promise.reject(error);
	}
);

const request = (method, url, params = {}) => {
	return axiosInstance({
		method,
		url,
		...params,
	});
};

export default request;
