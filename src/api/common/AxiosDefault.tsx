/* eslint-disable prettier/prettier */
import axios, { AxiosInstance } from 'axios';

const axiosInstanceDefault: AxiosInstance = axios.create({
    baseURL: '/stock/api', // 기본 서버 주소 입력
    timeout: 30000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

export default axiosInstanceDefault;
