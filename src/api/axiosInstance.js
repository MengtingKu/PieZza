import axios from 'axios';

const { VITE_BASE_URL: baseURL, VITE_APP_PATH: apiPath } = import.meta.env;

const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/${apiPath}`,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
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
