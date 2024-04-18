import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_APP_HOST}`;
//예약하기
export const createReservation = (params: any) => {
    return axios.post(`${baseUrl}/reservation/create_reservation`, params);
};

//예약 정보 가져오기
export const getReservation = (id: number) => {
    return axios.get(`${baseUrl}/reservation/get_reservation/${id}`);
};

//예약 정보 삭제오기
export const deleteReservation = (gymId: number) => {
    return axios.delete(`${baseUrl}/reservation/delete_reservation/${gymId}`);
};

//예약 불가 버튼 처리 하기
export const canNotReservation = (date: string) => {
    return axios.get(`${baseUrl}/reservation/can_not_reservation/${date}`);
};
