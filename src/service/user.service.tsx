import axios from 'axios'
import { env } from '../environment/environment'

const baseUrl = `${env.hosturl}/url`
// const baseUrl = `${process.env.REACT_APP_HOST}/url`

//url send
export const createUser = () => {
    return axios.post(`${baseUrl}/create`)
}
