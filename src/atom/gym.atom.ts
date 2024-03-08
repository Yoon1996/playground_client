import { atom } from 'recoil';

export const gymListLengthAtom = atom<any>({
    key: 'gymListLength',
    default: 0,
});

export const gymListAtom = atom<any>({
    key: 'gymList',
    default: [],
    effects: [],
});

export const pageAtom = atom<any>({
    key: 'pageNum',
    default: 1,
    effects: [],
});
