import { atom } from 'recoil'
import { ILoggedinUser } from '../interface/user.interface'
import { recoilPersist } from 'recoil-persist'

const { persistAtom }: any = recoilPersist()

export const userAtom = atom<ILoggedinUser>({
    key: 'user',
    default: {
        id: 0,
        name: '',
        email: '',
        birth: '',
        sex: '',
        phoneNumber: '',
        provider: '',
        token: '',
    },
    effects_UNSTABLE: [persistAtom],
    // default: null,
})
