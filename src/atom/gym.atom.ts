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
    effects: [
        ({ onSet, setSelf }) => {
            onSet((newValue) => {
                console.log(newValue);
            });
        },
    ],
});

export const gymOffsetAtom = atom<any>({
    key: 'offset',
    default: 1,
});
