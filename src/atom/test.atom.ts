import { atom } from "recoil";

export const testAtom = atom({
    key: 'test',
    default: {
        count: 0
    }
})