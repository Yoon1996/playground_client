import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputComponent from './input.component';
import axios from 'axios';
import { showPageGymList } from '../service/gym.service';
import { useSetRecoilState } from 'recoil';
import { filterParamsAtom, gymListAtom, gymListLengthAtom } from '../atom/gym.atom';
import { IFilterModel } from '../interface/filter.interface';

const SearchComponent = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();
    const setGymList = useSetRecoilState(gymListAtom);
    const setGymLength = useSetRecoilState(gymListLengthAtom);
    const setFilterParams = useSetRecoilState(filterParamsAtom);
    const urlSearch = searchParams.get('search');

    //엔터 입력시 로그인
    const pressEnterLogin = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            searchHandler();
        }
    };

    const searchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearch(searchWord);
    };
    const searchHandler = () => {
        const param: IFilterModel = {
            page: '1',
            search: search,
        };
        navigate({
            pathname: '/gyms',
            search: `?search=${search}`,
        });
        showPageGymList(param)
            .then((res) => {
                console.log('res: ', res);
                setGymList(res.data.list);
                setGymLength(res.data.length);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };

    useEffect(() => {
        if (urlSearch) {
            setSearch(urlSearch);
        }
    }, [urlSearch]);

    return (
        <>
            <div className="relative">
                <InputComponent
                    press={pressEnterLogin}
                    change={searchChange}
                    placeholder="지역, 구장이름으로 검색하기"
                    type="text"
                    notChangedValue={search}
                ></InputComponent>
                <img
                    onClick={() => searchHandler()}
                    className="w-5 h-5 absolute top-5 -mt-3 right-2 cursor-pointer"
                    src="/icon/vector.png"
                    alt=""
                />
            </div>
        </>
    );
};

export default SearchComponent;
