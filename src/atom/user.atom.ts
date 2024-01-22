import { atom } from 'recoil'
import { ILoggedinUser } from '../interface/user.interface'
import { recoilPersist } from 'recoil-persist'

const { persistAtom }: any = recoilPersist()

export const userAtom = atom<ILoggedinUser | null>({
    key: 'user',
    default: {
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
