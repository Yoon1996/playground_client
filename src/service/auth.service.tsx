import axios from 'axios'
import { IAddProfile, ILoginUser, IUpdateProfile, IUser } from '../interface/user.interface'

const baseUrl = `${import.meta.env.VITE_APP_HOST}`
// const baseUrl = `${process.env.REACT_APP_HOST}/user`

//토큰인증
export const tokenVerify = () => {
    return axios.get(`${baseUrl}/auth/token-verify`)
}
