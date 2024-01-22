import axios from 'axios'
import { IUser } from '../interface/user.interface'

const baseUrl = `${import.meta.env.VITE_APP_HOST}/user`
// const baseUrl = `${process.env.REACT_APP_HOST}/user`

//회원가입
export const createUser = () => {
    return axios.post(`${baseUrl}/regist`)
}
