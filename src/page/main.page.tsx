import { useEffect } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filterParamsAtom, gymListAtom, gymListLengthAtom } from '../atom/gym.atom';
import GroundListComponent from '../component/ground/ground_list.component';
import HeaderComponent from '../component/header.component';
import { IFilterModel } from '../interface/filter.interface';
import { showPageGymList } from '../service/gym.service';
import CategoryListComponent from '../component/category/category_list.component';

const MainPage = () => {
    const setGymList = useSetRecoilState(gymListAtom);
    const setGymListLength = useSetRecoilState(gymListLengthAtom);
    const setFilterParams = useSetRecoilState(filterParamsAtom);
    const filterParams = useRecoilValue(filterParamsAtom);

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const region = searchParams.get('region');
    const sportsType = searchParams.get('sportsType');
    const parking = searchParams.get('parking');
    const navigate = useNavigate();
    useEffect(() => {
        console.log('search: ', searchParams);
        reLoadUrl();
    }, []);

    const reLoadUrl = () => {
        const searchParams: IFilterModel = {
            page: page,
        };
        const firstSearchParams: IFilterModel = {
            page: '1',
        };
        if (search) {
            searchParams.search = search;
            firstSearchParams.search = search;
        }

        if (searchParams.page === null) {
            showPageGymList(firstSearchParams)
                .then((res) => {
                    // console.log('res: ', res);
                    setGymList(res.data.list);
                    setGymListLength(res.data.length);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        } else {
            showPageGymList(searchParams)
                .then((res) => {
                    // console.log('res: ', res);
                    setGymList(res.data.list);
                    setGymListLength(res.data.length);
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }
    };

    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="flex gap-4 flex-col">
                <CategoryListComponent></CategoryListComponent>
                <GroundListComponent></GroundListComponent>
            </div>
        </>
    );
};

export default MainPage;
