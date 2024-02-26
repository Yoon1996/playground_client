import axios from 'axios'
import { atom } from 'recoil'

const savedValue = localStorage.getItem('accessToken')

export const loginStateAtom = atom<any>({
    key: 'loginState',
    default: { state: false },
    effects: [
        ({ onSet, setSelf }) => {
            if (!savedValue || savedValue === undefined) setSelf({ state: false })
            if (savedValue !== 'undefined') setSelf({ state: true })
        }
    ]
})

export const userInfoAtom = atom<any>({
    key: 'userInfo',
    default: {},
    effects: [
        ({ onSet, setSelf }) => {
            if (savedValue === 'undefined') localStorage.clear()
            onSet((newValue, _, isReset) => {
                if (isReset) {
                    localStorage.clear()
                    axios.defaults.headers.common['Authorization'] = null
                } else {
                    localStorage.setItem('accessToken', newValue.jwt)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newValue.jwt}`;
                    setSelf({ ...newValue })
                }
            })
        }
    ]
})

export const updateUserInfo = atom<any>({
    key: 'updateUserInfo',
    default: {},
    effects: []
})
