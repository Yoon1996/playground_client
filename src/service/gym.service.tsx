import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_APP_HOST}`;
// const baseUrl = `${process.env.REACT_APP_HOST}/gym`

//전체 체육관 리스트 보여주기
export const showGymList = () => {
    return axios.get(`${baseUrl}/gym/all`);
};

export const showPageGymList = (offset: any) => {
    return axios.get(`${baseUrl}/gym/gyms?page=${offset}`);
};
