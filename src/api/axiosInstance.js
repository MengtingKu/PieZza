import axios from 'axios';

const { VITE_BASE_URL: baseURL, VITE_APP_PATH: apiPath } = import.meta.env;

const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/${apiPath}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('API 錯誤：', error);
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
