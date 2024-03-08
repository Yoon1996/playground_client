import axios from 'axios';
import { atom } from 'recoil';

export const loginStateAtom = atom<any>({
    key: 'loginState',
    default: { state: false },
    effects: [
        ({ setSelf }) => {
            const savedValue = localStorage.getItem('accessToken');
            setSelf({ state: !!savedValue });
            // if (savedValue !== 'undefined') setSelf({ state: true });
        },
    ],
});

export const userInfoAtom = atom<any>({
    key: 'userInfo',
    default: {},
    effects: [
        ({ onSet, setSelf }) => {
            const savedValue = localStorage.getItem('accessToken');
            if (savedValue === 'undefined') localStorage.clear();
            onSet((newValue, _, isReset) => {
                if (isReset) {
                    localStorage.clear();
                    axios.defaults.headers.common['Authorization'] = null;
                } else {
                    localStorage.setItem('accessToken', newValue.jwt);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newValue.jwt}`;
                    setSelf({ ...newValue });
                }
            });
        },
    ],
});

export const updateUserInfo = atom<any>({
    key: 'updateUserInfo',
    default: {},
    effects: [],
});
