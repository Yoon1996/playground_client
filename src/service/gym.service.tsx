import axios from 'axios';
import { IFilterModel } from '../interface/filter.interface';

const baseUrl = `${import.meta.env.VITE_APP_HOST}`;

//전체 체육관 리스트 보여주기
export const showGymList = () => {
    return axios.get(`${baseUrl}/gym/all`);
};

//페이지네이션을 위한 리스트 총 개수
export const getGymsLength = () => {
    return axios.get(`${baseUrl}/gym/getGymsLength`);
};

//페이지네이트 해서 리스트 보여주기
export const showPageGymList = (params?: IFilterModel) => {
    return axios.get(`${baseUrl}/gym/gyms`, { params });
};

//디테일 페이지 가져오기
export const showDetailGym = (id: number) => {
    return axios.get(`${baseUrl}/gym/gym_detail/${id}`);
};
