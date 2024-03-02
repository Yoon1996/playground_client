import { atom } from "recoil"

export const gymListAtom = atom<any>({
    key: 'gymList',
    default: [],
    effects: [
    ]
})