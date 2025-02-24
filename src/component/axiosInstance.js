// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v2/",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Authorization 토큰 설정 함수 (선택 사항)
export const setAuthorizationHeader = (token) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export default axiosInstance;