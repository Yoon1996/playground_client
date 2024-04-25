import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_APP_HOST}`;

//토큰인증
export const tokenVerify = () => {
    return axios.get(`${baseUrl}/auth/token-verify`);
};
