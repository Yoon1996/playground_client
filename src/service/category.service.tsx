import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_APP_HOST}`;
// const baseUrl = `${import.meta.env.VITE_PROD_HOST}`;

//카테고리 리스트 가져오기
export const showCategoryList = () => {
    return axios.get(`${baseUrl}/gym/category`);
};
