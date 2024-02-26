import axios from 'axios'
import { IAddProfile, IChangePw, ILoginUser, IUpdateProfile, IUser } from '../interface/user.interface'

const baseUrl = `${import.meta.env.VITE_APP_HOST}`
// const baseUrl = `${process.env.REACT_APP_HOST}/user`

//회원가입
export const createUser = (body:IUser) => {
    return axios.post(`${baseUrl}/user/regist`, body)
}

//로그인
export const login = (body:ILoginUser) => {
    return axios.post(`${baseUrl}/auth/login`, body)
}

//소셜로그인
export const socialLogin = (body:any) => {
    return axios.post(`${baseUrl}/auth/social-login`, body)
}

//소셜로그인(프로필 추가 정보 입력)
export const addProfile = (body:IAddProfile) => {
    return axios.put(`${baseUrl}/user/add-profile`, body)
}

//연락처 수정
export const changePhoneNumber = (body:IUpdateProfile, id:number) => {
    return axios.put(`${baseUrl}/user/change-phoneNumber/${id}`, body)
}

//생년월일 수정
export const changeBirth = (body:IUpdateProfile, id:number) => {
    return axios.put(`${baseUrl}/user/change-birth/${id}`, body)
}

//비밀번호 변경
export const changePw = (body:IChangePw, id:number) => {
    return axios.put(`${baseUrl}/user/change-pw/${id}`, body)
}
