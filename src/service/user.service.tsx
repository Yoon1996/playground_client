import axios from 'axios'
import { ILoginUser, IUser } from '../interface/user.interface'

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